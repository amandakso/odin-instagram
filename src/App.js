import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Login from './components/Login';
import Reset from './components/Reset';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
        </BrowserRouter>
      </div>

    </AuthProvider>
  );
}

export default App;
