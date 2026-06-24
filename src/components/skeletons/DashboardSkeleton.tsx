export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-liquid-bg relative flex font-sans">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-liquid-depth/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#1a1a1a] rounded-full blur-[150px] pointer-events-none translate-y-1/4" />
      
      <main className="flex-1 flex flex-col relative z-10 w-full min-h-screen">
        <div className="p-4 md:p-6 flex-1 flex flex-col max-w-[1600px] mx-auto w-full">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <div className="h-10 w-48 bg-liquid-text/10 rounded-full animate-pulse mb-3" />
              <div className="h-5 w-72 bg-liquid-text/10 rounded-full animate-pulse" />
            </div>
            <div className="h-12 w-[350px] bg-liquid-text/10 rounded-full animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="lg:col-span-2 xl:col-span-3 h-[220px] bg-liquid-text/5 border border-liquid-heading/5 rounded-2xl animate-pulse" />
            <div className="lg:col-span-1 xl:col-span-1 h-[220px] bg-liquid-text/5 border border-liquid-heading/5 rounded-2xl animate-pulse" />
            
            <div className="lg:col-span-2 xl:col-span-2 h-[320px] bg-liquid-text/5 border border-liquid-heading/5 rounded-2xl animate-pulse" />
            <div className="lg:col-span-1 xl:col-span-1 h-[320px] bg-liquid-text/5 border border-liquid-heading/5 rounded-2xl animate-pulse" />
            <div className="lg:col-span-1 xl:col-span-1 h-[320px] bg-liquid-text/5 border border-liquid-heading/5 rounded-2xl animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
};
