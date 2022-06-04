import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export type ConnectorsName = "metaMask" | "walletConnect";

const URLs = {
  4: "https://rinkeby.infura.io/v3/",
};

export const metamask = new InjectedConnector({
  supportedChainIds: [4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: URLs,
  supportedChainIds: [4],
  qrcode: true,
});

export const connectorTypes = {
  metaMask: metamask,
  walletConnect: walletconnect,
};
