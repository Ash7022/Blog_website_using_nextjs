import React from 'react'
import Link from 'next/dist/client/link'
import { Card, Container,ListGroup } from "react-bootstrap"

export default function index ({ users = [] }) {
    if (users.length === 0) {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        There are no users present. if you want to create a blog then
                    </Card.Text>
                    <Card.Link href="/user/login">Create Blog</Card.Link>

                </Card.Body>
            </Card>
        )
    }
    return (
        <Container>
            {users && users.map((user)=>(
            <Card key={user._id} style={{ width: '18rem' }}>
                <Card.Header>Bloggers</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><Link href={`/users/${user._id}`}>
           <a>{user.name}</a></Link></ListGroup.Item>

                </ListGroup>
            </Card>
            ))}
        </Container>
    )
}

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/users");
    const users = await response.json();

    return {
        props: {
            users,
        },
    }
}