type ErrorBody = Record<string, unknown>;

function extractErrorMessage(body: unknown): string {
  if (typeof body === "string") return body;

  if (body && typeof body === "object") {
    const data = body as ErrorBody;
    return (
      (data["message"] as string | undefined) ||
      (data["error"] as string | undefined) ||
      (data["detail"] as string | undefined) ||
      "Request failed"
    );
  }

  return "Request failed";
}

export async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const body: unknown = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(extractErrorMessage(body));
  }

  return body as T;
}