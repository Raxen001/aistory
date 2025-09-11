import { CONCISER_API_ENDPOINT } from "../../../../../config.ts";

export async function fetchConciser(text: string) {
    try {
        const response = await fetch(
            CONCISER_API_ENDPOINT,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        userId: 'lol',
                        bookId: 'lol',
                        userText: text,
                    }
                ),
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result_1 = await response.json();
        console.log(result_1);

        return result_1;
    } catch (error) {
        console.log('Error fetching conciser:', error);

        return null;
    }
}
