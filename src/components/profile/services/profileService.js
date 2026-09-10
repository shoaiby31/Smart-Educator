import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
    serverTimestamp,
} from "firebase/firestore";

import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

import {
    db,
    storage,
} from "../../../config/firebase";

/* =====================================================
   Upload Profile Image
===================================================== */

const uploadProfileImage = async (
    uid,
    imageFile
) => {
    if (!imageFile) return null;

    try {
        const extension =
            imageFile.name.split(".").pop();

        const storageRef = ref(
            storage,
            `profile-images/${uid}.${extension}`
        );

        await uploadBytes(
            storageRef,
            imageFile
        );

        return await getDownloadURL(
            storageRef
        );
    } catch (error) {
        console.warn(
            "Storage upload skipped:",
            error.message
        );

        return null;
    }
};


/* =====================================================
   Check School Code Availability
===================================================== */

const checkSchoolCodeAvailability = async (
    schoolCode
) => {
    const normalizedCode = schoolCode
        .trim()
        .toUpperCase();

    const q = query(
        collection(db, "schools"),
        where(
            "schoolCode",
            "==",
            normalizedCode
        )
    );

    const snapshot = await getDocs(q);

    return snapshot.empty;
};


/* =====================================================
   Check Teacher Code Availability
===================================================== */

const checkTeacherCodeAvailability = async (
    teacherCode,
    currentUid = null
) => {
    const normalizedCode = teacherCode
        ?.trim()
        .toUpperCase();

    if (!normalizedCode) {
        return false;
    }

    const q = query(
        collection(db, "teacherProfiles"),
        where(
            "teacherCode",
            "==",
            normalizedCode
        )
    );

    const snapshot = await getDocs(q);

    // No teacher is using this code
    if (snapshot.empty) {
        return true;
    }

    /*
     * If editing an existing teacher profile,
     * allow the teacher to keep their own code.
     *
     * But if another teacher owns the code,
     * reject it.
     */
    return snapshot.docs.every(
        (teacherDoc) =>
            teacherDoc.id === currentUid
    );
};


/* =====================================================
   Validate Portfolio Link
===================================================== */

const validatePortfolioLink = (
    portfolioLink
) => {
    if (!portfolioLink?.trim()) {
        return true;
    }

    try {
        const url = new URL(
            portfolioLink.trim()
        );

        return (
            url.protocol === "http:" ||
            url.protocol === "https:"
        );
    } catch {
        return false;
    }
};


/* =====================================================
   Admin Profile
===================================================== */

const completeAdminProfile = async ({
    uid,
    userData,
    schoolData,
    imageFile,
}) => {

    /* ---------------------------------------------
       Normalize School Code
    --------------------------------------------- */

    const schoolCode =
        schoolData.schoolCode
            ?.trim()
            .toUpperCase();

    if (!schoolCode) {
        throw new Error(
            "School code is required."
        );
    }


    /* ---------------------------------------------
       Check School Code
    --------------------------------------------- */

    const available =
        await checkSchoolCodeAvailability(
            schoolCode
        );

    if (!available) {
        throw new Error(
            "This school code is already taken. Please choose another one."
        );
    }


    /* ---------------------------------------------
       Upload Profile Image
    --------------------------------------------- */

    const photoURL =
        await uploadProfileImage(
            uid,
            imageFile
        );


    /* ---------------------------------------------
       Generate School ID
    --------------------------------------------- */

    const schoolRef = doc(
        collection(db, "schools")
    );

    const schoolId = schoolRef.id;


    /* ---------------------------------------------
       Create School
    --------------------------------------------- */

    await setDoc(schoolRef, {
        schoolId,
        adminUid: uid,

        instituteName:
            schoolData.instituteName || "",

        instituteAddress:
            schoolData.instituteAddress || "",

        schoolCode,

        website:
            schoolData.website || "",

        establishedYear:
            schoolData.establishedYear || "",

        logo: photoURL || "",
        coverPhoto: "",

        createdAt:
            serverTimestamp(),

        updatedAt:
            serverTimestamp(),
    });


    /* ---------------------------------------------
       Update User
    --------------------------------------------- */

    await updateDoc(
        doc(db, "users", uid),
        {
            role: "admin",

            fullName:
                userData.fullName,

            phone:
                userData.phone,

            gender:
                userData.gender,

            schoolId,

            photoURL:
                photoURL ||
                userData.photoURL ||
                "",

            isProfileCompleted: true,

            updatedAt:
                serverTimestamp(),
        }
    );


    return {
        success: true,
        role: "admin",
        schoolId,
        photoURL,
    };
};


/* =====================================================
   Teacher Profile
===================================================== */

