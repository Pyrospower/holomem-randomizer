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
      <main className="py-6 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl mb-6">Randomizer</h1>
        <Form data={channels} />
      </main>
    </div>
  );
}
