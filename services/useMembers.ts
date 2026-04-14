import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Save user data to Firestore
export const saveUser = async (
  userId: string,
  email: string,
  firstName: string,
  lastName: string,
  studentStatus: boolean,
) => {
  try {
    await setDoc(doc(db, "users", userId), {
      email,
      firstName,
      lastName,
      studentStatus,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
    throw error;
  }
};
