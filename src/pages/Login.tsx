console.log('login')
import UsernameForm from "../components/Username";

interface LoginProps {
  setUsername: (username: string) => void;
}

export default function Login({ setUsername }: LoginProps) {
  const handleLogin = (username: string) => {
    setUsername(username);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UsernameForm onSubmit={handleLogin} />
    </div>
  );
}