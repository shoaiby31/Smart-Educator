import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
/**
 * Create User Profile
 */
export const createUserProfile = async ({
  uid,
  displayName,
  email,
  photoURL = "",
  role = "student",
  isEmailVerified = false,
}) => {
  const userRef = doc(db, "users", uid);

  await setDoc(userRef, {
    uid,

    displayName,

    email,

    photoURL,

    role,

    schoolId: null,

    schoolName: null,

    isProfileCompleted: false,

    isEmailVerified,

    status: "active",

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),

    lastLogin: serverTimestamp(),
  });
};

/**
 * Get User Profile
 */
export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    ...data,

    createdAt: data.createdAt?.toMillis() ?? null,

    updatedAt: data.updatedAt?.toMillis() ?? null,

    lastLogin: data.lastLogin?.toMillis() ?? null,
  };
};

/**
 * Check Profile Exists
 */
export const userProfileExists = async (uid) => {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  return snapshot.exists();
};

/**
 * Update User Profile
 */
export const updateUserProfile = async (
  uid,
  data
) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Update Last Login
 */
export const updateLastLogin = async (uid) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    lastLogin: serverTimestamp(),
  });
};

/**
 * Update Email Verification Status
 */
export const updateEmailVerification = async (
  uid,
  verified
) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    isEmailVerified: verified,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Update User Status
 */
export const updateUserStatus = async (
  uid,
  status
) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    status,
    updatedAt: serverTimestamp(),
  });
};

export const getUserByEmail = async (email) => {
  const q = query(
    collection(db, "users"),
    where("email", "==", email)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
};