export type UserRequest = Request & {
  user: {
    uid: string;
  };
};
