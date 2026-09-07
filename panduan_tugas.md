# Panduan Tugas: evolusi-pl-NIM (Laravel + GitHub Workflow)

Ganti semua `<NIM>`, `<username>`, dan `<fitur>` di bawah dengan milikmu sendiri.

---

## 1. Buat Repository di GitHub

1. Buka github.com → New repository
2. Nama: `evolusi-pl-<NIM>` (contoh: `evolusi-pl-24535871`)
3. Visibility: **Public** (supaya Actions gratis)
4. Jangan centang "Add README" jika project Laravel-mu sudah ada secara lokal

## 2. Hubungkan Project Laravel Lokal

Buka terminal (Laragon Terminal atau cmd yang sudah bisa `composer`/`php`), masuk ke folder project:

```bash
cd "D:\SEMESTER 5\KONSTRUKSI DAN REVOLUSI PERANGKAT LUNAK\CODING TUGAS\evolusi-pl-24321"
git init
git branch -M main
git remote add origin https://github.com/<username>/evolusi-pl-<NIM>.git
git add .
git commit -m "feat: initial laravel project setup"
git push -u origin main
```

> Laravel sudah punya `.gitignore` bawaan (mengabaikan `vendor/`, `.env`, `node_modules/`), jadi tidak perlu buat manual.

## 3. Gaya Conventional Commits

Format: `<type>: <deskripsi singkat>`

Tipe yang umum dipakai: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Contoh urutan minimal 5 commit (sesuaikan dengan progres nyatamu, jangan commit kosong):

1. `feat: initial laravel project setup`
2. `chore: add github actions ci workflow`
3. `feat: add <fitur> page and route`
4. `style: format <fitur> blade template`
5. `docs: update readme with project description`

Commit "update" polos **tidak boleh** — setiap pesan commit harus menjelaskan perubahan nyata.

## 4. Strategi Branching

```bash
# buat dev dari main
git checkout -b dev main
git push -u origin dev

# buat feature dari dev
git checkout -b feature/<fitur> dev
# ...lakukan perubahan nyata di sini (tambah route, view, controller, dll)...
git add .
git commit -m "feat: add <fitur> page and route"
git push -u origin feature/<fitur>
```

**Jangan pernah** `git push origin main` langsung — semua perubahan ke `main` harus lewat Pull Request dari `dev`.

## 5. Pull Requests

1. Di GitHub, buka tab **Pull requests** → New pull request
2. PR pertama: base `dev` ← compare `feature/<fitur>` → beri judul & deskripsi → Merge
3. PR kedua: base `main` ← compare `dev` → beri judul & deskripsi → Merge

## 6. GitHub Actions CI

Buat file `.github/workflows/ci.yml` di root project:

```yaml
name: CI

on:
  push:
    branches: [main, dev, 'feature/**']
  pull_request:
    branches: [main, dev]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
      - name: Install dependencies
        run: composer install --no-progress --prefer-dist
      - name: Check PHP syntax
        run: find . -name "*.php" -not -path "./vendor/*" -print0 | xargs -0 -n1 php -l

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
      - name: Copy .env
        run: cp .env.example .env
      - name: Install dependencies
        run: composer install --no-progress --prefer-dist
      - name: Generate app key
        run: php artisan key:generate
      - name: Prepare SQLite database
        run: touch database/database.sqlite
      - name: Run tests
        run: php artisan test
```

Commit dan push file ini (misalnya lewat `feature/<fitur>` atau langsung setelah PR pertama di `dev`), lalu cek tab **Actions** di GitHub sampai kedua job (`lint` dan `test`) muncul centang hijau.

Kalau job `test` gagal karena env, kirimkan saya pesan error dari tab Actions dan saya bantu perbaiki.

## 7. Branch Protection Rules

Settings → Branches → Add branch protection rule, ulangi untuk `main` dan `dev`:

- Branch name pattern: `main` (lalu ulangi untuk `dev`)
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging → pilih job `lint` dan `test`
- Save changes

## 8. Tambahkan Collaborator

Settings → Collaborators → Add people → masukkan username/email dosen/asisten → Role: **Read**

## 9. Laporan PDF

Format laporan yang "sudah disampaikan" belum saya lihat — upload file/template formatnya (PDF, Word, atau slide dari dosen), dan saya bantu susun laporannya sesuai struktur itu setelah repo dan PR-mu selesai.