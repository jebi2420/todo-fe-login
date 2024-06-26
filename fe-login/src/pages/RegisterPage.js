import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from '../utils/api';

const RegisterPage = () => {
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [secPassword, setSecPassword]=useState('');
  const [error, setError]=useState('');
  const navigate = useNavigate();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      if(password !== secPassword){
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.")
      }
       // api 호출
       const response = await api.post('/user',{name,email,password})
       // 로그인 페이지로 돌아가기
       if(response.status == 200){
        navigate('/login');
       }else{
         throw new Error(response.data.error);
       }
    }catch(error){
      setError(error.message);
    }
  }

  return (
    <div className="display-center">
      {error && <div className='red-error'>{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(e)=>setSecPassword(e.target.value)}/>
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
