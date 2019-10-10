import React from 'react';
import { Navbar, Button, Card, Nav, Container, Col, Row, Accordion } from 'react-bootstrap';

function PlayerCard({ name, ranking, country, age, points, urlInfo, addToList, deleteFromList }){
    return <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>
        {`Ranking: ${ranking}
        Country: ${country}
        Age: ${age}
        Points: ${points}`}
      </Card.Text>
      <Card.Link href={urlInfo}>Info</Card.Link>
      {
          addToList?<Button onClick={addToList}>Agregar a la lista</Button>:null
      }
      {
          deleteFromList?<Button onClick={deleteFromList}>Borrar de la lista</Button>:null
      }
    </Card.Body>
  </Card>
}

export default PlayerCard;