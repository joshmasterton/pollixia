export type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export type Poll = {
  pid: number;
  question: string;
  category: string;
  lengthActive: number;
  options: {
    value: string;
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
