import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import EmployeeForm from './features/employees/EmployeeForm';
import EmployeeTable from './features/employees/EmployeeTable';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={
          <ProtectedRoute>
            <EmployeeTable />
          </ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}
