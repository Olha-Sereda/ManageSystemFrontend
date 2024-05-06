import { TemplatesTable } from '@/components/TemplatesTable/TemplatesTable';

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

const templatesData = [
  {
    template_name: 'Hello world!',
    test_code: 'if Hello world exists, test results in success',
    expected_answer: 'Hello worlD!',
  },
  {
    template_name: 'Test Template 1',
    test_code: 'if Test Template 1 exists, test results in success',
    expected_answer: 'Test Template 1',
  },
  {
    template_name: 'Test Template 2',
    test_code: 'if Test Template 2 exists, test results in success',
    expected_answer: 'Test Template 2',
  },
  {
    template_name: 'Test Template 3',
    test_code: 'if Test Template 3 exists, test results in success',
    expected_answer: 'Test Template 3',
  },
  {
    template_name: 'Test Template 4',
    test_code: 'if Test Template 4 exists, test results in success',
    expected_answer: 'Test Template 4',
  },
];

export default function TestsPage() {
  return <TemplatesTable columns={columns} templatesData={templatesData} />;
}
