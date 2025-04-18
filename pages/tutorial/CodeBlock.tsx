import { Box, useTheme } from "@mui/material";

export default function CodeBlock(props: any) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const child = props.children;
    const className = child?.props?.className || "";
    const codeContent = child?.props?.children || "";

    const language = className?.replace("language-", "") || "";

    const isShader = ["glsl", "vert", "frag"].some((l) =>
        language.includes(l)
    );
    const isCpp = language.includes("cpp");

    const bgColor = isShader
        ? isDark
            ? "rgba(15, 26, 44, 0.7)"
            : "rgba(230, 245, 255, 0.6)"
        : isCpp
            ? isDark
                ? "rgba(30, 30, 30, 0.7)"
                : "rgba(240, 255, 240, 0.6)"
            : isDark
                ? "rgba(40, 40, 40, 0.5)"
                : "rgba(250, 250, 250, 0.6)";

    const borderColor = isShader
        ? isDark
            ? "rgba(0, 100, 200, 0.4)"
            : "rgba(100, 180, 255, 0.5)"
        : isCpp
            ? isDark
                ? "rgba(100, 120, 150, 0.4)"
                : "rgba(80, 200, 120, 0.5)"
            : isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)";

    return (
        <Box
            component="pre"
            sx={{
                borderRadius: 2,
                overflowX: "auto",
                lineHeight: 1.6,
                fontSize: "0.875rem",
                fontFamily: "monospace",
                boxShadow: isDark
                    ? "0 4px 12px rgba(0,0,0,0.2)"
                    : "0 2px 6px rgba(0,0,0,0.08)",
                border: "1px solid",
                borderColor,
                backgroundColor: bgColor,
                backdropFilter: "blur(2px)",
                "& code": {
                    backgroundColor: "transparent",
                    color: "inherit",
                },
            }}
        >
            <code className={className}>{codeContent}</code>
        </Box>
    );
}
