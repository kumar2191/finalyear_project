import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/index'
import StudentProfile from './Pages/StudentProfile';
import NotFound from './Pages/404Page/Index'
import StaffProfile from './Pages/Staff/StaffProfile/Index'
import HodProfile from './Pages/HOD/Index'
function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/StudentProfile" element={<StudentProfile />} />
          <Route path="/StaffProfile" element={<StaffProfile />} />
          <Route path="/hod" element={<HodProfile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
