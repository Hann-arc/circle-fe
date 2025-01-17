import { Thread } from "@/types/threads";

export interface Following {
  following: {
    id: number;
    fullName: string;
    userName: string;
    Profile: Profile | null;
  };
}

export interface Follower {
  follower: {
    id: number;
    fullName: string;
    userName: string;
    Profile: Profile | null;
  };
}

export interface Count {
  followers: number;
  following: number;
}

export interface Profile {
  bio: string;
  avatar: string;
  cover: string;
}

export interface User {
  id: number;
  email: string;
  userName: string;
  fullName: string;
  following: Following[];
  followers: Follower[];
  _count: Count;
  Profile: Profile | null;
  Thread: Thread[]
}


