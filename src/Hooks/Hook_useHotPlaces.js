import {useState, useEffect} from 'react';
import {FetchItem} from '../Firebase/Firebase_Firestore';

// 도시 목록 
const cityList = ['전체', '방콕', '파타야', '치앙마이', '푸켓'];

// 핫플레이스 각 아이템(클럽, 술집, 관광지, 맛집, 시장)에 대한 클릭시 해당 아이템의 데이터 호출
export const UseHotPlaces = (category, initialcity, initialfilters={}) => {
    const [city, setCity] = useState(initialcity);
    const [filters, setFilters] = useState(initialfilters);
    const [items, setItems] = useState([]);
    const [loading,, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataCache, setDataCache] = useState({});
    

    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };

    useEffect(() => {
        
        const getItemsAtdb = async() => {
            try {
                const cacheKey = `${category}_${city}_${JSON.stringify(filters)}`; // 캐시를 더 정교하게 구분

                // 만약 데이터가 캐시되어 있는 상태이면 items에 캐시된 데이터 바인딩
                if (dataCache[cacheKey]) {
                    setItems(dataCache[cacheKey]);
                    setHasMore(false);
                    return;
                };


                let fetchedItem;
                // 각 카테고리별로 API 호출
                if (category === '클럽') {
                    fetchedItem = await FetchItem('clubs', city, filters);  // city와 filters를 사용하여 API 호출
                } else if (category === '술집') {
                    fetchedItem = await FetchItem('bars', city, filters);
                } else if (category === '관광지') {
                    fetchedItem = await FetchItem('tours', city, filters);
                } else if (category === '맛집') {
                    fetchedItem = await FetchItem('foods', city, filters);
                } else if (category === '시장') {
                    fetchedItem = await FetchItem('markets', city, filters);
                }

                // 데이터를 상태에 저장
                setItems(fetchedItem.items || []);
                setHasMore(fetchedItem.hasMore); // 더 많은 데이터가 있는지 여부
            
                //데이터를 캐시에 저장
                setDataCache((prevCache) => ({
                    ...prevCache,
                    [cacheKey]: fetchedItem.items,
                }));
                

            } catch (error) {
                console.error('카테고리별 아이템 불러오기 오류 발생', error);
            } finally {
                console.log("데이터 호출 완료");
                setLoading(false); 
            }
        };

        getItemsAtdb();
    }, [category, city, filters]);

    return {items, loading, hasMore, updateFilters, setCity, cityList};
} ;