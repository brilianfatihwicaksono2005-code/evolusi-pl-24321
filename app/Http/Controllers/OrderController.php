<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function create()
    {
        return view('joki.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:20',
            'target_rank' => 'required|string|max:100',
            'package' => 'required|string|max:100',
            'notes' => 'nullable|string',
        ]);

        Order::create($validated);

        return redirect()->route('joki.create')
            ->with('success', 'Pesanan joki berhasil dikirim! Kami akan menghubungimu via WhatsApp.');
    }
}
