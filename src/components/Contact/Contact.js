import React from 'react';
import { module } from '../../themes/module';
import { isMobile, isBrowser } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux/es/exports';
import { activateAlert } from '../../store/actions/alert';

const Contact = ({
    onFormSubmit
}) => {

    const dispatch = useDispatch();
    
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
    
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
                }
            };
    
            for(const errorType in errors) {
                switch(errorType[0]) {
                    case "c" : 
                        FORM_ERROR["c"].count++;
                        break;
                    case "u" :
                        FORM_ERROR["u"].count++;
                        break;
                    default: 
                        break;
                }
            }
    
            return FORM_ERROR;
        }
    
        const handleErrors = (errorTypes) => {
            for(let key in errorTypes) {;
                if(errorTypes[key].count > 0) {
                    dispatch(activateAlert({
                        title: "매수 문의", 
                        contents: errorTypes[key].alert
                    }))
                }
            }
        };
    
        
        if(errors) handleErrors(sumErrors(errors));


    return (
        <>
            {
                isBrowser&& 
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
                                <th colSpan="1">
                                    <label htmlFor="uTel">연락처</label>
                                </th>
                                <td colSpan="1">
                                    <input type="text" name="uTel" id="uTel" {...register("uTel", { required: true })}/> 
                                </td>
                                <th colSpan="1">
                                    <label htmlFor="uEmail">이메일</label>
                                </th>
                                <td colSpan="1">
                                    <input type="text" name="uEmail" id="uEmail" {...register("uEamil", { required: true })}/> 
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
                                    <select name="cSigun" id="cSido" {...register("cSido", { required: true })}>
                                        <option value="" disabled>지역 선택</option>
                                    </select>
                                </td>
                                <th><label htmlFor="cGugun">구/군</label></th>
                                <td>
                                    <select name='cGugun' id="cGugun" {...register("cGugun", { required: true })}>
                                        <option value="" disabled>세부지역 선택</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor="cType">시설 분류</label></th>
                                <td>
                                    <select name="cType" id="cType" {...register("cType", { required: true })}>
                                        <option value="" disabled>유형 선택</option>
                                    </select>
                                </td>
                                <th><label htmlFor="cContact">문의 구분</label></th>
                                <td>
                                    <select name="cContact" id="cContact" {...register("cContact", { required: true })}>
                                        <option value="" disabled>선택해주세요</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor="cAssets">예상 자본금</label></th>
                                <td colSpan="3">
                                    <input type="text" name="cAssets" id="cAssets" {...register("cAssets", { required: true })}/> 
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor="cContents">요청 내용</label></th>
                                <td colSpan="3">
                                    <textarea name="cContents" id="cContents" {...register("cContents", { required: true })}></textarea> 
                                </td>
                            </tr>
                        </table>
                    </fieldset>
                    <button type="submit">
                        접수하기
                    </button>
                </module.TableForm>
            }
            {
                isMobile && 
                <module.MobileForm onSubmit={ handleSubmit(onFormSubmit) }>
                    <fieldset>
                        <legend>의뢰인 정보</legend>
                        <div className="wrap">
                            <label htmlFor="uName">이름</label>
                            <input type="text" name="uName" id="uName" {...register("uName", { required: true })}/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="uTel">연락처</label>
                            <input type="text" name="uTel" id="uTel" {...register("uTel", { required: true })}/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="uEmail">이메일</label>
                            <input type="text" name="uEmail" id="uEmail" {...register("uEamil", { required: true })}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>요양시설 정보</legend>
                        <div className="wrap">
                            <label htmlFor="cSigun">시/도</label>
                            <select name="cSigun" id="cSigun" {...register("cSido", { required: true })}>
                                <option value="" disabled>지역 선택</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cGugun">구/군</label>
                            <select name='cGugun' id="cGugun" {...register("cGugun", { required: true })}>
                                <option value="" disabled>세부지역 선택</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cType">시설 분류</label>
                            <select name="cType" id="cType" {...register("cType", { required: true })}>
                                <option value="" disabled>유형 선택</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cContact">문의 구분</label>
                            <select name="cContact" id="cContact" {...register("cContact", { required: true })}>
                                <option value="" disabled>선택해주세요</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cAssets">예상 자본금</label>
                            <input type="text" name="cAssets" id="cAssets" {...register("cAssets", { required: true })}/> 
                        </div>
                        <div className="wrap">
                            <label htmlFor="cContents">요청 내용</label>
                            <textarea name="cContents" id="cContents" {...register("cContents", { required: true })}></textarea> 
                        </div>
                    </fieldset>
                    <button type="submit">
                        접수하기
                    </button>
                </module.MobileForm>
            }
        </>
    )
};

export default Contact;