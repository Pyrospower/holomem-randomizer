"use client";
import { Channel, Generation } from "@/types";
import { groupByGeneration } from "@/utils/sorting";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

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

interface FormProps {
  data: Channel[];
}

const FormSchema = z.object({
  members: z.array(z.string()).min(2, "Please select at least two members"),
});

export default function MembersForm({ data: members }: FormProps) {
  // Groups channels by generation
  let groups: Generation[] = groupByGeneration(members, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      members: [],
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.dir(values);
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
          <Button
            className={cn("transition-opacity")}
            disabled={!form.formState.isValid}
          >
            <Dices className="mr-2 h-4 w-4" /> Choose a member!
          </Button>
        </div>
      </form>
    </Form>
  );
}
