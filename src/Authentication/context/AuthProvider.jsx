import {
  createContext,
  useContext,
  useEffect,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../config/firebase";

import {
  setUser,
  clearUser,
  setLoading,
} from "../../redux/slices/authSlice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const authState = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(setLoading(true));

    let unsubscribeProfile = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // User Logged Out
        if (!firebaseUser) {
          if (unsubscribeProfile) {
            unsubscribeProfile();
            unsubscribeProfile = null;
          }

          dispatch(clearUser());

          return;
        }

        // Remove previous listener if any
        if (unsubscribeProfile) {
          unsubscribeProfile();
        }

        // Listen to Firestore user document
        unsubscribeProfile = onSnapshot(
          doc(db, "users", firebaseUser.uid),
          (snapshot) => {
            if (!snapshot.exists()) {
              dispatch(clearUser());
              return;
            }

            const profile = snapshot.data();

            dispatch(
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                emailVerified:
                  firebaseUser.emailVerified,

                displayName:
                  profile.displayName ??
                  firebaseUser.displayName ??
                  "",

                photoURL:
                  profile.photoURL ??
                  firebaseUser.photoURL ??
                  "",

                ...profile,
              })
            );

            dispatch(setLoading(false));
          },
          (error) => {
            console.error(
              "User Snapshot:",
              error
            );

            dispatch(clearUser());
          }
        );
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, [dispatch]);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () =>
  useContext(AuthContext);