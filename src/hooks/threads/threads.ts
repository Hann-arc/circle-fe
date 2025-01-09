import { useFindThreads } from "@/service/thread";

export const useGetThreads = () => {    
    const { data: threads, isLoading, isError, error } = useFindThreads();
    return { threads, isLoading, isError, error };
}