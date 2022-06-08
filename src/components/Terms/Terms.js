import React, { useState } from 'react';
import { Tab, Logo, TabNavs, TabConts } from './TermsStyle';
import { isMobile } from 'react-device-detect';
import { Loading, NoData, Error } from '../ui/Inform/Inform';

const Terms = ({ terms, loading, error, noData }) => {

    const [ tabIdx, setTabIdx] = useState(0);
    const toggleTab = (idx) => {
        setTabIdx(idx);
    };

    const responsiveWords = (word) => {
        if(word.length <= 10) return word;

        let words = word.split(' ');
        return words.map((word, idx) => (
            idx < 1 ? <span>{ word }</span> 
            : <span className="pc">{ word }</span>
        ))
    };

    return (
        <>
            { loading && Loading() }
            { error && Error() }
            { noData && NoData() }
            {
                terms && Object.keys(terms).length > 0 &&
                <Tab className={ isMobile && "mobile" }>
                    <header>
                        <Logo to="/" />
                        <TabNavs>
                            {
                                Object.keys(terms).map((key, idx) => (
                                    <div
                                        key={ key }
                                        className={ tabIdx === idx && "active" }
                                        onClick={ () => toggleTab(idx) }
                                    >{ responsiveWords(key) }</div>
                                ))
                            }
                        </TabNavs>
                    </header>
                    <main>
                        <TabConts>
                            {
                                Object.keys(terms).map((key, idx) => (
                                    <div
                                        className={ tabIdx === idx && "active" }
                                    >
                                        <span>{ terms[key]["개정일"] }</span>
                                        <p>{ terms[key]["내용"] }</p>
                                    </div>
                                ))
                            }
                        </TabConts>
                    </main>
                </Tab>
            }
        </>
    )
};

export default Terms;