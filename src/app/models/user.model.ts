import { Menu } from './menu.model';

export class User {
    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: boolean
    ) {}
}

export class UserLogin {
    constructor(
        public email: string,
        public password: string,
        public remember: boolean
    ) {}
}

export class UserData {
    constructor(
        public id: string,
        public token: string,
        public user: UserDataInfo,
        public remember?: boolean,
        public menu?: Menu[]
    ){}
}
export class UserDataInfo {
    constructor(
        public email: string,
        public google: boolean,
        public img: string,
        public lastname: string,
        public name: string,
        public password: string,
        public role: string,
        public __v: number,
        public _id: string
    ){}
}