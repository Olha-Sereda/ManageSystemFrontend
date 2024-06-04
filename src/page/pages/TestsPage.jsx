import { TestsTable } from '@/components/TestsTable/TestsTable';
import { useFetchTestsQuery } from '../../store/apis/testsApi.js';
import { Trash2 } from 'lucide-react';
import { useRemoveTestMutation } from '../../store/apis/testsApi.js';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';

export default function TestsPage() {
  const { data: tests, error, isLoading } = useFetchTestsQuery();
  const [removeTest, results] = useRemoveTestMutation();

  const columns = [
    {
      accessorKey: 'test_name',
      header: 'Test Name',
    },
    {
      accessorKey: 'test_code',
      header: 'Test code',
    },
    {
      accessorKey: 'expected_answer',
      header: 'Expected answer',
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
      cell: ({ row }) => {
        const handleDelete = async () => {
          await removeTest({ testId: row.original.id });
        };
        return <Trash2 onClick={handleDelete} />;
      },
    },
    {
      accessorKey: 'tests',
      header: 'Tests',
      cell: ({ row }) => {
        const handleGoToResultlog = () => {};
        return (
          <Link to={`/test/${row.original.id}/resultlog`}>
            <Button onClick={handleGoToResultlog}>ResultLog</Button>
          </Link>
        );
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <TestsTable columns={columns} testsData={tests} />;
}
