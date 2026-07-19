// =========================================================================
// AKAR AIR — main.js
// Ganti WA_NUMBER dengan nomor WhatsApp bisnis Anda (format: 62xxxxxxxxxxx)
// =========================================================================
const WA_NUMBER = "6281234567890";

// ---------- Data tanaman ----------
// Silakan ubah / tambah data di bawah ini sesuai stok Anda.
const PLANTS = [
  {
    id: "kangkung",
    name: "Kangkung Air",
    latin: "Ipomoea aquatica",
    category: "daun",
    categoryLabel: "Sayuran Daun",
    bio: "Sayuran cepat panen, favorit sistem rakit apung. Batangnya berongga sehingga mengapung alami di air.",
    ph: "5.5 – 7.0",
    suhu: "22 – 30°C",
    panen: "18 – 21 hari",
    cahaya: "Penuh",
    price: 4000,
    unit: "bibit",
    icon: "leaf",
    image: "img/products/kangkung.jpg",
  },
  {
    id: "selada-air",
    name: "Selada Air",
    latin: "Nasturtium officinale",
    category: "daun",
    categoryLabel: "Sayuran Daun",
    bio: "Tumbuh subur di air mengalir dengan rasa sedikit pedas segar, cocok untuk salad dan lalapan.",
    ph: "6.0 – 7.5",
    suhu: "15 – 24°C",
    panen: "25 – 30 hari",
    cahaya: "Sedang",
    price: 5500,
    unit: "bibit",
    icon: "leaf",
    image: "img/products/selada-air.jpg",
  },
  {
    id: "pakcoy",
    name: "Pakcoy",
    latin: "Brassica rapa chinensis",
    category: "daun",
    categoryLabel: "Sayuran Daun",
    bio: "Daun tebal renyah dengan pertumbuhan cepat, salah satu sayuran aquaponik paling laris.",
    ph: "6.0 – 7.0",
    suhu: "18 – 28°C",
    panen: "28 – 35 hari",
    cahaya: "Penuh",
    price: 4500,
    unit: "bibit",
    icon: "leaf",
    image: "img/products/pakcoy.jpg",
  },
  {
    id: "bayam-air",
    name: "Bayam Air",
    latin: "Alternanthera sissoo",
    category: "daun",
    categoryLabel: "Sayuran Daun",
    bio: "Daun hijau mengilap, tahan panas, dan bisa dipanen berkali-kali dari batang yang sama.",
    ph: "5.8 – 7.2",
    suhu: "24 – 32°C",
    panen: "20 – 25 hari",
    cahaya: "Penuh",
    price: 4000,
    unit: "bibit",
    icon: "leaf",
    image: "img/products/bayam-air.jpg",
  },
  {
    id: "kemangi",
    name: "Kemangi",
    latin: "Ocimum basilicum",
    category: "herbal",
    categoryLabel: "Herbal",
    bio: "Herbal aromatik yang disukai untuk lalapan dan bumbu masakan, tumbuh baik di net pot kecil.",
    ph: "5.5 – 6.5",
    suhu: "20 – 30°C",
    panen: "30 – 40 hari",
    cahaya: "Penuh",
    price: 5000,
    unit: "bibit",
    icon: "herb",
    image: "img/products/kemangi.jpg",
  },
  {
    id: "sawi-hijau",
    name: "Sawi Hijau",
    latin: "Brassica juncea",
    category: "daun",
    categoryLabel: "Sayuran Daun",
    bio: "Rasa sedikit pahit khas, sangat toleran terhadap fluktuasi nutrisi air.",
    ph: "6.0 – 7.5",
    suhu: "18 – 27°C",
    panen: "25 – 30 hari",
    cahaya: "Sedang",
    price: 4000,
    unit: "bibit",
    icon: "leaf",
    image: "img/products/sawi-hijau.jpg",
  },
  {
    id: "kayu-apu",
    name: "Kayu Apu",
    latin: "Pistia stratiotes",
    category: "filter",
    categoryLabel: "Tanaman Filter",
    bio: "Mengapung bebas dan menyerap kelebihan nutrisi, membantu menjaga kejernihan air kolam.",
    ph: "6.0 – 7.5",
    suhu: "20 – 30°C",
    panen: "Non-panen (filter)",
    cahaya: "Sedang",
    price: 6000,
    unit: "rumpun",
    icon: "float",
    image: "img/products/kayu-apu.jpg",
  },
  {
    id: "eceng-gondok",
    name: "Eceng Gondok Mini",
    latin: "Eichhornia crassipes",
    category: "filter",
    categoryLabel: "Tanaman Filter",
    bio: "Akar lebatnya jadi tempat berkembang bakteri baik sekaligus penyerap amonia berlebih.",
    ph: "6.0 – 8.0",
    suhu: "22 – 32°C",
    panen: "Non-panen (filter)",
    cahaya: "Penuh",
    price: 5000,
    unit: "rumpun",
    icon: "float",
    image: "img/products/eceng-gondok.jpg",
  },
  {
    id: "lele",
    name: "Lele",
    latin: "Clarias batrachus",
    category: "Ikan",
    categoryLabel: "Ikan Konsumsi",
    bio: "Lele merupakan ikan air tawar yang mudah dibudidayakan, memiliki pertumbuhan cepat, tahan terhadap kondisi lingkungan, serta menjadi salah satu komoditas konsumsi paling populer di Indonesia.",
    ph: "6.5 - 8.0",
    suhu: "25 - 30°C",
    panen: "2.5 - 4 bulan",
    cahaya: "penuh",
    price: 30000,
    unit: "kg",
    icon: "🐟",
    image: "img/products/lele.jpg",
  },
];

