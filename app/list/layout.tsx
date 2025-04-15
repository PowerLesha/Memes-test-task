export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
      <div className="inline-block w-full max-w-7xl px-4 text-center">
        {children}
      </div>
    </section>
  );
}
