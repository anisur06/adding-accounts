import React, { useState } from 'react';
import {
  BadgeCheck,
  Building2,
  Camera,
  Check,
  CircleCheck,
  CircleX,
  Clock3,
  Edit3,
  Gift,
  History,
  House,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Plus,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  Truck,
  UserRound
} from 'lucide-react';

const accountLinks = [
  { id: 'profile', label: 'My Profile', icon: UserRound },
  { id: 'orders', label: 'Order History', icon: History },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const initialOrders = [
  { id: 'AM-9876', status: 'Delivered', date: 'Oct 12, 2024', total: 2450, icon: CircleCheck, color: 'text-emerald-600 bg-emerald-100' },
  { id: 'AM-9801', status: 'Shipped', date: 'Oct 15, 2024', total: 1890, icon: Truck, color: 'text-orange-600 bg-orange-100' },
  { id: 'AM-9755', status: 'Order Placed', date: 'Oct 18, 2024', total: 550, icon: Clock3, color: 'text-slate-500 bg-slate-200' },
  { id: 'AM-9600', status: 'Cancelled', date: 'Oct 1, 2024', total: 3000, icon: CircleX, color: 'text-rose-600 bg-rose-100' }
];

const initialAddresses = [
  { id: 1, label: 'Home Address', address: 'House 12, Road 4, Dhanmondi, Dhaka-1209, Bangladesh', phone: '+880 1234 567890', type: 'home', isDefault: true },
  { id: 2, label: 'Office Address', address: 'Building 5, Street 8, Gulshan 1, Dhaka-1212, Bangladesh', phone: '+880 1234 567890', type: 'office', isDefault: false },
  { id: 3, label: 'Delivery Address', address: 'Flat 3A, Tower 2, Chittagong-4000, Bangladesh', phone: '+880 1234 567890', type: 'delivery', isDefault: false }
];

const initialReviews = [
  { id: 1, product: 'Premium Aged Basmati Rice', rating: 5, date: 'Oct 26, 2024', text: 'The aroma is unmatched. A staple in my kitchen now!', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=120&q=80' },
  { id: 2, product: 'Organic Turmeric Powder', rating: 4, date: 'Oct 26, 2024', text: 'Great quality powder, highly effective in curries.', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f5?auto=format&fit=crop&w=120&q=80' },
  { id: 3, product: 'Handmade Moringa Soap', rating: 5, date: 'Oct 26, 2024', text: 'A bit drying, but smells amazing.', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=120&q=80' },
  { id: 4, product: 'Handmade Moringa Soap', rating: 4, date: 'Oct 25, 2024', text: 'Genuinely drying.', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=120&q=80' }
];

function AccountPanel({ children }) {
  return <div className="rounded-2xl border border-[#e7e1c9] bg-[#f5f2df] p-4 sm:p-5">{children}</div>;
}

function AccountAction({ children, onClick, type = 'button' }) {
  return (
    <button type={type} onClick={onClick} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#d6bf75] px-4 py-2 text-sm font-semibold text-[#403714] transition-colors hover:bg-[#cbb15e]">
      {children}
    </button>
  );
}

function OrderHistoryTab() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-bold text-[#28271d] sm:text-3xl">Your Order History</h2>
        <p className="text-sm text-slate-600">Showing {orders.length} of {orders.length} recent orders.</p>
      </div>
      <div className="space-y-3">
        {orders.map(order => {
          const StatusIcon = order.icon;
          return (
            <AccountPanel key={order.id}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${order.color}`}><StatusIcon className="h-6 w-6" /></span>
                <div className="min-w-[145px] flex-1">
                  <h3 className="font-semibold text-slate-900">Order #{order.id}</h3>
                  <p className="text-sm text-slate-700">Status: {order.status}</p>
                </div>
                <div className="flex min-w-[155px] flex-col text-sm text-slate-700 sm:ml-auto">
                  <span>Date: {order.date}</span>
                  <span>Total: ৳{order.total.toLocaleString('en-US')}.00</span>
                </div>
                <AccountAction onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}>
                  {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                </AccountAction>
              </div>
              {selectedOrder === order.id && (
                <div className="mt-4 border-t border-[#e0dac2] pt-3 text-sm text-slate-700">
                  <p>Order placed on {order.date}. Delivery and payment status: {order.status}.</p>
                  <p className="mt-1 font-semibold">Order total: ৳{order.total.toLocaleString('en-US')}</p>
                </div>
              )}
            </AccountPanel>
          );
        })}
        {!orders.length && <p className="rounded-xl border border-dashed border-[#d9d1b3] p-8 text-center text-slate-600">No orders to display yet.</p>}
      </div>
    </div>
  );
}

function AddressesTab() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [editingAddress, setEditingAddress] = useState(null);
  const [draft, setDraft] = useState({ label: '', address: '', phone: '' });

  const startAddressEdit = (address) => {
    setEditingAddress(address?.id ?? 'new');
    setDraft(address ? { label: address.label, address: address.address, phone: address.phone } : { label: '', address: '', phone: '+880 ' });
  };

  const saveAddress = (event) => {
    event.preventDefault();
    if (editingAddress === 'new') {
      setAddresses(current => [...current, { ...draft, id: Date.now(), type: 'delivery', isDefault: current.length === 0 }]);
    } else {
      setAddresses(current => current.map(address => address.id === editingAddress ? { ...address, ...draft } : address));
    }
    setEditingAddress(null);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-bold text-[#28271d] sm:text-3xl">My Addresses</h2>
        <AccountAction onClick={() => startAddressEdit(null)}><Plus className="h-4 w-4" /> Add New Address</AccountAction>
      </div>
      {editingAddress && (
        <form onSubmit={saveAddress} className="mb-4 rounded-2xl border border-[#e7e1c9] bg-[#f5f2df] p-4">
          <h3 className="mb-3 font-semibold text-slate-800">{editingAddress === 'new' ? 'Add New Address' : 'Edit Address'}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-600">Address label<input required value={draft.label} onChange={event => setDraft(current => ({ ...current, label: event.target.value }))} className="input-premium mt-1" /></label>
            <label className="text-sm font-medium text-slate-600">Phone<input required value={draft.phone} onChange={event => setDraft(current => ({ ...current, phone: event.target.value }))} className="input-premium mt-1" /></label>
            <label className="text-sm font-medium text-slate-600 sm:col-span-2">Full address<textarea required rows="2" value={draft.address} onChange={event => setDraft(current => ({ ...current, address: event.target.value }))} className="input-premium mt-1" /></label>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button type="button" onClick={() => setEditingAddress(null)} className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-white/70">Cancel</button>
            <AccountAction type="submit">Save Address</AccountAction>
          </div>
        </form>
      )}
      <div className="space-y-3">
        {addresses.map(address => {
          const AddressIcon = address.type === 'office' ? House : Building2;
          return (
            <AccountPanel key={address.id}>
              <div className="flex flex-wrap items-start gap-3">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9e2c7] text-[#746a43]"><AddressIcon className="h-5 w-5" /></span>
                <div className="min-w-[180px] flex-1">
                  <h3 className="font-semibold text-slate-900">{address.label} {address.isDefault && <span className="ml-1 rounded-full bg-[#e4d7a6] px-2 py-0.5 text-[10px] font-bold">Default</span>}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{address.address}</p>
                  <p className="text-sm text-slate-700">Phone: {address.phone}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <AccountAction onClick={() => startAddressEdit(address)}><Edit3 className="h-3.5 w-3.5" /> Edit</AccountAction>
                  <AccountAction onClick={() => setAddresses(current => current.filter(item => item.id !== address.id))}><Trash2 className="h-3.5 w-3.5" /> Delete</AccountAction>
                </div>
              </div>
              {!address.isDefault && <div className="mt-3 flex justify-end"><button type="button" onClick={() => setAddresses(current => current.map(item => ({ ...item, isDefault: item.id === address.id })))} className="rounded-full border border-[#d9cea7] px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white/70">Set as Default</button></div>}
            </AccountPanel>
          );
        })}
      </div>
    </div>
  );
}

function ReviewsTab() {
  const [reviews, setReviews] = useState(initialReviews);
  const [isWriting, setIsWriting] = useState(false);
  const [draft, setDraft] = useState({ product: '', rating: '5', text: '' });
  const [editingReview, setEditingReview] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');

  const saveReview = (event) => {
    event.preventDefault();
    const review = { ...draft, id: editingReview?.id ?? Date.now(), rating: Number(draft.rating), date: editingReview?.date ?? 'Today', image: editingReview?.image ?? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80' };
    setReviews(current => editingReview
      ? current.map(item => item.id === editingReview.id ? review : item)
      : [review, ...current]);
    setDraft({ product: '', rating: '5', text: '' });
    setEditingReview(null);
    setIsWriting(false);
  };
  const editReview = (review) => {
    setDraft({ product: review.product, rating: String(review.rating), text: review.text });
    setEditingReview(review);
    setIsWriting(true);
  };
  const sortedReviews = [...reviews].sort((a, b) => sortOrder === 'newest' ? b.id - a.id : a.id - b.id);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-bold text-[#28271d] sm:text-3xl">My Reviews</h2>
        <AccountAction onClick={() => setIsWriting(current => !current)}><Plus className="h-4 w-4" /> Write a New Review</AccountAction>
      </div>
      <div className="mb-3 flex justify-end">
        <label className="text-sm text-slate-600">Sort by: <select value={sortOrder} onChange={event => setSortOrder(event.target.value)} className="rounded-lg border border-[#d9d1b3] bg-white px-2 py-1 text-sm"><option value="newest">Newest</option><option value="oldest">Oldest</option></select></label>
      </div>
      {isWriting && (
        <form onSubmit={saveReview} className="mb-4 rounded-2xl border border-[#e7e1c9] bg-[#f5f2df] p-4">
          <h3 className="mb-3 font-semibold text-slate-800">{editingReview ? 'Edit Review' : 'Write a New Review'}</h3>
          <div className="grid gap-3 sm:grid-cols-[1fr_130px]">
            <label className="text-sm font-medium text-slate-600">Product<input required value={draft.product} onChange={event => setDraft(current => ({ ...current, product: event.target.value }))} className="input-premium mt-1" /></label>
            <label className="text-sm font-medium text-slate-600">Rating<select value={draft.rating} onChange={event => setDraft(current => ({ ...current, rating: event.target.value }))} className="input-premium mt-1"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label>
            <label className="text-sm font-medium text-slate-600 sm:col-span-2">Your review<textarea required rows="2" value={draft.text} onChange={event => setDraft(current => ({ ...current, text: event.target.value }))} className="input-premium mt-1" /></label>
          </div>
          <div className="mt-3 flex justify-end gap-2"><button type="button" onClick={() => { setIsWriting(false); setEditingReview(null); }} className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-white/70">Cancel</button><AccountAction type="submit">{editingReview ? 'Save Review' : 'Submit Review'}</AccountAction></div>
        </form>
      )}
      <div className="space-y-3">
        {sortedReviews.map(review => (
          <AccountPanel key={review.id}>
            <div className="flex items-start gap-3">
              <img src={review.image} alt="" className="h-14 w-14 rounded-xl border border-[#d9d1b3] object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900">{review.product}</h3>
                <p className="text-sm text-[#997d1d]">{'★'.repeat(review.rating)}<span className="ml-2 text-slate-700">{review.rating}/5</span> <span className="ml-2 text-slate-600">Reviewed: {review.date}</span></p>
                <p className="mt-1 text-sm text-slate-700">{review.text}</p>
              </div>
              <button type="button" aria-label={`Edit review for ${review.product}`} onClick={() => editReview(review)} className="rounded-lg p-2 text-slate-500 hover:bg-white/70 hover:text-brand-800"><Edit3 className="h-4 w-4" /></button>
              <button type="button" aria-label={`Delete review for ${review.product}`} onClick={() => setReviews(current => current.filter(item => item.id !== review.id))} className="rounded-lg p-2 text-slate-500 hover:bg-white/70 hover:text-rose-700"><Trash2 className="h-4 w-4" /></button>
            </div>
          </AccountPanel>
        ))}
      </div>
    </div>
  );
}

function RewardsTab() {
  const [coupons, setCoupons] = useState([
    { id: 1, title: '15% OFF ALL BED SHEETS', requirement: 'Requires 250 points to claim', expires: '27-06-2026', claimed: false },
    { id: 2, title: 'FREE EXPRESS DELIVERY', requirement: 'Requires 300 points to claim', expires: '13-09-2026', claimed: false }
  ]);
  const history = [
    ['20-12-2024', 'Purchase from across all bed sheets', '+300', '300'],
    ['28-12-2024', 'Points earned on purchase', '+150', '500'],
    ['28-12-2024', 'Purchase for express delivery', '-300', '300'],
    ['28-12-2024', 'Points redeemed expired', '-100', '300'],
    ['28-12-2024', 'Points redeemed expired', '-100', '300']
  ];

  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl font-bold text-[#28271d] sm:text-3xl">My Rewards</h2>
      <div className="grid gap-3 lg:grid-cols-2">
        <AccountPanel>
          <h3 className="text-lg font-semibold text-slate-900">Rewards Summary</h3>
          <p className="mt-3 text-sm text-slate-700">Status Tier: <strong>Bronze Member</strong></p>
          <p className="mt-1 text-sm text-slate-700">Total Points: <strong>300</strong></p>
          <div className="mt-4 border-t border-[#e0dac2] pt-3">
            <div className="flex justify-between text-sm"><strong>Next Tier: Silver</strong><span>200 points to go</span></div>
            <div className="mt-2 h-2.5 rounded-full bg-white"><div className="h-full w-3/4 rounded-full bg-brand-800" /></div>
            <p className="mt-1 text-xs text-slate-500">Requires 200 more points</p>
          </div>
        </AccountPanel>
        <AccountPanel>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Available Coupons</h3>
          <div className="space-y-2">
            {coupons.map(coupon => <div key={coupon.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#e0dac2] bg-white/60 p-3">
              <div><h4 className="text-sm font-bold text-slate-800">{coupon.title}</h4><p className="text-xs text-slate-600">{coupon.requirement}</p><p className="text-xs text-slate-500">Expires on {coupon.expires}</p></div>
              <AccountAction onClick={() => setCoupons(current => current.map(item => item.id === coupon.id ? { ...item, claimed: true } : item))}>{coupon.claimed ? <><Check className="h-3.5 w-3.5" /> Claimed</> : 'Claim'}</AccountAction>
            </div>)}
          </div>
        </AccountPanel>
      </div>
      <AccountPanel>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Detailed Points History</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead><tr className="border-b border-[#d9d1b3] text-slate-600"><th className="pb-2 pr-3 font-medium">Date</th><th className="pb-2 pr-3 font-medium">Description</th><th className="pb-2 pr-3 text-right font-medium">Points</th><th className="pb-2 text-right font-medium">Balance</th></tr></thead>
            <tbody>{history.map((row, index) => <tr key={`${row[0]}-${index}`} className="border-b border-[#e0dac2] last:border-0"><td className="py-2 pr-3">{row[0]}</td><td className="py-2 pr-3">{row[1]}</td><td className="py-2 pr-3 text-right">{row[2]}</td><td className="py-2 text-right">{row[3]}</td></tr>)}</tbody>
          </table>
        </div>
      </AccountPanel>
    </div>
  );
}

function SettingsTab({ customer, setCustomer }) {
  const [birthday, setBirthday] = useState('15-05-1995');
  const [preferences, setPreferences] = useState({ orderEmails: true, shippingSms: false, offerEmails: true, marketingCalls: false, newsletter: true });
  const [saved, setSaved] = useState(false);
  const preferenceLabels = [
    ['orderEmails', 'Order Status Emails'],
    ['shippingSms', 'Shipping Alert SMS'],
    ['offerEmails', 'Product Offer Emails'],
    ['marketingCalls', 'Marketing Calls'],
    ['newsletter', 'Newsletter Subscription']
  ];

  const saveProfile = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl font-bold text-[#28271d] sm:text-3xl">My Account Settings</h2>
      <div className="grid gap-3 lg:grid-cols-2">
        <form onSubmit={saveProfile} className="rounded-2xl border border-[#e7e1c9] bg-[#f5f2df] p-4 sm:p-5">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Personal Information</h3>
          <label className="mb-3 block text-sm text-slate-700">Full Name<input value={customer.name} onChange={event => setCustomer(current => ({ ...current, name: event.target.value }))} className="input-premium mt-1" /></label>
          <label className="mb-3 block text-sm text-slate-700">Phone Number<input value={customer.phone} onChange={event => setCustomer(current => ({ ...current, phone: event.target.value }))} className="input-premium mt-1" /></label>
          <label className="block text-sm text-slate-700">Birth Date<input value={birthday} onChange={event => setBirthday(event.target.value)} className="input-premium mt-1" /></label>
          <div className="mt-4 flex justify-end"><AccountAction type="submit">{saved ? <><Check className="h-4 w-4" /> Saved</> : 'Save Profile'}</AccountAction></div>
        </form>
        <form onSubmit={event => { event.preventDefault(); setSaved(true); }} className="rounded-2xl border border-[#e7e1c9] bg-[#f5f2df] p-4 sm:p-5">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Password &amp; Security</h3>
          <label className="mb-3 block text-sm text-slate-700">Current Password<input type="password" required className="input-premium mt-1" /></label>
          <label className="mb-3 block text-sm text-slate-700">New Password<input type="password" required minLength="8" className="input-premium mt-1" /></label>
          <label className="block text-sm text-slate-700">Confirm New Password<input type="password" required minLength="8" className="input-premium mt-1" /></label>
          <div className="mt-4 flex justify-end"><AccountAction type="submit"><ShieldCheck className="h-4 w-4" /> Update Password</AccountAction></div>
        </form>
      </div>
      <AccountPanel>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Notifications &amp; Preferences</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {preferenceLabels.map(([key, label]) => <label key={key} className="flex items-center gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={preferences[key]} onChange={event => setPreferences(current => ({ ...current, [key]: event.target.checked }))} className="h-4 w-4 accent-brand-800" />
            {label}
          </label>)}
        </div>
        <div className="mt-4 flex justify-end"><AccountAction onClick={() => setSaved(true)}>{saved ? <><Check className="h-4 w-4" /> Saved</> : 'Save Preferences'}</AccountAction></div>
      </AccountPanel>
    </div>
  );
}

export function AccountPage({ onBackToStore }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState({
    name: 'Jannat Akter',
    email: 'jannatakter@gmail.com',
    phone: '+880 1234 567890'
  });
  const [draft, setDraft] = useState(customer);
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80');

  const beginEditing = () => {
    setDraft(customer);
    setIsEditing(true);
  };

  const saveDetails = (event) => {
    event.preventDefault();
    setCustomer(draft);
    setIsEditing(false);
  };

  const updatePhoto = (event) => {
    const file = event.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <>
    <main className="min-h-[calc(100vh-190px)] bg-[#f5f4e5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-[#28271d] sm:text-4xl">My Account</h1>
          <button
            type="button"
            onClick={onBackToStore}
            className="rounded-xl px-3 py-2 text-sm font-semibold text-brand-800 transition-colors hover:bg-white/70"
          >
            Back to store
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="rounded-2xl bg-[#0f452f] p-3 text-white shadow-lg">
            <nav aria-label="Account menu" className="flex flex-wrap gap-2 md:flex-col">
              {accountLinks.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  aria-current={activeSection === id ? 'page' : undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors md:w-full ${
                    activeSection === id
                      ? 'bg-[#b89a27] text-white shadow-sm'
                      : 'text-white/85 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span>{label}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={onBackToStore}
                className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/85 transition-colors hover:bg-white/10 md:w-full"
              >
                <LogOut className="h-[18px] w-[18px]" />
                <span>Log Out</span>
              </button>
            </nav>
          </aside>

          <section className="min-w-0 rounded-2xl border border-white/80 bg-[#fffef7] p-4 shadow-card sm:p-6 lg:p-7">
            {activeSection === 'profile' ? (
              <>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative">
                    <img src={photo} alt={`${customer.name} profile`} className="h-20 w-20 rounded-full border-2 border-[#e2d8ae] object-cover" />
                    <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity hover:opacity-100 focus-within:opacity-100" aria-label="Change profile photo">
                      <Camera className="h-5 w-5" />
                      <input type="file" accept="image/*" onChange={updatePhoto} className="sr-only" />
                    </label>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#28271d]">{customer.name}</h3>
                    <label className="mt-1 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d9cea7] px-3 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-[#f4efd9]">
                      <Camera className="h-3.5 w-3.5" />
                      Edit Photo
                      <input type="file" accept="image/*" onChange={updatePhoto} className="sr-only" />
                    </label>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-[#e7e1c9] bg-[#f5f2df] p-4 sm:p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-serif text-xl font-bold text-[#39372a]">My Details</h3>
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={beginEditing}
                        className="rounded-full bg-[#d6bf75] px-4 py-2 text-sm font-semibold text-[#403714] transition-colors hover:bg-[#cbb15e]"
                      >
                        Edit Details
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={saveDetails} className="space-y-3">
                      {[
                        { field: 'name', label: 'Name', type: 'text' },
                        { field: 'email', label: 'Email', type: 'email' },
                        { field: 'phone', label: 'Phone', type: 'tel' }
                      ].map(({ field, label, type }) => (
                        <label key={field} className="grid gap-1 text-sm font-medium text-slate-600 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
                          <span>{label}</span>
                          <input
                            required
                            type={type}
                            value={draft[field]}
                            onChange={(event) => setDraft(current => ({ ...current, [field]: event.target.value }))}
                            className="rounded-lg border border-[#d9d1b3] bg-white px-3 py-2 text-sm text-slate-800 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/15"
                          />
                        </label>
                      ))}
                      <div className="flex justify-end gap-2 pt-1">
                        <button type="button" onClick={() => setIsEditing(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-white/70">
                          Cancel
                        </button>
                        <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">
                          <Check className="h-4 w-4" />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="divide-y divide-[#e0dac2]">
                      <div className="grid grid-cols-[30px_56px_minmax(0,1fr)] items-center gap-2 py-3 text-sm sm:grid-cols-[34px_72px_minmax(0,1fr)] sm:gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9e2c7] text-[#746a43]"><UserRound className="h-4 w-4" /></span>
                        <span className="text-slate-600">Name</span>
                        <span className="font-medium text-slate-800">{customer.name}</span>
                      </div>
                      <div className="grid grid-cols-[30px_56px_minmax(0,1fr)] items-center gap-2 py-3 text-sm sm:grid-cols-[34px_72px_minmax(0,1fr)] sm:gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9e2c7] text-[#746a43]"><Mail className="h-4 w-4" /></span>
                        <span className="text-slate-600">Email</span>
                        <span className="flex flex-wrap items-center gap-2 font-medium text-slate-800">
                          {customer.email}
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#0f452f] px-2 py-0.5 text-[10px] font-semibold text-white">
                            <BadgeCheck className="h-3 w-3" /> Verified
                          </span>
                        </span>
                      </div>
                      <div className="grid grid-cols-[30px_56px_minmax(0,1fr)] items-center gap-2 py-3 text-sm sm:grid-cols-[34px_72px_minmax(0,1fr)] sm:gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9e2c7] text-[#746a43]"><Phone className="h-4 w-4" /></span>
                        <span className="text-slate-600">Phone</span>
                        <span className="font-medium text-slate-800">{customer.phone}</span>
                      </div>
                    </div>
                  )}
                </div>

              </>
            ) : activeSection === 'orders' ? (
              <OrderHistoryTab />
            ) : activeSection === 'addresses' ? (
              <AddressesTab />
            ) : activeSection === 'reviews' ? (
              <ReviewsTab />
            ) : activeSection === 'rewards' ? (
              <RewardsTab />
            ) : (
              <SettingsTab customer={customer} setCustomer={setCustomer} />
            )}
          </section>
        </div>
      </div>
    </main>
      <footer className="bg-[#0f452f] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <p className="font-serif text-2xl font-bold">ANONNA MART</p>
            <p className="mt-2 text-sm text-white/75">Your choice, our care.</p>
          </div>
          <div>
            <h2 className="text-sm font-bold">Quick Links</h2>
            <button type="button" onClick={onBackToStore} className="mt-2 block text-left text-sm text-white/75 hover:text-white">About Us</button>
            <button type="button" onClick={onBackToStore} className="mt-1 block text-left text-sm text-white/75 hover:text-white">Shop Collections</button>
          </div>
          <div>
            <h2 className="text-sm font-bold">Customer Service</h2>
            <p className="mt-2 text-sm text-white/75">Shipping Policy</p>
            <p className="mt-1 text-sm text-white/75">Returns &amp; Support</p>
          </div>
          <div>
            <h2 className="text-sm font-bold">Stay Connected</h2>
            <p className="mt-2 text-sm text-white/75">Get updates on new collections and special offers.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
