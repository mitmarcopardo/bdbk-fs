/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { UserContext, Cards } from "./context";
import { Card, Button } from "react-bootstrap";
import { useContext, useState } from "react";

function Login(){
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState();
    const ctx = useContext(UserContext);
    const [showl, setShowl] = useState(ctx.loggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function loggedIn(){
        if (!validateField(email,        'email'))       return;
        if (!validateField(password,     'password'))    return;
    }

    function validateField(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout( () => setStatus(''),3000);
            return false;
        }
        return true;
    }


    return(
        <>
            <Cards
                header="Login Page"
                status=""
                body={show || ctx.loggedIn ? <LoginMsg setShow={setShow}/> : <LoginForm setShow={setShow}/>} 
            />
        </>
);
        
}
function LoginForm(props){
    const ctx = useContext(UserContext);
  
    function handle(){
      ctx.loggedIn = true;
      props.setShow(true);
      ctx.currentUser = ctx.users[0];
    }
  
    return(
        <>    
            <Card.Text className='txt-body'>
              Email Address<br/>
              <input type="input" className="from-control" id="email"
              placeholder="Enter email" value={props.email} onChange={ e => props.setEmail(e.currentTarget.value) }/><p/>
              
              Password<br/>
              <input type="input" className="from-control" id="password"
              placeholder="Enter Password" value={props.password} onChange={ e => props.setPassword(e.currentTarget.value) }/><p/>
  
              <button type="submit" className="btn btn-primary" onClick={handle}>Login</button>
            </Card.Text>
          
    </>);
  }
  
  function LoginMsg(props){
    const ctx = useContext(UserContext);
    
    return(
      <>
        <h5>Welcome {ctx.currentUser.name}</h5>
        <p/>
        <Button type='submit' className='btn btn-primary'
        onClick={ () => {
            props.setShow(false);
            ctx.loggedIn = false;
            ctx.currentUser = [];
            }}>Log Out</Button>
    </>);
  }

export default Login