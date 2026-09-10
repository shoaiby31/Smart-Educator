import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    serverTimestamp,
    where,
} from "firebase/firestore";

import { db } from "../../../config/firebase";

const SCHOOLS_COLLECTION = "schools";
const USERS_COLLECTION = "users";
const TEACHER_PROFILES_COLLECTION =
    "teacherProfiles";
const TEACHER_REQUESTS_COLLECTION =
    "teacherRequests";

/* ==========================================================================
   Find School By School Code
   ========================================================================== */

export const findSchoolByCode = async (
    schoolCode
) => {
    if (!schoolCode?.trim()) {
        throw new Error(
            "Please enter a school code."
        );
    }

    const normalizedCode = schoolCode
        .trim()
        .toUpperCase();

    const q = query(
        collection(db, SCHOOLS_COLLECTION),
        where(
            "schoolCode",
            "==",
            normalizedCode
        )
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        throw new Error(
            "No school was found with this code."
        );
    }

    const schoolDoc = snapshot.docs[0];

    return {
        schoolId: schoolDoc.id,
        ...schoolDoc.data(),
    };
};

/* ==========================================================================
   Get Teacher Profile
   ========================================================================== */

export const getTeacherProfile = async (
    teacherUid
) => {
    if (!teacherUid) {
        throw new Error(
            "Teacher UID is required."
        );
    }

    const teacherRef = doc(
        db,
        TEACHER_PROFILES_COLLECTION,
        teacherUid
    );

    const snapshot =
        await getDoc(teacherRef);

    if (!snapshot.exists()) {
        throw new Error(
            "Teacher profile was not found."
        );
    }

    return {
        uid: snapshot.id,
        ...snapshot.data(),
    };
};

/* ==========================================================================
   Get Existing School Request
   ========================================================================== */

export const getExistingSchoolRequest =
    async ({
        schoolId,
        teacherUid,
    }) => {
        if (!schoolId || !teacherUid) {
            throw new Error(
                "School ID and teacher UID are required."
            );
        }

        const requestId =
            `${schoolId}_${teacherUid}`;

        const requestRef = doc(
            db,
            TEACHER_REQUESTS_COLLECTION,
            requestId
        );

        const snapshot =
            await getDoc(requestRef);

        if (!snapshot.exists()) {
            return null;
        }

        return {
            requestId: snapshot.id,
            ...snapshot.data(),
        };
    };

/* ==========================================================================
   Send School Join Request
   ========================================================================== */

export const sendSchoolJoinRequest = async ({
    teacherUid,
    school,
}) => {
    if (!teacherUid) {
        throw new Error(
            "Teacher UID is required."
        );
    }

    if (!school?.schoolId) {
        throw new Error(
            "School information is missing."
        );
    }

    /* ----------------------------------------------------------------------
       Get teacher profile
       ---------------------------------------------------------------------- */

    const teacherProfile =
        await getTeacherProfile(
            teacherUid
        );

    /* ----------------------------------------------------------------------
       Check whether teacher already belongs
       to this or another school
       ---------------------------------------------------------------------- */

    if (teacherProfile.schoolId) {
        if (
            teacherProfile.schoolId ===
            school.schoolId
        ) {
            throw new Error(
                "You are already a teacher at this school."
            );
        }

        throw new Error(
            "You are already associated with another school."
        );
    }

    if (
        teacherProfile.isSchoolTeacher ===
        true
    ) {
        throw new Error(
            "You are already registered as a school teacher."
        );
    }

    /* ----------------------------------------------------------------------
       Check existing request
       ---------------------------------------------------------------------- */

    const existingRequest =
        await getExistingSchoolRequest({
            schoolId: school.schoolId,
            teacherUid,
        });

    if (existingRequest) {
        switch (
            existingRequest.status
        ) {
            case "pending":
                throw new Error(
                    "You already have a pending request for this school."
                );

            case "approved":
                throw new Error(
                    "You are already a member of this school."
                );

            case "rejected":
                /*
                 * A rejected request can be
                 * submitted again.
                 */
                break;

            default:
                break;
        }
    }

    /* ----------------------------------------------------------------------
       Get teacher user document
       ---------------------------------------------------------------------- */

    const userRef = doc(
        db,
        USERS_COLLECTION,
        teacherUid
    );

    const userSnapshot =
        await getDoc(userRef);

    if (!userSnapshot.exists()) {
        throw new Error(
            "Teacher account was not found."
        );
    }

    const userData =
        userSnapshot.data();

    /* ----------------------------------------------------------------------
       Request ID
       ---------------------------------------------------------------------- */

    const requestId =
        `${school.schoolId}_${teacherUid}`;

    const requestRef = doc(
        db,
        TEACHER_REQUESTS_COLLECTION,
        requestId
    );

    /* ----------------------------------------------------------------------
       Create / Re-create request
       ---------------------------------------------------------------------- */

    await setDoc(requestRef, {
        requestId,

        /* Teacher */
        teacherUid,

        teacherName:
            userData.fullName ||
            "",

        teacherPhoto:
            userData.photoURL ||
            "",

        teacherCode:
            teacherProfile.teacherCode ||
            "",

        /* School */
        schoolId:
            school.schoolId,

        schoolName:
            school.instituteName ||
            "",

        schoolCode:
            school.schoolCode ||
            "",

        adminUid:
            school.adminUid ||
            "",

        /* Request */
        status: "pending",

        message: "",

        requestedAt:
            serverTimestamp(),

        respondedAt: null,

        createdAt:
            serverTimestamp(),

        updatedAt:
            serverTimestamp(),
    });

    return {
        success: true,
        requestId,
    };
};

/* ==========================================================================
   Get My School Requests
   ========================================================================== */

export const getMySchoolRequests =
    async (teacherUid) => {
        if (!teacherUid) {
            throw new Error(
                "Teacher UID is required."
            );
        }

        const q = query(
            collection(
                db,
                TEACHER_REQUESTS_COLLECTION
            ),
            where(
                "teacherUid",
                "==",
                teacherUid
            )
        );

        const snapshot =
            await getDocs(q);

        return snapshot.docs.map(
            (requestDoc) => ({
                requestId:
                    requestDoc.id,
                ...requestDoc.data(),
            })
        );
    };