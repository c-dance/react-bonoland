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
    Name,
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
    <Card className={ type === "abstract" && 'abstract' }>
        { 
            type ==="sub" && 
            <Head>{center.id}</Head> 
        }
        <Wrap to={ '/center/' + center.id }>
            {
                type !== "abstract" &&
                <Thumbnail>
                    <img src={ ThumbImg } alt="보노매물" />
                </Thumbnail>
            }
            <Sales>
                <Num><span>매물번호:123456</span></Num>
                { 
                    type !== "abstract" && 
                    <>
                        <Cate>분양</Cate>
                        <Corp><img src={ CorpImg } /></Corp>
                    </>
                } 
                <Badges>
                    <div className='recommend'>추천</div>
                    <div className='premium'>프리미엄</div>
                </Badges>
                {
                    type === "abstract" && 
                    <Name>주야간 보호센터 39인</Name>
                }
                <Region>서울시 강남구</Region>
                <Price>매매 999억</Price>
                <Infos>
                    <span>주야간 보호센터, 연면적 1,452m²</span>
                    <span>[현원 39인 / 정원 39인]</span>
                </Infos>
                {
                    type !== "abstract" && 
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
                }
            </Sales>
        </Wrap>
        {
            type !== "abstract" && 
            <Actions>
                <Action icon="scrap">스크랩</Action>
                <Action icon="share">공유</Action>
            </Actions>
        }
    </Card>
);

export default CenterCard;