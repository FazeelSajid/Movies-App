import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import { COLORS } from './globe/colors';
import { Icon } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const TxtInput = ({style, icon, placeholder, IconSize, iconColor, keyboardType, onChangeText, value, onBlur,multiline, onFocus }) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <Icon source={icon} size={IconSize} color={iconColor} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.primary1}
        style={styles.searchInput}
        selectionColor={COLORS.primary3}
        keyboardType={keyboardType}
        onFocus={onFocus}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
         multiline = {multiline}
      />
    </View>
  );
};

export default TxtInput;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: COLORS.fontColor1,
    borderWidth: 2
  },
  searchInput: {
    color: COLORS.bgColor,
    marginLeft: 5,
    flex: 1,
  },
});
