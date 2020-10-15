<?php

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
//Auth::routes();
Route::post('oauth/token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken')
    ->name('api.passport.token');
Route::post("user-signup", "App\Http\Controllers\UserController@userSignUp");
Route::post("user-login", "App\Http\Controllers\UserController@userLogin");
    Route::get("user/{email}", "App\Http\Controllers\UserController@userDetail");
    
Route::group([
    'middleware' => 'auth:api'
  ], function() {
    
    
    Route::get('projects', 'App\Http\Controllers\ProjectController@index');
    Route::post('projects', 'App\Http\Controllers\ProjectController@store');
    Route::get('projects/{id}', 'App\Http\Controllers\ProjectController@show');
    Route::put('projects/{project}', 'App\Http\Controllers\ProjectController@markAsCompleted');
    Route::post('tasks', 'App\Http\Controllers\TaskController@store');
    Route::put('tasks/{task}', 'App\Http\Controllers\TaskController@markAsCompleted');

});

