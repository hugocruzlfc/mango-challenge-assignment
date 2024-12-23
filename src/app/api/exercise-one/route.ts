export const dynamic = "force-static";

export async function GET() {
  return Response.json({ min: 1, max: 100 }, { status: 200 });
}
