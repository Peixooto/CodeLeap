import { useState, FormEvent } from "react";

interface UsernameFormProps {
  onSubmit: (username: string) => void;
}

export default function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      onSubmit(username.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-lg flex flex-col gap-4"
    >
      <h1 className="text-lg font-bold">Welcome to CodeLeap network!</h1>
      <label className="text-sm text-gray-700">
        Please enter your username
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="John doe"
        className="border border-gray-500 rounded-lg px-3 py-2 outline-none"
      />
      <button
        type="submit"
        disabled={!username.trim()}
        className={`px-6 py-1 text-white font-semibold rounded-lg transition w-[30%] self-end ${
          username.trim()
            ? "bg-blue-400 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        ENTER
      </button>
    </form>
  );
}
