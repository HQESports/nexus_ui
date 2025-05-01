// components/navbar.tsx
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface NavbarProps {
    className?: string
}

export function Navbar({ className }: NavbarProps) {
    return (
        <div className={cn("border-b w-full", className)}>
            <div className="flex h-17 items-center px-6">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold">Nexus</h1>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}