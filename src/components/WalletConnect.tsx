import React, { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

const WalletConnect: FC = () => {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / LAMPORTS_PER_SOL);
      });
    }
  }, [publicKey, connection]);

  return (
    <div className="wallet-connect">
      <WalletMultiButton />
      {connected && publicKey && (
        <div className="wallet-info">
          <p>Connected: {publicKey.toString()}</p>
          <p>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 