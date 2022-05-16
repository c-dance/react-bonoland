import { CategoryForm, Category } from "./CategorySearchStyle";

const CategorySearch = () => {
    return (
        <CategoryForm>
            <Category>
                <input type="radio" id="cateDndok" name="bnCategory" />
                <label>단독 요양원</label>
            </Category>
            <Category>
                <input type="radio" id="cateDndok" name="bnCategory" />
                <label>단독 요양원</label>
            </Category>
            <Category>
                <input type="radio" id="cateDndok" name="bnCategory" />
                <label>단독 요양원</label>
            </Category>
        </CategoryForm>
    )
}

export default CategorySearch;