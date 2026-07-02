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
    <div>
      <h1>Learn Lingo Firebase Auth Test</h1>

      <p>Auth: {isAuth ? 'Yes' : 'No'}</p>
      <p>User ID: {user?.userId ?? 'No user'}</p>
      <p>User email: {user?.email ?? 'No email'}</p>
      <p>User name: {user?.displayName ?? 'No name'}</p>

      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
