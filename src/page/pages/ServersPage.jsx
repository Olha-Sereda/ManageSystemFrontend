import {useEffect, useState} from "react";
import axios from 'axios';
import {ServersTable} from "@/components/ServersTable/ServersTable.jsx";
import {columns} from "@/components/ServersTable/columns.jsx";


export default function ServersPage() {

    const[serversData, ServersDataSet] = useState([]);
    const [term , setTerm] = useState("")
    const handleSubmit = (term) =>{

        console.log('Do a search with', term);
        setTerm(term)
    }

    useEffect( function () {
        getServersData()
    }, [term]);

    const getServersData = async () => {
        const response = await axios.get('http://localhost:8000/api/server');
        console.log("Response", response)
        ServersDataSet(response.data)
    }

    // const list = serversData.map((server) => {
    //     console.log(server)
    //     function handleClick(){
    //
    //     }
    //     return (
    //         <tr key={server.id}>
    //             <td>{server.serverName}</td>
    //             <td>{server.fqdn}</td>
    //             <td>{server.ipAddress}</td>
    //             <td>Status</td>
    //             <td><Button onClick={handleClick}>Services</Button></td>
    //         </tr>
    //     )
    //
    // })

    return (
        <ServersTable serversData={serversData} columns={columns} />
       
    )
}