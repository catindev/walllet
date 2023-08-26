import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SignUpPage = () => {
  const { isAuthenticated, login } = useAuth();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  if (isAuthenticated) {
    return <Navigate to="/wallets" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ phone });
    } catch (e) {
      setError(e.error);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        <button type="submit">Send SMS</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SignUpPage;