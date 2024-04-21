import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { useRemoveServiceMutation } from "../../store/apis/servicesApi.js";
import {ServiceTable} from "@/components/ServiceTable/ServiceTable.jsx";
import { useFetchServicesQuery } from "../../store/apis/servicesApi.js";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import { Play } from 'lucide-react';
import { Pause } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useQueryClient } from 'react-query';


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  


export default function ServicePage() {

    const { id } = useParams(); // Access the id parameter from the URL
    const { data: services, error, isLoading } = useFetchServicesQuery(id);
    const [removeService, results] = useRemoveServiceMutation();
    const queryClient = useQueryClient();



    const columns= [
      {
          accessorKey: "service_name",
          header: "Service Name",
      },
      {
          accessorKey: "start",
          header: "Start",
          cell: ({getValue}) => {
              const handleStart = () => {
  
              }
              return(
                  <Play onClick={handleStart}/>
              )
          }
      },
      {
          accessorKey: "stop",
          header: "Stop",
          cell: ({getValue}) => {
              const handleStop = () => {
  
              }
              return(
                  <div>
                  <Pause onClick={handleStop}>Tests</Pause>
                  </div>
              )
          }
  
      },
      {
        accessorKey: "delete",
        header: "Delete",
        cell: ({row}) => {
          const handleDelete = async () => {
            await removeService({serverId: id, serviceId: row.original.id});
            console.log("Delete is made.", { serviceId: row.original.id} );
            queryClient.invalidateQueries(['fetchServices', id]);
          }
          return(
            <Trash2 onClick={handleDelete}/>
          )
        }
      },
      {
          accessorKey: "tests",
          header: "Tests",
          cell: ({getValue}) => {
              const handleGoToTests = () => {
  
              }
              return(
                  <Link to={`/tests/`}><Button onClick={handleGoToTests}>Tests</Button></Link>
              )
          }
      },
  
  ]

    const handleRemoveService = () => {
      
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
        <>
        <ServiceTable servicesData={services} columns={columns} />

        </>
    );
}