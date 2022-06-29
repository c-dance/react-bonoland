import React, { useState, useEffect } from 'react';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import { useDispatch } from 'react-redux';
import { getRegionByLatlng, getSearchByAddress, getZoomByAddress } from '../../utils/map';
import { activateAlert } from '../../store/actions/alert';
import { updateFilter } from '../../store/actions/filter';
import { updateMapInfos } from '../../store/actions/map';

const AddressFilterContainer = ({ type }) => {

    const dispatch = useDispatch();

    const [ address, setAddress ] = useState('');
    const [ adressResult, setAddressResult ] = useState({});

    const onAddressChange = event => {
        setAddress(event.currentTarget.value);
    };

    const onAddressSubmit = async event => {
        event.preventDefault();

        await getSearchByAddress(address)
            .then(async data => {
                await getRegionByLatlng([Number(data.y), Number(data.x)])
                .then(regions => {
                        // 법정동인지 구별하는 스크립트
                        const searchAddrList = data.addressElements.slice(0, 3).map(item => item.longName).filter(item => item.length > 0);
                        const legalAddrList = Object.keys(regions).map(key => regions[key].name).slice(1, searchAddrList.length + 1);
                        const searchAddrString = searchAddrList.join(' ').trim();
                        const legalAddrString = legalAddrList.join(' ').trim();
                        console.log(`\n 검색 주소: ${searchAddrString} \n 법정동 주소: ${legalAddrString}\n 일치 여부: ${searchAddrString === legalAddrString} \n`);

                        if(searchAddrString === legalAddrString) {
                            dispatch(updateFilter({
                                region: legalAddrString,
                                latlng: [Number(data.x), Number(data.y)], 
                                zoom: getZoomByAddress(data.addressElements)
                            }))
                        } else {
                            dispatch(activateAlert({
                                title: "검색 결과",
                                contents: "지역구, 지역명은 법정동 기준으로 정확히 입력해 주세요."
                            }))
                        }
                    })
                    .catch( err => {
                        dispatch(activateAlert({
                            title: "검색 결과",
                            contents: `검색 지역을 찾을 수 없습니다. \n 지역구, 지역명을 정확히 입력해 주세요.`
                        }))
                    })
            })
            .catch(() =>{
                dispatch(activateAlert({
                    title: "검색 결과",
                    contents: `검색 지역을 찾을 수 없습니다. \n 지역구, 지역명을 정확히 입력해 주세요.`
                }))
            })

        // await getSearchByAddress(address)
        //     .then(res => {
        //         if(res){
        //             // 검색 필터와 지도 속성 다르게 줌(대안 1)
        //             dispatch(updateFilter(res));
                    
        //             // dispatch(updateMapInfos({
        //             //     zoom: res.zoom,
        //             //     region: res.region,
        //             //     latlng: res.latlng
        //             // }));
                    
        //         } else {
        //             dispatch(activateAlert({
        //                 title: "검색 결과",
        //                 contents: "검색 지역을 찾을 수 없습니다. 다시 시도해 주세요."
        //             }))
        //         }
        //     })
        //     .catch(err => {
        //         dispatch(activateAlert({
        //             title: "검색 결과",
        //             contents: "검색 지역을 찾을 수 없습니다. 지역명을 정확히 입력해 주세요."
        //         }))
        //     })
        
    };


    return (
        <AddressFilter 
            type={ type } 
            address = { address }
            onAddressChange = { onAddressChange }
            onAddressSubmit = { onAddressSubmit }
        />
    )
};  

export default AddressFilterContainer;