

export interface Profile
{
    usrcode: string;
    user_name: string;
    user_dept: string;
    user_org: string;
    user_country: string;
    user_org_name: string;
    broker_id: string;
    user_date_created: Date | string;
    user_address: string;
    user_country: string;
    user_postcode: string;
    user_province: string;
    user_city: string;
    user_phone: string;
    user_mobile_no: string;
    user_email: string;
    user_type: string;
    user_account_type: string;
    user_active_statuc: string;
    user_id: string;
    user_pwd_reset_status: string;
    pwd_expire_days: number;
    user_wrong_pwd_count: number | null;
    user_date_last_succ_login: number | null;
    user_date_pwd_last_updated: Date | string;
    user_date_last_updated: Date | string;
}


export interface LoginResponse
{
    Status: 'SUCC' | 'FAIL';
    token: string;
    profile?: Profile[];
    Message?: string;
    Code?: string;
}