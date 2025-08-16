<?php
namespace App\Http\Livewire\Admin\Product;

use Livewire\Component;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Support\Str;

class Create extends Component
{
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

    public function mount()
    {
        $this->categories = Category::all();
    }

    public function store()
    {
        $this->validate();
        $brand = Brand::first();
        if (!$brand) {
            $brand = Brand::create([
                'name' => 'Default Brand',
                'slug' => 'default-brand',
                'description' => 'Default brand',
                'status' => 1,
            ]);
        }
        $product = Product::create([
            'name' => $this->name,
            'slug' => Str::slug($this->name),
            'description' => 'A product description.',
            'short_description' => 'Short desc.',
            'price' => $this->price,
            'discount_price' => null,
            'cost_price' => $this->price * 0.7,
            'category_id' => $this->category_id,
            'brand_id' => $brand->id,
            'gender' => 'man',
            'material' => 'Cotton',
            'care_instructions' => 'Machine wash cold',
            'season' => 'all',
            'track_quantity' => true,
            'quantity' => 10,
            'min_quantity' => 5,
            'status' => 'active',
            'featured' => false,
            'is_new' => true,
            'is_sale' => false,
            'meta_title' => $this->name,
            'meta_description' => 'A product for seeding.',
            'tags' => json_encode(['shirt', 'sample']),
        ]);
        // Save images
        foreach ($this->images as $key => $image) {
            $path = $image->store('products', 'public');
            \App\Models\ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $path,
                'type' => $key == 0 ? 'main' : 'gallery',
                'is_primary' => $key == 0,
                'sort_order' => $key,
            ]);
        }
        session()->flash('message', 'Product created successfully.');
        return redirect()->route('admin.products.index');
    }

    public function render()
    {
        return view('livewire.admin.product.create')->layout('layouts.admin');
    }
}
