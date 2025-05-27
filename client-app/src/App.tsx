import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';
import AllUsers from './Components/AllUsers';
import Register from './Pages/Register';
import LogIn from './Pages/LogIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin" element={<AdminDashboard />}>
          {/* Nested Routes inside Admin Dashboard */}
          <Route path="users" element={<AllUsers />} />
          {/* You can add more like: */}
          {/* <Route path="services" element={<Services />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
