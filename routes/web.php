<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

//Route::get("/", "FrontController@index");
Route::view('/{path?}', 'app');

// Route::group(['middleware' => ['web']], function () {
//     Route::get('/admin/login', 'Auth\AdminLoginController@showLoginForm')->name('admin.login');
//     Route::post('/admin/login', 'Auth\AdminLoginController@login')->name('admin.login.submit');
// });

Route::group(['middleware' => ['web']], function () {
    Route::get('/logout', ['as' => 'logout', 'uses' => 'App\Http\Controllers\Auth\LoginController@logout']);
});

// Route::group(['middleware' => ['web']], function () {
//     Route::get('/admin/logout', ['as' => 'logout', 'uses' => 'Auth\AdminLoginController@logout']);
// });

//Route::get('/checkExistingEmailUsers', 'Auth\RegisterController@CheckEmailUniquenessForNewUsers')->name('checkExistingEmailUsers');

//Route::post('login', 'App\Http\Controllers\Auth\LoginController@login')->name('login');
Route::any('/login', "App\Http\Controllers\Auth\LoginController@login");


