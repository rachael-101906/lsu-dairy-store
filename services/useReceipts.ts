import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { db } from "./firebase";

export const useUserReceipts = () => {
  const { user } = useAuth();
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user?.uid) {
      setIsLoading(false);
      setReceipts([]);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);

    const receiptsCollection = collection(db, "users", user.uid, "receipts");

    const unsubscribe = onSnapshot(
      receiptsCollection,
      (snapshot) => {
        const receiptsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Receipt),
        })) as Receipt[];

        setReceipts(receiptsData);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching receipts. Please try again.", err);
        setError(err.message);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return { receipts, isLoading, error };
};
