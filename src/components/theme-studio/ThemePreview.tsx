"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 900 },
];

const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
];

export function ThemePreview() {
    const { palette, fontFamily, primaryColor, backgroundColor, textColor } = useThemeStore();

    const activePalette = [primaryColor, ...palette.slice(1)];

    return (
        <div
            className="w-full aspect-[16/9] border shadow-2xl rounded-xl p-8 transition-all"
            style={{
                backgroundColor: backgroundColor,
                fontFamily: fontFamily,
                color: textColor
            }}
        >
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">Executive Sales Overview</h2>
                <div className="flex gap-4">
                    <div className="bg-muted px-4 py-2 rounded-lg text-xs font-mono">Region: All</div>
                    <div className="bg-muted px-4 py-2 rounded-lg text-xs font-mono">Date: YTD</div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Revenue", value: "$4.2M", trend: "+12%" },
                    { label: "Total Profit", value: "$840K", trend: "+8%" },
                    { label: "Orders", value: "12,450", trend: "+15%" },
                    { label: "Returns", value: "2.4%", trend: "-1%" }
                ].map((kpi, i) => (
                    <Card key={i} className="border-none shadow-sm bg-card/50 backdrop-blur">
                        <CardHeader className="p-4 pb-0 text-muted-foreground flex flex-row items-center justify-between space-y-0">
                            <span className="text-xs font-medium uppercase tracking-wider">{kpi.label}</span>
                            <span className={`text-[10px] font-bold ${kpi.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {kpi.trend}
                            </span>
                        </CardHeader>
                        <CardContent className="p-4 pt-1">
                            <div className="text-2xl font-bold">{kpi.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-8 h-[250px]">
                <div className="bg-card/30 p-4 rounded-2xl border flex flex-col">
                    <h3 className="text-sm font-semibold mb-4 ml-2">Revenue Trends</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                            <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Bar dataKey="value" fill={primaryColor} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-card/30 p-4 rounded-2xl border flex flex-col">
                    <h3 className="text-sm font-semibold mb-4 ml-2">Sales Allocation</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={activePalette[index % activePalette.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-8 flex gap-4 overflow-hidden">
                {activePalette.map((color, i) => (
                    <div
                        key={i}
                        className="w-12 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                        title={color}
                    />
                ))}
            </div>
        </div>
    );
}
