import React from 'react';
import { module } from '../../themes/module';
import { Inform, RegisterWrap } from './RegisterStyle';
import { useForm } from 'react-hook-form';
import { isMobile, isBrowser } from 'react-device-detect';
import { useDispatch } from 'react-redux/es/exports';
import { activateAlert } from '../../store/actions/alert';
import { REGEXP } from '../../sheme/form';

const Register = ({
    user, 
    onFormSubmit
}) => {

    const dispatch = useDispatch();
    
    const { register, handleSubmit, formState: { errors } } = useForm({ 
        mode: "onSubmit", 
        reValidateMode: "onSubmit",
        defaultValues: {
            uName: user.uName || "",
            uEmail: user.uEmail || "",
            uTel: user.uTel || "",
        }
    });

    /* === 필수입력값 처리 === */
    const sumErrors = errors => {

        const FORM_ERROR = { 
            c: {
                count: 0,
                alert: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다",
            },
            u: {
                count: 0,
                alert: "의뢰인 정보를 모두 입력 시 매물 접수가 가능합니다.",
            },
            r: {
                count: 0,
                alert: "필수대행비용 정책에 동의 시 매물 접수가 가능합니다.",
            }
        };

        for(const errorType in errors) {
            switch(errorType[0]) {
                case "c" : 
                    FORM_ERROR["c"].count++;
                    break;
                case "u" :
                    FORM_ERROR["u"].count++;
                    if(errorType === "uEmail") FORM_ERROR["u"].alert += "\n - 이메일 정보를 정확히 입력해 주세요."
                    if(errorType === "uTel") FORM_ERROR["u"].alert += "\n - 휴대폰 번호를 정확히 입력해 주세요."
                    break;
                case "r" : 
                    FORM_ERROR["r"].count++;
                    break;
                default: 
                    break;
            }
        }

        return FORM_ERROR;
    }

    const handleErrors = (errorTypes) => {
        console.log(errorTypes);
        for(let key in errorTypes) {;
            if(errorTypes[key].count > 0) {
                dispatch(activateAlert({
                    title: "매물 접수", 
                    contents: errorTypes[key].alert
                }))
            }
        }
    };

    
    if(errors) handleErrors(sumErrors(errors));

    return (
        <>
            {
                isBrowser && 
                <RegisterWrap>
                    <module.TableForm onSubmit={ handleSubmit(onFormSubmit) }>
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
                                        <label htmlFor="uName">이름</label>
                                    </th>
                                    <td colSpan="3">
                                        <input type="text" name="uName" id="uName" {...register("uName", { required: true })}/> 
                                    </td>
                                </tr>
                                <tr>
                                        <th>
                                            <label htmlFor="cName">요양시설 이름</label>
                                        </th>
                                        <td colSpan="3">
                                            <input type="text" name="cName" id="cName" {...register("cName", { required: true })}/> 
                                        </td>
                                </tr>
                                <tr>
                                        <th>
                                            <label htmlFor="cAddr">요양시설 주소</label>
                                        </th>
                                        <td colSpan="3">
                                            <input type="text" name="cAddr" id="cAddr" {...register("cAddr", { required: true })}/> 
                                        </td>
                                </tr>
                                <tr>
                                        <th colSpan="1">
                                            <label htmlFor="uTel">연락처</label>
                                        </th>
                                        <td colSpan="1">
                                            <input type="text" name="uTel" id="uTel" {...register("uTel", { required: true, pattern: REGEXP.phone })}/> 
                                        </td>
                                        <th colSpan="1">
                                            <label htmlFor="uEmail">이메일</label>
                                        </th>
                                        <td colSpan="1">
                                            <input type="text" name="uEmail" id="uEmail" {...register("uEmail", { required: true, pattern: REGEXP.email })}/> 
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
                                    <th><label htmlFor="cSigun">시/군</label></th>
                                    <td>
                                        <select name="cSigun" id="cSigun" {...register("cSido", { required: true })}>
                                            <option value="서울시">서울시</option>
                                            <option value="부산시">부산시</option>
                                        </select>
                                    </td>
                                    <th><label htmlFor="cGugun">구/군</label></th>
                                    <td>
                                        <select name='cGugun' id="cGugun" {...register("cGugun", { required: true })}>
                                            <option value="강서구">강서구</option>
                                            <option value="강남구">강남구</option>
                                            <option value="강북구">강북구</option>
                                            <option value="강동구">강동구</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="cType">요양시설 유형</label></th>
                                    <td>
                                        <select name="cType" id="cType" {...register("cType", { required: true })}>
                                            <option value="단독요양원">단독요양원</option>
                                            <option value="상가요양원">상가요양원</option>
                                            <option value="주간보호">주야간보호센터</option>
                                        </select>
                                    </td>
                                    <th><label htmlFor="cSize">면적(m2)</label></th>
                                    <td>
                                        <input type="text" name="cSize" id="cSize" {...register("cSize", { required: true })}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="cPrice">매매가(보증금)</label></th>
                                    <td>
                                        <input type="text" name="cPrice" id="cPrice" {...register("cPrice", { required: true })}/> 
                                    </td>
                                    <th><label htmlFor="cRent">월세</label></th>
                                    <td>
                                        <input type="text" name="cRent" id="cRent" {...register("cRent", { required: true })}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="cCapcity">인가정원</label></th>
                                    <td>
                                        <input type="text" name="cCapacity" id="cCapacity" {...register("cCapacity", { required: true })}/> 
                                    </td>
                                    <th><label htmlFor="cPremium">권리금</label></th>
                                    <td>
                                        <input type="text" name="cPremium" id="cPremium" {...register("cPremiun", { required: true })}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="cPerson">현원</label></th>
                                    <td>
                                        <input type="text" name="cPerson" id="cPerson" {...register("cPerson", { required: true })}/> 
                                    </td>
                                    <th><label htmlFor="cDesc">소개내용</label></th>
                                    <td>
                                        <input type="text" name="cDesc" id="cDesc" {...register("cDesc", { required: true })}/> 
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
                                <input type="checkbox" id="cAgree"  {...register("rAgree", { required: true })}/>
                                <label htmlFor="cAgree">필수대행비용에 대해 동의합니다.</label>
                            </div>
                            <div className="policy">
                                보노랜드에서는 매도를 원하시는 고객님에게 ‘중개 · 컨설팅 수수료 0원’ 정책을 가지고 있습니다.
                                <br />
                                다만, 보노랜드에서 매수자 고객님을 발굴하여 계약체결 시 계약서 작성, 서류 준비 및 실거래 신고,
                                <br />
                                부동산 광도 등에 대한 ‘필수대행비용’으로 계약체결 시 최소한의 비용인 3백만원(부가세 별도)을 청구드리고 있습니다.
                            </div>
                        </Inform>
                        <button type="submit">
                            접수하기
                        </button>
                    </module.TableForm>
                </RegisterWrap>
            }
            {
                isMobile && 
                <RegisterWrap>
                    <module.MobileForm onSubmit={ handleSubmit(onFormSubmit) }>
                        <fieldset>
                            <legend>의뢰인 정보</legend>
                            <div className="wrap">
                                <label htmlFor="uName">이름</label>
                                <input type="text" name="uName" id="uName" {...register("uName", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="cCtName">요양시설 이름</label>
                                <input type="text" name="cCtName" id="cCtName" {...register("cName", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="cCtAddr">요양시설 주소</label>
                                <input type="text" name="cCtAddr" id="cCtAddr" {...register("cAddr", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="uTel">연락처</label>
                                <input type="text" name="uTel" id="uTel" {...register("uTel", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="uEmail">이메일</label>
                                <input type="text" name="uEmail" id="uEmail" {...register("uEmail", { required: true })}/> 
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend></legend>
                            <div className="wrap">
                                <label htmlFor="cSigun">시/군</label>
                                <select name="cSigun" id="cSigun" {...register("cSido", { required: true })}>
                                    <option value="서울시">서울시</option>
                                    <option value="부산시">부산시</option>
                                </select>
                            </div>
                            <div className="wrap">
                                <label htmlFor="cGugun">구/군</label>
                                <select name='cGugun' id="cGugun" {...register("cGugun", { required: true })}>
                                    <option value="강서구">강서구</option>
                                    <option value="강남구">강남구</option>
                                    <option value="강북구">강북구</option>
                                    <option value="강동구">강동구</option>
                                </select>
                            </div>
                            <div className="wrap">
                                <label htmlFor="cType">요양시설 유형</label>
                                <select name="cType" id="cType" {...register("cType", { required: true })}>
                                    <option value="단독요양원">단독요양원</option>
                                    <option value="상가요양원">상가요양원</option>
                                    <option value="주간보호">주야간보호센터</option>
                                </select>
                            </div>
                            <div className="wrap">
                                <label htmlFor="cSize">면적(m2)</label>
                                <input type="text" name="cSize" id="cSize" {...register("cSize", { required: true })}/>
                            </div>
                            <div className="wrap">
                                <label htmlFor="cPrice">매매가(보증금)</label>
                                <input type="text" name="cPrice" id="cPrice" {...register("cPrice", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="cRent">월세</label>
                                <input type="text" name="cRent" id="cRent" {...register("cRent", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="cCapcity">인가정원</label>
                                <input type="text" name="cCapacity" id="cCapacity" {...register("cCapacity", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="cPremium">권리금</label>
                                <input type="text" name="cPremium" id="cPremium" {...register("cPremiun", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="cPerson">현원</label>
                                <input type="text" name="cPerson" id="cPerson" {...register("cPerson", { required: true })}/> 
                            </div>
                            <div className="wrap">
                                <label htmlFor="cDesc">소개내용</label>
                                <input type="text" name="cDesc" id="cDesc" {...register("cDesc", { required: true })}/> 
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
                                <input type="checkbox" id="cAgree"  {...register("rAgree", { required: true })}/>
                                <label htmlFor="cAgree">필수대행비용에 대해 동의합니다.</label>
                            </div>
                            <div className="policy">
                                보노랜드에서는 매도를 원하시는 고객님에게 ‘중개 · 컨설팅 수수료 0원’ 정책을 가지고 있습니다.
                                <br />
                                다만, 보노랜드에서 매수자 고객님을 발굴하여 계약체결 시 계약서 작성, 서류 준비 및 실거래 신고,
                                <br />
                                부동산 광도 등에 대한 ‘필수대행비용’으로 계약체결 시 최소한의 비용인 3백만원(부가세 별도)을 청구드리고 있습니다.
                            </div>
                        </Inform>
                        <button type="submit">접수하기</button>
                    </module.MobileForm>
                </RegisterWrap>
            }

        </>


    )
};

export default Register;