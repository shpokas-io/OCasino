import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title }) => {
  return (
    <div
      className="
        w-full max-w-md 
        rounded-lg 
        bg-white 
        p-8 
        shadow-xl 
        transform 
        transition-all 
        duration-300 
        hover:shadow-2xl 
        animate-fadeIn
      "
    >
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default AuthCard;
