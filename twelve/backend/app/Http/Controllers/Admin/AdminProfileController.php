<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AdminProfileController extends Controller
{
    public function index()
    {
        $users = Auth::users();
        return view('admin.profile.index', compact('users'));
    }

    public function updateProfilePicture(\Illuminate\Http\Request $request)
    {
        $users = Auth::users();
        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB
        ]);

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = 'admin_' . $users->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('uploads/profile_pictures', $filename, 'public');
            $users->profile_picture = $path;
            $users->save();
        }

        return redirect()->route('admin.profile')->with('status', 'Profile picture updated!');
    }

    public function updateName(\Illuminate\Http\Request $request)
    {
        $users = Auth::users();
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $users->name = $request->name;
        $users->save();
        return redirect()->route('admin.profile')->with('status', 'Name updated!');
    }
}
