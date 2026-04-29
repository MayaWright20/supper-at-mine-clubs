import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_URL
});

export function getAuthHeaders(token?: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
