import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        sticky top-0 z-50
        flex items-center justify-between
        px-6 py-4
        bg-[#070A12]/80
        backdrop-blur-xl
        border-b border-white/10
      "
    >
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div
          className="
            h-10 w-10
            rounded-xl
            bg-[#6366F1]
            shadow-lg shadow-indigo-500/30
            flex items-center justify-center
            text-white font-black
          "
        >
          ₿
        </div>

        <h1 className="text-lg font-black tracking-tight text-white">
          CryptoPortal
        </h1>
      </div>

      {/* LINKS */}
      <div
        className="
          hidden md:flex
          items-center gap-8
          text-sm font-medium
        "
      >
        {[
          { to: "/", label: "Accueil" },
          { to: "/education", label: "Éducation" },
          { to: "/news", label: "News" },
          { to: "/security", label: "Sécurité" },
          { to: "/guides", label: "Guides" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="
              text-white/60
              hover:text-white
              transition
              relative
              group
            "
          >
            {item.label}

            <span
              className="
                absolute left-0 -bottom-1
                h-0.5 w-0
                bg-[#6366F1]
                transition-all
                group-hover:w-full
              "
            />
          </Link>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3">
        {/* 🚀 APP BUTTON (NEW) */}
        <Link
          to="/apps"
          className="
            px-4 py-2
            rounded-xl
            bg-linear-to-r from-[#6366F1] to-[#8B5CF6]
            text-white
            font-semibold
            shadow-lg shadow-indigo-500/30
            hover:scale-105
            transition
          "
        >
          Launch App
        </Link>

        {/* DASHBOARD BUTTON */}
        <button
          className="
            hidden md:block
            px-4 py-2
            rounded-xl
            bg-white/5
            border border-white/10
            text-white/80
            hover:bg-white/10
            transition
          "
        >
          Dashboard
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
