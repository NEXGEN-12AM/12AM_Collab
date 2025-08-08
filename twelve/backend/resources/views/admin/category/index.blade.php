@extends('layouts.admin')

{{-- @yield('title', 'Categories') --}}

@section('content')

<div>
    <livewire:admin.category.index />
</div>

@endsection