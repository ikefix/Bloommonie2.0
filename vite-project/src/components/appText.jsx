export default function AppText({ children, style, color }) {
  return (
    <p style={{ ...style, fontFamily: 'Arial, sans-serif', color: color || '#333' }}>
        {children}
    </p>
  );
}