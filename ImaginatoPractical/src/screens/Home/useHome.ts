import { useAppContext } from '@src/context';

import { homeStyles } from './Home.style';

const useHome = () => {
  const { color, navigation } = useAppContext();

  // add your code here

  return {
    navigation,
    styles: homeStyles(color),
  };
};

export default useHome;
