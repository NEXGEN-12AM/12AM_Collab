<?php
// app/Models/User.php (This file already exists!)
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    // What fields can be filled when creating/updating users
    protected $fillable = [
        'name',
        'email',
        'password',
        'usertype',
    ];
}
