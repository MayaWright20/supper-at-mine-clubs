import type { components } from "@/types/types";

import { apiClient, getAuthHeaders } from "./client";

export const suppersApi = {
  create(data: FormData, token?: string | null) {
    return apiClient.post("/suppers", data, {
      headers: {
        ...getAuthHeaders(token),
        "Content-Type": "multipart/form-data"
      }
    });
  },

  getSupper(supperId: string, token?: string | null) {
    return apiClient.get<{
      success: boolean;
      supper: components["schemas"]["Supper"];
    }>(`/suppers/${supperId}`, {
      headers: getAuthHeaders(token)
    });
  },

  getAllSuppers(token?: string | null) {
    return apiClient.get<{
      success: boolean;
      allSuppers: components["schemas"]["Supper"][];
    }>("/suppers", {
      headers: getAuthHeaders(token)
    });
  },

  updateSupper(supperId: string, seats: number, token?: string | null) {
    return apiClient.patch<{
      success: boolean;
      supper: components["schemas"]["Supper"];
    }>(
      `/suppers/${supperId}/book`,
      { seats },
      { headers: getAuthHeaders(token) }
    );
  }
};
