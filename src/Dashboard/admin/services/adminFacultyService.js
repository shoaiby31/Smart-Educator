import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../config/firebase";

const USERS_COLLECTION = "users";
const TEACHER_PROFILES_COLLECTION =
    "teacherProfiles";
const TEACHER_REQUESTS_COLLECTION =
    "teacherRequests";

/* ==========================================================================
   Get Faculty Members
   ========================================================================== */

/*
 * Gets all teacher profiles belonging to the
 * admin's school and combines them with the
 * corresponding user documents.
 *
 * users/{teacherUid}
 * teacherProfiles/{teacherUid}
 */

export const getFacultyMembers = async (
    schoolId
) => {
    if (!schoolId) {
        throw new Error("School ID is required.");
    }

    const profileQuery = query(
        collection(
            db,
            TEACHER_PROFILES_COLLECTION
        ),
        where("schoolId", "==", schoolId)
    );

    const profileSnapshot =
        await getDocs(profileQuery);

    if (profileSnapshot.empty) {
        return [];
    }

    const faculty = await Promise.all(
        profileSnapshot.docs.map(
            async (profileDoc) => {
                const teacherUid =
                    profileDoc.id;

                const userSnapshot =
                    await getDoc(
                        doc(
                            db,
                            USERS_COLLECTION,
                            teacherUid
                        )
                    );

                const userData =
                    userSnapshot.exists()
                        ? userSnapshot.data()
                        : {};

                return {
                    teacherUid,

                    /* User information */
                    fullName:
                        userData.fullName ||
                        userData.displayName ||
                        "",
                    email:
                        userData.email || "",
                    phone:
                        userData.phone || "",
                    photoURL:
                        userData.photoURL || "",
                    gender:
                        userData.gender || "",
                    role:
                        userData.role ||
                        "teacher",

                    /* Teacher profile information */
                    ...profileDoc.data(),
                };
            }
        )
    );

    return faculty;
};

/* ==========================================================================
   Realtime Faculty Joining Requests
   ========================================================================== */

/*
 * Listens to pending teacher joining requests
 * for a specific school.
 *
 * Firestore:
 *
 * teacherRequests/{requestId}
 */

export const subscribeToFacultyRequests = (
    schoolId,
    onData,
    onError
) => {
    if (!schoolId) {
        onData?.([]);

        /*
         * Always return a cleanup function.
         */
        return () => {};
    }

    const requestsQuery = query(
        collection(
            db,
            TEACHER_REQUESTS_COLLECTION
        ),
        where(
            "schoolId",
            "==",
            schoolId
        ),
        where(
            "status",
            "==",
            "pending"
        )
    );

    /*
     * IMPORTANT:
     *
     * onSnapshot() returns the unsubscribe
     * function. We return it directly so the
     * React component can call it during cleanup.
     */

    return onSnapshot(
        requestsQuery,
        (snapshot) => {
            const requests =
                snapshot.docs.map(
                    (requestDoc) => ({
                        /*
                         * Spread the Firestore data first.
                         */
                        ...requestDoc.data(),

                        /*
                         * Always use the actual
                         * Firestore document ID.
                         */
                        requestId:
                            requestDoc.id,
                    })
                );

            /*
             * Newest requests first.
             */
            requests.sort((a, b) => {
                const aTime =
                    a.requestedAt
                        ?.toMillis?.() || 0;

                const bTime =
                    b.requestedAt
                        ?.toMillis?.() || 0;

                return bTime - aTime;
            });

            onData?.(requests);
        },
        (error) => {
            console.error(
                "Faculty request listener error:",
                error
            );

            onError?.(error);
        }
    );
};

/* ==========================================================================
   Get Pending Faculty Requests
   ========================================================================== */

/*
 * Gets all pending teacher joining requests
 * for the admin's school.
 */

export const getFacultyRequests = async (
    schoolId
) => {
    if (!schoolId) {
        throw new Error(
            "School ID is required."
        );
    }

    const requestQuery = query(
        collection(
            db,
            TEACHER_REQUESTS_COLLECTION
        ),
        where(
            "schoolId",
            "==",
            schoolId
        ),
        where(
            "status",
            "==",
            "pending"
        )
    );

    const snapshot =
        await getDocs(requestQuery);

    const requests =
        snapshot.docs.map(
            (requestDoc) => ({
                ...requestDoc.data(),

                /*
                 * Always use Firestore document ID.
                 */
                requestId:
                    requestDoc.id,
            })
        );

    /*
     * Newest first.
     */
    requests.sort((a, b) => {
        const aTime =
            a.requestedAt
                ?.toMillis?.() || 0;

        const bTime =
            b.requestedAt
                ?.toMillis?.() || 0;

        return bTime - aTime;
    });

    return requests;
};

/* ==========================================================================
   Accept Faculty Request
   ========================================================================== */

