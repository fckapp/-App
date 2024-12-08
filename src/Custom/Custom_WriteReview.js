import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Image, Alert, TextInput, Platform, KeyboardAvoidingView} from 'react-native';
import {GestureHandlerRootView, ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘
import { launchImageLibrary } from 'react-native-image-picker'; // 이미지 선택
import { Rating } from 'react-native-ratings'; // 별점
import DateTimePicker from '@react-native-community/datetimepicker';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Timestamp, addDoc, collection, setDoc } from 'firebase/firestore';
import {db, storage} from '../Firebase/Firebase_Firestore.js';
import { useNavigation } from '@react-navigation/native';
import { useNickName } from '../Firebase/Services_NicknameContext.js'; // Context import
import { CustomLoadingful } from './Custom_Loading.js';
import auth from '@react-native-firebase/auth';

const ReviewForm = ({route}) => {
    const {item, category} = route.params;
    const {nickName, profileImage: currentProfileImage} = useNickName(); //사용자 닉네임 및 프로필 사진

    const navigation = useNavigation();
    // 상태 설정
    const [image, setImage] = useState([]);
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState(null);
    const [price, setPrice] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);  // DatePicker 표시 여부
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: item.name,
            headerLeft : () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 20,}}>
                    <FeatherIcon name="x" size={24} color="#000" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.submitButton} activeOpacity={1} onPress={() => submitReview() }>
                    <Text style={styles.submitButton_text}>완료</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, item.name, rating, date, reviewText]);

    // 이미지 최대 5장 선택 함수
    const imageSelect = () => {
        launchImageLibrary({mediaType: 'photo', quality: 1, selectionLimit: 3}, (response) => {
            if (response.didCancel) {
                console.log('이미지를 선택을 취소하였습니다.');
            } else if (response.errorCode) {
                console.log('이미지 선택 오류', response.errorCode);
            } else {
                const selectedImages = response.assets;
                const uris = selectedImages.map(image => image.uri);
                setImage(uris);
            }
        });
    };
    
    const submitReview = async() => {
        const user = auth().currentUser;  // 로그인된 사용자 정보 확인
        console.log('현재 사용자:', user);
        // 로그인 상태가 아니면 로그인하라는 알림
        if (!user) {
            Alert.alert('로그인 후 다시 시도해 주세요');
            return;
        }
        
        // 사용자 기입 정보 확인
        if (rating === 0) {
            Alert.alert('별점을 선택해 주세요.');
        } else if (!date) {
            Alert.alert('여행날짜를 선택해 주세요.');
        } else if (reviewText.trim().length === 0) { 
            Alert.alert('리뷰 내용을 기입해 주세요');
        } else {
            setLoading(true);
            try {
                let imageUrl = [];
                if (image.length > 0) {
                    for (let i = 0; i < image.length; i++) {
                        const response = await fetch(image[i]); //이미지 URI로 fetch
                        const blob = await response.blob(); //Blob 형식으로 변환
                        const uploadTimestamp  = new Date().getTime(); //타임스탬프 생성
                        

                        //가게의 이름을 폴더명으로 사용
                        const folderName = category
                        console.log('카테고리' , category)
                        const filename = `${uploadTimestamp}_${image[i].split('/').pop()}`; // 고유한 파일명 생성
                        const stroageRef = ref(storage, `reviews/${folderName}/${filename}`); //동적경로로 지정
                        console.log("스토리지", stroageRef)

                        //파이어베이스 스토리지에 이미지 업로드
                        await uploadBytes(stroageRef, blob); //파일 업로드

                        //파이어베이스 스토리지에 업로드된 이미지 url 받아오기
                        const getImageUrl = await getDownloadURL(stroageRef);
                        imageUrl.push(getImageUrl);
                    }
                }

                //파이어베이스 클라우드 데이터베이스에 동적으로 카테고리별 그리고 가게별 리뷰 저장
                const reviewData = {
                    userProfileImage: currentProfileImage, // 리뷰 작성자 프로필 이미지
                    nickName: nickName, // 리뷰 작성자 닉네임
                    categoryid: item.id, //카테고리 문서 아이디
                    content: reviewText, //리뷰 내용
                    rating: rating, //별점
                    imageUrls: imageUrl, //이미지
                    price: price, //비용
                    tripDate: date, // 여행날짜
                    createdAt: Timestamp.fromDate(new Date()), // 리뷰 작성 시간
                    uid: user.uid, // 로그인한 사용자 UID 추가
                };

                // 카테고리 및 해당 문서에 리뷰 추가
                
                let collectionPath;

                if (category === '클럽') {
                    collectionPath = `clubs/${item.id}/reviews`;
                } else if (category === '술집') {
                    collectionPath = `bars/${item.id}/reviews`;
                } else if (category === '관광지') {
                    collectionPath = `tours/${item.id}/reviews`;
                } else if (category === '맛집') {
                    collectionPath = `foods/${item.id}/reviews`;
                } else if (category === '시장') {
                    collectionPath = `markets/${item.id}/reviews`;
                } else {
                    // 예외 처리: 유효하지 않은 카테고리일 경우
                    Alert.alert('유효하지 않은 카테고리입니다.');
                    return;
                }

                // Firestore에 리뷰 추가
                await addDoc(collection(db, collectionPath), reviewData);
                
                

                //성공적으로 리뷰가 체줄되었음을 알리는 메세지
                Alert.alert('리뷰가 제출되었습니다.');

                //리뷰 제출 후 초기화
                setImage([]);
                setRating(0);
                setPrice(0);
                setReviewText('');
                

                // 리뷰 제출 후 이전 화면으로 이동
                navigation.goBack();
            } catch (error) {
                console.error("리뷰 제출 오류:", error);
                Alert.alert('리뷰 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
            setLoading(false);
        }
    };


    // 선택된 이미지 삭제 함수
    const removeImage = (uri) => {
        setImage(prevImages => prevImages.filter(image => image !== uri));
    };

    // 별점별 텍스트
    const getRatingText = (rating) => {
        if (rating === 0) return "별점을 주세요~";
        if (rating === 1) return "완전 별로예요";
        if (rating === 2) return "조금 아쉬워요";
        if (rating === 3) return "가볼만해요";
        if (rating === 4) return "추천해요";
        return "완전 추전해요";  // rating === 5일 때
      };

    
    const selectedDate =() => {
        setShowDatePicker(true);

    }
    // 날짜 변경 핸들러
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;  // 선택된 날짜로 업데이트
        setDate(currentDate);  // 상태에 새 날짜를 설정
        setShowDatePicker(false);
    };
    // 한글로 날짜 포맷팅
    const formatDate = (date) => {
        const option = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Intl.DateTimeFormat('ko-KR', option).format(date);
    };

     // 금액을 쉼표로 포맷팅하는 함수
    const formatPrice = (value) => {
        // 숫자만 필터링
        const cleanValue = value.replace(/[^0-9]/g, '');
        // 숫자에 쉼표 추가
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    // 금액 입력이 변경될 때 호출되는 함수
    const handlePriceChange = (text) => {
        const formattedText = formatPrice(text);
        setPrice(formattedText); // 상태에 저장
    };

    // 리뷰 작성
    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView>
                <View style={styles.imgeMainWrapper}>
                    <TouchableOpacity onPress={() => imageSelect()} style={styles.imageContainer}>
                        <FeatherIcon name="plus" size={30} color={'#808080'}/>
                    </TouchableOpacity>

                    {/* 선택한 이미지들을 아이콘 옆으로 나열 */}
                    <View style={styles.imagePreviewContainer}>
                        {image.map((uri, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri }} style={styles.imagePreview} />
                                {/* 이미지 오른쪽 상단에 X 버튼 추가 */}
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeImage(uri)}>
                                    <FeatherIcon name="x" size={20} color="808080" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 별점을 주는 기능  */}
                <View style={styles.rating_wrapper}>
                    <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={30}
                        onFinishRating={(newRating) => {
                            setRating(newRating)
                            console.log("선택된 별점:", newRating); // 상태 변경 확인
                            console.log("tmxk", rating);
                        }}
                        startingValue={rating}
                    />
                    <Text style={styles.rating_text}>{getRatingText(rating)}</Text>
                </View>

                {/* 여행 혹은 방문 날짜 */}
                <View style={styles.date_wrapper}>
                    <FontAwesomeIcon name="calendar-o" size={20} color={'#808080'}/>
                    <TouchableOpacity onPress={() => selectedDate()} style={styles.date_button}>
                        <Text style={styles.date_text}>{date ? formatDate(date) : '방문 날짜가 언제인가요? (필수)'}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date || new Date()} // 현재 선택된 날짜
                            mode="date"  // 'date' 모드: 날짜만 선택
                            display="default"  // 기본 디스플레이
                            onChange={onChange} // 날짜가 변경될 때 호출되는 함수
                            setDate={date}
                        />
                    )}
                </View>

                {/* 사용 금액 */}
                <View style={styles.price_wrapper}>
                    <FontAwesomeIcon name="money" size={20} color={'#808080'}/>
                    <TextInput
                        style={styles.price_input}
                        placeholder="얼마를 사용하셨나요[바트]? (선택)"
                        keyboardType="number-pad"
                        mask={"[0-9]*"}
                        value={price}  // 숫자 뒤에 " 바트" 추가
                        onChangeText={handlePriceChange}
                        maxLength={10}
                    />
                </View>

                {/* 리뷰 내용*/}
                <View style={styles.content_wrapper}>
                    <TextInput
                        style={styles.content_input}
                        placeholder={"+ 방문시 어떠셨나요? 후기를 작성해 주세요 \n+ 사진을 첨부할 수 있어요 (최대 3장)"}
                        value={reviewText}
                        setReviewText={reviewText}
                        onChangeText={setReviewText}
                        multiline={true} 
                        scrollEnabled={true}
                    />
                </View>
            </ScrollView>
            {loading && <CustomLoadingful/>}
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },

    // 이미지 선택 및 삭제
    imgeMainWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        paddingVertical: 20,
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#f5f5f5',
        elevation: 1,
        borderRadius: 10,
        padding: 25,
        marginLeft: 1,
    },
    imagePreviewContainer: {
        flexDirection: 'row',
    },
    imageWrapper: {
        position:'relative',
    },
    imagePreview: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginLeft: 10,
    },
    removeButton: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: '#f5f5f5',
        position: 'absolute',
        top: -90,
        left: 80,
    },

    // 별점
    rating_wrapper: {
        width: '100%',
        height: 120,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rating_text: {
        color: '#a9a9a9',
        marginTop: 20,
    },

    //날짜
    date_wrapper: {
        flexDirection: 'row',
        width: 500,
        height: 'auto',
        marginTop: 20,
    },
    date_button: {
        height: 30,
        marginLeft: 10,
    },
    date_text: {
        color: '#a9a9a9'
    }, 

    // 사용한 금액
    price_wrapper: {
        flexDirection: 'row',
        width: 500,
        height: 'auto',
        alignItems: 'center',
    },

    // 리뷰 내용
    content_wrapper: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content_input: {
        height: 'auto',  // 높이를 지정해주면 스크롤이 잘 작동할 수 있습니다.
        fontSize: 16,
        textAlignVertical: 'top',
        lineHeight: 20,
        minHeight: 100,
    },

    // 리뷰 체출 버튼
    submitButton: {
        marginRight: 10,
    },
    submitButton_text: {
        fontSize: 14,
        height: '100%',
        width: 30,
        color: "#87cefa",
    }

})

export default ReviewForm;