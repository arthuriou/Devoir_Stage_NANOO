export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createOTP = async (): Promise<any> => {
  const code = generateOTP();
  const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return { code, expires_at };
};
