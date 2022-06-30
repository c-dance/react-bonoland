import React, { useState, useEffect } from "react";
import Terms from "../../components/Terms/Terms";
import GlobalFooter from "../../components/global/GlobalFooter/GlobalFooter";
import Section from '../../components/ui/Section/Section'
import { useGet } from "../../hooks";
import { getAllTerms } from '../../api/terms';
import { isBrowser, isMobile } from "react-device-detect";
import { useNavigate, useParams, useLocation } from "react-router";

const TermsContainer = () => {

    const navigate = useNavigate();
    const { category } = useParams();

    const [ terms, setTerms ] = useState([]);
    const [ activeCtg, setActiveCtg ] = useState(category || "");
    const [ loading, error, data, setGet ] = useGet({});

    useEffect(() => {
        setGet(getAllTerms);
    }, []);

    useEffect(() => {
        if(data) {
            setTerms(data.arrayResult);
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
                        category={ activeCtg }
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
                            category={ activeCtg }
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