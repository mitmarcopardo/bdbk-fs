/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { UserContext, Cards } from "./context";
import { Card, Button } from "react-bootstrap";
import { useContext, useState } from "react";

function Login(){
    const [show, setShow] = useState(false);
    const ctx = useContext(UserContext);
    const [showl, setShowl] = useState(ctx.loggedIn);

    return(
        <>
            <Cards
                header="Login Page"
                status=""
                body={show || ctx.loggedIn ? <LoginMsg setShow={setShow}/> : <LoginForm setShow={setShow} />} 
            />
        </>
);
        
}
function LoginForm(props){
    const ctx = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);
  
    async function handle(){

      console.log('email: ', email);
      console.log('passoword: ', password);

      const url = `http://localhost:3001/account/login/${email}/${password}}`
 
      fetch(url)
      .then(response => response.json())
      .then(data => {
        ctx.currentUser = data;
        console.log(typeof(data));
        console.log(ctx.currentUser);
      })
      .then(ctx.loggedIn = true)
      .then(props.setShow(true))
      .catch((error) => console.error("Error:", error));
      ctx.currentUser = user;
    }
/*
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
*/
  
    return(
        <>    
            <Card.Text className='txt-body'>
            Email Address<br></br>
              <input type="input" className="from-control" id="email"
              placeholder="Enter email" value={email} onChange={ e => setEmail(e.currentTarget.value) }/>
              
              <p></p>Password<br></br>
              <input type="input" className="from-control" id="password"
              placeholder="Enter Password" value={password} onChange={ e => setPassword(e.currentTarget.value) }/>
  
              <p></p><button type="submit" className="btn btn-primary m-3" onClick={handle}>Login</button>
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