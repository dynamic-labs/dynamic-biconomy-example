
import { useEffect } from "react";
import { useBiconomyAccount } from "./useBiconomyAccount.js";

const Main = () => {
  const { smartAccount } = useBiconomyAccount();
  
  useEffect(() => {
    console.log('my Biconomy smart account', smartAccount)
  }, [smartAccount])

  return <></>;
};

export default Main;
