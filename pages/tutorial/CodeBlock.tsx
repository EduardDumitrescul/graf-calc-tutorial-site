import { Box } from "@mui/material";
import {useTheme} from "@mui/material/styles";

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
        ? theme.palette.custom.shader.bg
        : isCpp
            ? theme.palette.custom.cpp.bg
            : theme.palette.custom.default.bg;

    const borderColor = isShader
        ? theme.palette.custom.shader.border
        : isCpp
            ? theme.palette.custom.cpp.border
            : theme.palette.custom.default.border;

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
