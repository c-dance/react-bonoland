import React, { useState, useEffect } from "react";
import Terms from "../../components/Terms/Terms";
import GlobalFooter from "../../components/global/GlobalFooter/GlobalFooter";
import Section from '../../components/ui/Section/Section'
import { useGet } from "../../hooks";
import { getAllTerms } from '../../api/terms';
import { isBrowser, isMobile } from "react-device-detect";
import { useNavigate } from "react-router";

const TermsContainer = () => {

    const navigate = useNavigate();

    const [ terms, setTerms ] = useState([]);
    const [ loading, error, noData, data, setGet ] = useGet({});

    useEffect(() => {
        setGet(getAllTerms)
    }, []);

    useEffect(() => {
        if(data) {
            const TERMS = data.arrayResult;
            setTerms(TERMS);
        }
    }, [data]);
    
    return (
        <>
            {
                isBrowser && 
                <>
                    <Terms
                        terms={ terms }
                        loading={ loading }
                        error={ error }
                        noData={ noData }
                    />
                    <GlobalFooter />
                </>
            }
            {
                isMobile &&
                <div className="mobile">
                    <Section
                        title={ "약관 보기" }
                        themeColor="primary"
                        back = { true }
                        onBackClick={ () => navigate('/') }
                    >
                        <Terms
                            terms={ terms }
                            loading={ loading }
                            error={ error }
                            noData={ noData }
                        >
                            <GlobalFooter />
                        </Terms>
                    </Section>
                </div>
            }
        </>
    )
};

export default TermsContainer;