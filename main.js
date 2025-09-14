import './style.css';

class GorutMartApp {
  constructor() {
    this.currentPage = 'home';
    this.cart = new Map();
    this.products = this.generateProducts();
    this.categories = this.getCategories();
    this.user = this.loadCurrentUser();
    this.database = this.initDatabase();
    
    this.init();
  }

  initDatabase() {
    // Simulated database using localStorage
    const defaultUsers = [
      {
        id: 1,
        email: 'admin@gorutmart.com',
        password: 'admin123',
        name: 'Admin GorutMart',
        role: 'admin',
        phone: '08123456789',
        address: 'Kampus TI',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        email: 'mahasiswa@ti.ac.id',
        password: 'mahasiswa123',
        name: 'Mahasiswa TI',
        role: 'user',
        phone: '08987654321',
        address: 'Jl. Mahasiswa No. 1',
        createdAt: new Date().toISOString()
      }
    ];

    const defaultOrders = [
      {
        id: 1,
        userId: 2,
        items: [
          { productId: 1, quantity: 2, price: 3500 },
          { productId: 8, quantity: 1, price: 50000 }
        ],
        total: 57000,
        status: 'completed',
        paymentMethod: 'qris',
        shippingAddress: 'Jl. Mahasiswa No. 1',
        createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      }
    ];

    // Initialize database if not exists
    if (!localStorage.getItem('gorutmart_users')) {
      localStorage.setItem('gorutmart_users', JSON.stringify(defaultUsers));
    }
    
    if (!localStorage.getItem('gorutmart_orders')) {
      localStorage.setItem('gorutmart_orders', JSON.stringify(defaultOrders));
    }

    return {
      users: JSON.parse(localStorage.getItem('gorutmart_users') || '[]'),
      orders: JSON.parse(localStorage.getItem('gorutmart_orders') || '[]')
    };
  }

  saveToDatabase(table, data) {
    this.database[table] = data;
    localStorage.setItem(`gorutmart_${table}`, JSON.stringify(data));
  }

