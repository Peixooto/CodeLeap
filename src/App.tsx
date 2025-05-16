import { useState } from "react";
import Login from "./pages/Login";
import Feed from "./pages/Feed";

function App() {
  const [username, setUsername] = useState<string>("");

  return username ? (
    <Feed currentUser={username} />
  ) : (
    <Login setUsername={setUsername} />
  );
}

export default App;
