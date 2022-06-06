import { InformBox } from "./InformStyled";
import React from "react";


export const Loading = (text = null) => (
    <InformBox>
        { text && <span> { text } </span> }
        { !text && <span>로딩 중</span> }
    </InformBox>
);

export const NoData = (text = null) => (
    <InformBox>
        { text && <span> { text } </span> }
        { !text && <span>결과 없음</span> }
    </InformBox>
);

export const Error = (text = null) => (
    <InformBox>
        { text && <span> { text } </span> }
        { !text && <span>조회 실패</span> }
    </InformBox>
);