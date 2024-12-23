import NormalRange from "@/components/NormalRange";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Exercise One" };

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/exercise-one");

  const response = await data.json();

  return (
    <div>
      <h2></h2>
      <NormalRange
        min={response.min}
        max={response.max}
      />
    </div>
  );
}
