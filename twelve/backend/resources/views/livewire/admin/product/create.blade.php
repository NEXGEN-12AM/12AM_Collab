@extends('layouts.admin')

@section('content')
<div class="container">
    <form wire:submit.prevent="store" enctype="multipart/form-data">
        <div class="row">
            <div class="col-md-8">
                <div class="mb-3">
                    <label for="name" class="form-label">Product Name <span class="text-danger">*</span></label>
                    <input type="text" id="name" class="form-control" wire:model.defer="name" placeholder="Enter product name">
                    @error('name') <span class="text-danger small">{{ $message }}</span> @enderror
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea id="description" class="form-control" wire:model.defer="description" rows="3" placeholder="Product description"></textarea>
                    @error('description') <span class="text-danger small">{{ $message }}</span> @enderror
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price <span class="text-danger">*</span></label>
                    <input type="number" id="price" class="form-control" wire:model.defer="price" min="0" step="0.01" placeholder="Enter price">
                    @error('price') <span class="text-danger small">{{ $message }}</span> @enderror
                </div>
                <div class="mb-3">
                    <label for="category_id" class="form-label">Category <span class="text-danger">*</span></label>
                    <select id="category_id" class="form-control" wire:model.defer="category_id">
                        <option value="">Select Category</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                        @endforeach
                    </select>
                    @error('category_id') <span class="text-danger small">{{ $message }}</span> @enderror
                </div>
                <div class="mb-3">
                    <label for="stock" class="form-label">Stock</label>
                    <input type="number" id="stock" class="form-control" wire:model.defer="stock" min="0" placeholder="Available stock">
                    @error('stock') <span class="text-danger small">{{ $message }}</span> @enderror
                </div>
            </div>
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="images" class="form-label">Product Images</label>
                    <input type="file" id="images" class="form-control" wire:model="images" multiple accept="image/*">
                    @error('images.*') <span class="text-danger small">{{ $message }}</span> @enderror
                    <div class="row mt-2">
                        @if($images)
                            @foreach($images as $image)
                                <div class="col-6 mb-2">
                                    @if(is_string($image))
                                        <img src="{{ asset('storage/product_images/' . $image) }}" class="img-thumbnail" style="height: 100px; object-fit: cover;">
                                    @else
                                        <img src="{{ $image->temporaryUrl() }}" class="img-thumbnail" style="height: 100px; object-fit: cover;">
                                    @endif
                                </div>
                            @endforeach
                        @endif
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <button type="submit" class="btn btn-primary">Save Product</button>
            <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>
@endsection
