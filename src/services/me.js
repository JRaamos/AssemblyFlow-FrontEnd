import { GET, POST, PUT, DELETE } from "./api";

export const ReadMe = async () => {
    return await GET(`/me`, true);
}

export const UpdateMe = async (params) => {
    return await PUT(`/me`, params, true);
}

export const RemoveMe = async () => {
    return await DELETE(`/me`, true);
}

export const UpdateMePassword = async (params) => {
    return await PUT(`/me/password`, params, true);
}