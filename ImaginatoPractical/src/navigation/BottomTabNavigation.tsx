import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@app/blueprints';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Images } from '@src/assets';
import { AppImage } from '@src/components';
import { isIOS } from '@src/constants';
import { contents, useAppContext } from '@src/context';
import { FavoriteScreen, HomeScreen } from '@src/screens';
import { Palette, scaled, scaleHeight, screenWidth } from '@src/utils';

import { BottomTabStackParamList, Screen } from './AppNavigation.type';

const BottomTab = createBottomTabNavigator<BottomTabStackParamList>();

interface BottomNavTab {
  title: string;
  icon: Images;
  unSelectedIcon: Images;
}

const bottomScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
};

export const BottomTabNavigation = React.memo(() => {
  const { color } = useAppContext();
  const styles = bottomTabStyle(color);
  return (
    <BottomTab.Navigator
      tabBar={props => (
        <SafeAreaView edges={['bottom']} style={styles.safeAreaStyle}>
          <TabBar {...props} />
        </SafeAreaView>
      )}
      backBehavior="history"
      screenOptions={{
        ...bottomScreenOptions,
      }}>
      <BottomTab.Screen name={Screen.HOME} component={HomeScreen} />
      <BottomTab.Screen name={Screen.FAVORITE} component={FavoriteScreen} />
    </BottomTab.Navigator>
  );
});

export const TabBar = React.memo((props: BottomTabBarProps) => {
  const { navigation, state } = props;
  const { color } = useAppContext();
  const styles = bottomTabStyle(color);
  const arrayBottomTabData: Array<BottomNavTab> = [
    {
      icon: Images.HOME_IMAGE,
      title: contents('bottomTab.home'),
      unSelectedIcon: Images.HOME_OUTLINE_IMAGE,
    },
    {
      icon: Images.STAR_FILL_IMAGE,
      title: contents('bottomTab.favorite'),
      unSelectedIcon: Images.STAR_IMAGE,
    },
  ];
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: 'tabPress',
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // navigation.navigate({merge: true, name: route.name});
            navigation.navigate(route.name);
          }
        };
        return (
          <Pressable
            key={`${route.name}-${index}-TabBar`}
            accessibilityRole="button"
            onPress={onPress}
            accessibilityState={isFocused ? { selected: true } : {}}
            style={[
              styles.tabBarItemStyle,
              isFocused ? styles.selectedTabBarItemStyle : {},
            ]}>
            <View style={styles.tabIcon}>
              <AppImage
                tintColor={isFocused ? color.primaryColor : color.lightGray}
                source={
                  (isFocused
                    ? arrayBottomTabData[index]?.icon
                    : arrayBottomTabData[index]?.unSelectedIcon) ||
                  Images.HOME_IMAGE
                }
                style={styles.tabBarIcon}
              />
            </View>

            <Text
              preset={isFocused ? 'h1' : 'h3'}
              style={[
                styles.tabItemText,
                !isFocused && styles.tabBarUnSelectedText,
              ]}>
              {arrayBottomTabData[index]?.title.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

const bottomTabStyle = ({
  backgroundColor,
  lightGray,
  primaryColor,
  white,
}: Palette) => {
  const styles = StyleSheet.create({
    safeAreaStyle: {
      backgroundColor: white,
    },
    selectedTabBarItemStyle: {
      borderTopColor: primaryColor,
    },
    tabBarContainer: {
      alignItems: 'center',
      backgroundColor: white,
      elevation: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: scaleHeight(isIOS ? 0 : 10),
    },
    tabBarIcon: {
      ...scaled(22),
      tintColor: primaryColor,
    },
    tabBarItemStyle: {
      alignItems: 'center',
      backgroundColor: white,
      borderColor: backgroundColor,
      borderTopWidth: scaleHeight(1.5),
      justifyContent: 'center',
      width: screenWidth / 2,
    },
    tabBarUnSelectedText: {
      color: lightGray,
    },
    tabIcon: {
      marginBottom: scaleHeight(4),
      marginTop: scaleHeight(8),
    },
    tabItemText: {
      color: primaryColor,
      fontSize: scaleHeight(10),
    },
  });
  return styles;
};
