export interface IPageNumber {
    number: number,
    active?: boolean
}
export interface IPageInfo {
    pageNumbers: IPageNumber[],
    totalDocs: number,
    totalPages: number,
    page: number,
    prevPage: number | null | undefined,
    nextPage: number | null | undefined
}
