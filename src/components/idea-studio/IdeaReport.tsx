"use client";

import {
    CheckCircle2,
    HelpCircle,
    LayoutPanelLeft,
    Database,
    Filter,
    Code,
    AlertOctagon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function IdeaReport() {
    return (
        <div className="space-y-12 max-w-4xl mx-auto pb-12">
            <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Key Business Questions
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        "How does our current revenue compare to target and prior year?",
                        "What is the rolling 3-month profitability trend across departments?",
                        "Which business units are currently exceeding cost budgets?",
                        "What is the projected cash flow for the next quarter?"
                    ].map((q, i) => (
                        <li key={i} className="p-4 rounded-xl border bg-background flex gap-3 items-start">
                            <span className="text-primary font-bold">{i + 1}.</span>
                            <span className="text-sm font-medium">{q}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Recommended KPIs
                </h3>
                <div className="space-y-3">
                    {[
                        { name: "Gross Margin %", def: "Revenue minus COGS divided by Revenue.", calc: "(Total Revenue - Total COGS) / Total Revenue", visual: "KPI Card + Trend Line" },
                        { name: "OPEX Ratio", def: "Operating expenses as a % of total revenue.", calc: "Total Operating Expenses / Total Revenue", visual: "Gauge Chart" },
                        { name: "Working Capital", def: "Current assets minus current liabilities.", calc: "Sum(Assets[Value]) - Sum(Liabilities[Value])", visual: "Waterfall Chart" }
                    ].map((kpi, i) => (
                        <div key={i} className="p-4 rounded-xl border bg-background group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-lg">{kpi.name}</span>
                                <Badge variant="secondary">{kpi.visual}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{kpi.def}</p>
                            <div className="p-2 rounded bg-muted/50 font-mono text-[10px] text-primary flex items-center gap-2">
                                <Code className="h-3 w-3" />
                                {kpi.calc}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <LayoutPanelLeft className="h-5 w-5 text-primary" />
                    Layout & Visual Strategy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border bg-primary/5 space-y-2">
                        <span className="font-bold block">Page 1: Executive</span>
                        <p className="text-xs text-muted-foreground">High-level summary, 4 core KPIs, and period-over-period variance.</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-background space-y-2">
                        <span className="font-bold block">Page 2: Trend Analysis</span>
                        <p className="text-xs text-muted-foreground">Monthly breakdown of revenue vs plan with interactive forecasting.</p>
                    </div>
                    <div className="p-4 rounded-xl border bg-background space-y-2">
                        <span className="font-bold block">Page 3: Cost Details</span>
                        <p className="text-xs text-muted-foreground">Decomposition tree for OpEx and department-level drill-through.</p>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Suggested Data Model
                </h3>
                <div className="p-6 rounded-2xl border bg-muted/30">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Fact Tables</span>
                            <ul className="space-y-2">
                                <li className="text-sm flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Fact_GL_Entries</li>
                                <li className="text-sm flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Fact_Budget</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Dimension Tables</span>
                            <ul className="space-y-2 text-sm italic text-muted-foreground">
                                <li>Dim_Date, Dim_Department, Dim_Account, Dim_Geography</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <AlertOctagon className="h-5 w-5 text-amber-500" />
                    QA & Performance Tips
                </h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Reduce Calculation Cardinality</AccordionTrigger>
                        <AccordionContent>
                            Avoid using complex CALCULATE functions on large fact tables without proper filtering. Use variables (VAR) to store results.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Optimize Visual Density</AccordionTrigger>
                        <AccordionContent>
                            Do not place more than 6-8 visuals on a single page. Use tooltips and drill-throughs for lower-level details.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
    );
}

function Target({ className }: { className?: string }) {
    return <TargetIcon className={className} />;
}

import { Target as TargetIcon } from "lucide-react";
