"use client";

import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {signOut, useSession} from "next-auth/react";

export function UserAccountNav() {
    const {data: session} = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                    <AvatarImage
                        src={session?.user.image ?? "/profile_picture_placeholder.png"}
                    />
                    <AvatarFallback>AN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link className="cursor-pointer" href="/admin/profile">
                        My Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        signOut({callbackUrl: "/"});
                    }}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
