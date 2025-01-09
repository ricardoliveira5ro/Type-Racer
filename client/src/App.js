import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import Authentication from "./features/Authentication/Authentication";

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
