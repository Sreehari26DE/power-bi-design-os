"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, Palette, Layout, Library, HelpCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Theme Studio", href: "/theme-studio", icon: Palette },
    { name: "Idea Studio", href: "/idea-studio", icon: BarChart3 },
    { name: "Wireframes", href: "/wireframes", icon: Layout },
    { name: "Library", href: "/library", icon: Library },
    { name: "Help", href: "/help", icon: HelpCircle },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary p-1.5 text-primary-foreground">
                        <BarChart3 className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Power BI Design OS</span>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        Login
                    </Button>
                </div>
            </div>
        </nav>
    );
}
