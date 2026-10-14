/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";

admin.initializeApp();
const db = admin.firestore();

export const createCoupon = onRequest(async (request, response) => {
  response.status(410).json({
    error: { message: "This archived service is no longer available." },
  });
  return;

  /*
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) {
    response.status(401).json({
      error: { message: "Missing Authorization header" },
    });
    return;
  }
  const headerToken = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.slice(7)
    : undefined;
  const { idToken } = (request.body?.data ?? {}) as { idToken?: string };
  const tokenToVerify = idToken || headerToken;
  if (!tokenToVerify) {
    response.status(401).json({
      error: { message: "Missing Firebase ID token" },
    });
    return;
  }

  let authUid: string;

  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(tokenToVerify)
      .catch((error) => {
        throw new Error("Invalid Firebase ID token");
      });
    authUid = decodedToken.uid;
  } catch (error) {
    logger.info("Failed to verify Firebase ID token:", error);
    response.status(401).json({
      error: { message: "Invalid Firebase ID token" },
    });
    return;
  }

  const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const userId = authUid;

  const maxAttempts = 5;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    logger.info(`Attempting to generate coupon for user: ${userId}`);

    try {
      const result = await db.runTransaction(async (transaction) => {
        const userRef = db.collection("users").doc(userId);
        const userSnapshot = await transaction.get(userRef);

        if (!userSnapshot.exists) {
          logger.info(`User not found: ${userId}`);
          throw new Error("USER_NOT_FOUND");
        }

        const points = userSnapshot.data()?.points || 0;

        const couponCode = makeCouponCode();
        const couponId = db.collection("coupons").doc().id;

        const couponRefSnapshot = await transaction.get(
          db.collection("coupons").doc(couponId),
        );

        if (couponRefSnapshot.data()?.couponCode === couponCode) {
          throw new Error("already-exists");
        }

        if (points < 1000) {
          throw new Error("INSUFFICIENT_POINTS");
        }

        const couponRef = db
          .collection("users")
          .doc(userId)
          .collection("coupons")
          .doc(couponId);

        const allCouponsRef = db.collection("coupons").doc(couponId);

        transaction.create(couponRef, {
          userId,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "active",
          couponId,
          couponCode,
          expirationDate: admin.firestore.Timestamp.fromDate(expirationDate),
        });

        transaction.create(allCouponsRef, {
          couponCode,
          userId,
          status: "active",
          expirationDate: admin.firestore.Timestamp.fromDate(expirationDate),
        });

        transaction.update(userRef, {
          points: admin.firestore.FieldValue.increment(-1000),
        });

        return { success: true, couponId, couponCode };
      });

      response.status(200).json({ result });
      return;
    } catch (error) {
      const message = (error as { message?: string }).message;

      if (message === "USER_NOT_FOUND") {
        response.status(404).json({
          error: { message: "User not found" },
        });
        return;
      }

      if (message === "INSUFFICIENT_POINTS") {
        response.status(412).json({
          error: { message: "Insufficient points to generate coupon" },
        });
        return;
      }

      const code = (error as { code?: string | number }).code;
      if (
        (code === "already-exists" || code === 6) &&
        attempt < maxAttempts - 1
      ) {
        continue;
      }

      logger.info("Unexpected error during coupon creation:", error);
      response.status(500).json({
        error: { message: "Failed to create coupon" },
      });
      return;
    }
  }

  response.status(429).json({
    error: { message: "Could not generate a unique coupon code" },
  });
  */
});

// Generates a random 6-character coupon code
const makeCouponCode = () => {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += str.charAt(Math.floor(Math.random() * str.length));
  }
  return `DAIRY-${result}`;
};

// Checks for expired coupons and updates their status
export const checkCouponExpiration = onSchedule("* * * * *", async () => {
  const BATCH_SIZE = 450;
  const now = admin.firestore.Timestamp.now();
  logger.info("Running coupon expiration sweep", {
    now: now.toDate().toISOString(),
  });

  try {
    const expiredCouponsQuery = await db
      .collection("coupons")
      .where("expirationDate", "<=", now)
      .get();

    const expiredActiveCoupons = expiredCouponsQuery.docs.filter((doc) => {
      return doc.data()?.status === "active";
    });

    if (expiredActiveCoupons.length === 0) {
      logger.info("No expired active coupons found", {
        scanned: expiredCouponsQuery.size,
      });
      return;
    }

    logger.info("Expired active coupons found", {
      scanned: expiredCouponsQuery.size,
      expired: expiredActiveCoupons.length,
    });

    // Process the expired coupons in batches to not exceed the batch size limit
    for (let i = 0; i < expiredActiveCoupons.length; i += BATCH_SIZE) {
      const batch = db.batch();
      const chunk = expiredActiveCoupons.slice(i, i + BATCH_SIZE);
      chunk.forEach((doc) => {
        batch.set(doc.ref, { status: "expired" }, { merge: true });
      });
      try {
        await batch.commit();
      } catch (error) {
        logger.error(
          `Error committing batch of ${chunk.length} documents`,
          error,
        );
        throw error;
      }
    }

    logger.info(`Updated ${expiredActiveCoupons.length} expired coupons`);
  } catch (error) {
    logger.error("Coupon expiration sweep failed", error);
    throw error;
  }
});

export const updateCouponStatusForUser = onDocumentUpdated(
  "coupons/{couponId}",
  async (event) => {
    const beforeData = event.data?.before?.data();
    const afterData = event.data?.after?.data();
    if (!beforeData || !afterData) return;

    if (beforeData.status === afterData.status) return;

    const userId = afterData.userId as string;
    const couponIdFromGlobal = event.params?.couponId as string;
    const newStatus = afterData.status as string;

    if (!userId || !newStatus) return;

    if (!couponIdFromGlobal) return;

    const userCouponRef = db
      .collection("users")
      .doc(userId)
      .collection("coupons")
      .doc(couponIdFromGlobal);

    await userCouponRef.set({ status: newStatus }, { merge: true });
    logger.info(
      `Updated coupon status for user ${userId} and coupon ${couponIdFromGlobal} to ${newStatus}`,
    );
    return;
  },
);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
