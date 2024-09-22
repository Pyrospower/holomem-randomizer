import { getAllMembers } from "@/utils/holodex";
import { removeUnwantedChannels } from "@/utils/sorting";
import { MembersForm } from "@/components/members-form";
import { ModeToggle } from "@/components/mode-toggle";

async function getMembers() {
  const data = await getAllMembers();
  return removeUnwantedChannels(data);
}

export default async function Page() {
  const channels = await getMembers();

  return (
    <div className="px-4 md:px-8">
      <main className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] py-6">
        <div className="col-start-2 row-start-1 justify-self-end">
          <ModeToggle />
        </div>

        <div className="col-span-2 row-start-2 flex flex-col items-center justify-center">
          <h1 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl">
            Randomizer
          </h1>
          <MembersForm data={channels} />
        </div>
      </main>
    </div>
  );
}
