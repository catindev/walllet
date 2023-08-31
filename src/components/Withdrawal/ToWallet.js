import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { useUser } from 'UserContext';
import { errors, tranferToWallet } from "api";
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import Alert from "components/Alert/Alert";

const WithdrawalPage = () => {
    const { isAuthenticated, token } = useAuth();
    const { wallets, setWallets } = useUser();
    const [payee, setPayee] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [beneficiaryAgent, setBeneficiaryAgent] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess(false);
        setError(null);
        try {
            const response = await tranferToWallet({ token, from: wallets[0].id, to: payee, amount });
            if (response.status === 100) { 
                setSuccess(true);
                setWallets([]);
                setBeneficiaryAgent(response.beneficiary_agent.name);
                setPayee("");
                setAmount("");
            }    
        } catch (error) {
            console.log("Withdrawal to wallet error", error)
            setError(error.response?.data?.error_code || 0);
        }
    };

    return (
        <InnerPageLayout title="Перевести на кошелёк" backURL="/wallets">
            <div className={formStyles.wrapper}>
                <form className={formStyles.form} onSubmit={handleSubmit}>
                    <div className={formStyles.header}>
                        <h1>Перевод на кошелёк</h1>
                        <h2>Введите номер получателя и сумму перевода</h2>
                    </div>

                    {error !== null && <Alert
                        title={errors[error].title}
                        message={errors[error].message} type="danger" />}

                    {success !== false && <Alert
                        title="Перевод прошел успешно"
                        message={`${beneficiaryAgent} получил средства на свой кошелёк`} type="success" />}

                    <div className={formStyles.group}>
                        <label htmlFor="payee">Кому отправить</label>
                        <input type="text"
                            id="payee"
                            placeholder="Номер телефона"
                            value={payee}
                            onChange={(e) => setPayee(e.target.value)}
                            required
                        />
                    </div>

                    <div className={formStyles.group}>
                        <label htmlFor="amount">Сумма перевода</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className={formStyles.footer}>
                        <button type="submit">Перевести</button>
                    </div>
                </form>
            </div>
        </InnerPageLayout>
    );
};

export default WithdrawalPage;