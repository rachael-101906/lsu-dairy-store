import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// Save receipt data to Firestore
export const couponGeneration = async (
  userId: string,
  status: "active" | "expired" | "redeemed",
  couponId: string,
  couponCode: string,
  expirationDate: Date,
) => {
  couponId = `coupon_${userId}_${Date.now()}`;
  couponCode = await generateCouponId();
  expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Set expiration date to 30 days from now

  try {
    // Call coupon generation function here
    const docRef = await setDoc(doc(db, "users", userId, "coupons", couponId), {
      userId,
      createdAt: new Date(),
      status,
      couponId,
      couponCode,
      expirationDate,
    });
    console.log("Coupon saved with ID: ", docRef);
    await updateDoc(doc(db, "users", userId), {
      points: increment(-1000),
    });
  } catch (error) {
    throw new Error("Error generating coupon: " + (error as Error).message);
  }
};

// Generates random unique coupon code and checks against Firestore to ensure uniqueness
async function generateCouponId() {
  let isUnique = false;
  let couponCode;

  couponCode = `DAIRY-${Math.floor(100000 + Math.random() * 900000)}`;

  while (!isUnique) {
    const q = query(
      collectionGroup(db, "coupons"),
      where("couponCode", "==", couponCode),
      where("status", "==", "active"),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      isUnique = true;
    } else {
      couponCode = `DAIRY-${Math.floor(1000 + Math.random() * 9000)}`;
    }
  }
  return couponCode;
}

// Fetch active coupons for a user
export const getUserCoupons = async (userId: string) => {
  try {
    const q = query(
      collection(db, "users", userId, "coupons"),
      where("status", "==", "active"),
    );
    const querySnapshot = await getDocs(q);
    const coupons = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return coupons;
  } catch (error) {
    console.error("Error fetching user coupons:", error);
    throw error;
  }
};
