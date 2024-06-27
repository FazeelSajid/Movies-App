import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../components/globe/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import useMovie from '../../Redux/Features/useMovie';
import FavMovieCard from '../../components/FavMovieCard';

const Favorite = ({navigation}) => {

    const {favourities, removeFavourite, movieDetails} = useMovie();
    // console.log(favourities.data);

    const handlePress = (item) => {
      // console.log(item.id, 'home') ;
      // clearDetails();
      // persistor.purge();
      movieDetails(item.id);
      navigation.navigate('Detail', {id : item.id});
    };

  return (
    <View style={styles.container} >
      <FlatList
        // horizontal
        data={favourities.data}
        renderItem={({ item }) => (
            <FavMovieCard movie={item} onPress={()=> handlePress(item)} opacity={0.5} />
        )
      }
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: wp('2.5%') }}
        showsHorizontalScrollIndicator={false}
    />
    </View>
  )
}

export default Favorite

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    movieContainer: {
        // width: wp('30%'),
        height: hp('20%'),
        flex: 1,
        borderRadius: 8,
        // marginHorizontal: wp('2.5%'),
        backgroundColor: 'white'
    },
      movieImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    movieSubContainer:{
      flexDirection: 'row',
      backgroundColor: 'green'
    },
    title:{
      color: COLORS.fontColor1
    }
})