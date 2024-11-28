export type PollType = {
  pid: number;
  question: string;
  category: string;
  options: {
    value: string;
  }[];
  created_at: Date;
  expires_at: Date;
};
