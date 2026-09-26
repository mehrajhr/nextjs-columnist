"use client";

import Link from "next/link";
import {
  BellIcon,
  ChevronDownIcon,
  CreditCardIcon,
  HelpCircleIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Activity", href: "#activity" },
  { label: "Reports", href: "#reports" },
];

const accountItems = [
  { label: "Profile", icon: UserIcon },
  { label: "Billing", icon: CreditCardIcon },
  { label: "Settings", icon: SettingsIcon },
  { label: "Help center", icon: HelpCircleIcon },
];

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      aria-label="Primary navigation"
      className={
        mobile ? "flex flex-col gap-1" : "hidden items-center gap-1 md:flex"
      }
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 px-2"
          aria-label="Open user menu"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">
            Jordan Davis
          </span>
          <ChevronDownIcon className="hidden size-4 text-muted-foreground sm:inline" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span>Jordan Davis</span>
              <span className="font-normal text-muted-foreground">
                jordan@example.com
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {accountItems.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem key={item.label} onClick={() => undefined}>
                <Icon />
                {item.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => undefined}>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-70 sm:w-[320px]">
            <SheetHeader className="border-b px-4 pb-5">
              <SheetTitle className="flex items-center gap-2 text-left">
                Columnist
              </SheetTitle>
            </SheetHeader>
            <div className="px-4">
              <NavLinks mobile />
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href="#overview"
          className="flex shrink-0 items-center gap-2"
          aria-label="Northstar home"
        >
          <span className="text-2xl font-bold tracking-tight">Columnist</span>
        </Link>

        <NavLinks />
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Notifications"
          >
            <BellIcon />
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
