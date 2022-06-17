import React, { useEffect, useState } from 'react';
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
    form,
    onFormChange
}) => {

    const [ accordion, setAccordion ] = useState(false);
    const toggleAccordion = () => { setAccordion(!accordion); };

    const [ gyeonggiDo, setGyeonggiDo ] = useState(form["gyeonggiDo"].filter(item => item.value === true).length);
    const onGyeonggiDoCount = checked => {setGyeonggiDo(gyeonggiDo => gyeonggiDo + `${ checked? 1 :(-1) }`);}

    return (
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
                                    form["gyeonggiDo"].map((si, idx) => (
                                        <CheckWrap key={ idx }>
                                            <input 
                                                type="checkbox" 
                                                name="aRegion" 
                                                id={`aRegion0_${idx}`} 
                                                value={ si.label } 
                                                onChange={ event => {
                                                    onGyeonggiDoCount(event.currentTarget.checked);
                                                    onFormChange("gyeonggiDo", idx, event.currentTarget.checked);
                                                } }
                                            />
                                            <label htmlFor={`aRegion0_${idx}`}>{ si.label }</label>
                                        </CheckWrap>
                                    ))
                                }
                                </fieldset>
                            </AccordionDetails>
                        </Accordion>
                        <fieldset>
                            {
                                form["sidos"].map((sido, idx) => (
                                    <CheckBox key={ idx }>
                                        <input 
                                            type="checkbox" 
                                            name="aRegion" 
                                            id={`aRegion${idx + 1}`} 
                                            value={ sido.value }  
                                            onChange={ event => onFormChange("sidos", idx, event.currentTarget.checked) }   
                                        />
                                        <label htmlFor={`aRegion${idx + 1}`}>{ sido.label }</label>
                                    </CheckBox>
                                ))
                            }
                        </fieldset>
                    </form>
                </Body>
        </AlarmForm>
    )
};

export default UserAlarmForm;