import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader.jsx';
import { useFetching } from '../hooks/useFetching';

const Post = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading] = useFetching(async (id) => {
    const response = await PostService.getPostById(id);
    setPost(response.data);
  });

  const [fetchComments, isLoadingComments] = useFetching(
    async (id) => {
      const response = await PostService.getComments(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{post.title}</h1>
      {isLoading ? <MyLoader /> : <p>{post.body}</p>}

      {isLoadingComments ? (
        <MyLoader />
      ) : (
        <div className="comments">
          <h2 className="comments__title">Comments:</h2>
          {comments.map((item) => (
            <div className="comments__item comment" key={item.id}>
              <h5>
                <b>{item.id}</b> {item.email}
              </h5>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
