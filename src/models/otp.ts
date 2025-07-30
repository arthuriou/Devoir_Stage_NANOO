export interface Otp {
    id?: string;
    email: string;
    code: string;
    expires_at: Date;
    used: boolean;
    created_at?: Date;
  }

export default  Otp;