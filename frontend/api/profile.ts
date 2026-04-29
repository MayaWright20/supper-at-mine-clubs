import { apiClient, getAuthHeaders } from "./client";

export const profileApi = {
  getProfile(token: string) {
    return apiClient.get("/user/profile", {
      headers: getAuthHeaders(token)
    });
  },

  signUp(data: FormData) {
    return apiClient.post("/user/signup", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },

  login(data: FormData) {
    return apiClient.post("/user/login", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  updateProfilePicture(data: FormData, token?: string | null) {
    return apiClient.put("/user/profile/avatar", data, {
      headers: {
        ...getAuthHeaders(token),
        "Content-Type": "multipart/form-data"
      }
    });
  },

  logOut(token?: string | null) {
    return apiClient.get("/user/logout", {
      headers: getAuthHeaders(token)
    });
  },

  deleteProfile(token?: string | null) {
    return apiClient.delete("/user/delete", {
      headers: getAuthHeaders(token)
    });
  }
};
