  require("@nomiclabs/hardhat-waffle");
  require('dotenv').config({path:'./.env.local'});
  task("accounts", "prints the list  of accounts", async (taskArgs,hre)=>{
    const accounts =await hre.ethers.getSigners();
    for(const account of accounts){
      console.log(account.address);
    }
  });
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  module.exports = {
    solidity: "0.8.10",
    defaultNetwork : "amoy",
    networks : {
      hardhat :{},
      amoy : {
        url: process.env.NEXT_PUBLIC_RPC_URL,
        accounts: [privateKey],
        chainId: 80002
      }
    },
  };
