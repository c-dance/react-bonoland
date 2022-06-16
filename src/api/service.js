import api from ".";

const SERVICE_URL = {
    register: '/api/registerSaleProc',
    contact: '/api/registerBuyProc'
}

export const registerCenter = async data => await api.post(SERVICE_URL.register, {
    userName : data.uName,
    sisulName : data.cName,
    sisulAddress : data.cAddr,
    userTel : data.uTel,
    userEmail : data.uEmail,
    sisulAreaDepth1 : data.cSido,
    sisulAreaDepth2 : data.cGugun,
    sisulCtg : data.cType,
    squareMeasure : data.cSize,
    soldPrice : data.cPrice,
    monthlyRent : data.cRent,
    officialLimit : data.cCapacity,
    premium : data.cPremium,
    nowLimit : data.cPerson,
    sisulContents : data.cDesc
});

export const contactCenter = async data => await api.post(SERVICE_URL.contact, {
    userName : data.uName,
    userTel : data.uTel,
    userEmail : data.uEmail,
    sisulAreaDepth1 : data.cSido,
    sisulAreaDepth2 : data.cGugun,
    sisulCtg : data.cType,
    questionCtg : data.cContact,
    expctCapital : data.cAssets,
    requestContent : data.cContents
});