import{Button, Card, Container} from "react-bootstrap"
import Link from "next/link"
import {useRouter} from "next/router"


export default function Home({tasks = []}) {

  const {query} = useRouter();
  const {id} = query;
  
  if(tasks.length===0){
    return(
      <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
     There is no tasks present. please create a new one
    </Card.Text>
    <Card.Link href="/tasks/new">Create Tasks</Card.Link>
    
  </Card.Body>
</Card>
    )
  }
  return (
   <Container>
     {tasks && tasks.map((task)=>(
       <Card key={task._id} style={{ width: '18rem' }}>
       <Card.Body>
         <Card.Title><Link href={`/tasks/${task._id}`}>
           <a>{task.title}</a>
           </Link></Card.Title>
         <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
         <Card.Text>
          {task.description}
         </Card.Text>
         <Card.Link href={`/tasks/${task._id}`}>view</Card.Link>
         <Card.Link href={`/tasks/${task._id}/edit`}>edit</Card.Link>
       </Card.Body>
     </Card>
     ))}
     
   </Container>
  )
}

export async function getServerSideProps({ query: { id } }) {
  const response = await fetch (`http://localhost:3000/api/users/${id}`);
  const tasks = await response.json();

  return {
    props: {
      tasks,
    },
  }
}
