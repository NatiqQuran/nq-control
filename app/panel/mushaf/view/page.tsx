import { Container } from "@yakad/ui";
// import { Xtable } from "@yakad/x";

interface SimpleMushaf {
  uuid: string;
  name: string;
  source: string;
}

async function getMushaf(uuid: string): Promise<SimpleMushaf> {
  const response = await fetch(`${process.env.API_URL}/mushaf/${uuid}`);

  return response.json();
}

export default async function ViewMushaf({
  params,
}: {
  params: { uuid: string };
}) {
  const singleMushaf = await getMushaf(params.uuid);

  return (
    <Container>
      <h1>mushaf uuid : {singleMushaf.uuid}</h1>
      <h1>mushaf name : {singleMushaf.name}</h1>
      <h1>mushaf source: {singleMushaf.source}</h1>
    </Container>
  );
}
