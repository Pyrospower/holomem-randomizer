"use client";
import { Channel, ChannelSchema, Generation } from "@/types";
import { groupByGeneration } from "@/utils/sorting";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import { useState } from "react";

interface FormProps {
  data: Channel[];
}

const FormSchema = z.object({
  members: z.array(z.string()).min(2, "Please select at least two members"),
});

export default function MembersForm({ data: members }: FormProps) {
  let groups: Generation[] = groupByGeneration(members, []);

  const [randomMember, setRandomMember] = useState<Channel | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      members: [],
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const randomMemberId =
      values.members[Math.floor(Math.random() * values.members.length)];

    const selectedMember = members.find(
      (member) => member.id === randomMemberId,
    );

    const parsedMember = ChannelSchema.safeParse(selectedMember);

    if (!parsedMember.success) {
      console.error(parsedMember.error);
      return;
    }

    setRandomMember(parsedMember.data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="members"
          render={() => (
            <FormItem className={cn("space-y-4")}>
              {groups.map((group) => (
                <fieldset key={group.name} className="flex flex-wrap">
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
                              "mr-5 flex items-center space-x-2 space-y-0 last:mr-0",
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
        </DialogHeader>
        <div className="grid place-items-center gap-4 py-4">
          <Image
            src={member?.photo || "/official_channel_picture.jpg"}
            width={300}
            height={300}
            alt={member?.english_name || "hololive member"}
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
