import { useRef, useState } from 'react';
import { LuImage, LuX } from 'react-icons/lu';

interface ImageUploadProps {
    label?: string;
    currentUrl?: string | null;
    onChange: (file: File | null) => void;
    accept?: string;
    className?: string;
}

export default function ImageUpload({ label = 'Image', currentUrl, onChange, accept = 'image/*', className = '' }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            setPreview(URL.createObjectURL(file));
            onChange(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <span className="text-sm font-medium text-foreground">{label}</span>

            {preview ? (
                <div className="relative inline-block">
                    <img src={preview} alt="preview" className="h-24 w-auto rounded-lg border object-contain bg-muted p-1" />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:opacity-90"
                    >
                        <LuX className="h-3 w-3" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="flex h-24 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                    <LuImage className="h-5 w-5" />
                    Click to upload
                </button>
            )}

            {preview && (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-xs text-muted-foreground underline underline-offset-2 text-left hover:text-primary"
                >
                    Change image
                </button>
            )}

            <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
        </div>
    );
}
