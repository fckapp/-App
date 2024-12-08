import { useState, useCallback } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const DropdownMenu = () => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const translateY = useSharedValue(-100); // 초기 위치 (위로 숨김)
  const [isTransitioning, setIsTransitioning] = useState(false); // 상태 전환 중인지 여부

  // 도시 토글메뉴 함수
  const cityToggleMenu = () => {
    if (isTransitioning) return; // 전환 중이면 클릭 무시
    setIsTransitioning(true); // 전환 시작

    if (!isCityOpen) {
      // 메뉴가 열리지 않을 때
      setTimeout(() => {
        setIsCityOpen(true); // 메뉴 열기
        translateY.value = withTiming(0, { duration: 400 }); // 부드럽게 아래로 이동
        setIsTransitioning(false); // 전환 종료
      }, 200); // 200ms 딜레이

    } else {
      // 애니메이션이 끝난 후 상태 업데이트r
      setTimeout(() => {
        setIsCityOpen(false); // 애니메이션 완료 후 메뉴 닫기
        setIsTransitioning(false); // 전환 종료
      }); // 애니메이션 시간과 일치
    }
  };


  // 테마 토글메뉴 함수
  const themeToggleMenu = () => {
    if (isTransitioning) return; // 전환 중이면 클릭 무시

    setIsTransitioning(true); // 전환 시작

    if (!isThemeOpen) {
      // 메뉴가 열리지 않을 때
      setTimeout(() => {
        setIsThemeOpen(true); // 메뉴 열기
        translateY.value = withTiming(0, { duration: 400 }); // 부드럽게 아래로 이동
        setIsTransitioning(false); // 전환 종료
      }, 200); // 200ms 딜레이

    } else {
      // 애니메이션이 끝난 후 상태 업데이트
      setTimeout(() => {
        setIsThemeOpen(false); // 애니메이션 완료 후 메뉴 닫기
        setIsTransitioning(false); // 전환 종료
      });
    }
  };

  // 정렬 토글메뉴 함수
  const sortToggleMenu = () => {
    if (isTransitioning) return; // 전환 중이면 클릭 무시

    setIsTransitioning(true); // 전환 시작

    if (!isSortOpen) {
      // 메뉴가 열리지 않을 때
      setTimeout(() => {
        setIsSortOpen(true); // 메뉴 열기
        translateY.value = withTiming(0, { duration: 400 }); // 부드럽게 아래로 이동
        setIsTransitioning(false); // 전환 종료
      }, 200); // 200ms 딜레이

    } else {
      // 애니메이션이 끝난 후 상태 업데이트
      setTimeout(() => {
        setIsSortOpen(false); // 애니메이션 완료 후 메뉴 닫기
        setIsTransitioning(false); // 전환 종료
      });
    }
  };


  // 토글메뉴 닫는 함수
  const closeMenu = () => {
      console.log("Close menu triggered");
      setIsCityOpen(false);
      setIsThemeOpen(false);
      setIsSortOpen(false);
  };

  

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return { isCityOpen, isThemeOpen, isSortOpen, cityToggleMenu, themeToggleMenu, sortToggleMenu, closeMenu, animatedStyle };
};

export default DropdownMenu;

