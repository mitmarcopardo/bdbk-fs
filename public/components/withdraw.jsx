/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { UserContext, Cards } from "./context";
import { Card, Button } from "react-bootstrap";
import { useContext, useState } from "react";

function Withdraw(){
    const [amount, setAmount] = useState('');
    const [show, setShow] = useState();
    const [status, setStatus] = useState('');
    const ctx = useContext(UserContext);
    console.log(Object.keys(ctx.currentUser).length);

    function Update(){
        if (!validateField(amount, 'deposit'))       return;
        if (!validateFieldupper(amount, 'deposit'))       return;
    }
    
    function validateField(field, label){
        if (!field){
            setStatus('Error: ' + label + ' is empty');
            setTimeout( () => setStatus(''),3000);
            return false;
        }
        return true;
    }
    
    function validateFieldupper(field){
        if (field > 0){
            ctx.currentUser.balance = ctx.currentUser.balance + amount;
            setStatus('Depsit done!');
            ctx.userHistory.push(`Deposit: +${amount}`);
            console.log(ctx.hst);
            setAmount('')
            setTimeout( () => setStatus(''),2000);
            return true;}
        if (field == 0){
            setStatus('Error: an amount of 0 cant be deposit');
            setTimeout( () => setStatus(''),3000);
            return false;}
        if (field < 0){
            setStatus('Error: an amount lower than 0 cant be deposit');
            setTimeout( () => setStatus(''),3000);
            return false;}
    }

    return(
        <>
            <Cards
                header={Object.keys(ctx.currentUser).length > 0 ? 'Transaction: Deposit' : 'Login Page' } 
                status={status}
                body={Object.keys(ctx.currentUser).length > 0 ? <DepositForm setShow={setShow}/> : <LoginForm setShow={setShow}/> } 
            />
        </>
);
        
}
function DepositForm(props){
    const [email, setEmail] = useState('');
    const [balance, setBalance] = useState(0);
    const ctx = useContext(UserContext);

    
  
    function handle(){
      
      props.setShow(true);
      ctx.currentUser = ctx.users[0];
      console.log(ctx.currentUser);
    }
  
    return(
        <>    
            <Card.Text className='txt-body'>
              Email Address<br/>
              <input type="input" className="from-control" id="email"
              placeholder="Enter email" value={email} onChange={ e => setEmail(e.currentTarget.value) }/><p/>
  
              <button type="submit" className="btn btn-primary" onClick={() => {ctx.currentUser.balance += setBalance }}>Deposit</button>
            </Card.Text>
          
    </>);
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


export default Withdraw