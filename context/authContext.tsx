import * as WebBrowser from "expo-web-browser";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { auth, db } from "../services/firebase";

import { getFirebaseErrorMessage } from "../utils/firebaseErrors";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  user: User | null;
  loading: boolean;
  displayName: string;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  forgottenPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("Dairy Lover");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setDisplayName(firebaseUser?.displayName || "Tiger");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const firebaseCall = async (action: () => Promise<any>) => {
    try {
      setLoading(true);
      return await action();
    } catch (error) {
      const message = getFirebaseErrorMessage((error as { code: string }).code);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !user.uid) {
      setDisplayName("Tiger");
      return;
    }
    const unsubscribeDisplayName = onSnapshot(
      doc(db, "users", user.uid),
      (userDoc) => {
        if (userDoc.exists()) {
          const data = userDoc.data();
          setDisplayName(data.firstName || "Tiger");
        } else {
          setDisplayName("Tiger");
        }
      },
    );

    return () => unsubscribeDisplayName();
  }, [user]);

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
  ): Promise<UserCredential> => {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match. Please try again.");
    }
    return firebaseCall(async () => {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const trimmedName = name.trim();
      const displayName = trimmedName || "Tiger";
      await updateProfile(result.user, { displayName });

      return result;
    });
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return firebaseCall(() =>
      signInWithEmailAndPassword(auth, email, password),
    );
  };

  const forgottenPassword = (email: string): Promise<void> => {
    return firebaseCall(() => sendPasswordResetEmail(auth, email));
  };

  const logout = (): Promise<void> => {
    return firebaseCall(() => signOut(auth));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        forgottenPassword,
        displayName,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
