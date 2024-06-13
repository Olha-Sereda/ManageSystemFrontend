import { useParams } from 'react-router-dom';
import { useRemoveServiceMutation, useStopServiceMutation } from '../../store/apis/servicesApi.js';
import { ServiceTable } from '@/components/ServiceTable/ServiceTable.jsx';
import { useFetchServicesQuery } from '../../store/apis/servicesApi.js';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Play } from 'lucide-react';
import { Pause } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useStartServiceMutation } from '@/store/apis/servicesApi.js';
import { useUserRoles } from '@/hooks/useUserRoles';
import React, { useState } from 'react';

export default function ServicePage() {
  const { id } = useParams(); // Access the id parameter from the URL
  const { data: services, error, isLoading: isServicesLoading, ...rest } = useFetchServicesQuery(id);
  const [removeService] = useRemoveServiceMutation();
  const [startService] = useStartServiceMutation();
  const [stopService] = useStopServiceMutation();
  const { checkRole } = useUserRoles();
  const Role = checkRole('ROLE_ADMIN');
  console.log('Role:', Role);
  const [errorS, setErrorS] = useState(null);

  const columns = [
    {
      accessorKey: 'service_name',
      header: 'Service Name',
    },
    {
      accessorKey: 'start',
      header: 'Start',
      cell: ({ row }) => {
        const serviceId = row.original.id;
        const handleStart = async () => {
          try {
            const response = await startService(serviceId);
            if (response === 0) {
              setErrorS('An error occurred while starting the service.');
            }
          } catch {
            setErrorS('An error occurred while starting the service.');
          }
        };
        return Role ? (
          <div className="transform transition-transform duration-500 hover:scale-110 active:scale-90">
            <Play onClick={handleStart} />
          </div>
        ) : null;
      },
    },
    {
      accessorKey: 'stop',
      header: 'Stop',
      cell: ({ row }) => {
        const serviceId = row.original.id;
        const handleStop = async () => {
          try {
            const response = await stopService(serviceId);
            if (response === 0) {
              setErrorS('An error occurred while stopping the service.');
            }
          } catch {
            setErrorS('An error occurred while stopping the service.');
          }
        };
        return Role ? (
          <div className="transform transition-transform duration-500 hover:scale-110 active:scale-90">
            <Pause onClick={handleStop}>Tests</Pause>
          </div>
        ) : null;
      },
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
      cell: ({ row }) => {
        const handleDelete = async () => {
          await removeService({ serverId: id, serviceId: row.original.id });
        };
        return Role ? (
          <div className="transform transition-transform duration-500 hover:scale-110 active:scale-90">
            <Trash2 onClick={handleDelete} />
          </div>
        ) : null;
      },
    },
    {
      accessorKey: 'tests',
      header: 'Tests',
      cell: () => {
        const handleGoToTests = () => {};
        return (
          <Link to={`/tests/`}>
            <Button onClick={handleGoToTests}>Tests</Button>
          </Link>
        );
      },
    },
  ];

  if (isServicesLoading) {
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
