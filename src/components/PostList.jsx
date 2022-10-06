import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PostItem from './PostItem/PostItem.jsx';

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: 'center' }}> Posts not found</h1>;
  }

  return (
    <div className="post-list">
      <h1 className="post-list__header">{title}</h1>

      <TransitionGroup>
        {posts.map((post) => (
          <CSSTransition
            key={post.id}
            timeout={300}
            classNames="post-list__item post"
          >
            <PostItem remove={remove} number={post.id} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

export default PostList;
