export interface User {
id?:string;
username:string;
email:string;
bio?:string;
profile_picture?:string;
password:string;
created_at:Date;
verified?:boolean;
is_active?:boolean;
}
