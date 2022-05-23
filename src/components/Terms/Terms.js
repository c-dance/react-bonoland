import { useState } from 'react';
import { TabNav } from '../Center/CenterItem/CenterItemStyle';
import { Tab, Wrap, TabHead, TabNavs, TabConts } from './TermsStyle';

const Terms = ({ data }) => {

    const [ tabIdx, setTabIdx] = useState(0);
    const toggleTab = (idx) => {
        setTabIdx(idx);
    };

    return (
        <Tab>
            <TabHead>
                <div>
                    <a></a>
                    <h2>약관 보기</h2>
                </div>
                <TabNavs>
                    {
                        Object.keys(data).map((key, idx) => (
                            <span
                                key={ key }
                                className={ tabIdx && "active" }
                                onClick={ () => toggleTab(idx) }
                            >{ key }</span>
                        ))
                    }
                </TabNavs>
            </TabHead>
            <TabConts>
                {
                    Object.keys(data).map((key, idx) => (
                        <div
                            className={ tabIdx && "active" }
                        >
                            <span>{ data[key]["개정일"] }</span>
                            <p>{ data[key]["내용"] }</p>
                        </div>
                    ))
                }
            </TabConts>
        </Tab>
    )
};

export default Terms;