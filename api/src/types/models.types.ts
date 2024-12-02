export type PollType = {
  pid: number;
  question: string;
  category: string;
  created_at: Date;
  expires_at: Date;
  options: {
    oid: number;
    text: string;
    votes: number;
  }[];
};

export type OptionsType = {
  oid: number;
  pid: number;
  text: string;
  votes: number;
};
