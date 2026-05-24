import React from "react";


interface AppTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
}

export default function AppText({ children, style, color }: AppTextProps): React.ReactElement {
  return (
    <p style={{ ...style, fontFamily: 'Arial, sans-serif', color: color || '#333' }}>
        {children}
    </p>
  );
}