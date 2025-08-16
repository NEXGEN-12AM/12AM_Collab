<?php
namespace App\Http\Livewire\Admin\Product;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Product;

class Index extends Component
{
    use WithPagination;

    public $search = '';
    public $perPage = 10;
    public $successMessage = '';
    public $errorMessage = '';
    public $showDeleteModal = false;
    public $showBatchDeleteModal = false;
    public $deleteId = null;
    public $selected = [];
    public $selectAll = false;

    protected $paginationTheme = 'bootstrap';

    protected $queryString = ['search'];

    public function updatingSearch()
    {
        $this->resetPage();
    }

        public function updatedSelectAll($value)
        {
            if ($value) {
                $this->selected = Product::pluck('id')->toArray();
            } else {
                $this->selected = [];
            }
        }

        public function confirmDelete($id)
        {
            $this->deleteId = $id;
            $this->showDeleteModal = true;
        }

        public function closeDeleteModal()
        {
            $this->showDeleteModal = false;
            $this->deleteId = null;
        }

        public function deleteConfirmed()
        {
            try {
                $product = Product::findOrFail($this->deleteId);
                $product->delete();
                $this->successMessage = 'Product deleted successfully.';
            } catch (\Exception $e) {
                $this->errorMessage = 'Failed to delete product.';
            }
            $this->closeDeleteModal();
        }

        public function confirmBatchDelete()
        {
            $this->showBatchDeleteModal = true;
        }

        public function closeBatchDeleteModal()
        {
            $this->showBatchDeleteModal = false;
        }

        public function batchDeleteConfirmed()
        {
            try {
                Product::whereIn('id', $this->selected)->delete();
                $this->successMessage = 'Selected products deleted successfully.';
                $this->selected = [];
                $this->selectAll = false;
            } catch (\Exception $e) {
                $this->errorMessage = 'Failed to delete selected products.';
            }
            $this->closeBatchDeleteModal();
        }

    public function render()
    {
            $products = Product::with(['category', 'images'])
                ->where('name', 'like', '%'.$this->search.'%')
                ->orderByDesc('created_at')
                ->paginate($this->perPage);
            return view('livewire.admin.product.index', [
                'products' => $products
            ])->layout('layouts.admin');
    }
}
