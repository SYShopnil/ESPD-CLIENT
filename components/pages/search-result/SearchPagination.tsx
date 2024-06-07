import React from 'react';
import Image from "next/image";
import ArrowRight from "@/components/pages/search-result/assets/ArrowRightww.svg";
import ArrowRightWhite from "@/components/pages/search-result/assets/ArrowRightWhite.svg";

function SearchPagination({ currentPage, lastPage, onClickPage, next }) {

    // const handleWindowForPaginationNext = () => {
    //     onClickPage(currentPage + 1)
    //     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    // }

    const pages = [];
    if (lastPage) {
        for (let i = 1; i <= lastPage; i++) {
            pages.push(<li className={`page-item ${i === currentPage ? 'active' : ''}`}><button className="page-link"
                onClick={() => onClickPage(i)}>{i}</button></li>)
        }
    }
    return (
        <div className="pasinationBox">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages}
                    {
                        (next !== null)
                        &&
                        <li className="page-item">
                            <button className="page-link nextImgDouble" onClick={() => onClickPage(currentPage + 1)}>
                                Next
                                <Image
                                    className="ArrowRightPasi"
                                    src={ArrowRight}
                                    alt=""
                                />
                                <Image
                                    className="ArrowRightWhite "
                                    src={ArrowRightWhite}
                                    alt=""
                                />
                            </button>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    );
}

export default SearchPagination;
