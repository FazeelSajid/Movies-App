import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../components/globe/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useMovie from '../../Redux/Features/useMovie';
import MovieCard from '../../components/MovieCard';
import {ActivityIndicator} from 'react-native-paper';
import TxtInput from '../../components/TxtInput';
import Genere from '../Stack/Genere';
import MovieSection from '../../components/MovieSection';
import {removeDuplicates} from '../../components/Modules/Modules';
import Badge from '../../components/Badge';

const Home = ({navigation}) => {
  const {
    trendingMovies,
    topRatedMovies,
    popularMovies,
    upcomingMovies,
    movieDetails,
    clearDetails,
    trending,
    topRated,
    popular,
    upcoming,
    globalArray,
    genres,
  } = useMovie();

  const [searchInput, setSearchInput] = useState('');

  const [filteredArray, setFilteredArray] = useState([]);

  const [isFocus, setIsFocus] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');

  const [categoryArray, setCategoryArray] = useState([]);

  const handleSelectedCategory = (id) => {
    // console.log('log');
    if (selectedCategory === id) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(id);
      setCategoryArray([]);
    }

    setSearchInput('');
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleInput = input => {
    setSearchInput(input);
    const filtered = globalArray.filter(item => {
      return (
        item.original_title.toLowerCase().includes(input.toLowerCase()) ||
        item.title.toLowerCase().includes(input.toLowerCase())
      );
    });

    const uniquesArray = removeDuplicates(filtered, 'id');
    setFilteredArray(uniquesArray);
  };

  const handlePress = id => {
    movieDetails(id);
    navigation.navigate('Detail', {id});
  };
  useEffect(() => {
    trendingMovies();
    topRatedMovies();
    popularMovies();
    upcomingMovies();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{paddingHorizontal: wp('4%'), paddingTop: wp('2%')}}>
        <TxtInput
          placeholder={'Search Movies'}
          onChangeText={handleInput}
          value={searchInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          icon={'magnify'}
          iconColor={COLORS.primary3}
          IconSize={23}
          style={isFocus && {borderColor: COLORS.primary3, borderWidth: 2}}
        />
      </View>
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={genres}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <Badge
                item={item}
                selectedCategory={selectedCategory}
                handleSelectedCategory={handleSelectedCategory}
              />
            );
          }}
        />
      </View>

      {selectedCategory ? (
        <Genere
          id={selectedCategory}
          categoryArray={categoryArray}
          setCategoryArray={setCategoryArray}
        />
      ) : searchInput.length > 0 ? (
        <FlatList
          data={filteredArray}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: wp('4%')
          }}
          ListEmptyComponent={
            <Text style={{color: COLORS.fontColor1}}>No Data Found</Text>
          }
          renderItem={({item}) => (
            <MovieCard item={item} onPress={() => handlePress(item.id)} />
          )}
        />
      ) : (
        <>
          <MovieSection
            title="Popular Movies"
            data={popular.data}
            ishorizontal={true}
          />
          <MovieSection
            title="Trending Movies"
            data={trending.data}
            ishorizontal={true}
          />
          <MovieSection
            title="Top Rated Movies"
            data={topRated.data}
            ishorizontal={true}
          />
          <MovieSection
            title="Upcoming Movies"
            data={upcoming.data}
            ishorizontal={true}
          />
        </>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // width: '100%',
    backgroundColor: COLORS.primary1,
    // overflow: 'hidden',
    // paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  categoryContainer: {
    flexDirection: 'row',
    marginVertical: hp(2.5),
  },

  alert: {
    color: COLORS.primary2,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary2,
    padding: wp('3%'),
    marginHorizontal: hp('5%'),
  },
});
