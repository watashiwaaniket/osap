import { ReactElement } from "react";

export interface ButtonProps{
    text: string;
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    animated?: boolean;
    glow?: boolean;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
}

export function Button({text, variant, animated, glow, size, startIcon, endIcon, onClick} : ButtonProps) {
    return(
        <button className={`
            ${variant === 'primary' ? 'bg-white' : 'bg-purple-400'}
            text-black text-sm cursor-pointer p-2 rounded-xl w-28
            ${animated ? 'animate-pulse' : ''} 
            ${glow && variant === 'primary' ? 'shadow-white/50 shadow-lg' : ''}
            ${glow && variant === 'secondary' ? 'shadow-purple-500/50 shadow-lg' : ''}
        `}
            onClick={onClick}
        >
            {text}
        </button>
    )
}