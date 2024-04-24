import React from 'react';
import { Button, Card } from 'react-bootstrap';

function Cardh(props) {
  return (
    <Card style={{ width: '25rem', boxShadow:'1px 1px 3px black',backgroundColor:'#292B2C', height:'auto',borderRadius:'7px', padding:'5px'}}>
      <div className="img-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <Card.Img 
          variant="top" 
          src={props?.card_image} 
          className='img_contri' 
          style={{ width:'150px', height:'170px', borderRadius:'10px', alignContent:'center',top:'10px',position:'relative'}} 
        />
      </div>
      <Card.Body style={{color:'white',top:'20px',position:'relative',textAlign:'center'}}>
        <Card.Title>{props?.card_name}</Card.Title>
        <Card.Text>
          Git Id: {props?.git_id}
        </Card.Text>
        <Button style={{backgroundColor:'#169CF3',borderColor:'#169CF3',color:'white',top:'-10px',position:'relative',left:'40px'}}>Open Git</Button>
      </Card.Body>
    </Card>
  );
}

export default Cardh;
