import React, { useState } from 'react';
import { Tab, Logo, TabNavs, TabConts } from './TermsStyle';
import { isMobile } from 'react-device-detect';
import { Loading, NoData, Error } from '../ui/Inform/Inform';

const TEMRS_TITLE = ["이용약관", "개인정보 처리방침", "위치기반서비스 약관"];

const Terms = ({ terms, loading, error, noData, children }) => {

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
        <Tab className={ isMobile && "mobile" }>
        <div className="wrapper">
            <header>
                <Logo to="/" />
                <TabNavs>
                    {
                        TEMRS_TITLE.map((item, idx) => (
                            <div
                                key={ item }
                                className={ tabIdx === idx && "active" }
                                onClick={ () => toggleTab(idx) }
                            >{ responsiveWords(item) }</div>
                        ))
                    }
                </TabNavs>
            </header>
            <main>
            { loading && Loading() }
            { error && Error() }
            { noData && NoData() }
            {
                terms && terms.length > 0 &&
                <TabConts>
                    {
                        terms.map((item, idx) => (
                            <div
                                className={ tabIdx === idx && "active" }
                                key={idx}
                            >
                                <strong>{ item.createDate }</strong>
                                <p>{ item.siteContents }</p>
                            </div>
                        ))
                    }
                </TabConts>
            }
            </main>
            { children }
        </div>
        </Tab>
    )
};

export default Terms;