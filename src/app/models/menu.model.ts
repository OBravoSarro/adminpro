export class Menu {
    constructor(
        public title: string,
        public icon?: string,
        public submenu?: Menu[]
    ) {}
}
