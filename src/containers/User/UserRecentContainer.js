import { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import CenterCard from '../../components/Center/CenterCard/CenterCard';
import Section from "../../components/ui/Section/Section";

const UserRecentContainer = () => {

    const [ recent, setRecent ] = useState([]);

    const fetchRecent = () => {
        fetch('/data/centers.json', {
            headers: {
                'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setRecent(data);
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchRecent();
    }, []);

    return (
        <Section
            title={ `최근 본 매물(${recent.length})` }
            themeColor={ "primary" }
            close={ true }
            action={ false }
        >
            <CenterList 
                type={ "sub" } 
                centers={ recent }
            />
        </Section>
    )
}

export default UserRecentContainer;