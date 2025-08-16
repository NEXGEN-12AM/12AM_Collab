<?php
namespace App\Http\Livewire\Admin\Product;

use Livewire\Component;
use App\Models\Product;
use App\Models\Category;

class Edit extends Component
{
    public $product;
    public $name;
    public $price;
    public $category_id;
    public $categories;
    public $images = [];

    protected $rules = [
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'category_id' => 'required|exists:categories,id',
        'images.*' => 'image|max:2048',
    ];

    public function mount(Product $product)
    {
        $this->product = $product;
        $this->name = $product->name;
        $this->price = $product->price;
        $this->category_id = $product->category_id;
        $this->categories = Category::all();
    }

    public function update()
    {
        $this->validate();
        $this->product->update([
            'name' => $this->name,
            'price' => $this->price,
            'category_id' => $this->category_id,
        ]);
        // Save new images
        foreach ($this->images as $key => $image) {
            $path = $image->store('products', 'public');
            \App\Models\ProductImage::create([
                'product_id' => $this->product->id,
                'image_path' => $path,
                'type' => $key == 0 ? 'main' : 'gallery',
                'is_primary' => $key == 0,
                'sort_order' => $key,
            ]);
        }
        session()->flash('message', 'Product updated successfully.');
        return redirect()->route('admin.products.index');
    }

    public function render()
    {
        return view('livewire.admin.product.edit')->layout('layouts.admin');
    }
}
