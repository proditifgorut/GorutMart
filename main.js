import './style.css';

class GorutMartApp {
  constructor() {
    this.currentPage = 'home';
    this.cart = new Map();
    this.products = this.generateProducts();
    this.categories = this.getCategories();
    this.user = null;
    
    this.init();
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
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/22c55e/ffffff?text=Food+%26+Drinks',
        subcategories: ['Snack & Cemilan', 'Minuman', 'Makanan Instan', 'Frozen Food']
      },
      {
        id: 'health-beauty',
        name: 'Kesehatan & Kecantikan',
        icon: '💊',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/f59e0b/ffffff?text=Health+%26+Beauty',
        subcategories: ['Obat & Suplemen', 'Vitamin', 'Skincare & Kosmetik', 'Peralatan Mandi']
      },
      {
        id: 'household',
        name: 'Peralatan Rumah Tangga',
        icon: '🏠',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/8b5cf6/ffffff?text=Household',
        subcategories: ['Alat Kebersihan', 'Peralatan Dapur', 'Plastik & Kemasan']
      },
      {
        id: 'baby-kids',
        name: 'Produk Anak & Bayi',
        icon: '👶',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/ec4899/ffffff?text=Baby+%26+Kids',
        subcategories: ['Susu Bayi', 'Popok', 'Makanan Bayi', 'Mainan Edukatif']
      },
      {
        id: 'electronics',
        name: 'Elektronik & Aksesoris',
        icon: '📱',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/06b6d4/ffffff?text=Electronics',
        subcategories: ['Charger & Kabel', 'Headset', 'Lampu LED', 'Alat Elektronik']
      },
      {
        id: 'fashion',
        name: 'Fashion & Aksesoris',
        icon: '👕',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/ef4444/ffffff?text=Fashion',
        subcategories: ['Pakaian Pria/Wanita', 'Tas & Sepatu', 'Aksesoris Mahasiswa']
      },
      {
        id: 'local-products',
        name: 'Produk Lokal Mahasiswa',
        icon: '🎨',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/10b981/ffffff?text=Local+Products',
        subcategories: ['Kerajinan Tangan', 'Makanan Lokal', 'Merchandise Prodi TI']
      },
      {
        id: 'digital-products',
        name: 'Produk Digital',
        icon: '💻',
        image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/6366f1/ffffff?text=Digital+Products',
        subcategories: ['E-Book & Modul', 'Aplikasi & Template', 'Jasa Digital']
      }
    ];
  }

  generateProducts() {
    const products = [
      // Food & Drinks
      { id: 1, name: 'Indomie Goreng', category: 'food-drinks', subcategory: 'Makanan Instan', price: 3500, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/22c55e/ffffff?text=Indomie', stock: 50, description: 'Mie instan rasa ayam bawang, favorit mahasiswa' },
      { id: 2, name: 'Teh Botol Sosro', category: 'food-drinks', subcategory: 'Minuman', price: 4000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/22c55e/ffffff?text=Teh+Botol', stock: 30, description: 'Minuman teh kemasan botol segar' },
      { id: 3, name: 'Chitato Rasa BBQ', category: 'food-drinks', subcategory: 'Snack & Cemilan', price: 8500, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/22c55e/ffffff?text=Chitato', stock: 25, description: 'Keripik kentang rasa BBQ gurih' },
      
      // Health & Beauty
      { id: 4, name: 'Vitamin C 1000mg', category: 'health-beauty', subcategory: 'Vitamin', price: 15000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/f59e0b/ffffff?text=Vitamin+C', stock: 20, description: 'Suplemen vitamin C untuk daya tahan tubuh' },
      { id: 5, name: 'Sabun Mandi Lifebuoy', category: 'health-beauty', subcategory: 'Peralatan Mandi', price: 3500, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/f59e0b/ffffff?text=Lifebuoy', stock: 40, description: 'Sabun antibakteri untuk mandi' },
      
      // Electronics
      { id: 6, name: 'Kabel USB Type-C', category: 'electronics', subcategory: 'Charger & Kabel', price: 25000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/06b6d4/ffffff?text=USB+Cable', stock: 15, description: 'Kabel charging USB Type-C 1 meter' },
      { id: 7, name: 'Earphone Bluetooth', category: 'electronics', subcategory: 'Headset', price: 75000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/06b6d4/ffffff?text=Earphone', stock: 10, description: 'Earphone nirkabel dengan kualitas suara jernih' },
      
      // Digital Products
      { id: 8, name: 'E-Book: Python for Beginners', category: 'digital-products', subcategory: 'E-Book & Modul', price: 50000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/6366f1/ffffff?text=Python+Book', stock: 999, description: 'Panduan lengkap belajar Python dari dasar', digital: true },
      { id: 9, name: 'Template Website E-Commerce', category: 'digital-products', subcategory: 'Aplikasi & Template', price: 150000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/6366f1/ffffff?text=Web+Template', stock: 999, description: 'Template website e-commerce siap pakai dengan HTML, CSS, JS', digital: true },
      { id: 10, name: 'Jasa Desain Logo', category: 'digital-products', subcategory: 'Jasa Digital', price: 100000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/6366f1/ffffff?text=Logo+Design', stock: 999, description: 'Jasa pembuatan logo profesional untuk bisnis', digital: true },
      
      // Local Products
      { id: 11, name: 'Kaos Prodi TI', category: 'local-products', subcategory: 'Merchandise Prodi TI', price: 65000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/10b981/ffffff?text=TI+Shirt', stock: 20, description: 'Kaos resmi Prodi Teknik Informatika' },
      { id: 12, name: 'Kopi Robusta Lokal', category: 'local-products', subcategory: 'Makanan Lokal', price: 35000, image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x300/10b981/ffffff?text=Local+Coffee', stock: 15, description: 'Kopi robusta asli hasil produksi mahasiswa' }
    ];

    return products;
  }

  render() {
    const app = document.getElementById('app');
    
    if (this.currentPage === 'home') {
      app.innerHTML = this.renderHomePage();
    } else if (this.currentPage === 'category') {
      app.innerHTML = this.renderCategoryPage();
    } else if (this.currentPage === 'product') {
      app.innerHTML = this.renderProductPage();
    } else if (this.currentPage === 'cart') {
      app.innerHTML = this.renderCartPage();
    }
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
              
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <span class="text-sm text-gray-700">Mahasiswa TI</span>
              </div>
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
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  attachEventListeners() {
    // Make app methods globally accessible
    window.app = this;
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
    this.showNotification('Redirecting to checkout...', 'success');
    // Simulate checkout process
    setTimeout(() => {
      this.showNotification('Checkout berhasil! Terima kasih telah berbelanja di GorutMart', 'success');
      this.cart.clear();
      this.showPage('home');
    }, 2000);
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
