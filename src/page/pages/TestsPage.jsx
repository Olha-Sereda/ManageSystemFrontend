import { TemplatesTable } from '@/components/TemplatesTable/TemplatesTable';
import { useFetchTestsQuery } from '../../store/apis/templatesApi.js';
import { Trash2 } from 'lucide-react';
import { useRemoveTestsMutation } from '../../store/apis/templatesApi.js';

export default function TestsPage() {
  const { data: templates, error, isLoading } = useFetchTestsQuery();
  const [removeTemplate, results] = useRemoveTestsMutation();

  const columns = [
    {
      accessorKey: 'template_name',
      header: 'Template Name',
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
          await removeTemplate({ templateId: row.original.id });
          // console.log('Delete is made.', { serviceId: row.original.id });
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

  return <TemplatesTable columns={columns} templatesData={templates} />;
}
