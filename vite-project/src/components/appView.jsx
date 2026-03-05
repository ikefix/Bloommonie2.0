export default function AppView({ children, style, className }) {
  return (
    <div style={{ ...style, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }} className={className}>
        {children}
    </div>
  );
}