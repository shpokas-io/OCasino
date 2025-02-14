export const extractErrorMessage = (
  error: unknown,
  defaultMsg: string
): string => {
  if (
    error &&
    typeof error === "object" &&
    "isAxiosError" in error &&
    //TODO: Need more strict type for errors instead of any
    (error as any).isAxiosError
  ) {
    //TODO: Need refactoring for the return logic
    return (
      (error as any).response?.data?.message ||
      (error as any).message ||
      defaultMsg
    );
  }
  if (error instanceof Error) return error.message;
  return defaultMsg;
};
