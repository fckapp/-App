import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘
import { useNavigation } from '@react-navigation/native';

const WishlistScreen = () => {
    const [favorites, setFavorites] = useState([]); //찜목록 상태
    const [message, setMessage] = useState(""); // 메서지 상태

    // 네이게이션 변수 정의
    const navigation = useNavigation();

    // 찜목록 화면으로 들어오는 경우 로컬저장소에 저장된 찜 아이템들을 호출
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                // AsyncStorage에서 찜 목록 가져오기
                let savedFavorites = await AsyncStorage.getItem('favorites');
                if (savedFavorites) {
                    savedFavorites = JSON.parse(savedFavorites);
                    setFavorites(savedFavorites); // 찜 목록 상태 업데이트
                }
            } catch (error) {
                console.error("찜 목록을 불러오는 데 오류가 발생했습니다:", error);
            }
        };
        
        fetchFavorites(); // 데이터를 불러오는 함수 호출
        console.log("찜목록", favorites)

        const unsubscribe = navigation.addListener('focus', ()=> {
            fetchFavorites(); //화면이 포커스될 때마다 찜목록을 다시 호출r
        });

        return ()=> unsubscribe();
    }, [navigation]); // 빈 배열을 넣어 최초 렌더링 시 한 번만 실행

    const heartCancel = async(item) => {

        //로컬 저장소에서 찜목록 불러오기
        let savedFavorites = await AsyncStorage.getItem('favorites');
        savedFavorites = savedFavorites? JSON.parse(savedFavorites) : [];

        try {
            savedFavorites = savedFavorites.filter(fav => fav.id !== item.id); // 아이템 제거
            await AsyncStorage.setItem('favorites', JSON.stringify(savedFavorites)); // 업데이트된 찜 목록 저장
            await AsyncStorage.removeItem(`favorite_${item.id}`); // 해당 아이템 삭제
            setMessage(`${item.name}이 찜목록에서 취소되었습니다.`);
        } catch(error) {
            console.log("찜 취소 에러발생 원인은? :", error.message);
            setMessage("찜취소가 실패하였습니다.");
        }

        // 상태 업데이트
        setFavorites(savedFavorites); // 찜 목록 상태 업데이트

        // 3초 후 메시지 숨기기
        setTimeout(() => {
            setMessage("");
        }, 3000); // 애니메이션이 끝난 후 숨기기
    };



    // 일관적인 UI 및 자동으로 생성하도록 랜더링 작성
    const renderItems = ({item}) => {
        const category = item.category;
        const averageRating = item.averageRating || 0;

        const fullStars = Math.floor(averageRating); // 완전 채워진 별 개수
        const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0; // 반 별
        const emptyStars = 5 - fullStars - halfStar; // 비어 있는 별 개수

        return (
            <View style={styles.main_renderContainer}>
                <View style={styles.renderContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('상세정보', {item})} activeOpacity={1} key={item.id} style={styles.item_button}>
                    <Image 
                        source={{uri: item.image && (Array.isArray(item.image) ? item.image[0] : item.image[1])}} 
                        style={styles.renderImage} 
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.commentContainer}>
                            {/* 별점 아이콘들 */}
                            {[...Array(fullStars)].map((_, index) => (
                                <FontAwesomeIcon key={`full-${index}`} name="star" color={'#FFD700'} size={16}/>
                            ))}
                            {[...Array(halfStar)].map((_, index) => (
                                <FontAwesomeIcon key={`half-${index}`} name="star-half-o" color={'#FFD700'} size={16}/>
                            ))}
                            {[...Array(emptyStars)].map((_, index) => (
                                <FontAwesomeIcon key={`empty-${index}`} name="star-o" color={'#FFD700'} size={12}/>
                            ))}
                            <Text style={styles.heartNum}>({item.ratings.length})</Text>

                            {/* 하트 아이콘 */}
                            <FontAwesomeIcon name="heart" color={'#E76F92'} style={styles.heart}/>
                            <Text style={styles.heartNum}>{item.heart}</Text>
                        </View>
                        <Text style={styles.category}>{item.category} • {item.city}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.sub_wrapper}>
                    <TouchableOpacity style={styles.sub_comment} onPress={() => heartCancel(item)}>
                        <FeatherIcon name="x" color={'#949494'} size={24} />
                        <Text style={styles.sub_comment_text_1}>찜취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub_comment} onPress={() => navigation.navigate('리뷰쓰기', {item, category})}>
                        <FeatherIcon name="edit" color={'#949494'} size={22} />
                        <Text style={styles.sub_comment_text_1}>리뷰쓰기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub_comment}>
                        <FeatherIcon name="calendar" color={'#009DFF'} size={22} />
                        <Text style={styles.sub_comment_text}>일정추가</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={favorites} // 상태에서 찜 목록 전달
                keyExtractor={(item) => item.id || item.name}
                renderItem={renderItems} // 아이템 렌더링
            />
            {message && (
                <View style={styles.messageBox}>
                    <Text style={styles.messageText}>{message}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    main_renderContainer: {
        flex: 1,
        alignItems: 'center',
    },
    // 화면 바디 랜더링 아이템
    renderContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        padding: 20,

    },
    item_button: {
        width: '100%',
        flexDirection: 'row',
    },
    renderImage: {
        width: 120,
        height: 140,
        borderRadius: 10,
    },
    textContainer: {
        width: '70%',
        height: 130,
        flexDirection: 'column',
        // backgroundColor: '#cccccc',
        paddingHorizontal: 20,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 12,
    },

    //하트 및 별점 
    commentContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 100,
        left: 20,
        alignItems: 'center',
    },
    heart: {
        fontSize: 16,
        marginLeft: 10,
    },
    heartNum: {
        color: '#949494',
        fontSize: 12,
        marginLeft: 3, 
    },
    category: {
        position: 'absolute',
        top: 120,
        left: 20,
        alignItems: 'center',
        fontSize: 12,
        color: '#949494',
    },

    // 일정추가 / 찜취소 / 리뷰쓰기
    sub_wrapper:{
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 5,
        borderBottomColor: '#cccccc',
    },
    sub_comment: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sub_comment_text: {
        marginLeft: 5,
        color: '#009DFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    sub_comment_text_1: {
        marginLeft: 5,
        color: '#949494',
        fontWeight: 'bold',
        fontSize: 12,
    },
    messageBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', // 화면에서 고정된 위치
        bottom: 20, // 상단에서부터 위치를 설정
        left: 20, // 좌측 여백
        right: 20, // 우측 여백
        zIndex: 999, // 다른 요소들보다 위에 배치
    },
    messageText: {
        color: '#ffffff',
        fontSize: 14,
    },
    
});

export default WishlistScreen;