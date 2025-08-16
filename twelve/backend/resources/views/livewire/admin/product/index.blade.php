<div class="container">
    <h1>Products</h1>
    <div>
        @if ($successMessage)
            <div class="toast align-items-center text-bg-success border-0 show" role="alert" aria-live="assertive" aria-atomic="true" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
                <div class="d-flex">
                    <div class="toast-body">{{ $successMessage }}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        @endif
        @if ($errorMessage)
            <div class="toast align-items-center text-bg-danger border-0 show" role="alert" aria-live="assertive" aria-atomic="true" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
                <div class="d-flex">
                    <div class="toast-body">{{ $errorMessage }}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        @endif
    </div>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
            <a href="{{ route('admin.products.create') }}" class="btn btn-primary">Add Product</a>
            <button class="btn btn-danger ms-2" wire:click="confirmBatchDelete" @if(empty($selected)) disabled @endif>Delete Selected</button>
        </div>
        <input type="text" class="form-control w-25" placeholder="Search products..." wire:model.debounce.500ms="search">
    </div>
    <table class="table table-bordered table-hover align-middle">
        <thead class="table-light">
            <tr>
                <th><input type="checkbox" wire:model="selectAll"></th>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Quantity</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($products as $product)
            <tr>
                <td><input type="checkbox" wire:model="selected" value="{{ $product->id }}"></td>
                <td>
                    @php
                        $firstImage = $product->images->first();
                    @endphp
                    @if($firstImage)
                        <img src="{{ asset('storage/product_images/' . $firstImage->image_path) }}" class="img-thumbnail" style="height: 60px; width: 60px; object-fit: cover;">
                    @else
                        <span class="text-muted">No image</span>
                    @endif
                </td>
                <td>{{ $product->id }}</td>
                <td>{{ $product->name }}</td>
                <td>${{ number_format($product->price, 2) }}</td>
                <td>{{ $product->category ? $product->category->name : '' }}</td>
                <td>
                    <span class="badge bg-{{ $product->status == 'active' ? 'success' : 'secondary' }}">{{ ucfirst($product->status) }}</span>
                </td>
                <td>
                    @if($product->featured)
                        <span class="badge bg-warning text-dark">Yes</span>
                    @else
                        <span class="badge bg-light text-dark">No</span>
                    @endif
                </td>
                <td>
                    <span class="badge bg-info text-dark">{{ $product->quantity }}</span>
                </td>
                <td>{{ $product->created_at }}</td>
                <td>
                    <a href="{{ route('admin.products.edit', $product->id) }}" class="btn btn-sm btn-warning">Edit</a>
                    <button type="button" class="btn btn-sm btn-danger" wire:click="confirmDelete({{ $product->id }})">Delete</button>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="9" class="text-center">No products found.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
    <div>
        {{ $products->links() }}
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade @if($showDeleteModal) show d-block @endif" tabindex="-1" role="dialog" style="background: rgba(0,0,0,0.5);" @if($showDeleteModal) aria-modal="true" @endif>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Delete</h5>
                    <button type="button" class="btn-close" wire:click="closeDeleteModal"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this product?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" wire:click="closeDeleteModal">Cancel</button>
                    <button type="button" class="btn btn-danger" wire:click="deleteConfirmed">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Batch Delete Confirmation Modal -->
    <div class="modal fade @if($showBatchDeleteModal) show d-block @endif" tabindex="-1" role="dialog" style="background: rgba(0,0,0,0.5);" @if($showBatchDeleteModal) aria-modal="true" @endif>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Batch Delete</h5>
                    <button type="button" class="btn-close" wire:click="closeBatchDeleteModal"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete the selected products?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" wire:click="closeBatchDeleteModal">Cancel</button>
                    <button type="button" class="btn btn-danger" wire:click="batchDeleteConfirmed">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
