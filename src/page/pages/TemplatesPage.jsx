import { TemplatesTable } from '@/components/TemplatesTable/TemplatesTable';
import { useFetchTemplatesQuery } from '../../store/apis/templatesApi.js';
import { Trash2 } from 'lucide-react';
import { useRemoveTemplateMutation } from '../../store/apis/templatesApi.js';

export default function TemplatesPage() {
  const { data: templates, error, isLoading } = useFetchTemplatesQuery();
  const [removeTemplate, results] = useRemoveTemplateMutation();

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
