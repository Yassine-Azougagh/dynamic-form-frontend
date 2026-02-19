import api from "./api";

export const getAdminForms = async (page, size, sortBy) => {
    const pg = page ? page : 0
    const sz = size ? size : 10
    const sort = sortBy ? sortBy : ''
    const res = await api.get(`/form/admin/list?page=${pg}&size=${sz}&sortBy=${sort}`);
    return res.data;
};
export const getUserForms = async (page, size, sortBy) => {
    const pg = page ? page : 0
    const sz = size ? size : 10
    const sort = sortBy ? sortBy : ''
    const res = await api.get(`/form/user/list?page=${pg}&size=${sz}&sortBy=${sort}`);
    return res.data;
};

export const getFormById = async (id) => {
    const res = await api.get(`/form/${id}`);
    return res.data;
};

export const createForm = async (form) => {
    const res = await api.post("/form", form);
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
