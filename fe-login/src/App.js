import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from './route/PrivateRoute';
import api from './utils/api';


function App() {
  const [ user, setUser ] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => { 
    // 토큰을 통해 유저정보를 가지고 온다
    try{  
      const storedToken = sessionStorage.getItem("token");
      if(storedToken){
        const response = await api.get("/user/me");
        setUser(response.data.user);
        console.log("rrrr", response)
      }
    }catch(error){
      setUser(null);
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  // 로그아웃
  const handleLogout = () =>{
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    console.log(user.name,"logged out")
  }

  return (
    <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <TodoPage handleLogout={handleLogout} />
            </PrivateRoute>
          }
        />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage setUser={setUser} user={user}/>} />
    </Routes>
  );
}

export default App;
