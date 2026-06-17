import { Loader2 } from "lucide-react";

export function LoadingSpinner({ size = 18 }: { size?: number }) {
  return <Loader2 className="animate-spin" size={size} />;
}
