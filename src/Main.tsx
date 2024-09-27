import React from 'react'
import { useBiconomyAccount } from "./useBiconomyAccount.ts"

export default function Main() {
  const { smartAccount, address } = useBiconomyAccount()

  if (!smartAccount) return null
  
  return <>
    <p>Your Biconomy Smart Account is: {address}</p>
    <p>Check out <a href="https://docs.biconomy.io/account/methods" target="_blank" rel="noopener noreferrer">https://docs.biconomy.io/account/methods</a> to learn what you can do with this smart account</p>
    <button onClick={() => {smartAccount.signMessage("Hello World")}}>Sign Message</button>
  </>
}
