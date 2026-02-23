<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create();
});

test('guests cannot access admin projects index', function () {
    $this->get('/admin/projects')->assertRedirect('/login');
});

test('authenticated users can access admin projects index', function () {
    $this->actingAs($this->user)
        ->get('/admin/projects')
        ->assertOk();
});

test('authenticated users can access project create page', function () {
    $this->actingAs($this->user)
        ->get('/admin/projects/create')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/projects/create'));
});

test('authenticated users can access project edit page', function () {
    $project = Project::factory()->create();

    $this->actingAs($this->user)
        ->get("/admin/projects/{$project->id}/edit")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/projects/edit')->has('project'));
});

test('authenticated users can store a project', function () {
    $image = UploadedFile::fake()->image('project.jpg');

    $this->actingAs($this->user)
        ->post('/admin/projects', [
            'name' => 'My Project',
            'image' => $image,
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('projects', ['name' => 'My Project']);
});

test('authenticated users can update a project', function () {
    $project = Project::factory()->create(['name' => 'Old']);

    $this->actingAs($this->user)
        ->patch("/admin/projects/{$project->id}", ['name' => 'Updated'])
        ->assertRedirect();

    $this->assertDatabaseHas('projects', ['id' => $project->id, 'name' => 'Updated']);
});

test('authenticated users can delete a project', function () {
    $project = Project::factory()->create(['image_path' => 'projects/test.jpg']);
    Storage::disk('public')->put('projects/test.jpg', 'content');

    $this->actingAs($this->user)
        ->delete("/admin/projects/{$project->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    Storage::disk('public')->assertMissing('projects/test.jpg');
});

test('storing a project requires a name and image', function () {
    $this->actingAs($this->user)
        ->post('/admin/projects', [])
        ->assertSessionHasErrors(['name', 'image']);
});
