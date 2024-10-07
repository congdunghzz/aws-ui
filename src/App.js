
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Home from './pages/home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
