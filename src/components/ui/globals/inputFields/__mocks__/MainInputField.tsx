import React from 'react';
import { View, TextInput } from 'react-native';

const MainInputField = ({testID, wrapperViewProps = {}, ...inputProps}: any) => {
    return (
        <View {...wrapperViewProps}>
            <TextInput testID={testID} {...inputProps} />
        </View>
    )
}

export default MainInputField;