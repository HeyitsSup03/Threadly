import { QueryClient, QueryFunction } from "@tanstack/react-query";
import * as localStorage from "./localStorage";

// Create a mock response that mimics the fetch API response
class MockResponse {
  ok: boolean;
  status: number;
  statusText: string;
  data: any;

  constructor(ok: boolean, status: number, statusText: string, data: any) {
    this.ok = ok;
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }

  async text() {
    return this.statusText;
  }

  async json() {
    return this.data;
  }
}

// Function to handle API requests without a backend
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<MockResponse> {
  // Parse the URL to determine the resource being requested
  const urlParts = url.split('/');
  const endpoint = urlParts[urlParts.length - 2]; // e.g. "threads", "users", etc.
  const id = urlParts[urlParts.length - 1];
  
  try {
    // Handle different types of requests
    if (method === 'GET') {
      let result;
      if (endpoint === 'threads') {
        if (id === 'threads') {
          result = localStorage.getThreads();
        } else {
          result = localStorage.getThreadById(id);
        }
      } else if (endpoint === 'users') {
        if (id === 'users') {
          result = localStorage.getUsers();
        } else {
          result = localStorage.getUserById(id);
        }
      } else if (endpoint === 'categories') {
        if (id === 'categories') {
          result = localStorage.getCategories();
        } else {
          result = localStorage.getCategoryById(id);
        }
      } else if (endpoint === 'comments') {
        result = localStorage.getCommentsByThreadId(id);
      }
      
      return new MockResponse(true, 200, 'OK', result);
    } else if (method === 'POST') {
      let result;
      if (endpoint === 'threads') {
        result = localStorage.createThread(data as any);
      } else if (endpoint === 'comments') {
        result = localStorage.createComment(data as any);
      }
      return new MockResponse(true, 201, 'Created', result);
    } else if (method === 'PUT' || method === 'PATCH') {
      // Implement as needed
      return new MockResponse(true, 200, 'OK', {});
    } else if (method === 'DELETE') {
      // Implement as needed
      return new MockResponse(true, 204, 'No Content', null);
    }
    
    return new MockResponse(false, 405, 'Method Not Allowed', null);
  } catch (error) {
    console.error('API error:', error);
    return new MockResponse(false, 500, 'Internal Server Error', null);
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    const response = await apiRequest('GET', url);

    if (!response.ok) {
      if (unauthorizedBehavior === "returnNull" && response.status === 401) {
        return null;
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
