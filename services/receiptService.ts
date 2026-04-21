import {
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Save receipt data to Firestore
export const saveReceipt = async (
  userId: string,
  storeName: string,
  date: string,
  valid: boolean,
  subtotal: number,
  receiptId: string,
  time: string,
  error: string | null,
) => {
  const receiptDocRef = collection(db, "users", userId, "receipts");
  const receiptDuplicateQuery = await getDoc(doc(receiptDocRef, receiptId));

  if (receiptDuplicateQuery.exists()) {
    console.error("Receipt with ID already exists.");
    throw new Error("Receipt with ID already exists.");
  }
  try {
    const docRef = await setDoc(
      doc(db, "users", userId, "receipts", receiptId),
      {
        storeName,
        date,
        valid,
        subtotal,
        receiptId,
        time,
        error,
        createdAt: new Date(),
      },
    );
    console.log("Receipt saved with ID: ", docRef);
  } catch (error) {
    console.error("Error saving receipt to Firestore:", error);
    throw error;
  }
};

export const addPoints = async (userId: string, subtotal: number) => {
  const pointsPerDollar = 20;
  const pointsEarned = Math.floor(subtotal) * pointsPerDollar;
  try {
    await updateDoc(doc(db, "users", userId), {
      points: increment(pointsEarned),
    });
  } catch (error) {
    console.error("Error updating points in Firestore:", error);
    throw error;
  }
};
