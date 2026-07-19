import { Division, GalleryItem, QuickStat, NavItem, Leader } from "./types";

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Divisi & Pangkat", href: "#structure" },
  { label: "Pimpinan", href: "#leaders" },
  { label: "Galeri Foto", href: "#gallery" },
  { label: "Pendaftaran", href: "#join" },
];

export const QUICK_STATS: QuickStat[] = [
  {
    value: "4",
    label: "Divisi Operasional",
    description: "Unit respons khusus yang siaga penuh selama 24/7.",
  },
  {
    value: "15+",
    label: "Personel Aktif",
    description: "Anggota roleplay terlatih dan bersertifikasi yang siap bertugas.",
  },
  {
    value: "10+",
    label: "Armada Kendaraan",
    description: "Unit kendaraan dengan setiap departemen memiliki livery kendaraan masing-masing",
  },
  {
    value: "200+",
    label: "Laporan Selesai",
    description: "Insiden darurat tersimulasikan secara real-time di dalam server.",
  },
];

// Struktur pangkat bersama untuk divisi Fire Fighter, Fire Rescue, dan Hazmat
const SHARED_FIRE_RANKS = [
  {
    title: "Fire Captain (Kapten Pemadam)",
    abbreviation: "CAPT",
    payGrade: "O-3",
    responsibilities: [
      "Komandan insiden lapangan utama untuk penanganan operasi taktis, penyelamatan, atau hazmat skala menengah hingga besar.",
      "Bertanggung jawab atas keselamatan seluruh kru, kesiapan unit, dan manajemen taktis armada di tempat kejadian.",
      "Membina jalur koordinasi darurat langsung dengan para Pimpinan Tertinggi."
    ],
  },
  {
    title: "Fire Lieutenant (Letnan Pemadam)",
    abbreviation: "LT",
    payGrade: "O-2",
    responsibilities: [
      "Mengawasi kepatuhan prosedur keselamatan taktis langsung di dalam zona bahaya.",
      "Memonitor sisa pasokan udara pernapasan (SCBA) serta jalur evakuasi masuk/keluar tim.",
      "Memastikan titik penyerangan air (nozzle) atau alat pemotong taktis bekerja dengan efektif."
    ],
  },
  {
    title: "Senior Firefighter (Pemadam Senior)",
    abbreviation: "SFF",
    payGrade: "E-4",
    responsibilities: [
      "Operator ujung tombak peralatan taktis, pemadaman interior, ekstrigasi berat, atau instrumen hazmat.",
      "Mementori bimbingan praktis untuk taruna baru dan mengemudikan kendaraan armada berat.",
      "Mengoperasikan sistem pompa air unit, alat pemotong hidrolik, dan perkakas stasiun."
    ],
  },
  {
    title: "Probationary Firefighter (Taruna Pemadam)",
    abbreviation: "PFF",
    payGrade: "E-1",
    responsibilities: [
      "Membantu menyambungkan pasokan air hidran kota atau mempersiapkan area dekontaminasi dan perimeter.",
      "Melakukan pemeriksaan sisa bara api (overhaul) dan pembersihan zona pasca-operasi.",
      "Menjaga kebersihan stasiun dan mempelajari modul taktis standar operasional."
    ],
  },
];

// Struktur pangkat khusus untuk divisi EMS/EMT (Emergency Medical Service)
const EMS_EMT_RANKS = [
  {
    title: "EMS Commander (Komandan Ambulans)",
    abbreviation: "EMS-CMD",
    payGrade: "O-2",
    responsibilities: [
      "Memimpin koordinasi area triase pada insiden kecelakaan atau bencana korban massal (MCI).",
      "Memastikan seluruh paramedis menjalankan protokol penanganan klinis dengan benar.",
      "Mengurus hubungan rujukan darurat dengan pihak rumah sakit tujuan."
    ],
  },
  {
    title: "Flight Paramedic / Lead Medic (Paramedis Utama)",
    abbreviation: "PARA",
    payGrade: "E-5",
    responsibilities: [
      "Memberikan tindakan Advanced Life Support (ALS) termasuk infus darurat dan intubasi jalur napas.",
      "Mengoperasikan monitor jantung, alat kejut jantung (defibrilator), dan memberikan obat dosis kritis.",
      "Melatih kru EMT dalam hal dosis medis darurat dan stabilisasi leher korban."
    ],
  },
  {
    title: "Emergency Medical Technician (EMT)",
    abbreviation: "EMT",
    payGrade: "E-2",
    responsibilities: [
      "Menyediakan tindakan Basic Life Support (BLS), kompresi dada (CPR), pembidaian, dan pembalutan luka.",
      "Mengemudikan unit ambulans secara aman menerobos lalu lintas padat ke lokasi insiden.",
      "Mengisi rekam medis laporan penanganan pasien dan menyusun ulang suplai medis di ambulans."
    ],
  },
];

