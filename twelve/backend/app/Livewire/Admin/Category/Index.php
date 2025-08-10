<?php

namespace App\Livewire\Admin\Category;


use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Category;
use Illuminate\Support\Facades\File;

class Index extends Component
{
    use WithPagination;
    protected $paginationTheme = 'bootstrap';

    public $category_id;

    public function deleteCategory($category_id)
    {   
        $this->category_id = $category_id;
    }

    public function destroyCategory()
    {
        $category = Category::find($this->category_id);
        if($category) {
            $path = 'uploads/category/'.$category->image;
            if(File::exists($path)){
                File::delete($path);
            }
            $category->delete();
            session()->flash('message', 'Category deleted successfully');
            $this->dispatchBrowserEvent('close-modal');
        } else {
            session()->flash('message', 'Category not found');
        }
    }

    public function render()
    {
        $categories = Category::orderBy('id', 'DESC')->paginate(10);
        return view('livewire.admin.category.index',['categories'=> $categories]);
    }
}
