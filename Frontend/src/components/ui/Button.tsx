import { useMemo } from "react";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useWalletInfo,
} from "@reown/appkit/react";

const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const formatStatus = (status?: string) => {
  if (!status) return "Ready";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const WalletButton = () => {
  const { open } = useAppKit();
  const { address, caipAddress, isConnected, status } = useAppKitAccount();
  const { caipNetwork, chainId } = useAppKitNetwork();
  const { walletInfo } = useWalletInfo();

  const displayAddress = useMemo(
    () => (address ? shortenAddress(address) : ""),
    [address],
  );

  if (isConnected && address) {
    const walletName = walletInfo?.name ?? "Connected wallet";
    const networkName = caipNetwork?.name ?? "Unknown network";

    return (
      <button
        onClick={() => open({ view: "Account" })}
        className="
          w-full sm:w-auto
          rounded-xl border border-indigo-400/30
          bg-gray-900/90 px-4 py-3
          text-left text-white
          shadow-lg shadow-indigo-500/10
          transition
          hover:border-indigo-400/60 hover:bg-gray-900
        "
      >
        <span className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-bold">{walletName}</span>
            <span className="block text-xs text-gray-400">
              {displayAddress}
            </span>
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            {formatStatus(status)}
          </span>
        </span>

        <span className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <span>
            <span className="block text-gray-500">Network</span>
            <span className="block truncate font-medium text-gray-200">
              {networkName}
            </span>
          </span>
          <span>
            <span className="block text-gray-500">Chain ID</span>
            <span className="block truncate font-medium text-gray-200">
              {chainId ?? "Unknown"}
            </span>
          </span>
        </span>

        {caipAddress && (
          <span className="mt-2 block truncate text-[11px] text-gray-500">
            {caipAddress}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => open({ view: "Connect" })}
      className="
        px-4 py-2 rounded-xl
        bg-indigo-600 text-white
        hover:bg-indigo-500
        transition
        font-semibold
      "
    >
      Connect Wallet
    </button>
  );
};

export default WalletButton;
