import PropTypes from 'prop-types';
import React, { useState } from 'react';

import MyButton from '../UI/button/MyButton.jsx';
import MyInput from '../UI/input/MyInput.jsx';

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (evt) => {
    evt.preventDefault();

    if (post.title.trim() && post.body.trim()) {
      create({
        ...post,
        id: Date.now(),
      });
    }

    setPost({ title: '', body: '' });
  };

  return (
    <form className="form">
      <MyInput
        value={post.title}
        onChange={(evt) => setPost({ ...post, title: evt.target.value })}
        type="text"
        placeholder="input title"
      />
      <MyInput
        value={post.body}
        onChange={(evt) => setPost({ ...post, body: evt.target.value })}
        type="text"
        placeholder="input description"
      />
      <MyButton
        disabled={!post.title || !post.body ? true : false}
        onClick={addNewPost}
        className="form__button"
      >
        Create Post
      </MyButton>
    </form>
  );
};

PostForm.propTypes = {
  create: PropTypes.func.isRequired,
};

export default PostForm;
