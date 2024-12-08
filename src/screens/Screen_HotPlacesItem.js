import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { View, Text, Image, StyleSheet, Linking, Platform, Animated, ScrollView, Button} from 'react-native';
import {FlatList, GestureHandlerRootView, TouchableOpacity} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import {Horizontalscale, verticalScale, moderateScale} from '../Components/Custom_Dimensions.js'
import MapView, { Marker } from 'react-native-maps';
import {openBoltApp, openBoltStore, openGrabApp, openGrabStore} from '../Components/Custom_OpenAppStore.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import { useNickName } from '../Firebase/Services_NicknameContext.js';  // NickNameContext import

const HotPlacesItem = ({route}) => {
    // 네비게이션
    const navigateion = useNavigation();
    const item = route.params.item;
    const category = route.params.category;

    // 상태 관리 코드 
    
    
    const [scrollY] = useState(new Animated.Value(0)); // 스크롤 Y 위치 추적용 애니메이션 값
    const [favorites, setFavorites] = useState([]);
    


    // 스크롤 애니메이션을 이용해 배경색 변화
    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [150, 200], // 스크롤이 150px을 넘을 때까지
        outputRange: ['rgba(0, 0, 0, 0)', '#ffffff'], // 처음엔 투명하고, 200px을 넘으면 흰색으로 변함
        extrapolate: 'clamp', // 이 범위를 넘어서면 계속 흰색
    });

    // 헤더 텍스트 애니메이션
    const headerTitle = scrollY.interpolate({
        inputRange: [150, 200], //스크롤이 200px을 넘을 때까지 안보임
        outputRange: [0, 1], // 0일때 안보이고 1이면 보임
        extrapolate: 'clamp',
    });

    // 헤더 타이틀
    useEffect(() => {
        navigateion.setOptions({
            headerTitle: () => (
                <Animated.View>
                    <Animated.Text style={{ opacity: headerTitle, fontWeight: 'bold', fontSize: 16}}>
                            {item.name}
                    </Animated.Text>
                </Animated.View>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.submitButton} activeOpacity={0.7} onPress={() => '' }>
                    <FeatherIcon name="more-vertical" color="#000000" size={20} style={{marginRight: 5}}/>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: 'transparent', // 기본값은 투명
                elevation: 0, // 안드로이드에서 그림자 제거
                shadowOpacity: 0, // iOS에서 그림자 제거
                
            },
            headerTransparent: true, // 처음에 투명하게 시작
            
        });
        console.log('item', item);
        const checkIfhearted = async () => {
            // 로컬 저장소에서 찜 목록 가져오기
            let savedFavorites = await AsyncStorage.getItem('favorites');
            savedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

            // 아이템이 찜 목록에 있는지 확인
            const isItemInFavorites = savedFavorites.some(fav => fav.id === item.id);
            setIshearted(isItemInFavorites); // 찜 목록에 있으면 setIshearted를 true로 설정
            setFavorites(savedFavorites); // 찜 목록 상태 업데이트
        };

        checkIfhearted();

        // 모달 상태 업데이트
        if (isModalOpen) {
            bottomSheetModalRef.current?.present(); // 모달 열기
          } else {
            bottomSheetModalRef.current?.dismiss(); // 모달 닫기
          }

    }, [navigateion, item.name, item.id, isModalOpen]);

    
    // 찜 (하트) 관련 상태 관리
    const [hearted, setIshearted] = useState(false);
    const [message, setMessage] = useState(""); // 메시지 상태

    // 찜하기 버튼을 눌렀을 때 상태 변경
    const touchHeart = async() => {
        const newHeart = !hearted;
        setIshearted(newHeart);

        //로컬 저장소에서 찜목록 불러오기
        let savedFavorites = await AsyncStorage.getItem('favorites');
        savedFavorites = savedFavorites? JSON.parse(savedFavorites) : [];

        // 찜하기 - 아이템 추가
        if (newHeart) {
            // 아이템이 이미 있으면 추가하지 않음
            if (!savedFavorites.some(fav => fav.id === item.id)) {
                savedFavorites.push(item);
                await AsyncStorage.setItem('favorites', JSON.stringify(savedFavorites)); // 찜 목록에 아이템 추가
                setMessage("찜목록에 저장되었습니다.");
            }
        } else {
            // 찜 취소 - 아이템 삭제
            savedFavorites = savedFavorites.filter(fav => fav.id !== item.id); // 아이템 제거
            await AsyncStorage.setItem('favorites', JSON.stringify(savedFavorites)); // 업데이트된 찜 목록 저장
            await AsyncStorage.removeItem(`favorite_${item.id}`); // 해당 아이템 삭제
            setMessage(`${item.name}이 찜목록에서 취소되었습니다.`);
        }

        // 상태 업데이트
        setFavorites(savedFavorites); // 찜 목록 상태 업데이트

        // 3초 후 메시지 숨기기
        setTimeout(() => {
            setMessage("");
        }, 3000); // 애니메이션이 끝난 후 숨기기

        // 파이어베이스 하트 수 업데이트
        let collectionPath;
        // 카테고리에 따라 Firestore 경로 선택
        switch (category) {
            case '클럽':
                collectionPath = firestore().collection('clubs').doc(item.id);
                break;
            case '술집':
                collectionPath = firestore().collection('bars').doc(item.id);
                break;
            case '관광지':
                collectionPath = firestore().collection('tours').doc(item.id);
                break;
            case '맛집':
                collectionPath = firestore().collection('foods').doc(item.id);
                break;
            case '시장':
                collectionPath = firestore().collection('markets').doc(item.id);
                break;
            default:
                console.log('하트 수 업데이트 에러: 카테고리 미설정');
                return;
            }

            try {
                await collectionPath.update({
                    heart: firestore.FieldValue.increment(newHeart? 1: -1) // 하트 수 증가 혹은 감소
                });
            } catch (error){
                console.log('하트 수 업데이트 실패 :', error.message);
        };
    };

    // 경도 / 위도
    const location = item.location;

    // 구글 지도 검색
    const goToMap = () => {
        const address = item.address;
        const googleMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
        Linking.openURL(googleMapUrl)
    };

    // 전화걸기
    const call = () => {
        const tell = item.tell;
        const url = `tel:${tell}`
        Linking.openURL(url);
    };

    // 웹사이트 이동
    const goToWeb =() => {
        const web = item.website;
        const url = `${web}`;
        Linking.openURL(url)
    };


    // 바텀시트 & 꿀팁 관련 내용 
    const bottomSheetModalRef = useRef(null); //바텀시트 모달의 대한 참조
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const snapPoints = ['25%', '50%', '80%']; // 바텀시트 크기 설정
    const [tipKey, setTipKey] = useState('') // 꿀팁의 key 저장
    const [tip, setTip] = useState(''); // 꿀팁의 Value 저장

    // 모달 열기
    const handlePresentModalPress = (tipKey) => {
        setTipKey(tipKey); //선택된 꿀팁 키 저장
        setTip(item.tip[tipKey]); // 선택된 꿀팁 내용저장
        bottomSheetModalRef.current?.present(); // 바텀시트 열기
        setIsModalOpen(true); // 모달 상태 업데이트
    };

    // 바텀시트 상태 변경 시 처리
    const handleSheetChanges = useCallback((index) => {
        console.log('현재 바텀시트 인덱스:', index);
        if (index === -1) {
            // 인덱스가 -1이면 모달이 닫힌 상태
            setIsModalOpen(false); // 상태 업데이트
            setTipKey(""); // 바텀시트가 닫히면 선택된 꿀팁 키 초기화
            setTip(""); // 바텀시트가 닫히면 선택된 꿀팁 내용 초기화
        }
    }, []);

    // 모달이 닫힐 때 호출되는 콜백
    const handleDismissModalPress = useCallback(() => {
        setIsModalOpen(false); // 상태 업데이트
    }, []);

    // 리뷰 관련 
    const review = item.reviewsToDisplay;
    const fullStars = Math.floor(item.rating); // 완전 채워진 별 개수
    const emptyStars = 5 - fullStars; // 비어 있는 별 개수



    // ==================================================================UI 시작 ============================================================================
    return (
        <GestureHandlerRootView style={styles.container}>

            {/* 헤더 영역: 배경색 애니메이션 적용 */}
            <Animated.View style={[styles.header, { backgroundColor: headerBackgroundColor }]}></Animated.View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } // scrollY 애니메이션을 관리하기 위해 useNativeDriver는 false로 설정
                )}
                scrollEventThrottle={32} // 스크롤 이벤트를 16ms마다 감지
            >
                {/* 이미지 스와이프 */}
                <Swiper 
                    loop={true}
                    height={300}
                >
                    {item.image.map((slide, index) => {
                        // 슬라이드 이미지 URL을 콘솔에 출력
                        // console.log("이미지 URL", slide, "인덱스 :", index);

                        return (
                            <TouchableOpacity key={index} activeOpacity={1}>
                                <Image source={{uri: slide}} style={styles.image}  />
                            </TouchableOpacity>
                        );
                    })}
                </Swiper>
                    <View style={styles.main_wrapper}>
                    <View style={styles.comment_box}>
                        {/* 찜하기 아이콘 */}
                        <TouchableOpacity onPress={() => touchHeart()} style={styles.comment_Button} activeOpacity={0.7}>
                            <FontAwesomeIcon 
                                name={hearted? "heart" : "heart-o"}
                                size={25}
                                color={hearted? "#E76F92" : "#000000"}
                            />
                            <Text style={styles.comment_text}>{hearted? "찜취소" : "찜하기"}</Text>
                        </TouchableOpacity>
                        {/* 리뷰쓰기 아이콘 */}
                        <TouchableOpacity onPress={() => navigateion.navigate('리뷰쓰기', {item, category})} style={styles.comment_Button} activeOpacity={0.7}>
                            <FontAwesomeIcon 
                                name="star"
                                size={25}
                                color={'#FFD700'}
                            />
                            <Text style={styles.comment_text}>리뷰쓰기</Text>
                        </TouchableOpacity>
                        {/* 일정추가 아이콘 */}
                        <TouchableOpacity onPress={() => '일정추가'} style={styles.comment_Button} activeOpacity={0.7}>
                            <FeatherIcon 
                                name="calendar"
                                size={25}
                                color={'#000000'}
                            />
                            <Text style={styles.comment_text}>일정추가</Text>
                        </TouchableOpacity>
                        {/* 공유하기 아이콘 */}
                        <TouchableOpacity onPress={() => ''} style={styles.comment_Button} activeOpacity={0.7}>
                            <FeatherIcon 
                                name="share"
                                size={25}
                                color={'#000000'}
                            />
                            <Text style={styles.comment_text}>공유하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 바디 시작 부분 */}
                <View style={styles.wrapper}>
                    {/* 특징 & 특징꿀팁*/}
                    <View style={styles.mainBox}>
                        <View style={styles.mainBox_title}>
                            <Text style={styles.mainBox_title_text}>특징</Text>
                            <Text>{item.description}</Text>
                        </View>
                        <BottomSheetModalProvider>
                            <TouchableOpacity onPress={() => handlePresentModalPress('특징꿀팁!')} activeOpacity={0.7}>
                                <Text style={styles.tip}>특징꿀팁</Text>
                            </TouchableOpacity>
                        </BottomSheetModalProvider>
                    </View>

                    {/* 영업시간 */}
                    <View style={styles.mainBox}>
                        <View style={styles.mainBox_title}>
                            <Text style={styles.mainBox_title_text}>영업시간</Text>
                            <Text>{item.openHour}</Text>
                        </View>
                        <BottomSheetModalProvider>
                            <TouchableOpacity onPress={() => handlePresentModalPress('이동꿀팁!')} activeOpacity={0.7}>
                                <Text style={styles.tip}>이동꿀팁</Text>
                            </TouchableOpacity>
                        </BottomSheetModalProvider>
                    </View>

                    {/* 입장료 */}
                    <View style={styles.mainBox}>
                        <View style={styles.mainBox_title}>
                            <Text style={styles.mainBox_title_text}>입장료</Text>
                            <Text>{item.enterFee}</Text>
                        </View>
                        <BottomSheetModalProvider>
                            <TouchableOpacity onPress={() => handlePresentModalPress('입장꿀팁!')} activeOpacity={0.7}>
                                <Text style={styles.tip}>입장꿀팁</Text>
                            </TouchableOpacity>
                        </BottomSheetModalProvider>
                    </View>

                    {/* 주의사항 */}
                    <View style={styles.mainBox}>
                        <View style={styles.mainBox_title}>
                            <Text style={styles.mainBox_title_text}>주의사항</Text>
                        </View>
                        <BottomSheetModalProvider>
                            <TouchableOpacity onPress={() => handlePresentModalPress('주의꿀팁!')} activeOpacity={0.7}>
                                <Text style={styles.tip}>주의꿀팁</Text>
                            </TouchableOpacity>
                        </BottomSheetModalProvider>
                    </View>

                    {/* 신분증 */}
                    <View style={styles.mainBox}>
                        <View style={styles.mainBox_title}>
                            <Text style={styles.mainBox_title_text}>기타사항</Text>
                        </View>
                    </View>
                </View>

                {/* 구분선 */}
                <View style={styles.isolation_line}></View>

                {/* ================================================위치 정보========================================================== */}
                <View style={styles.wrapper}>
                    <Text style={styles.map_title}>위치정보</Text>
                    <View style={styles.map_container}>
                        <MapView
                            onPress={() => goToMap()}
                            style={{ flex: 1, height: 250 }} 
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            provider='google'
                            scrollEnabled={false}  // 지도 스크롤 비활성화
                            zoomEnabled={false}    // 확대/축소 비활성화
                            >
                            {location && location.latitude && location.longitude && (
                                <Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                                />
                            )}
                        </MapView>
                            <Text style={styles.mapButton}>지도를 누르면 구글지도로 이동합니다.</Text>
                    </View>
                    <View style={styles.map_info}>
                        <View style={styles.map_info_text}>
                            <Text style={styles.map_info_text_1}>주소</Text>
                            <Text>{item.address}</Text>
                        </View>
                        <View style={styles.map_info_text}>
                            <Text style={styles.map_info_text_1}>전화</Text>
                            <TouchableOpacity onPress={() => call()} activeOpacity={0.7}>
                                <Text style={styles.map_info_button}>{item.tell}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.map_info_text}>
                            <Text style={styles.map_info_text_1}>웹사이트</Text>
                            <TouchableOpacity onPress={() => goToWeb()} activeOpacity={0.7}>
                                <Text style={styles.map_info_button}>{item.website}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Bolt로 위치 이동 버튼 */}
                    <View style={styles.AppButton_wrapper}>
                        <TouchableOpacity
                            onPress={() => openBoltApp()}
                            style={styles.AppButton}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.AppButtonText}>Bolt 부르기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => openGrabApp()}
                            style={styles.AppButton}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.AppButtonText}>Grab 부르기</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 구글 광고 여기에 배치 */}

                </View>

                {/* 구분선 */}
                <View style={styles.isolation_line}></View>

                {/*=========================================================== 리뷰 =======================================================*/}
                <View style={styles.wrapper}>
                    <View style={styles.review_title}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>리뷰 {item.reviewsCount}</Text>
                        <TouchableOpacity onPress={() => navigateion.navigate('리뷰쓰기', {item, category})} activeOpacity={0.7}>
                            <FeatherIcon name="edit" color={'#000000'} size={24}/>
                        </TouchableOpacity>
                    </View>
                    
                    {/* 리뷰 목록 5개만 보여주기 */}
                    {review.map((review, index) => (
                        <View key={index} style={styles.reviewItem}>
                            <View style={styles.review_profile_container}>
                                <Image 
                                    source={{uri : review.userProfileImage}} 
                                    style={styles.review_profileImage}
                                />
                                <View>
                                    <Text>{review.nickName}</Text>
                                    {/* 별점 */}
                                </View>
                            </View>
                            <Text>{review.content}</Text>
                        </View>
                    ))}
                    <TouchableOpacity onPress={() => navigateion.navigate('리뷰전체보기', {item, category})} activeOpacity={0.7}>
                        <Text>리뷰전체보기</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
            {/* 하단에 고정된 메시지 박스 */}
            {message && (
                <View style={styles.messageBox}>
                    <Text style={styles.messageText}>{message}</Text>
                </View>
            )}

            {/* 바텀시트 부분 */}
                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges} // 바텀시트 상태 변경 추적
                        onDismiss={handleDismissModalPress} // 모달 닫을 때 상태 업데이트
                        enablePanDownToClose={true} // 제스처로 바텀시트를 닫을 수 있게 설정
                        index={2}
                        style={styles.bottomSheet}
                    >
                        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                            <Text style={styles.bottomSheet_title}>{tipKey}</Text>
                            <Text style={styles.bottomSheet_text}>{tip}</Text>
                        </BottomSheetScrollView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};




