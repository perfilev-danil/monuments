export default function CollectionSkeleton() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="text-center font-american">Загрузка...</div>
        <div className="w-32 h-1 mx-auto rounded-full overflow-hidden">
          <div className="h-full bg-[var(--dark)] animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
