import axios from "axios";

import { API_BASE_URL } from "../config/api";
import type { DashboardResponse } from "../types/dashboard";
import type { ProgressResponse } from "../types/progress";

/*
 * Admin views of a client's portal data.
 *
 * The portal endpoints authenticate the CLIENT by access token, so these pass
 * that client's token explicitly instead of going through the admin `api`
 * instance (whose interceptor would attach the admin's own token).
 */

const asClient = (accessToken: string) => ({
    headers: { Authorization: `Bearer ${accessToken}` },
});

export const getClientProgress = async (accessToken: string): Promise<ProgressResponse> => {
    const response = await axios.get<ProgressResponse>(
        `${API_BASE_URL}/api/v1/portal/progress`,
        asClient(accessToken),
    );
    return response.data;
};

export const getClientPlan = async (accessToken: string): Promise<DashboardResponse> => {
    const response = await axios.get<DashboardResponse>(
        `${API_BASE_URL}/api/v1/portal/my-plan`,
        asClient(accessToken),
    );
    return response.data;
};
