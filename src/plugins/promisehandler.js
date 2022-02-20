export const handlePromise = async (suppliedPromise) => {
  try {
    const data = await suppliedPromise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
