"use server";

import { auth, signOut } from "../auth";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: Record<string, unknown>;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  mode?: RequestMode;
}

export const apiFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const session = await auth();
  const baseUrl = process.env.BASE_API_URL || 'http://localhost:5000/';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  if (session?.user?.token) {
    headers.Authorization = `Bearer ${session.user.token}`;
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  
  if (!response.ok) {
    if (response.status === 401) {
      await signOut();
    }
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};
