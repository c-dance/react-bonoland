import { useContext } from 'react';
import { LayoutContext } from '../../hooks/layout';
import { module } from '../../themes/module';

const Register = ({
    
}) => {

    const MOBILE_DEVICE = useContext(LayoutContext) === 'mobile';
    
    return (
        <>
            {
                MOBILE_DEVICE && <module.MobileForm>
                    <fieldset>
                        <legend>의뢰인 정보</legend>
                        <div className="wrap">
                            <label htmlFor="rgName">이름</label>
                            <input type="text" name="rgName" id="rgName"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgCtName">요양시설 이름</label>
                            <input type="text" name="rgCtName" id="rgCtName"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgCtAddr">요양시설 주소</label>
                            <input type="text" name="rgCtAddr" id="rgCtAddr"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgTel">연락처</label>
                            <input type="text" name="rgTel" id="rgTel"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgEmail">이메일</label>
                            <input type="text" name="rgEmail" id="rgEmail"/> 
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend></legend>
                        <div className="wrap">
                            <label htmlFor="rgSigun">시/군</label>
                            <select name="rgSigun" id="rgSigun">
                                <option value="" selected disabled>지역 선택</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgGugun">구/군</label>
                            <select name='rgGugun' id="rgGugun">
                                <option value="" selected disabled>세부지역 선택</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgCtType">요양시설 유형</label>
                            <select name="rgCtType" id="rgCtType">
                                <option value="" selected disabled>유형 선택</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgSize">면적(m2)</label>
                            <input type="text" name="rgSize" id="rgSize"/>
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgPrice">매매가(보증금)</label>
                            <input type="text" name="rgPrice" id="rgPrice"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgRent">월세</label>
                            <input type="text" name="rgRent" id="rgRent"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgCapcity">인가정원</label>
                            <input type="text" name="rgCapacity" id="rgCapacity"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgPremium">권리금</label>
                            <input type="text" name="rgPremium" id="rgPremium"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgPerson">현원</label>
                            <input type="text" name="rgPerson" id="rgPerson"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgDesc">소개내용</label>
                            <input type="text" name="rgDesc" id="rgDesc"/> 
                        </div>
                    </fieldset>
                    <button>접수하기</button>
                </module.MobileForm>
            }
            {
                !MOBILE_DEVICE && <module.TableForm>
                    <fieldset>
                        <legend>의뢰인 정보</legend>
                        <table>
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                        </colgroup>
                            <tr>
                                    <th>
                                        <label htmlFor="rgName">이름</label>
                                    </th>
                                    <td colSpan="3">
                                        <input type="text" name="rgName" id="rgName"/> 
                                    </td>
                            </tr>
                            <tr>
                                    <th>
                                        <label htmlFor="rgCtName">요양시설 이름</label>
                                    </th>
                                    <td colSpan="3">
                                        <input type="text" name="rgCtName" id="rgCtName"/> 
                                    </td>
                            </tr>
                            <tr>
                                    <th>
                                        <label htmlFor="rgCtAddr">요양시설 주소</label>
                                    </th>
                                    <td colSpan="3">
                                        <input type="text" name="rgCtAddr" id="rgCtAddr"/> 
                                    </td>
                            </tr>
                            <tr>
                                    <th colSpan="1">
                                        <label htmlFor="rgTel">연락처</label>
                                    </th>
                                    <td colSpan="1">
                                        <input type="text" name="rgTel" id="rgTel"/> 
                                    </td>
                                    <th colSpan="1">
                                        <label htmlFor="rgEmail">이메일</label>
                                    </th>
                                    <td colSpan="1">
                                        <input type="text" name="rgEmail" id="rgEmail"/> 
                                    </td>
                            </tr>
                        </table>
                    </fieldset>
                    <fieldset>
                        <legend>요양시설 정보</legend>
                        <table>
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                        </colgroup>
                            <tr>
                                    <th><label htmlFor="rgSigun">시/군</label></th>
                                    <td>
                                        <select name="rgSigun" id="rgSigun">
                                            <option value="" selected disabled>지역 선택</option>
                                        </select>
                                    </td>
                                    <th><label htmlFor="rgGugun">구/군</label></th>
                                    <td>
                                        <select name='rgGugun' id="rgGugun">
                                            <option value="" selected disabled>세부지역 선택</option>
                                        </select>
                                    </td>
                            </tr>
                            <tr>
                                    <th><label htmlFor="rgCtType">요양시설 유형</label></th>
                                    <td>
                                        <select name="rgCtType" id="rgCtType">
                                            <option value="" selected disabled>유형 선택</option>
                                        </select>
                                    </td>
                                    <th><label htmlFor="rgSize">면적(m2)</label></th>
                                    <td>
                                        <input type="text" name="rgSize" id="rgSize"/> 
                                    </td>
                            </tr>
                            <tr>
                                    <th><label htmlFor="rgPrice">매매가(보증금)</label></th>
                                    <td>
                                        <input type="text" name="rgPrice" id="rgPrice"/> 
                                    </td>
                                    <th><label htmlFor="rgRent">월세</label></th>
                                    <td>
                                        <input type="text" name="rgRent" id="rgRent"/> 
                                    </td>
                            </tr>
                            <tr>
                                    <th><label htmlFor="rgCapcity">인가정원</label></th>
                                    <td>
                                        <input type="text" name="rgCapacity" id="rgCapacity"/> 
                                    </td>
                                    <th><label htmlFor="rgPremium">권리금</label></th>
                                    <td>
                                        <input type="text" name="rgPremium" id="rgPremium"/> 
                                    </td>
                            </tr>
                            <tr>
                                    <th><label htmlFor="rgPerson">현원</label></th>
                                    <td>
                                        <input type="text" name="rgPerson" id="rgPerson"/> 
                                    </td>
                                    <th><label htmlFor="rgDesc">소개내용</label></th>
                                    <td>
                                        <input type="text" name="rgDesc" id="rgDesc"/> 
                                    </td>
                            </tr>
                        </table>
                    </fieldset>
                    <button>
                        접수하기
                    </button>
                </module.TableForm>
            }
        </>


    )
};

export default Register;