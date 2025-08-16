<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Support\Str;

class SampleShirtSeeder extends Seeder
{
    public function run(): void
    {
        $category = Category::firstOrCreate([
            'name' => 'Shirts',
        ], [
            'slug' => 'shirts',
            'description' => 'Sample shirts category',
            'status' => 1,
            'sort_order' => 1,
        ]);

        $brand = Brand::firstOrCreate([
            'name' => 'Sample Brand',
        ], [
            'slug' => 'sample-brand',
            'description' => 'A sample brand for shirts',
            'status' => 1,
        ]);

        for ($i = 1; $i <= 10; $i++) {
            Product::create([
                'name' => "Sample Shirt $i",
                'slug' => Str::slug("Sample Shirt $i"),
                'description' => 'A comfortable and stylish shirt.',
                'short_description' => 'A stylish shirt.',
                'price' => rand(15, 50),
                'discount_price' => null,
                'cost_price' => rand(10, 20),
                'category_id' => $category->id,
                'brand_id' => $brand->id,
                'gender' => 'man',
                'material' => 'Cotton',
                'care_instructions' => 'Machine wash cold',
                'season' => 'all',
                'track_quantity' => true,
                'quantity' => rand(10, 100),
                'min_quantity' => 5,
                'status' => 'active',
                'featured' => false,
                'is_new' => true,
                'is_sale' => false,
                'meta_title' => 'Sample Shirt',
                'meta_description' => 'A sample shirt for seeding.',
                'tags' => json_encode(['shirt', 'sample']),
            ]);
        }
    }
}
