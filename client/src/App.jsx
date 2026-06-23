import React, { useState } from 'react';
import Login from './pages/Login'; // Path check karein
import Dashboard from './pages/Dashboard'; // Path check karein

export default function App() {
  const [user, setUser] = useState(null);

  // Jab login button dabega, ye function chalega
  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} setUser={setUser} />
      )}
    </div>
  );
}  
