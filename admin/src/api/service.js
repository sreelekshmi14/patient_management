import instance from './instance';

export const postdata = (url, data) => instance.post(url, data);
export const getUserData = (url) => instance.get(url);
export const editdata = (url, id, data) => instance.patch(`${url}/${id}`, data);
export const getdataById = (url, id) => instance.get(`${url}/${id}`);
export const deleteData = (url, id) => instance.delete(`${url}/${id}`);
export const getData = (url, params) => instance.get(url, { params });
