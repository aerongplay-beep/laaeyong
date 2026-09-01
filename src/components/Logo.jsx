export default function Logo({ className = '', iconClassName = '', textClassName = '', showText = true }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 38 38"
        className={`h-8 w-8 flex-shrink-0 ${iconClassName}`}
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="17" cy="17" r="12" stroke="currentColor" strokeWidth="3" />
        <line x1="25.49" y1="25.49" x2="31.5" y2="31.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
        <path
          d="M17,12 L18.29,15.22 L21.76,15.46 L19.09,17.68 L19.94,21.05 L17,19.2 L14.06,21.05 L14.91,17.68 L12.24,15.46 L15.71,15.22 Z"
          fill="#F5C518"
        />
      </svg>
      {showText && <span className={`font-extrabold tracking-tight ${textClassName}`}>놀이연구소</span>}
    </span>
  );
}
