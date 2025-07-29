export interface otp {
    id: number;
    user_id: number;
    code: string;
    expires_at: Date;
    used: boolean;
  }

  export default otp;