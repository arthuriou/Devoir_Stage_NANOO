import { OtpRepository } from "../repositories/otpRepositories";
import { sendOtpEmail } from "../utils/mailService";

export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  
export const createOTP = async (): Promise<any> => {
  const code = generateOTP();
  const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  return {code, expires_at};
};

// export const verifyOTP = async ( email: string, code: string): Promise<boolean> => {
//   const otpEntry = await OtpRepository.findByEmail(email , 'email_verification');
//   if (!otpEntry) throw new Error("OTP introuvable");
//   if (new Date() > otpEntry.expires_at) throw new Error("OTP expiré");
//   if (otpEntry.code !== code) throw new Error("OTP incorrect");
//   await OtpRepository.deleteMany(email , otpEntry.type);
//   return true;
// };


// export const resendOtp = async(email : string): Promise<void> =>{
//   await OtpRepository.deleteMany(email , 'email_verification');
//   const { code, expires_at } = await createOTP();
//   await  OtpRepository.create(email, code, expires_at, 'email_verification');
//   await sendOtpEmail(email , code);
// }

