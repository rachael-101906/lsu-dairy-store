import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export const useFlavors = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const flavorsCollection = collection(db, "flavors");

    const unsubscribe = onSnapshot(
      flavorsCollection,
      (snapshot) => {
        const flavorsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        console.log("Firestore data:", JSON.stringify(flavorsData));
        setProducts(flavorsData);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching ice cream. Please try again.", err);
        setError(err.message);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { products, isLoading, error };
};
