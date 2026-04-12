interface AgrimateLogoProps {
  className?: string
  size?: number
}

export function AgrimateLogo({ className = '', size = 40 }: AgrimateLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle with subtle gradient */}
      <circle cx="50" cy="50" r="48" className="fill-primary/10" />
      <circle cx="50" cy="50" r="48" className="stroke-primary/30" strokeWidth="2" fill="none" />
      
      {/* Stylized plant/leaf sprouting from ground */}
      <g className="fill-primary">
        {/* Main stem */}
        <path d="M50 75 L50 45 Q50 35 45 28" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" className="stroke-primary" />
        
        {/* Left leaf */}
        <path d="M50 55 Q35 50 30 38 Q35 45 50 50" className="fill-primary" />
        <path d="M50 55 Q35 50 30 38" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" className="stroke-primary/60" />
        
        {/* Right leaf */}
        <path d="M50 45 Q65 40 70 28 Q65 35 50 40" className="fill-primary" />
        <path d="M50 45 Q65 40 70 28" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" className="stroke-primary/60" />
        
        {/* Top sprouting leaf */}
        <path d="M45 28 Q40 18 45 12 Q48 20 55 15 Q52 22 45 28" className="fill-primary" />
      </g>
      
      {/* Digital/tech circuit elements */}
      <g className="stroke-primary/40" strokeWidth="1.5" fill="none">
        {/* Left circuit lines */}
        <path d="M20 70 L30 70 L35 65" strokeLinecap="round" />
        <circle cx="20" cy="70" r="2" className="fill-primary/40" />
        
        {/* Right circuit lines */}
        <path d="M80 70 L70 70 L65 65" strokeLinecap="round" />
        <circle cx="80" cy="70" r="2" className="fill-primary/40" />
        
        {/* Bottom data points */}
        <path d="M40 80 L50 85 L60 80" strokeLinecap="round" />
        <circle cx="50" cy="85" r="2" className="fill-primary/40" />
      </g>
      
      {/* Ground/soil line */}
      <path d="M30 75 Q40 78 50 75 Q60 72 70 75" className="stroke-primary/50" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
