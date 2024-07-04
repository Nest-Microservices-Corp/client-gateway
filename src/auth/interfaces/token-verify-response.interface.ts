import { IUser } from "./user.interface";

export interface ITokenVerifyResponse {
    user: IUser;
    token: string;
}