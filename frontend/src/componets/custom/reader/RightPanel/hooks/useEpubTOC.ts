import { useEffect, useState } from "react";
import { Book, type NavItem } from "epubjs";

export function useEpubTOC(book: Book | null) {
    const [toc, setToc] = useState<NavItem[] | null>(null);

    useEffect(() => {
        async function loadTOC() {
            book?.loaded.navigation.then(
                function (navigation) {
                    setToc(navigation.toc ?? []);
                }
            );
        }
        loadTOC();
    }, [book]);

    return toc;
}
