export function generalResponse<T>(
  status: number = 200,
  message: string = "Success",
  data?: T
) {
  if (data) {
    return {
      status: status,
      message: message,
      data,
    };
  }

  return {
    status,
    message,
  };
}
