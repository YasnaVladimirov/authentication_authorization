import './App.scss';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Admin from './pages/Admin';
import Lounge from './pages/Lounge';
import Missing from './pages/Missing';
import LinkPage from './pages/LinkPage';
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';

const ROLES = {
  "User": "2323",
  "Editor": "4444",
  "Admin": "1357"
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route index element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>

          <Route path="*" element={<Missing />} />
        </Route >
      </Routes >
    </BrowserRouter >
  );
}

export default App;
