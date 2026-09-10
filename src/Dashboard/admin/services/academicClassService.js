import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";

import { db } from "../../../config/firebase";

/* ==========================================================================
   COLLECTION
   ========================================================================== */

const ACADEMIC_CLASSES_COLLECTION = "academicClasses";

/* ==========================================================================
   Create Academic Class
   ========================================================================== */

/*
    Creates a class for a specific academic session.

    Example:

    academicClasses
        └── classDocumentId
            ├── schoolId
            ├── sessionId
            ├── className
            ├── classCode
            ├── classLevel
            ├── status
            ├── createdAt
            └── updatedAt
*/

export const createAcademicClass = async ({
    schoolId,
    sessionId,
    className,
    classCode,
    classLevel,
}) => {
    if (!schoolId) {
        throw new Error("School ID is required.");
    }

    if (!sessionId) {
        throw new Error("Academic session ID is required.");
    }

    if (!className?.trim()) {
        throw new Error("Class name is required.");
    }

    /*
        Prevent duplicate classes inside
        the same academic session.
    */

    const existingClassQuery = query(
        collection(db, ACADEMIC_CLASSES_COLLECTION),
        where("schoolId", "==", schoolId),
        where("sessionId", "==", sessionId),
        where("className", "==", className.trim())
    );

    const existingSnapshot = await getDocs(
        existingClassQuery
    );

    if (!existingSnapshot.empty) {
        throw new Error(
            "This class already exists in the selected academic session."
        );
    }

    const classRef = await addDoc(
        collection(db, ACADEMIC_CLASSES_COLLECTION),
        {
            schoolId,

            sessionId,

            className: className.trim(),

            classCode:
                classCode?.trim() || "",

            /*
                Numeric level helps us later
                with student promotion.

                Example:

                Class 8  → 8
                Class 9  → 9
                Class 10 → 10
            */

            classLevel:
                classLevel !== undefined &&
                classLevel !== null
                    ? Number(classLevel)
                    : null,

            status: "active",

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp(),
        }
    );

    return {
        success: true,
        classId: classRef.id,
    };
};

/* ==========================================================================
   Get Academic Classes
   ========================================================================== */

/*
    Gets all classes belonging to:

    - One school
    - One academic session
*/

export const getAcademicClasses = async ({
    schoolId,
    sessionId,
}) => {
    if (!schoolId) {
        throw new Error("School ID is required.");
    }

    if (!sessionId) {
        throw new Error("Academic session ID is required.");
    }

    const classesQuery = query(
        collection(db, ACADEMIC_CLASSES_COLLECTION),
        where("schoolId", "==", schoolId),
        where("sessionId", "==", sessionId),
        orderBy("classLevel", "asc")
    );

    const snapshot = await getDocs(
        classesQuery
    );

    return snapshot.docs.map(
        (classDoc) => ({
            classId: classDoc.id,
            ...classDoc.data(),
        })
    );
};

/* ==========================================================================
   Get Active Academic Classes
   ========================================================================== */

/*
    Useful when:

    - Assigning students
    - Creating subjects
    - Assigning teachers
    - Promoting students
*/

export const getActiveAcademicClasses =
    async ({
        schoolId,
        sessionId,
    }) => {
        if (!schoolId) {
            throw new Error(
                "School ID is required."
            );
        }

        if (!sessionId) {
            throw new Error(
                "Academic session ID is required."
            );
        }

        const classesQuery = query(
            collection(
                db,
                ACADEMIC_CLASSES_COLLECTION
            ),
            where(
                "schoolId",
                "==",
                schoolId
            ),
            where(
                "sessionId",
                "==",
                sessionId
            ),
            where(
                "status",
                "==",
                "active"
            ),
            orderBy(
                "classLevel",
                "asc"
            )
        );

        const snapshot = await getDocs(
            classesQuery
        );

        return snapshot.docs.map(
            (classDoc) => ({
                classId: classDoc.id,
                ...classDoc.data(),
            })
        );
    };

/* ==========================================================================
   Get Single Academic Class
   ========================================================================== */

export const getAcademicClassById =
    async (classId) => {
        if (!classId) {
            throw new Error(
                "Class ID is required."
            );
        }

        const classSnapshot = await getDoc(
            doc(
                db,
                ACADEMIC_CLASSES_COLLECTION,
                classId
            )
        );

        if (!classSnapshot.exists()) {
            throw new Error(
                "Academic class not found."
            );
        }

        return {
            classId:
                classSnapshot.id,
            ...classSnapshot.data(),
        };
    };

/* ==========================================================================
   Update Academic Class
   ========================================================================== */

export const updateAcademicClass =
    async ({
        classId,
        className,
        classCode,
        classLevel,
        status,
    }) => {
        if (!classId) {
            throw new Error(
                "Class ID is required."
            );
        }

        const updateData = {
            updatedAt:
                serverTimestamp(),
        };

        if (
            className !== undefined
        ) {
            updateData.className =
                className?.trim() || "";
        }

        if (
            classCode !== undefined
        ) {
            updateData.classCode =
                classCode?.trim() || "";
        }

        if (
            classLevel !== undefined
        ) {
            updateData.classLevel =
                classLevel !== null
                    ? Number(classLevel)
                    : null;
        }

        if (
            status !== undefined
        ) {
            updateData.status =
                status;
        }

        await updateDoc(
            doc(
                db,
                ACADEMIC_CLASSES_COLLECTION,
                classId
            ),
            updateData
        );

        return {
            success: true,
        };
    };

/* ==========================================================================
   Change Academic Class Status
   ========================================================================== */

/*
    Recommended instead of deleting a class.

    Historical records may depend on
    the class document.
*/

export const changeAcademicClassStatus =
    async ({
        classId,
        status,
    }) => {
        if (!classId) {
            throw new Error(
                "Class ID is required."
            );
        }

        if (!status) {
            throw new Error(
                "Class status is required."
            );
        }

        await updateDoc(
            doc(
                db,
                ACADEMIC_CLASSES_COLLECTION,
                classId
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
   Archive Academic Class
   ========================================================================== */

/*
    We archive instead of permanently
    deleting classes because:

    - Student records may reference them
    - Teacher assignments may reference them
    - Quiz records may reference them
    - Historical sessions must remain accessible
*/

export const archiveAcademicClass =
    async (classId) => {
        if (!classId) {
            throw new Error(
                "Class ID is required."
            );
        }

        await updateDoc(
            doc(
                db,
                ACADEMIC_CLASSES_COLLECTION,
                classId
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