// components/StickySection.tsx
type StickySectionProps = {
  children: React.ReactNode;
};

export default function StickySection({ children }: StickySectionProps) {
  return (
    <div className="relative h-[130vh]">
      <div className="sticky top-0">{children}</div>
    </div>
  );
}
