import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";

export const columns= [
    {
        accessorKey: "serviceName",
        header: "Service Name",
    },
    {
        accessorKey: "fqdn",
        header: "fqdn",
    },
    {
        accessorKey: "ipAddress",
        header: "IP address",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "id",
        header: "Services",
        cell: ({getValue}) => {
            const handleGoToService = () => {

            }
            return(
                <Link to={`/service/?id=${getValue()}`}><Button onClick={handleGoToService}> Services</Button></Link>
            )
        }
    },

]