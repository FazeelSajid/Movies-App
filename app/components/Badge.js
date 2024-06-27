import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from './globe/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  import { useNavigation } from '@react-navigation/native';

const Badge = ({item, selectedCategory, handleSelectedCategory }) => {


  const navigation = useNavigation();


 

   
  return (
    <TouchableOpacity
    style={[
      styles.categoryBtn,
      selectedCategory === item.id && styles.selectedCategoryBtn,
    ]}
    onPress={() => handleSelectedCategory(item.id)}>
    <Text
    
      style={[
        styles.categoryText,
        selectedCategory === item.id &&
          styles.selectedCategoryText,
      ]}>
      {item.name}
    </Text>
  </TouchableOpacity>
  )
}

export default Badge

const styles = StyleSheet.create({
    categoryBtn: {
        backgroundColor: COLORS.primary3,
        borderRadius: 25,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(5),
        marginHorizontal: wp(1),
      },
      selectedCategoryBtn: {
        backgroundColor: COLORS.primary2,
      },
      categoryText: {
        color: COLORS.fontColor1,
        fontSize: 14,
      },
      selectedCategoryText: {
        color: COLORS.fontColor1,
        fontWeight: '700' ,
        fontSize: 16,
      },
     
})