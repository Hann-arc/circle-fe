import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikesState {
  localLikes: Record<number, boolean>;
  setLocalLike: (id: number, updater: boolean | ((prev: boolean) => boolean)) => void;
}

export const useLikeStore = create<LikesState>()(
  persist(
    (set) => ({
      localLikes: {},
      setLocalLike: (threadId, updater) =>
        set((state) => ({
          localLikes: {
            ...state.localLikes,
            [threadId]:
              typeof updater === "function"
                ? updater(state.localLikes[threadId] ?? false)
                : updater,
          },
        })),
    }),
    {
      name: "likes-storage", 
    }
  )
);
