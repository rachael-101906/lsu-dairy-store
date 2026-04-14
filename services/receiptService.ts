import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// Save receipt data to Firestore
export const saveReceipt = async (
  userId: string,
  storeName: string,
  date: string,
  valid: boolean,
  total: number,
  receiptId: string,
) => {
  try {
    await setDoc(doc(db, "users", userId, "receipts", receiptId), {
      storeName,
      date,
      valid,
      total,
      receiptId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error saving receipt to Firestore:", error);
    throw error;
  }
};

export const addPoints = async (userId: string, total: number) => {
  const pointsPerDollar = 20;
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      // TODO: Update points based on total amount spent
      // points: firestore.FieldValue.increment(pointsEarned),
    });
  } catch (error) {
    console.error("Error updating points in Firestore:", error);
    throw error;
  }
};
