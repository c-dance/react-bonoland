import Terms from "../../components/Terms/Terms";
import GlobalFooter from "../../components/global/GlobalFooter/GlobalFooter";
import { useFetch } from "../../hooks";

const TermsContainer = () => {

    const [ page, terms ] = useFetch({}, '/data/terms.json');
    console.log(page);
    console.log(terms);

    return (
        <>
            {
                page === "success" && 
                <Terms
                    data={ terms }
                />
            }
            <GlobalFooter />
        </>
    )
};

export default TermsContainer;