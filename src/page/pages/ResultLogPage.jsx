import { ResultLogTable } from '@/components/ResultLogTable/ResultLogTable.jsx';
import { useFetchTestLogsQuery } from '../../store/apis/resultLogApi.js';
import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const formatDate = (datetime) => {
  const date = new Date(datetime.date);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};
const Cell = ({ cell: { value } }) => (value ? <Check /> : <X />);

Cell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.bool.isRequired,
  }).isRequired,
};

export default function ResultLogPage() {
  const { testId } = useParams();
  const { data: resultlogs = [], error, isLoading } = useFetchTestLogsQuery(testId);

  const formattedResultLogs = resultlogs.map((log) => ({
    ...log,
    datetime_execution: formatDate(log.datetime_execution),
  }));
  console.log('resultLog', resultlogs);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const columns = [
    {
      accessorKey: 'execution_answer',
      header: 'Execution Answer',
    },
    {
      accessorKey: 'datetime_execution',
      header: 'Datetime Execution',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: Cell,
    },
  ];

  return <ResultLogTable columns={columns} resultlogs={formattedResultLogs} />;
}
