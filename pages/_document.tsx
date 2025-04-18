/*
  This is a custom `Document` component for Next.js.

  The `Document` component is responsible for customizing the HTML document structure.
  It is used for adding global HTML elements, such as the `<head>` and `<body>` content, that need to be shared across all pages.

  Key parts:
    - **Head Section**: Contains links for external stylesheets (like KaTeX for math formulas) and commented-out stylesheets for custom styles.
    - **Body Section**: The body contains the main content and scripts of the page.
*/

import { Html, Head, Main, NextScript } from 'next/document';
import {ThemeProvider} from "../components/ThemeContext";

export default function Document() {
    return (
        <Html>
            <Head>
                {/* CSS de bază */}
                {/*<link rel="stylesheet" href="/css/base.css" />*/}
                {/*<link rel="stylesheet" href="/css/navbar.css" />*/}
                {/*<link rel="stylesheet" href="/css/tutorial.css" />*/}
                {/*<link rel="stylesheet" href="/css/github-markdown.css" />*/}
                {/*<link rel="stylesheet" href="/styles/main.css" />*/}

                {/* Tema dark - pusă ultimă pentru a avea prioritate */}
                {/*<link rel="stylesheet" href="/styles/theme.css" />*/}

                {/* Highlight.js CSS - pentru code highlighting (temă dark) */}
                {/*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css" />*/}

                {/* KaTeX CSS pentru formule matematice */}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css" />

                {/* Preîncărcăm tema din localStorage pentru a preveni flickering */}
                {/*<script dangerouslySetInnerHTML={{*/}
                {/*    __html: `*/}
                {/*    (function() {*/}
                {/*        try {*/}
                {/*            const savedTheme = localStorage.getItem('theme') || 'dark';*/}
                {/*            document.documentElement.dataset.theme = savedTheme;*/}
                {/*            document.body.dataset.theme = savedTheme;*/}
                {/*            */}
                {/*            if (savedTheme === 'dark') {*/}
                {/*                document.documentElement.classList.add('dark-theme');*/}
                {/*                document.documentElement.classList.remove('light-theme');*/}
                {/*            } else {*/}
                {/*                document.documentElement.classList.add('light-theme');*/}
                {/*                document.documentElement.classList.remove('dark-theme');*/}
                {/*            }*/}
                {/*        } catch (e) {*/}
                {/*            console.error('Error preloading theme:', e);*/}
                {/*        }*/}
                {/*    })();*/}
                {/*    `*/}
                {/*}} />*/}
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>

    );
} 