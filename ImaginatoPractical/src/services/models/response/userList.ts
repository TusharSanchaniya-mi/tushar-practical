export interface UserList {
  id: string;
  name: string;
  email: string;
  profileUrlLarge: string;
  location: string;
  extras: Extra[];
}

export interface Extra {
  tag: string;
  textColor: string;
  bodyColor: string;
}
