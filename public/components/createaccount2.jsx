/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Button } from 'react-bootstrap';
import { UserContext,  Cards } from './context';
import { useContext, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

function CreateAccount(){
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState(true);
  const [showModal, setShowModal] = useState(false);
    return(
    <>

      <Cards
        header="Create Account"
        status={status}
        body={show ? ( showModal ? ( <Popup setShow={setShow} setShowModal={setShowModal} /> ) : (<CreateForm setShow={setShow} setShowModal={setShowModal}/>) ) : ( <CreateMsg setShow={setShow} />)}
      />

    </>);
}

function CreateForm(props){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ctx = useContext(UserContext);


  async function Handle(){

    const url = `http://localhost:3001/account/create/${name}/${email}/${password}`
 

      fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => console.error("Error:", error));

    }



  return(
      <>
        
          <Card.Text className='txt-body'>
            Name<br/>
            <input type="input" className="from-control" id="name"
            placeholder="Enter name" value={name} onChange={ e => setName(e.currentTarget.value) }/><p/>
            
            Email Address<br/>
            <input type="input" className="from-control" id="email"
            placeholder="Enter email" value={email} onChange={ e => setEmail(e.currentTarget.value) }/><p/>
            
            Password<br/>
            <input type="input" className="from-control" id="password"
            placeholder="Enter Password" value={password} onChange={ e => setPassword(e.currentTarget.value) }/><p/>

            <button type="submit" className="btn btn-primary" onClick={() => {
              Handle();
              props.setShowModal(true);
              }}>Create</button>
          </Card.Text>
        
  </>);
}

function CreateMsg(props){
  return(
    <>
      <h5>Success</h5>
      <p/>
      <Button type='submit' className='btn btn-primary'
      onClick={ () => props.setShow(true)}>Add another account</Button>
  </>);
}

function Popup(props) {
  const [show, setShow] = useState(true);

  return (
    <>
      <Modal  className='justify-content-center' show={show} onHide={setTimeout(() => {
                                  setShow(false);
                                  props.setShowModal(false);
                                  props.setShow(false);
                                  }, 8000)} animation={true}>
        <Modal.Header className='justify-content-center'>
          <Modal.Title>Creating Account!</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <Spinner animation="border" variant="primary" />
          </Modal.Body>
        <Modal.Footer className='text-center justify-content-center'>
          We are setting everything up!<br/>
          This may take few seconds
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default CreateAccount