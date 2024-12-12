// src/features/authValidation.js

// 비밀번호 유효성 검사
export const validatePassword = (password) => {

    // 비밀번호 숫자 및 특수문자 포함여부 검사
    const hasNumber = /\d/; //숫자 포함 여부 확인
    const hasSpecialChar = /[!@#$%^&*(),.":{}|<>]/; //특수문자 포함 여부 확인

    if (password.length < 6) {
        return '비밀번호는 6자 이상이어야 합니다.';
        
    } else if (!hasNumber.test(password)){
        return '비밀번호에는 숫자가 포함되어야 합니다.'

    } else if (!hasSpecialChar.test(password)) {
        return '비밀번호에는 특수문자가 포함되어야 합니다.'
    } 
};