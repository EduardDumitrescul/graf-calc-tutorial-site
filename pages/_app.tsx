/*
  This is the main entry point of the Next.js application.

  The `MyApp` component wraps the entire app with necessary providers:
    - `ThemeProvider`: Provides the theme context across the app.
    - `HighlightJsThemeLoader`: Loads the syntax highlighting theme for code blocks.

  This setup ensures that the theme and code block styling are applied globally to all pages.
*/

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
