import React, { useState, useEffect } from 'react';
import { module } from '../../themes/module';
import { isMobile, isBrowser } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import { REGEXP } from '../../scheme/form';
import { LOCATION } from '../../scheme/location';
import { CONTACT_TYPES, CENTER_TYPES } from '../../scheme/contact';

const Contact = ({
    user,
    center,
    onFormSubmit
}) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ 
        mode: "onSubmit", 
        reValidateMode: "onChange",
        defaultValues: {
            uName: user.uName || "",
            uEmail: user.uEmail || "",
            uTel: user.uTel || "",
            cSido: center? center.sido : Object.keys(LOCATION)[0], 
            cGugun: center? center.gugun : LOCATION[Object.keys(LOCATION)[0]][0],
            cType: center? CENTER_TYPES.filter(item => item.label === center.type)[0].value : CENTER_TYPES[0].value
        }
    });

    const formWatching = watch();

    const submitAble = formValues => {
        return (
            Object.keys(formWatching).filter(key => 
                formWatching[key].length <= 0
            ).length <= 0
        )
    };

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
                                    <input 
                                        type="text" 
                                        name="uName" 
                                        id="uName" 
                                        {...register("uName", {
                                            required: { value: true, message: "의뢰인 정보를 모두 입력 시 매물 접수가 가능합니다." } 
                                        })}
                                    /> 
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="1">
                                    <label htmlFor="uTel">연락처</label>
                                </th>
                                <td colSpan="1">
                                    <input 
                                        type="text" 
                                        name="uTel" 
                                        id="uTel" 
                                        {...register("uTel", { 
                                            required: { value: true, message: "의뢰인 정보를 모두 입력 시 매물 접수가 가능합니다." }, 
                                            pattern: { value: REGEXP.phone, message: '휴대폰 번호를 정확히 입력해 주세요.'} 
                                        })}
                                    /> 
                                </td>
                                <th colSpan="1">
                                    <label htmlFor="uEmail">이메일</label>
                                </th>
                                <td colSpan="1">
                                    <input 
                                        type="text" 
                                        name="uEmail" 
                                        id="uEmail" 
                                        {...register("uEmail",{ 
                                            required: { value: true, message: "의뢰인 정보를 모두 입력 시 매물 접수가 가능합니다." }, 
                                            pattern: { value: REGEXP.email, message: '이메일 주소를 정확히 입력해 주세요.'} 
                                        })}
                                    /> 
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
                                <th><label htmlFor="cSido">시/군</label></th>
                                <td>
                                    <select 
                                        name="cSido" 
                                        id="cSido" 
                                        {...register("cSido", { 
                                            required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                        })}
                                    >
                                    {                                        
                                        Object.keys(LOCATION).map(sido => (
                                            <option key={sido} value={sido}>{sido}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                                <th><label htmlFor="cGugun">구/군</label></th>
                                <td>
                                    <select 
                                        name='cGugun' 
                                        id="cGugun" 
                                        {...register("cGugun", {
                                            required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                        })}
                                    >
                                    {                                     
                                        LOCATION[formWatching["cSido"]].map(gugun => (
                                            <option key={gugun} value={gugun}>{gugun}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor="cType">시설 분류</label></th>
                                <td>
                                    <select 
                                        name="cType" 
                                        id="cType" 
                                        {...register("cType", { 
                                            required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                        })}
                                    >
                                    {
                                        CENTER_TYPES.map((item, idx) => (
                                            <option key={idx} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                                <th><label htmlFor="cContact">문의 구분</label></th>
                                <td>
                                    <select 
                                        name="cContact" 
                                        id="cContact" 
                                        {...register("cContact", {
                                            required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                        })}
                                    >
                                    {
                                        CONTACT_TYPES.map((item, idx) => (
                                            <option key={idx} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor="cAssets">예상 자본금</label></th>
                                <td colSpan="3">
                                    <input 
                                        type="text" 
                                        name="cAssets" 
                                        id="cAssets" 
                                        {...register("cAssets", { 
                                            required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                        })}
                                    /> 
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor="cContents">요청 내용</label></th>
                                <td colSpan="3">
                                    <textarea 
                                        name="cContents" 
                                        id="cContents" 
                                        {...register("cContents", {
                                            required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                        })}
                                    ></textarea> 
                                </td>
                            </tr>
                        </table>
                    </fieldset>
                    {
                        Object.keys(errors).length > 0 &&
                        <span className="warn">{ errors[Object.keys(errors)[0]].message }</span>
                    }
                    <button 
                        type="submit"
                        className={ submitAble(formWatching)? "" : "disabled" }
                    >접수하기</button>
                </module.TableForm>
            }
            {
                isMobile && 
                <module.MobileForm onSubmit={ handleSubmit(onFormSubmit) }>
                    <fieldset>
                        <legend>의뢰인 정보</legend>
                        <div className="wrap">
                            <label htmlFor="uName">이름</label>
                            <input 
                                type="text" 
                                name="uName" 
                                id="uName" 
                                {...register("uName", {
                                    required: { value: true, message: "의뢰인 정보를 모두 입력 시 매물 접수가 가능합니다." } 
                                })}
                            />                         
                        </div>
                        <div className="wrap">
                            <label htmlFor="uTel">연락처</label>
                            <input 
                                type="text" 
                                name="uTel" 
                                id="uTel" 
                                {...register("uTel", { 
                                    required: { value: true, message: "의뢰인 정보를 모두 입력 시 매물 접수가 가능합니다." }, 
                                    pattern: { value: REGEXP.phone, message: '휴대폰 번호를 정확히 입력해 주세요.'} 
                                })}
                            />                         
                        </div>
                        <div className="wrap">
                            <label htmlFor="uEmail">이메일</label>
                            <input 
                                type="text" 
                                name="uEmail" 
                                id="uEmail" 
                                {...register("uEmail",{ 
                                    required: { value: true, message: "의뢰인 정보를 모두 입력 시 매물 접수가 가능합니다." }, 
                                    pattern: { value: REGEXP.email, message: '이메일 주소를 정확히 입력해 주세요.'} 
                                })}
                            />                         
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>요양시설 정보</legend>
                        <div className="wrap">
                            <label htmlFor="cSigun">시/도</label>
                            <select 
                                name="cSido" 
                                id="cSido" 
                                {...register("cSido", { 
                                    required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                })}
                            >
                            {                                        
                                Object.keys(LOCATION).map(sido => (
                                    <option key={sido} value={sido}>{sido}</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cGugun">구/군</label>
                            <select 
                                name='cGugun' 
                                id="cGugun" 
                                {...register("cGugun", {
                                    required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                })}
                            >
                            {                                     
                                LOCATION[formWatching["cSido"]].map(gugun => (
                                    <option key={gugun} value={gugun}>{gugun}</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cType">시설 분류</label>
                            <select 
                                name="cType" 
                                id="cType" 
                                {...register("cType", { 
                                    required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                })}
                            >
                            {
                                CENTER_TYPES.map((item, idx) => (
                                    <option key={idx} value={item.value}>{item.label}</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cContact">문의 구분</label>
                            <select 
                                name="cContact" 
                                id="cContact" 
                                {...register("cContact", {
                                    required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                })}
                            >
                            {
                                CONTACT_TYPES.map((item, idx) => (
                                    <option key={idx} value={item.value}>{item.label}</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className="wrap">
                            <label htmlFor="cAssets">예상 자본금</label>
                            <input 
                                type="text" 
                                name="cAssets" 
                                id="cAssets" 
                                {...register("cAssets", { 
                                    required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                })}
                            />                         
                        </div>
                        <div className="wrap">
                            <label htmlFor="cContents">요청 내용</label>
                            <textarea 
                                name="cContents" 
                                id="cContents" 
                                {...register("cContents", {
                                    required: { value: true, message: "요양시설 정보를 모두 입력 시 매물 접수가 가능합니다" } 
                                })}
                            ></textarea>                         
                        </div>
                    </fieldset>
                    {
                        Object.keys(errors).length > 0 && alert(errors[Object.keys(errors)[0]].message)
                    }
                    <button 
                        type="submit"
                        className={ submitAble(formWatching)? "" : "disabled" }
                    >접수하기</button>
                </module.MobileForm>
            }
        </>
    )
};

export default Contact;