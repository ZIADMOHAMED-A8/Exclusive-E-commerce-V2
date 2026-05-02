import { Star } from "lucide-react";

export function StarsDisplayer({
  num,
  size = 20,
}: {
  num: string | number;
  size?: number;
}) {
  let value = Math.floor(+num);
  value = value > 5 ? 5 : value;

  const jsxCode = [];

  for (let i = 1; i <= value; i++) {
    jsxCode.push(
      <span key={`filled-${i}`}>
        <Star size={size} color="#F59E0B" />
      </span>
    );
  }

  for (let j = value; j < 5; j++) {
    jsxCode.push(
      <span key={`empty-${j}`}>
        <Star size={size} color="gray" />
      </span>
    );
  }

  return <>{jsxCode}</>;
}
