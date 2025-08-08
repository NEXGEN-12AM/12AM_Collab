<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryFormRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class CategoryController extends Controller
{
    public function index()
    {
        return view('admin.category.index');
    }
    public function create()
    {
        return view('admin.category.create');
    }
    public function store(CategoryFormRequest $request)
    {
        $validatedData = $request->validated();

        $category = new Category();
        $category ->name = $validatedData['name'];
        $category ->slug = Str::slug($validatedData['slug']);
        $category ->description = $validatedData['description'];
        $category ->sort_order = $validatedData['sort_order'] ?? 0;

        if ($request->hasFile('image')){
            $file = $request->file('image');
            $ext = $file->getClientOriginalExtension();
            $filename = time() . '.' . $ext;
            $file->move(public_path('uploads/category/'), $filename);
            $category->image = $filename;
        } else {
            $category->image = null;
        }
        // $category ->image = $validatedData['image'] ?? null;
        $category ->status = $validatedData['status'] == '1' ? 'active' : 'inactive';
        $category->save();

        return redirect('admin/category')->with('message', 'Category added successfully');

    }
    public function edit(Category $category)
    {
        return view('admin.category.edit', compact('category')); // sends the category data to the view
    }
}