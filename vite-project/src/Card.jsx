import React from "react";
import { Button, Card } from "react-bootstrap";

function Cardh(props) {
  const gitUrl = `https://github.com/${props?.git_id}`;
  console.log(gitUrl);
  return (
    <Card className="card-container">
      <div className="img-container">
        <Card.Img
          variant="top"
          src={props?.card_image}
          className="img_contri"
        />
      </div>
      <Card.Body className="card-body">
        <Card.Title>{props?.card_name}</Card.Title>
        <Card.Text>Roll No: {props?.roll}</Card.Text>
        <a href={gitUrl} target="_blank">
          <Button className="card-button">Open GitHub</Button>
        </a>
      </Card.Body>
    </Card>
  );
}

export default Cardh;
