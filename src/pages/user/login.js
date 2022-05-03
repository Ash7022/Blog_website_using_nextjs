import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useRouter } from "next/router"

const login = () => {
  const [newData,setNewData] = useState({
    email:"",
    password:"",
  })
  const router = useRouter();
  const { email, password } = newData;
  

  const handleSubmit = async (e)=>{
    e.preventDefault();
     try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method:"POST",
        headers:{
          "content-Type": "application/json"
        },
        body:JSON.stringify(newData)
      })
      const json = await response.json();
      
      if (json.id){
        //redirect
        localStorage.setItem('id', json.id);
        router.push("/tasks/new");

    }
    else{
    console.log("error");
    }

      await router.push("/tasks/new");
    } catch (error) {
      console.log(error)
    }

    

  }
  const handleChange= (e) => {
    const {name, value} = e.target;
    setNewData({...newData,[name]:value})

  }
  return (
    <div>
        <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  onChange={handleChange} value={email} name="email"/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"  onChange= {handleChange} value={password} name="password"/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <a href='/user/signup'>if Don't have have account</a>
</Form>
    </div>
  )
}

export default login