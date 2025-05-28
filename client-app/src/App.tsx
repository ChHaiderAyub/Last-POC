import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';
import AllUsers from './Components/AllUsers';
import UserDetails from './Components/UserDetails';
import Register from './Pages/Register';
import LogIn from './Pages/LogIn';
import ServiceProvider from './Components/ServiceProvider';
import CustomerUsers from './Components/CustomerUsers';
// import CustomerUsers from './Pages/admin/CustomerUsers'; // Uncomment when ready

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<AllUsers />} />
          <Route path="users/details/:id" element={<UserDetails />} />
          <Route path="service-providers" element={<ServiceProvider />} />
          <Route path="customers" element={<CustomerUsers />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
