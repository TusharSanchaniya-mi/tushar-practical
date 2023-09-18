export interface GithubUserListDTO {
  data: GithubUserList[];
}

export interface GithubUserList {
  title: string;
  id: number;
  url: string;
  user: {
    avatar_url: string;
  };
}
