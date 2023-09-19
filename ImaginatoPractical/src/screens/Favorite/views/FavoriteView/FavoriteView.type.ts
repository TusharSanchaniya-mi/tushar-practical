import { UserList } from '@src/services';

export interface FavoriteViewProps {
  item: UserList;
  unFavoriteHandle: (item: UserList) => void;
}
