import { CapacityForm, SliderWrap, RadioWrap, RadioBox, Legend, Reset, Confirm } from "./CapacityFilterStyle";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import SliderIcon from '../../../assets/images/icon/ico-slider.svg';
import './rcSlider.css';

const marks = { 0: 0, 20: 20, 40: 40, 60: 60, 80: 80, 100: 100 };

const CapacityFilter = () => {
    return (
        <CapacityForm>
            <Legend>인가정원</Legend>
            <SliderWrap>
                <Slider 
                    range
                    min={ 0 }s
                    max={ 100 }
                    defaultValue={ [0, 100] }
                    step = { 1 }
                    marks = { marks }
                    dotStyle={{ display: 'none'}}
                    railStyle={{ backgroundColor: '#E0E0E0', height: 6 }}
                    trackStyle={{ backgroundColor: '#000036', height: 6 }}
                    handleStyle={{
                        height: 34,
                        width: 34,
                        marginTop: -14,
                        border: 0,
                        opacity: 1,
                        background: `url(${ SliderIcon }) center no-repeat #fff`
                    }}
                    allowCross= { true }
                />
            </SliderWrap>
            <RadioWrap>
                <RadioBox>
                    <input type="radio" id="cap01" name="bnCapacity" value={ [0, 100] }/>
                    <label htmlFor="cap01" >전체</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap02" name="bnCapacity" value={ [0, 29] }/>
                    <label htmlFor="cap02" >0 ~ 29</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap03" name="bnCapacity" value={ [29, 39] }/>
                    <label htmlFor="cap03" >29 ~ 39</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap04" name="bnCapacity" value={ [39, 59] }/>
                    <label htmlFor="cap04" >39 ~ 59</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap05" name="bnCapacity" value={ [59, 79] }/>
                    <label htmlFor="cap05" >59 ~ 79</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap06" name="bnCapacity" value={ [79, 99] }/>
                    <label htmlFor="cap06" >79 ~ 99</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap07" name="bnCapacity" value={ [99] }/>
                    <label htmlFor="cap07" >99 ~</label>
                </RadioBox>
            </RadioWrap>
            <Reset>선택 해제</Reset>
            <Confirm>적용</Confirm>
        </CapacityForm>
    )
}

export default CapacityFilter;