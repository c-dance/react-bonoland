import { CategoryForm, Category } from "./CategoryFilterStyle";
import { isMobile } from "react-device-detect";
import { CapacityForm, SliderWrap, RadioWrap, RadioBox, Legend, Reset, Actions } from "./CategoryFilterStyle";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import sliderIcon from '../../../assets/images/icon/ico-slider.svg';
import './rcSlider.css';
import React, { useEffect, useState } from "react";
import { CATEGORY, TYPE_AND_CAPACITY, TYPE_AND_MARKERS } from "../../../scheme/filter";
import { LOCAL_STORAGE } from "../../../utils/filter";

const optionSet = {
    options: null,
    rangeMarkers: null,
    minRange: 0, 
    maxRange: 0
}

const CategoryFilter = ({ 
    categories,  
    onFormSubmit,  
}) => {

    // 현재 카테고리
    const [ currentCategory, setCurrentCategory ] = useState(null);
    const [ currentOptions, setCurrentOptions ] = useState(null);
    const [ currentCapacity, setCurrentCapacity ] = useState(null);
    const [ selectedCategory, setSelectedCategory ] = useState([]);

    const resetCapacity = event => {
        event.preventDefault();
        LOCAL_STORAGE.store(currentCategory, TYPE_AND_CAPACITY[currentCategory][0].value);
        setCurrentCapacity(TYPE_AND_CAPACITY[currentCategory][0].value);
    };

    const selectCapacity = value => {
        LOCAL_STORAGE.store(currentCategory, value);
        setCurrentCapacity(value);
    };

    const handleSubmit = categorySelected => {
        onFormSubmit(currentCategory, currentCapacity, categorySelected);
        setCurrentCategory(null);
    };

    useEffect(() => {
        if(currentCategory) {
            setCurrentOptions(Object.assign({}, optionSet, {
                options: TYPE_AND_CAPACITY[currentCategory],
                rangeMarkers: TYPE_AND_MARKERS[currentCategory],
                maxRange: TYPE_AND_MARKERS[currentCategory][Object.keys(TYPE_AND_MARKERS[currentCategory]).pop()]
            }))
            setCurrentCapacity(LOCAL_STORAGE.get(currentCategory));
        } else {
            setCurrentOptions(null);
            setCurrentCapacity(null);
        }
    }, [currentCategory]);

    return (
        <>
            <CategoryForm>
                {
                    Object.keys(CATEGORY).map((key, idx) => (
                        <Category 
                            key={`cate${idx}`}
                            onClick={ () => setCurrentCategory(key) }
                        >
                            <input 
                                type="checkbox" 
                                id={`cate${idx}`} 
                                name="bnCategory" 
                                value={CATEGORY[key].value} 
                                onChange={ event => { event.preventDefault(); } } 
                                checked={ categories[key].selected }
                            />
                            <label htmlFor={`cate${idx}`}>{ isMobile? CATEGORY[key].mobileLabel : CATEGORY[key].label }</label>
                        </Category>
                    ))
                }
            </CategoryForm>
            {
                currentOptions &&
                
                <CapacityForm 
                    onReset={ event => resetCapacity(event) }
                >
                    <Legend>인가정원</Legend>
                    <SliderWrap>
                        <Slider 
                            range
                            min={ currentOptions.minRange }
                            max={ currentOptions.maxRange }
                            marks = { currentOptions.marks }
                            step = { 1 }
                            defaultValue={ currentCapacity }
                            value={ currentCapacity }
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
                            onChange={ value => selectCapacity(value) }
                        />
                    </SliderWrap>
                    <RadioWrap>
                        {
                            currentOptions.options.map((item, idx) => (
                                <RadioBox key={`cap${idx}`}>
                                    <input 
                                        type="radio" 
                                        id={`cap${idx}`} 
                                        name="bnCapacity" 
                                        value={ item.value } 
                                        onChange={ () => selectCapacity(item.value) } 
                                        checked={ JSON.stringify(currentCapacity) === JSON.stringify(item.value) }
                                    />
                                    <label htmlFor={`cap${idx}`} >{item.label}</label>
                                </RadioBox>
                            ))
                        }
                    </RadioWrap>
                    <Reset type="reset">초기화</Reset>
                    <Actions>
                        <button type="button" className="submit" onClick={ () => handleSubmit(true) }>선택</button>
                        <button type="button" onClick={ () => handleSubmit(false) }>선택해제</button>
                    </Actions>
                </CapacityForm>
            }
        </>
    )
};

export default CategoryFilter;