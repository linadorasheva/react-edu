import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import PostItem from '../PostItem/PostItem.jsx';

const PostList = ({ posts, remove }) => {
  if (!posts.length) {
    return <p> Posts not found</p>;
  }

  return (
    <div className="post-list">

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
  remove: PropTypes.func.isRequired,
};

export default PostList;
