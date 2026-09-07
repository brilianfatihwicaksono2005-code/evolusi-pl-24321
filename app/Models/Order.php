<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['name', 'whatsapp', 'target_rank', 'package', 'notes'];
}
