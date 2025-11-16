"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dices } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Channel, ChannelSchema, Generation } from "@/models";
import { groupByGeneration } from "@/utils/sorting";

interface FormProps {
  data: Channel[];
}

const FormSchema = z.object({
  members: z.array(z.string()).min(2, "Please select at least two members"),
});

export function MembersForm({ data: members }: FormProps) {
  let groups: Generation[] = groupByGeneration(members, []);

  const [randomMember, setRandomMember] = useState<Channel | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      members: [],
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof FormSchema>) => {
      const randomIndex = Math.floor(Math.random() * values.members.length);
      const randomMemberId = values.members[randomIndex];

      const selectedMember = members.find(
        (member) => member.id === randomMemberId,
      );

      const parsedMember = ChannelSchema.safeParse(selectedMember);

      if (!parsedMember.success) {
        console.error(parsedMember.error);
        return;
      }

      setRandomMember(parsedMember.data);
    },
    [members],
  );

  return (
    <div>
      {/* <OptionsBar /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ScrollArea className="h-[60vh] rounded-md border border-gray-200 p-4">
            <FormField
              control={form.control}
              name="members"
              render={() => (
                <FormItem className={cn("space-y-4")}>
                  {groups.map((group) => (
                    <fieldset key={group.name} className="flex flex-wrap gap-4">
                      <legend className="mb-2 bg-sky-800 px-1.5 py-1 font-semibold text-white">
                        {group.name}
                      </legend>
                      {group.members.map((streamer) => (
                        <FormField
                          key={streamer.id}
                          control={form.control}
                          name="members"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={streamer.id}
                                className={cn(
                                  "mr-5 flex items-center space-y-0 space-x-2 last:mr-0",
                                )}
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(streamer.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            streamer.id,
                                          ])
                                        : field.onChange(
                                            field.value.filter(
                                              (id) => id !== streamer.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel>{streamer.english_name}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </fieldset>
                  ))}
                </FormItem>
              )}
            />
          </ScrollArea>
          <div className="flex justify-center">
            <ResultDialog member={randomMember}>
              <Button
                className={cn("transition-opacity")}
                disabled={!form.formState.isValid}
                type="submit"
              >
                <Dices className="mr-2 h-4 w-4" /> Choose a member!
              </Button>
            </ResultDialog>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface ResultDialogProps {
  children: React.ReactNode;
  member: Channel | null;
}

function ResultDialog({ children, member }: ResultDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Randomly selected member</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid place-items-center gap-4 py-4">
          <Image
            src={member?.photo || "/official_channel_picture.webp"}
            width={250}
            height={250}
            alt={member?.english_name || "hololive member"}
            placeholder="blur"
            blurDataURL="/official_channel_picture.webp"
          />
          <h3 className="text-xl font-semibold">{member?.english_name}</h3>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OptionsBar() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [showGraduated, setShowGraduated] = useState(false);
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <Select onValueChange={(value: string) => setSelectedGroup(value)}>
        <SelectTrigger className="w-[180px] border-gray-300 bg-white text-gray-800">
          <SelectValue placeholder="Select group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Groups</SelectItem>
          <SelectItem value="hololive">hololive</SelectItem>
          <SelectItem value="holostars">holostars</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value: string) => setSelectedLanguage(value)}>
        <SelectTrigger className="w-[180px] border-gray-300 bg-white text-gray-800">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All languages</SelectItem>
          <SelectItem value="jp">Japanese</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="id">Indonesian</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="select-all"
          checked={true}
          onCheckedChange={(checked) => console.log("handleSelectAll", checked)}
        />
        <label
          htmlFor="select-all"
          className="text-sm leading-none font-medium"
        >
          Select All / Unselect All
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="show-graduated"
          checked={showGraduated}
          onCheckedChange={setShowGraduated}
        />
        <label
          htmlFor="show-graduated"
          className="text-sm leading-none font-medium"
        >
          Show Graduated Members
        </label>
      </div>
    </div>
  );
}
