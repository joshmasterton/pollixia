export type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  idToken: string;
};

export type PollType = {
  cpid: string;
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
