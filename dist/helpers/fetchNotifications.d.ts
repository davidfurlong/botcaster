import { Notification } from '../models/Notification';
export default function (next: string, address: string): Promise<import("axios").AxiosResponse<{
    result: {
        notifications?: {
            [key: string]: Notification;
        } | undefined;
    };
    meta?: {
        next?: string | undefined;
    } | undefined;
}, any>>;
