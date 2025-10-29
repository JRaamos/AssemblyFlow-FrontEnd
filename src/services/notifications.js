import { GET, POST, PUT, DELETE } from "./api";

export const ReadNotifications = async () => {
    return await GET(`/me-notifications`, true);
}

export const SaveDeviceToken = async (params) => {
    return await POST(`/me-notifications/token`, params, true);
}

export const UpdateNotification = async (params, id) => {
    return await PUT(`/me-notifications/${id}`, params, true);
}

export const RemoveNotification = async (id) => {
    return await DELETE(`/me-notifications/${id}`, true);
}

export const RemoveAllNotifications = async () => {
    return await DELETE(`/me-notifications-all`, true);
}