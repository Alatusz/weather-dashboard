export const ComparisonCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-3 bg-liquid-bg/30 rounded-xl border border-liquid-heading/5 h-[76px] overflow-hidden">
      <div className="flex items-center gap-3 w-full">
        <div className="w-10 h-10 rounded-full bg-liquid-text/10 animate-pulse" />
        <div className="flex flex-col gap-2 w-1/2">
          <div className="h-3.5 bg-liquid-text/10 rounded-full w-3/4 animate-pulse" />
          <div className="h-2.5 bg-liquid-text/10 rounded-full w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 w-1/4">
        <div className="h-6 bg-liquid-text/10 rounded-full w-3/4 animate-pulse" />
        <div className="h-2 bg-liquid-text/10 rounded-full w-full animate-pulse" />
      </div>
    </div>
  );
};
