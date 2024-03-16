import {
  createSmartAccountClient,
} from "@biconomy/account";

export const createSmartAccount = async (provider, signer) => {
  return await createSmartAccountClient({
    signer,
    bundlerUrl:  process.env.REACT_APP_BICONOMY_BUNDLER_URL,
    biconomyPaymasterApiKey: 'n03bIrRSc.70bfe641-60ef-4f07-b275-1dd2d1a65fbe',
  });
};
