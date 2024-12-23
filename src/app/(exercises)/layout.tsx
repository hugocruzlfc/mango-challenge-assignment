import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExerciseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-4">
      <Button
        asChild
        variant="link"
      >
        <Link href="/">Go to Back</Link>
      </Button>
      {children}
    </div>
  );
}
