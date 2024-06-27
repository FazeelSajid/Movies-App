import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Button, Icon} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  RFValue,
} from 'react-native-responsive-screen';

const PaperBtn = ({
  containerStyle,
  bgColor,
  rippleColor,
  InnerContentStyle,
  onPress,
  mode,
  children,
  textStyle,
  textColor,
  icon,
  uppercase = false,
}) => {
  return (
    <Button
      mode={mode} // Set the button mode: 'contained', 'outlined', or 'text'
      dark={false} // Set to true for dark theme, false for light theme
      compact={false} // Set to true for a compact look
      buttonColor={bgColor} // Custom button background color
      textColor={textColor} // Custom button text color
      rippleColor={rippleColor} // Color of the ripple effect
      loading={false} // Set to true to show a loading indicator
      icon={icon} // Icon to display on the button (optional)
      disabled={false} // Set to true to disable the button
      uppercase={uppercase} // Set to true to make the label text uppercase
      onPress={onPress} // Function to execute on press
      contentStyle={InnerContentStyle} // Style for the button's inner content
      style={containerStyle} // Style for the button
      labelStyle={textStyle} // Style for the button text
      testID="myButton" // Test ID for testing
    >
      {children}
    </Button>
  );
};

export default PaperBtn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    // borderRadius: 4
  },
});