// ====================================================스타일 시작=======================================================================================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffffff',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 15,
        zIndex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60, // 헤더 높이
    },
    // 이미지 슬라이드
    image: {
        width: "100%", 
        height: '100%', // 높이도 슬라이드 영역을 가득 채우도록
        resizeMode: 'cover', // 이미지가 영역을 꽉 채우고 잘리도록 
    },
    main_wrapper: {
        paddingHorizontal: 20,
    },
    // 가게이름, 특징, 영업시간, 입장료, 음악, 신분증, 꿀팁, 위치정보
    wrapper: {
        height: 'auto',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    
    //================================================찜 메세지 / 찜하기 / 리뷰쓰기 / 일정추가 / 공유하기 버튼들=====================================================================
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
    comment_box: {
        flexDirection: 'row',
        width: '100%',
        height: verticalScale(75),
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    comment_Button: {
        width: Horizontalscale(80),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor:'#cccccc', 
        borderWidth: 0.5,
        height:70,
        borderRadius: 10,
    },
    comment_text: {
        fontSize: 11,
        color: '#949494',
        marginTop: 5,
        fontWeight: 'bold',
    },

    //================================================가게 특징 / 영업시간 / 입장료 / 음악 / 신분증 =====================================================================
    wrapper_title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mainBox: {
        width: '100%',
        height: 'auto',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EAEAEA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainBox_title: {
        width: 300,
        flexDirection: 'column',
        marginBottom: 10,
    },
    mainBox_title_text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    tip: {
        fontSize: 14,
        color: '#cccccc',
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingHorizontal: 20, // 상하좌우 여백 설정
        paddingBottom: 50, // 아래 여백 설정
    },

    // 경계선
    isolation_line: {
        marginTop: 0,
        width: '100%',
        borderWidth: 5,
        borderColor: '#EAEAEA',
    },

    // ================================================ 바텀시트 =====================================================================
    bottomSheet: {
        elevation: 10,
        borderRadius: 15,
    },
    bottomSheet_title: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    bottomSheet_text: {
    },
    // ================================================위치 정보 =====================================================================
    map_title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 40,
    },
    map_container: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 5,
        overflow: 'hidden',
        position: 'relative',
        
    },
    mapButton: {
        position: 'absolute',  // 지도 위에 절대 위치로 배치
        bottom: 10,            // 아래쪽에서 10px 띄우기
        left: '50%',           // 수평 중앙에 배치
        transform: [{ translateX: -35 }],  // 버튼을 정확히 중앙에 맞추기 위해 왼쪽으로 25px 이동
        backgroundColor: '#ffffff',  // 버튼 배경
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        fontSize: 10,
        zIndex: 2,
    },

    // ================================================위치 추가정보 =====================================================================
    map_info: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#EAEAEA',
        borderRadius: 10,
        justifyContent: 'space-between',
        paddingRight: 40,
    },
    map_info_text: {
        height: 'auto',
        flexDirection: 'row',
        margin: 15,
    },
    map_info_text_1: {
        fontWeight: 'bold',
        marginRight: 20,
    },
    map_info_button: {
        width: 250,
    },
    // =============================================== 볼트 / 그랩 앱 열기 =======================================================
    AppButton_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',  // 세로 정렬을 위해 추가
    },
    AppButton: {
        width: 180,
        height: 50,
        backgroundColor: '#87cefa',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
    AppButtonText: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // ================================================ 리뷰 =====================================================================
    reviewItem: {
        width: '100%',
        height: 300,
    },
    review_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },

    review_profile_container: {
        flexDirection: 'row',
    },
    review_profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },


    



    // 내용 시작 부분 (특징, 영업시간, 입장료, 가격, )
});

export default HotPlacesItem;