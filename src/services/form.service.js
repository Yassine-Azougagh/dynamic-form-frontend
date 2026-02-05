import api from "./api";

export const getForms = async () => {
    const res = await api.get("/forms");
    return res.data;
};

export const getFormById = async (id) => {
    const res = await api.get(`/forms/${id}`);
    return res.data;
};

export const createForm = async (form) => {
    const res = await api.post("/forms", {
        title: form.title,
        schema: form.schema,
    });
    return res.data;
};

export const updateForm = async (id, form) => {
    const res = await api.put(`/forms/${id}`, {
        title: form.title,
        schema: form.schema,
    });
    return res.data;
};

export const deleteForm = async (id) => {
    await api.delete(`/forms/${id}`);
};
