import { useSuggestedUser } from "@/service/user"

export const useGetSuggestedUser=  () => {
    const {data: suggestedUser, isLoading, isError } = useSuggestedUser()

    return {
        suggestedUser, isLoading, isError
    }
}