import { Hospital } from './hospital.model';
import { UserDataInfo } from './user.model';

export class Doctor {
    constructor(
        public name: string,
        public img?: string,
        public _id?: string,
        public user?: UserDataInfo,
        public hospital?: Hospital
    ) {}
}
