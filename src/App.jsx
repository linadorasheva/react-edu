import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthProvider from './hoc/AuthProvider.jsx';
import RequireAuth from './hoc/RequireAuth.jsx';
import About from './pages/About/About.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import Layout from './pages/Layout.jsx';
import Login from './pages/Login/Login.jsx';
import Main from './pages/Main/Main.jsx';
import Post from './pages/Post.jsx';
import Posts from './pages/Posts/Posts.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Main />} />
          <Route
            path="/posts"
            element={
              <RequireAuth>
                <Posts />
              </RequireAuth>
            }
          />
          <Route path="posts/:id" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
