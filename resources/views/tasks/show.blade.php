<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View Task</title>
</head>
<body>
    <h1>{{ $task->title }}</h1>
    <p>Status: {{ $task->status }}</p>
    <p>Description: {{ $task->description }}</p>
    <a href="{{ route('tasks.index') }}">Back</a>
</body>
</html>