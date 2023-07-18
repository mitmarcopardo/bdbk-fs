import { Cards, UserContext } from "./context";
import { useContext } from "react";

function Balance() {
    const ctx = useContext(UserContext);

    return(
        <Cards
            bgcolor="primary"
            label = "Data"
            header = "BadBank Data Page"
            title = "Account Details"
            text = "BadBank Account Details"
            body = { (ctx.loggedIn ? (
                <>
                Name: {ctx.currentUser.map( x => x.name)}<br/>
                Email: {ctx.currentUser.map( x => x.email)}<br/>
                Password: {ctx.currentUser.map( x => x.password)}<br/>
                Balance ${ctx.currentUser.map( x => x.balance)}<br/>
                Movements: {ctx.userHistory.map( (x) =><li key={x}>{ x }</li> )}<br/>
                </>
                ) : (
                <>
                <h2>Log in to get access</h2>
                </>))}
        />
    );
}

export default Balance

