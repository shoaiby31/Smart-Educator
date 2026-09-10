import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../config/firebase";

const COLLECTION = "teachers";
const REQUEST_COLLECTION = "teacherRequests";
const USERS_COLLECTION = "users";

/* -------------------------------------------------------------------------- */
/*                            Existing Teacher CRUD                           */
/* -------------------------------------------------------------------------- */

const createTeacher = async (teacherUid, data) => {
  await setDoc(doc(db, COLLECTION, teacherUid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    success: true,
  };
};

const getTeacher = async (teacherUid) => {
  const snapshot = await getDoc(doc(db, COLLECTION, teacherUid));

  if (!snapshot.exists()) {
    return {
      success: false,
      message: "Teacher not found.",
    };
  }

  return {
    success: true,
    data: {
      teacherUid: snapshot.id,
      ...snapshot.data(),
    },
  };
};

const getTeachersBySchool = async (schoolId) => {
  const q = query(
    collection(db, COLLECTION),
    where("schoolId", "==", schoolId)
  );

  const snapshot = await getDocs(q);

  return {
    success: true,
    data: snapshot.docs.map((teacherDoc) => ({
      teacherUid: teacherDoc.id,
      ...teacherDoc.data(),
    })),
  };
};

const updateTeacher = async (teacherUid, data) => {
  await updateDoc(doc(db, COLLECTION, teacherUid), {
    ...data,
    updatedAt: serverTimestamp(),
  });

  return {
    success: true,
  };
};

const removeTeacher = async (teacherUid) => {
  await deleteDoc(doc(db, COLLECTION, teacherUid));

  return {
    success: true,
  };
};

/* -------------------------------------------------------------------------- */
/*                           Teacher Invitation Flow                          */
/* -------------------------------------------------------------------------- */

const findTeacherByTeacherId = async (teacherId) => {
  const q = query(
    collection(db, USERS_COLLECTION),
    where("teacherId", "==", teacherId),
    where("role", "==", "teacher")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return {
      success: false,
      message: "Teacher not found.",
    };
  }

  const teacher = snapshot.docs[0];

  return {
    success: true,
    data: {
      teacherUid: teacher.id,
      ...teacher.data(),
    },
  };
};

const sendTeacherInvitation = async ({
  teacherUid,
  teacherId,
  teacherName,
  teacherPhoto,

  adminUid,
  adminName,

  schoolId,
  schoolName,
}) => {
  const requestId = `${schoolId}_${teacherUid}`;

  const requestRef = doc(db, REQUEST_COLLECTION, requestId);

  const existingRequest = await getDoc(requestRef);

  if (existingRequest.exists()) {
    return {
      success: false,
      message: "Invitation already exists.",
    };
  }

  await setDoc(requestRef, {
    requestId,

    teacherUid,
    teacherId,
    teacherName,
    teacherPhoto,

    adminUid,
    adminName,

    schoolId,
    schoolName,

    status: "pending",

    message: "",

    requestedAt: serverTimestamp(),
    respondedAt: null,
  });

  return {
    success: true,
    message: "Invitation sent successfully.",
  };
};

const teacherService = {
  createTeacher,
  getTeacher,
  getTeachersBySchool,
  updateTeacher,
  removeTeacher,

  findTeacherByTeacherId,
  sendTeacherInvitation,
};

export default teacherService;