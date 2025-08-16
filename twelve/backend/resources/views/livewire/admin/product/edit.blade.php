@extends('layouts.admin')

<div class="container">
    <h1>Edit Product</h1>
    <form wire:submit.prevent="update">
        <div class="mb-3">
            <label>Name</label>
            <input type="text" class="form-control" wire:model="name">
            @error('name') <span class="text-danger">{{ $message }}</span> @enderror
        </div>
        <div class="mb-3">
            <label>Price</label>
            <input type="number" class="form-control" wire:model="price">
            @error('price') <span class="text-danger">{{ $message }}</span> @enderror
        </div>
        <div class="mb-3">
            <label>Category</label>
            <select class="form-control" wire:model="category_id">
                <option value="">Select Category</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                @endforeach
            </select>
            @error('category_id') <span class="text-danger">{{ $message }}</span> @enderror
        </div>
        <div class="mb-3">
            <label>Product Images</label>
            <input type="file" class="form-control" wire:model="images" multiple accept="image/*">
            @error('images.*') <span class="text-danger">{{ $message }}</span> @enderror
            <div class="row mt-2">
                @if($images)
                    @foreach($images as $image)
                        <div class="col-3 mb-2">
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
        <button type="submit" class="btn btn-primary">Update</button>
        <a href="{{ route('admin.products.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
