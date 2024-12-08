import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {fetchClubs, fetchBars, fetchTours, fetchFoods, fetchMarket} from '../Firebase/Firebase_Firestore.js'
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import {Horizontalscale, verticalScale, moderateScale} from '../Components/Custom_Dimensions.js'
import DropdownMenu from '../Components/Custom_DropdownMenu.js'
import Animated from 'react-native-reanimated';
import { CustomLoadingful } from '../Components/Custom_Loading.js';
import {UseHotPlaces} from '../Hooks/Hook_useHotPlaces.js';

// 핫플레이스 함수 시작 부분
const HotPlacesScreen = ({route}) => {
    // 네이게이션 변수 정의
    const navigation = useNavigation();
    const [category, setCategory] = useState(route.params.category); //카테고리

    // 드랍다운 메뉴 상태관리
    const { isCityOpen, isThemeOpen, isSortOpen,  cityToggleMenu, themeToggleMenu, sortToggleMenu, closeMenu, animatedStyle} = DropdownMenu();

    const {items, loading, hasMore, updateFilters, setCity, cityList} = UseHotPlaces(category, '전체', {sort: 'averageRating'})
  
    // 아이템 렌더링 코드 (메인)
    const renderItems = ({item}) => {
        const averageRating = item.averageRating || 0;

        const fullStars = Math.floor(averageRating); // 완전 채워진 별 개수
        const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0; // 반 별
        const emptyStars = 5 - fullStars - halfStar; // 비어 있는 별 개수
        
        return (
            <TouchableOpacity onPress={() => navigation.navigate('상세정보', {category, item})} activeOpacity={1} key={item.id}>
                <View style={styles.renderContainer}>
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
                            <Text style={styles.heartNum}>({item.reviewsCount})</Text>

                            {/* 하트 아이콘 */}
                            <FontAwesomeIcon name="heart" color={'#E76F92'} style={styles.heart}/>
                            <Text style={styles.heartNum}>{item.heart}</Text>
                        </View>
                        <Text style={styles.category}>{item.category} • {item.city}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    // 카테고리 버튼 렌더링
    const renderCategoryButton = (categoryName) => (
        <TouchableOpacity
            style={[styles.categoryButton, category === categoryName && styles.selectedCategoryButton]}
            onPress={() => setCategory(categoryName)} // 버튼 클릭 시 카테고리 변경
        >
            <Text style={[styles.categoryButtonText, category === categoryName && styles.selectedCategoryText]}>{categoryName}</Text>
        </TouchableOpacity>
    );


    // 도시 버튼 렌더링
    const renderCityButton = (cityName) => (
        <TouchableOpacity
            style={[styles.cityButton, city === cityName && styles.selectedCityButton]}
            onPress={() => {
                setCity(cityName)
                toggleMenu();
            }} // 버튼 클릭 시 카테고리 변경
        >
            <Text style={[styles.cityButtonText, city === cityName && styles.selectedCityText]}>{cityName}</Text>
        </TouchableOpacity>
    );


    //테마 목록
    const themes = {
        클럽: ['전체'],
        술집: ['전체', '뮤직', '루프탑', '해변', '헌팅', '아고고', '트렌스젠더'],
        관광지: ['전체', '역사', '자연', '체험', '박물관'],
        맛집: ['전체','태국식', '한식', '중식', '일식', '서양식', '카페', '티저트'],
        시장: ['전체', '야시장', '과일', '수산']
    };
    // 카테고리 테마별 버튼 렌더링
    const renderThemeButton = (themeName) => (
        <TouchableOpacity
            style={[styles.themeButton, theme === themeName && styles.selectedThemeButton]}
            onPress={() => setTheme(themeName)} // 버튼 클릭 시 카테고리 변경
        >
            <Text style={[styles.themeButtonText, theme === themeName && styles.selectedThemeText]}>{themeName}</Text>
        </TouchableOpacity>
    );


    // 카테고리 테마별 버튼 렌더링
    const renderSortButton = (sortName) => (
        <TouchableOpacity
            style={[styles.sortButton, sort === sortName && styles.selectedSortButton]}
            onPress={() => setTheme(sortName)}
        >
            <Text style={[styles.sortButtonText, sort === sortName && styles.selectedText]}>{sortName}</Text>
        </TouchableOpacity>
    );
    



    // UI에 보여지는 곳
    return (
        <GestureHandlerRootView style={styles.container}>

            {loading && <CustomLoadingful/>}
            <View style={styles.inner}>
                {/* 각 카테고리별 선택할 수 있는 버튼 */}
                <View style={styles.categoryContainer}>
                    {['클럽', '술집', '관광지', '맛집', '시장'].map(renderCategoryButton)}
                </View>
                {/* 도시 선택 버튼 */}
                <View style={styles.menuContainer}>
                    {/* <TouchableOpacity onPress={cityToggleMenu} style={styles.menuButton}>
                        <View style={styles.subMenuButton}>
                            <Text style={styles.menuButtonText}>{city}</Text>
                            <FeatherIcon name="map-pin" color={'#000000'} size={14}/>
                        </View>
                    </TouchableOpacity> */}

                    {/* 테마 선택 버튼 */}
                    {/* <TouchableOpacity onPress={themeToggleMenu} style={styles.menuButton}>
                        <View style={styles.subMenuButton}>
                            <Text style={styles.menuButtonText}>{theme}</Text>
                            <FeatherIcon name="command" color={'#000000'} size={14}/>
                        </View>
                    </TouchableOpacity> */}

                    {/* 정렬 선택 버튼 */}
                    {/* <TouchableOpacity onPress={sortToggleMenu} style={styles.menuButton}>
                        <View style={styles.subMenuButton}>
                            <Text style={styles.menuButtonText}>{sort}</Text>
                            <FeatherIcon name="layers" color={'#000000'} size={14}/>
                        </View>
                    </TouchableOpacity> */}
                </View>

                {/* 도시 드롭다운 메뉴 */}
                {isCityOpen && (
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={closeMenu}>
                            <View style={styles.overlay}/>
                        </TouchableWithoutFeedback>
                        <Animated.View style={[styles.cityDropdown, animatedStyle, { zIndex: 1 }]}>
                            {cityList.map((cityName) => (
                                <TouchableOpacity key={cityName} style={styles.cityItem} onPress={() => {
                                    setCity(cityName); 
                                    cityToggleMenu(); // 도시 선택 후 메뉴 닫기
                                }}>
                                    <Text style={styles.ModalText}>{cityName}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableWithoutFeedback onPress={closeMenu} style={styles.modalExitBox}>
                                <Text style={styles.modalExitText}>닫기</Text>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                )}


                {/* 테마 드롭다운 메뉴 */}
                {isThemeOpen && (
                    <View style={styles.overlay}>
                        <Animated.View style={[styles.cityDropdown, animatedStyle, { zIndex: 1 }]}>
                            {themes[category]?.map((themeName) => (
                                <TouchableOpacity
                                    key={themeName}
                                    style={styles.cityItem}
                                    onPress={() => {
                                        setTheme(themeName);
                                        themeToggleMenu(false);
                                    }}>
                                    <Text style={styles.ModalText}>{themeName}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableWithoutFeedback onPress={closeMenu} style={styles.modalExitBox}>
                                <Text style={styles.modalExitText}>닫기</Text>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                )}

                {/* 정렬 드롭다운 메뉴 */}
                {isSortOpen && (
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={closeMenu}>
                            <View style={[styles.overlay, {zIndex: 0}]}/>
                        </TouchableWithoutFeedback>
                        <Animated.View style={[styles.cityDropdown, animatedStyle, { zIndex: 2 }]}>
                            {['전체', '추천순', '좋아요순', '리뷰순'].map((sortName) => (
                                <TouchableOpacity key={sortName} style={styles.cityItem} onPress={() => {
                                    setSort(sortName); 
                                    sortToggleMenu(); // 정렬방법 선택 후 메뉴 닫기
                                }}>
                                    <Text style={styles.ModalText}>{sortName}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableWithoutFeedback onPress={closeMenu} style={styles.modalExitBox}>
                                <Text style={styles.modalExitText}>닫기</Text>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                )}


                {/* 리스트 형식에 데이터를 보여주는 */}
                <FlatList
                    data={items}
                    renderItem={renderItems}
                    keyExtractor={(item) => item.id || item.name}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    style={{ flex: 1}}
                    onEndReachedThreshold={0.3} // 얼마나 가까워지면 더 불러올지를 설정 (0.3는 끝에서 30% 지점)
                    maxToRenderPerBatch={5} // 배치로 렌더링할 항목 수
                    keyboardShouldPersistTaps="handled" // 키보드가 활성화된 상태에서 터치가 가능하도록
                />
            </View>
        </GestureHandlerRootView>
    );
};


// css 시작부분
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    inner: {
        flexGrow: 1, // 자식 요소들이 공간을 차지하/도록 조정
    },

    // 메뉴 버튼 시작
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: verticalScale(40), // 높이 지정
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    menuButton: {
        width: 'auto',
        height: verticalScale(30),
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',  // 연한 회색 배경
        marginRight: 10,
    },
    subMenuButton: {
        width: Horizontalscale(70),
        height: verticalScale(35),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButtonText: {
        fontSize: 12,
        marginRight: 3,
    },
    

    //태국 도시 선택 드랍다운 메뉴 
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 투명 검은색
        zIndex: 4,
    },
    cityDropdown: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 3,
        justifyContent: 'space-between',
        fontSize: 18,
        zIndex: 3,
   
    },

    cityItem: {
        width: '100%',
        height: verticalScale(50),
        alignItems: 'center',
        justifyContent: 'center',
    },

    ModalText: {
        textAlign: 'center',
        fontSize: 14,
        
    },
    modalExitBox: {
        height: verticalScale(50),
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#d3d3d3',
    },
    modalExitText: {
        fontSize: 14,
        textAlign: 'center',
    },

    // 상단 카테고리 버튼 [클럽, 술집, 관광지, 맛집, 시장]
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#ffffff',
        height: verticalScale(40), // 높이 지정
    },
    categoryButton: {
        padding: 2,
        borderBottomWidth: 3,
        borderBottomColor: '#f0f0f0',
        width: 70,
        height: 30,
    },
    categoryButtonText: {
        color: '#cccccc',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    selectedCategoryButton: {
        borderBottomColor: '#000000',
    },
    selectedCategoryText: {
        color: '#000000',
    },

    //서브 카테고리 버튼들 
    subCategoryContainer: {
        width: '100%',
        height: verticalScale(25),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292549',
    },
    subText: {
        textAlign: 'center',
        color: '#000080',
        fontSize: 12,
    },
    mainTextBox: {
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    mainText: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%',
    },

    // 화면 바디 랜더링 아이템
    renderContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    renderImage: {
        width: 120,
        height: 140,
        borderRadius: 10,
    },
    textContainer: {
        width: '70%',
        height: '100%',
        flexDirection: 'column',
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
});
export default HotPlacesScreen;