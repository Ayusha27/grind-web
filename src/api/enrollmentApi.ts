import axios from "axios";
import { API_BASE_URL } from "../config/api";

/* =========================================================
   AFFILIATE / REFERRAL
   ========================================================= */

export interface ValidateAffiliatePayload {
    code: string;
}

export interface ValidateAffiliateResponse {
    success: boolean;
    discount?: number;
    code?: string;
    message?: string;
}

export const validateAffiliate = async (
    payload: ValidateAffiliatePayload
): Promise<ValidateAffiliateResponse> => {
    const response = await axios.post<ValidateAffiliateResponse>(
        `${API_BASE_URL}/api/v1/affiliate/validate`,
        payload
    );

    return response.data;
};

/* =========================================================
   PAYMENT ORDER
   ========================================================= */

export interface CreatePaymentOrderPayload {
    plan: string;
    price: number;
    coupon?: string;
}

export interface CreatePaymentOrderResponse {
    success: boolean;
    order_id?: string;
    amount?: number;
    currency?: string;
    key_id?: string;
    message?: string;
}

export const createPaymentOrder = async (
    payload: CreatePaymentOrderPayload
): Promise<CreatePaymentOrderResponse> => {
    const response = await axios.post<CreatePaymentOrderResponse>(
        `${API_BASE_URL}/api/v1/payments/order`,
        payload
    );

    return response.data;
};

/* =========================================================
   PAYMENT VERIFICATION
   ========================================================= */

export interface VerifyPaymentPayload {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    name: string;
    email: string;
    phone: string;
    plan: string;
    original_price: number;
    discount_percent?: number;
    coupon_code?: string;
    final_price: number;
}

export interface VerifyPaymentResponse {
    success: boolean;
    message?: string;
    programme_link?: string;
    enrollment_id?: number;
}

export const verifyPayment = async (
    payload: VerifyPaymentPayload
): Promise<VerifyPaymentResponse> => {
    const response = await axios.post<VerifyPaymentResponse>(
        `${API_BASE_URL}/api/v1/payments/verify`,
        payload
    );

    return response.data;
};