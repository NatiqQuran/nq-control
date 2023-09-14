"use client";
import { Button } from "@yakad/ui";
import { useRouter } from "next/navigation";
export default function AddButton() {
  const router = useRouter();

  return (
    <Button variant="outlined" onClick={() => router.push("/panel/mushaf/add")}>
      Add Mushaf
    </Button>
  );
}
