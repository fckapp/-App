import { View, StyleSheet} from 'react-native';
import { EmailLoginForm } from '@features/auth/login/index.js';


export const EmailLoginPage = () => {
    return(
        <View style={styles.container}>
            <EmailLoginForm />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
})