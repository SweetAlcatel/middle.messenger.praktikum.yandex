export interface IChatsGet {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface IChatUser {
  offset: number;
  limit: number;
  name: string;
  email: string;
}

export interface IChatUserInfo {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export interface IChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: ILastMessage;
}

export interface ILastMessage {
  user: IChatUserInfo;
  time: Date;
  content: string;
}

export interface IFileData {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: Date;
}

export interface IFile {
  id: number;
  user_id: number;
  chat_id: number;
  time: Date;
  type: string;
  content: number;
  file: IFileData;
}

export interface IDeleteChat {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
}

export interface IArchiveChat {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: ILastMessage;
  };
}

export interface IChatUsers extends IUser {
  display_name: string;
  role: string;
}

export interface ISigninData {
  login: string;
  password: string;
}

export interface ISignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUser {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  id: number;
}

export interface IMessage {
  chat_id: string;
  content: string;
  file: string;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}
