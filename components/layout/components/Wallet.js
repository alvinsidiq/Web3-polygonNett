import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";
const networks = {
    polygon: {
        chainId: `0x${Number(80002).toString(16)}`,
        chainName: "Polygon Amoy Testnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: ["https://rpc-amoy.polygon.technology/"],
        blockExplorerUrls: ["https://amoy.polygonscan.com/"]
    },
};
const Wallet = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const connectWallet = async () => {
        try {
           
            if (!window.ethereum) {
                alert("Please install MetaMask to use this feature!");
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

           
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

           
            const { chainId } = await provider.getNetwork();

            
            if (chainId !== 80002) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                ...networks["polygon"]
                            }
                        ]
                    });
                } catch (switchError) {
                    console.error("Failed to switch network:", switchError);
                    return;
                }
            }

            
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            setAddress(userAddress);
            const Balance =ethers.utils.formatEther(await signer.getBalance());
            setBalance(Balance);
            console.log("Connected address:", userAddress);
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("Failed to connect wallet. Check the console for details.");
        }
    };

    return (
        <ConnectWalletWrapper onClick={connectWallet}>
    {balance === '' ? <Balance></Balance> : <Balance>{balance.slice(0, 4)}MATIC</Balance>}
    {address === '' ? <Address>Connect Wallet</Address> : <Address>{address}</Address>}
    
        </ConnectWalletWrapper>
    );
};

const ConnectWalletWrapper = styled.div`
 display: flex;
 align-items : center;
 justify-content: space-between;
 background-color: ${(props) => props.theme.bgDiv};
 padding: 5px 9px;
 color: ${(props) => props.theme.color};
 height : 100%;
 font-family: 'Roboto';
 font-weight: bold;
 font-size: small;
 border-radius: 10px;
 margin-right: 10px;
 padding: 5px 9px;
`

const Address = styled.h2`
background-color : ${(props) => props.theme.bgSubDiv};
height : 100%;
display: flex;
align-items: center;
justify-content : center;
padding: 0 5px 0 5px;
border-radius: 10px;   
`

const Balance = styled.h2`
display: flex;
height: 100%;
align-items: center;
justify-content : center;
margin-right: 5px;
`
export default Wallet