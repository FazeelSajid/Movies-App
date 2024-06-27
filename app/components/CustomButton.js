import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {Children} from 'react';
import {Icon} from 'react-native-paper';

const CustomButton = ({
  containerStyle,
  bgColor,
  borderColor,
  onPress,
  mode,
  children,
  textStyle,
  txtColor,
  icon,
  iconSize,
  iconColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        containerStyle,
        {backgroundColor: bgColor},
        mode && {
          backgroundColor: 'transparent',
          borderColor: borderColor,
          borderWidth: 2,
        },
        pressed && {opacity: 0.5, borderRadius: 2},
      ]}>
      {icon ? (
        <Icon source={icon} size={iconSize} color={iconColor} />
      ) : (
        <Text style={[textStyle, txtColor]}>{children}</Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    // borderRadius: 4
  },
});
