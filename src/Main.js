import { useEffect } from "react";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import { createWalletClient, createPublicClient, custom } from "viem";

import { ChainId } from "@biconomy/core-types";

const Main = ({ provider, setProvider, signer, setSigner }) => {
  const userWallets = useUserWallets();

  useEffect(() => {
    const fetchClients = async (embeddedWallet) => {
      if (embeddedWallet.chain !== ChainId.GOERLI) {
        await embeddedWallet.connector.switchNetwork({
          networkChainId: ChainId.GOERLI,
        });
      }

      const internalWalletClient =
        await embeddedWallet.connector.getWalletClient();

      const walletClient = createWalletClient({
        chain: internalWalletClient.chain,
        transport: custom(internalWalletClient.transport),
        account: embeddedWallet?.address,
      });
      const publicClient = createPublicClient({
        account: embeddedWallet?.address,
        chain: internalWalletClient.chain,
        transport: custom(internalWalletClient.transport),
      });

      const newProvider = publicClient;
      const newSigner = walletClient;

      setProvider(newProvider);
      setSigner(newSigner);

      return;
    };

    if (userWallets.length > 0 && (!provider || !signer)) {
      const embeddedWallet = userWallets.find(
        (wallet) => wallet?.connector?.isEmbeddedWallet === true
      );

      if (embeddedWallet) {
        fetchClients(embeddedWallet);
      }
    }
  }, [userWallets]);

  return <></>;
};

export default Main;
