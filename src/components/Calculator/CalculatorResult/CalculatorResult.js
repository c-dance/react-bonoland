import { CalcWrap, CalcForm, Caption } from "./CalculatorResultStyle";
import React from "react";
import { INCOME_RESULT } from "../../../sheme/calculator";
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

const CalculatorResult = ({ result }) => {

    console.log(result);

    return (
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
                                    Object.keys(result["수입"]).map((key, idx) => {
                                        const item = result["수입"][key];
                                        return (
                                            <tr key={idx} className={ item.title === "합계"? "total" : "" }>
                                                { idx === 0 && <td rowSpan={ Object.keys(result["수입"]).length }>1 수입</td> }
                                                <td>{item.title}</td>
                                                <td>{item.capacity}</td>
                                                <td>{item.unitPrice}</td>
                                                <td>{item.totalPrice}</td>
                                                <td>{item.contents && item.contents}</td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    Object.keys(result["지출"]).map((key, idx) => {
                                        const item = result["지출"][key];
                                        return (
                                            <tr key={idx} className={ item.title === "합계"? "total" : "" }>
                                                { idx === 0 && <td rowSpan={ Object.keys(result["지출"]).length }>2. 지출</td> }
                                                <td>{item.title}</td>
                                                <td>{item.capacity}</td>
                                                <td>{item.unitPrice}</td>
                                                <td>{item.totalPrice}</td>
                                                <td>{item.contents && item.contents}</td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td rowSpan="1" className="total">3. 월 수익</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{result["월수익"].totalPrice}</td>
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
                                INCOME_RESULT["수입"].map((item, idx) => (
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
                                INCOME_RESULT["지출"].map((item, idx) => (
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
        </CalcForm>
    )
};

export default CalculatorResult; 