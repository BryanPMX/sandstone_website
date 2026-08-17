import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.SPARK_API_BASE_URL ?? "https://replication.sparkapi.com";
  const token = process.env.SPARK_ACCESS_TOKEN ?? "";

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "User-Agent": "sandstone-website/1.0",
  };

  // Test different LocationField values to see which ones return data
  const endpoints = [
    { label: "PostalCode 79912 (West EP)", url: `${baseUrl}/v1/marketstatistics/price?LocationField=PostalCode&LocationValue=79912` },
    { label: "PostalCode 79928 (Horizon City)", url: `${baseUrl}/v1/marketstatistics/price?LocationField=PostalCode&LocationValue=79928` },
    { label: "PostalCode 79916 (Fort Bliss)", url: `${baseUrl}/v1/marketstatistics/price?LocationField=PostalCode&LocationValue=79916` },
    { label: "PostalCode 79936 (Northeast EP)", url: `${baseUrl}/v1/marketstatistics/price?LocationField=PostalCode&LocationValue=79936` },
    { label: "PostalCode 79835 (Canutillo)", url: `${baseUrl}/v1/marketstatistics/price?LocationField=PostalCode&LocationValue=79835` },
    { label: "PostalCode 88008 (Santa Teresa NM)", url: `${baseUrl}/v1/marketstatistics/price?LocationField=PostalCode&LocationValue=88008` },
    { label: "MLSAreaMinor — test", url: `${baseUrl}/v1/marketstatistics/price?LocationField=MLSAreaMinor&LocationValue=West` },
    { label: "SubdivisionName — test", url: `${baseUrl}/v1/marketstatistics/price?LocationField=SubdivisionName&LocationValue=Horizon+City` },
    { label: "Neighborhood — test", url: `${baseUrl}/v1/marketstatistics/price?LocationField=Neighborhood&LocationValue=Upper+Valley` },
    { label: "Neighborhood - Lower Valley", url: `${baseUrl}/v1/marketstatistics/price?LocationField=Neighborhood&LocationValue=Lower+Valley`},
  ];

  const results = await Promise.all(
    endpoints.map(async ({ label, url }) => {
      try {
        const response = await fetch(url, { headers, cache: "no-store" });
        const body = await response.json();
        const hasData = body?.D?.Results?.[0]?.ActiveMedianListPrice?.[0] != null;
        return { label, status: response.status, ok: response.ok, hasData, sample: hasData ? body?.D?.Results?.[0]?.ActiveMedianListPrice?.[0] : null };
      } catch (error) {
        return { label, status: null, ok: false, hasData: false, error: error instanceof Error ? error.message : String(error) };
      }
    })
  );

  return NextResponse.json({ generatedAt: new Date().toISOString(), results });
}
