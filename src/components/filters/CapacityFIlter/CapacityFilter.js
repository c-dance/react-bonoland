import { CapacityForm, SliderWrap, RadioWrap, RadioBox, Legend, Reset, Actions } from "./CapacityFilterStyle";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import sliderIcon from '../../../assets/images/icon/ico-slider.svg';
import './rcSlider.css';
import React from "react";

const marks = { 0: 0, 20: 20, 40: 40, 60: 60, 80: 80, 100: 100 };

const CapacityFilter = ({ 
    active, 
    values, 
    onFormSubmit, 
    onFormReset, 
    onCloseClick,
    onCapacitySelect,
    onCapacitySlide
}) => {

    return (
        <CapacityForm 
            className={ active && "active" }
            onSubmit={ event => onFormSubmit(event) }
            onReset={ event => onFormReset(event) }
        >
            <Legend>인가정원</Legend>
            <SliderWrap>
                <Slider 
                    range
                    min={ 0 }
                    max={ 100 }
                    defaultValue={ values }
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
                        background: `url(${ sliderIcon }) center no-repeat #fff`
                    }}
                    allowCross= { true }
                    onAfterChange={ event => onCapacitySlide(event) }
                />
            </SliderWrap>
            <RadioWrap>
                <RadioBox>
                    <input type="radio" id="cap01" name="bnCapacity" value={ [0, 100] } onChange={ event => onCapacitySelect(event) }/>
                    <label htmlFor="cap01" >전체</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap02" name="bnCapacity" value={ [0, 29] } onChange={ event => onCapacitySelect(event) }/>
                    <label htmlFor="cap02" >0 ~ 29</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap03" name="bnCapacity" value={ [29, 39] } onChange={ event => onCapacitySelect(event) }/>
                    <label htmlFor="cap03" >29 ~ 39</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap04" name="bnCapacity" value={ [39, 59] } onChange={ event => onCapacitySelect(event) }/>
                    <label htmlFor="cap04" >39 ~ 59</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap05" name="bnCapacity" value={ [59, 79] } onChange={ event => onCapacitySelect(event) }/>
                    <label htmlFor="cap05" >59 ~ 79</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap06" name="bnCapacity" value={ [79, 99] } onChange={ event => onCapacitySelect(event) }/>
                    <label htmlFor="cap06" >79 ~ 99</label>
                </RadioBox>
                <RadioBox>
                    <input type="radio" id="cap07" name="bnCapacity" value={ [99] } onChange={ event => onCapacitySelect(event) }/>
                    <label htmlFor="cap07" >99 ~</label>
                </RadioBox>
            </RadioWrap>
            <Reset type="reset">선택 해제</Reset>
            <Actions>
                <button type="submit">confirm</button>
                <button type="button" onClick={ event => onCloseClick(event) }>close</button>
            </Actions>
        </CapacityForm>
    )
}

export default CapacityFilter;