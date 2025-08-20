<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'brand',
        'description',
        'short_description',
        'original_price',
        'selling_price',
        'gender',
        'material',
        'care_instructions',
        'season',
        'track_quantity',
        'quantity',
        'min_quantity',
        'status',
        'featured',
        'is_new',
        'is_sale',
        // Add other fields as needed
    ]; 
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function productImage()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }
}
