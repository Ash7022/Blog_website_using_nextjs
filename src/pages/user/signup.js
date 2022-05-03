import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useRouter } from "next/router"
import Link from 'next/dist/client/link'

const login = () => {
  const [newData,setNewData] = useState({
    name:"",
    email:"",
    password:"",
  })
  const router = useRouter();
  const { name,email, password } = newData;


  const handleSubmit = async (e)=>{
    e.preventDefault();
     try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method:"POST",
        headers:{
          "content-Type": "application/json"
        },
        body:JSON.stringify(newData)
      })

      const json = await response.json();
      console.log(json);
      if (json.id){
        //redirect
        localStorage.setItem('id', json.id);
        console.log(json);
        router.push("/tasks/new");

    }
    else{
    console.log("error");
    }

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
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Name"  onChange={handleChange} value={name} name="name"/>
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
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    </div>
  )
}

export default login