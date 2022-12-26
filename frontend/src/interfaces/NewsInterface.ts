export interface News {
  category: string;
  external: boolean;
  file: File | null;
  format: string;
  newsContent: string;
  place: string;
  titleEng: string;
  titleMal: string;
  type: string;
  tags: string[];
  likes: number;
  views: number;
  userId: string;
  postedAt: string;
  author: string;
  published: boolean;
  _id?: string;
}