/*
 * Approval flow:
 *
 * 1. Find the request.
 * 2. Read teacherUid and schoolId from request.
 * 3. Verify the request is still pending.
 * 4. Add the teacher to the school.
 * 5. Set isSchoolTeacher = true.
 * 6. Mark the request as approved.
 *
 * teacherRequests/{requestId}
 *        ↓
 * teacherProfiles/{teacherUid}
 *
 * NOTE:
 * teacherProfiles/{teacherUid}
 * uses the SAME UID as users/{teacherUid}.
 */

export const acceptFacultyRequest = async (
    requestId
) => {
    if (!requestId) {
        throw new Error(
            "Request ID is required."
        );
    }

    /*
     * Get the request document first.
     */
    const requestRef = doc(
        db,
        TEACHER_REQUESTS_COLLECTION,
        requestId
    );

    const requestSnapshot =
        await getDoc(requestRef);

    if (!requestSnapshot.exists()) {
        throw new Error(
            "Faculty request not found."
        );
    }

    const requestData =
        requestSnapshot.data();

    /*
     * Prevent approving a request that
     * has already been processed.
     */
    if (
        requestData.status &&
        requestData.status !== "pending"
    ) {
        throw new Error(
            "This faculty request has already been processed."
        );
    }

    const teacherUid =
        requestData.teacherUid;

    const schoolId =
        requestData.schoolId;

    if (!teacherUid) {
        throw new Error(
            "Teacher UID is missing from the request."
        );
    }

    if (!schoolId) {
        throw new Error(
            "School ID is missing from the request."
        );
    }

    /*
     * Make sure the teacher profile exists.
     */
    const teacherProfileRef = doc(
        db,
        TEACHER_PROFILES_COLLECTION,
        teacherUid
    );

    const teacherProfileSnapshot =
        await getDoc(
            teacherProfileRef
        );

    if (!teacherProfileSnapshot.exists()) {
        throw new Error(
            "Teacher profile not found."
        );
    }

    /*
     * Add teacher to school.
     */
    await updateDoc(
        teacherProfileRef,
        {
            schoolId: schoolId,

            isSchoolTeacher: true,

            joinedSchoolAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp(),
        }
    );

    /*
     * Mark request as approved.
     */
    await updateDoc(
        requestRef,
        {
            status: "approved",

            respondedAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp(),
        }
    );

    return {
        success: true,
        teacherUid,
        schoolId,
        requestId,
    };
};

/* ==========================================================================
   Reject Faculty Request
   ========================================================================== */

/*
 * Rejects a teacher joining request.
 *
 * The request remains in Firestore with:
 *
 * status: "rejected"
 */

export const rejectFacultyRequest = async (
    requestId
) => {
    if (!requestId) {
        throw new Error(
            "Request ID is required."
        );
    }

    const requestRef = doc(
        db,
        TEACHER_REQUESTS_COLLECTION,
        requestId
    );

    const requestSnapshot =
        await getDoc(requestRef);

    if (!requestSnapshot.exists()) {
        throw new Error(
            "Faculty request not found."
        );
    }

    const requestData =
        requestSnapshot.data();

    /*
     * Prevent processing an already
     * processed request.
     */
    if (
        requestData.status &&
        requestData.status !== "pending"
    ) {
        throw new Error(
            "This faculty request has already been processed."
        );
    }

    await updateDoc(
        requestRef,
        {
            status: "rejected",

            respondedAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp(),
        }
    );

    return {
        success: true,
        requestId,
    };
};

/* ==========================================================================
   Update Faculty Assignments
   ========================================================================== */

/*
 * Example:
 *
 * assignments: [
 *     {
 *         classId: "class8",
 *         subjectId: "math"
 *     },
 *     {
 *         classId: "class9",
 *         subjectId: "physics"
 *     }
 * ]
 */

export const updateFacultyAssignments =
    async ({
        teacherUid,
        assignments = [],
    }) => {
        if (!teacherUid) {
            throw new Error(
                "Teacher UID is required."
            );
        }

        await updateDoc(
            doc(
                db,
                TEACHER_PROFILES_COLLECTION,
                teacherUid
            ),
            {
                assignments,

                updatedAt:
                    serverTimestamp(),
            }
        );

        return {
            success: true,
        };
    };

/* ==========================================================================
   Change Faculty Status
   ========================================================================== */

export const changeFacultyStatus = async ({
    teacherUid,
    status,
}) => {
    if (!teacherUid) {
        throw new Error(
            "Teacher UID is required."
        );
    }

    if (!status) {
        throw new Error(
            "Faculty status is required."
        );
    }

    await updateDoc(
        doc(
            db,
            TEACHER_PROFILES_COLLECTION,
            teacherUid
        ),
        {
            status,

            updatedAt:
                serverTimestamp(),
        }
    );

    return {
        success: true,
    };
};

/* ==========================================================================
   Archive Faculty
   ========================================================================== */

export const archiveFaculty = async (
    teacherUid
) => {
    if (!teacherUid) {
        throw new Error(
            "Teacher UID is required."
        );
    }

    await updateDoc(
        doc(
            db,
            TEACHER_PROFILES_COLLECTION,
            teacherUid
        ),
        {
            status: "archived",

            archivedAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp(),
        }
    );

    return {
        success: true,
    };
};