"use client";

import { Button, Container, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useFormDataHandle } from "@yakad/lib";
import React from "react";
interface EditSurahData {
  name: string;
  source: string;
}

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<EditSurahData>();

  const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/surah`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const handler = useFormDataHandle(setFormData);

  return (
    <Container maxWidth="sm">
      <h1>Edit Surah</h1>

      <Form onChange={handler.handle} onSubmit={fetch.send}>
        <InputField
          variant="outlined"
          placeholder="Surah Name"
          type="string"
          name="surah name"
        />
        <p>The name of surah</p>
        <InputField
          variant="outlined"
          placeholder="Period"
          type="string"
          name="surah period"
        />
        <p>The surah is makki or madani</p>
        <InputField
          variant="outlined"
          placeholder="Surah Number"
          type="number"
          name="surah number"
        />
        <p>The number of surah</p>
        <InputField
          variant="outlined"
          placeholder="Mushaf id"
          type="string"
          name="mushaf id"
        />
        <p>The mushaf id that we want add the surah</p>
        <InputField
          variant="outlined"
          placeholder="Bissmillah Text"
          type="string"
          name="bissmillah text"
        />
        <p>The surah bissmillah text</p>
        <InputField
          variant="outlined"
          placeholder="Bissmillah Status"
          type="string"
          name="bissmillah Status"
        />
        <p>
          The surah start with bismillah, start with bismillah as first ayah or
          start without bismillah
        </p>
        <Row>
          <Spacer />
          <Button variant="outlined" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            loadingVariant="spinner"
            onClick={fetch.send}
            variant="filled"
            disabled={fetch.loading}
          >
            Edit
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
