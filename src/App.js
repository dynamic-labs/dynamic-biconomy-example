import { useEffect, useState } from "react";

import Main from "./Main.js";
import "./App.css";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import { EthersExtension } from "@dynamic-labs/ethers-v6";

import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";

import { createSmartAccount } from "./Biconomy.js";

import SendTransaction from "./Transaction.tsx";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [smartAccount, setSmartAccount] = useState(null);

  useEffect(() => {
    const createAndSetSmartAccount = async () => {
      const newSmartAccount = await createSmartAccount(provider, signer);
      setSmartAccount(newSmartAccount);
    };

    if (provider && signer && !smartAccount) {
      createAndSetSmartAccount();
    }
  }, [provider, signer, smartAccount]);

  console.log("provider", provider);
  console.log("signer", signer);
  console.log("smartAccount", smartAccount);

  useEffect(() => {
    const getBalanceAndAddress = async () => {
      if (smartAccount) {
        const address = await smartAccount.getAccountAddress();
        const cfAddress = await smartAccount.getCounterFactualAddress();
        console.log("address", address);
        console.log("cfaddress", cfAddress);
      }
    };

    getBalanceAndAddress();
  }, [smartAccount]);

  return (
    <div className="App">
      <DynamicContextProvider
        settings={{
          // Find your environment id at https://app.dynamic.xyz/dashboard/developer
          environmentId: process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID,
          walletConnectors: [
            EthereumWalletConnectors,
            ZeroDevSmartWalletConnectors,
          ],
          walletConnectorExtensions: [EthersExtension],
        }}
      >
        <DynamicWidget />
        <SendTransaction />
        <Main
          provider={provider}
          setProvider={setProvider}
          signer={signer}
          setSigner={setSigner}
        />
      </DynamicContextProvider>
    </div>
  );
}

export default App;
