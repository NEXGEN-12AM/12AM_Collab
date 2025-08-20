@extends('layouts.admin')

{{-- @yield('title', 'Categories') --}}

@section('content')

<div class="row">
    <div class="col-md-12">
        @if(session('message'))
            <h5 class="alert alert-success mb-2">{{ session('message') }}</h5>
        @endif
        <div class="card">
            <div class="card-header">
                <h3>Edit Products
                    <a href="{{ url('admin/products')}}" class="btn btn-danger btn-sm text-white float-end">BACK</a>
                </h3>
            </div>
            <div class="card-body">
                @if($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                <form action="{{ url('admin/products/'.$product->id) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details-tab-pane" type="button" role="tab" aria-controls="details-tab-pane" aria-selected="false">Details</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="image-tab" data-bs-toggle="tab" data-bs-target="#image-tab-pane" type="button" role="tab" aria-controls="image-tab-pane" aria-selected="false">Product Image</button>
                        </li>
                    </ul>
                    {{-- tab Content --}}
                    <div class="tab-content" id="myTabContent">
                        {{-- home tab --}}
                        <div class="tab-pane fade show active border p-3" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                            <div class="mb-3">
                                <label>Select Category</label>
                                <select name="category_id" class="form-control">
                                    @foreach ($categories as $category)
                                        <option value="{{ $category->id }}" {{ $category->id == $product->category_id ? 'selected':''}}>{{ $category->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="mb-3">
                                <label>Product Name</label>
                                <input type="text" name="name" value="{{ $product->name }}" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Product Slug</label>
                                <input type="text" name="slug" value="{{ $product->slug }}" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Brand</label>
                                <input type="text" name="brand" value="{{ $product->brand }}" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label>Description</label>
                                <textarea name="description" class="form-control" rows="4" >{{ $product->description }}</textarea>
                            </div>
                            <div class="mb-3">
                                <label>Short Description</label>
                                <textarea name="short_description" class="form-control" rows="4" >{{ $product->short_description }}</textarea>
                            </div>
                        </div>
                        {{-- details tab --}}
                        <div class="tab-pane fade border p-3" id="details-tab-pane" role="tabpanel" aria-labelledby="details-tab">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label>Original Price</label>
                                    <input type="text" name="original_price" value="{{ $product->original_price }}" class="form-control" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>Selling Price</label>
                                    <input type="text" name="selling_price" value="{{ $product->selling_price }}" class="form-control" />
                                </div>
                                <div>
                                    <label>Quantity</label>
                                    <input type="number" name="quantity" value="{{ $product->quantity }}" class="form-control" />
                                </div>
                            </div>
                            <div>
                                <label>status</label>
                                <select name="status" class="form-control">
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>
                        {{-- image tab --}}
                        <div class="tab-pane fade border p-3" id="image-tab-pane" role="tabpanel" aria-labelledby="image-tab">
                            <div class="mb-3">
                                <label>uploads Product Images </label><br/>
                                <input type="file" name="image[]" multiple class="form-control">
                            </div>
                            <div>
                                <label>Existing Images</label><br/>
                                @if($product->productImage)
                                    @foreach($product->productImage as $image)
                                        <div class="col-md-2">
                                            <img src="{{ asset($image->image) }} " width="60px" height="60px" class="me-4 border" alt="Img">
                                            <a href="{{ url('admin/product-image/'.$image->id.'delete')}}" class="d-block">Remove</a>
                                        </div>
                                    @endforeach
                                @else
                                    <span class="text-danger">No images Add</span>
                                @endif
                        </div>
                    </div>
                    <div class="py-2 float-end">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection