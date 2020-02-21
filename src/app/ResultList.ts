import {User} from './User';

export interface ResultList {
    page: number;
    per_page: string;
    total: string;
    total_pages: string;
    data: User[];
}
