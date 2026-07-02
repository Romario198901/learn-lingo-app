import { useQuery } from '@tanstack/react-query';
import { getTeachers } from '../services/teachers/teacherService';
import Loader from '../components/Loader/Loader';

export default function TeachersPage() {
  const {
    data: teachers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['teachers'],
    queryFn: getTeachers,
  });

  if (isLoading) return <Loader />;
  if (isError) return;
  return (
    <div>
      <h1>Teachers Page</h1>

      <p>Total teachers: {teachers.length}</p>

      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            {teacher.name} {teacher.surname} — ${teacher.price_per_hour}
          </li>
        ))}
      </ul>
    </div>
  );
}
