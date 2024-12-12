// 이메일 유효성 검사
export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (!emailRegex.test(email)) {
      return '올바른 이메일 주소를 입력하세요.';
    } else {
      return;
    }
};

