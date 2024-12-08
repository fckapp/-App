import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { useNickName } from "../Firebase/Services_NicknameContext";
import { useNavigation } from "@react-navigation/native";

const ChangeNickname = ({}) => {
    const [newNickName, setNewNickName] = useState('');
    const {updateNickName} = useNickName();
    const navigation = useNavigation();

    //닉네임 변경 및 이전 화면으로 돌아가기
    const SaveNickName = () => {
        if (newNickName === '') {
            Alert.alert('닉네임을 입력해 주세요');
            return;
        } else {
            updateNickName(newNickName);
            navigation.goBack();
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>새로운 닉네임을 입력해주세요</Text>
            <TextInput
                style={styles.input}
                value={newNickName}
                onChangeText={setNewNickName}
            />
            <TouchableOpacity style={styles.button} onPress={() => SaveNickName()}>
                <Text style={styles.button_text}>완료</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#a9a9a9',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#87cefa',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    button_text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});
export default ChangeNickname;

