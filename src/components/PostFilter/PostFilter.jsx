import PropTypes from 'prop-types';
import React from 'react';

import MyInput from '../UI/input/MyInput.jsx';
import MySelect from '../UI/select/MySelect.jsx';

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div className="post-filter">
      <MyInput
        value={filter.query}
        onChange={(evt) => setFilter({ ...filter, query: evt.target.value })}
        placeholder={'Search ...'}
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sort"
        options={[
          {
            value: 'default',
            name: 'Default',
          },
          {
            value: 'title',
            name: 'Title',
          },
          {
            value: 'body',
            name: 'Description',
          },
        ]}
      />
    </div>
  );
};

PostFilter.propTypes = {
  filter: PropTypes.shape({
    query: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
  }),
  setFilter: PropTypes.func.isRequired,
};

export default PostFilter;
