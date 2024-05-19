import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';

export const columns = [
  {
    accessorKey: 'server_name',
    header: 'Server Name',
  },
  {
    accessorKey: 'fqdn',
    header: 'fqdn',
  },
  {
    accessorKey: 'port',
    header: 'port',
  },
  {
    accessorKey: 'id',
    header: 'Services',
    cell: ({ getValue }) => {
      const handleGoToService = () => {};
      return (
        <Link to={`/server/${getValue()}`}>
          <Button onClick={handleGoToService}> Services</Button>
        </Link>
      );
    },
  },
];
