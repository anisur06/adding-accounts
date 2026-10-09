import React, { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Truck,
  User,
  Users
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatters';
import { AccountPage } from './AccountPage';

const categories = [
  { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', description: 'Warm, elevated essentials for every room.' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', description: 'Elegant pieces crafted for daily confidence.' },
  { name: 'Organic Living', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80', description: 'Natural products that support a healthier lifestyle.' },
  { name: 'Sleep & Comfort', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', description: 'Rest easy with premium textiles and comfort upgrades.' }
];

const perks = [
  { icon: Truck, title: 'Fast nationwide delivery', text: 'Prompt shipping across Bangladesh with careful handling.' },
  { icon: ShieldCheck, title: 'Secure shopping', text: 'Reliable payments and verified orders for every purchase.' },
  { icon: Users, title: 'Trusted by families', text: 'Loved by customers who expect quality from every order.' },
  { icon: Sparkles, title: 'Curated style', text: 'Thoughtfully selected products that look premium and feel personal.' }
];

export function LandingPage({ onOpenDashboard }) {
  const { products } = useStore();
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCollection, setActiveCollection] = useState('featured');
  const featuredProducts = products
    .filter(product => {
      if (activeCollection === 'offers') return product.discountActive;
      if (activeCollection === 'featured') return product.featured;
      if (activeCollection === 'Food Products') return product.category === 'Organic Food';
      if (activeCollection === 'Women’s Fashion') return product.category === "Women's Fashion";
      if (activeCollection === 'All Categories') return true;
      return product.category === activeCollection;
    })
    .slice(0, 4);

  const scrollToCollection = () => {
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStoreNavigation = (label) => {
    setCurrentPage('home');
    if (label === 'Home') {
      setActiveCollection('featured');
      setTimeout(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      return;
    }

    if (label === 'All Categories') {
      setActiveCollection(label);
      setTimeout(() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      return;
    }

    setActiveCollection(label);
    setTimeout(() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F4] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="bg-[#0f452f] text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-[11px] font-medium sm:justify-between sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Free delivery on orders over ৳1,000</span>
            <span className="hidden items-center gap-1.5 sm:inline-flex"><ShieldCheck className="h-3.5 w-3.5" /> Authentic products</span>
            <span className="hidden items-center gap-1.5 md:inline-flex"><BadgeCheck className="h-3.5 w-3.5" /> Cash on delivery</span>
            <span className="hidden items-center gap-1.5 lg:inline-flex"><Phone className="h-3.5 w-3.5" /> Easy returns</span>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-900 text-white shadow-forest-glow">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">Anonna Mart</p>
                <p className="text-sm text-slate-500">Curated living</p>
              </div>
            </div>

            <div className="hidden flex-1 max-w-xl items-center justify-center md:flex">
              <div className="flex w-full items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm transition-colors hover:border-brand-200 hover:bg-white">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search for products, categories, and more"
                  className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1 shadow-sm sm:gap-2 sm:p-1.5">
                <button
                  type="button"
                  aria-label="Account"
                  aria-pressed={currentPage === 'account'}
                  onClick={() => setCurrentPage('account')}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                    currentPage === 'account' ? 'bg-[#f5f2df] text-brand-900' : 'text-slate-600 hover:bg-brand-50 hover:text-brand-900'
                  }`}
                >
                  <User className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Wishlist" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-900">
                  <Heart className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Cart" className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-900">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-900 px-1 text-[10px] font-bold text-white">2</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onOpenDashboard}
                className={`${currentPage === 'account' ? 'hidden' : 'hidden sm:inline-flex'} rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-900`}
              >
                Admin Dashboard
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 md:hidden">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <nav aria-label="Store categories" className="mt-4 -mx-1 flex gap-1 overflow-x-auto border-t border-slate-100 px-1 pt-2 text-xs font-semibold text-slate-600 sm:gap-3 sm:text-sm">
            {['Home', 'All Categories', 'Bed Sheets', 'Women’s Fashion', 'Food Products', 'Home Decor', 'Offers'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleStoreNavigation(label)}
                className="shrink-0 whitespace-nowrap rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-900"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {currentPage === 'account' ? (
        <AccountPage onBackToStore={() => setCurrentPage('home')} />
      ) : (
      <>
      <main id="home">
        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-800">
              <Sparkles className="h-3.5 w-3.5" />
              Premium finds for everyday life
            </div>

            <h1 className="max-w-xl text-4xl font-black leading-tight text-brand-950 sm:text-5xl lg:text-6xl">
              Beauty, comfort, and essentials in one trusted store.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Discover thoughtfully curated home goods, handcrafted fashion, and organic essentials that bring warmth, elegance, and everyday ease to modern living.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToCollection}
                className="btn-primary gap-2"
              >
                Shop Best Sellers
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onOpenDashboard}
                className="btn-secondary"
              >
                Open Admin View
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-slate-600">
              <div>
                <p className="text-2xl font-black text-brand-900">40K+</p>
                <p>Happy shoppers</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-900">4.9/5</p>
                <p>Average rating</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-900">2-day</p>
                <p>Express delivery</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-20 w-20 rounded-full bg-gold-300/50 blur-3xl sm:block" />
            <div className="absolute -right-3 bottom-10 hidden h-28 w-28 rounded-full bg-brand-200/60 blur-3xl sm:block" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-card-hover">
              <div className="overflow-hidden rounded-[1.5rem]">
                <img
                  src={featuredProducts[0]?.image || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80'}
                  alt={featuredProducts[0]?.name || 'Anonna Mart product'}
                  className="h-[530px] w-full object-cover"
                />
              </div>

              <div className="absolute left-8 top-8 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-900 shadow-lg backdrop-blur">
                Limited Offer
              </div>

              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/40 bg-[#0f3821]/85 p-5 text-white shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-brand-100">Best Seller</p>
                    <h2 className="mt-2 text-2xl font-bold">{featuredProducts[0]?.name || 'Luxury Cotton Bedding'}</h2>
                  </div>
                  <div className="rounded-xl bg-gold-400 px-2.5 py-1.5 text-sm font-bold text-brand-950">
                    15% OFF
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-brand-100">Starting at</p>
                    <p className="text-3xl font-black">{formatCurrency(featuredProducts[0]?.price || 3850)}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-sm font-medium text-gold-300">
                    <Star className="h-4 w-4 fill-current" />
                    {featuredProducts[0]?.rating || 4.9}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="collections" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">Collections</p>
              <h2 className="mt-2 text-2xl font-black text-brand-950 sm:text-3xl">Shop by lifestyle</h2>
            </div>
            <button
              type="button"
              onClick={scrollToCollection}
              className="hidden items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-900 sm:inline-flex"
            >
              Browse more
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <article key={category.name} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="overflow-hidden">
                  <img src={category.image} alt={category.name} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-700">Featured</p>
                  <h3 className="mt-2 text-xl font-bold text-brand-950">{category.name}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{category.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-700">
                {activeCollection === 'offers' ? 'Offers' : activeCollection === 'featured' ? 'Best Sellers' : activeCollection}
              </p>
              <h2 className="mt-2 text-2xl font-black text-brand-950 sm:text-3xl">
                {activeCollection === 'offers' ? 'Special offers' : activeCollection === 'featured' ? 'Most loved by our community' : `Shop ${activeCollection}`}
              </h2>
            </div>
            <button
              type="button"
              onClick={scrollToCollection}
              className="hidden items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-900 sm:inline-flex"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105" />
                  {product.discountActive && (
                    <span className="absolute left-4 top-4 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-950">
                      {product.discountPercent || 15}% off
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-800">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold leading-6 text-slate-900">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xl font-black text-brand-950">{formatCurrency(product.price)}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#0d2619] py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300">
                  <perk.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold">{perk.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{perk.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[1fr_0.95fr] lg:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-700">Why Anonna Mart</p>
              <h2 className="mt-3 text-3xl font-black text-brand-950">A home for beautiful moments and everyday essentials.</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                We combine premium curation, trusted craftsmanship, and a seamless shopping experience so customers across Bangladesh can discover quality without friction.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-800">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-950">Carefully sourced products</h3>
                    <p className="text-sm leading-6 text-slate-600">Every item is selected for quality, originality, and lasting value.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-950">Designed for modern living</h3>
                    <p className="text-sm leading-6 text-slate-600">From festive elegance to practical daily comfort, every collection feels elevated.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 p-6 text-white shadow-forest-glow">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-100">This experience works for everyone</p>
                <h3 className="mt-3 text-3xl font-black">Great for customers and admins alike.</h3>
                <p className="mt-3 leading-7 text-slate-200">
                  Customers can browse, discover, and shop the public storefront, while the admin team can switch into management tools, inventory, and growth insights without leaving the platform.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={scrollToCollection} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-950 transition-colors hover:bg-slate-100">
                    Explore Store
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={onOpenDashboard} className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-transparent px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/5">
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div>
            <p className="text-lg font-black text-brand-950">Anonna Mart</p>
            <p className="mt-1 text-sm text-slate-500">Curated living • Thoughtful shopping • Everyday quality</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <a href="#home" className="transition-colors hover:text-brand-900">Home</a>
            <a href="#featured" className="transition-colors hover:text-brand-900">Featured</a>
            <a href="#about" className="transition-colors hover:text-brand-900">About</a>
            <button type="button" onClick={onOpenDashboard} className="font-semibold text-brand-800 transition-colors hover:text-brand-900">
              Admin Portal
            </button>
          </div>
        </div>
      </footer>
      </>
      )}
    </div>
  );
}
