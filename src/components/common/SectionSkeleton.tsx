export function SectionSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div
      className={`w-full ${height} bg-[#111] animate-pulse`}
      role="status"
      aria-busy="true"
      aria-label="Loading content"
    />
  );
}
