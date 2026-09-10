import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";

import { db } from "../../../config/firebase";

const ACADEMIC_SESSIONS_COLLECTION =
    "academicSessions";

/* ==========================================================================
   Create Academic Session
   ========================================================================== */

export const createAcademicSession = async ({
    schoolId,
    name,
    startDate,
    endDate,
}) => {
    if (!schoolId) {
        throw new Error(
            "School ID is required."
        );
    }

    if (!name?.trim()) {
        throw new Error(
            "Academic session name is required."
        );
    }

    if (!startDate) {
        throw new Error(
            "Start date is required."
        );
    }

    if (!endDate) {
        throw new Error(
            "End date is required."
        );
    }

    const existingQuery = query(
        collection(
            db,
            ACADEMIC_SESSIONS_COLLECTION
        ),
        where(
            "schoolId",
            "==",
            schoolId
        ),
        where(
            "name",
            "==",
            name.trim()
        )
    );

    const existingSnapshot =
        await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
        throw new Error(
            "An academic session with this name already exists."
        );
    }

    const sessionRef = await addDoc(
        collection(
            db,
            ACADEMIC_SESSIONS_COLLECTION
        ),
        {
            schoolId,
            name: name.trim(),

            startDate,
            endDate,

            status: "upcoming",

            createdAt:
                serverTimestamp(),

            updatedAt:
                serverTimestamp(),
        }
    );

    return {
        success: true,
        sessionId: sessionRef.id,
    };
};

/* ==========================================================================
   Get School Academic Sessions
   ========================================================================== */

export const getAcademicSessions = async (
    schoolId
) => {
    if (!schoolId) {
        throw new Error(
            "School ID is required."
        );
    }

    const sessionsQuery = query(
        collection(
            db,
            ACADEMIC_SESSIONS_COLLECTION
        ),
        where(
            "schoolId",
            "==",
            schoolId
        )
    );

    const snapshot = await getDocs(
        sessionsQuery
    );

    const sessions = snapshot.docs.map(
        (sessionDoc) => ({
            sessionId: sessionDoc.id,
            ...sessionDoc.data(),
        })
    );

    /*
     * Sort sessions by start date.
     * Newest sessions appear first.
     */
    sessions.sort((a, b) => {
        const aTime =
            a.startDate?.toMillis?.() || 0;

        const bTime =
            b.startDate?.toMillis?.() || 0;

        return bTime - aTime;
    });

    return sessions;
};

/* ==========================================================================
   Get Single Academic Session
   ========================================================================== */

export const getAcademicSessionById =
    async (sessionId) => {
        if (!sessionId) {
            throw new Error(
                "Academic session ID is required."
            );
        }

        const sessionSnapshot =
            await getDoc(
                doc(
                    db,
                    ACADEMIC_SESSIONS_COLLECTION,
                    sessionId
                )
            );

        if (!sessionSnapshot.exists()) {
            throw new Error(
                "Academic session not found."
            );
        }

        return {
            sessionId:
                sessionSnapshot.id,

            ...sessionSnapshot.data(),
        };
    };

/* ==========================================================================
   Get Active Academic Session
   ========================================================================== */

export const getActiveAcademicSession =
    async (schoolId) => {
        if (!schoolId) {
            throw new Error(
                "School ID is required."
            );
        }

        const activeQuery = query(
            collection(
                db,
                ACADEMIC_SESSIONS_COLLECTION
            ),
            where(
                "schoolId",
                "==",
                schoolId
            ),
            where(
                "status",
                "==",
                "active"
            )
        );

        const snapshot = await getDocs(
            activeQuery
        );

        if (snapshot.empty) {
            return null;
        }

        const activeSession =
            snapshot.docs[0];

        return {
            sessionId:
                activeSession.id,

            ...activeSession.data(),
        };
    };

/* ==========================================================================
   Activate Academic Session
   ========================================================================== */

export const activateAcademicSession =
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

        /*
         * Get all sessions for this school.
         */
        const sessions = await getAcademicSessions(
            schoolId
        );

        /*
         * Complete or deactivate the currently
         * active session.
         */
        const activeSession =
            sessions.find(
                (session) =>
                    session.status ===
                    "active"
            );

        if (
            activeSession &&
            activeSession.sessionId !==
                sessionId
        ) {
            await updateDoc(
                doc(
                    db,
                    ACADEMIC_SESSIONS_COLLECTION,
                    activeSession.sessionId
                ),
                {
                    status: "completed",
                    updatedAt:
                        serverTimestamp(),
                }
            );
        }

        /*
         * Activate the selected session.
         */
        await updateDoc(
            doc(
                db,
                ACADEMIC_SESSIONS_COLLECTION,
                sessionId
            ),
            {
                status: "active",
                activatedAt:
                    serverTimestamp(),

                updatedAt:
                    serverTimestamp(),
            }
        );

        return {
            success: true,
        };
    };

/* ==========================================================================
   Complete Academic Session
   ========================================================================== */

export const completeAcademicSession =
    async (sessionId) => {
        if (!sessionId) {
            throw new Error(
                "Academic session ID is required."
            );
        }

        await updateDoc(
            doc(
                db,
                ACADEMIC_SESSIONS_COLLECTION,
                sessionId
            ),
            {
                status: "completed",

                completedAt:
                    serverTimestamp(),

                updatedAt:
                    serverTimestamp(),
            }
        );

        return {
            success: true,
        };
    };

/* ==========================================================================
   Update Academic Session
   ========================================================================== */

export const updateAcademicSession =
    async ({
        sessionId,
        name,
        startDate,
        endDate,
    }) => {
        if (!sessionId) {
            throw new Error(
                "Academic session ID is required."
            );
        }

        const updateData = {
            updatedAt:
                serverTimestamp(),
        };

        if (name?.trim()) {
            updateData.name =
                name.trim();
        }

        if (startDate) {
            updateData.startDate =
                startDate;
        }

        if (endDate) {
            updateData.endDate =
                endDate;
        }

        await updateDoc(
            doc(
                db,
                ACADEMIC_SESSIONS_COLLECTION,
                sessionId
            ),
            updateData
        );

        return {
            success: true,
        };
    };