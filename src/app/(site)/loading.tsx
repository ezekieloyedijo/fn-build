export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary-500/20 border-t-primary-500" />
      </div>
      <p className="text-sm font-medium text-muted">Loading FNBUILD &amp; Construction...</p>
    </div>
  );
}
