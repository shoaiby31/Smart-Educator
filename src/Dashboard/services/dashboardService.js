import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../config/firebase";

/**
 * Admin Dashboard Statistics
 */
export const getAdminDashboardStats = async () => {
  const [
    teachersSnap,
    studentsSnap,
    adminsSnap,
    usersSnap,
  ] = await Promise.all([
    getCountFromServer(
      query(
        collection(db, "users"),
        where("role", "==", "teacher")
      )
    ),

    getCountFromServer(
      query(
        collection(db, "users"),
        where("role", "==", "student")
      )
    ),

    getCountFromServer(
      query(
        collection(db, "users"),
        where("role", "==", "admin")
      )
    ),

    getCountFromServer(
      collection(db, "users")
    ),
    
  ]);

  return {
    totalTeachers: teachersSnap.data().count,
    totalStudents: studentsSnap.data().count,
    totalAdmins: adminsSnap.data().count,
    totalUsers: usersSnap.data().count,
  };
};

/**
 * Pending Requests
 */
export const getPendingRequests = async () => {
  const [
    teacherRequests,
    studentRequests,
  ] = await Promise.all([
    getCountFromServer(
      query(
        collection(db, "teacherRequests"),
        where("status", "==", "pending")
      )
    ),

    getCountFromServer(
      query(
        collection(db, "studentRequests"),
        where("status", "==", "pending")
      )
    ),
  ]);

  return {
    teacherRequests:
      teacherRequests.data().count,

    studentRequests:
      studentRequests.data().count,
  };
};