import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-gray-100 dark:bg-gray-900 py-4">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} OCasino. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
