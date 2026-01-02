import React from 'react';
import { Redirect } from "expo-router";

const Index = () => {
    return (
        <Redirect href='/(auth)/registration' />
    )
}

export default Index;