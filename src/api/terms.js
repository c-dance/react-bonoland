import api from ".";

const TERMS_URL = {
    all: '/policy/siteInfo',
    privacy: '/api/saleIndiviConsent'
};

export const getAllTerms = async () => await api.get(TERMS_URL.all);
export const getPrivacyTerm = async () => await api.post(TERMS_URL.privacy);