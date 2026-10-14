import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { View } from "react-native";

export default function CouponCard() {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);

  if (!user) {
    return null;
  }

  /* useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getDoc(doc(db, "users", user?.uid));
        if (response.exists()) {
          setPoints(response.data().points || 0);
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };
    fetchPoints();
  }, [user, points]); */

  return (
    <>
      <View className="items-start mt-4"></View>
    </>
  );
}
