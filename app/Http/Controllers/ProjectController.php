<?php
namespace App\Http\Controllers;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ProjectController extends Controller

{
  public function __construct()
    {
        //$this->middleware('auth:api');
        $this->middleware(function (Request $request, $next) {
          $this->userId = \Auth::id();
          return $next($request);
        });
    }
    public function index()
    {
      $projects = Project::where('is_completed', false)
                          ->orderBy('created_at', 'desc')
                          ->withCount(['tasks' => function ($query) {
                            $query->where('is_completed', false);
                          }])
                          ->get();

      return $projects->toJson();
    }

    public function store(Request $request)
    {
      $userId = auth("api")->user()->id;
      $validatedData = $request->validate([
        'name' => 'required',
        'description' => 'required',
      ]);

      $project = Project::create([
        'name' => $validatedData['name'],
        'description' => $validatedData['description'],
      ]);

      return response()->json($userId);
    }

    public function show($id)
    {
      $project = Project::with(['tasks' => function ($query) {
        $query->where('is_completed', false);
      }])->find($id);

      return $project->toJson();
    }

    public function markAsCompleted(Project $project)
    {
      $project->is_completed = true;
      $project->update();

      return response()->json('Project updated!');
    }
}
