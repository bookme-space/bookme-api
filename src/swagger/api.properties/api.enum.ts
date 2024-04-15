export const ToApiEnum = <T extends Record<number, string>>(
  enumiration: T,
) =>
  Object.entries(enumiration).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(typeof value == "string" && { [key]: value }),
    }),
    {} as Record<number, keyof T>,
  );
