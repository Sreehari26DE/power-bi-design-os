"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ColorThief from "colorthief";
import { useThemeStore } from "@/store/useThemeStore";
import { Button } from "@/components/ui/button";
import { Upload, X, Check } from "lucide-react";

export function ImagePaletteExtractor({ onComplete }: { onComplete: () => void }) {
    const [image, setImage] = useState<string | null>(null);
    const [extractedColors, setExtractedColors] = useState<string[]>([]);
    const { setPalette, setPrimaryColor } = useThemeStore();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            setImage(dataUrl);

            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(img, 10);
                const hexPalette = palette.map((rgb: number[]) =>
                    "#" + rgb.map(x => x.toString(16).padStart(2, "0")).join("")
                );
                setExtractedColors(hexPalette);
            };
        };
        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    const applyPalette = () => {
        if (extractedColors.length > 0) {
            setPalette(extractedColors);
            setPrimaryColor(extractedColors[0]);
            onComplete();
        }
    };

    return (
        <div className="space-y-4">
            {!image ? (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
                        }`}
                >
                    <input {...getInputProps()} />
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Drag & drop logo, or click to select</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden border bg-black/5">
                        <img src={image} alt="Uploaded" className="object-contain w-full h-full" />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => { setImage(null); setExtractedColors([]); }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Extracted Palette</Label>
                        <div className="flex flex-wrap gap-2">
                            {extractedColors.map((color, i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-lg border shadow-sm flex items-center justify-center group relative cursor-pointer"
                                    style={{ backgroundColor: color }}
                                >
                                    <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white text-[10px] px-1.5 py-0.5 rounded">
                                        {color}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full" onClick={applyPalette}>
                        <Check className="mr-2 h-4 w-4" />
                        Apply This Palette
                    </Button>
                </div>
            )}
        </div>
    );
}

import { Label } from "@/components/ui/label";
