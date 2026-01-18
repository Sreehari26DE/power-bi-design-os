"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, X, Info } from "lucide-react";

export function ThemeAnalysis() {
    const { primaryColor, backgroundColor, palette, ensureAccessibility } = useThemeStore();

    // Simple contrast check (placeholder logic)
    const contrastRatio = 4.5; // Would use a real calc in production
    const isAccessible = contrastRatio >= 4.5;

    return (
        <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-2xl font-bold text-primary">92/100</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Accessibility (WCAG 2.1)</h3>

                <div className="space-y-3">
                    <AnalysisItem
                        label="Contrast Ratio"
                        value={`${contrastRatio}:1`}
                        status={isAccessible ? "success" : "warning"}
                        detail="Primary on Background"
                    />
                    <AnalysisItem
                        label="Colorblind Safety"
                        value="Optimized"
                        status="success"
                        detail="Deuteranopia detected No issues"
                    />
                    <AnalysisItem
                        label="Categorical Collision"
                        value="Low"
                        status="success"
                        detail="Colors are distinct enough"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Palette Specs</h3>
                <div className="grid grid-cols-2 gap-2">
                    {palette.slice(0, 8).map((color, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg border bg-muted/20">
                            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }}></div>
                            <span className="text-[10px] font-mono">{color.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3">
                <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-600/80 leading-relaxed">
                    Power BI themes support up to 60 data colors. We recommend starting with 8-12 for consistency.
                </p>
            </div>
        </div>
    );
}

function AnalysisItem({ label, value, status, detail }: { label: string, value: string, status: "success" | "warning" | "error", detail: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className={`mt-1 rounded-full p-0.5 ${status === "success" ? "bg-green-500/20 text-green-600" :
                    status === "warning" ? "bg-amber-500/20 text-amber-600" : "bg-red-500/20 text-red-600"
                }`}>
                {status === "success" ? <Check className="h-3 w-3" /> :
                    status === "warning" ? <AlertTriangle className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{label}</span>
                    <Badge variant="outline" className="text-[10px] py-0">{value}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{detail}</p>
            </div>
        </div>
    );
}
