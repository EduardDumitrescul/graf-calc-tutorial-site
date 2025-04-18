import { ThemeProvider } from "../components/ThemeContext";
import HighlightJsThemeLoader from "../components/HighlightJsThemeLoader";

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <HighlightJsThemeLoader />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
