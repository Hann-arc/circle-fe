export interface Replies {
  id: number;
  content: string;
  media: string;
  threadId: number
  authorId: number
  createdAt: string;
  updatedAt: string;
  author: {
    fullName: string;
    userName: string;
    Profile: {
      avatar: string;
    };
  };
}
