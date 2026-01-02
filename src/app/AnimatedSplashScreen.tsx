import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
    onFinish: () => void;
}

const AnimatedSplashScreen = ({ onFinish }: Props) => {

    return (
        <View className='flex-1 items-center justify-center bg-light-100'>
            <LottieView
                source={require('../assets/lottie/barbers-pole.json')}
                autoPlay
                loop={false}
                onAnimationFinish={onFinish}
                style={{
                    width: 200,
                    height: 200
                }}
            />
        </View>
    );
}

export default AnimatedSplashScreen;