import React from 'react';
import LottieView from 'lottie-react-native';
import ScreenView from '@/components/layout/screens/ScreenView';
import ContainerView from '@/components/layout/screens/ContainerView';

type Props = {
    onFinish: () => void;
}

const AnimatedSplashScreen = ({ onFinish }: Props) => {

    return (
        <ScreenView>
            <ContainerView>
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
            </ContainerView>
        </ScreenView>
    );
}

export default AnimatedSplashScreen;