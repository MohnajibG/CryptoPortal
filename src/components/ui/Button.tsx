import { useAppKit } from "@reown/appkit/react";

const WalletButton = () => {
  const { open } = useAppKit();

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
