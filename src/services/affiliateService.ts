import api from "./api";

export interface AffiliateSummaryRow {
    id: number;
    affiliate_name: string | null;
    affiliate_email: string | null;
    code: string | null;
    discount_percent: number | null;
    commission_percent: number;
    status: string | null;
    total_sales: number;
    revenue: number;
    average_order: number;
    commission_due: number;
}

export interface AffiliateListResponse {
    success: boolean;
    summary: {
        total_affiliates: number;
        total_sales: number;
        total_revenue: number;
    };
    affiliates: AffiliateSummaryRow[];
}

export interface AffiliateReferral {
    id: number;
    name: string | null;
    email: string | null;
    plan_name: string | null;
    amount_paid: number;
    commission: number;
    payment_status: string | null;
    /** "YYYY-MM-DD HH:MM:SS", database time. */
    created_at: string | null;
}

export interface AffiliateDetailResponse {
    success: boolean;
    affiliate: {
        id: number;
        affiliate_name: string | null;
        affiliate_email: string | null;
        code: string | null;
        discount_percent: number | null;
        commission_percent: number;
        status: string | null;
        created_at: string | null;
        /** "YYYY-MM-DD" or null when the code never expires. */
        expiry_date: string | null;
    };
    summary: {
        total_referrals: number;
        paid_referrals: number;
        total_earnings: number;
    };
    referrals: AffiliateReferral[];
}

export const getAffiliates = async (): Promise<AffiliateListResponse> => {
    const response = await api.get<AffiliateListResponse>("/admin/affiliates");
    return response.data;
};

export const getAffiliateDetail = async (id: number): Promise<AffiliateDetailResponse> => {
    const response = await api.get<AffiliateDetailResponse>(`/admin/affiliates/${id}`);
    return response.data;
};
