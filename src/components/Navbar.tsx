"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import RubberSegment from "./RubberSegment";

const navigation = [
  { label: "Home", value: "/" },
  { label: "About", value: "/about" },
  { label: "Skills", value: "/skills" },
  { label: "Projects", value: "/projects" },
  { label: "Contact", value: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const activePage =
    navigation.find((item) => item.value === pathname)?.value ?? "/";

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-4">
      <nav data-no-glow className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-neutral-950/80 px-5 py-4 shadow-2xl backdrop-blur-xl md:rounded-full">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          R<span className="text-lime-400">.</span>
        </Link>

        {/* Rubber Navigation */}
        <div className="max-w-full overflow-x-auto">
          <RubberSegment
            items={navigation}
            defaultValue="/"
            value={activePage}
            onChange={(value: string) => router.push(value)}
            trackColor="#27272a"
            thumbColor="#fafafa"
            textColor="#fafafa"
            activeTextColor="#18181b"
            size="md"
            radius={12}
            inset={3}
            equalSlots={false}
            stretch={100}
            squash={3}
            speed={1}
            glide={75}
            draggable
          />
        </div>

        {/* Status */}
        <div className="hidden items-center gap-2 lg:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
          <span className="text-xs text-neutral-300">
            Not Available Yet
          </span>
        </div>

      </nav>
    </header>
  );
}