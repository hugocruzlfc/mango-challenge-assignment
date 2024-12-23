import NormalRange from "@/components/NormalRange";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Exercise One" };

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/exercise-one");

  const response = await data.json();

  return (
    <div className="space-y-10 ">
      <h2 className="scroll-m-20  pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0 ">
        Normal Range:
      </h2>
      <NormalRange
        min={response.min}
        max={response.max}
      />
    </div>
  );
}
