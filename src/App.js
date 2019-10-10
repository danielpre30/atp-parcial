import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button, Card, Nav, Container, Col, Row, Accordion } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react'
import Axios from "axios";
import PlayerCard from './components/PlayerCard';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      options: [],
      selectedPlayers: [],
      error: false,
      errorInfo: ""
    }
  }
  componentDidMount = () => {
    Axios.get("https://dwaapi.juvasquez88.now.sh/atp")
      .then(response => {
        this.setState(state => {
          return {
            ...state,
            players: response.data.atp.players,
            options: response.data.atp.options
          }
        })
      }
      );
  }

  addToList = (player) => {
    const { error, errorInfo } = this.state;
    this.setState(state => {
      const { selectedPlayers } = state;
      if (selectedPlayers.some(currentPlayer => currentPlayer.name === player.name)) {
        return {
          ...state,
          error: true,
          errorInfo: "Jugador ya ha sido agregado"
        }
      }
      if (selectedPlayers.length < 5) {
        return {
          ...state,
          selectedPlayers: [...selectedPlayers, player],
          error: false,
          errorInfo: ""
        }
      }
      else {
        return {
          ...state,
          error: true,
          errorInfo: "La lista está llena"
        }
      }
    })
  }
  deleteFromList = (player) => {
    this.setState(state => {
      return {
        ...state,
        error: false,
        errorInfo: "",
        selectedPlayers: state.selectedPlayers.filter(currentPlayer => currentPlayer.name !== player.name)
      }
    })
  }
  render() {
    const { players, options, selectedPlayers, error, errorInfo } = this.state;
    return (
      <div className="App">
        {error && <SweetAlert type='error'
        title= 'Oops...'
        text='Something went wrong!' />}
        <Navbar>
          <Navbar.Brand>ATP</Navbar.Brand>
          <Navbar.Collapse>
            {options.map(option =>
              <Nav>
                <Nav.Link>{option}</Nav.Link>
              </Nav>)}
          </Navbar.Collapse>
        </Navbar>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Lista 1
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Container>
                  <Row>
                    {players.map((player, index) =>
                      <Col key={index} xs="12" sm="6">
                        <PlayerCard name={player.name} ranking={player.ranking} country={player.country} age={player.age} points={player.points} urlInfo={player.urlInfo} addToList={e => {
                          this.addToList(player)
                        }} />
                      </Col>

                    )}
                  </Row>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Lista 2
      </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Container>
                  <Row>
                    {selectedPlayers.map((player, index) =>
                      <Col key={index} xs="12" sm="6">
                        <PlayerCard name={player.name} ranking={player.ranking} country={player.country} age={player.age} points={player.points} urlInfo={player.urlInfo} deleteFromList={e => {
                          this.deleteFromList(player)
                        }} />
                      </Col>

                    )}
                  </Row>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

      </div>
    );
  }
}

export default App;