  loadCurrentUser() {
    const userStr = localStorage.getItem('gorutmart_current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  saveCurrentUser(user) {
    this.user = user;
    localStorage.setItem('gorutmart_current_user', JSON.stringify(user));
  }

  logout() {
    this.user = null;
    localStorage.removeItem('gorutmart_current_user');
    this.showNotification('Berhasil logout', 'success');
    this.showPage('home');
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  getCategories() {
    return [
      {
        id: 'food-drinks',
        name: 'Makanan & Minuman',
        icon: '🍎',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/22c55e/ffffff?text=Food+%26+Drinks',
        subcategories: ['Snack & Cemilan', 'Minuman', 'Makanan Instan', 'Frozen Food']
      },
      {
        id: 'health-beauty',
        name: 'Kesehatan & Kecantikan',
        icon: '💊',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/f59e0b/ffffff?text=Health+%26+Beauty',
        subcategories: ['Obat & Suplemen', 'Vitamin', 'Skincare & Kosmetik', 'Peralatan Mandi']
      },
      {
        id: 'household',
        name: 'Peralatan Rumah Tangga',
        icon: '🏠',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/8b5cf6/ffffff?text=Household',
        subcategories: ['Alat Kebersihan', 'Peralatan Dapur', 'Plastik & Kemasan']
      },
      {
        id: 'baby-kids',
        name: 'Produk Anak & Bayi',
        icon: '👶',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/ec4899/ffffff?text=Baby+%26+Kids',
        subcategories: ['Susu Bayi', 'Popok', 'Makanan Bayi', 'Mainan Edukatif']
      },
      {
        id: 'electronics',
        name: 'Elektronik & Aksesoris',
        icon: '📱',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/06b6d4/ffffff?text=Electronics',
        subcategories: ['Charger & Kabel', 'Headset', 'Lampu LED', 'Alat Elektronik']
      },
      {
        id: 'fashion',
        name: 'Fashion & Aksesoris',
        icon: '👕',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/ef4444/ffffff?text=Fashion',
        subcategories: ['Pakaian Pria/Wanita', 'Tas & Sepatu', 'Aksesoris Mahasiswa']
      },
      {
        id: 'local-products',
        name: 'Produk Lokal Mahasiswa',
        icon: '🎨',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/10b981/ffffff?text=Local+Products',
        subcategories: ['Kerajinan Tangan', 'Makanan Lokal', 'Merchandise Prodi TI']
      },
      {
        id: 'digital-products',
        name: 'Produk Digital',
        icon: '💻',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/6366f1/ffffff?text=Digital+Products',
        subcategories: ['E-Book & Modul', 'Aplikasi & Template', 'Jasa Digital']
      }
    ];
  }

  generateProducts() {
    const products = [
      // Food & Drinks
      { id: 1, name: 'Indomie Goreng', category: 'food-drinks', subcategory: 'Makanan Instan', price: 3500, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/22c55e/ffffff?text=Indomie', stock: 50, description: 'Mie instan rasa ayam bawang, favorit mahasiswa' },
      { id: 2, name: 'Teh Botol Sosro', category: 'food-drinks', subcategory: 'Minuman', price: 4000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/22c55e/ffffff?text=Teh+Botol', stock: 30, description: 'Minuman teh kemasan botol segar' },
      { id: 3, name: 'Chitato Rasa BBQ', category: 'food-drinks', subcategory: 'Snack & Cemilan', price: 8500, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/22c55e/ffffff?text=Chitato', stock: 25, description: 'Keripik kentang rasa BBQ gurih' },
      
      // Health & Beauty
      { id: 4, name: 'Vitamin C 1000mg', category: 'health-beauty', subcategory: 'Vitamin', price: 15000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/f59e0b/ffffff?text=Vitamin+C', stock: 20, description: 'Suplemen vitamin C untuk daya tahan tubuh' },
      { id: 5, name: 'Sabun Mandi Lifebuoy', category: 'health-beauty', subcategory: 'Peralatan Mandi', price: 3500, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/f59e0b/ffffff?text=Lifebuoy', stock: 40, description: 'Sabun antibakteri untuk mandi' },
      
      // Electronics
      { id: 6, name: 'Kabel USB Type-C', category: 'electronics', subcategory: 'Charger & Kabel', price: 25000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/06b6d4/ffffff?text=USB+Cable', stock: 15, description: 'Kabel charging USB Type-C 1 meter' },
      { id: 7, name: 'Earphone Bluetooth', category: 'electronics', subcategory: 'Headset', price: 75000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/06b6d4/ffffff?text=Earphone', stock: 10, description: 'Earphone nirkabel dengan kualitas suara jernih' },
      
      // Digital Products
      { id: 8, name: 'E-Book: Python for Beginners', category: 'digital-products', subcategory: 'E-Book & Modul', price: 50000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/6366f1/ffffff?text=Python+Book', stock: 999, description: 'Panduan lengkap belajar Python dari dasar', digital: true },
      { id: 9, name: 'Template Website E-Commerce', category: 'digital-products', subcategory: 'Aplikasi & Template', price: 150000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/6366f1/ffffff?text=Web+Template', stock: 999, description: 'Template website e-commerce siap pakai dengan HTML, CSS, JS', digital: true },
      { id: 10, name: 'Jasa Desain Logo', category: 'digital-products', subcategory: 'Jasa Digital', price: 100000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/6366f1/ffffff?text=Logo+Design', stock: 999, description: 'Jasa pembuatan logo profesional untuk bisnis', digital: true },
      
      // Local Products
      { id: 11, name: 'Kaos Prodi TI', category: 'local-products', subcategory: 'Merchandise Prodi TI', price: 65000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/10b981/ffffff?text=TI+Shirt', stock: 20, description: 'Kaos resmi Prodi Teknik Informatika' },
      { id: 12, name: 'Kopi Robusta Lokal', category: 'local-products', subcategory: 'Makanan Lokal', price: 35000, image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/10b981/ffffff?text=Local+Coffee', stock: 15, description: 'Kopi robusta asli hasil produksi mahasiswa' }
    ];

    return products;
  }

  render() {
    const app = document.getElementById('app');
    
    if (this.currentPage === 'login') {
      app.innerHTML = this.renderLoginPage();
    } else if (this.currentPage === 'register') {
      app.innerHTML = this.renderRegisterPage();
    } else if (this.currentPage === 'admin-dashboard') {
      app.innerHTML = this.renderAdminDashboard();
    } else if (this.currentPage === 'user-profile') {
      app.innerHTML = this.renderUserProfile();
    } else if (this.currentPage === 'home') {
      app.innerHTML = this.renderHomePage();
    } else if (this.currentPage === 'category') {
      app.innerHTML = this.renderCategoryPage();
    } else if (this.currentPage === 'product') {
      app.innerHTML = this.renderProductPage();
    } else if (this.currentPage === 'cart') {
      app.innerHTML = this.renderCartPage();
    }
  }

  renderLoginPage() {
    return `
      <div class="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center px-4">
        <div class="max-w-md w-full">
          <!-- Logo & Title -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">GorutMart</h1>
            <p class="text-white/80">Masuk ke akun Anda</p>
          </div>

          <!-- Login Form -->
          <div class="bg-white rounded-2xl shadow-2xl p-8">
            <form id="loginForm" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" id="loginEmail" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="masukkan email anda">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div class="relative">
                  <input type="password" id="loginPassword" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="masukkan password">
                  <button type="button" onclick="app.togglePassword('loginPassword')" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                  <span class="ml-2 text-sm text-gray-600">Ingat saya</span>
                </label>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-800">Lupa password?</a>
              </div>

              <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Masuk
              </button>
            </form>

            <!-- Demo Accounts -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <p class="text-sm text-gray-600 mb-3">Demo Accounts:</p>
              <div class="grid grid-cols-2 gap-3">
                <button onclick="app.fillDemoCredentials('admin')" class="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                  Admin Demo
                </button>
                <button onclick="app.fillDemoCredentials('user')" class="text-xs bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors">
                  User Demo
                </button>
              </div>
            </div>

            <!-- Register Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                Belum punya akun? 
                <button onclick="app.showPage('register')" class="text-blue-600 hover:text-blue-800 font-medium">Daftar sekarang</button>
              </p>
            </div>
          </div>

          <!-- Back to Home -->
          <div class="text-center mt-6">
            <button onclick="app.showPage('home')" class="text-white/80 hover:text-white text-sm">
              ← Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderRegisterPage() {
    return `
      <div class="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 flex items-center justify-center px-4">
        <div class="max-w-md w-full">
          <!-- Logo & Title -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Bergabung dengan GorutMart</h1>
            <p class="text-white/80">Daftar sebagai anggota baru</p>
          </div>

          <!-- Register Form -->
          <div class="bg-white rounded-2xl shadow-2xl p-8">
            <form id="registerForm" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input type="text" id="registerName" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Nama lengkap Anda">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" id="registerEmail" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="email@example.com">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor HP</label>
                <input type="tel" id="registerPhone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="08123456789">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div class="relative">
                  <input type="password" id="registerPassword" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="minimal 6 karakter">
                  <button type="button" onclick="app.togglePassword('registerPassword')" class="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                <textarea id="registerAddress" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="3" placeholder="Alamat lengkap untuk pengiriman"></textarea>
              </div>

              <div class="flex items-center">
                <input type="checkbox" id="agreeTerms" required class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500">
                <label for="agreeTerms" class="ml-2 text-sm text-gray-600">
                  Saya setuju dengan <a href="#" class="text-green-600 hover:text-green-800">syarat dan ketentuan</a>
                </label>
              </div>

              <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Daftar Sekarang
              </button>
            </form>

            <!-- Login Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                Sudah punya akun? 
                <button onclick="app.showPage('login')" class="text-green-600 hover:text-green-800 font-medium">Masuk di sini</button>
              </p>
            </div>
          </div>

          <!-- Back to Home -->
          <div class="text-center mt-6">
            <button onclick="app.showPage('home')" class="text-white/80 hover:text-white text-sm">
              ← Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderAdminDashboard() {
    const users = this.database.users;
    const orders = this.database.orders;
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const completedOrders = orders.filter(order => order.status === 'completed').length;

    return `
      ${this.renderNavigation()}
      
      <!-- Admin Header -->
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl font-bold mb-2">Dashboard Admin GorutMart</h1>
          <p class="text-lg opacity-90">Kelola platform e-commerce mahasiswa TI</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <section class="py-8 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-600">Total Users</p>
                  <p class="text-2xl font-bold text-gray-800">${totalUsers}</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-600">Total Orders</p>
                  <p class="text-2xl font-bold text-gray-800">${totalOrders}</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-600">Total Revenue</p>
                  <p class="text-2xl font-bold text-gray-800">Rp ${totalRevenue.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-600">Completed Orders</p>
                  <p class="text-2xl font-bold text-gray-800">${completedOrders}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Management Sections -->
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Users Management -->
            <div class="bg-white rounded-xl shadow-lg">
              <div class="p-6 border-b border-gray-200">
                <h3 class="text-xl font-bold text-gray-800">Manajemen Pengguna</h3>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  ${users.slice(0, 5).map(user => `
                    <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span class="text-sm font-semibold text-gray-600">${user.name.charAt(0)}</span>
                        </div>
                        <div class="ml-3">
                          <p class="font-medium text-gray-800">${user.name}</p>
                          <p class="text-sm text-gray-600">${user.email}</p>
                          <span class="text-xs px-2 py-1 rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">${user.role}</span>
                        </div>
                      </div>
                      <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-800 p-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button class="text-red-600 hover:text-red-800 p-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
                <button class="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Lihat Semua Pengguna
                </button>
              </div>
            </div>

            <!-- Orders Management -->
            <div class="bg-white rounded-xl shadow-lg">
              <div class="p-6 border-b border-gray-200">
                <h3 class="text-xl font-bold text-gray-800">Manajemen Pesanan</h3>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  ${orders.slice(0, 5).map(order => {
                    const user = users.find(u => u.id === order.userId);
                    const statusColors = {
                      'pending': 'bg-yellow-100 text-yellow-800',
                      'processing': 'bg-blue-100 text-blue-800',
                      'completed': 'bg-green-100 text-green-800',
                      'cancelled': 'bg-red-100 text-red-800'
                    };
                    return `
                      <div class="p-4 border border-gray-200 rounded-lg">
                        <div class="flex justify-between items-start mb-2">
                          <div>
                            <p class="font-medium text-gray-800">Order #${order.id}</p>
                            <p class="text-sm text-gray-600">${user ? user.name : 'Unknown User'}</p>
                          </div>
                          <span class="text-xs px-2 py-1 rounded-full ${statusColors[order.status]}">${order.status}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                          <span class="text-gray-600">${order.items.length} item(s)</span>
                          <span class="font-bold text-blue-600">Rp ${order.total.toLocaleString('id-ID')}</span>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">${new Date(order.createdAt).toLocaleDateString('id-ID')}</p>
                      </div>
                    `;
                  }).join('')}
                </div>
                <button class="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Lihat Semua Pesanan
                </button>
              </div>
            </div>
          </div>

          <!-- Product Management -->
          <div class="mt-8 bg-white rounded-xl shadow-lg">
            <div class="p-6 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h3 class="text-xl font-bold text-gray-800">Manajemen Produk</h3>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  + Tambah Produk
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-gray-200">
                      <th class="text-left py-3 px-4 font-semibold text-gray-700">Produk</th>
                      <th class="text-left py-3 px-4 font-semibold text-gray-700">Kategori</th>
                      <th class="text-left py-3 px-4 font-semibold text-gray-700">Harga</th>
                      <th class="text-left py-3 px-4 font-semibold text-gray-700">Stok</th>
                      <th class="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.products.slice(0, 8).map(product => `
                      <tr class="border-b border-gray-100 hover:bg-gray-50">
                        <td class="py-3 px-4">
                          <div class="flex items-center">
                            <img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded-lg object-cover">
                            <div class="ml-3">
                              <p class="font-medium text-gray-800">${product.name}</p>
                              ${product.digital ? '<span class="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Digital</span>' : ''}
                            </div>
                          </div>
                        </td>
                        <td class="py-3 px-4 text-gray-600">${product.subcategory}</td>
                        <td class="py-3 px-4 font-medium">Rp ${product.price.toLocaleString('id-ID')}</td>
                        <td class="py-3 px-4 text-gray-600">${product.digital ? '∞' : product.stock}</td>
                        <td class="py-3 px-4">
                          <div class="flex space-x-2">
                            <button class="text-blue-600 hover:text-blue-800 p-1">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                            </button>
                            <button class="text-red-600 hover:text-red-800 p-1">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderUserProfile() {
    const userOrders = this.database.orders.filter(order => order.userId === this.user.id);
    
    return `
      ${this.renderNavigation()}
      
      <!-- Profile Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="flex items-center">
            <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-6">
              <span class="text-2xl font-bold">${this.user.name.charAt(0)}</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold mb-2">${this.user.name}</h1>
              <p class="text-lg opacity-90">${this.user.email}</p>
              <span class="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                ${this.user.role === 'admin' ? 'Administrator' : 'Mahasiswa TI'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Profile Info -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-6">Informasi Profil</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input type="text" value="${this.user.name}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value="${this.user.email}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                  <input type="tel" value="${this.user.phone || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                  <textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">${this.user.address || ''}</textarea>
                </div>
                
                <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Update Profil
                </button>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">Statistik</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Total Pesanan</span>
                  <span class="font-semibold">${userOrders.length}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Pesanan Selesai</span>
                  <span class="font-semibold">${userOrders.filter(o => o.status === 'completed').length}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Total Belanja</span>
                  <span class="font-semibold">Rp ${userOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString('id-ID')}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Bergabung Sejak</span>
                  <span class="font-semibold">${new Date(this.user.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Order History -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-lg">
              <div class="p-6 border-b border-gray-200">
                <h3 class="text-xl font-bold text-gray-800">Riwayat Pesanan</h3>
              </div>
              
              <div class="p-6">
                ${userOrders.length === 0 ? `
                  <div class="text-center py-12">
                    <div class="text-4xl mb-4">📦</div>
                    <h4 class="text-lg font-semibold text-gray-600 mb-2">Belum Ada Pesanan</h4>
                    <p class="text-gray-500 mb-6">Mulai berbelanja untuk melihat riwayat pesanan Anda</p>
                    <button onclick="app.showPage('home')" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Mulai Belanja
                    </button>
                  </div>
                ` : `
                  <div class="space-y-4">
                    ${userOrders.map(order => {
                      const statusColors = {
                        'pending': 'bg-yellow-100 text-yellow-800',
                        'processing': 'bg-blue-100 text-blue-800',
                        'completed': 'bg-green-100 text-green-800',
                        'cancelled': 'bg-red-100 text-red-800'
                      };
                      
                      return `
                        <div class="border border-gray-200 rounded-lg p-6">
                          <div class="flex justify-between items-start mb-4">
                            <div>
                              <h4 class="font-semibold text-gray-800">Order #${order.id}</h4>
                              <p class="text-sm text-gray-600">${new Date(order.createdAt).toLocaleDateString('id-ID', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</p>
                            </div>
                            <span class="px-3 py-1 rounded-full text-xs ${statusColors[order.status]}">${order.status}</span>
                          </div>
                          
                          <div class="space-y-2 mb-4">
                            ${order.items.map(item => {
                              const product = this.products.find(p => p.id === item.productId);
                              return `
                                <div class="flex items-center justify-between text-sm">
                                  <span class="text-gray-700">${product ? product.name : 'Unknown Product'} x${item.quantity}</span>
                                  <span class="font-medium">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                </div>
                              `;
                            }).join('')}
                          </div>
                          
                          <div class="border-t pt-4 flex justify-between items-center">
                            <div class="text-sm text-gray-600">
                              <p>Pembayaran: ${order.paymentMethod.toUpperCase()}</p>
                              <p>Alamat: ${order.shippingAddress}</p>
                            </div>
                            <div class="text-right">
                              <p class="text-lg font-bold text-blue-600">Rp ${order.total.toLocaleString('id-ID')}</p>
                              ${order.status === 'completed' ? `
                                <button class="mt-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors">
                                  Beli Lagi
                                </button>
                              ` : ''}
                            </div>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderHomePage() {
    return `
      <!-- Navigation -->
      <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-2 mr-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <div>
                  <h1 class="text-xl font-bold text-gray-800">GorutMart</h1>
                  <p class="text-xs text-gray-500">IT Student Marketplace</p>
                </div>
              </div>
            </div>
            
            <div class="hidden md:flex flex-1 max-w-lg mx-8">
              <div class="relative w-full">
                <input type="text" placeholder="Cari produk, jasa digital..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <svg class="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <button onclick="app.showPage('cart')" class="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 8L3 3H1m6 10v6a1 1 0 001 1h1m-1-5a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3z"></path>
                </svg>
                <span id="cart-count" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">${this.getTotalCartItems()}</span>
              </button>
              
              ${this.user ? `
                <div class="relative group">
                  <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <span class="text-sm font-semibold">${this.user.name.charAt(0)}</span>
                    </div>
                    <span class="hidden md:block text-sm text-gray-700">${this.user.name}</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    ${this.user.role === 'admin' ? `
                      <button onclick="app.showPage('admin-dashboard')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg">
                        🏠 Dashboard Admin
                      </button>
                    ` : ''}
                    <button onclick="app.showPage('user-profile')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      👤 Profil Saya
                    </button>
                    <button onclick="app.showPage('user-profile')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      📦 Pesanan Saya
                    </button>
                    <hr class="my-1">
                    <button onclick="app.logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              ` : `
                <button onclick="app.showPage('login')" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Masuk
                </button>
              `}
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold mb-6">GorutMart</h1>
          <p class="text-xl mb-8 opacity-90">E-Commerce Mahasiswa Teknik Informatika</p>
          <p class="text-lg mb-10 opacity-80">Belanja kebutuhan harian + produk digital karya mahasiswa dalam satu platform</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <div class="text-3xl mb-4">🛒</div>
              <h3 class="text-lg font-semibold mb-2">Produk Fisik</h3>
              <p class="text-sm opacity-80">Kebutuhan sehari-hari seperti Indomaret/Alfamart</p>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <div class="text-3xl mb-4">💻</div>
              <h3 class="text-lg font-semibold mb-2">Produk Digital</h3>
              <p class="text-sm opacity-80">E-book, template, aplikasi karya mahasiswa</p>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <div class="text-3xl mb-4">🎓</div>
              <h3 class="text-lg font-semibold mb-2">Jasa Digital</h3>
              <p class="text-sm opacity-80">Desain, coding, konsultasi IT</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Kategori Produk</h2>
            <p class="text-gray-600">Temukan semua kebutuhan Anda dalam satu tempat</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${this.categories.map(category => `
              <div onclick="app.showCategory('${category.id}')" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group">
                <div class="aspect-square overflow-hidden rounded-t-xl">
                  <img src="${category.image}" alt="${category.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                </div>
                <div class="p-4 text-center">
                  <div class="text-2xl mb-2">${category.icon}</div>
                  <h3 class="font-semibold text-gray-800 text-sm">${category.name}</h3>
                  <p class="text-xs text-gray-500 mt-1">${category.subcategories.length} subkategori</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Produk Unggulan</h2>
            <p class="text-gray-600">Produk terpopuler dari berbagai kategori</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${this.products.slice(0, 8).map(product => `
              <div onclick="app.showProduct(${product.id})" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div class="aspect-square overflow-hidden rounded-t-xl relative">
                  <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                  ${product.digital ? '<span class="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Digital</span>' : ''}
                </div>
                <div class="p-4">
                  <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2">${product.name}</h3>
                  <p class="text-sm text-gray-600 mb-3 line-clamp-2">${product.description}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-blue-600">Rp ${product.price.toLocaleString('id-ID')}</span>
                    <button onclick="event.stopPropagation(); app.addToCart(${product.id})" class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      + Keranjang
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Digital Products Highlight -->
      <section class="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Produk Digital Mahasiswa TI</h2>
            <p class="text-lg opacity-90">Karya digital mahasiswa untuk membantu sesama mahasiswa</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${this.products.filter(p => p.digital).slice(0, 3).map(product => `
              <div onclick="app.showProduct(${product.id})" class="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300">
                <div class="text-4xl mb-4">💻</div>
                <h3 class="text-xl font-semibold mb-3">${product.name}</h3>
                <p class="text-sm opacity-80 mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold">Rp ${product.price.toLocaleString('id-ID')}</span>
                  <span class="bg-white/20 px-3 py-1 rounded-full text-xs">Download Langsung</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4">GorutMart</h3>
              <p class="text-gray-400 text-sm mb-4">E-commerce mahasiswa Teknik Informatika dengan konsep convenience store modern</p>
              <div class="flex space-x-3">
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-xs">📱</span>
                </div>
                <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span class="text-xs">💬</span>
                </div>
                <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-xs">📧</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Kategori Populer</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Makanan & Minuman</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Produk Digital</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Elektronik</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Produk Lokal</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Layanan</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="#" class="hover:text-white transition-colors">Panduan Belanja</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Pembayaran</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Pengiriman</a></li>
                <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Kontak</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li>📍 Kampus Teknik Informatika</li>
                <li>📞 +62 123 456 7890</li>
                <li>✉️ gorutmart@ti.ac.id</li>
                <li>🕒 24/7 Online</li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-gray-700 pt-8 mt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 GorutMart - Prodi Teknik Informatika. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }

  renderCategoryPage() {
    const category = this.categories.find(c => c.id === this.selectedCategory);
    const categoryProducts = this.products.filter(p => p.category === this.selectedCategory);

    return `
      <!-- Navigation (reuse from home) -->
      ${this.renderNavigation()}
      
      <!-- Category Header -->
      <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div class="container mx-auto px-4">
          <button onclick="app.showPage('home')" class="mb-4 text-white/80 hover:text-white transition-colors">
            ← Kembali ke Beranda
          </button>
          <div class="flex items-center">
            <div class="text-4xl mr-4">${category.icon}</div>
            <div>
              <h1 class="text-4xl font-bold mb-2">${category.name}</h1>
              <p class="text-lg opacity-90">${categoryProducts.length} produk tersedia</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Subcategories Filter -->
      <section class="py-8 bg-white shadow-sm">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap gap-3">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">Semua</button>
            ${category.subcategories.map(sub => `
              <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">${sub}</button>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Products Grid -->
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${categoryProducts.map(product => `
              <div onclick="app.showProduct(${product.id})" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div class="aspect-square overflow-hidden rounded-t-xl relative">
                  <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                  ${product.digital ? '<span class="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Digital</span>' : ''}
                </div>
                <div class="p-4">
                  <span class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">${product.subcategory}</span>
                  <h3 class="font-semibold text-gray-800 mb-2 mt-2">${product.name}</h3>
                  <p class="text-sm text-gray-600 mb-3 line-clamp-2">${product.description}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-blue-600">Rp ${product.price.toLocaleString('id-ID')}</span>
                    <button onclick="event.stopPropagation(); app.addToCart(${product.id})" class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      + Keranjang
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderProductPage() {
    const product = this.products.find(p => p.id === this.selectedProduct);
    const relatedProducts = this.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return `
      ${this.renderNavigation()}
      
      <section class="py-12">
        <div class="container mx-auto px-4">
          <button onclick="app.goBack()" class="mb-6 text-blue-600 hover:text-blue-800 transition-colors">
            ← Kembali
          </button>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Product Image -->
            <div class="space-y-4">
              <div class="aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
              </div>
              ${product.digital ? `
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <span class="text-sm font-medium text-purple-800">Produk Digital</span>
                  </div>
                  <p class="text-sm text-purple-600 mt-1">File akan dikirim langsung setelah pembayaran berhasil</p>
                </div>
              ` : ''}
            </div>
            
            <!-- Product Info -->
            <div class="space-y-6">
              <div>
                <span class="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">${product.subcategory}</span>
                <h1 class="text-3xl font-bold text-gray-800 mt-4 mb-2">${product.name}</h1>
                <p class="text-gray-600">${product.description}</p>
              </div>
              
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="text-3xl font-bold text-blue-600 mb-2">Rp ${product.price.toLocaleString('id-ID')}</div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                  ${product.digital ? 'Stok: Tidak Terbatas' : `Stok: ${product.stock} unit`}
                </div>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <button class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors" onclick="app.addToCart(${product.id})">
                    Tambah ke Keranjang
                  </button>
                  <button class="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Beli Sekarang
                  </button>
                </div>
                
                ${product.digital ? `
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 class="font-semibold text-blue-800 mb-2">Yang Anda Dapatkan:</h4>
                    <ul class="text-sm text-blue-600 space-y-1">
                      <li>✓ File digital berkualitas tinggi</li>
                      <li>✓ Download langsung setelah pembayaran</li>
                      <li>✓ Dukungan gratis dari pembuat</li>
                      <li>✓ Update gratis (jika ada)</li>
                    </ul>
                  </div>
                ` : `
                  <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 class="font-semibold text-green-800 mb-2">Informasi Pengiriman:</h4>
                    <ul class="text-sm text-green-600 space-y-1">
                      <li>✓ Gratis ongkir untuk pembelian >Rp 50.000</li>
                      <li>✓ Estimasi tiba: 1-2 hari kerja</li>
                      <li>✓ Bisa COD di area kampus</li>
                      <li>✓ Kemasan aman dan rapi</li>
                    </ul>
                  </div>
                `}
              </div>
              
              <!-- Seller Info -->
              <div class="border-t pt-6">
                <h4 class="font-semibold text-gray-800 mb-3">Informasi Penjual</h4>
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold">TI</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Mahasiswa TI</p>
                    <p class="text-sm text-gray-600">Anggota verified ⭐</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Related Products -->
          ${relatedProducts.length > 0 ? `
            <div class="mt-16">
              <h3 class="text-2xl font-bold text-gray-800 mb-8">Produk Serupa</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${relatedProducts.map(product => `
                  <div onclick="app.showProduct(${product.id})" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div class="aspect-square overflow-hidden rounded-t-xl relative">
                      <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                      ${product.digital ? '<span class="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Digital</span>' : ''}
                    </div>
                    <div class="p-4">
                      <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2">${product.name}</h3>
                      <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-blue-600">Rp ${product.price.toLocaleString('id-ID')}</span>
                        <button onclick="event.stopPropagation(); app.addToCart(${product.id})" class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          + Keranjang
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }

  renderCartPage() {
    const cartItems = Array.from(this.cart.entries()).map(([productId, quantity]) => {
      const product = this.products.find(p => p.id === productId);
      return { product, quantity };
    });

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 10000;
    const total = subtotal + shipping;

    return `
      ${this.renderNavigation()}
      
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Keranjang Belanja</h1>
            <button onclick="app.showPage('home')" class="text-blue-600 hover:text-blue-800 transition-colors">
              ← Lanjut Belanja
            </button>
          </div>
          
          ${cartItems.length === 0 ? `
            <div class="text-center py-16">
              <div class="text-6xl mb-4">🛒</div>
              <h3 class="text-xl font-semibold text-gray-600 mb-2">Keranjang Masih Kosong</h3>
              <p class="text-gray-500 mb-6">Yuk, mulai belanja kebutuhan Anda!</p>
              <button onclick="app.showPage('home')" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Mulai Belanja
              </button>
            </div>
          ` : `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Cart Items -->
              <div class="lg:col-span-2 space-y-4">
                ${cartItems.map(item => `
                  <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center space-x-4">
                      <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <img src="${item.product.image}" alt="${item.product.name}" class="w-full h-full object-cover">
                      </div>
                      
                      <div class="flex-1">
                        <h3 class="font-semibold text-gray-800">${item.product.name}</h3>
                        <p class="text-sm text-gray-600">${item.product.subcategory}</p>
                        <p class="text-lg font-bold text-blue-600 mt-1">Rp ${item.product.price.toLocaleString('id-ID')}</p>
                        ${item.product.digital ? '<span class="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Digital</span>' : ''}
                      </div>
                      
                      <div class="flex items-center space-x-3">
                        <button onclick="app.updateCartQuantity(${item.product.id}, ${item.quantity - 1})" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                          </svg>
                        </button>
                        <span class="w-8 text-center font-semibold">${item.quantity}</span>
                        <button onclick="app.updateCartQuantity(${item.product.id}, ${item.quantity + 1})" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <button onclick="app.removeFromCart(${item.product.id})" class="text-red-500 hover:text-red-700 p-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
              
              <!-- Order Summary -->
              <div class="lg:col-span-1">
                <div class="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                  <h3 class="text-xl font-bold text-gray-800 mb-6">Ringkasan Pesanan</h3>
                  
                  <div class="space-y-3 mb-6">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Subtotal (${cartItems.length} item)</span>
                      <span class="font-semibold">Rp ${subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Ongkos Kirim</span>
                      <span class="font-semibold ${shipping === 0 ? 'text-green-600' : ''}">
                        ${shipping === 0 ? 'GRATIS' : `Rp ${shipping.toLocaleString('id-ID')}`}
                      </span>
                    </div>
                    ${shipping === 0 ? '' : '<p class="text-xs text-gray-500">*Gratis ongkir untuk pembelian >Rp 50.000</p>'}
                    <div class="border-t pt-3">
                      <div class="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span class="text-blue-600">Rp ${total.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button onclick="app.checkout()" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
                    Checkout Sekarang
                  </button>
                  
                  <div class="text-center">
                    <p class="text-xs text-gray-500 mb-2">Metode Pembayaran:</p>
                    <div class="flex justify-center space-x-2">
                      <span class="text-xs bg-gray-100 px-2 py-1 rounded">QRIS</span>
                      <span class="text-xs bg-gray-100 px-2 py-1 rounded">Transfer</span>
                      <span class="text-xs bg-gray-100 px-2 py-1 rounded">COD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `}
        </div>
      </section>
    `;
  }

  renderNavigation() {
    return `
      <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center py-4">
            <div onclick="app.showPage('home')" class="flex items-center cursor-pointer">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-2 mr-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-800">GorutMart</h1>
                <p class="text-xs text-gray-500">IT Student Marketplace</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <button onclick="app.showPage('cart')" class="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 8L3 3H1m6 10v6a1 1 0 001 1h1m-1-5a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3z"></path>
                </svg>
                <span id="cart-count" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">${this.getTotalCartItems()}</span>
              </button>
              
              ${this.user ? `
                <div class="relative group">
                  <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <span class="text-sm font-semibold">${this.user.name.charAt(0)}</span>
                    </div>
                    <span class="hidden md:block text-sm text-gray-700">${this.user.name}</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    ${this.user.role === 'admin' ? `
                      <button onclick="app.showPage('admin-dashboard')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg">
                        🏠 Dashboard Admin
                      </button>
                    ` : ''}
                    <button onclick="app.showPage('user-profile')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      👤 Profil Saya
                    </button>
                    <button onclick="app.showPage('user-profile')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      📦 Pesanan Saya
                    </button>
                    <hr class="my-1">
                    <button onclick="app.logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              ` : `
                <button onclick="app.showPage('login')" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Masuk
                </button>
              `}
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  attachEventListeners() {
    // Make app methods globally accessible
    window.app = this;

    // Add form event listeners
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'loginForm') {
        e.preventDefault();
        this.handleLogin();
      } else if (e.target.id === 'registerForm') {
        e.preventDefault();
        this.handleRegister();
      }
    });
  }

  handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = this.database.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.saveCurrentUser(user);
      this.showNotification(`Selamat datang, ${user.name}!`, 'success');
      
      if (user.role === 'admin') {
        this.showPage('admin-dashboard');
      } else {
        this.showPage('home');
      }
    } else {
      this.showNotification('Email atau password tidak valid', 'error');
    }
  }

  handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const address = document.getElementById('registerAddress').value;

    // Check if email already exists
    if (this.database.users.find(u => u.email === email)) {
      this.showNotification('Email sudah terdaftar', 'error');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
      address,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    this.database.users.push(newUser);
    this.saveToDatabase('users', this.database.users);
    
    this.saveCurrentUser(newUser);
    this.showNotification(`Pendaftaran berhasil! Selamat datang, ${name}!`, 'success');
    this.showPage('home');
  }

  fillDemoCredentials(type) {
    if (type === 'admin') {
      document.getElementById('loginEmail').value = 'admin@gorutmart.com';
      document.getElementById('loginPassword').value = 'admin123';
    } else {
      document.getElementById('loginEmail').value = 'mahasiswa@ti.ac.id';
      document.getElementById('loginPassword').value = 'mahasiswa123';
    }
  }

  togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  showPage(page) {
    this.currentPage = page;
    this.render();
  }

  showCategory(categoryId) {
    this.selectedCategory = categoryId;
    this.currentPage = 'category';
    this.render();
  }

  showProduct(productId) {
    this.selectedProduct = productId;
    this.currentPage = 'product';
    this.render();
  }

  goBack() {
    if (this.currentPage === 'product') {
      if (this.selectedCategory) {
        this.currentPage = 'category';
      } else {
        this.currentPage = 'home';
      }
    } else {
      this.currentPage = 'home';
    }
    this.render();
  }

  addToCart(productId, quantity = 1) {
    const currentQuantity = this.cart.get(productId) || 0;
    this.cart.set(productId, currentQuantity + quantity);
    
    this.showNotification('Produk ditambahkan ke keranjang!', 'success');
    this.updateCartCount();
  }

  updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.cart.delete(productId);
    } else {
      this.cart.set(productId, newQuantity);
    }
    this.render();
  }

  removeFromCart(productId) {
    this.cart.delete(productId);
    this.showNotification('Produk dihapus dari keranjang', 'info');
    this.render();
  }

  getTotalCartItems() {
    return Array.from(this.cart.values()).reduce((sum, quantity) => sum + quantity, 0);
  }

  updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = this.getTotalCartItems();
    }
  }

  checkout() {
    if (!this.user) {
      this.showNotification('Silakan login terlebih dahulu', 'warning');
      this.showPage('login');
      return;
    }

    const cartItems = Array.from(this.cart.entries()).map(([productId, quantity]) => {
      const product = this.products.find(p => p.id === productId);
      return { 
        productId: product.id, 
        quantity, 
        price: product.price 
      };
    });

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 10000;
    const total = subtotal + shipping;

    // Create order
    const newOrder = {
      id: Date.now(),
      userId: this.user.id,
      items: cartItems,
      total,
      status: 'completed', // Simulate successful payment
      paymentMethod: 'qris',
      shippingAddress: this.user.address || 'Alamat belum diisi',
      createdAt: new Date().toISOString()
    };

    this.database.orders.push(newOrder);
    this.saveToDatabase('orders', this.database.orders);

    this.showNotification('Checkout berhasil! Terima kasih telah berbelanja di GorutMart', 'success');
    this.cart.clear();
    this.showPage('home');
  }

  showNotification(message, type = 'info') {
    const colors = {
      'success': 'bg-green-500',
      'error': 'bg-red-500',
      'warning': 'bg-yellow-500',
      'info': 'bg-blue-500'
    };

    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new GorutMartApp();
});
