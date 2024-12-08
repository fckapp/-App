import { collection, query, where, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import {db} from './Firebase_Config.js'


// 파이어베이스 클라우드 스토어에서 데이터를 가져오는 함수
export const FetchItem = async (category, city, filters) => {
    const limitValue = 10;
    const Collection = collection(db, category);


    // city 필터링 (기본값은 '전체'일 경우 모든 도시를 조회)
    let cityQuery = city !== '전체' ? where('city', '==', city) : undefined;




    // 필터 적용 (추천순, 리뷰순 등)
    let filterQuery = query(
        Collection,
        cityQuery,  // city 조건이 있을 경우
        limit(limitValue)  // limit을 적용하여 최대 10개의 결과만 가져오기
    );



    // 페이지네이션 처리 (이전 마지막 문서 기준)
    if (filters.startAfterDoc) {
        filterQuery = query(
            filterQuery,
            startAfter(filters.startAfterDoc)  // lastVisible 문서 이후의 데이터를 가져오기
        );
    }

    // 데이터를 Firestore에서 가져오기
    try {
        const snapShot = await getDocs(filterQuery);

        // 데이터가 없다면
        if (snapShot.empty) {
            console.log("데이터가 없습니다.");
            return {
                items: [],
                hasMore: false,
                lastVisible: null,
            };
        }

        const dataItems = [];
        for (const doc of snapShot.docs) {
            
            //각 해당 카테고리별 문서에서 서브 컬랙션이 리뷰 가져오기
            const reviewCollection = collection(db, category, doc.id, 'reviews');
            const reviewSnap = await getDocs(reviewCollection);
            const ratings = reviewSnap.docs.map(reviewDoc => reviewDoc.data().rating);

            // 각 문서별 평균 별점 점수
            const averageRating = ratings.length > 0 ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length : 0;

            //리뷰 갯수
            const reviewsCount = ratings.length;


            // 클럽 문서 데이터와 리뷰를 합쳐서 저장
            dataItems.push({
                id: doc.id,
                ...doc.data(),
                averageRating,
                reviewsCount,
                ...applyFilters(filters),
            });
        }
    
        

        const hasMore = snapShot.docs.length === limitValue;  // 데이터를 다 가져왔는지 확인
        const newLastVisible = snapShot.docs[snapShot.docs.length - 1];  // 마지막 문서 저장

        

        return {
            items: dataItems,
            hasMore,
            lastVisible: newLastVisible,
        };

        

    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        return {
            items: [],
            hasMore: false,
            lastVisible: null,
        };
    }
};

// 필터를 적용하는 함수 예시 (추천순, 리뷰순 등)
const applyFilters = (filters) => {
    const filterConditions = [];

    // 예시: 추천순, 리뷰순 필터 처리
    if (filters.sort === 'averageRating') {
        filterConditions.push(orderBy('averageRating', 'desc'));  // 추천순 (rating 내림차순)
    } else if (filters.sort === 'reviewCount') {
        filterConditions.push(orderBy('reviewCount', 'desc'));  // 리뷰순 (reviewCount 내림차순)
    }

    // 필터가 더 필요하면 여기에 추가할 수 있음
    return filterConditions;
};
