interface AppButtonsProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}

export default function AppButtons({ children, onClick, style }: AppButtonsProps) {
  return (
    <button onClick={onClick} style={{ ...style, padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        {children}
    </button>
  );
}