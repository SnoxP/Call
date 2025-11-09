export type User = {
  name: string;
  tag: string;
};

export type Message = {
  id: number;
  user: User;
  content: string;
  timestamp: string;
};

export type Channel = {
  id: string;
  name:string;
  type: 'text' | 'voice';
}

export enum AppState {
  LOGIN,
  LOBBY,
  IN_APP,
}
