<?php

namespace App\Livewire\Admin\Category;


use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Category;

class Index extends Component
{
    use WithPagination;
    protected $paginationTheme = 'bootstrap';

    public function render()
    {
        $categories = Category::orderBy('id', 'DESC')->paginate(10);
        return view('livewire.admin.category.index',['categories'=> $categories]);
    }
}
