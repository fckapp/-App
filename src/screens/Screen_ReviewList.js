import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import {db} from '../Firebase/Firebase_Firestore.js';
import { collection, getDocs } from "firebase/firestore";
import {CustomLoadingful} from '../Components/Custom_Loading.js';

const ReviewList =({route}) => {
    const itemId = route.params.item.id;
    const category = route.params.category;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async() => {
            try{
                let reviewsCollection;

                if(category === '클럽') {
                    reviewsCollection = collection(db, 'clubs', itemId, 'reviews');
                } else if (category === '술집') {
                    reviewsCollection = collection(db, 'bars', itemId, 'reviews');
                } else if (category === '관광지') {
                    reviewsCollection = collection(db, 'tours', itemId, 'reviews');
                } else if (category === '맛집') {
                    reviewsCollection = collection(db, 'foods', itemId, 'reviews');
                } else if (category === '시장') {
                    reviewsCollection = collection(db, 'markets', itemId, 'reviews');
                } else {
                    console.log('리뷰 카테고리별 정보 가지고 오기 에러 발생');
                }

                const reviewsSnapshot = await getDocs(reviewsCollection);
                const reviewsList = reviewsSnapshot.docs.map(doc => doc.data());
                setReviews(reviewsList);
                setLoading(false);

            } catch (error){
                console.log('리뷰 fetch 에러', error);
            }
        }

        fetchReview();
    }, [itemId, category]);

    if (loading) {
        return <CustomLoadingful />
    }
    
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Reviews</Text>
          <FlatList
            data={reviews}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <Text>{item.text}</Text>
                <Text>Rating: {item.rating}</Text>
              </View>
            )}
          />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    reviewItem: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
    },
  });

export default ReviewList;