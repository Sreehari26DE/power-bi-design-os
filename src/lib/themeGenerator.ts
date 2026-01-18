export interface ThemeJson {
    name: string;
    dataColors: string[];
    background: string;
    foreground: string;
    tableAccent: string;
    visualStyles: any;
}

export function generatePbiTheme(
    name: string,
    palette: string[],
    background: string,
    foreground: string,
    fontFamily: string
): ThemeJson {
    return {
        name: name || "Custom Power BI Theme",
        dataColors: palette,
        background: background,
        foreground: foreground,
        tableAccent: palette[0],
        visualStyles: {
            "*": {
                "*": {
                    "*": [
                        {
                            fontSize: 11,
                            fontFamily: fontFamily,
                            color: { solid: { color: foreground } },
                        },
                    ],
                    background: [
                        {
                            show: true,
                            color: { solid: { color: background } },
                            transparency: 0,
                        },
                    ],
                    border: [
                        {
                            show: false,
                            color: { solid: { color: "#E6E6E6" } },
                        },
                    ],
                },
            },
        },
    };
}

export function generateCssVariables(palette: string[], background: string, foreground: string): string {
    return `:root {
  --pbi-background: ${background};
  --pbi-foreground: ${foreground};
  ${palette.map((c, i) => `--pbi-color-${i + 1}: ${c};`).join('\n  ')}
}`;
}

export function generateFigmaTokens(name: string, palette: string[], background: string, foreground: string): string {
    const tokens: any = {
        [name]: {
            "Colors": {
                "Background": { "value": background, "type": "color" },
                "Foreground": { "value": foreground, "type": "color" },
                "Palette": palette.reduce((acc: any, c, i) => {
                    acc[`Color ${i + 1}`] = { "value": c, "type": "color" };
                    return acc;
                }, {})
            }
        }
    };
    return JSON.stringify(tokens, null, 2);
}

export function generateStyleGuide(name: string, palette: string[], background: string, foreground: string, fontFamily: string): string {
    return `# Style Guide: ${name}

## Colors
- **Background**: ${background}
- **Foreground**: ${foreground}

### Data Palette
${palette.map((c, i) => `- Color ${i + 1}: ${c} ![#${c.replace('#', '')}](https://via.placeholder.com/15/${c.replace('#', '')}/000000?text=+)`).join('\n')}

## Typography
- **Primary Font**: ${fontFamily}

## Implementation
- Import the provided \`theme.json\` via View > Themes > Browse for themes.
`;
}

export function downloadJson(filename: string, text: string) {
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
