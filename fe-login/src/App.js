import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/tasks" element={<TodoPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
