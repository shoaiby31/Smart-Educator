import {
    addDoc,
    collection,
    deleteDoc,
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
   Collection
   ========================================================================== */

const ACADEMIC_SUBJECTS_COLLECTION = "academicSubjects";


/* ==========================================================================
   Create Academic Subject
   ========================================================================== */

export const createAcademicSubject = async ({
    schoolId,
    subjectName,
    subjectCode = "",
    description = "",
    status = "active",
}) => {
    if (!schoolId) {
        throw new Error("School ID is required.");
    }

    if (!subjectName?.trim()) {
        throw new Error("Subject name is required.");
    }

    const subjectRef = await addDoc(
        collection(db, ACADEMIC_SUBJECTS_COLLECTION),
        {
            schoolId,
            subjectName: subjectName.trim(),
            subjectCode: subjectCode.trim().toUpperCase(),
            description: description.trim(),
            status,

            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }
    );

    return {
        success: true,
        subjectId: subjectRef.id,
    };
};


/* ==========================================================================
   Get Academic Subjects
   ========================================================================== */

export const getAcademicSubjects = async (schoolId) => {
    if (!schoolId) {
        throw new Error("School ID is required.");
    }

    const subjectsQuery = query(
        collection(db, ACADEMIC_SUBJECTS_COLLECTION),
        where("schoolId", "==", schoolId),
        orderBy("subjectName", "asc")
    );

    const snapshot = await getDocs(subjectsQuery);

    return snapshot.docs.map((subjectDoc) => ({
        subjectId: subjectDoc.id,
        ...subjectDoc.data(),
    }));
};


/* ==========================================================================
   Get Single Academic Subject
   ========================================================================== */

export const getAcademicSubjectById = async (subjectId) => {
    if (!subjectId) {
        throw new Error("Subject ID is required.");
    }

    const subjectRef = doc(
        db,
        ACADEMIC_SUBJECTS_COLLECTION,
        subjectId
    );

    const subjectSnapshot = await getDoc(subjectRef);

    if (!subjectSnapshot.exists()) {
        throw new Error("Academic subject not found.");
    }

    return {
        subjectId: subjectSnapshot.id,
        ...subjectSnapshot.data(),
    };
};


/* ==========================================================================
   Update Academic Subject
   ========================================================================== */

export const updateAcademicSubject = async ({
    subjectId,
    subjectName,
    subjectCode = "",
    description = "",
    status,
}) => {
    if (!subjectId) {
        throw new Error("Subject ID is required.");
    }

    if (!subjectName?.trim()) {
        throw new Error("Subject name is required.");
    }

    const subjectRef = doc(
        db,
        ACADEMIC_SUBJECTS_COLLECTION,
        subjectId
    );

    const updateData = {
        subjectName: subjectName.trim(),
        subjectCode: subjectCode.trim().toUpperCase(),
        description: description.trim(),

        updatedAt: serverTimestamp(),
    };

    if (status) {
        updateData.status = status;
    }

    await updateDoc(subjectRef, updateData);

    return {
        success: true,
    };
};


/* ==========================================================================
   Change Academic Subject Status
   ========================================================================== */

export const changeAcademicSubjectStatus = async ({
    subjectId,
    status,
}) => {
    if (!subjectId) {
        throw new Error("Subject ID is required.");
    }

    if (!status) {
        throw new Error("Subject status is required.");
    }

    await updateDoc(
        doc(
            db,
            ACADEMIC_SUBJECTS_COLLECTION,
            subjectId
        ),
        {
            status,
            updatedAt: serverTimestamp(),
        }
    );

    return {
        success: true,
    };
};


/* ==========================================================================
   Archive Academic Subject
   ========================================================================== */

export const archiveAcademicSubject = async (subjectId) => {
    if (!subjectId) {
        throw new Error("Subject ID is required.");
    }

    await updateDoc(
        doc(
            db,
            ACADEMIC_SUBJECTS_COLLECTION,
            subjectId
        ),
        {
            status: "archived",
            archivedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }
    );

    return {
        success: true,
    };
};


/* ==========================================================================
   Delete Academic Subject
   ========================================================================== */

export const deleteAcademicSubject = async (subjectId) => {
    if (!subjectId) {
        throw new Error("Subject ID is required.");
    }

    await deleteDoc(
        doc(
            db,
            ACADEMIC_SUBJECTS_COLLECTION,
            subjectId
        )
    );

    return {
        success: true,
    };
};