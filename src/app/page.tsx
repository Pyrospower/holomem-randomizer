import { Form } from "@/components/organisms";
import { getAllMembers } from "@/utils/holodex";
import { removeUnwantedChannels } from "@/utils/sorting";

async function getMembers() {
  const data = await getAllMembers();
  return removeUnwantedChannels(data);
}

export default async function Page() {
  const channels = await getMembers();

  return (
    <div className="px-4 md:px-8">
      <main className="flex flex-col items-center justify-center py-6">
        <h1 className="mb-6 text-4xl md:text-6xl">Randomizer</h1>
        <Form data={channels} />
      </main>
    </div>
  );
}
