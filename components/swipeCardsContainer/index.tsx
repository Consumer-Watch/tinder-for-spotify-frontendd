import Carousel from 'react-native-reanimated-carousel';
import { Animated, Dimensions, PanResponder, View } from 'react-native';
import { useRef } from 'react';
import ProfileCard from '../swipeCards';
import { SimilarUser } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
import SonderApi from '../../api';
import { Skeleton } from '../skeleton';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export const SwipeCardsContainer = () => {

  const pan = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dy: pan }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        const { dy } = gestureState;
        if (Math.abs(dy) > 100) {
          Animated.timing(pan, {
            toValue: dy > 0 ? height : -height,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            dy > 0 ? carouselRef.current.prev() : carouselRef.current.next() // Reset position for potential reuse
            pan.setValue(0);
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const { isLoading, data: similarUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await SonderApi.get('/users');
      const profiles = response.data.data as SimilarUser[]
      return profiles
    }
  })

  if (isLoading) {
    return (
      <View className='px-4 my-7 h-[600px]'>
        <Skeleton
          width={"100%"}
          height={"90%"}
          borderRadius={10}
        />
      </View>
    )
  }

  
  return (
    <Animated.View
      style={{
      transform: [{ translateY: pan }],
      }}
      {...panResponder.panHandlers}
    >
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={height}
        enabled={false}
        autoPlay={false}
        data={isLoading ? [] : similarUsers!}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={renderProfileCard}
      />
    </Animated.View>
  )
}

const renderProfileCard = ({ item }: { item: SimilarUser }) => (
    <ProfileCard
      headerImage={item.banner || 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg'}
      avatar={item.profile_image}
      avatarInitials={item.name.at(0)}
      userName={item.spotify_username}
      description={item.bio}
      likedGenre={item.likes}
      favoriteSong={item.track}
      favoriteArtist={item.artist}
    />
)