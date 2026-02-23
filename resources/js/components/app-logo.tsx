export default function AppLogo() {
    return (
        <>
            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md">
                <img
                    src="/images/wijaya/logo.avif"
                    alt="Wijaya International"
                    className="size-8 object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">PT. Wijaya</span>
                <span className="truncate font-medium">International</span>
            </div>
        </>
    );
}
