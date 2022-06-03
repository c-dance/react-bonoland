import { CategoryForm, Category } from "./CategoryFilterStyle";
import { isMobile } from "react-device-detect";
import React from "react";

const CategoryFilter = ({ selectHandler }) => {
    return (
        <CategoryForm>
            <Category>
                <input type="radio" id="cate01" name="bnCategory" value="단독요양원" onChange={ event => selectHandler(event.currentTarget.value) } />
                <label htmlFor="cate01">{ isMobile? "단독" : "단독요양원" }</label>
            </Category>
            <Category>
                <input type="radio" id="cate02" name="bnCategory" value="상가요양원" onChange={ event => selectHandler(event.currentTarget.value) } />
                <label htmlFor="cate02">{ isMobile? "상가" : "상가요양원" }</label>
            </Category>
            <Category>
                <input type="radio" id="cate03" name="bnCategory" value="주간보호" onChange={ event => selectHandler(event.currentTarget.value) } />
                <label htmlFor="cate03">{ isMobile? "주간" : "주간보호" }</label>
            </Category>
        </CategoryForm>
    )
};

export default CategoryFilter;