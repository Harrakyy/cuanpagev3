"use client";

import api from "@/lib/axios";
import { ApiResponse } from "@/types";

export async function getData<T>(url: string) {
  const res = await api.get<ApiResponse<T>>(url);
  if (!res.data.success) throw new Error(res.data.error || "Request gagal");
  return res.data.data as T;
}

export async function postData<T>(url: string, payload: unknown) {
  const res = await api.post<ApiResponse<T>>(url, payload);
  if (!res.data.success) throw new Error(res.data.error || "Request gagal");
  return res.data.data as T;
}

export async function putData<T>(url: string, payload: unknown) {
  const res = await api.put<ApiResponse<T>>(url, payload);
  if (!res.data.success) throw new Error(res.data.error || "Request gagal");
  return res.data.data as T;
}

export async function patchData<T>(url: string, payload: unknown) {
  const res = await api.patch<ApiResponse<T>>(url, payload);
  if (!res.data.success) throw new Error(res.data.error || "Request gagal");
  return res.data.data as T;
}

export async function deleteData<T>(url: string) {
  const res = await api.delete<ApiResponse<T>>(url);
  if (!res.data.success) throw new Error(res.data.error || "Request gagal");
  return res.data.data as T;
}
