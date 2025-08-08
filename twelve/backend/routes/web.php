<?php

use App\Http\Controllers\ProfileController;
use App\Models\User;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::prefix('admin')->middleware(['auth','isAdmin'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index']);//->name('admin.dashboard');

    //Category Route 
    Route::controller(CategoryController::class)->group(function(){
        Route::get('/category','index');
        Route::post('/category/create' , 'create');
        Route::post('/category','store');
        Route::get('/category/{category}/edit','edit');
    });

});



