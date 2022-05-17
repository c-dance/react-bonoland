import { KeywordForm } from "./keywordFilterStyle";

const KeywordFilter = () => {
    return (
        <KeywordForm>
            <input 
                type="text" 
                placeholder="지역구, 지역명으로 검색하세요."
            />
            <button>검색</button>
        </KeywordForm>
        
    )
}

export default KeywordFilter;