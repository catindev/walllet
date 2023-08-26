import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SignInPage = () => {
  const { isAuthenticated, SignIn, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SignIn({ username, password });
    } catch (e) {
      setError(e.error);
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Sign in</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SignInPage;