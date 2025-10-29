import { GET, POST, PUT, DELETE } from './api'

export const Create = async (table, params) => {
    return await POST(`/${ table }`, params, true);
}

export const Read = async (table, populate, filters) => {
    const qs = `?${ populate ? populate : `populate=*` }${ filters ? `&${filters}` : `` }`
    return await GET(`/${ table }${qs}`, true);
}

export const ReadOne = async (table, id, populate, filters) => {
    const qs = `?${ populate ? populate : `populate=*` }${ filters ? `&${filters}` : `` }`
    return await GET(`/${ table }/${id}${qs}`, true);
}

export const Update = async (table, params, id) => {
    return await PUT(`/${ table }/${id}`, params, true);
}

export const Delete = async (table, id) => {
    return await DELETE(`/${ table }/${ id }`, true);
} 
 