"use client";

import { brandFormSchema } from "@/lib/validations/brand";
import { Input } from "../ui/input";
import * as z from "zod";
import * as React from "react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandService } from "@/services/brand.service";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Brand } from "@/types/brand";

type FormData = z.infer<typeof brandFormSchema>;

interface EditBrandFormProps {
  brand: Brand;
}

export default function EditBrandForm({ brand }: EditBrandFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: brand.name,
      website: brand.website,
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const apiResponse = await brandService.editBrand(
      brand.id,
      data.name,
      data.website
    );
    setIsLoading(false);
    if (!apiResponse.error) {
      router.push("/admin/brands");
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "An unexpected error occured.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-2 py-8 flex w-full flex-col space-y-6 sm:w-[350px]"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          {...register("name")}
          type="text"
          placeholder="Brand name"
          onChange={() => {
            clearErrors("name");
          }}
        />
        {errors?.name && (
          <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <Input type="text" placeholder="Brand website" {...register("website")} />
      <Button disabled={isLoading} className="w-1/2">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Update
      </Button>
    </form>
  );
}
