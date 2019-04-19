import { UserDataInfo } from './user.model';

export class Hospital {
    constructor(
        public name: string,
        public img?: string,
        public _id?: string,
        public user?: UserDataInfo
    ) {}
}
