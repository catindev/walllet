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
      {/* <WithdrawalMenu/> */}
    </InnerPageLayout>
  );
};

export default WithdrawalPage;