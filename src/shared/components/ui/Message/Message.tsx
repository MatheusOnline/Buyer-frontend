import styled from "styled-components";

interface MessageProps {
    status: "success" | "error" | "alert";
}

interface MessageComponentProps extends MessageProps {
    children: React.ReactNode;
}

export function Message({ status, children }: MessageComponentProps) {
    return (
        <SpanMessage status={status}>
            {children}
        </SpanMessage>
    );
}

const SpanMessage = styled.span<MessageProps>`
    display: block;
    border-radius: 5px;
    font-size: 14px;
    ${({ status, theme }) => status === "success" && `
        color: ${theme.colors.feedback_color_green};
        
    `}

    ${({ status, theme }) => status === "error" && `
        color: ${theme.colors.feedback_color_red};
    `}

    ${({ status, theme }) => status === "alert" && `
        color: ${theme.colors.feedback_color_yellow};
    `}
`;