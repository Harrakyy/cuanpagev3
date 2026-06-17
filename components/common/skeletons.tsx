export function SkeletonCard() {
  return <div className="h-32 animate-pulse rounded-2xl bg-muted" />;
}

export function SkeletonRow() {
  return <div className="h-10 animate-pulse rounded bg-muted" />;
}

export function SkeletonTable() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
