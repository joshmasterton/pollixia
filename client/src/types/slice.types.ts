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
    isSelected?: boolean;
  }[];
};

export type PopupType = {
  id: string;
  text: string;
  title?: string;
};

export type CreateFormData = {
  question: string;
  category: string;
  lengthActive: number;
  options: {
    value: string;
  }[];
};

export type SearchFormData = {
  search?: string;
};
