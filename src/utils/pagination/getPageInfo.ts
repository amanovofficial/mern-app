import { PaginateResult } from "mongoose"
import { IPageInfo, IPageNumber } from "../../types/db/Pagination";

export default (paginateResult: PaginateResult<any>): IPageInfo => {

    const { totalDocs, totalPages, page } = paginateResult
    const { prevPage, nextPage } = paginateResult
    const pageInfo: IPageInfo = {
        totalDocs: 0,
        totalPages: 0,
        page: 0,
        prevPage: null,
        nextPage: null,
        pageNumbers: [],
    }

    if (page === undefined) return pageInfo

    const pageNumbers: IPageNumber[] = []

    const isContinue = (counter: number): boolean => {
        return (counter <= page + 4) && (counter <= totalPages)
    }

    const currentPage: number = page
    let startPageNumber: number = currentPage > 5 ? currentPage - 4 : 1

    let counter: number = startPageNumber

    while (isContinue(counter)) {
        counter === currentPage
            ? pageNumbers.push({ number: counter, active: true })
            : pageNumbers.push({ number: counter })
        counter++
    }

    return {
        pageNumbers,
        totalDocs,
        totalPages,
        page,
        prevPage,
        nextPage
    }
}