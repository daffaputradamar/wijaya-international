import { motion } from 'framer-motion';
import React from 'react';

interface SplitIconButtonProps {
    text: string;
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'default' | 'secondary' | 'red';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    iconPosition?: 'left' | 'right';
}

export function SplitIconButton({
    text,
    icon,
    onClick,
    className = '',
    variant = 'default',
    size = 'md',
    type = 'button',
    iconPosition = 'right',
}: SplitIconButtonProps) {
    const [isHovered, setIsHovered] = React.useState(false);

    const sizeConfig = {
        sm: { textCircle: 'h-8 text-xs px-3', iconCircle: 'w-8 h-8', gap: 'gap-0' },
        md: { textCircle: 'h-10 text-sm px-4', iconCircle: 'w-10 h-10', gap: 'gap-0' },
        lg: { textCircle: 'h-12 text-base px-6', iconCircle: 'w-12 h-12', gap: 'gap-0' },
    };

    const variantConfig = {
        default: {
            text: 'bg-white text-[#000168]',
            icon: 'bg-red-500 text-white',
        },
        secondary: {
            text: 'bg-gray-200 text-gray-900',
            icon: 'bg-red-500 text-white',
        },
        red: {
            text: 'bg-red-500 text-white shadow-lg',
            icon: 'bg-red-500 text-white shadow-lg',
        },
    };

    const config = variantConfig[variant];
    const size_cfg = sizeConfig[size];

    const isLeft = iconPosition === 'left';

    return (
        <motion.button
            type={type}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            className={`group relative flex items-center hover:cursor-pointer ${size_cfg.gap} ${className} ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Text Circle */}
            <motion.div
                className={`flex items-center justify-center font-medium whitespace-nowrap shadow-sm group-hover:shadow-md transition-shadow duration-300 px-6 ${size_cfg.textCircle} ${config.text}`}
                initial={false}
                animate={{
                    borderRadius: '9999px',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{ zIndex: 10 }}
            >
                <div className={`flex items-center gap-3 overflow-hidden ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span>{text}</span>
                    <motion.div
                        initial={false}
                        animate={{
                            width: isHovered ? 'auto' : 0,
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex items-center justify-center"
                    >
                        {icon}
                    </motion.div>
                </div>
            </motion.div>

            {/* Icon Circle */}
            <motion.div
                className={`flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300 overflow-hidden ${size_cfg.iconCircle} ${config.icon} rounded-full`}
                initial={false}
                animate={{
                    width: isHovered ? 0 : (size === 'sm' ? 32 : (size === 'md' ? 40 : 48)),
                    opacity: isHovered ? 0 : 1,
                    marginLeft: !isLeft && isHovered ? -12 : 0,
                    marginRight: isLeft && isHovered ? -12 : 0,
                    scale: isHovered ? 0.8 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{ zIndex: 1 }}
            >
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isHovered ? 0 : 1,
                        scale: isHovered ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {icon}
                </motion.div>
            </motion.div>
        </motion.button>
    );
}
