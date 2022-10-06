import PropTypes from 'prop-types';
import React from 'react';

import { getPagesArray } from '../../../utils/pages';

const MyPagination = ({ totalPages, page, changePage }) => {
  // TODO useMemo & getPagesArray вынести в хук
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className="pagination">
      {pagesArray.map((item) => (
        <button
          key={item}
          onClick={() => changePage(item)}
          className={
            page === item
              ? 'pagination__item pagination__item--current'
              : 'pagination__item'
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
};

MyPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default MyPagination;
