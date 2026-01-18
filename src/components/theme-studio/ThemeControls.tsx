"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Upload, Grid } from "lucide-react";
import trendingPalettes from "@/data/trending-palettes.json";

export function ThemeControls() {
    const {
        baseMode,
        primaryColor,
        fontFamily,
        vibrance,
        contrast,
        ensureAccessibility,
        colorblindSafe,
        updateSetting,
        resetTheme,
        setPalette,
        setPrimaryColor
    } = useThemeStore();

    const applyLibraryPalette = (p: any) => {
        setPalette(p.colors);
        setPrimaryColor(p.colors[0]);
        updateSetting('backgroundColor', p.background);
        updateSetting('textColor', p.foreground);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                    <Grid className="h-3 w-3" />
                    Palette Library
                </Label>
                <div className="grid grid-cols-2 gap-2">
                    {trendingPalettes.slice(0, 4).map((p) => (
                        <button
                            key={p.name}
                            onClick={() => applyLibraryPalette(p)}
                            className="group p-2 rounded-xl border bg-card hover:border-primary transition-all text-left"
                        >
                            <div className="flex gap-1 h-3 mb-1.5 rounded-full overflow-hidden">
                                {p.colors.slice(0, 4).map((c, i) => (
                                    <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                                ))}
                            </div>
                            <span className="text-[10px] font-medium truncate block">{p.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Base Mode</Label>
                <Select
                    value={baseMode}
                    onValueChange={(val) => updateSetting('baseMode', val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="both">Both (Export Hybrid)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                    <Input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => updateSetting('primaryColor', e.target.value)}
                        className="w-12 h-10 p-1"
                    />
                    <Input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => updateSetting('primaryColor', e.target.value)}
                        className="flex-1 font-mono"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Typography</Label>
                <Select
                    value={fontFamily}
                    onValueChange={(val) => updateSetting('fontFamily', val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Segoe UI">Segoe UI (Default)</SelectItem>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Outfit">Outfit</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4 pt-2 border-t">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>Vibrance</Label>
                        <span className="text-xs text-muted-foreground">{vibrance}%</span>
                    </div>
                    <Slider
                        value={[vibrance]}
                        onValueChange={([val]) => updateSetting('vibrance', val)}
                        max={100}
                        step={1}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>Contrast</Label>
                        <span className="text-xs text-muted-foreground">{contrast}%</span>
                    </div>
                    <Slider
                        value={[contrast]}
                        onValueChange={([val]) => updateSetting('contrast', val)}
                        max={100}
                        step={1}
                    />
                </div>
            </div>

            <div className="space-y-4 pt-2 border-t">
                <div className="flex items-center justify-between">
                    <Label htmlFor="accessibility" className="flex flex-col gap-1 cursor-pointer">
                        <span>Ensure Accessibility</span>
                        <span className="text-xs font-normal text-muted-foreground">Auto-adjust contrast ratios</span>
                    </Label>
                    <Switch
                        id="accessibility"
                        checked={ensureAccessibility}
                        onCheckedChange={(val) => updateSetting('ensureAccessibility', val)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Label htmlFor="colorblind" className="flex flex-col gap-1 cursor-pointer">
                        <span>Colorblind Safe</span>
                        <span className="text-xs font-normal text-muted-foreground">Optimize for CVD users</span>
                    </Label>
                    <Switch
                        id="colorblind"
                        checked={colorblindSafe}
                        onCheckedChange={(val) => updateSetting('colorblindSafe', val)}
                    />
                </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => resetTheme()}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Reset to Default
                </Button>
            </div>

            <div className="space-y-2 pt-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-dashed">
                            <Upload className="mr-2 h-4 w-4" />
                            Extract from Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Extract Palette from Image</DialogTitle>
                            <DialogDescription>
                                Upload a brand logo or dashboard screenshot to automatically extract a professional color palette.
                            </DialogDescription>
                        </DialogHeader>
                        <ImagePaletteExtractor onComplete={() => { }} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { ImagePaletteExtractor } from "./ImagePaletteExtractor";
