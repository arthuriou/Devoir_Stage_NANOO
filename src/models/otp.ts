export interface Otp {
    id?: string;
    email: string;
    code: string;
    type: 'email_verification' | 'password_reset';
    expires_at: Date;
    used: boolean;
    created_at?: Date;
  }

export default  Otp;