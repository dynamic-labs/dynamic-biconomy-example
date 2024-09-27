import { Bundler } from "@biconomy/bundler"
import { Paymaster, createSmartAccountClient, DEFAULT_ENTRYPOINT_ADDRESS, ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/account"
import { sepolia } from "viem/chains"

const bundler = new Bundler({
  bundlerUrl: process.env.REACT_APP_BICONOMY_BUNDLER_URL!,
  chainId: sepolia.id, // Replace this with your desired network
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, // This is a Biconomy constant
})

const paymaster = new Paymaster({
  paymasterUrl: process.env.REACT_APP_BICONOMY_PAYMASTER_URL!,
})

const createValidationModule = async (signer) => {
  return await ECDSAOwnershipValidationModule.create({
    signer: signer,
    moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE, // This is a Biconomy constant
  })
}

export const createSmartAccount = async (walletClient) => {
  const validationModule = await createValidationModule(walletClient)
  console.log('creating')

  return await createSmartAccountClient({
    signer: walletClient,
    chainId: sepolia.id, // Replace this with your target network
    bundler: bundler, // Use the `bundler` we initialized above
    paymaster: paymaster, // Use the `paymaster` we initialized above
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, // This is a Biconomy constant
    defaultValidationModule: validationModule, // Use the `validationModule` we initialized above
    activeValidationModule: validationModule, // Use the `validationModule` we initialized above
  })
}
