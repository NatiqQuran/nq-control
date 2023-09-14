"use client";
import { Button, Row } from "@yakad/ui";
import { useRouter } from "next/navigation";
export default function SurahOpt() {
  const router = useRouter();

  return (
    <Row>
      <Button
        variant="outlined"
        onClick={() => router.push("/panel/surah/list")}
      >
        Surahs
      </Button>
      <Button
        variant="outlined"
        onClick={() => router.push("/panel/mushaf/edit")}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        onClick={() => router.push("/panel/mushaf/delete")}
      >
        Delete
      </Button>
    </Row>
  );
}