export const DIVISIONS_DATA: Division[] = [
  {
    id: "fire-fighter",
    name: "Fire Fighter",
    tagline: "Garis Pertahanan Pertama Menjinakkan Api Struktur & Karhutla.",
    description: "Divisi pemadam kebakaran konvensional yang menjadi pilar utama departemen. Bertugas melakukan taktik pemadaman api cepat, operasi penetrasi interior pada bangunan terbakar, penyelamatan korban di dalam gedung, serta pengamanan pasokan air hidran stasiun.",
    iconName: "Flame",
    accentColor: "#dc2626", // Red-600
    ranks: SHARED_FIRE_RANKS,
    vehicles: [
      {
        name: "Custom Pumper Engine 101",
        code: "ENG-101",
        description: "Mesin pompa berkekuatan 1.500 GPM dengan tangki air internal 750 galon dan ratusan meter selang serbaguna."
      },
      {
        name: "Aerial Ladder Platform Truck 5",
        code: "LAD-05",
        description: "Truk tangga hidrolik baja 105 kaki yang dilengkapi dengan master stream penembak air otomatis untuk pemadaman gedung tinggi."
      }
    ],
    imageUrl: "https://i.ibb.co.com/B2z9X1Qp/Damkar2112.webp"
  },
  {
    id: "fire-rescue",
    name: "Fire Rescue",
    tagline: "Spesialis Ekstrigasi Kecelakaan, Penyelamatan Ketinggian, dan Medan Ekstrem.",
    description: "Unit elit penyelamatan teknis yang merespons skenario kritis non-kebakaran. Berfokus pada pemotongan kerangka baja kendaraan ringsek, penyelamatan di perairan/sungai, evakuasi tali di tebing/ketinggian (rope rescue), serta penyelamatan korban reruntuhan gedung.",
    iconName: "ShieldAlert",
    accentColor: "#ea580c", // Orange-600
    ranks: SHARED_FIRE_RANKS,
    vehicles: [
      {
        name: "Heavy Rescue Truck 40",
        code: "RES-40",
        description: "Unit bengkel bergerak yang mengangkut balon pengangkat pneumatik, penyangga hidrolik, dan perkakas pemotong baja."
      }
    ],
    imageUrl: "https://i.ibb.co.com/5hjmFXKd/firerescu.webp"
  },
  {
    id: "ems-emt",
    name: "EMS",
    tagline: "Tindakan Medis Darurat, Penanganan Trauma, dan Evakuasi Cepat.",
    description: "Sayap pertolongan pertama medis pra-rumah sakit yang krusial. Menyediakan resusitasi darurat, stabilisasi kondisi trauma parah pasca-kecelakaan, perawatan luka bakar tingkat lanjut, serta transportasi ambulans berkecepatan tinggi dengan pengawasan intensif.",
    iconName: "HeartPulse",
    accentColor: "#e11d48", // Rose-600
    ranks: EMS_EMT_RANKS,
    vehicles: [
      {
        name: "Advanced Life Support Ambulance 18",
        code: "MED-18",
        description: "Unit ambulans canggih yang dilengkapi kasur hidrolik, defibrilator nirkabel, pasokan oksigen, dan tas obat lengkap."
      },
      {
        name: "Rapid Response Medical SUV",
        code: "MED-02",
        description: "SUV interseptor medis cepat yang digunakan paramedis untuk mendahului ambulans besar guna penanganan darurat awal."
      }
    ],
    imageUrl: "https://i.ibb.co.com/tp8GWT0t/1000208203.webp"
  },
  {
    id: "hazmat",
    name: "Hazmat",
    tagline: "Identifikasi, Isolasi, dan Netralisasi Zat Kimia Berbahaya.",
    description: "Divisi spesialis penanganan bahan berbahaya dan beracun (B3). Bertugas mendeteksi kebocoran gas beracun, mengisolasi tumpahan cairan kimia industri, mengamankan paparan radiasi, serta mendirikan tenda dekontaminasi darurat untuk personel dan korban terdampak.",
    iconName: "Shield",
    accentColor: "#ca8a04", // Yellow-605
    ranks: SHARED_FIRE_RANKS,
    vehicles: [
      {
        name: "Hazardous Materials Unit 12",
        code: "HAZ-12",
        description: "Truk berspesifikasi khusus yang dilengkapi penganalisis udara jarak jauh, bahan penetral zat kimia, dan pancuran dekontaminasi."
      }
    ],
    imageUrl: "https://i.ibb.co.com/N6DnQ0bp/sddefault.jpg"
  }
];

