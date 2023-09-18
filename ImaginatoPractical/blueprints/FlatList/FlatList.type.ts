import { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { ContentStyle, FlashListProps } from '@shopify/flash-list';

export interface FlatListProps<T>
  extends Omit<
    FlashListProps<T>,
    | 'ListEmptyComponent'
    | 'refreshing'
    | 'ListFooterComponent'
    | 'data'
    | 'contentContainerStyle'
  > {
  isLoading?: boolean;
  refreshing?: boolean;
  ListEmptyComponent?: string | React.JSX.Element | null | undefined;
  ListEmptyICON?: React.JSX.Element;
  ListFooterComponent?: React.JSX.Element | null | undefined;
  currentPage?: number;
  totalCount?: number;
  data: T[];
  /**
   * Hide default empty data component.
   */
  hideEmptyComponent?: boolean;
  /**
   * Call once when onEndReached of flash list called for pagination.
   */
  onPageMore?: () => void;
  /**
   * All flash list style
   */
  overrideStyles?: {
    /**
     * Styles to be applied to the refresh indicator.
     */
    contentContainerStyle?: ContentStyle | undefined;

    /**
     * Styles to be applied to the footer indicator.
     */
    footerIndicator?: StyleProp<ViewStyle>;
    /**
     * Styles to be applied to the empty indicator.
     */
    emptyIndicator?: StyleProp<TextStyle>;
    /**
     * Color to be applied to the empty indicator.
     */
    emptyIndicatorColor?: string;
    /**
     * Color to be applied to the footer indicator.
     */
    footerIndicatorColor?: string;
  };
}

export interface FooterViewProps {
  color: ColorValue | undefined;
  indicatorStyle: StyleProp<ViewStyle> | undefined;
  customFooterView?: React.JSX.Element | null;
  footerViewVisible?: boolean;
}
