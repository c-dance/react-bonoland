import { CategoryForm, Category } from "./CategoryFilterStyle";
import { isMobile } from "react-device-detect";
import React from "react";
import { CATEGORY } from "../../../scheme/filter";

const CategoryFilter = ({ value, onCategorySelect }) => {
    return (
        <CategoryForm>
            {
                Object.keys(CATEGORY).map((key, idx) => (
                    <Category 
                        key={`cate${idx}`}
                        onClick={ () => onCategorySelect(key) }
                    >
                        <input 
                            type="radio" 
                            id={`cate${idx}`} 
                            name="bnCategory" 
                            value={CATEGORY[key].value} 
                            onChange={ event => {event.preventDefault();} } 
                            checked={ value === CATEGORY[key].value }
                        />
                        <label htmlFor={`cate${idx}`}>{ isMobile? CATEGORY[key].mobileLabel : CATEGORY[key].label }</label>
                    </Category>
                ))
            }
        </CategoryForm>
    )
};

export default CategoryFilter;