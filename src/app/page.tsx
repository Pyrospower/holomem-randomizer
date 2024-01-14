import { getAllMembers } from "@/utils/holodex";
import { removeUnwantedChannels } from "@/utils/sorting";
import MembersForm from "@/components/members-form";

async function getMembers() {
  const data = await getAllMembers();
  return removeUnwantedChannels(data);
}

export default async function Page() {
  const channels = await getMembers();

  return (
    <div className="px-4 md:px-8">
      <main className="flex flex-col items-center justify-center py-6">
        <h1 className="mb-6 scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl">
          Randomizer
        </h1>
        <MembersForm data={channels} />
      </main>
    </div>
  );
}
