/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import { Article, Dictionary, MyProfile, Register, AdminHome, AdminUsers } from './routes';
import ProtectedRoute from './routes/Components/ProtectedRoutes';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route exact path="/" element={<Dictionary />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminHome />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute adminOnly>
            <AdminUsers />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
