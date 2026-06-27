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
    value: "50+",
    label: "Personel Aktif",
    description: "Anggota roleplay terlatih dan bersertifikasi yang siap bertugas.",
  },
  {
    value: "10+",
    label: "Armada Kendaraan",
    description: "Unit kendaraan khusus kustom dengan sirene dan sistem CAD terintegrasi.",
  },
  {
    value: "1.200+",
    label: "Laporan Selesai",
    description: "Insiden darurat tersimulasikan secara real-time di dalam server.",
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
    ranks: [
      {
        title: "Fire Captain (Kapten Pemadam)",
        abbreviation: "CAPT",
        payGrade: "O-3",
        responsibilities: [
          "Komandan insiden lapangan utama untuk penanganan kebakaran skala menengah hingga besar.",
          "Bertanggung jawab atas keselamatan seluruh kru, kesiapan unit, dan manajemen taktis armada.",
          "Membina jalur koordinasi darurat langsung dengan para Pimpinan Tertinggi."
        ],
      },
      {
        title: "Fire Lieutenant (Letnan Pemadam)",
        abbreviation: "LT",
        payGrade: "O-2",
        responsibilities: [
          "Mengawasi kepatuhan prosedur regu pemadam langsung di dalam zona bahaya.",
          "Memonitor sisa pasokan udara pernapasan (SCBA) serta jalur evakuasi masuk/keluar tim.",
          "Memastikan titik penyerangan air (nozzle) bekerja dengan efektif dan presisi."
        ],
      },
      {
        title: "Senior Firefighter (Pemadam Senior)",
        abbreviation: "SFF",
        payGrade: "E-4",
        responsibilities: [
          "Operator ujung tombak selang air (nozzleman) dan memimpin tim masuk interior.",
          "Mementori bimbingan praktis untuk taruna baru dan mengemudikan kendaraan pumper.",
          "Mengoperasikan sistem pompa air unit dan perkakas berat stasiun."
        ],
      },
      {
        title: "Probationary Firefighter (Taruna Pemadam)",
        abbreviation: "PFF",
        payGrade: "E-1",
        responsibilities: [
          "Membantu menyambungkan pasokan air dari hidran kota ke unit pemadam.",
          "Melakukan pemeriksaan sisa bara api (overhaul) setelah api utama berhasil dikendalikan.",
          "Menjaga kebersihan stasiun dan mempelajari modul taktis standar operasional."
        ],
      },
    ],
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
    ]
  },
  {
    id: "fire-rescue",
    name: "Fire Rescue",
    tagline: "Spesialis Ekstrigasi Kecelakaan, Penyelamatan Ketinggian, dan Medan Ekstrem.",
    description: "Unit elit penyelamatan teknis yang merespons skenario kritis non-kebakaran. Berfokus pada pemotongan kerangka baja kendaraan ringsek, penyelamatan di perairan/sungai, evakuasi tali di tebing/ketinggian (rope rescue), serta penyelamatan korban reruntuhan gedung.",
    iconName: "ShieldAlert",
    accentColor: "#ea580c", // Orange-600
    ranks: [
      {
        title: "Rescue Specialist Chief (Kepala Regu Penyelamat)",
        abbreviation: "R-CHIEF",
        payGrade: "O-3",
        responsibilities: [
          "Merancang strategi penyelamatan taktis terpadu di zona reruntuhan atau tabrakan parah.",
          "Mengoordinasikan pembagian sektor evakuasi aman untuk tim paramedis.",
          "Mengotorisasi penggunaan alat berat penyelamat agar tidak memicu kolaps sekunder."
        ],
      },
      {
        title: "Rescue Technician (Teknisi Penyelamat)",
        abbreviation: "TECH",
        payGrade: "E-5",
        responsibilities: [
          "Melakukan ekstrigasi pemotongan logam kendaraan menggunakan hidrolik (Jaws of Life).",
          "Melaksanakan penyelamatan vertikal (high-angle) menggunakan sistem pulley dan tali pengaman.",
          "Melakukan teknik pencarian korban tenggelam dengan perlengkapan selam taktis."
        ],
      },
    ],
    vehicles: [
      {
        name: "Heavy Rescue Truck 40",
        code: "RES-40",
        description: "Unit bengkel bergerak yang mengangkut balon pengangkat pneumatik, penyangga hidrolik, dan perkakas pemotong baja."
      }
    ]
  },
  {
    id: "ems-emt",
    name: "EMS/EMT (Emergency Medical Service)",
    tagline: "Tindakan Medis Darurat, Penanganan Trauma, dan Evakuasi Cepat.",
    description: "Sayap pertolongan pertama medis pra-rumah sakit yang krusial. Menyediakan resusitasi darurat, stabilisasi kondisi trauma parah pasca-kecelakaan, perawatan luka bakar tingkat lanjut, serta transportasi ambulans berkecepatan tinggi dengan pengawasan intensif.",
    iconName: "HeartPulse",
    accentColor: "#e11d48", // Rose-600
    ranks: [
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
    ],
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
    ]
  },
  {
    id: "hazmat",
    name: "Hazmat",
    tagline: "Identifikasi, Isolasi, dan Netralisasi Zat Kimia Berbahaya.",
    description: "Divisi spesialis penanganan bahan berbahaya dan beracun (B3). Bertugas mendeteksi kebocoran gas beracun, mengisolasi tumpahan cairan kimia industri, mengamankan paparan radiasi, serta mendirikan tenda dekontaminasi darurat untuk personel dan korban terdampak.",
    iconName: "Shield",
    accentColor: "#ca8a04", // Yellow-605
    ranks: [
      {
        title: "Hazmat Commander (Komandan Unit Hazmat)",
        abbreviation: "H-CMD",
        payGrade: "O-3",
        responsibilities: [
          "Menentukan perimeter isolasi zona bahaya (Zona Merah, Kuning, Hijau) di lokasi tumpahan kimia.",
          "Menganalisis jenis material beracun berdasarkan sensor dan referensi database internasional.",
          "Mengoordinasikan tindakan evakuasi penduduk sipil di sekitar radius paparan gas."
        ],
      },
      {
        title: "Hazmat Technician (Teknisi Bahan Berbahaya)",
        abbreviation: "H-TECH",
        payGrade: "E-5",
        responsibilities: [
          "Memasuki Zona Merah dengan menggunakan setelan pelindung kedap udara Level-A (Hazmat Suit).",
          "Melakukan penambalan kebocoran tangki, mengaplikasikan bahan penetral zat asam, dan mengukur radiasi.",
          "Mengoperasikan pos dekontaminasi cuci bersih untuk melucuti zat beracun pasca-penugasan."
        ],
      },
    ],
    vehicles: [
      {
        name: "Hazardous Materials Unit 12",
        code: "HAZ-12",
        description: "Truk berspesifikasi khusus yang dilengkapi penganalisis udara jarak jauh, bahan penetral zat kimia, dan pancuran dekontaminasi."
      }
    ]
  }
];

