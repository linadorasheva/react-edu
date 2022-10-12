import PropTypes from 'prop-types';
import React from 'react';

const MyPagination = ({ pages, pageNumber, changePage }) => {

  return (
    <div className="pagination">
      {pages.map((item) => (
        <button
          key={item.pageIndex}
          onClick={() => changePage(item)}
          className={
            pageNumber === item.pageNumber && !item.icon
              ? 'pagination__item pagination__item--current'
              : 'pagination__item'
          }
        >
          {item.icon ? (
            <span className={`pagination__icon ${item.iconClass}`} />
          ) : (
            <span>{item.pageNumber}</span>
          )}
        </button>
      ))}
    </div>
  );
};

MyPagination.propTypes = {
  pages: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default MyPagination;
