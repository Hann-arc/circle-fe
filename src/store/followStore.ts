import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface FollowStore {
  follows: Record<number, boolean>;
  toggleFollow: (userId: number, isFollowing: boolean) => void;
}


export const useFollowStore = create<FollowStore>()(
  persist(
    (set) => ({
      follows: {},
      toggleFollow: (userId, isFollowing) => {
        set((state) => ({
          follows: { ...state.follows, [userId]: isFollowing },
        }));
      },
    }),
    { 
      name: 'follow-status'
    }
  )
);
