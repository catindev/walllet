import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import InnerPageLayout from "./InnerPageLayout/InnerPageLayout";

const WithdrawalPage = () => {
  const { isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <InnerPageLayout title="Перевести" backURL="/wallets">
      <div className="Form__wrapper">
        <form className="Form">
            <div className="Form__header">
                <h1>Куда хотите перевести?</h1>
            </div>
            <ul class="list-group">
                <li class="list-group-item">На другой кошелёк</li>
                <li class="list-group-item">На карту</li>
            </ul>          
        </form>
      </div>
    </InnerPageLayout>
  );
};

export default WithdrawalPage;