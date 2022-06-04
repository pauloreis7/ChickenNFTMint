import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export type ConnectorsName = "metaMask" | "walletConnect";

const URLs = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  1666600000: "https://api.harmony.one/",
  1666600001: "https://s1.api.harmony.one/",
  1666600002: "https://s2.api.harmony.one",
  1666600003: "https://s3.api.harmony.one",
};

export const metamask = new InjectedConnector({
  supportedChainIds: [80001, 3, 4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: URLs,
  supportedChainIds: [80001, 3, 4],
  qrcode: true,
});

export const connectorTypes = {
  metaMask: metamask,
  walletConnect: walletconnect,
};
