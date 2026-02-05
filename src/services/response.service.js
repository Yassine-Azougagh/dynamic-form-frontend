import api from "./api";

export const submitFormResponse = async (formId, answers) => {
    const res = await api.post(`/forms/${formId}/responses`, {
        answers,
    });
    return res.data;
};

export const getResponsesByForm = async (formId) => {
    const res = await api.get(`/forms/${formId}/responses`);
    return res.data;
};
