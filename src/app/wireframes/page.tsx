"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Sparkles,
    LayoutTemplate,
    Grid3X3,
    Download,
    Trash2,
    Plus,
    MousePointer2,
    Box
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export default function WireframesPage() {
    const [description, setDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentWireframe, setCurrentWireframe] = useState<any[] | null>(null);

    const layouts = {
        A: [
            { id: 1, type: "header", x: 0, y: 0, w: 12, h: 2, label: "Strategic Header" },
            { id: 2, type: "kpi", x: 0, y: 2, w: 3, h: 3, label: "KPI 1" },
            { id: 3, type: "kpi", x: 3, y: 2, w: 3, h: 3, label: "KPI 2" },
            { id: 4, type: "kpi", x: 6, y: 2, w: 3, h: 3, label: "KPI 3" },
            { id: 5, type: "kpi", x: 9, y: 2, w: 3, h: 3, label: "KPI 4" },
            { id: 6, type: "chart", x: 0, y: 5, w: 8, h: 10, label: "Main Trend" },
            { id: 7, type: "chart", x: 8, y: 5, w: 4, h: 10, label: "Details" },
        ],
        B: [
            { id: 1, type: "header", x: 0, y: 0, w: 12, h: 2, label: "Operational Header" },
            { id: 2, type: "chart", x: 0, y: 2, w: 12, h: 7, label: "Full Width Trend" },
            { id: 3, type: "kpi", x: 0, y: 9, w: 4, h: 6, label: "Metrics A" },
            { id: 4, type: "kpi", x: 4, y: 9, w: 4, h: 6, label: "Metrics B" },
            { id: 5, type: "kpi", x: 8, y: 9, w: 4, h: 6, label: "Metrics C" },
        ],
        C: [
            { id: 1, type: "nav", x: 0, y: 0, w: 2, h: 15, label: "Sidebar" },
            { id: 2, type: "header", x: 2, y: 0, w: 10, h: 2, label: "Analytics Overview" },
            { id: 3, type: "grid", x: 2, y: 2, w: 10, h: 13, label: "Matrix Layout" },
        ]
    };

    const downloadBuildGuide = () => {
        if (!currentWireframe) return;
        const md = `# Dashboard Build Guide

## Layout Map
${currentWireframe.map(el => `- **${el.label}**: Grid [col: ${el.x}, span: ${el.w}] [row: ${el.y}, span: ${el.h}]`).join('\n')}

## Visual Specifications
- **Template Identity**: Custom Grid
- **Responsive Target**: 1280x720 (Desktop)
- **Component Count**: ${currentWireframe.length}

## Steps to Build in Power BI
1. Set Canvas size to 16:9.
2. Turn on Gridlines and Snap to Grid.
3. Place visuals according to the layout map above.
`;
        const element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(md));
        element.setAttribute("download", "BUILD_GUIDE.md");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setCurrentWireframe(layouts.A);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Wireframe Studio</h1>
                    <p className="text-muted-foreground">Draft low-fidelity dashboard layouts from natural language descriptions.</p>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
                {/* Left Panel: Inputs */}
                <aside className="lg:col-span-1 flex flex-col border rounded-3xl bg-background overflow-hidden">
                    <div className="p-4 border-b bg-muted/30">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Requirement Brief
                        </h2>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-4 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="brief">Describe your dashboard</Label>
                                <Textarea
                                    id="brief"
                                    placeholder="e.g. A sales dashboard for managers..."
                                    className="min-h-[150px] resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" size="sm" onClick={() => { setDescription(""); setCurrentWireframe(null); }}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Clear
                                </Button>
                                <Button size="sm" disabled={!description || isGenerating} onClick={handleGenerate}>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Draft
                                </Button>
                            </div>

                            {currentWireframe && (
                                <div className="space-y-4 pt-4 border-t">
                                    <Label>Layout Options</Label>
                                    <div className="flex gap-2">
                                        {['A', 'B', 'C'].map((opt) => (
                                            <Button
                                                key={opt}
                                                variant={currentWireframe === (layouts as any)[opt] ? "default" : "outline"}
                                                className="flex-1"
                                                onClick={() => setCurrentWireframe((layouts as any)[opt])}
                                            >
                                                Option {opt}
                                            </Button>
                                        ))}
                                    </div>
                                    <Button variant="secondary" className="w-full" onClick={downloadBuildGuide}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Export Build Guide
                                    </Button>
                                </div>
                            )}

                            <div className="space-y-4 pt-4 border-t">
                                <Label>Manual Components</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="secondary" size="sm" className="justify-start">
                                        <Box className="mr-2 h-4 w-4" /> KPI Block
                                    </Button>
                                    <Button variant="secondary" size="sm" className="justify-start">
                                        <Grid3X3 className="mr-2 h-4 w-4" /> Grid
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </aside>

                {/* Canvas Area */}
                <main className="lg:col-span-3 flex flex-col border rounded-3xl bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
                    <div className="p-4 border-b flex items-center justify-between bg-background/80 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 rounded-md border bg-background p-1">
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MousePointer2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 bg-primary/10">
                                    <LayoutTemplate className="h-4 w-4 text-primary" />
                                </Button>
                            </div>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Canvas 1280x720</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                New Version
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-auto flex items-center justify-center">
                        {!currentWireframe && !isGenerating ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-muted-foreground/30">
                                    <LayoutTemplate className="h-8 w-8 text-muted-foreground/30" />
                                </div>
                                <p className="text-muted-foreground italic">Your canvas is empty.</p>
                            </div>
                        ) : isGenerating ? (
                            <div className="w-[800px] h-[450px] bg-white dark:bg-slate-950 border-4 border-primary/20 rounded shadow-xl flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                                        <div className="bg-primary h-full animate-progress-fast" style={{ width: '40%' }}></div>
                                    </div>
                                    <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground animate-pulse">Computing Spatial Layout</span>
                                </div>
                            </div>
                        ) : (
                            <div className="w-[800px] h-[450px] bg-white dark:bg-slate-950 border border-muted-foreground/20 rounded shadow-2xl relative grid grid-cols-12 grid-rows-15 p-4 gap-2">
                                {currentWireframe?.map(el => (
                                    <div
                                        key={el.id}
                                        className="bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-center p-2 text-center group cursor-move hover:border-primary/50 transition-colors"
                                        style={{
                                            gridColumn: `span ${el.w}`,
                                            gridRow: `span ${el.h}`,
                                        }}
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground group-hover:text-primary">{el.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
