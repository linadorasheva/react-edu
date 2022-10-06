import React, { useEffect, useState } from 'react';

import PostService from '../API/PostService.js';
import PostFilter from '../components/PostFilter/PostFilter.jsx';
import PostForm from '../components/PostForm/PostForm.jsx';
import PostList from '../components/PostList/PostList.jsx';
import MyButton from '../components/UI/button/MyButton.jsx';
import MyLoader from '../components/UI/loader/MyLoader.jsx';
import MyModal from '../components/UI/modal/MyModal.jsx';
import MyPagination from '../components/UI/pagination/MyPagination.jsx';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postLoadingError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((item) => post.id !== item.id));
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  };

  return (
    <div className="posts-page">
      <div className="posts-page__btns">
        <MyButton
          className="posts-page__btn posts-page__btn--create"
          onClick={() => setModal(true)}
        >
          Create post
        </MyButton>
        <MyButton className="posts-page__btn" onClick={() => fetchPosts()}>
          Get posts
        </MyButton>
      </div>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter} />
      {postLoadingError && <h1>Posts loading error: {postLoadingError}</h1>}
      {isPostsLoading && (
        <div className="loader-wrapper">
          <h1>Loading</h1>
          <MyLoader />
        </div>
      )}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Post List"
      />
      <MyPagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;
