export const saveReceipt = async (
  userId: string,
  storeName: string,
  date: Date,
  valid: boolean,
  subtotal: number,
  receiptId: string,
  time: string,
  error: string | null,
) => {
  void userId;
  void storeName;
  void date;
  void valid;
  void subtotal;
  void receiptId;
  void time;
  void error;
  throw new Error(
    "Receipt storage is disabled because this project has been archived.",
  );
};

export const addPoints = async (userId: string, subtotal: number) => {
  void userId;
  void subtotal;
  throw new Error(
    "Points updates are disabled because this project has been archived.",
  );
};
