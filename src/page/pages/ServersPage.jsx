import {useEffect, useState} from "react";
import {ServersTable} from "@/components/ServersTable/ServersTable.jsx";
import {columns} from "@/components/ServersTable/columns.jsx";
import { useFetchServersQuery } from "../../store/apis/serversApi";

export default function ServersPage() {

    const { data: servers, error, isLoading } = useFetchServersQuery();

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
        <ServersTable serversData={servers} columns={columns} />
       
    )
}