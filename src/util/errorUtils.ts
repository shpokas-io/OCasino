export const extractErrorMessage = (
  error: unknown,
  defaultMsg: string
): string => {
  if (
    error &&
    typeof error === "object" &&
    "isAxiosError" in error &&
    (error as any).isAxiosError
  ) {
    return (
      (error as any).response?.data?.message ||
      (error as any).message ||
      defaultMsg
    );
  }
  if (error instanceof Error) return error.message;
  return defaultMsg;
};
