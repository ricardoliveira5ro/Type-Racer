import { Navigate, Route, Routes } from "react-router-dom";
import Lobby from "./components/lobby/Lobby";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/home' element={<Lobby />} />
    </Routes>
  );
}

export default App;
