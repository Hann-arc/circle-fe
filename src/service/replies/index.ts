import { Api } from "@/libs/api";
import { Replies } from "@/types/reply";
import { useQuery } from "@tanstack/react-query";

export function useFindReplies(threadId: number) {
  return useQuery<Replies[]>({
    queryKey: ["replies", threadId],
    queryFn: async () =>{
        return (await Api.get(`/reply/${threadId}`)).data
    }
  },
)
}
