import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CategoryFilter from "../../components/filters/CategoryFilter/CategoryFilter";
import { CATEGORY, TYPE_AND_CAPACITY } from "../../scheme/filter";
import { updateFilterCategory } from "../../store/actions/filter";

const categorySet = Object.keys(CATEGORY).reduce((acc, key) => {
    return Object.assign({}, acc, {
        [key] : {
            capacity: TYPE_AND_CAPACITY[key][0].value,
            selected: false
        }
    });
}, {});

const CategoryFilterContainer = () => {

    const dispatch = useDispatch();

    const [ categories, setCategories ] = useState(categorySet); // 카테고리 필터 데이터

    const submitCategory = (category, capacity, selected) => {
        const value = {
            [category]: {
                capacity: capacity,
                selected: selected
            }
        };
        const newCtg = Object.assign({}, categories, value);
        setCategories(newCtg);
        dispatch(updateFilterCategory(newCtg));
    };

    return (
        <CategoryFilter 
            categories={ categories }
            onFormSubmit={ submitCategory }
        />
    )
};

export default CategoryFilterContainer;