import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {ServiceTable} from "@/components/ServiceTable/ServiceTable.jsx";
import {columns} from "@/components/ServiceTable/columns.jsx";
import { BadgePlus } from 'lucide-react';
import { DialogDemo } from "../../components/AddTestForm/AddTestForm";

export default function ServicePage() {
    const [servicesData, setServicesData] = useState([]);
    const { id } = useParams(); // Access the id parameter from the URL
    const [term, setTerm] = useState("");

    const handleSubmit = (term) => {
        console.log('Do a search with', term);
        setTerm(term);
    }

    useEffect(() => {
        getServicesData(); // Call getServiceData initially
    }, [term]); // Run useEffect whenever the term changes

    const getServicesData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/server/${id}`);
            console.log("Services", response.data);
            setServicesData(response.data);
        } catch (error) {
            console.error('Error fetching service data:', error);
        }
    }

    return (
        <>
        <ServiceTable servicesData={servicesData} columns={columns} />

        <DialogDemo>
            <BadgePlus />
       </DialogDemo>
        </>
    );
}