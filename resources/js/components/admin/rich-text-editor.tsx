import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import {
    LuBold,
    LuItalic,
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuList,
    LuListOrdered,
    LuQuote,
    LuMinus,
    LuLink,
    LuUnlink,
    LuUndo2,
    LuRedo2,
} from 'react-icons/lu';

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

function ToolbarButton({
    onClick,
    active,
    disabled,
    title,
    children,
}: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={`flex h-8 w-8 items-center justify-center rounded text-sm transition-colors disabled:pointer-events-none disabled:opacity-40 ${
                active
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
        >
            {children}
        </button>
    );
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'underline text-blue-600' },
            }),
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none min-h-[200px] px-4 py-3 text-foreground focus:outline-none',
            },
        },
        onUpdate({ editor }) {
            const html = editor.getHTML();
            onChange(html === '<p></p>' ? '' : html);
        },
    });

    // Sync external value changes (e.g. when form is reset or pre-populated)
    useEffect(() => {
        if (!editor) { return; }
        const current = editor.getHTML();
        const incoming = value || '';
        if (current !== incoming) {
            editor.commands.setContent(incoming, false);
        }
    }, [value, editor]);

    const setLink = () => {
        if (!editor) { return; }
        const prev = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('URL', prev ?? 'https://');
        if (url === null) { return; }
        if (url === '') {
            editor.chain().focus().unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    if (!editor) { return null; }

    return (
        <div className="flex flex-col rounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5 bg-muted/30">
                <ToolbarButton
                    title="Bold"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                >
                    <LuBold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Italic"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                >
                    <LuItalic className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-5 w-px bg-border" />

                <ToolbarButton
                    title="Heading 1"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive('heading', { level: 1 })}
                >
                    <LuHeading1 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Heading 2"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                >
                    <LuHeading2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Heading 3"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                >
                    <LuHeading3 className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-5 w-px bg-border" />

                <ToolbarButton
                    title="Bullet list"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                >
                    <LuList className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Ordered list"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                >
                    <LuListOrdered className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Blockquote"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                >
                    <LuQuote className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Horizontal rule"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <LuMinus className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-5 w-px bg-border" />

                <ToolbarButton title="Add link" onClick={setLink} active={editor.isActive('link')}>
                    <LuLink className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Remove link"
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive('link')}
                >
                    <LuUnlink className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-5 w-px bg-border" />

                <ToolbarButton
                    title="Undo"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <LuUndo2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    title="Redo"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    <LuRedo2 className="h-4 w-4" />
                </ToolbarButton>
            </div>

            {/* Editor area */}
            <div className="relative min-h-[200px]">
                {editor.isEmpty && placeholder && (
                    <p className="pointer-events-none absolute left-4 top-3 text-sm text-muted-foreground select-none">
                        {placeholder}
                    </p>
                )}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
