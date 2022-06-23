import React from 'react';
import { Wrapper, Inform, Actions } from './FindIdFailedStyle';

const FindIdFailed = ({
    findText
}) => (
    <Wrapper>
        <Inform>
            <h2>계정찾기 실패</h2>
            <p>해당 번호로 가입된 계정이 없습니다.</p>
        </Inform>
        <Actions>
            <button className="btn" type="button">로그인</button>
            <button className="btn acc" type="button">회원가입</button>
            { findText && <button className="link">{ findText }</button>}
        </Actions>
    </Wrapper>
)

export default FindIdFailed;