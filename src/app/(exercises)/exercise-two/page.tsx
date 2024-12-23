import FixedRange from "@/components/FixedRange";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Exercise Two" };

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/exercise-two");

  const response = await data.json();

  return (
    <div className="space-y-10 ">
      <h2 className="scroll-m-20  pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0 ">
        Fixed Values Range:
      </h2>
      <FixedRange values={response.rangeValues} />
    </div>
  );
}
