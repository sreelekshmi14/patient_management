import instance from './instance';

export const postdata = (url, data) => instance.post(url, data);
export const getUserData = (url) => instance.get(url);
export const editdata = (url, data) => instance.patch(url, data);
export const getdataById = (url, id) => instance.get(`${url}/${id}`);
