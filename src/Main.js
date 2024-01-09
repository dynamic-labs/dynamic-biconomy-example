import { useEffect } from "react";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";

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

      const newProvider = await embeddedWallet.connector?.getPublicClient();
      const newSigner = await embeddedWallet.connector?.ethers?.getSigner();

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
