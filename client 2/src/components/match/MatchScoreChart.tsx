import { motion } from "framer-motion";

interface MatchScoreChartProps {
  score: number;
  size?: number;
}

const MatchScoreChart = ({ score, size = 160 }: MatchScoreChartProps) => {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75 ? "hsl(142 76% 36%)" : score >= 50 ? "hsl(35 95% 55%)" : "hsl(0 84% 60%)";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-4xl font-bold text-foreground">{Math.round(score)}</span>
        <span className="block text-xs text-muted-foreground">Match %</span>
      </div>
    </div>
  );
};

export default MatchScoreChart;
