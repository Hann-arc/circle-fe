import { useSearchUsers } from "@/service/user";

export function useSearch(query: string) {
    const { data: users, isLoading, isError } = useSearchUsers(query);
    return {
      users,
      isLoading,
      isError,
    };
  }