export const LEADERS_DATA: Leader[] = [
  {
    name: "Frencline",
    role: "Kepala Dinas Pemadam",
    callsign: "NFD-01",
    description: "Pimpinan tertinggi yang memegang komando penuh operasional departemen Nusantara Fire Departement, pengelolaan kebijakan whitelist, perumusan standar taktis, dan koordinasi tingkat atas pada insiden bencana kota berskala masif.",
    avatarUrl: "https://i.ibb.co.com/rfv6mkKQ/1000208197.webp",
  },
  {
    name: "Kelvin",
    role: "Wakil Kepala Dinas",
    callsign: "NFD-02",
    description: "Menjabat sebagai kepala pengawas kedisiplinan anggota internal Nusantara Fire Departement, pengelolaan roster kedinasan, penanggung jawab akademi pendidikan taruna baru, serta penyusunan administrasi promosi kenaikan pangkat.",
    avatarUrl: "https://i.ibb.co.com/qYfr3rTH/IMG-20260601-WA0013.webp",
  },
  {
    name: "Tidak Ada",
    role: "Sekretaris Jendral Pemadam",
    callsign: "NFD-03",
    description: "Komandan taktis lapangan yang memimpin penyebaran armada Nusantara Fire Departement di area kejadian, memastikan kelancaran komunikasi antar-divisi saat operasi multi-alarm aktif, dan mengawasi langsung keselamatan taktis zona bahaya.",
    avatarUrl: "https://i.ibb.co.com/gkz5719/images-3.jpg",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Personil Stanby di stasiun",
    category: "Operation",
    imageUrl: "https://i.ibb.co.com/67Cx20J6/1000208207.webp",
    description: "Petugas pemadam kebakaran melakukan penetrasi interior ke dalam rumah yang dipenuhi asap tebal dalam simulasi kebakaran.",
  },
  {
    id: "gal-2",
    title: "Barisan Armada Merah",
    category: "Vehicles",
    imageUrl: "https://i.ibb.co.com/tPsp1LKn/1784455344873.jpg",
    description: "Armada truk pompa (pumper engine) kustom yang dirawat rapi, siap meluncur merespons panggilan sirene darurat.",
  },
  {
    id: "gal-3",
    title: "Kunjungan Tamu",
    category: "Training",
    imageUrl: "https://i.ibb.co.com/ZZqrFXX/1000208198.webp",
    description: "NFD Kedatangan Tamu terhormat dari instansi lain",
  },
  {
    id: "gal-4",
    title: "Unit Kendaraan Terparkir",
    category: "Operation",
    imageUrl: "https://i.ibb.co.com/KTnC6Jp/Beauty-Plus-20260525024613408-save.jpg",
    description: "Unit Kendaraan tampak terparkir didepan stasiun kebakaran dan sedang stanby untuk merespon panggilan darurat kedepannya.",
  },
  {
    id: "gal-5",
    title: "Pusat Komunikasi CAD",
    category: "Training",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    description: "Operator pengirim (dispatcher) memetakan panggilan masuk, mencatat lokasi insiden, dan menugaskan unit terdekat pada sistem CAD.",
  },
  {
    id: "gal-6",
    title: "Apel Gelar Pasukan",
    category: "Ceremony",
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=1200&q=80",
    description: "Apel barisan kehormatan seluruh divisi untuk pemeriksaan rutin seragam dan kelengkapan alat pelindung diri.",
  },
];
