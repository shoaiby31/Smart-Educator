import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../config/firebase";

export const getAdminDashboardStats = async () => {
  const snapshot = await getDocs(collection(db, "users"));

  const stats = {
    totalTeachers: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalUsers: snapshot.size,
  };

  snapshot.forEach((doc) => {
    const user = doc.data();

    switch (user.role) {
      case "teacher":
        stats.totalTeachers++;
        break;

      case "student":
        stats.totalStudents++;
        break;

      case "admin":
        stats.totalAdmins++;
        break;

      default:
        break;
    }
  });

  return stats;
};