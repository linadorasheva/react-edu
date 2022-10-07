import React, { useEffect, useState, useRef } from 'react';

import PostService from '../../API/PostService.js';
import PostFilter from '../../components/PostFilter/PostFilter.jsx';
import PostForm from '../../components/PostForm/PostForm.jsx';
import PostList from '../../components/PostList/PostList.jsx';
import MyButton from '../../components/UI/button/MyButton.jsx';
import MyLoader from '../../components/UI/loader/MyLoader.jsx';
import MyModal from '../../components/UI/modal/MyModal.jsx';
import MyPagination from '../../components/UI/pagination/MyPagination.jsx';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver.js';
import { usePosts } from '../../hooks/usePosts';
import { getPageCount } from '../../utils/pages';

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postLoadingError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);

      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((item) => post.id !== item.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="posts-page page">
      <div className="container">
        <div className="posts-page__btns">
          <MyButton
            className="posts-page__btn posts-page__btn--create"
            onClick={() => setModal(true)}
          >
            Create post
          </MyButton>
        </div>

        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>

        <PostFilter filter={filter} setFilter={setFilter} />

        <div className="posts-page__header">
          <h1 className="page__title">Post List</h1>
          {isPostLoading && (
            <div className="posts-page__loader">
              <MyLoader />
            </div>
          )}
        </div>

        {postLoadingError && <p>Posts loading error: {postLoadingError}</p>}

        <PostList remove={removePost} posts={sortedAndSearchedPosts} />
        <div ref={lastElement} />
        <MyPagination
          totalPages={totalPages}
          page={page}
          changePage={changePage}
        />
      </div>
    </div>
  );
}

export default Posts;
