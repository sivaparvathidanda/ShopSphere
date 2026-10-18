
import { useState } from 'react'
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  ArrowRight,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Minimal Everyday Backpack',
    category: 'Accessories',
    price: 1499,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700',
    badge: 'BESTSELLER',
  },
  {
    id: 2,
    name: 'Classic White Sneakers',
    category: 'Footwear',
    price: 2299,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700',
    badge: 'POPULAR',
  },
  {
    id: 3,
    name: 'Premium Everyday Watch',
    category: 'Accessories',
    price: 1899,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700',
    badge: 'NEW',
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 2799,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700',
    badge: 'TOP RATED',
  },
]

const money = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
  }

  function toggleWishlist(product) {
    setWishlist((current) =>
      current.includes(product.id)
        ? current.filter((id) => id !== product.id)
        : [...current, product.id],
    )
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="bg-slate-950 px-4 py-2 text-center text-xs tracking-wide text-white">
        FREE SHIPPING ON ORDERS ABOVE ₹1,999
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5">
          <a href="#" className="text-2xl font-black tracking-tight">
            Shop<span className="text-orange-500">Sphere.</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#home" className="hover:text-orange-500">Home</a>
            <a href="#products" className="hover:text-orange-500">Shop</a>
            <a href="#benefits" className="hover:text-orange-500">Why us</a>
          </nav>

          <div className="flex items-center gap-4">
            <label className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 lg:flex">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="w-36 bg-transparent text-sm outline-none"
              />
            </label>

            <button
              onClick={() =>
                alert(
                  wishlist.length
                    ? `You saved ${wishlist.length} product(s).`
                    : 'Your wishlist is empty.',
                )
              }
              aria-label="View wishlist"
              className="relative"
            >
              <Heart size={21} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-orange-500 px-1.5 text-xs text-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() =>
                alert(
                  cart.length
                    ? cart
                        .map(
                          (item) =>
                            `${item.name} x ${item.quantity}`,
                        )
                        .join('\n')
                    : 'Your cart is empty.',
                )
              }
              aria-label="View shopping cart"
              className="relative"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-orange-500 px-1.5 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden"
              onClick={() => alert('Mobile menu coming soon.')}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20"
        >
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Discover your everyday favorites
            </p>

            <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Shopping that
              <span className="text-orange-500"> feels right.</span>
            </h1>

            <p className="mt-6 max-w-lg leading-7 text-slate-500">
              Discover thoughtful essentials, modern accessories,
              and everyday products chosen to make life better.
            </p>

            <a
              href="#products"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Explore collection <ArrowRight size={18} />
            </a>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="text-2xl font-black">500+</p>
                <p className="mt-1 text-sm text-slate-500">
                  Curated products
                </p>
              </div>
              <div>
                <p className="text-2xl font-black">4.8/5</p>
                <p className="mt-1 text-sm text-slate-500">
                  Customer rating
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
              alt="Modern retail store"
              className="h-[380px] w-full rounded-3xl object-cover md:h-[520px]"
            />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                The new collection
              </p>
              <p className="mt-1 text-xl font-bold">
                Better everyday essentials
              </p>
            </div>
          </div>
        </section>

        <section id="products" className="bg-slate-50 px-5 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                  Our collection
                </p>
                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  Featured products
                </h2>
                <p className="mt-3 text-slate-500">
                  Everyday essentials worth discovering.
                </p>
              </div>

              <p className="text-sm text-slate-500">
                {filteredProducts.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold tracking-wider">
                      {product.badge}
                    </span>

                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label={`Toggle wishlist for ${product.name}`}
                      className="absolute right-3 top-3 rounded-full bg-white p-2.5"
                    >
                      <Heart
                        size={18}
                        fill={
                          wishlist.includes(product.id)
                            ? 'currentColor'
                            : 'none'
                        }
                        className={
                          wishlist.includes(product.id)
                            ? 'text-orange-500'
                            : ''
                        }
                      />
                    </button>
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-medium text-slate-500">
                      {product.category}
                    </p>

                    <h3 className="mt-2 min-h-12 font-bold">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-1 text-sm">
                      <Star
                        size={15}
                        fill="currentColor"
                        className="text-amber-400"
                      />
                      <span>{product.rating}</span>
                      <span className="text-slate-400">
                        / 5.0
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-2">
                      <p className="text-lg font-black">
                        {money(product.price)}
                      </p>

                      <button
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="py-16 text-center text-slate-500">
                No products found. Try another search.
              </p>
            )}
          </div>
        </section>

        <section id="benefits" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:grid-cols-3">
          <div className="flex items-start gap-4">
            <Truck className="shrink-0 text-orange-500" size={28} />
            <div>
              <h3 className="font-bold">Reliable delivery</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Convenient delivery options for your orders.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="shrink-0 text-orange-500" size={28} />
            <div>
              <h3 className="font-bold">Secure shopping</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                We'll build secure account and checkout flows.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <RotateCcw className="shrink-0 text-orange-500" size={28} />
            <div>
              <h3 className="font-bold">Customer-first service</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Clear order information and helpful support.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 px-5 py-8 text-center text-sm text-slate-400">
        <p className="text-lg font-black text-white">
          Shop<span className="text-orange-500">Sphere.</span>
        </p>
        <p className="mt-3">
          A full-stack e-commerce portfolio project.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} ShopSphere. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
