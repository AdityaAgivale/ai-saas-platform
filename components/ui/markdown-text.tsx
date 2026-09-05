// Lightweight markdown-ish renderer for AI output — handles the common
// subset (headings, bold, bullet lists) without pulling in a full markdown
// dependency.
export function MarkdownText({ content, className }: { content: string; className?: string }) {
  const lines = content.split("\n");

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className={className}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-3" />;
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={i} className="mt-4 mb-1 text-sm font-semibold first:mt-0">
              {renderInline(trimmed.slice(4))}
            </h4>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={i} className="mt-5 mb-1.5 text-base font-semibold first:mt-0">
              {renderInline(trimmed.slice(3))}
            </h3>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={i} className="mt-5 mb-2 text-lg font-bold first:mt-0">
              {renderInline(trimmed.slice(2))}
            </h2>
          );
        }
        if (/^[-*]\s+/.test(trimmed)) {
          return (
            <div key={i} className="flex gap-2 pl-1 leading-relaxed">
              <span className="text-accent-blue">•</span>
              <span>{renderInline(trimmed.replace(/^[-*]\s+/, ""))}</span>
            </div>
          );
        }
        return (
          <p key={i} className="leading-relaxed">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}
