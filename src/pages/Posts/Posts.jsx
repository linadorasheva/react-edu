import React, { useEffect, useState, useRef } from 'react';

import PostService from '../../API/PostService.js';
import PostFilter from '../../components/PostFilter/PostFilter.jsx';
import PostForm from '../../components/PostForm/PostForm.jsx';
import PostList from '../../components/PostList/PostList.jsx';
import MyButton from '../../components/UI/button/MyButton.jsx';
import MyLoader from '../../components/UI/loader/MyLoader.jsx';
import MyModal from '../../components/UI/modal/MyModal.jsx';
import MyPagination from '../../components/UI/pagination/MyPagination.jsx';
import MySelect from '../../components/UI/select/MySelect.jsx';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver.js';
import { usePosts } from '../../hooks/usePosts';
import { getPageCount, pagesArrayBuilder } from '../../utils/pages';

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [infiniteScrollFiredOnce, setInfiniteScrollFiredOnce] = useState(false);
  const [isShowMoreButtonAction, setIsShowMoreButtonAction] = useState(false);

  const [pages, setPages] = useState([]);
  const slotArrowPrev = 1;
  const slotArrowNext = 1;
  const currentPageSlot = 1;
  const maxPagesSeen = 5;

  const initPagination = () => {
    if (totalPages <= maxPagesSeen) {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      setPages(
        pagesArrayBuilder({
          arrowNext: false,
          arrowPrev: false,
          visiblePagesNumbers: pages,
        })
      );
    } else if (page < maxPagesSeen - slotArrowNext) {
      const pages = [];
      for (let i = 1; i < maxPagesSeen; i++) {
        pages.push(i);
      }
      setPages(
        pagesArrayBuilder({
          arrowNext: true,
          arrowPrev: false,
          visiblePagesNumbers: pages,
        })
      );
    } else {
      const pages = [];
      const remainSlotsForPages =
        maxPagesSeen - slotArrowPrev - currentPageSlot;
      if (page + remainSlotsForPages >= totalPages) {
        for (let i = totalPages - remainSlotsForPages; i <= totalPages; i++) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: false,
            arrowPrev: true,
            visiblePagesNumbers: pages,
          })
        );
      } else if (page === totalPages) {
        for (let i = page - remainSlotsForPages; i <= totalPages; i++) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: false,
            arrowPrev: true,
            visiblePagesNumbers: pages,
          })
        );
      } else {
        for (
          let i = page;
          i <= page + remainSlotsForPages - slotArrowNext;
          i++
        ) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: true,
            arrowPrev: true,
            visiblePagesNumbers: pages,
          })
        );
      }
    }
  };

  const rebuildPages = () => {
    const lastVisiblePage = pages[pages.length - 2];
    if (lastVisiblePage.pageNumber === page) {
      const pages = [];
      const remainSlotsForPages =
        maxPagesSeen - slotArrowPrev - currentPageSlot;
      if (page + remainSlotsForPages >= totalPages) {
        for (let i = totalPages - remainSlotsForPages; i <= totalPages; i++) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: false,
            arrowPrev: true,
            visiblePagesNumbers: pages,
          })
        );
      } else {
        for (
          let i = page;
          i <= page + remainSlotsForPages - slotArrowNext;
          i++
        ) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: true,
            arrowPrev: true,
            visiblePagesNumbers: pages,
          })
        );
      }
    }
  };

  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postLoadingError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      if (isShowMoreButtonAction) {
        setPosts([...posts, ...response.data]);
        setIsShowMoreButtonAction(false);
      } else {
        setPosts(response.data);
      }

      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    if (!infiniteScrollFiredOnce) {
      setPage(page + 1);
      setInfiniteScrollFiredOnce(true);
    }
  });

  const onShowMoreButtonClick = () => {
    setIsShowMoreButtonAction(true);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  useEffect(() => {
    initPagination();
  }, [totalPages]);

  useEffect(() => {
    if (pages.length) {
      rebuildPages();
    }
  }, [page, totalPages]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((item) => post.id !== item.id));
  };

  const clickNext = (lastVisiblePageNumber) => {
    if (page + 1 <= lastVisiblePageNumber) {
      setPage(page + 1);
    } else {
      const firstNewVisiblePage = lastVisiblePageNumber + 1;
      const pages = [];
      const remainSlotsForPages =
        maxPagesSeen - slotArrowPrev - currentPageSlot;
      if (firstNewVisiblePage + remainSlotsForPages >= totalPages) {
        const firstPage = totalPages - slotArrowPrev;
        for (let i = firstPage; i <= totalPages; i++) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: false,
            arrowPrev: true,
            visiblePagesNumbers: pages,
          })
        );
      } else {
        for (
          let i = firstNewVisiblePage;
          i <= firstNewVisiblePage + remainSlotsForPages - slotArrowNext;
          i++
        ) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: true,
            arrowPrev: true,
            visiblePagesNumbers: pages,
          })
        );
      }
      setPage(firstNewVisiblePage);
    }
  };

  const clickPrev = (firstVisiblePageNumber) => {
    if (firstVisiblePageNumber <= page - 1) {
      setPage(page - 1);
    } else {
      const lastNewVisiblePage = firstVisiblePageNumber - 1;
      const pages = [];
      const remainSlotsForPages =
        maxPagesSeen - slotArrowNext - currentPageSlot;
      if (lastNewVisiblePage - remainSlotsForPages > 1) {
        const firstNewVisiblePage =
          lastNewVisiblePage - remainSlotsForPages + slotArrowPrev;
        for (let i = firstNewVisiblePage; i <= lastNewVisiblePage; i++) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: true,
            arrowPrev: true,
            visiblePagesNumbers: pages,
          })
        );
      } else {
        const pages = [];
        for (let i = 1; i < maxPagesSeen; i++) {
          pages.push(i);
        }
        setPages(
          pagesArrayBuilder({
            arrowNext: true,
            arrowPrev: false,
            visiblePagesNumbers: pages,
          })
        );
      }
      setPage(lastNewVisiblePage);
    }
  };

  const changePage = (page) => {
    const currentFirstPage = pages.find(
      (item) => typeof item.pageNumber === 'number' && item.pageNumber > 0
    );
    const currentLastPage = pages[pages.length - 2];
    switch (page.action) {
      case 'clickPage':
        setPage(page.pageNumber);
        break;
      case 'clickPrev':
        if (currentFirstPage) {
          clickPrev(currentFirstPage.pageNumber);
        }
        break;
      case 'clickNext':
        if (currentLastPage) {
          clickNext(currentLastPage.pageNumber);
        }
        break;
    }
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

        <div className="posts-page__select">
          <p className="posts-page__select-title">
            Number of posts for download:
          </p>
          <MySelect
            value={`${limit}`}
            onChange={(value) => setLimit(value)}
            defaultValue="Number of posts"
            options={[
              { value: 5, name: 5 },
              { value: 10, name: 10 },
              { value: 25, name: 25 },
              { value: -1, name: 'show all' },
            ]}
          />
        </div>

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
        <div className="posts-page__pagination">
          <MyButton onClick={() => onShowMoreButtonClick()}>Load more</MyButton>
          <MyPagination
            pages={pages}
            pageNumber={page}
            changePage={changePage}
          />
        </div>
      </div>
    </div>
  );
}

export default Posts;
