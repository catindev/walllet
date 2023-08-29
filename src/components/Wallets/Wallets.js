import WalletLink from "./WalletLink";
import { formatAmount } from "../../utils";

const Wallet = (wallet, index) => {
  const amount = formatAmount(wallet.amount);
  
  return (
    <WalletLink
      key={wallet.id}
      id={wallet.id}
      index={index}
      amount={amount}
      currency={wallet.currency.symbol}
    />
  )
}

export default ({ list = [] }) => (<>{ list && list.length > 0 && list.map(Wallet) }</>);