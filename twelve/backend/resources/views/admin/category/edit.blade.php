@extends('layouts.admin')

{{-- @yield('title', 'Categories') --}}

@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h3>Edit Category
                    <a href="{{ url('admin/category')}}" class="btn btn-primary btn-sm text-white float-end">BACK</a>
                </h3>
            </div>
            <div class="card-body">
                <form action="{{ url('admin/category')}}" method="POST" enctype="multipart/form-data" >
                    @csrf

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label>Name</label>
                            <input type="text" name="name" value="{{ $category->name }}" class="form-cotrol" />
                            @error('name')
                                <small class="text-danger">{{$message}}</small>
                            @enderror
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Slug</label>
                            <input type="text" name="slug" value="{{ $category->slug}}" class="form-cotrol" />
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Description</label><br/>
                            <textarea name="description" class="form-cotrol" rows="3">{{ $category->description }}</textarea>
                        </div>
                        <div class="col-md-6 mb-3">
                            <labe>Image</label>
                            <input type="file" name="image" class="form-cotrol" />
                            <img src="{{ asset('uploads/category/'.$category->image) }}" width="60px" height="60px"/>
                            @error('image') <small class="text-danger">{{$message}}</small> @enderror
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Status</label><br/>
                            <input type="checkbox" name="status" {{ $category->status == '1' ? 'checked':''}}/> 
                            <select class="form-control">>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Sort Order</label>
                            <input type="number" name="sort_order" class="form-control" value="{{ old('sort_order', $category->sort_order) }}" />
                        </div>
                        <div class="col-md-12 mb-3">
                            <button type="submit" class="btn btn-primary float-end">Save</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>

@endsection