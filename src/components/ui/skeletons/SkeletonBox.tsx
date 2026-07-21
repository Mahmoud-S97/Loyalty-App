import React, { JSX, useEffect, useRef } from 'react';
import { Animated, View, ViewProps } from 'react-native';
import { cn } from '@/lib/nativeWindCSS/cn';

type SkeletonBoxProps = ViewProps & {
  className?: string;
};

const SkeletonBox = ({
  className,
  ...props
}: SkeletonBoxProps): JSX.Element => {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 700,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 700,
          useNativeDriver: true
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity]);

  return (
    <Animated.View
      {...props}
      style={[
        props.style,
        {
          opacity
        }
      ]}
      className={cn(
        'bg-neutral-400 dark:bg-neutral-700 overflow-hidden',
        className
      )}
    />
  );
};

export default SkeletonBox;
