import { CalcWrap, CalcForm, Caption, CalcHeader } from "./CalculatorResultStyle";
import React from "react";
import { INCOME_RESULT } from "../../../scheme/calculator";
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

    return (
        <CalcForm>
        {   isBrowser &&   
            <CalcHeader>
                <span>2022년, 2등급 , 월 30일 기준</span>
                <span className="title">단독요양원(20인)시설</span>
                <span>※매매가 22억원 기준</span>
            </CalcHeader>
        }
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
                            <tr key={idx} className={ item.title === "합계"? "total" : item.title.includes("인건비")? "cost" : "" }>
                                { idx === 0 && <td rowSpan={ Object.keys(result["수입"]).length }>1 수입</td> }
                                <td>{item.title}</td>
                                <td>{item.capacity}</td>
                                <td>{item.unitPrice}</td>
                                <td>{item.totalPrice}</td>
                                <td className="memo">{item.memo && item.memo}</td>
                            </tr>
                        )
                    })
                }
                {
                    Object.keys(result["지출"]).map((key, idx) => {
                        const item = result["지출"][key];
                        return (
                            <tr key={idx} className={ item.title === "합계"? "total" : item.title.includes("인건비")? "cost" : "" }>
                                { idx === 0 && <td rowSpan={ Object.keys(result["지출"]).length }>2. 지출</td> }
                                <td>{item.title}</td>
                                <td>{item.capacity}</td>
                                <td>{item.unitPrice}</td>
                                <td>{item.totalPrice}</td>
                                <td className="memo">{item.memo && item.memo}</td>
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
                        Object.keys(result["수입"]).map((key, idx) => {
                            const item = result["수입"][key];
                            return (
                                <tr key={idx} className={ item.title === "합계"? "total" : item.title.includes("인건비")? "cost" : "" }>
                                    <td>{item.title}</td>
                                    <td>{item.capacity}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.totalPrice}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <Caption>지출</Caption>
                <table>
                    { mobileColGroup() }
                    { tableHead() }
                    <tbody>
                    {
                        Object.keys(result["지출"]).map((key, idx) => {
                            const item = result["지출"][key];
                            return (
                                <tr key={idx} className={ item.title === "합계"? "total" : item.title.includes("인건비")? "cost" : "" }>
                                    <td>{item.title}</td>
                                    <td>{item.capacity}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.totalPrice}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>월 수익</td>
                            <td colSpan={3}>{result["월수익"].totalPrice} 원</td>
                        </tr>
                    </tfoot>
                </table>
            </>
        }
        </CalcForm>
    )
};

export default CalculatorResult; 