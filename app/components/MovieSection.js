import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import {ActivityIndicator} from 'react-native-paper';
import MovieCard from './MovieCard';
import { COLORS } from './globe/colors';
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import useMovie from '../Redux/Features/useMovie';


const MovieSection = ({title, data, ishorizontal, onPress}) => {
    const navigation = useNavigation();

    const {movieDetails} = useMovie()
    
    const handlePress = id => {
        // console.log(item.id, 'home') ;
        // clearDetails();
        // persistor.purge();
        movieDetails(id);
        navigation.navigate('Detail', {id});
      };
  return (
    <View style={styles.section}>
        <Text style={styles.heading}>{title}</Text>
        {data.length > 0 ? (
          <FlatList
            horizontal = {ishorizontal}
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <MovieCard item={item} onPress={() => handlePress(item.id)} />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
          />
        ) : (
          <ActivityIndicator
            size="small"
            color={COLORS.primary2}
            animating={true}
          />
        )}
      </View>
  )
}

export default MovieSection

const styles = StyleSheet.create({
    section: {
        marginTop: hp('3%'),
      },
      heading: {
        color: COLORS.fontColor1,
        fontSize: wp('5%'),
        marginBottom: hp('1%'),
        paddingLeft: wp('4%'),
      },
      flatListContainer: {
        paddingVertical: hp('1%'),
      },
})