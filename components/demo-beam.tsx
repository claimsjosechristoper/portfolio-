import { GridBeam } from "@/components/ui/background-grid-beam";

export default function DemoOne() {
  return <div className="w-full h-[400px] dark:bg-grid-white/[0.05] bg-grid-black/[0.07] border">
    <GridBeam className="sm:pl-16 pt-28 pl-4 flex items-start justify-start">
      <div className="grid gap-2">
        <h1 className="sm:text-5xl text-4xl font-bold max-w-sm">Hero Section That Converts.</h1>
        <p className="text-neutral-500 max-w-lg">
          Showcase your creativity with a dynamic grid beam background—where modern aesthetics meet functional design.
        </p>
      </div>
    </GridBeam>
  </div>;
}
