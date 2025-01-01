"use server";

import { auth } from "../auth";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: any;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  mode?: RequestMode;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const authData = await auth();
  const user = authData?.user
  const token = user?.token
  console.log("token =",token);
  const defaultOptions: FetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include', 
  };

  try {
    const fetchOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    if (fetchOptions.body && typeof fetchOptions.body !== 'string') {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    // Make the fetch call
    const response = await fetch(`http://localhost:5000/${endpoint}`, fetchOptions);
    const status = response.status;

    // Parse the response
    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      // Response might be empty or not JSON
    }

    // Handle unsuccessful responses
    if (!response.ok) {
      return {
        data: null,
        error: data?.message || 'An error occurred',
        status,
      };
    }

    // Return successful response
    return {
      data,
      error: null,
      status,
    };
  } catch (error) {
    // Handle network errors or other exceptions
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    };
  }
}
