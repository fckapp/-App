import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNickName } from '../Firebase/Services_NicknameContext.js'; // Context import
import { launchImageLibrary } from "react-native-image-picker";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'

const MyPageScreen = () => {
    const [newNickName, setNewNickName] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리
    const { updateNickNameAndProfile, nickName, profileImage: currentProfileImage, updateProfileImage } = useNickName();
    const navigation = useNavigation();
    const user = auth().currentUser;

    useEffect(() => {

        if (user) {
            setUserEmail(user.email);
        } else {
            setIsLoggedIn(false);  // 로그인되지 않음
        }
    }, []);


    //프로필 사진 선택
    const SelectProfileImage = () => {
        launchImageLibrary({mediaType: 'photo', quality: 1, selectionLimit: 1,}, (response) => {
            console.log(response); // response 전체 확인
            if (response.errorCode) {
                Alert.alert("이미지 업로드 실패 다시 시도해 주세요.");
                return;
            } else if(response.didCancel === true) {
                return;
            } else {
                const userImage = response.assets[0].uri; // 이미지 URI를 가져옵니다.
                setNewProfileImage(userImage);
                updateProfileImage(userImage);
        }});
    };

    

    //이메일 

    return (
        <View style={styles.container}>
            <View style={styles.ImageContainer}>
                <View style={styles.ImagePicker}>
                    <Image  source={{uri :newProfileImage || currentProfileImage }} style={styles.image}/>
                </View>
                <TouchableOpacity style={styles.ImageSelectButton} onPress={() => SelectProfileImage()}>
                    <FontAwesomeIcon name="camera" size={20}/>
                </TouchableOpacity>
            </View>

            <View style={styles.Info_container}>
                 {/* 이메일 */}
                 {isLoggedIn && user ? (
                    <View style={styles.Info_box}>
                        <TouchableOpacity style={styles.Info_button}>
                            <Text style={styles.Info_title}>이메일</Text>
                            <View style={styles.Info_sub}>
                                <Text style={styles.Info_text}>{user.email}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null}
                {/* 닉네임  */}
                <View style={styles.Info_box}>
                    <TouchableOpacity style={styles.Info_button} onPress={() => navigation.navigate('닉네임변경')}>
                        <Text style={styles.Info_title}>닉네임</Text>
                        <View style={styles.Info_sub}>
                            <Text style={styles.Info_text}>{nickName}</Text>
                            <FontAwesomeIcon name="angle-right" size={24} color={'#cccccc'} />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 리뷰관리 */}
                <View style={styles.Info_box_1}>
                    <TouchableOpacity style={styles.Info_button}>
                        <Text style={styles.Info_title}>리뷰관리</Text>
                        <View style={styles.Info_sub}>
                            <Text style={styles.Info_text}>{nickName}</Text>
                            <FontAwesomeIcon name="angle-right" size={24} color={'#cccccc'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 30,
        backgroundColor: '#ffffff',
    },

    //프로필 이미지
    ImageContainer: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImagePicker: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        position: 'absolute',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    ImageSelectButton: {
        height: 50,
        width: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        position: 'relative',
        left: 50,
        top: 60,
        alignItems: 'center',
        justifyContent:'center',
        elevation: 1,
    },

    // 닉네임 / 이메일 / 리뷰
    Info_container: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#cccccc',
        marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    Info_box: {
        width: '100%',
        height: '33.33%',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#cccccc',
    },
    Info_box_1: {
        width: '100%',
        height: '33.33%',
        alignItems: 'center',
    },
    Info_button: {
        width: '100%',
        height: '100%',
        alignItems: 'center', // 세로로 중앙 정렬
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20, // 좌우 여백
        paddingVertical: 20,
    },
    Info_title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    Info_sub: {
        alignItems: 'center', // 세로로 중앙 정렬
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Info_text: {
        fontSize: 12,
        marginRight: 10,
        color: '#949494',
    },

    //로그아웃
    LogOut_text: {
        fontSize: 12,
        color: '#cccccc',
    },
});

export default MyPageScreen;