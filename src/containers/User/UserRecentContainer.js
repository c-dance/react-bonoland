import { useState, useEffect } from 'react';
import CenterList from '../../components/Center/CenterList/CenterList';
import CenterCard from '../../components/Center/CenterCard/CenterCard';
import SideSection from "../../components/SideSection/SideSection";

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
        <SideSection
            title={ "찜 매물" }
            themeColor={ "primary" }
            close={ true }
            action={ false }
        >
            <CenterList 
                type={ "sub" } 
                centers={ recent }
            />
        </SideSection>
    )
}

export default UserRecentContainer;