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
import React from "react";
import { useLocation } from 'react-router';

const LIST_PATH = ["/", "recommend", "sales"];

const CenterCard = ({ list, type, center }) => {

    const CENTER_PATH = centerId => {
        if(list && list.length > 0) {
            const parentPath = list === "main"? "" : "/" + list;
            return parentPath + `/center/${centerId}`
        } else {
            const currentPath = useLocation().pathname.split('/')[1];
            let parentPath = LIST_PATH.filter(pathName => pathName === currentPath)[0] || "";
            if(parentPath.length > 0) parentPath = "/" + parentPath;
            return parentPath + `/center/${centerId}` 
        }
    };


    return (
        <>
            {
                center && Object.keys(center).length > 0 &&
                <Card className={ type === "abstract" && 'abstract' }>
                    { 
                        type ==="sub" && 
                        <Head>{`${center["기관"]} ${center["정원"]}인 시설 ${center["분류"]}`}</Head> 
                    }
                    <Wrap to={ CENTER_PATH(center.id) }>
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
                                    <Cate>{center["분류"]}</Cate>
                                    <Corp><img src={ CorpImg } /></Corp>
                                </>
                            } 
                            <Badges>
                                {center["추천"] && <div className='recommend'>추천</div>}
                                {center["프리미엄"] && <div className='premium'>프리미엄</div> }
                            </Badges>
                            {
                                type === "abstract" && 
                                <Name>{`${center["기관"]} ${center["정원"]}인`}</Name>
                            }
                            <Region>{center["주소"]}</Region>
                            <Price>{`매매 ${center["매매가"]}`}</Price>
                            <Infos>
                                <span>{`${center["기관"]} ${center["면적"]}`}</span>
                                <span>{`[현원 ${center["현원"]}인/정원${center["면적"]}인]`}</span>
                            </Infos>
                            {
                                type !== "abstract" && 
                                <Assets>
                                    <div>
                                        <em className='invest'>투자</em>
                                        <span className='value'>{center["투자"]}</span>
                                    </div>
                                    <div>
                                        <em className='loan'>대출</em>
                                        <span className='value'>{center["대출"]}</span>
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
            }
        </>
    )
};

export default CenterCard;