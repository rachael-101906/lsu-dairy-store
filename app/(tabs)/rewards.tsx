import { images } from "@/constants/images";
import { useUserCoupons } from "@/services/useCoupons";
import { useUserReceipts } from "@/services/useReceipts";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const Rewards = () => {
  const { coupons, isLoading, error } = useUserCoupons();
  const {
    receipts,
    isLoading: isLoadingReceipts,
    error: receiptsError,
  } = useUserReceipts();

  // Sort coupons by expiration date (soonest first) and filter out expired coupons
  const allActiveCoupons = coupons.filter(
    (coupon) =>
      coupon.expirationDate &&
      (
        ((coupon.expirationDate as any)?.toDate?.() ??
          coupon.expirationDate) as Date
      ).getTime() > new Date().getTime(),
  );

  // Sort receipts by most recent date (what will be used in the display)
  const sortedCoupons = allActiveCoupons.sort((a, b) => {
    return (
      (
        ((a.expirationDate as any)?.toDate?.() ?? a.expirationDate) as Date
      ).getTime() -
      (
        ((b.expirationDate as any)?.toDate?.() ?? b.expirationDate) as Date
      ).getTime()
    );
  });

  // Sort receipts by most recent date (what will be used in the display)
  const sortedReceipts = receipts.sort((a, b) => {
    const aDate =
      a.date &&
      typeof a.date === "object" &&
      "toDate" in a.date &&
      typeof a.date.toDate === "function"
        ? a.date.toDate()
        : new Date(a.date);

    const bDate =
      b.date &&
      typeof b.date === "object" &&
      "toDate" in b.date &&
      typeof b.date.toDate === "function"
        ? b.date.toDate()
        : new Date(b.date);

    return aDate.getTime() - bDate.getTime();
  });

  return (
    <>
      {isLoading ||
        (isLoadingReceipts && (
          <View className="flex flex-col items-center justify-center top-auto">
            <ActivityIndicator
              size="large"
              color="black"
              className="justify-center items-center"
            />
            <Text className="text-black mt-2 text-center align-middle">
              Loading...
            </Text>
          </View>
        ))}

      {error ||
        (receiptsError && (
          <>
            <Image
              source={images.sadCow}
              className="w-60 h-60 mx-auto mt-5 items-center rounded-full p-5 bg-primary/30"
            />
            <Text className="text-2xl text-black font-normal text-center mb-5 mt-20 mx-10">
              Oh no! Something went wrong. Please retry.
            </Text>
            <Text className="text-xl text-gray-600 font-normal text-center mb-5 mt-20">
              Error: {error}
            </Text>
          </>
        ))}

      {!isLoading && !error && (
        <ScrollView
          className="w-full bg-white px-2 py-4 pt-[170px] mb-[85px]"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-2xl text-primary font-bold mb-10">
              Rewards
            </Text>
            <Text className="text-lg text-black font-light mb-10">Coupons</Text>
            {sortedCoupons.length === 0 ? (
              <Text className="text-gray-500">
                No active coupons available.
              </Text>
            ) : (
              sortedCoupons.map((coupon) => (
                <View key={coupon.couponId} className="mb-4">
                  <Text>{coupon.couponId}</Text>
                  <Text>{coupon.couponCode}</Text>
                  <Text>
                    {(
                      ((coupon.createdAt as any)?.toDate?.() ??
                        coupon.createdAt) as Date
                    ).toLocaleString()}
                  </Text>
                  <Text>
                    {(
                      ((coupon.expirationDate as any)?.toDate?.() ??
                        coupon.expirationDate) as Date
                    ).toLocaleString()}
                  </Text>
                </View>
              ))
            )}
            <Text className="text-lg text-black font-light mb-10 mt-10">
              Receipts
            </Text>
            {sortedReceipts.length === 0 ? (
              <Text className="text-gray-500">
                No active receipts available.
              </Text>
            ) : (
              sortedReceipts.map((receipt) => (
                <View key={receipt.receiptId} className="mb-4">
                  <Text>{receipt.subtotal}</Text>
                  <Text>{receipt.storeName}</Text>
                  <Text>
                    {receipt.date &&
                    typeof receipt.date === "object" &&
                    "toDate" in receipt.date &&
                    typeof receipt.date.toDate === "function"
                      ? receipt.date.toDate().toLocaleDateString()
                      : new Date(receipt.date).toLocaleDateString()}
                  </Text>
                  <Text>{receipt.time}</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Rewards;
