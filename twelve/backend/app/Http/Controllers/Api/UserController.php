<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return view('home');
    }

    // public function gofile()
    // {
    //     return view('admin.gofile');
    // }

    public function home()
    {
        if (Auth::check()) {
            if (Auth::user()->role_as == '1') {
                return redirect('/admin/dashboard');
            } else {
                return view('dashboard');
            }
        }

        return redirect('/login');
    }
}
