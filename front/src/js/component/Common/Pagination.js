import React from 'react';
import ReactJsPagination from 'react-js-pagination';
import styles from '../../../css/component/Common/Pagination.module.css';

function Pagination(props) {
    const {
        activePage,
        itemsCountPerPage,
        totalItemsCount,
        pageRangeDisplayed,
        onChange,
        prevPageText,
        nextPageText,
    } = props;

    return (
        <div className={styles.paginationContainer}>
            <ReactJsPagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={onChange}
                itemClass={styles.pageItem}
                linkClass={styles.pageLink}
                activeClass={styles.active}
                prevPageText={prevPageText}
                nextPageText={nextPageText}
                innerClass={styles.pagination}
            />
        </div>
    );
}

export default Pagination;