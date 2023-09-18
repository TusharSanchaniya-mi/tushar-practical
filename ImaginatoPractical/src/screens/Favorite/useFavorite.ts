import { useAppContext } from '@src/context';

import { FavoriteStyles } from './Favorite.style';

const useFavorite = () => {
  const { color, navigation } = useAppContext();

  // add your code here

  return {
    navigation,
    styles: FavoriteStyles(color),
  };
};

export default useFavorite;
