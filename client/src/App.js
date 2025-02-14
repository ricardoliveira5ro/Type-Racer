import { AppProvider } from "./context/AppContext";

import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { ProtectedResetRoute } from "./components/ProtectedResetRoute/ProtectedResetRoute";

import Home from "./pages/home/Home";
import Authentication from "./pages/authentication/Authentication";
import Profile from "./pages/profile/Profile";
import ResetPassword from "./pages/reset/ResetPassword";

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
