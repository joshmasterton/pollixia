export interface UserRequest extends Request {
  user: {
    uid: string;
  };
}
