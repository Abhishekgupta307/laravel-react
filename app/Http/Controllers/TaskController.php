<?php

namespace App\Http\Controllers;
use App\Models\Task;
use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller

{
  public function __construct()
    {
        //$this->middleware('auth:api');
        $this->middleware(function (Request $request, $next) {
          $this->userId = \Auth::id();
          return $next($request);
        });
    }
    public function store(Request $request)
      {
        $userId = auth("api")->user()->id;
        $token = $userId->createToken('Laravel Password Grant Client')->accessToken;
        $validatedData = $request->validate(['title' => 'required']);

        $task = Task::create([
          'title' => $validatedData['title'],
          'project_id' => $request->project_id,
        ]);

        return $task->toJson($userId);
      }

      public function markAsCompleted(Task $task)
      {
        $task->is_completed = true;
        $task->update();

        return response()->json('Task updated!');
      }
}
