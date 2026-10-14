import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { db } from "./firebase";

export const useUserCoupons = () => {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user?.uid) {
      setIsLoading(false);
      setCoupons([]);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);

    const couponsCollection = query(
      collection(db, "users", user.uid, "coupons"),
      where("status", "==", "active"),
    );

    const unsubscribe = onSnapshot(
      couponsCollection,
      (snapshot) => {
        const couponsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Coupon),
        })) as Coupon[];

        setCoupons(couponsData);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching coupons. Please try again.", err);
        setError(err.message);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return { coupons, isLoading, error };
};

export const useCouponById = (id: string) => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const couponDoc = doc(db, "coupons", id);

    const unsubscribe = onSnapshot(
      couponDoc,
      (snapshot) => {
        if (snapshot.exists()) {
          const couponData = { ...snapshot.data() } as Coupon;
          setCoupon(couponData);
        } else {
          setError("Coupon not found");
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching coupon. Please try again.", err);
        setError(err.message);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [id]);

  return { coupon, isLoading, error };
};
