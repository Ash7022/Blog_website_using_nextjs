import { React, useState, useEffect } from 'react'


import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router"


const CreatingTask = () => {
  const [newTask, setNewtask] = useState({
    title: "",
    description: ""
  });
  const { title, description } = newTask;

  const { push, query } = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const getTask = async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const data = await response.json();
    setNewtask({title:data.title,description:data.description});

  };
  useEffect(() => {
    if(query.id) getTask();
  }, [query.id]);
  

  const Validate = () => {
    let errors = {};
    if(!title){
      errors.title = "Title is Required"
    }
    if(!description){
      errors.description = "Description is Required"
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = Validate();

    if(Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if(query.id) {
      await updateTask();
    } else{
      await createTask();
    }
    await push("/");

  }
  const updateTask = async() => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method:"PUT",
        headers:{
          "content-Type": "application/json",
          
        },
        body:JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const createTask = async() => {
    try {
      newTask["user-id"]=localStorage.getItem('id')
      await fetch("http://localhost:3000/api/tasks", {
        method:"POST",
        headers:{
          "content-Type": "application/json",
         
        },
        body:JSON.stringify(newTask)
      })
      console.log(newTask);
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewtask({...newTask, [name]:value})
   }
  return (
    <div className='grid'>
      <div className="row">

        <div className="column">
          <h1>{query.id ? "Update Task": "Create Task"}</h1>
          <div>
            {isSubmit ? (console.log("pending")) : (
              <Form onSubmit={handleSubmit}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" error={errors.title ? {content:"Please enter a title"}:null} name='title' onChange={handleChange} value={title} autoFocus />
                <Form.Label>description</Form.Label>
                <Form.Control type="textArea" error={errors.description ? {content:"Please enter a description"}:null} placeholder="Enter description" name='description' onChange={handleChange} value={description} />
                <Button variant="primary" type="submit">
                  {query.id ? "Update": "Submit"}
                </Button>



              </Form>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatingTask;