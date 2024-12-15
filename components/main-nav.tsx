"use client";

import * as React from "react";
import Link from "next/link";
import {useSelectedLayoutSegment} from "next/navigation";

import {MainNavItem} from "@/types";
import {cn} from "@/lib/utils";
import {Icons} from "@/components/icons";
import {MobileNav} from "@/components/mobile-nav";
import Image from "next/image";

interface MainNavProps {
    items?: MainNavItem[];
    children?: React.ReactNode;
}

export function MainNav({items, children}: MainNavProps) {
    const segment = useSelectedLayoutSegment();
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

    return (
        <div className="flex ">
            <Link
                href="/admin/dashboard"
                className="hidden items-center space-x-2 md:flex"
            >
                <Image
                    width={24}
                    height={24}
                    src="/terrum_circle.svg"
                    alt="Logo"
                    className="w-9 h-auto lg:ml-8"
                />
                <span className="hidden font-bold sm:inline-block">Terrum</span>
            </Link>
            {items?.length ? (
                <nav className="hidden gap-6 md:flex">
                    {items?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.disabled ? "#" : item.href}
                            className={cn(
                                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                                item.href.startsWith(`/${segment}`)
                                    ? "text-foreground"
                                    : "text-foreground/60",
                                item.disabled && "cursor-not-allowed opacity-80"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            ) : null}
            <button
                className="flex items-center space-x-2 md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? <Icons.close/> : <Icons.menu/>}
                <span className="font-bold">Menu</span>
            </button>
            {showMobileMenu && items && (
                <MobileNav items={items}>{children}</MobileNav>
            )}
        </div>
    );
}
