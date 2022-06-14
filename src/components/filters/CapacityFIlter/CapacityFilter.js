import { CapacityForm, SliderWrap, RadioWrap, RadioBox, Legend, Reset, Actions } from "./CapacityFilterStyle";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import sliderIcon from '../../../assets/images/icon/ico-slider.svg';
import './rcSlider.css';
import React from "react";
import { TYPE_AND_CAPACITY, TYPE_AND_MARKERS } from "../../../sheme/filter";

const CapacityFilter = ({ 
    category, 
    active, 
    values, 
    onFormSubmit, 
    onFormReset, 
    onCloseClick,  
    onCapacitySelect,
    onCapacitySlide
}) => {

    const SELECT_OPTIONS = TYPE_AND_CAPACITY[category];
    const RANGE_MARKERS = TYPE_AND_MARKERS[category];
    const MIN_RANGE = 0;
    const MAX_RANGE = RANGE_MARKERS[Object.keys(RANGE_MARKERS).pop()];

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
                    min={ MIN_RANGE }
                    max={ MAX_RANGE }
                    marks = { RANGE_MARKERS }
                    step = { 1 }
                    defaultValue={ MIN_RANGE }
                    value={ values }
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
                    SELECT_OPTIONS.map((item, idx) => (
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