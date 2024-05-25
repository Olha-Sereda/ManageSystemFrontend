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

export default function ServicePage() {
  const { id } = useParams(); // Access the id parameter from the URL
  const { data: services, error, isLoading: isServicesLoading, ...rest } = useFetchServicesQuery(id);
  const [removeService] = useRemoveServiceMutation();
  const [startService, { isLoading: isStartServiceLoading }] = useStartServiceMutation();
  const [stopService, { isLoading: isStopServiceLoading }] = useStopServiceMutation();

  console.log('Services', services, rest);
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
            await startService(serviceId);
            // Handle success
          } catch {
            // Handle error
          }
        };
        return <Play onClick={handleStart} />;
      },
    },
    {
      accessorKey: 'stop',
      header: 'Stop',
      cell: ({ row }) => {
        const serviceId = row.original.id;
        const handleStop = async () => {
          try {
            await stopService(serviceId);
            // Handle success
          } catch {
            // Handle error
          }
        };
        return (
          <div>
            <Pause onClick={handleStop}>Tests</Pause>
          </div>
        );
      },
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
      cell: ({ row }) => {
        const handleDelete = async () => {
          await removeService({ serverId: id, serviceId: row.original.id });
          console.log('Delete is made.', { serviceId: row.original.id });
        };
        return <Trash2 onClick={handleDelete} />;
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
