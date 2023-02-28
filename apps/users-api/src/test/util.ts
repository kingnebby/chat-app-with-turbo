export const expectToThrowWithMatchingError = async (
  fn: () => Promise<any>,
  expectedMessage: string,
) => {
  try {
    await fn();
    throw new Error(`should throw error: ${expectedMessage}`);
  } catch (error) {
    expect(error.message).toEqual(expectedMessage);
  }
};
