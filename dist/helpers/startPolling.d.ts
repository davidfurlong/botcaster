import { Notification } from '../models/Notification';
export declare function startPolling(farcasterAddress: string, handler: (notification: Notification) => void): void;
