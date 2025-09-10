import { useEffect, useState } from "react";
import { Book, type NavItem } from "epubjs";

export function useEpubTOC(book: Book | null) {
    const [toc, setToc] = useState<NavItem[] | null>(null);

    useEffect(() => {
        async function loadTOC() {
            // if (book?.loaded?.navigation) {
            //     try {
            //         const navigation = await book.loaded.navigation;
            //         setToc(navigation?.toc ?? []);
            //         console.log("FUCKK");
            //         console.log(book);
            //     } catch (error) {
            //         console.log("FUCKK");
            //         console.log(book);
            //         setToc([]);
            //         console.error("Failed to load TOC:", error);
            //     }
            // }
            book?.loaded.navigation.then(
                function (navigation) {
                    console.log("FUCK");
                    console.log(book);
                    console.log(navigation.toc);
                    setToc(navigation.toc ?? []);
                }
            );
        }
        loadTOC();
    }, [book]);

    return toc;
}
