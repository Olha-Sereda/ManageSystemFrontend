import { TemplatesTable } from '@/components/TemplatesTable/TemplatesTable';
import { useFetchTemplatesQuery } from '../../store/apis/templatesApi.js';

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
];

export default function TestsPage() {
  const { data: templates, error, isLoading, ...rest } = useFetchTemplatesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <TemplatesTable columns={columns} templatesData={templates} />;
}
