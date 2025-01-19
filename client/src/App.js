import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Authentication from "./pages/authentication/Authentication";

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init();

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/home' element={<Home />} />
      <Route path='/auth' element={<Authentication />} />
    </Routes>
  );
}

export default App;
