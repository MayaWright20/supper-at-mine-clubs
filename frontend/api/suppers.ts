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

  getAll(token?: string | null) {
    return apiClient.get<{
      success: boolean;
      allSuppers: components["schemas"]["Supper"][];
    }>("/suppers", {
      headers: getAuthHeaders(token)
    });
  }
};
