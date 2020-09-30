export const typeOf = <T>(
  discriminatorKey: string,
  object: any
): object is T => {
  return discriminatorKey in object;
};
