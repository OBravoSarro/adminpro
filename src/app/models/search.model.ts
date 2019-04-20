import { Hospital } from './hospital.model';
import { UserDataInfo } from './user.model';
import { Doctor } from './doctor.model';
export class Search {
    constructor(
        public hospitals?: Hospital[],
        public users?: UserDataInfo[],
        public doctors?: Doctor[],
    ) {}
}
