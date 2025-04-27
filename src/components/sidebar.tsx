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
    Users2
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

// Define our navigation structure
const navigation: NavGroup[] = [
    {
        title: "Services",
        items: [
            {
                title: "Analytics",
                href: "/metrics",
                icon: BarChart,
            },
            {
                title: "Jobs",
                href: "/jobs",
                icon: Briefcase,
            },
            {
                title: "Teams",
                href: "/teams",
                icon: Users2
            }
        ],
    },
    {
        title: "Analytics",
        items: [
            {
                title: "Zone Heatmap",
                href: "/analytics/heatmap",
                icon: MapIcon,
            },
            {
                title: "Unplayable Maps",
                href: "/analytics/unplayable-maps",
                icon: Map,
            },
            {
                title: "IGL Simulator",
                href: "/analytics/igl-simulator",
                icon: Users,
            },
            {
                title: "Team Rotations",
                href: "/analytics/team-rotations",
                icon: Compass,
            },
        ],
    },
    {
        title: "Drop Maps",
        items: [
            {
                title: "Generator",
                href: "/dropmaps/generator",
                icon: Layers,
            },
            {
                title: "Logo Manager",
                href: "/dropmaps/logo-manager",
                icon: Image,
            },
            {
                title: "Spots Manager",
                href: "/dropmaps/spots-manager",
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
                <h2 className="text-xl font-bold">NEXUS</h2>
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