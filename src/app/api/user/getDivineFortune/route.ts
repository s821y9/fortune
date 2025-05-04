//still working
export async function GET(req: Request) {
  try {
    const response = await fetch("https://divineapi.com/api/fortune-cookie");
    const data = await response.json();

    return new Response(JSON.stringify({ fortune: data.fortune }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching from Divine API:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch fortune" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}