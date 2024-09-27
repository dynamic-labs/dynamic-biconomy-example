import { useState, useEffect, useCallback } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { BiconomySmartAccountV2 } from '@biconomy/account'

import { createSmartAccount } from "./biconomy.ts"

export function useBiconomyAccount() {
  const { primaryWallet } = useDynamicContext()
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(null)
  const [address, setAddress] = useState<string | null>(null)

  const createAndSetSmartAccount = useCallback(async () => {
    if (!primaryWallet) {
      setSmartAccount(null)
      setAddress(null)
      return
    }

    try {
      if(!isEthereumWallet(primaryWallet)) return
      const walletClient = await primaryWallet.getWalletClient()
      if (walletClient) {
        console.log("Creating smart account")
        const newSmartAccount = await createSmartAccount(walletClient)
        console.log("Smart account created")
        setSmartAccount(newSmartAccount)

        const newAddress = await newSmartAccount.getAddress()
        console.log("Smart account address:", newAddress)
        setAddress(newAddress)
      }
    } catch (error) {
      console.error('Error fetching wallet clients or creating smart account:', error)
      setSmartAccount(null)
      setAddress(null)
    }
  }, [primaryWallet]) // Remove smartAccount from dependencies

  useEffect(() => {
    createAndSetSmartAccount()
  }, [createAndSetSmartAccount])

  return { smartAccount, address }
}
