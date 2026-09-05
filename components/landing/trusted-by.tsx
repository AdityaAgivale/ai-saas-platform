const COMPANIES = ["Northwind", "Vertex Labs", "Lumen Digital", "Cascade", "Orbit Studio", "Halo Metrics", "Fernway"];

export function TrustedBy() {
  return (
    <section className="border-y border-border py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm text-muted">Trusted by teams and businesses worldwide</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70 grayscale">
          {COMPANIES.map((name) => (
            <span key={name} className="text-lg font-semibold tracking-tight text-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
