export default function PlatformLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
        <p className="text-sm text-parchment-500">Loading...</p>
      </div>
    </div>
  );
}
