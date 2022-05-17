import KeywordFilter from "../../components/filters/KeywordFilter/KeywordFilter";
import CategoryFilter from "../../components/filters/CategoryFilter/CategoryFilter";
import CapacityFilter from "../../components/filters/CapacityFIlter/CapacityFilter";

const MainListContainer = () => {
    /*
        search(1) 키워드 : 지역구, 지역명
        search(2) 카레고리: 단독 요양원, 상가 요양원, 주간 보호
        search(3) 필터 : 정원
    */
   /*
        router: [center, zoom, region] 갖고 추천 페이지 이동
   */
   /*
        list(1) : search 조합 조회 목록
   */

    return (
        <>
            <KeywordFilter />
            <CategoryFilter />
            <CapacityFilter />

            <div>추천 프리미엄 더보기</div>
            <div>검색 목록</div>
        </>
    )
};

export default MainListContainer;