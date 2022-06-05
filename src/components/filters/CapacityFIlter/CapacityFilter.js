import { CapacityForm, SliderWrap, RadioWrap, RadioBox, Legend, Reset, Actions } from "./CapacityFilterStyle";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import sliderIcon from '../../../assets/images/icon/ico-slider.svg';
import './rcSlider.css';
import React from "react";
import { CAPACITY } from "../../../sheme/filter";

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
                    defaultValue={ CAPACITY[0].value }
                    value={ values }
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
                    onChange={ value => onCapacitySlide(value) }
                />
            </SliderWrap>
            <RadioWrap>
                {
                    CAPACITY.map((item, idx) => (
                        <RadioBox key={`cap${idx}`}>
                            <input 
                                type="radio" 
                                id={`cap${idx}`} 
                                name="bnCapacity" 
                                value={ item.value } 
                                onChange={ () => onCapacitySelect(item.value) } 
                                checked={ JSON.stringify(values) === JSON.stringify(item.value) }
                            />
                            <label htmlFor={`cap${idx}`} >{item.label}</label>
                        </RadioBox>
                    ))
                }
            </RadioWrap>
            <Reset type="reset">선택 해제</Reset>
            <Actions>
                <button type="submit">확인</button>
                <button type="button" onClick={ event => onCloseClick(event) }>닫기</button>
            </Actions>
        </CapacityForm>
    )
}

export default CapacityFilter;