import { UserList } from '@src/services';

export interface UserViewProps {
  item: UserList;
  handleUnFavorite: (item: UserList) => void;
  handleFavorite: (item: UserList) => void;
  isFavorite: boolean;
}
