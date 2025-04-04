import { AppProvider } from "./context/AppContext";

import socket from './socket/socket'

import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { ProtectedResetRoute } from "./components/ProtectedResetRoute/ProtectedResetRoute";

import Home from "./pages/home/Home";
import Authentication from "./pages/authentication/Authentication";
import Profile from "./pages/profile/Profile";
import ResetPassword from "./pages/reset/ResetPassword";
import Practice from "./pages/practice/Practice";
import Multiplayer from "./pages/multiplayer/Multiplayer";
import Custom from "./pages/custom/Custom";

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init();

  return (
    <AppProvider>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<Home />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/practice' element={<Practice socket={socket} />} />
          <Route path='/multiplayer' element={<Multiplayer socket={socket} />} />
          <Route path='/custom' element={<Custom socket={socket} />} />

          {/* Protected routes */}
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/' element={<ProtectedResetRoute />}>
            <Route path='/reset-password' element={<ResetPassword />} />
          </Route>
        </Routes>
    </AppProvider>
  );
}

export default App;
