"use client";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Sparkles,
    Target,
    Users,
    History,
    Briefcase,
    Lightbulb,
    FileText,
    Copy,
    Download
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IdeaReport } from "@/components/idea-studio/IdeaReport";

export default function IdeaStudioPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasIdea, setHasIdea] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setHasIdea(true);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Idea Studio</h1>
                    <p className="text-muted-foreground">AI-assisted dashboard blueprint generator for any domain.</p>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
                {/* Left Panel: Parameters */}
                <aside className="lg:col-span-1 flex flex-col border rounded-3xl bg-background overflow-hidden">
                    <div className="p-4 border-b bg-muted/30">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            Blueprint Parameters
                        </h2>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-4 space-y-6">
                            <div className="space-y-2">
                                <Label>Domain</Label>
                                <Select defaultValue="finance">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select domain" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="sales">Sales & Marketing</SelectItem>
                                        <SelectItem value="retail">Retail/E-commerce</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="hr">Human Resources</SelectItem>
                                        <SelectItem value="it">IT Operations</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Audience</Label>
                                <Select defaultValue="executive">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="analyst">Analyst (Detailed)</SelectItem>
                                        <SelectItem value="manager">Manager (Tactical)</SelectItem>
                                        <SelectItem value="executive">Executive (Strategic)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Primary Goal</Label>
                                <Select defaultValue="growth">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select goal" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="growth">Revenue Growth</SelectItem>
                                        <SelectItem value="efficiency">Cost Efficiency</SelectItem>
                                        <SelectItem value="compliance">Compliance & Risk</SelectItem>
                                        <SelectItem value="retention">Customer Retention</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="pt-4">
                                <Button className="w-full h-12" onClick={handleGenerate} disabled={isGenerating}>
                                    {isGenerating ? (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                            Designing Blueprint...
                                        </>
                                    ) : (
                                        <>
                                            <Lightbulb className="mr-2 h-4 w-4" />
                                            Generate Blueprint
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </ScrollArea>
                </aside>

                {/* Center/Right Panel: Result */}
                <main className="lg:col-span-3 flex flex-col border rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 overflow-hidden relative">
                    {!hasIdea && !isGenerating ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="rounded-full bg-primary/10 p-6 mb-4">
                                <Sparkles className="h-12 w-12 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Ready to Brainstorm?</h2>
                            <p className="max-w-md text-muted-foreground">
                                Select your domain and target audience on the left to generate a structured dashboard strategy.
                            </p>
                        </div>
                    ) : isGenerating ? (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lg font-medium animate-pulse">Consulting virtual experts...</p>
                        </div>
                    ) : (
                        <>
                            <div className="p-4 border-b flex items-center justify-between bg-background/50 backdrop-blur-sm">
                                <h2 className="font-bold flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    Blueprint: Strategic Finance Dashboard
                                </h2>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Copy className="mr-2 h-3 w-3" />
                                        Copy All
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-3 w-3" />
                                        Export PDF
                                    </Button>
                                </div>
                            </div>
                            <ScrollArea className="flex-1">
                                <div className="p-8">
                                    <IdeaReport />
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
