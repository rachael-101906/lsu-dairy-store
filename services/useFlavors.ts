import { collection, doc, onSnapshot } from "firebase/firestore";
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

export const useFlavorById = (id: string) => {
  const [flavor, setFlavor] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const flavorDoc = doc(db, "flavors", id);

    const unsubscribe = onSnapshot(
      flavorDoc,
      (snapshot) => {
        if (snapshot.exists()) {
          const flavorData = { ...snapshot.data() } as Product;
          console.log("Firestore data for flavor:", JSON.stringify(flavorData));
          setFlavor(flavorData);
        } else {
          setError("Flavor not found");
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching flavor. Please try again.", err);
        setError(err.message);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [id]);

  return { flavor, isLoading, error };
};
