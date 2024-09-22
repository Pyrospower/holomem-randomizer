import { getAllMembers } from "@/utils/holodex";
import { removeUnwantedChannels } from "@/utils/sorting";
import { MembersForm } from "@/components/members-form";

async function getMembers() {
  const data = await getAllMembers();
  return removeUnwantedChannels(data);
}

export default async function Page() {
  const channels = await getMembers();

  return (
    <div className="px-4 md:px-8">
      <main className="flex flex-col items-center justify-center py-6">
        <div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl">
            Randomizer
          </h1>
        </div>
        <MembersForm data={channels} />
      </main>
    </div>
  );
}
