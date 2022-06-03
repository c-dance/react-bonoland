import React from "react";
import Terms from "../../components/Terms/Terms";
import GlobalFooter from "../../components/global/GlobalFooter/GlobalFooter";
import BreakPoint from "../../themes/breakpoint";
import MobileHeader from "../../components/global/MobileHeader/MobileHeader";
import { useFetch } from "../../hooks";

const TermsContainer = () => {

    const [ page, terms ] = useFetch({}, '/data/terms.json');
    
    return (
        <>
            <BreakPoint name="tablet">
                <MobileHeader title="이용약관"/>
            </BreakPoint>
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