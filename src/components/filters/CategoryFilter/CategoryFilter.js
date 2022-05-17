import { CategoryForm, Category } from "./CategoryFilterStyle";

const CategoryFilter = () => {
    return (
        <CategoryForm>
            <Category>
                <input type="radio" id="cate01" name="bnCategory" value="단독요양원" />
                <label htmlFor="cate01">단독요양원</label>
            </Category>
            <Category>
                <input type="radio" id="cate02" name="bnCategory" value="상가요양원" />
                <label htmlFor="cate02">상가요양원</label>
            </Category>
            <Category>
                <input type="radio" id="cate03" name="bnCategory" value="주간보호" />
                <label htmlFor="cate03">주간보호</label>
            </Category>
        </CategoryForm>
    )
}

export default CategoryFilter;