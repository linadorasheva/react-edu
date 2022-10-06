import { useMemo } from 'react';

export const useSortedPosts = (posts, sortMethod) => {
  const sortedPosts = useMemo(() => {
    if (sortMethod === 'default') {
      return posts;
    }
    if (sortMethod) {
      return [...posts].sort((a, b) =>
        a[sortMethod].localeCompare(b[sortMethod])
      );
    }
    return posts;
  }, [sortMethod, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sortMethod, query) => {
  const sortedPosts = useSortedPosts(posts, sortMethod);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((item) =>
      item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query, sortedPosts]);
  return sortedAndSearchedPosts;
};
