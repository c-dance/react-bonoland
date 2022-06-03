import { Window, Close } from "./InfoWindowStyle";
import { Link } from "react-router-dom";

const InfoWindow = ({ data, onCloseClick, onContactClick }) => {
    return <Window>
        <Close onClick={ () => onCloseClick() } />
        <div className="info-window" >
            <div className="info-window__body">
                <div className="pic"><img/></div>
                <div className="conts">
                    <div className="conts__badges">
                        <div className="badge badge--sales">분양</div>
                        <div className="badge badge--rcmd">추천</div>
                        <div className="badge badge--premium">프리미엄</div>
                    </div>
                    <span className="conts__addr">서울 특별시 강남구</span>
                    <span className="conts__category">단독 요양원 79인</span>
                </div>
                <div className="infos">
                    <span className="infos__price">매매가 46억</span>
                    <span className="infos__capacity">면적 1평 / 인가 00인 시설</span>
                </div>
            </div>
            <div className="info-window__actions">
                <Link to={`/center/${data.id}`} className="btn btn--details">상세</Link>
                <button className="btn" onClick={ () => onContactClick() }>문의</button>
            </div>
        </div>
    </Window>;
};

export default InfoWindow;