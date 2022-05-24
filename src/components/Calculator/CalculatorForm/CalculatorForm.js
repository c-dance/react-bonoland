import { Form } from './CalculatorFormStyle';
import { module } from '../../../themes/module';

const CalculatorForm = ({ onFormSubmit }) => {
    return (
        <Form onSubmit={ (event) => onFormSubmit(event) }>
            <fieldset>
                <legend>예상 수익 계산</legend>
                <table>
                    <colgroup>
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th><label htmlFor="clType">1. 요양시설 타입</label></th>
                            <th><label htmlFor="clCap01">2. 정원수</label></th>
                            <th><label htmlFor="clCap02">3. 현원수(일반병실)</label></th>
                            <th><label htmlFor="clCap03">4. 현원수(상급병실)</label></th>
                            <th><label htmlFor="clCost">5. 상급병실료(원/월)</label></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select name="clType" id="clType">
                                    <option value="" selected></option>
                                </select>
                            </td>
                            <td><input type="text" name="clCap01" id="clCap01" placeholder="0" /></td>
                            <td><input type="text" name="clCap02" id="clCap02" placeholder="0"  /></td>
                            <td><input type="text" name="clCap03" id="clCap03"  placeholder="0" /></td>
                            <td><input type="text" name="clCost" id="clCost" placeholder="0"  /></td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <colgroup>
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th><label htmlFor="clHelper">6. 추가 요양보호사</label></th>
                            <th><label htmlFor="clCook">7. 조리원 유무</label></th>
                            <th><label htmlFor="clPremium">8. 예상 가산금(원/월)</label></th>
                            <th><label htmlFor="clLoan">9. 대출금</label></th>
                            <th><label htmlFor="clLevel">10. 급수 선택</label></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="clHelper" id="clHelper" placeholder="0" /></td>
                            <td>
                                <select name="clCook" id="clCook">
                                    <option value="0" selected>무</option>
                                    <option value="1"></option>
                                </select>
                            </td>
                            <td><input type="text" name="clPremium" id="clPremium" placeholder="0"  /></td>
                            <td><input type="text" name="clLoan" id="clLoan"  placeholder="0" /></td>
                            <td><input type="text" name="clLevel" id="clLevel" placeholder="0"  /></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
            <module.SubmitButton>계산하기</module.SubmitButton>
        </Form>
    )
};

export default CalculatorForm;