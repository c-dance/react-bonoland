import {
    Card,
    Head,
    Wrap,
    Thumbnail,
    Sales,
    Cate,
    Corp,
    Num,
    Badges,
    Region,
    Price,
    Infos,
    Assets,
    Actions,
    Action
} from './CenterCardStyle';
//테스트 사진
import ThumbImg from '../../../assets/test/card-thumbnail.png';
import CorpImg from '../../../assets/test/card-corp.png';

const CenterCard = ({ type, center }) => (
    <Card>
        { type ==="sub" && <Head>{center.id}</Head> }
        <Wrap to={ '/center/' + center.id }>
            <Thumbnail>
                <img src={ ThumbImg } alt="보노매물" />
            </Thumbnail>
            <Sales>
                <Num><span>매물번호:123456</span></Num>
                <Cate>분양</Cate>
                <Corp><img src={ CorpImg } /></Corp>
                <Badges>
                    <div className='recommend'>추천</div>
                    <div className='premium'>프리미엄</div>
                </Badges>
                <Region>서울시 강남구</Region>
                <Price>매매 999억</Price>
                <Infos>
                    <span>주야간 보호센터, 연면적 1,452m²</span>
                    <span>[현원 39인 / 정원 39인]</span>
                </Infos>
                <Assets>
                    <div>
                        <em className='invest'>투자</em>
                        <span className='value'>7억</span>
                    </div>
                    <div>
                        <em className='loan'>대출</em>
                        <span className='value'>13억</span>
                    </div>
                </Assets>
            </Sales>
        </Wrap>
        <Actions>
            <Action icon="scrap">스크랩</Action>
            <Action icon="share">공유</Action>
        </Actions>
    </Card>
);

export default CenterCard;