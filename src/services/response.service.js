import api from "./api";

export const submitFormResponse = async ( answers) => {
    const res = await api.post(`/submission`, answers);
    return res.data;
};

export const getResponsesByForm = async (formId) => {
    const res = await api.get(`/submission/${formId}`);
    return res.data;
};
export const getResponses = async () => {
    const res = await api.get(`/submission/list`);
    return res.data;
};
