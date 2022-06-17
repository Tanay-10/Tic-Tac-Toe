import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Icon from "../Icon/Icon.js";

import "bootstrap/dist/css/bootstrap.css";
import { Button, Row, Col, Card, CardBody, Container } from "reactstrap";

let arr = new Array(9).fill("");

const Tic = () => {
  let [winner_message, setWinnerMesaage] = useState("");
  let [whose_turn, setWhoseTurn] = useState(true);

  //play again
  function playAgain() {
    arr.fill("");
    setWinnerMesaage("");
    setWhoseTurn(true);
  }

  //check for winner
  function checkWinner() {
    //check rows
    if (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== "") {
      setWinnerMesaage(arr[0] + " is the winner");
    } else if (arr[3] === arr[4] && arr[4] === arr[5] && arr[3] !== "") {
      setWinnerMesaage(arr[3] + " is the winner");
    } else if (arr[6] === arr[7] && arr[7] === arr[9] && arr[6] !== "") {
      setWinnerMesaage(arr[6] + " is the winner");
    }

    // check columns
    else if (arr[0] === arr[3] && arr[3] === arr[6] && arr[0] !== "") {
      setWinnerMesaage(arr[0] + " is the winner");
    } else if (arr[1] === arr[4] && arr[4] === arr[7] && arr[1] !== "") {
      setWinnerMesaage(arr[1] + " is the winner");
    } else if (arr[2] === arr[5] && arr[5] === arr[8] && arr[2] !== "") {
      setWinnerMesaage(arr[2] + " is the winner");
    }

    //check diagonals
    else if (arr[0] === arr[4] && arr[4] === arr[8] && arr[0] !== "") {
      setWinnerMesaage(arr[0] + " is the winner");
    } else if (arr[2] === arr[4] && arr[4] === arr[6] && arr[2] !== "") {
      setWinnerMesaage(arr[2] + " is the winner");
    } else if (arr.indexOf("") == -1) {
      setWinnerMesaage("Draw");
    }
  }

  //playersMove
  function playersMove(index) {
    if (winner_message) {
      return toast.error("Game is already over");
    } else if (arr[index] !== "") {
      return toast.error("This cell is already occupied");
    } else if (arr[index] === "") {
      arr[index] = whose_turn ? "Cross" : "Circle";
      setWhoseTurn(!whose_turn);
    }

    checkWinner();
  }

  return (
    <Container className="p-5">
      <ToastContainer position="top-right" />

      <Row>
        <Col md={6} className="offset-md-3">
          {winner_message ? (
            <div className="text-center">
              <h1 className="text-uppercase text-center">{winner_message}</h1>

              {/* Button to play again */}
              <Button className="Success" onClick={playAgain}>
                Play Again
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-warning">
              {whose_turn ? "Cross" : "Circle"}'s turn
            </h1>
          )}
          <div className="grid">
            {arr.map((value, index) => (
              <Card onClick={() => playersMove(index)}>
                <CardBody className="box">
                  <Icon play_icon={value} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Tic;
