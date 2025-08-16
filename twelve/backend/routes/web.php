<?php

use App\Http\Controllers\ProfileController;
use App\Http\Livewire\Admin\Product\Index as ProductIndex;
use App\Http\Livewire\Admin\Product\Create as ProductCreate;
use App\Http\Livewire\Admin\Product\Edit as ProductEdit;
use App\Models\User;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Admin\AdminProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});

// Admin Login Routes
use App\Http\Controllers\Admin\AdminLoginController;
Route::prefix('admin')->group(function () {
    Route::get('login', [AdminLoginController::class, 'showLoginForm'])->name('admin.login');
    Route::post('login', [AdminLoginController::class, 'login'])->name('admin.login.submit');
    Route::post('logout', [AdminLoginController::class, 'logout'])->name('admin.logout');
});

Auth::routes();

// User Profile Route
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
});

Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::prefix('admin')->middleware(['auth','isAdmin'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index']);//->name('admin.dashboard');

    // Admin Profile Route
    Route::get('profile', [AdminProfileController::class, 'index'])->name('admin.profile');
    Route::post('profile/update-picture', [AdminProfileController::class, 'updateProfilePicture'])->name('admin.profile.update_picture');
    Route::post('profile/update-name', [AdminProfileController::class, 'updateName'])->name('admin.profile.update_name');

    //Category Route 
    Route::controller(CategoryController::class)->group(function(){
        Route::get('/category','index');
        Route::get('/category/create' , 'create');
        Route::post('/category','store');
        Route::get('/category/{category}/edit','edit');
        Route::put('/category/{category}','update');
    });
    // Product Route (Livewire)
    Route::get('/products', ProductIndex::class)->name('admin.products.index');
    Route::get('/products/create', ProductCreate::class)->name('admin.products.create');
    Route::get('/products/{product}/edit', ProductEdit::class)->name('admin.products.edit');
    Route::get('/products/create', ProductCreate::class)->name('admin.products.create');
    Route::get('/products/{product}/edit', ProductEdit::class)->name('admin.products.edit');

});



