// 해당 파일은 사용자 디스플레이의 크기를 가져와 동적으로 크기를 조정할수 있게 해주는 파일이다.
import { Dimensions } from "react-native";

// 사용자의 휴대 기기 디스플레이스 가로 / 세로 크기 호출
const {width, height} = Dimensions.get('window');

// 아이폰 6/7/8 기준의 화면 가로 / 세로 크기로 기준점을 정함
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667; // 기준이 되는 화면 높이 (iPhone 6/7/8)

export const Horizontalscale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + (Horizontalscale(size) - size) * factor;

