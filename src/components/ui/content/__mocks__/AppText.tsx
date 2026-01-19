import React, { JSX } from 'react';
import { Text } from 'react-native';


const AppText = (props: any): JSX.Element => {

    return (
        <Text {...props}>{props.children}</Text>
    )
}

export default AppText;