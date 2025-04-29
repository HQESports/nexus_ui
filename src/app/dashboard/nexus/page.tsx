"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BarChart, Users, Briefcase, Sparkle, Map } from "lucide-react";

export default function DashboardLandingPage() {
    const router = useRouter();

    const sections = [
        {
            title: "Analytics",
            description: "Dive into data-driven insights to improve your team's performance.",
            icon: BarChart,
            tools: [
                {
                    title: "Zone Heatmap",
                    description: "Visualize heatmaps of circle zones to analyze player activity and strategies.",
                    href: "/dashboard/analytics/heatmap",
                },
                {
                    title: "Team Rotations",
                    description: "Analyze team rotations and strategies across matches.",
                    href: "/dashboard/analytics/team-rotations",
                },
                {
                    title: "Unplayable Maps",
                    description: "Identify and analyze areas of maps that are unplayable.",
                    href: "/dashboard/analytics/unplayable-maps",
                },
            ],
        },
        {
            title: "Services",
            description: "Manage teams, monitor jobs, and track metrics in one place.",
            icon: Users,
            tools: [
                {
                    title: "Teams Management",
                    description: "View and manage all your teams, players, and their details.",
                    href: "/dashboard/teams",
                },
                {
                    title: "Job Dashboard",
                    description: "Monitor and manage background tasks and processes.",
                    href: "/dashboard/jobs",
                },
                {
                    title: "Metrics",
                    description: "Track and analyze key performance metrics for your teams.",
                    href: "/dashboard/metrics",
                },
            ],
        },
        {
            title: "AI Tools",
            description: "Leverage AI-powered tools for advanced analytics and insights.",
            icon: Sparkle,
            tools: [
                {
                    title: "Zone AI",
                    description: "Use AI to predict zone movements and optimize strategies.",
                    href: "/dashboard/ai/zone-ai",
                },
                {
                    title: "Killfeed AI",
                    description: "Analyze killfeed data to gain insights into player performance.",
                    href: "/dashboard/ai/killfeed-ai",
                },
            ],
        },
        {
            title: "Drop Maps",
            description: "Create and manage drop maps for your teams.",
            icon: Map,
            tools: [
                {
                    title: "Generator",
                    description: "Generate drop maps for your teams based on match data.",
                    href: "/dashboard/dropmaps/generator",
                },
                {
                    title: "Logo Manager",
                    description: "Manage team logos for use in drop maps.",
                    href: "/dashboard/dropmaps/logo-manager",
                },
                {
                    title: "Spots Manager",
                    description: "Define and manage drop spots for your teams.",
                    href: "/dashboard/dropmaps/spots-manager",
                },
            ],
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Nexus Dashboard</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Explore the tools and features available to help you manage your teams, analyze data, and optimize performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <section.icon className="h-6 w-6 text-primary" />
                                <CardTitle>{section.title}</CardTitle>
                            </div>
                            <CardDescription>{section.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {section.tools.map((tool, toolIndex) => (
                                    <li key={toolIndex}>
                                        <button
                                            onClick={() => router.push(tool.href)}
                                            className="text-left w-full"
                                        >
                                            <h3 className="text-sm font-medium text-primary hover:underline">
                                                {tool.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">{tool.description}</p>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}