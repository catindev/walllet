import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import { useUser } from 'UserContext';
import { tranferToWallet, getError } from "api";
import InnerPageLayout from "components/InnerPageLayout/InnerPageLayout";
import formStyles from "components/Form/form.module.css";
import Alert from "components/Alert/Alert";

const WithdrawalPage = () => {
    const { isAuthenticated, token } = useAuth();
    const { wallets, setWallets, user } = useUser();
    const [payee, setPayee] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [beneficiaryAgent, setBeneficiaryAgent] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const navigate = useNavigate();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Перевод доступен только пользователям с идентификацией
    if (user?.agent.status === 1) {
        return <Navigate to="/wallets" replace />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setInProgress(true);
        setSuccess(false);
        setError(null);
        try {
            const response = await tranferToWallet({ token, from: wallets[0].id, to: payee, amount });
            if (response.status === 100) {
                setSuccess(true);
                setBeneficiaryAgent(response.beneficiary_agent.name);
                setPayee("");
                setAmount("");
            }
        } catch (error) {
            console.log("Withdrawal to wallet error", error)
            setError(getError(error.response?.data?.error_code));
        }
        setInProgress(false);
    };

    const goBack = () => {
        setWallets([]);
        navigate("/wallets");
    }

    return (
        <InnerPageLayout title="Перевести на кошелёк" backFn={goBack}>
            <div className={formStyles.wrapper}>
                <form className={formStyles.form} onSubmit={handleSubmit} disabled={inProgress}>
                    <div className={formStyles.header}>
                        <h1>Перевод на кошелёк</h1>
                        <h2>Введите номер получателя и сумму перевода</h2>
                    </div>

                    {error !== null && <Alert type="danger"
                        title={error.title}
                        message={error.message}/>}

                    {success !== false && <Alert type="success"
                        title="Средства отправлены"
                        message={`${beneficiaryAgent} получит перевод на свой кошелёк`} />}

                    <div className={formStyles.group}>
                        <label htmlFor="payee">Кому отправить</label>
                        <input type="tel"
                            id="payee"
                            placeholder="770112345678"
                            value={payee}
                            onChange={(e) => setPayee(e.target.value)}
                            pattern="^7(70[0-9]|771|775|776|777|778)\d{7}$"
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
                            pattern="^(?!0[0-9])(\d{1,12})(\.\d{1,2})?$"
                            required
                        />
                    </div>

                    <div className={formStyles.footer}>
                        <button type="submit">
                            {!inProgress && "Перевести"}
                            {inProgress && "Переводим..."}
                        </button>
                    </div>
                </form>
            </div>
        </InnerPageLayout>
    );
};

export default WithdrawalPage;