export const LEADERS_DATA: Leader[] = [
  {
    name: "Andika Wijaya",
    role: "Kepala Dinas Damkar (Fire Chief)",
    callsign: "CHIEF-01",
    description: "Pimpinan tertinggi yang memegang komando penuh operasional departemen, pengelolaan kebijakan whitelist, perumusan standar taktis, dan koordinasi tingkat atas pada insiden bencana kota berskala masif.",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Budi Santoso",
    role: "Wakil Kepala Dinas (Deputy Fire Chief)",
    callsign: "DEP-01",
    description: "Menjabat sebagai kepala pengawas kedisiplinan anggota internal, pengelolaan roster kedinasan, penanggung jawab akademi pendidikan taruna baru, serta penyusunan administrasi promosi kenaikan pangkat.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Reza Pratama",
    role: "Kepala Divisi Operasional (Battalion Chief)",
    callsign: "BAT-01",
    description: "Komandan taktis lapangan yang memimpin penyebaran armada di area kejadian, memastikan kelancaran komunikasi antar-divisi saat operasi multi-alarm aktif, dan mengawasi langsung keselamatan taktis zona bahaya.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Pemadaman Kebakaran Rumah",
    category: "Operation",
    imageUrl: "https://images.unsplash.com/photo-1583573636246-18cb2246697f?auto=format&fit=crop&w=1200&q=80",
    description: "Petugas pemadam kebakaran melakukan penetrasi interior ke dalam rumah yang dipenuhi asap tebal dalam simulasi kebakaran.",
  },
  {
    id: "gal-2",
    title: "Barisan Armada Merah",
    category: "Vehicles",
    imageUrl: "https://images.unsplash.com/photo-1617470703128-26a0fc9af10f?auto=format&fit=crop&w=1200&q=80",
    description: "Armada truk pompa (pumper engine) kustom yang dirawat rapi, siap meluncur merespons panggilan sirene darurat.",
  },
  {
    id: "gal-3",
    title: "Latihan Ekstrigasi Berat",
    category: "Training",
    imageUrl: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
    description: "Para kru darurat mempelajari kestabilan sasis dan tata letak alat pemotong baja hidrolik saat latihan kecelakaan lalu lintas.",
  },
  {
    id: "gal-4",
    title: "Respons Cepat Malam Hari",
    category: "Operation",
    imageUrl: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1200&q=80",
    description: "Patroli malam hari meluncur dengan sirene menyala untuk merespons alarm otomatis dari distrik komersial pusat kota.",
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
