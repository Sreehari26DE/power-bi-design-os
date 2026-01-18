"use client";

import {
    BookOpen,
    HelpCircle,
    Settings,
    Palette,
    Download,
    ExternalLink,
    CheckCircle2,
    Info,
    Lightbulb
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight">How can we help?</h1>
                <p className="text-muted-foreground text-lg">Master the Power BI Design OS with our comprehensive guides.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border bg-gradient-to-br from-primary/5 to-transparent">
                    <CardHeader>
                        <Palette className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Theme Studio</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Learn how to create consistent brand-aligned themes and export them as JSON.
                    </CardContent>
                </Card>
                <Card className="border">
                    <CardHeader>
                        <Lightbulb className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Idea Studio</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Explore industry-standard KPI recommendations and data modeling tips.
                    </CardContent>
                </Card>
                <Card className="border">
                    <CardHeader>
                        <Settings className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Wireframing</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Convert your requirements into low-fidelity dashboard mockups quickly.
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Quick Start Guide
                </h2>

                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {[
                        { title: "Define your Palette", desc: "Start in Theme Studio. Upload a logo or pick primary colors. Ensure contrast checks pass.", icon: Palette },
                        { title: "Generate a Blueprint", desc: "Use Idea Studio to select your domain. Get a structured list of KPIs and visuals.", icon: Lightbulb },
                        { title: "Draft a Layout", desc: "In Wireframes, describe the placement of visuals. Generate 3 layout options.", icon: LayoutTemplate },
                        { title: "Export Assets", desc: "Download the theme.json and build guide. Import into Power BI Desktop.", icon: Download }
                    ].map((step, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border bg-background text-primary font-bold shadow-sm z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                {i + 1}
                            </div>
                            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                                <h3 className="font-bold flex items-center gap-2 mb-1">
                                    <step.icon className="h-4 w-4 text-primary" />
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{step.desc}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I import theme.json into Power BI?</AccordionTrigger>
                        <AccordionContent className="space-y-2">
                            <p>1. Open Power BI Desktop.</p>
                            <p>2. Go to the <strong>View</strong> tab in the ribbon.</p>
                            <p>3. Click the dropdown arrow in the <strong>Themes</strong> section.</p>
                            <p>4. Select <strong>Browse for themes</strong> and choose your downloaded JSON file.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does this app store my data?</AccordionTrigger>
                        <AccordionContent>
                            No. All project data is stored locally in your browser's LocalStorage. We do not use any external databases or authentication providers by default.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I extract colors from any image?</AccordionTrigger>
                        <AccordionContent>
                            Yes! Use the Extract from Image button in Theme Studio. It works best with high-contrast logos or clean dashboard screenshots.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="p-8 rounded-3xl bg-primary text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Ready to build?</h3>
                    <p className="opacity-90">Start your first project in the Theme Studio.</p>
                </div>
                <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
                    <Link href="/theme-studio">Launch Studio</Link>
                </Button>
            </div>
        </div>
    );
}

import { LayoutTemplate } from "lucide-react";
import Link from "next/link";
