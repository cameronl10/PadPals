import React from 'react';
import { ProfileIcon, ProfileIconProps } from './profileIcon';

interface ClickableProfileIconProps extends ProfileIconProps{
    onPress: () => void;
}

const ClickableProfileIcon = (props: ClickableProfileIconProps) => {
    return (
        <ProfileIcon onPress={props.onPress} profilePicture={props.profilePicture} variant="default" width={50} 
        height={50} />
    );
};

export default ClickableProfileIcon;