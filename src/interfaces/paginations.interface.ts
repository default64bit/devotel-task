export interface PaginationParams {
    search: string;
    page: number;
    perPage: number;
    sortType: 'asc' | 'desc';
    sortBy: string;
}
