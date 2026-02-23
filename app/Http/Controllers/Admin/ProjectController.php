<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [

            'projects' => Project::ordered()->get()->map(fn (Project $project) => [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'image_url' => $project->image_url,
                'sort_order' => $project->sort_order,
                'is_active' => $project->is_active,
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $imagePath = $request->file('image')->store('projects', 'public');

        Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_path' => $imagePath,
            'sort_order' => $request->sort_order ?? Project::max('sort_order') + 1,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('admin.projects.index');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/edit', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'image_url' => $project->image_url,
                'sort_order' => $project->sort_order,
                'is_active' => $project->is_active,
            ],
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $data = [
            'name' => $request->name ?? $project->name,
            'description' => $request->has('description') ? $request->description : $project->description,
            'sort_order' => $request->sort_order ?? $project->sort_order,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : $project->is_active,
        ];

        if ($request->hasFile('image')) {
            if (! str_starts_with($project->image_path, '/')) {
                Storage::disk('public')->delete($project->image_path);
            }
            $data['image_path'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($data);

        return redirect()->route('admin.projects.index');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if (! str_starts_with($project->image_path, '/')) {
            Storage::disk('public')->delete($project->image_path);
        }

        $project->delete();

        return back();
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['items' => ['required', 'array'], 'items.*.id' => ['required', 'integer'], 'items.*.sort_order' => ['required', 'integer']]);

        foreach ($request->items as $item) {
            Project::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back();
    }
}
