import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from "./components/AuthProvider";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
        </BrowserRouter>
      </div>

    </AuthProvider>
  );
}

export default App;
