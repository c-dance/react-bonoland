import React, { useEffect, useState } from 'react';
import { Tab, Logo, TabNavs, TabConts } from './TermsStyle';
import { isMobile } from 'react-device-detect';
import { Loading, NoData, Error } from '../ui/Inform/Inform';

const TERMS_TITLE = ["이용약관", "개인정보 처리방침", "위치기반서비스 이용약관"];

const Terms = ({ 
    terms, 
    category, 
    loading, 
    error, 
    noData, 
    children 
}) => {

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

    const getCategoryIdx = category => {
        const ctg = category.replaceAll(" ", "");
        const idx = TERMS_TITLE.reduce((acc, title, idx) => {
            if(title.replaceAll(" ", "") === ctg) return  acc + idx;
            else return acc;
        }, 0) 
        console.log(idx);
        return idx;
    }

    useEffect(() => {
        toggleTab(getCategoryIdx(category));
    }, [category]);

    return (
        <Tab className={ isMobile && "mobile" }>
        <div className="wrapper">
            <header>
                <Logo to="/" />
                <TabNavs>
                    {
                        TERMS_TITLE.map((item, idx) => (
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