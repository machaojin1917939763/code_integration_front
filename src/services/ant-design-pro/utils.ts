export function removeEmptyStringFields<T>(obj: T): T {
  const cleanObj = {} as T;
  Object.keys(obj).forEach(key => {
    if (obj[key as keyof T] !== "") {
      cleanObj[key as keyof T] = obj[key as keyof T];
    }
  });
  return cleanObj;
}
