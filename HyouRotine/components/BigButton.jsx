import React from "react";
import { Pressable, Text } from "react-native";

/**
 * @param {string} title
 * @param {function} onPress
 * @param {object} style
 * @param {object} textStyle
 * @param {string} accessibilityLabel
 * @param {string} accessibilityHint
 * @param {string} role
 * @param {ReactNode} children 
 * @param {boolean} bigTargets
 */

export default function BigButton({
    title,
    onPress,
    style,
    textStyle,
    accessibilityHint,
    accessibilityLabel,
    role = "button",
    children,
    bigTargets = false
}){
    const padding = bigTargets ? 20 : 12;
    
    const buttonStyle = [
        style,
        {
            paddingVertical: padding,
            paddingHorizontal: padding + 4,
        }
    ];

    return(
        <Pressable
            onPress={onPress}
            style={buttonStyle}
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel || title}
            accessibilityRole={role}
            android_ripple={{color: "#00000022"}}
        >
            {children ? children : <Text style={textStyle}>{title}</Text>}
        </Pressable>
    )
}