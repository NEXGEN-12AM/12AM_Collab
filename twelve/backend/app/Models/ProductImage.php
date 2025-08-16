<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductImage extends Model
{
    use HasFactory;

    protected $table = 'product_images';

    protected $fillable = [
        'product_id',
        'image_path',
        'alt_text',
        'color',
        'type',
        'sort_order',
        'is_primary',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
