// conciser.service.ts

export interface Character {
  personName: string;
  imageUrl: string;
}

export interface ConciserResponse {
  _id: string;
  id: string;
  name: string;
  story: string;
  characters: Character[];
  imagePath: string;
  // You can extend this with any additional fields from your API response as needed
}

export interface ConciserRequest {
  userId: string;
  bookId: string;
  userText: string;
}

/**
 * Calls the /v1/conciser/ endpoint with auth token and request data,
 * returns the parsed response.
 *
 * @param token Bearer token for authorization
 * @param requestData Request payload for API
 */
export async function callConciserApi(
  token: string,
  requestData: ConciserRequest
): Promise<ConciserResponse> {
  const response = await fetch("http://localhost:3000/v1/conciser/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error(`Conciser API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  const resultData = typeof json.result === "string" ? JSON.parse(json.result) : json.result;

  return resultData as ConciserResponse;
}
