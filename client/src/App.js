import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
}

export default App;
