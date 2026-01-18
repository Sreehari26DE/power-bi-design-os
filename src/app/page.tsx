import Link from "next/link";
import { ArrowRight, BarChart3, Palette, Layout, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Personal Dashboard Design Suite</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Design World-Class <span className="text-primary italic">Power BI</span> Dashboards
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed italic">
          Generate professional themes, AI-powered design ideas, and wireframes in seconds.
          Built for personal excellence and community sharing.
        </p>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="rounded-full px-8 h-12 text-base">
          <Link href="/theme-studio">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base bg-background">
          <Link href="/help">
            How it Works
          </Link>
        </Button>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <FeatureCard
          icon={<Palette className="h-8 w-8 text-primary" />}
          title="Theme Studio"
          description="Create accessible Power BI theme JSON with live preview and image palette extraction."
        />
        <FeatureCard
          icon={<BarChart3 className="h-8 w-8 text-primary" />}
          title="Idea Studio"
          description="AI-driven dashboard blueprints with KPIs, visuals, and star schema suggestions."
        />
        <FeatureCard
          icon={<Layout className="h-8 w-8 text-primary" />}
          title="Wireframes"
          description="Turn requirements into editable low-fidelity layouts and export build guides."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border bg-background p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
      <div className="mb-4 rounded-2xl bg-primary/5 p-3 w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
