<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_tasks(): void
    {
        Task::create([
            'title' => 'Test Task',
            'description' => 'Test Description',
            'status' => 'pending',
        ]);

        $response = $this->get(route('tasks.index'));

        $response->assertStatus(200);
        $response->assertSee('Test Task');
    }

    public function test_can_create_task(): void
    {
        $taskData = [
            'title' => 'New Task',
            'description' => 'New Description',
            'status' => 'pending',
        ];

        $response = $this->post(route('tasks.store'), $taskData);

        $response->assertRedirect(route('tasks.index'));
        $this->assertDatabaseHas('tasks', ['title' => 'New Task']);
    }

    public function test_can_update_task(): void
    {
        $task = Task::create([
            'title' => 'Old Title',
            'description' => 'Old Description',
            'status' => 'pending',
        ]);

        $updatedData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'status' => 'completed',
        ];

        $response = $this->put(route('tasks.update', $task), $updatedData);

        $response->assertRedirect(route('tasks.index'));
        $this->assertDatabaseHas('tasks', ['title' => 'Updated Title', 'status' => 'completed']);
    }

    public function test_can_delete_task(): void
    {
        $task = Task::create([
            'title' => 'Task to Delete',
            'description' => 'Description',
            'status' => 'pending',
        ]);

        $response = $this->delete(route('tasks.destroy', $task));

        $response->assertRedirect(route('tasks.index'));
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}