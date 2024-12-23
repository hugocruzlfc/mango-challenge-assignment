export const dynamic = "force-static";

export async function GET() {
  return Response.json(
    { prices: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] },
    { status: 200 }
  );
}
