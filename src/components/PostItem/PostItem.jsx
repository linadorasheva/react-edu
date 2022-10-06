import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import MyButton from '../UI/button/MyButton.jsx';

const PostItem = ({ post, number, remove }) => {
  const router = useNavigate();

  return (
    <div className="post-item">
      <div className="post-item__content">
        <strong>
          {number}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className="post-item__btns">
        <MyButton
          type="button"
          className="post-item__btn post-item__btn--green"
          onClick={() => router(`/posts/${post.id}`)}
        >
          Open
        </MyButton>
        <MyButton
          type="button"
          className="post-item__btn"
          onClick={() => remove(post)}
        >
          Delete
        </MyButton>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  number: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default PostItem;
