import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white/5 rounded-lg shadow-lg border border-gray-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
export default Card;