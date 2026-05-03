import React from 'react';
import { View } from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Feather,
  AntDesign
} from '@expo/vector-icons';
import { cn } from '@/lib/nativeWindCSS/cn';

/* -------------------------------------------------------------------------- */
/*                                   ICON MAP                                 */
/* -------------------------------------------------------------------------- */

const ICONS = {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Feather,
  AntDesign
};

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type IconType = keyof typeof ICONS;

type IconComponent<T extends IconType> = (typeof ICONS)[T];

type IconName<T extends IconType> = React.ComponentProps<
  IconComponent<T>
>['name'];

type DynamicIconProps<T extends IconType> = {
  type: T;
  name: IconName<T>;
  size?: number;
  color?: string;
  className?: string;
  containerClassName?: string;
};

/* -------------------------------------------------------------------------- */
/*                              DYNAMIC ICON COMPONENT                        */
/* -------------------------------------------------------------------------- */

const AppIcon = <T extends IconType>({
  type,
  name,
  size = 24,
  color = '#000',
  className,
  containerClassName
}: DynamicIconProps<T>) => {
  const Icon = ICONS[type] as React.ComponentType<any>;

  return (
    <View className={cn('items-center justify-center', containerClassName)}>
      <Icon
        name={name}
        size={size}
        color={color}
        className={cn('text-black dark:text-white', className)}
      />
    </View>
  );
};

export default AppIcon;
