import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";

const projectId = "bc452682431244b17ef0590dffaa8af3";

createAppKit({
  adapters: [new EthersAdapter()],
  projectId,
  networks: [mainnet, arbitrum],
  metadata: {
    name: "CryptoPortal",
    description: "Crypto dashboard",
    url: "http://localhost:5173",
    icons: ["/favicon.svg"],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
});
