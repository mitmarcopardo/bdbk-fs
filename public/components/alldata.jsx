import React from "react";
import UserContext from './context.jsx';

function AllData(){

    const ctx = React.useContext(UserContext);

    return(
    <>
    <h1> AllData Page</h1>
    {JSON.stringify(ctx.users)};
    </>);
}

export default AllData