/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Button } from 'react-bootstrap';
import { UserContext,  Cards } from './context';
import { useContext, useState } from 'react';


function CreateAccount(){
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState(true);

    return(
    <>

      <Cards
        header="Create Account"
        status={status}
        body={show ? <CreateForm setShow={setShow}/> : <CreateMsg setShow={setShow}/>}
      />

    </>);
}

function CreateForm(props){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ctx = useContext(UserContext);

  function handle(){
    const url = `http://localhost:3001/account/create/${name}/${email}/${password}`
    async (url) => {
      const res =  fetch(url);
      const data = res.json();
      console.log(data);
  }
    props.setShow(false);

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

            <button type="submit" className="btn btn-primary" onClick={handle}>Create</button>
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

export default CreateAccount