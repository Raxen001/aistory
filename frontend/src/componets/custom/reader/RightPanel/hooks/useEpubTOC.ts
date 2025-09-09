import { useEffect, useState } from "react";
import { Book, type NavItem } from "epubjs";

export function useEpubTOC(book: Book | null) {
    const [toc, setToc] = useState<NavItem[] | null>(null);

    useEffect(() => {
        async function loadTOC() {
            if (book?.loaded?.navigation) {
                try {
                    const navigation = await book.loaded.navigation;
                    setToc(navigation?.toc ?? []);
                } catch (error) {
                    console.error("Failed to load TOC:", error);
                }
            }
        }
        loadTOC();
    }, [book]);

    return toc;
}
