export type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  idToken: string;
};

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
    isSelected?: boolean;
  }[];
};

export type CreateFormData = {
  question: string;
  category: string;
  lengthActive: number;
  options: {
    value: string;
  }[];
};