const completeTeacherProfile = async ({
    uid,
    userData,
    teacherData,
    imageFile,
}) => {

    /* ---------------------------------------------
       Normalize Teacher Code
    --------------------------------------------- */

    const teacherCode =
        teacherData.teacherCode
            ?.trim()
            .toUpperCase();

    if (!teacherCode) {
        throw new Error(
            "Teacher code is required."
        );
    }


    /* ---------------------------------------------
       Check Teacher Code
    --------------------------------------------- */

    const teacherCodeAvailable =
        await checkTeacherCodeAvailability(
            teacherCode,
            uid
        );

    if (!teacherCodeAvailable) {
        throw new Error(
            "This teacher code is already taken. Please choose another one."
        );
    }


    /* ---------------------------------------------
       Validate Portfolio Link
    --------------------------------------------- */

    const portfolioLink =
        teacherData.portfolioLink
            ?.trim() || "";

    if (
        portfolioLink &&
        !validatePortfolioLink(
            portfolioLink
        )
    ) {
        throw new Error(
            "Please enter a valid portfolio link starting with http:// or https://."
        );
    }


    /* ---------------------------------------------
       Upload Profile Image
    --------------------------------------------- */

    const photoURL =
        await uploadProfileImage(
            uid,
            imageFile
        );


    /* ---------------------------------------------
       Update User
    --------------------------------------------- */

    await updateDoc(
        doc(db, "users", uid),
        {
            role: "teacher",

            fullName:
                userData.fullName,

            phone:
                userData.phone,

            gender:
                userData.gender,

            schoolId:
                teacherData.schoolId ||
                null,

            photoURL:
                photoURL ||
                userData.photoURL ||
                "",

            isProfileCompleted: true,

            updatedAt:
                serverTimestamp(),
        }
    );


    /* ---------------------------------------------
       Teacher Profile
    --------------------------------------------- */

    await setDoc(
        doc(
            db,
            "teacherProfiles",
            uid
        ),
        {
            uid,

            schoolId:
                teacherData.schoolId ||
                null,

            teacherCode,

            portfolioLink,

            designation:
                teacherData.designation ||
                "",

            qualification:
                teacherData.qualification ||
                "",

            specialization:
                teacherData.specialization ||
                "",

            bio:
                teacherData.bio ||
                "",

            experience:
                teacherData.experience ||
                "",

            joinedSchoolAt:
                teacherData.joinedSchoolAt ||
                null,

            isSchoolTeacher:
                teacherData.isSchoolTeacher ??
                false,

            isPrivateTeacher:
                teacherData.isPrivateTeacher ??
                true,

            createdAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp(),
        }
    );


    return {
        success: true,
        role: "teacher",
        teacherCode,
        portfolioLink,
        photoURL,
    };
};


/* =====================================================
   Student Profile
===================================================== */

const completeStudentProfile = async ({
    uid,
    userData,
    studentData,
    imageFile,
}) => {

    const photoURL =
        await uploadProfileImage(
            uid,
            imageFile
        );


    /* ---------------------------------------------
       Update User
    --------------------------------------------- */

    await updateDoc(
        doc(db, "users", uid),
        {
            role: "student",

            fullName:
                userData.fullName,

            phone:
                userData.phone,

            gender:
                userData.gender,

            schoolId:
                studentData.schoolId ||
                null,

            photoURL:
                photoURL ||
                userData.photoURL ||
                "",

            isProfileCompleted: true,

            updatedAt:
                serverTimestamp(),
        }
    );


    /* ---------------------------------------------
       Student Profile
    --------------------------------------------- */

    await setDoc(
        doc(
            db,
            "studentProfiles",
            uid
        ),
        {
            uid,

            schoolId:
                studentData.schoolId ||
                null,

            admissionNo:
                studentData.admissionNo ||
                "",

            dateOfBirth:
                studentData.dateOfBirth ||
                "",

            gender:
                userData.gender,

            guardian:
                studentData.guardian ||
                "",

            phone:
                userData.phone,

            address:
                studentData.address ||
                "",

            createdAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp(),
        }
    );


    return {
        success: true,
        role: "student",
        photoURL,
    };
};


/* =====================================================
   Get Complete Profile
===================================================== */

export const getProfile = async ({
    uid,
    role,
    schoolId,
}) => {

    /* ---------------------------------------------
       User Document
    --------------------------------------------- */

    const userSnap = await getDoc(
        doc(db, "users", uid)
    );

    if (!userSnap.exists()) {
        throw new Error(
            "User not found."
        );
    }

    const userData =
        userSnap.data();

    let roleData = {};


    /* ---------------------------------------------
       Role Specific Data
    --------------------------------------------- */

    switch (role) {

        case "student": {
            const snap = await getDoc(
                doc(
                    db,
                    "studentProfiles",
                    uid
                )
            );

            if (snap.exists()) {
                roleData =
                    snap.data();
            }

            break;
        }


        case "teacher": {
            const snap = await getDoc(
                doc(
                    db,
                    "teacherProfiles",
                    uid
                )
            );

            if (snap.exists()) {
                roleData =
                    snap.data();
            }

            break;
        }


        case "admin": {
            if (schoolId) {

                const snap =
                    await getDoc(
                        doc(
                            db,
                            "schools",
                            schoolId
                        )
                    );

                if (snap.exists()) {
                    roleData =
                        snap.data();
                }
            }

            break;
        }


        default:
            break;
    }


    return {
        ...userData,
        ...roleData,
    };
};


/* =====================================================
   Complete Profile
===================================================== */

export const completeProfile = async ({
    role,
    uid,
    userData,
    profileData,
    imageFile,
}) => {

    /* ---------------------------------------------
       Validate Role
    --------------------------------------------- */

    const validRoles = [
        "admin",
        "teacher",
        "student",
    ];

    if (!validRoles.includes(role)) {
        throw new Error(
            "Invalid user role."
        );
    }


    /* ---------------------------------------------
       Complete According To Selected Role
    --------------------------------------------- */

    switch (role) {

        case "admin":
            return completeAdminProfile({
                uid,
                userData,
                schoolData:
                    profileData,
                imageFile,
            });


        case "teacher":
            return completeTeacherProfile({
                uid,
                userData,
                teacherData:
                    profileData,
                imageFile,
            });


        case "student":
            return completeStudentProfile({
                uid,
                userData,
                studentData:
                    profileData,
                imageFile,
            });


        default:
            throw new Error(
                "Invalid user role."
            );
    }
};
