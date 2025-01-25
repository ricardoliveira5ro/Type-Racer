import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/home/Home";
import Authentication from "./pages/authentication/Authentication";
import Profile from "./pages/profile/Profile";

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init();

  return (
    <div>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<Home />} />
          <Route path='/auth' element={<Authentication />} />

          {/* Protected routes */}
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
