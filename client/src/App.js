import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Authentication from "./pages/authentication/Authentication";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/home' element={<Home />} />
      <Route path='/auth' element={<Authentication />} />
    </Routes>
  );
}

export default App;
