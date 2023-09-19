import React from 'react';
import { View } from 'react-native';

import { Images } from '@src/assets';
import { useAppContext } from '@src/context';

import { headerStyles } from './Header.style';
import { AppImage } from '../AppImage/AppImage';

interface CustomHeaderProps {
  rightComponent?: JSX.Element;
}

export const Header = React.memo(({ rightComponent }: CustomHeaderProps) => {
  const { color } = useAppContext();
  const styles = headerStyles(color);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainerStyle}>
        <AppImage
          source={Images.APP_LOGO_IMAGE}
          resizeMode="contain"
          style={styles.loginIconStyle}
        />
      </View>

      {!!rightComponent && (
        <View style={styles.backButtonContainer}>{rightComponent}</View>
      )}
    </View>
  );
});
