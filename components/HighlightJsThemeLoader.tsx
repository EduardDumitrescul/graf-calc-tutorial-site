import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

export default function HighlightJsThemeLoader() {
    const theme = useTheme();

    useEffect(() => {
        const existingLink = document.getElementById("hljs-theme") as HTMLLinkElement;

        const newHref =
            theme.palette.mode === "dark"
                ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
                : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-light.min.css";

        if (existingLink) {
            existingLink.href = newHref;
        } else {
            const link = document.createElement("link");
            link.id = "hljs-theme";
            link.rel = "stylesheet";
            link.href = newHref;
            document.head.appendChild(link);
        }
    }, [theme.palette.mode]);

    return null;
}
