export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[var(--line)] bg-paper/60 px-3 py-1.5 text-xs font-medium text-foreground/75"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
