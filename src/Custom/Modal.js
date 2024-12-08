import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput} from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘
import { useNickName } from '../Firebase/Services_NicknameContext.js'; // Context import



// 닉네임 설정 모달창
export const NickName = () => {
    const [ModalVisible, setModalVisible] = useState(true);
    const [newNickName, setNewNickName] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);
    const { updateNickNameAndProfile, nickName, profileImage: currentProfileImage } = useNickName();

    useEffect(() => {
        const user = auth().currentUser;

        if (user) {
            if(!user.displayName) {
                setModalVisible(true);
            } else {
                setNewNickName(user.displayName);
                setModalVisible(false);
            }
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
        }});
    };

     // 닉네임 저장
    const handleNickNameSave = () => {
        if (newNickName === '') {
        Alert.alert('닉네임을 입력해 주세요');
        return;
        }
        updateNickNameAndProfile(newNickName, newProfileImage);  // Context API로 업데이트
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Modal을 제대로 표시하기 위해 `visible`로 변경 */}
            <Modal visible={ModalVisible} transparent={true} animationType="slide">
                {/* 모달 외부 배경 */}
                <View style={styles.modalBackground}>
                    {/* 모달 내부 콘텐츠 */}
                    <View style={styles.modalContainer}>
                    <Text style={styles.nickname_title}>이리타여에 오신것을 환영합니다{'\n'}프로필을 설정해 주세요</Text>
                        <View style={styles.ImageContainer}>
                            <View style={styles.ImagePicker}>
                                <Image  source={{uri :newProfileImage || currentProfileImage }} style={styles.image}/>
                            </View>
                            <TouchableOpacity style={styles.ImageSelectButton} onPress={() => SelectProfileImage()}>
                                <FontAwesomeIcon name="camera" size={20}/>
                            </TouchableOpacity>
                        </View>
                        
                        <TextInput
                            value={newNickName}
                            onChangeText={setNewNickName}  // onChangeText로 값 업데이트
                            style={styles.inputValue}
                            placeholder="닉네임을 입력하세요"
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={() => handleNickNameSave()}>
                            <Text style={styles.buttonText}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // 배경을 어두운 반투명 색으로 처리
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // 반투명 배경
    },
    // 모달 콘텐츠 영역 스타일
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',   // 원하는 너비
        height: 400,  // 원하는 높이
        zIndex: 1000,  // 버튼이 겹치지 않도록
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    nickname_title: {
        fontSize: 18,
        fontWeight: 'bold',
        height: 100,
        paddingBottom: 10,
    },
    ImageContainer: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    ImagePicker: {
        width: 150,
        height: 150,
        // backgroundColor: '#000000',
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
        backgroundColor: '#cccccc',
        borderRadius: 30,
        position: 'relative',
        left: 50,
        top: 60,
        alignItems: 'center',
        justifyContent:'center',
    },
    ImageSelectText: {
        fontSize: 12,
    },
    inputValue: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 80,
    },
    button: {
        backgroundColor: '#87cefa',
        borderRadius: 5,
        marginTop: 15,
        width: '100%',
        height: 40,
        alignItems: 'center', // 텍스트를 중앙에 정렬
        justifyContent: 'center',
        zIndex: 2000,  // 버튼이 제일 위에 오도록 설정
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});