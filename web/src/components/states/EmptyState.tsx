import Card from "@/components/ui/Card";

export default function EmptyState({
  title = "No results",
  description = "Try adjusting your filters.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Card className="p-6">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm text-white/60">{description}</p>
    </Card>
  );
}