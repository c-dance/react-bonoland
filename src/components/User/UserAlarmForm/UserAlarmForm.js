import {
    AlarmForm, 
    Head,
    Form,
} from './UserAlarmFormStyle';

const UserAlarmForm = ({ data }) => {
    return (
        <AlarmForm>
            <Head>
                <h2>지역 알림 설정</h2>
                <p>
                매물 관심 지역을 알림 설정하시면 해당 지역의 새로운 매물 정보를 알려드립니다.
                </p>
            </Head>
            <hr/>
        </AlarmForm>
    )
};

export default UserAlarmForm;