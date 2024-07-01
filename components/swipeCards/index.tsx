import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Animated, Pressable } from 'react-native';
import Avatar from "../avatar"
import { ProfileCardProps } from '../../types/types';
import { SharedValue } from 'react-native-reanimated';
import useFavouriteArtists from '../../hooks/favourite-artists';

const ProfileCard = (
    {
        headerImage,
        avatar,
        avatarInitials,
        userName,
        description,
        //likedArtist,
        likedGenre,
        favoriteSong,
        favoriteArtist,
        onPress
    }: ProfileCardProps
) => {
    return (
        <Pressable onPress={onPress} className={styles.container}>
            <ImageBackground imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16}} source={{uri: headerImage}} className={styles.headerImage}>
                <Avatar 
                    src={avatar} 
                    initials={avatarInitials} 
                    containerStyle={"w-16 h-16 mr-12 translate-y-8"} 
                />
            </ImageBackground>
            <View className='mx-4 mt-5'>
                <Text className={styles.userName}>
                    {userName}
                </Text>
                <Text className={styles.description}>
                    {description}
                </Text>
            </View>
            <View className={styles.likesContainer}>
                <Text className='font-bold text-white text-xl mb-4'>
                    Likes
                </Text>
                <View className={styles.row}>
                    {likedGenre.slice(0, 6).map((genre) => (
                        <View key={genre} className={styles.liked}>
                            <Text className={styles.likedText}>{genre}</Text>
                        </View>
                    ))}
                </View>
                <Text className={styles.favoriteSong}>Favorite Song</Text>
                <View className='flex-row gap-x-4'>
                    <Image className="w-9 h-9 rounded-md" source={{ uri: favoriteSong.image}} />
                    <View>
                        <Text className="text-base font-bold text-white">{favoriteSong.name}</Text>
                        <Text className="text-sm text-[#EFEFEF80]">{favoriteSong.artists.map((artist) => artist.name).join(', ')}</Text>
                    </View>
                </View>
                <Text className={styles.favoriteArtist}>Favorite Artist</Text>
                <View className='flex-row gap-x-4'>
                    <Image className="w-9 h-9 rounded-md" source={{ uri: favoriteArtist.image }} />
                    <View>
                        <Text className="text-base font-bold text-white">{favoriteArtist.name}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = {
    container: "bg-[#B3B3B31A] mt-5 rounded-2xl mx-5",
    headerImage: "w-full rounded-t-full h-28 flex-row justify-center items-end",
    userName: "text-4xl font-bold text-white mt-10",
    description: "mt-1 text-sm text-[#EFEFEF80]",
    likesContainer: "mt-4 mx-4 mb-8 border border-[#EFEFEF33] p-4 rounded-xl",
    row: "flex-row mb-2 ml-1 flex-wrap gap-y-2 w-full",
    artistRow: "flex-row mb-2",
    liked: "mr-2 bg-[#12121280] rounded-[10px] border-[#B3B3B333] border px-2 py-1.5",
    likedText: "text-center text-[#EFEFEF]",
    favoriteSong: "mb-2 font-bold text-white text-xl",
    favoriteArtist: "mt-2 mb-2 font-bold text-white text-xl",
};

export default ProfileCard;