<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Jasa Joki Mobile Legends</title>
    <style>
        body { font-family: Arial, sans-serif; background: #0f0f1a; color: #fff; max-width: 600px; margin: 40px auto; padding: 0 20px; }
        h1 { color: #ffd166; }
        label { display: block; margin-top: 15px; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 8px; margin-top: 5px; border-radius: 5px; border: none; box-sizing: border-box; }
        button { margin-top: 20px; padding: 10px 20px; background: #ffd166; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        .success { background: #2ecc71; color: #000; padding: 10px; border-radius: 5px; margin-top: 15px; }
        .error { background: #e74c3c; color: #fff; padding: 10px; border-radius: 5px; margin-top: 15px; }
    </style>
</head>
<body>
    <h1>🎮 Jasa Joki Mobile Legends</h1>
    <p>Naik rank cepat, aman, dan terpercaya. Isi form di bawah untuk pesan.</p>

    @if (session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

    @if ($errors->any())
        <div class="error">
            <ul style="margin:0; padding-left:18px;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('joki.store') }}" method="POST">
        @csrf

        <label for="name">Nama</label>
        <input type="text" id="name" name="name" value="{{ old('name') }}" required>

        <label for="whatsapp">Nomor WhatsApp</label>
        <input type="text" id="whatsapp" name="whatsapp" value="{{ old('whatsapp') }}" required>

        <label for="target_rank">Target Rank</label>
        <select id="target_rank" name="target_rank" required>
            <option value="">-- Pilih target rank --</option>
            <option value="Epic">Epic</option>
            <option value="Legend">Legend</option>
            <option value="Mythic">Mythic</option>
            <option value="Mythical Glory">Mythical Glory</option>
        </select>

        <label for="package">Paket Joki</label>
        <select id="package" name="package" required>
            <option value="">-- Pilih paket --</option>
            <option value="Reguler">Reguler</option>
            <option value="Express">Express</option>
            <option value="VIP">VIP</option>
        </select>

        <label for="notes">Catatan Tambahan (opsional)</label>
        <textarea id="notes" name="notes" rows="3">{{ old('notes') }}</textarea>

        <button type="submit">Pesan Sekarang</button>
    </form>
</body>
</html>