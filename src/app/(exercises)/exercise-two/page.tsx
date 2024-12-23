import { Metadata } from "next";

export const metadata: Metadata = { title: "Exercise Two" };

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/exercise-two");

  const response = await data.json();

  console.log(response);
  return <div>2</div>;
}
