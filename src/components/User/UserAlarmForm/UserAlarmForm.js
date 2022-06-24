import React, { useEffect, useState } from 'react';
import { isBrowser, isMobile } from 'react-device-detect';
import {
    AlarmWrap,
    AlarmForm, 
    Head,
    Body,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    CheckWrap,
    CheckBox,
} from './UserAlarmFormStyle';

const UserAlarmForm = ({ 
    dataset,
    onFormChange
}) => {

    const [ accordion, setAccordion ] = useState(false);
    const toggleAccordion = () => { setAccordion(!accordion); };

    const [ gyeonggiDo, setGyeonggiDo ] = useState(0);

    useEffect(() => {
        setGyeonggiDo(Object.keys(dataset["경기도"]).filter(key => dataset["경기도"][key].value === true).length);
    }, [dataset])


    return (
        <AlarmWrap>
            <AlarmForm>
                <Head>
                    <h2>지역 알림 설정</h2>
                    <p>
                    매물 관심 지역을 알림 설정하시면 해당 지역의 새로운 매물 정보를 알려드립니다.
                    </p>
                </Head>
                <hr/>
                <Body>
                    <form>
                        <Accordion>
                            <AccordionSummary active={ accordion }>
                                <CheckBox>
                                    <input 
                                        type="checkbox" 
                                        className={ gyeonggiDo > 0? "highlight" : "" } 
                                        name="aRegion" 
                                        id={"aRegion0"} 
                                        value="gyeonggiDo"
                                        readOnly 
                                    />
                                    <label htmlFor={"aRegion0"} onClick={ () => toggleAccordion() }>경기도</label>
                                </CheckBox>
                            </AccordionSummary>
                            <AccordionDetails active={ accordion }>
                                <fieldset>
                                {
                                    Object.keys(dataset["경기도"]).map((key, idx) => (
                                        <CheckWrap key={ idx }>
                                            <input 
                                                type="checkbox" 
                                                name="aRegion" 
                                                id={`aRegion0_${idx}`} 
                                                value={ dataset["경기도"][key].label } 
                                                checked={ dataset["경기도"][key].value } 
                                                onChange={ event => { onFormChange(["경기도", key]); } }
                                            />
                                            <label htmlFor={`aRegion0_${idx}`}>{ dataset["경기도"][key].label }</label>
                                        </CheckWrap>
                                    ))
                                }
                                </fieldset>
                            </AccordionDetails>
                        </Accordion>
                        <fieldset>
                            {
                                Object.keys(dataset).filter(key => key !== "경기도").map((key, idx) => (
                                    <CheckBox key={ idx }>
                                        <input 
                                            type="checkbox" 
                                            name="aRegion" 
                                            id={`aRegion${idx + 1}`} 
                                            value={ dataset[key].label }  
                                            checked={ dataset[key].value }  
                                            onChange={ event => { onFormChange([key]); } }   
                                        />
                                        <label htmlFor={`aRegion${idx + 1}`}>{ dataset[key].label }</label>
                                    </CheckBox>
                                ))
                            }
                        </fieldset>
                    </form>
                </Body>
            </AlarmForm>
        </AlarmWrap>
    )
};

export default UserAlarmForm;