import React, { useContext } from 'react';
import { LayoutContext } from '../../hooks/layout';
import { module } from '../../themes/module';
import { Inform, RegisterWrap } from './RegisterStyle';

const Register = ({
    onFormSubmit
}) => {

    const MOBILE_DEVICE = useContext(LayoutContext) === 'mobile';
    
    return (
        <>
            {
                MOBILE_DEVICE && 
                <RegisterWrap>
                    <module.MobileForm onSubmit={ event => onFormSubmit(event) }>
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
                        <Inform>
                            <div className="inform">
                                <strong>
                                    #보노랜드에서 알려드립니다.
                                </strong>
                                <p>
                                    보노랜드는 고객님의 프라이버시 및 비밀 엄수를 위해 접수하신 매물의 위치가 '시 단위’ 또는 '구 단위’ 까지만 보노랜드 플랫폼에 표현되며 상세 정보는 공개되지 않습니다.
                                    <br />
                                    보노랜드는 매물 보호를 위해 ‘매수 희망 고객님’에게 유선 및 회사 방문 상담으로만 정보를 공개합니다.
                                </p>
                            </div>
                            <div className="agree">
                                <input type="checkbox" id="rgAgree" />
                                <label htmlFor="rgAgree">필수대행비용에 대해 동의합니다.</label>
                            </div>
                            <div className="policy">
                                보노랜드에서는 매도를 원하시는 고객님에게 ‘중개 · 컨설팅 수수료 0원’ 정책을 가지고 있습니다.
                                <br />
                                다만, 보노랜드에서 매수자 고객님을 발굴하여 계약체결 시 계약서 작성, 서류 준비 및 실거래 신고,
                                <br />
                                부동산 광도 등에 대한 ‘필수대행비용’으로 계약체결 시 최소한의 비용인 3백만원(부가세 별도)을 청구드리고 있습니다.
                            </div>
                        </Inform>
                        <button>접수하기</button>
                    </module.MobileForm>
                </RegisterWrap>
            }
            {
                !MOBILE_DEVICE && 
                <RegisterWrap>
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
                        <Inform>
                            <div className="inform">
                                <strong>
                                    #보노랜드에서 알려드립니다.
                                </strong>
                                <p>
                                    보노랜드는 고객님의 프라이버시 및 비밀 엄수를 위해 접수하신 매물의 위치가 '시 단위’ 또는 '구 단위’ 까지만 보노랜드 플랫폼에 표현되며 상세 정보는 공개되지 않습니다.
                                    <br />
                                    보노랜드는 매물 보호를 위해 ‘매수 희망 고객님’에게 유선 및 회사 방문 상담으로만 정보를 공개합니다.
                                </p>
                            </div>
                            <div className="agree">
                                <input type="checkbox" id="rgAgree" />
                                <label htmlFor="rgAgree">필수대행비용에 대해 동의합니다.</label>
                            </div>
                            <div className="policy">
                                보노랜드에서는 매도를 원하시는 고객님에게 ‘중개 · 컨설팅 수수료 0원’ 정책을 가지고 있습니다.
                                <br />
                                다만, 보노랜드에서 매수자 고객님을 발굴하여 계약체결 시 계약서 작성, 서류 준비 및 실거래 신고,
                                <br />
                                부동산 광도 등에 대한 ‘필수대행비용’으로 계약체결 시 최소한의 비용인 3백만원(부가세 별도)을 청구드리고 있습니다.
                            </div>
                        </Inform>
                        <button>
                            접수하기
                        </button>
                    </module.TableForm>
                </RegisterWrap>
            }
        </>


    )
};

export default Register;