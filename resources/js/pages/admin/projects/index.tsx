import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';
import { LuPencil, LuTrash2, LuPlus } from 'react-icons/lu';

interface Project {
    id: number;
    name: string;
    description: string | null;
    image_url: string;
    sort_order: number;
    is_active: boolean;
}

interface Props {
    projects: Project[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/admin/projects' },
];

export default function ProjectsIndex({ projects }: Props) {
    const deleteForm = useForm({});

    const handleDelete = (project: Project) => {
        if (!confirm(`Delete project "${project.name}"?`)) { return; }
        deleteForm.delete(ProjectController.destroy(project.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Projects</h1>
                        <p className="text-sm text-muted-foreground">Manage projects shown in the homepage showcase.</p>
                    </div>
                    <Link href={ProjectController.create().url}>
                        <Button className="gap-2">
                            <LuPlus className="h-4 w-4" />
                            Add Project
                        </Button>
                    </Link>
                </div>

                <div className="rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Image</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3">
                                        <img src={project.image_url} alt={project.name} className="h-14 w-24 rounded-lg object-cover" />
                                    </td>
                                    <td className="px-4 py-3 font-medium">{project.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{project.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={project.is_active ? 'default' : 'secondary'}>
                                            {project.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Link href={ProjectController.edit(project.id).url}>
                                                <Button variant="ghost" size="sm">
                                                    <LuPencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(project)} className="text-destructive hover:text-destructive">
                                                <LuTrash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No projects yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