// Ikon SVG lama sudah tidak dipakai — kartu tanaman kini menampilkan foto asli
// dari folder img/products/. Lihat properti "image" pada tiap data tanaman di atas.

let cart = {}; // { id: qty }

const fmtRupiah = (n) => "Rp " + n.toLocaleString("id-ID");

function renderPlants(filter = "semua") {
  const grid = document.getElementById("plantGrid");
  const list =
    filter === "semua" ? PLANTS : PLANTS.filter((p) => p.category === filter);

  grid.innerHTML = list
    .map(
      (p) => `
    <div class="col-sm-6 col-lg-3">
      <div class="plant-card" data-id="${p.id}">
        <div class="plant-visual">
          <span class="plant-category-tag">${p.categoryLabel}</span>
          <img src="${p.image}" alt="${p.name}" class="plant-photo" loading="lazy" />
        </div>
        <div class="plant-body">
          <div class="plant-name">${p.name}</div>
          <div class="plant-latin">${p.latin}</div>
          <p class="plant-bio">${p.bio}</p>
          <div class="spec-strip">
            <span class="spec-k">pH ideal</span><span class="spec-v">${p.ph}</span>
            <span class="spec-k">Suhu air</span><span class="spec-v">${p.suhu}</span>
            <span class="spec-k">Cahaya</span><span class="spec-v">${p.cahaya}</span>
            <span class="spec-k">Panen</span><span class="spec-v">${p.panen}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="plant-price">${fmtRupiah(p.price)} <span class="per">/ ${p.unit}</span></span>
          </div>
          <button class="btn-add" data-add="${p.id}">+ Tambah ke Pesanan</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add, btn));
  });
}

function addToCart(id, btn) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  showToast(`${PLANTS.find((p) => p.id === id).name} ditambahkan`);
  if (btn) {
    btn.textContent = "✓ Ditambahkan";
    btn.classList.add("added");
    setTimeout(() => {
      btn.textContent = "+ Tambah ke Pesanan";
      btn.classList.remove("added");
    }, 1200);
  }
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartContainer");
  const emptyEl = document.getElementById("cartEmpty");
  const totalRow = document.getElementById("cartTotalRow");
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    container.innerHTML = `<div class="cart-empty" id="cartEmpty">Belum ada tanaman dipilih.<br>Tambahkan dari katalog di atas.</div>`;
    totalRow.style.display = "none";
    return;
  }

  let total = 0;
  container.innerHTML = ids
    .map((id) => {
      const p = PLANTS.find((pl) => pl.id === id);
      const qty = cart[id];
      const subtotal = p.price * qty;
      total += subtotal;
      return `
      <div class="cart-item" data-cart-id="${id}">
        <div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-meta">${fmtRupiah(p.price)} / ${p.unit}</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" data-dec="${id}">–</button>
          <span>${qty}</span>
          <button class="qty-btn" data-inc="${id}">+</button>
        </div>
        <div style="min-width:82px; text-align:right; font-family:var(--font-mono); font-size:0.82rem;">${fmtRupiah(subtotal)}</div>
        <button class="remove-item" data-remove="${id}">Hapus</button>
      </div>
    `;
    })
    .join("");

  document.getElementById("cartTotal").textContent = fmtRupiah(total);
  totalRow.style.display = "flex";

  container
    .querySelectorAll("[data-inc]")
    .forEach((b) =>
      b.addEventListener("click", () => changeQty(b.dataset.inc, 1)),
    );
  container
    .querySelectorAll("[data-dec]")
    .forEach((b) =>
      b.addEventListener("click", () => changeQty(b.dataset.dec, -1)),
    );
  container
    .querySelectorAll("[data-remove]")
    .forEach((b) =>
      b.addEventListener("click", () => removeItem(b.dataset.remove)),
    );
}

function showToast(msg) {
  const toast = document.getElementById("toastMsg");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function buildWaMessage() {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const note = document.getElementById("custNote").value.trim();
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    showToast("Pilih tanaman terlebih dahulu");
    return null;
  }
  if (!name || !phone || !address) {
    showToast("Lengkapi nama, WhatsApp & alamat");
    return null;
  }

  let total = 0;
  let lines = ids.map((id) => {
    const p = PLANTS.find((pl) => pl.id === id);
    const qty = cart[id];
    const subtotal = p.price * qty;
    total += subtotal;
    return `- ${p.name} x${qty} (${p.unit}) = ${fmtRupiah(subtotal)}`;
  });

  const msg = [
    `Halo HydroPhoenix, saya ingin memesan:`,
    ``,
    ...lines,
    ``,
    `Total: ${fmtRupiah(total)}`,
    ``,
    `Nama: ${name}`,
    `WhatsApp: ${phone}`,
    `Alamat: ${address}`,
    note ? `Catatan: ${note}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return msg;
}

function sendOrder() {
  const msg = buildWaMessage();
  if (!msg) return;
  const url = `https://wa.me/${6288806710387}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// ---------- Filter tabs ----------
document.getElementById("filterTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderPlants(btn.dataset.filter);
});

// ---------- Navbar scroll effect ----------
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  if (window.scrollY > 30) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

// ---------- WA float + footer link ----------
function setWaLinks() {
  const genericMsg = encodeURIComponent(
    "Halo HydroPhoenix, saya ingin bertanya tentang tanaman aquaponik.",
  );
  const url = `https://wa.me/${6288806710387}?text=${genericMsg}`;
  document.getElementById("waFloat").href = url;
  document.getElementById("footerWaLink").href = url;
}

// ---------- Init ----------
document.getElementById("sendOrderBtn").addEventListener("click", sendOrder);
renderPlants();
renderCart();
setWaLinks();
