"use client";

import { Brand } from "@/types/brand";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { brandService } from "@/services/brand.service";
import Link from "next/link";

async function deletePost(brandId: number) {
  const response = await brandService.deleteBrand(brandId);

  if (response.status) {
    return true;
  }

  toast({
    title: "Something went wrong.",
    description: "Brand was not deleted. Please try again.",
    variant: "destructive",
  });
}

export const brandTableColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Brand Name",
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: function Cell({ row }) {
      const link: string = row.getValue("website");

      return <a href={link}>{link}</a>;
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const brand = row.original;

      const router = useRouter();
      const [showDeleteAlert, setShowDeleteAlert] =
        React.useState<boolean>(false);
      const [isDeleteLoading, setIsDeleteLoading] =
        React.useState<boolean>(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Icons.moreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                onSelect={() => setShowDeleteAlert(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this brand?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async (event) => {
                    event.preventDefault();
                    setIsDeleteLoading(true);

                    const deleted = await deletePost(brand.id);

                    if (deleted) {
                      setIsDeleteLoading(false);
                      setShowDeleteAlert(false);
                      router.refresh();
                    }
                  }}
                  className="bg-red-600 focus:ring-red-600"
                >
                  {isDeleteLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.trash className="mr-2 h-4 w-4" />
                  )}
                  <span>Delete</span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
