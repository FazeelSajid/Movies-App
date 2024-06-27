import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useMovie from '../../Redux/Features/useMovie';
import {removeDuplicates} from '../../components/Modules/Modules';
import FavMovieCard from '../../components/FavMovieCard';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../components/globe/colors';


const Genere = ({id,categoryArray, setCategoryArray }) => {
  const {globalArray, movieDetails} = useMovie();
  
  const navigation = useNavigation();

  const handlePress = item => {
    // console.log(item.id, 'home') ;
    // clearDetails();
    // persistor.purge();
    movieDetails(item.id);
    navigation.navigate('Detail', {id : item.id});
};

  let getMovies = id => {
    const filteredArray = globalArray.filter(item =>
      item.genre_ids.includes(id),
    );
    // console.log(categoryArray);

    setCategoryArray(removeDuplicates(filteredArray, 'id'));

    // console.log(filteredArray, 'moviesArray');
  };

  useEffect(() => {
    getMovies(id);

  }, [id]);

  return (
    <View style={{alignItems : 'center'}}>
      {/* <MovieSection title={'xyz'} data={categoryArray} ishorizontal={false} /> */}
      { categoryArray.length > 0 ? categoryArray.map(item => {
        return (
          <FavMovieCard
            movie={item}
            onPress={() => handlePress(item)}
            opacity={0.5}
          />
        );
      }) : 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <ActivityIndicator
      size="large"
      color={COLORS.primary2}
      animating={true}
      />
      </View>
      }
    </View>
  );
};

export default Genere;

const styles = StyleSheet.create({});
