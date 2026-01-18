"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    Trash2,
    ExternalLink,
    MoreVertical,
    Palette,
    Layout,
    BarChart3,
    Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockProjects = [
    { id: 1, name: "Project Alpha", domain: "Finance", type: "Theme & Idea", date: "2024-01-18", colors: ["#0070f3", "#ff0080", "#7928ca"] },
    { id: 2, name: "Retail Ops V2", domain: "Retail", type: "Wireframe", date: "2024-01-15", colors: ["#059669", "#10b981", "#34d399"] },
    { id: 3, name: "HR Dashboard", domain: "Human Resources", type: "Full Pack", date: "2024-01-10", colors: ["#f59e0b", "#d97706", "#b45309"] },
];

export default function LibraryPage() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Project Library</h1>
                    <p className="text-muted-foreground">Manage your saved themes, blueprints, and wireframes.</p>
                </div>
                <div className="flex w-full md:w-auto items-center gap-2">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                    <Button>
                        New Project
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(project => (
                    <Card key={project.id} className="overflow-hidden group hover:border-primary/50 transition-all">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2 text-primary">
                                    {project.type === "Wireframe" ? <Layout className="h-4 w-4" /> :
                                        project.type === "Full Pack" ? <BarChart3 className="h-4 w-4" /> : <Palette className="h-4 w-4" />}
                                    <span className="text-xs font-bold uppercase tracking-widest">{project.type}</span>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Rename</DropdownMenuItem>
                                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardTitle className="text-xl mt-2">{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <Badge variant="secondary">{project.domain}</Badge>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {project.date}
                                </div>
                            </div>
                            <div className="flex gap-1 h-8 rounded-md overflow-hidden">
                                {project.colors.map((c, i) => (
                                    <div key={i} className="flex-1" style={{ backgroundColor: c }}></div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button variant="ghost" className="w-full text-xs hover:bg-primary/5 hover:text-primary">
                                Open Project <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {/* Empty State */}
                {mockProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-muted-foreground italic">No projects found for "{search}"</div>
                    </div>
                )}
            </div>
        </div>
    );
}
