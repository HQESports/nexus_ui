'use client'

import {
    BarChart,
    Briefcase,
    Layers,
    Map,
    LucideIcon,
    Activity,
    Layout,
    Users,
    Compass,
    Image,
    MapPin,
    MapIcon,
    Building,
    Users2,
    Sparkle,
    SkullIcon,
    Trophy
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Define types for our navigation items
type NavItem = {
    title: string;
    href: string;
    icon: LucideIcon;
};

// Define types for our navigation groups
type NavGroup = {
    title: string;
    items: NavItem[];
};

const baseURL = "/dashboard";

// Define our navigation structure
const navigation: NavGroup[] = [
    {
        title: "Services",
        items: [
            {
                title: "Analytics",
                href: "/dashboard/metrics",
                icon: BarChart,
            },
            {
                title: "Jobs",
                href: "/dashboard/jobs",
                icon: Briefcase,
            },
            {
                title: "Teams",
                href: "/dashboard/teams",
                icon: Users2
            },
            {
                title: "Players",
                href: "/dashboard/players",
                icon: Users,
            },
            {
                title: "Tournaments",
                href: "/dashboard/tournaments",
                icon: Trophy,
            }
        ],
    },
    {
        title: "Analytics",
        items: [
            {
                title: "Zone Heatmap",
                href: "/dashboard/analytics/heatmap",
                icon: MapIcon,
            },
            {
                title: "Unplayable Maps",
                href: "/dashboard/analytics/unplayable-maps",
                icon: Map,
            },
            {
                title: "IGL Simulator",
                href: "/dashboard/analytics/igl-simulator",
                icon: Users,
            },
            {
                title: "Team Rotations",
                href: "/dashboard/analytics/team-rotations",
                icon: Compass,
            },
        ],
    },
    {
        title: "AI",
        items: [
            {
                title: "Zone AI",
                href: "/dashboard/ai/zone-ai",
                icon: Sparkle,
            },
            {
                title: "Killfeed AI",
                href: "/dashboard/ai/killfeed-ai",
                icon: SkullIcon,
            },
        ]
    },
    {
        title: "Drop Maps",
        items: [
            {
                title: "Generator",
                href: "/dashboard/dropmaps/generator",
                icon: Layers,
            },
            {
                title: "Spots Manager",
                href: "/dashboard/dropmaps/spots-manager",
                icon: MapPin,
            },
        ],
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="py-4 px-6 border-b">
                <a
                    href="/dashboard/nexus"
                    className="text-xl font-bold bg-none  block px-2 py-1 rounded"
                >
                    NEXUS
                </a>
            </SidebarHeader>
            <SidebarContent>
                {navigation.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.href}
                                        >
                                            <a href={item.href} className="flex items-center gap-3">
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}