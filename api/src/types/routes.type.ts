export type CreateFormData = {
  question: string;
  category: string;
  lengthActive: number;
  options: {
    value: string;
  }[];
};
