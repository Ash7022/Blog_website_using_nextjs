import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { Button, Card, } from "react-bootstrap"
import Error from "next/error";

const Task = ({ task, error }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { push, query } = useRouter();

    const deleteTask = async () => {
        const { id } = query;
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: "DELETE",

            })
            console.log(id)
        } catch (error) {
            console.log(error)
        }
    };

    const open = () => setConfirm(true);
    const close = () => setConfirm(false);

    const handleDelete = async () =>{
        setIsDeleting(true);
        await deleteTask();
        console.log("successfully deleted" )
        await push("/");

    };

    if(error && error.statusCode) {
         return  <Alert  variant={danger}>
         {error.statusCode}
       </Alert>
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
            <Card>
                <Card.Header>DELETE</Card.Header>
                <Card.Body>
                    <Card.Title>want to delete</Card.Title>
                    <Button variant="danger" onClick={handleDelete} >delete</Button>
                </Card.Body>
            </Card>
        </div>
    )
};

export async function getServerSideprops({ query: { id } }) {

    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

    if (res.status === 200) {
        const task = await res.json();
        return {
            props: {
                task,
            },
        };
    }
    return {
        props: {
            error: {
                statusCode: res.status,
                statusText: "invalid ID"
            },
        },
    };
}

export default Task;



