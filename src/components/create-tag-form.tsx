import { Check, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTagSchema = z.object({
  title: z.string().min(3, { message: "Minimum 3 characters" }),
});

type CreateTagSchema = z.infer<typeof createTagSchema>;

export function CreateTagForm() {
  const { register, handleSubmit, watch, formState } = useForm<CreateTagSchema>(
    {
      resolver: zodResolver(createTagSchema),
    }
  );

  const queryClient = useQueryClient()

  function getSlugFromString(input: string): string {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");
  }

  const slug = watch("title") ? getSlugFromString(watch("title")) : "";

  const { mutateAsync } = useMutation({
    mutationFn: async ({ title }: CreateTagSchema) => {

      await fetch("https://inquisitive-cougar.cyclic.app/tags", {
        method: "POST",
        body: JSON.stringify({
          title,
          slug,
          amountOfVideos: 0,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["get-tags"]
      })
    }
  });

  async function CreateTag({ title }: CreateTagSchema) {
    await mutateAsync({title})
  }

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(CreateTag)}>
      <div className="space-y-2">
        <label className="font-medium text-sm block" htmlFor="title">
          Tag name
        </label>
        <input
          {...register("title")}
          type="text"
          className="rounded-lg bg-zinc-800/50 px-3 py-2.5 w-full "
          id="title"
        />
        {formState.errors?.title && (
          <p className="text-sm text-red-500">
            {formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="font-medium text-sm block" htmlFor="slug">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          className="rounded-lg bg-zinc-800/50 px-3 py-2.5 w-full "
          id="slug"
          readOnly
        />
      </div>

      <div className="flex gap-2 items-center justify-end">
        <Dialog.Close asChild>
          <Button>
            <X className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>
        <Button
          disabled={formState.isSubmitting}
          type="submit"
          className="bg-teal-400 text-teal-950"
        >
          {formState.isSubmitting ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <Check className="size-3" />
          )}
          Save
        </Button>
      </div>
    </form>
  );
}
