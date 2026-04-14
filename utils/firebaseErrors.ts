// utils/firebaseErrors.ts
export const firebaseErrorMessages: Record<string, string> = {
  "auth/invalid-email": "The email address is not valid.",
  "auth/invalid-credential":
    "The email or password is incorrect. Please try again.",
  "auth/operation-not-allowed":
    "The provided sign-in provider is disabled for your Firebase project. Enable it from the Sign-in Method section of the Firebase console.",
  "auth/too-many-requests":
    "The number of requests exceeds the maximum allowed.",
  "auth/network-request-failed":
    "A network error occurred. Please check your connection and try again.",
  "auth/user-disabled":
    "The user account has been disabled by an administrator.",
  "auth/user-not-found":
    "There is no existing user record corresponding to the provided identifier.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use":
    "This email is already in use. Please use a different one.",
  "auth/weak-password":
    "The password is too weak. Please choose a stronger password.",
  default: "An unexpected error occurred. Please try again.",
};

export const getFirebaseErrorMessage = (errorCode: string): string => {
  return firebaseErrorMessages[errorCode] || firebaseErrorMessages["default"];
};
