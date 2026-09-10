import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import {
  createUserProfile,
  userProfileExists,
   getUserByEmail,
  updateEmailVerification,
} from "./userService";

/**
 * Register user with Email & Password
 */
export const registerUser = async ({
  displayName,
  email,
  password,
  role,
}) => {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  await updateProfile(user, {
    displayName: displayName,
  });

  await createUserProfile({
    uid: user.uid,
    displayName,
    email,
    role,
    isEmailVerified: false,
  });

  await sendEmailVerification(user);

  return user;
};

/**
 * Login with Email & Password
 */
export const loginUser = async ({
  email,
  password,
}) => {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
};

/**
 * Login with Google
 */
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(
    auth,
    googleProvider
  );

  const user = result.user;
const existingUser = await getUserByEmail(user.email);
  // const exists = await userProfileExists(user.uid);

if (existingUser) {
  if (!existingUser.isEmailVerified) {
    await updateEmailVerification(
      existingUser.uid,
      true
    );
  }

  return user;
}

await createUserProfile({
  uid: user.uid,
  displayName: user.displayName || "",
  email: user.email || "",
  photoURL: user.photoURL || "",
  role: "student",
  isEmailVerified: true,
});

  return user;
};

/**
 * Logout
 */
export const logoutUser = async () => {
  await signOut(auth);
};

/**
 * Reset Password
 */
export const forgotPassword = async (
  email
) => {
  await sendPasswordResetEmail(
    auth,
    email
  );
};

/**
 * Send Verification Email Again
 */
export const resendVerificationEmail =
  async () => {
    if (!auth.currentUser) return;

    await sendEmailVerification(
      auth.currentUser
    );
  };

/**
 * Current Logged-in User
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};