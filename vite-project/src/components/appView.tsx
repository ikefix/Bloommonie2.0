import React from "react";


interface AppViewProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function AppView({ children, style, className }: AppViewProps): React.ReactElement {
  return (
    <div style={{ ...style, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }} className={className}>
        {children}
    </div>
  );
}