import { CalcForm } from "./CalculatorResultStyle";

const CalculatorResult = ({ result, onFormReset }) => {
    return (
       <CalcForm>
           <table>
            <colgroup>
                <col width="160px"></col>
                <col width="auto"></col>
                <col width="100px"></col>
                <col width="auto"></col>
                <col width="auto"></col>
                <col width="160px"></col>
            </colgroup>
               <thead>
                   <tr>
                       <th colSpan="2">구분</th>
                       <th>인원</th>
                       <th>단가</th>
                       <th>금액</th>
                       <th>내용</th>
                   </tr>
               </thead>
               <tbody>
                   <tr className="total">
                       <td rowSpan="7">1. 수입</td>
                       <td>합계</td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                   </tr>
                   <tr>
                       <td>공단지원금 80%</td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                   </tr>
                   <tr></tr>
                   <tr></tr>
                   <tr></tr>
                   <tr></tr>
                   <tr></tr>
                   <tr className="total">
                       <td rowSpan="7">2. 지출</td>
                       <td>합계</td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                   </tr>
                   <tr className="cost">
                       <td>인건비</td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                   </tr>
                   <tr></tr>
                   <tr></tr>
                   <tr></tr>
                   <tr></tr>
                   <tr></tr>
               </tbody>
               <tfoot>
                   <tr>
                       <td>3.월수익</td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                   </tr>
               </tfoot>
           </table>
           <button
            onClick={ (event) => onFormReset(event) }
           >초기화</button>
       </CalcForm>
    )
};

export default CalculatorResult;