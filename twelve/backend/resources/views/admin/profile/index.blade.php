@extends('layouts.admin')

@section('content')
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6">
            <div class="card shadow-lg border-0 rounded-4">
                <div class="card-body p-5 text-center">
                    <div class="mb-4 d-flex flex-column align-items-center">
                        <div class="position-relative" style="display: inline-block;">
                            @if($user->profile_picture)
                                <img src="{{ asset('storage/' . $user->profile_picture) }}" alt="Profile Picture" class="rounded-circle shadow border border-3 border-primary" width="120" height="120" style="object-fit:cover;">
                            @else
                                <img src="https://ui-avatars.com/api/?name={{ urlencode($user->name) }}&background=4F8EF7&color=fff&size=128" alt="Avatar" class="rounded-circle shadow border border-3 border-primary" width="120" height="120">
                            @endif
                            <form action="{{ route('admin.profile.update_picture') }}" method="POST" enctype="multipart/form-data" class="position-absolute bottom-0 end-0" style="width: 40px; height: 40px;">
                                @csrf
                                <label for="profile_picture" class="btn btn-light btn-sm rounded-circle shadow p-2 m-0" style="cursor:pointer; border: 1px solid #ddd;">
                                    <i class="mdi mdi-camera" style="font-size: 1.2rem;"></i>
                                    <input id="profile_picture" name="profile_picture" type="file" accept="image/*" class="d-none" onchange="this.form.submit()">
                                </label>
                            </form>
                        </div>
                        @if(session('status'))
                            <div class="alert alert-success mt-3 mb-0 py-1 px-3 small">{{ session('status') }}</div>
                        @endif
                        @error('profile_picture')
                            <div class="text-danger mt-2 small">{{ $message }}</div>
                        @enderror
                        <small class="text-muted mt-2">Click the camera icon to change your profile picture</small>
                    </div>
                    <!-- <h3 class="mb-1">{{ $user->name }}</h3>
                    <p class="text-muted mb-3">{{ $user->email }}</p>
                    <span class="badge bg-primary mb-4" style="font-size:1rem;">{{ $user->role_as == '1' ? 'Admin' : 'User' }}</span> -->
                    <div class="row justify-content-center mt-4">
                        <div class="col-10 col-md-8">
                            <ul class="list-group list-group-flush text-start">
                                <li class="list-group-item bg-transparent">
                                    <div id="name-display" class="d-flex align-items-center gap-2">
                                        <strong class="me-2">Name:</strong>
                                        <span id="admin-name">{{ $user->name }}</span>
                                        <!-- <button type="button" class="btn btn-sm btn-link text-primary p-0 ms-2" onclick="document.getElementById('name-edit-form').style.display='flex';document.getElementById('name-display').style.display='none';">Edit</button> -->
                                    </div>
                                    <!-- <form id="name-edit-form" action="{{ route('admin.profile.update_name') }}" method="POST" class="d-flex align-items-center gap-2" style="display:none;">
                                        @csrf
                                        <input type="text" name="name" value="{{ $user->name }}" class="form-control form-control-sm w-auto" style="max-width: 200px;" required>
                                        <button type="submit" class="btn btn-sm btn-outline-primary">Save</button>
                                        <button type="button" class="btn btn-sm btn-link text-secondary p-0 ms-2" onclick="document.getElementById('name-edit-form').style.display='none';document.getElementById('name-display').style.display='flex';">Cancel</button>
                                    </form> -->
                                    @error('name')
                                        <div class="text-danger mt-1 small">{{ $message }}</div>
                                    @enderror
                                </li>
                                <li class="list-group-item bg-transparent"><strong>Email:</strong> {{ $user->email }}</li>
                                <li class="list-group-item bg-transparent"><strong>Role:</strong> {{ $user->role_as == '1' ? 'Admin' : 'User' }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
