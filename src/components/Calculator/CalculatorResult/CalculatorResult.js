import { CalcWrap, CalcForm, Caption } from "./CalculatorResultStyle";
import React from "react";
import { CALCULATOR_RESULT } from "../../../sheme/calculator";
import { isBrowser, isMobile } from 'react-device-detect';

const tableHead = () => (
    <tr>
        <th colSpan={ isBrowser? "2" : "1" }>구분</th>
        <th>인원</th>
        <th>단가</th>
        <th>금액</th>
        { isBrowser && <th>내용</th>}
    </tr>
);

const mobileColGroup = () => (
    <colgroup>
        <col width="82px"></col>
        <col width="auto"></col>
        <col width="auto"></col>
        <col width="auto"></col>
    </colgroup>
);

const CalculatorResult = ({ result, onFormReset }) => {
    return (
        <CalcWrap>
            <CalcForm>
                {
                    isBrowser &&
                    <table>
                        <colgroup>
                            <col width="160px"></col>
                            <col width="160px"></col>
                            <col width="100px"></col>
                            <col width="auto"></col>
                            <col width="auto"></col>
                            <col width="160px"></col>
                        </colgroup>
                        <thead>
                            { tableHead() }
                        </thead>
                        <tbody>
                                {
                                    CALCULATOR_RESULT["수입"].map((item, idx) => (
                                        <tr key={idx} className={ item.item === "합계" && "total" }>
                                            { idx === 0 && <td rowSpan={ CALCULATOR_RESULT["수입"].length }>1 수입</td> }
                                            <td>{ item.item }</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    ))
                                }
                                {
                                    CALCULATOR_RESULT["지출"].map((item, idx) => (
                                        <tr key={idx} className={ item.item === "합계" && "total" }>
                                            { idx === 0 && <td rowSpan={ CALCULATOR_RESULT["지출"].length }>2. 지출</td> }
                                            <td>{ item.item }</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    ))
                                }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td rowSpan="1">3. 월 수익</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                }
                {
                    isMobile &&
                    <>
                        <Caption>수입</Caption>
                        <table>
                            { mobileColGroup() }
                            { tableHead() }
                            <tbody>
                            {
                                CALCULATOR_RESULT["수입"].map((item, idx) => (
                                    <tr key={idx} className={ item.item === "합계" && "total" }>
                                        <td>{ item.item }</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <Caption>지출</Caption>
                        <table>
                            { mobileColGroup() }
                            { tableHead() }
                            <tbody>
                            {
                                CALCULATOR_RESULT["지출"].map((item, idx) => (
                                    <tr key={idx} className={ item.item === "합계" && "total" }>
                                        <td>{ item.item }</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>3. 월 수익</td>
                                    <td colSpan={3}></td>
                                </tr>
                            </tfoot>
                        </table>
                    </>
                }
                <button
                    onClick={ (event) => onFormReset(event) }
                >초기화</button>
            </CalcForm>
        </CalcWrap>
    )
};

export default CalculatorResult; 