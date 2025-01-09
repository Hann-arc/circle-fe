// export interface Thread {
//   id: number;
//   fullName: string;
//   username: string;
//   time: string;
//   avatar: string;
//   content: string;
//   likes: number;
//   liked: boolean;
//   replies: number;
// }

export interface Thread {
  id: number;
  content: string;
  media?: string;
  authorId: number;
  createdAt: string;
  replies: Reply[];
  likes: [];
  liked: boolean,
  _count: {
    likes: number;
    replies: number;
  };
  author: {
    userName: string;
    fullName: string;
    Profile?: {
      avatar: string;
    };
  };
}

export interface Reply {
  content: string;
  media: string;
  author: {
    userName: string;
    fullName: string;
    Profile?: {
      avatar: string;
    };
  };
}
