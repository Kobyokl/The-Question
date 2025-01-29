import Scene from "@/components/Scene";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import('@/components/Scene'))

export default function Home() {
  return (
    <main className="h-full">
      <Scene />
    </main>
  );
}
