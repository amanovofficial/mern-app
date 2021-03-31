import React from "react";
import classes from "./Pagination.module.css";
const Pagination = ({ pageInfo, getAllElements }) => {
    const {
        pageNumbers,
        totalPages,
        prevPage,
        nextPage
    } = pageInfo
    return (
        totalPages > 1
            ? <div className={classes.container}>
                {
                    prevPage
                        ? <label
                            key='prev'
                            onClick={() => getAllElements(prevPage)}
                            className={classes.button}>
                            {'<'}
                        </label>
                        : null
                }
                {
                    pageNumbers.map((page, index) => (
                        <label
                            key={index}
                            onClick={() => getAllElements(page.number)}
                            className={page.active ? classes.activeButton : classes.button}>{page.number}
                        </label>
                    ))
                }
                {
                    nextPage
                        ? <label
                            key='next'
                            onClick={() => getAllElements(nextPage)}
                            className={classes.button}>
                            {'>'}
                        </label>
                        : null
                }
            </div>
            : null
    )
}

export default Pagination