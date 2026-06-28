import { LuCamera, LuChartBar, LuPackage, LuSmartphone, LuBuilding2, LuWrench, LuHeadphones } from 'react-icons/lu';

interface ServiceIconProps {
    iconKey: string;
    className?: string;
}

export default function ServiceIcon({ iconKey, className = 'w-16 h-16' }: ServiceIconProps) {
    const svgKeys = ['distribution', 'retail', 'manufacture'];

    if (svgKeys.includes(iconKey)) {
        return (
            <div
                className={className}
                style={{
                    backgroundColor: '#ef4444',
                    WebkitMaskImage: `url(/assets/icons/${iconKey}.svg)`,
                    maskImage: `url(/assets/icons/${iconKey}.svg)`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                }}
            />
        );
    }

    const iconMap: Record<string, React.ReactNode> = {
        brand: <LuBuilding2 className={className} />,
        imaging: <LuCamera className={className} />,
        camera: <LuCamera className={className} />,
        technical: <LuWrench className={className} />,
        marketing: <LuChartBar className={className} />,
        accessories: <LuSmartphone className={className} />,
    };

    return (
        <div className="flex items-center justify-center text-red-500 transition-colors duration-300">
            {iconMap[iconKey] ?? <LuPackage className={className} />}
        </div>
    );
}
