import { TestsTable } from '@/components/TestsTable/TestsTable';
import { useFetchTestsQuery } from '../../store/apis/testsApi.js';
import { Trash2 } from 'lucide-react';
import { useRemoveTestMutation } from '../../store/apis/testsApi.js';

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
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <TestsTable columns={columns} testsData={tests} />;
}
