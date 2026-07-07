import Button from '../components/ui/Button/Button';
import Container from '../components/ui/Container/Container';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const { user, isAuth, isLoading, register, login, logout } = useAuth();

  const handleRegister = async () => {
    await register({
      name: 'Roman',
      email: 'test@gmail.com',
      password: '123456',
    });
  };

  const handleLogin = async () => {
    await login({
      email: 'test@gmail.com',
      password: '123456',
    });
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div>
        <h1>Learn Lingo Firebase Auth Test</h1>

        <p>Auth: {isAuth ? 'Yes' : 'No'}</p>
        <p>User ID: {user?.userId ?? 'No user'}</p>
        <p>User email: {user?.email ?? 'No email'}</p>
        <p>User name: {user?.displayName ?? 'No name'}</p>

        <Button variant='primary' onClick={handleRegister}>Register</Button>
        <Button variant='secondary' onClick={handleLogin}>Login</Button>
        <Button variant='ghost' onClick={handleLogout}>Logout</Button>
      </div>
    </Container>
  );
}
