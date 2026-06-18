# Code Review — Issues & Fixes

**Build:** ✅ passes | **Tests:** 10/10 ✅

## Bulunan Sorunlar

### 1. Duplicate `LANG_COLORS` in 2 files
`src/components/charts/LanguageChart.tsx` ve `src/components/sections/PinnedProjects.tsx` — aynı 11 satırlık renk haritası iki kere tanımlanmış.

**Fix:** Ortak bir `src/lib/lang-colors.ts` dosyasına çıkar.

### 2. `design-tokens.ts` ölü kod
`src/lib/design-tokens.ts` hiçbir yerde import edilmiyor. Tüm renkler artık `tailwind.config.ts` + CSS variable'larda.

**Fix:** Sil veya canlı kullan — gereksiz kod.

### 3. `<th scope="col">` eksik (a11y)
`PinnedProjects.tsx`'deki `<th>` etiketlerinde `scope="col"` yok. Ekran okuyucular için gerekli.

### 4. Terminal dots `aria-hidden` eksik (a11y)
Header'daki ●●● (kırmızı/sarı/yeşil daireler) dekoratif — `aria-hidden="true"` olmalı.

### 5. `GitHub ->` linki `target="_blank"` güvenlik
Hero'daki sosyal linkler `target="_blank"` kullanıyor ama `rel="noopener noreferrer"` var ✅. Sadece Footer'daki github linkinde `target="_blank"` + `rel` yok — eklenecek.

### 6. Duplicate `fetch-portfolio-data.test.ts` import mock
Her testte `vi.mock("@/config")` aynı mock yazılıyor — `setup.ts`'e taşınabilir.

---

## Fix uygula?

| # | Öncelik | Ne kadar iş |
|---|---------|------------|
| 1 | Yüksek | 3 dk — extract + import |
| 2 | Orta | 1 dk — sil |
| 3 | Düşük | 30sn — scope ekle |
| 4 | Düşük | 30sn — aria-hidden |
| 5 | Düşük | 30sn — rel ekle |
| 6 | Çok düşük | 2 dk — setup.ts'e taşı |

Hepsini çözeyim mi?
