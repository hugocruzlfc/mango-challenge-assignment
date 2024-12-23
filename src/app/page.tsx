import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight md:text-5xl ">
        Mango Challenge Assignment
      </h1>
      <h2 className="scroll-m-20 border-b pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0 ">
        Please use the following button links to navigate between exercises
      </h2>
      <div className="flex flex-row items-center justify-center space-x-4">
        <Button asChild>
          <Link href="/exercise-one">View Exercise 1</Link>
        </Button>
        <Button asChild>
          <Link href="/exercise-two">View Exercise 2</Link>
        </Button>
      </div>
    </main>
  );
}
