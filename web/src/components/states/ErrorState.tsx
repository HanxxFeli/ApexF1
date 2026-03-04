import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <Card className="p-6">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm text-dim">{description}</p>
      {onRetry ? (
        <div className="mt-4">
          <Button variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        </div>
      ) : null}
    </Card>
  );
}