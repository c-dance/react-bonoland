import { InformBox } from "./InformStyled";


export const Loading = ({ text }) => (
    <InformBox>
        { text && <span> { text } </span> }
        { !text && <span>로딩 중</span> }
    </InformBox>
);

export const NoResult = ({ text }) => (
    <InformBox>
        { text && <span> { text } </span> }
        { !text && <span>결과 없음</span> }
    </InformBox>
);

export const Fail = ({ text }) => (
    <InformBox>
        { text && <span> { text } </span> }
        { !text && <span>조회 실패</span> }
    </InformBox>
);