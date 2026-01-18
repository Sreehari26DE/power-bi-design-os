"use client";

import { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Palette, Share2, Download, CheckCircle2, AlertCircle, FileJson, FileCode, FileText, Layout } from "lucide-react";
import { ThemeControls } from "@/components/theme-studio/ThemeControls";
import { ThemePreview } from "@/components/theme-studio/ThemePreview";
import { ThemeAnalysis } from "@/components/theme-studio/ThemeAnalysis";
import {
    generatePbiTheme,
    generateCssVariables,
    generateFigmaTokens,
    generateStyleGuide,
    downloadJson
} from "@/lib/themeGenerator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeStudioPage() {
    const [activeTab, setActiveTab] = useState("controls");
    const { palette, backgroundColor, textColor, fontFamily, primaryColor } = useThemeStore();

    const handleExport = (format: 'json' | 'css' | 'figma' | 'md') => {
        switch (format) {
            case 'json':
                const json = generatePbiTheme("My Theme", palette, backgroundColor, textColor, fontFamily);
                downloadJson("theme.json", JSON.stringify(json, null, 2));
                break;
            case 'css':
                const css = generateCssVariables(palette, backgroundColor, textColor);
                downloadJson("variables.css", css);
                break;
            case 'figma':
                const figma = generateFigmaTokens("Design OS", palette, backgroundColor, textColor);
                downloadJson("tokens.json", figma);
                break;
            case 'md':
                const md = generateStyleGuide("Design OS", palette, backgroundColor, textColor, fontFamily);
                downloadJson("STYLE_GUIDE.md", md);
                break;
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Theme Studio</h1>
                    <p className="text-muted-foreground">Craft professional Power BI themes with accessibility in mind.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export Assets
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => handleExport('json')}>
                                <FileJson className="mr-2 h-4 w-4" />
                                Power BI Theme (.json)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('css')}>
                                <FileCode className="mr-2 h-4 w-4" />
                                CSS Variables (.css)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('figma')}>
                                <Layout className="mr-2 h-4 w-4" />
                                Figma Design Tokens (.json)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('md')}>
                                <FileText className="mr-2 h-4 w-4" />
                                Style Guide (.md)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                {/* Left Panel: Inputs & Controls */}
                <aside className="lg:col-span-3 flex flex-col border rounded-3xl bg-background overflow-hidden">
                    <div className="p-4 border-b bg-muted/30">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Palette className="h-4 w-4 text-primary" />
                            Design Controls
                        </h2>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-4">
                            <ThemeControls />
                        </div>
                    </ScrollArea>
                </aside>

                {/* Center Panel: Live Preview */}
                <main className="lg:col-span-6 flex flex-col border rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between bg-background/50 backdrop-blur-sm">
                        <Tabs defaultValue="desktop" className="w-[400px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="desktop">Desktop Preview</TabsTrigger>
                                <TabsTrigger value="mobile">Mobile View</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="flex-1 p-6 overflow-auto">
                        <ThemePreview />
                    </div>
                </main>

                {/* Right Panel: Analysis & Suggestions */}
                <aside className="lg:col-span-3 flex flex-col border rounded-3xl bg-background overflow-hidden">
                    <div className="p-4 border-b bg-muted/30">
                        <h2 className="font-semibold flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Theme Health
                        </h2>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-4">
                            <ThemeAnalysis />
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t bg-muted/20">
                        <Button className="w-full" variant="secondary">
                            Auto-fix Issues
                        </Button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
