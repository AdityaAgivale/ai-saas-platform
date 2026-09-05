import { Suspense } from "react";
import { ContentGenerator } from "@/components/dashboard/generator";

export default function GeneratePage() {
  return (
    <Suspense fallback={null}>
      <ContentGenerator />
    </Suspense>
  );
}
