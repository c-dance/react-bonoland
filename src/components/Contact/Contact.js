import React, { useContext } from 'react';
import { LayoutContext } from '../../hooks/layout';
import { module } from '../../themes/module';

const Contact = ({
    onFormSubmit
}) => {

    const MOBILE_DEVICE = useContext(LayoutContext) === 'mobile';

    return (
        <>
            {
                MOBILE_DEVICE && 
                <module.MobileForm onSubmit={ event => onFormSubmit(event) }>
                    <fieldset>
                        <legend>의뢰인 정보</legend>
                        <div className="wrap">
                            <label htmlFor="rgName">이름</label>
                            <input type="text" name="rgName" id="rgName"/> 
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
                        <legend>요양시설 정보</legend>
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
                            <label htmlFor="rgCtType">시설 분류</label>
                            <select name="rgCtType" id="rgCtType">
                                <option value="" selected disabled>유형 선택</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgType">문의 구분</label>
                            <select name="rgType" id="rgType">
                                <option value="" selected disabled>선택해주세요</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgAssets">예상 자본금</label>
                            <input type="text" name="rgAssets" id="rgAssets"/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="rgContents">요청 내용</label>
                            <textarea name="rgContents" id="rgContents"></textarea> 
                        </div>
                    </fieldset>
                    <button type="submit">
                        접수하기
                    </button>
                </module.MobileForm>
            }
            {
                !MOBILE_DEVICE && 
                <module.TableForm onSubmit={ event => onFormSubmit(event) }>
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
                                <th><label htmlFor="rgCtType">시설 분류</label></th>
                                <td>
                                    <select name="rgCtType" id="rgCtType">
                                        <option value="" selected disabled>유형 선택</option>
                                    </select>
                                </td>
                                <th><label htmlFor="rgType">문의 구분</label></th>
                                <td>
                                    <select name="rgType" id="rgType">
                                        <option value="" selected disabled>선택해주세요</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor="rgAssets">예상 자본금</label></th>
                                <td colSpan="3">
                                    <input type="text" name="rgAssets" id="rgAssets"/> 
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor="rgContents">요청 내용</label></th>
                                <td colSpan="3">
                                    <textarea name="rgContents" id="rgContents"></textarea> 
                                </td>
                            </tr>
                        </table>
                    </fieldset>
                    <button type="submit">
                        접수하기
                    </button>
                </module.TableForm>
            }
        </>
    )
};

export default Contact;