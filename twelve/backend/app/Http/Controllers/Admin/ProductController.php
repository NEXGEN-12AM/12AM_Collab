<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use App\Http\Requests\ProductFormRequest;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    function index()
    {
        $products = Product::paginate(10); 
        return view('admin.products.index', compact('products'));
    }
    function create()
    {
        $categories = Category::all();
        // $brands = Brand::all();
        return view('admin.products.create', compact('categories'));
    }
    public function store(ProductFormRequest $request){
        $vaildatedDate = $request->validated();
        
        $category = Category::findOrFail($vaildatedDate['category_id']);
        $product = $category->products()->create([
            'category_id' => $vaildatedDate['category_id'],
            'name' => $vaildatedDate['name'],
            'slug' => Str::slug($vaildatedDate['slug']),
            'brand' => $vaildatedDate['brand'],
            'description' => $vaildatedDate['description'],
            'short_description' => $vaildatedDate['short_description'],
            'original_price' => $vaildatedDate['original_price'],
            'selling_price' => $vaildatedDate['selling_price'],
            'quantity' => $vaildatedDate['quantity'],
            'status' => $vaildatedDate['status'] == '1' ? 'active' : 'inactive',
        ]);
        if ($request->hasFile('image')) {
            $uploadPath = 'uploads/products_img/';
            
            $i = 1;
            foreach ($request->file('image') as $imageFile) {
                $extention = $imageFile->getClientOriginalExtension();
                $filename = time().$i++. '.' . $extention;
                
                $imageFile->move($uploadPath, $filename);
                $finalImagePathName = $uploadPath . $filename;

                $product->productImage()->create([
                    'product_id' => $product->id,
                    'image' => $finalImagePathName,
                ]);
            }
        }
        return redirect ('admin/products')->with('message', 'Product added successfully');
    }
    public function edit(int $product_id)
    {
        $categories = Category::all();
        $product = Product::findOrFail($product_id);
        // $product->load('productImage');
        return view('admin.products.edit', compact('categories' , 'product'));
    }
    public function update(ProductFormRequest $request, int $product_id)
    {
        $vaildatedDate = $request->validated();
        $product = Product::findOrFail($product_id);
                // ->products()->where('id' , $product_id)->first();
        if ($product) {
            $product->update([
                'category_id' => $vaildatedDate['category_id'],
                'name' => $vaildatedDate['name'],
                'slug' => Str::slug($vaildatedDate['slug']),
                'brand' => $vaildatedDate['brand'],
                'description' => $vaildatedDate['description'],
                'short_description' => $vaildatedDate['short_description'],
                'original_price' => $vaildatedDate['original_price'],
                'selling_price' => $vaildatedDate['selling_price'],
                'quantity' => $vaildatedDate['quantity'],
                'status' => $vaildatedDate['status'] == '1' ? 'active' : 'inactive',
            ]);

            if ($request->hasFile('image')) {
                $uploadPath = 'uploads/products_img/';
                
                foreach ($request->file('image') as $imageFile) {
                    $extention = $imageFile->getClientOriginalExtension();
                    $filename = time() . '.' . $extention;
                    
                    $imageFile->move($uploadPath, $filename);
                    $finalImagePathName = $uploadPath . $filename;

                    // Create or update product image
                    $product->productImage()->create([
                        'product_id' => $product->id,
                        'image' => $finalImagePathName,
                    ]);
                }
            }
            return redirect('admin/products')->with('message', 'Product updated successfully');
        }
        else {
            return redirect('admin/products')->with('message', 'Product Id not found');
        }
    }
    public function destroyImage(int $product_image_id)
    {
        $productImage = ProductImage::findOrFail($product_image_id);
        if (File::exists($productImage->image)) {
            File::delete($productImage->image);
        }
        $productImage->delete();
        return redirect()->back()->with('message', 'Product image deleted successfully');
    }

    public function destroy(int $product_id )
    {
        $product = Product::findOrFail($product_id);
            // Delete product images
            foreach ($product->productImage() as $image) {
                if (File::exists($image->image)) {
                    File::delete($image->image);
                }
                $image->delete(); // remove from DB too
        }
        // Delete the product
        $product->delete();
        return redirect()->back()->with('message' , 'Product deleted successfully');
    }
} 