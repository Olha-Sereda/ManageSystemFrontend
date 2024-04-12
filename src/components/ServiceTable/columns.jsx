import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import { Play } from 'lucide-react';
import { Pause } from 'lucide-react';
import { Trash2 } from 'lucide-react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export const columns= [
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
        cell: ({getValue}) => {
            const handleDelete = () => {

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