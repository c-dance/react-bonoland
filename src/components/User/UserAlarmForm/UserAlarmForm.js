import { useState } from 'react';
import { Regions } from '../../../sheme/alarm';
import {
    AlarmForm, 
    Head,
    Body,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    CheckWrap,
    CheckBox,
} from './UserAlarmFormStyle';

const UserAlarmForm = ({ data }) => {

    const [ accordion, setAccordion ] = useState(false);

    const toggleAccordion = () => {
        console.log('click');
        setAccordion(!accordion);
    };

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
                                <input type="checkbox" name="aRegion" id={"aRegion0"} value="경기도" readOnly />
                                <label htmlFor={"aRegion0"} onClick={ () => toggleAccordion() }>경기도</label>
                            </CheckBox>
                        </AccordionSummary>
                        <AccordionDetails active={ accordion }>
                            <fieldset>
                            {
                                Regions["gyeonggiDo"].map((si, idx) => (
                                    <CheckWrap key={ idx }>
                                        <input type="checkbox" name="aRegion" id={`aRegion0_${idx}`} value={ si } />
                                        <label htmlFor={`aRegion0_${idx}`}>{ si }</label>
                                    </CheckWrap>
                                ))
                            }
                            </fieldset>
                        </AccordionDetails>
                    </Accordion>
                    <fieldset>
                        {
                            Regions["sidos"].map((sido, idx) => (
                                <CheckBox key={ idx }>
                                    <input type="checkbox" name="aRegion" id={`aRegion${idx + 1}`} value={ sido } />
                                    <label htmlFor={`aRegion${idx + 1}`}>{ sido }</label>
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