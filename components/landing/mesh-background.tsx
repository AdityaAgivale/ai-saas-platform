export function MeshBackground({ variant = "hero" }: { variant?: "hero" | "subtle" }) {
  return (
    <div className="mesh-bg">
      <div
        className="mesh-blob bg-accent-blue"
        style={{ width: 420, height: 420, top: "-10%", left: "5%" }}
      />
      <div
        className="mesh-blob bg-accent-purple"
        style={{
          width: 480,
          height: 480,
          top: variant === "hero" ? "5%" : "10%",
          right: "0%",
          animationDelay: "-4s",
        }}
      />
      {variant === "hero" && (
        <div
          className="mesh-blob bg-accent-cyan"
          style={{ width: 360, height: 360, bottom: "-10%", left: "35%", animationDelay: "-8s" }}
        />
      )}
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]" />
    </div>
  );
}
