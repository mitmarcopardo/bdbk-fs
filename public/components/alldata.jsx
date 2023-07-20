import { useEffect, useState } from "react";


function AllData(){
    const [data, setData] = useState('');

    useEffect( () => {
        fetch('http://localhost:3001/account/all')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setData(JSON.stringify(data));
        });
    }, []);

    return(
    <>
    <h1> AllData Page</h1>
    {data};
    </>);
}

export default AllData