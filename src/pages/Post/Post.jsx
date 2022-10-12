import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PostService from '../../API/PostService';
import MyLoader from '../../components/UI/loader/MyLoader.jsx';
import { useFetching } from '../../hooks/useFetching';

const Post = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading] = useFetching(async (id) => {
    const response = await PostService.getPostById(id);
    setPost(response.data);
  });

  const [fetchComments, isLoadingComments] = useFetching(async (id) => {
    const response = await PostService.getComments(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div className="post-page page">
      <div className="container">
        {isLoading ? (
          <MyLoader />
        ) : (
          <div className="post-page__content">
            <h1 className="page__title">{post.title}</h1>

            <div className="post-page__body">
              <p>{post.body}</p>
            </div>

            <div className="comments">
              <div>
                <h2 className="comments__title">Comments:</h2>
                {isLoadingComments && (
                  <div className="post-page__loader">
                    <MyLoader />
                  </div>
                )}
              </div>

              {comments.map((item) => (
                <div className="comments__item comment" key={item.id}>
                  <h5 className="comment__title">
                    <b>{item.id}</b> {item.email}
                  </h5>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
