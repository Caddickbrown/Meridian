/**
 * Meridian custom data layer
 * Sits on top of Osiris's /api/* endpoints.
 * Carries forward all curated static intel from the original Meridian (worldmonitor fork):
 *   - Military bases (nation-coloured)
 *   - Strategic chokepoints
 *   - Political hotspots with escalation scores
 *   - Conflict zones
 * Plus live feeds not in Osiris core:
 *   - Polymarket geopolitical prediction markets
 *   - Regional Google News RSS
 *   - UCDP conflict events
 *   - UNHCR displacement reports
 *   - CISA cybersecurity advisories
 */

export interface MeridianPoint {
  lat: number
  lng: number
  type: 'conflict' | 'base' | 'chokepoint' | 'hotspot'
  label: string
  detail: string
  severity: 'low' | 'med' | 'high'
  url?: string
  extra?: Record<string, string>
}

export interface FeedItem {
  title: string
  url: string
  source: string
  category: string
  time?: string
  summary?: string
}

// ── STATIC INTEL LAYERS ─────────────────────────────────────────────────────

export function getConflictZones(): MeridianPoint[] {
  return [
    { lat: 48.5, lng: 31.0,  type: 'conflict', label: 'Ukraine–Russia',      detail: 'Ongoing armed conflict',             severity: 'high', extra: { Region: 'Eastern Europe',  Since: '2022' } },
    { lat: 15.5, lng: 43.0,  type: 'conflict', label: 'Yemen',               detail: 'Civil war / Houthi operations',       severity: 'high', extra: { Region: 'Middle East',     Since: '2015' } },
    { lat: 31.5, lng: 34.5,  type: 'conflict', label: 'Gaza',                detail: 'Armed conflict',                      severity: 'high', extra: { Region: 'Middle East',     Since: '2023' } },
    { lat: 15.0, lng: 30.0,  type: 'conflict', label: 'Sudan',               detail: 'Civil conflict — RSF vs SAF',         severity: 'high', extra: { Region: 'Africa',          Since: '2023' } },
    { lat: 9.0,  lng: 40.0,  type: 'conflict', label: 'Ethiopia',            detail: 'Amhara/Tigray tensions',              severity: 'med',  extra: { Region: 'Africa',          Since: '2020' } },
    { lat: 5.0,  lng: 21.0,  type: 'conflict', label: 'DRC',                 detail: 'M23 / eastern conflict',              severity: 'high', extra: { Region: 'Africa',          Since: '2012' } },
    { lat: 12.0, lng: 15.0,  type: 'conflict', label: 'Lake Chad Basin',     detail: 'Boko Haram / ISWAP',                  severity: 'med',  extra: { Region: 'Africa',          Since: '2009' } },
    { lat: 15.5, lng: 68.0,  type: 'conflict', label: 'Afghanistan',         detail: 'Taliban insurgency / IS-K',           severity: 'med',  extra: { Region: 'Central Asia',    Since: '2001' } },
    { lat: 35.0, lng: 38.5,  type: 'conflict', label: 'Syria',               detail: 'Ongoing fragmented conflict',         severity: 'med',  extra: { Region: 'Middle East',     Since: '2011' } },
    { lat: 13.5, lng: 2.0,   type: 'conflict', label: 'Mali / Sahel',        detail: 'Jihadist insurgency',                 severity: 'med',  extra: { Region: 'Africa',          Since: '2012' } },
    { lat: 6.5,  lng: -11.5, type: 'conflict', label: 'Guinea',              detail: 'Political instability',               severity: 'low',  extra: { Region: 'West Africa',     Since: '2021' } },
    { lat: 25.0, lng: 45.0,  type: 'conflict', label: 'Yemen–KSA border',   detail: 'Houthi cross-border attacks',         severity: 'med',  extra: { Region: 'Middle East',     Since: '2015' } },
  ]
}

export function getMilitaryBases(): MeridianPoint[] {
  return [
    // US / NATO
    { lat: 35.28,  lng: 139.67,  type: 'base', label: 'Yokosuka Naval Base',        detail: 'US 7th Fleet HQ — forward-deployed carrier',              severity: 'med', extra: { Nation: 'us-nato',  Country: 'Japan' } },
    { lat: 36.95,  lng: -76.31,  type: 'base', label: 'Naval Station Norfolk',      detail: 'Largest naval station in the world — US Atlantic Fleet',   severity: 'med', extra: { Nation: 'us-nato',  Country: 'USA' } },
    { lat: 36.62,  lng: -6.35,   type: 'base', label: 'Naval Station Rota',         detail: 'US Navy / NATO — key Southern Europe hub',                 severity: 'med', extra: { Nation: 'us-nato',  Country: 'Spain' } },
    { lat: 37.0,   lng: 35.43,   type: 'base', label: 'Incirlik Air Base',          detail: 'US Air Force — hosts NATO nuclear weapons',                severity: 'med', extra: { Nation: 'us-nato',  Country: 'Turkey' } },
    { lat: 36.96,  lng: 127.03,  type: 'base', label: 'Camp Humphreys',             detail: 'Largest US overseas military base',                        severity: 'med', extra: { Nation: 'us-nato',  Country: 'South Korea' } },
    { lat: -7.3,   lng: 72.4,    type: 'base', label: 'Diego Garcia',               detail: 'US Navy / RAF — Indian Ocean strategic hub',               severity: 'med', extra: { Nation: 'us-nato',  Country: 'BIOT' } },
    { lat: 49.44,  lng: 7.6,     type: 'base', label: 'Ramstein Air Base',          detail: 'HQ US Air Forces Europe / NATO Air Command',               severity: 'med', extra: { Nation: 'us-nato',  Country: 'Germany' } },
    { lat: 46.03,  lng: 12.6,    type: 'base', label: 'Aviano Air Base',            detail: 'US 31st Fighter Wing — southern NATO flank',               severity: 'med', extra: { Nation: 'us-nato',  Country: 'Italy' } },
    { lat: 13.58,  lng: 144.93,  type: 'base', label: 'Andersen Air Force Base',    detail: 'US Pacific Air Forces — Guam strategic bomber hub',         severity: 'med', extra: { Nation: 'us-nato',  Country: 'Guam' } },
    { lat: 25.12,  lng: 51.32,   type: 'base', label: 'Al Udeid Air Base',          detail: 'US CENTCOM Air HQ — largest US base in Middle East',        severity: 'med', extra: { Nation: 'us-nato',  Country: 'Qatar' } },
    { lat: 48.74,  lng: 9.21,    type: 'base', label: 'Stuttgart EUCOM',            detail: 'US European Command / AFRICOM HQ',                         severity: 'med', extra: { Nation: 'us-nato',  Country: 'Germany' } },
    { lat: 21.35,  lng: -157.97, type: 'base', label: 'Pearl Harbor–Hickam',        detail: 'US Indo-Pacific Command — Pacific Fleet HQ',               severity: 'med', extra: { Nation: 'us-nato',  Country: 'USA' } },
    { lat: 26.35,  lng: 127.77,  type: 'base', label: 'Kadena Air Base',            detail: 'Largest US Air Force base in Asia — Okinawa',              severity: 'med', extra: { Nation: 'us-nato',  Country: 'Japan' } },
    // Russia
    { lat: 35.41,  lng: 35.94,   type: 'base', label: 'Khmeimim Air Base',          detail: 'Russian Air Force — key Syria power projection hub',        severity: 'high', extra: { Nation: 'russia', Country: 'Syria' } },
    { lat: 34.91,  lng: 35.87,   type: 'base', label: 'Tartus Naval Base',          detail: "Russia's only Mediterranean naval facility",               severity: 'high', extra: { Nation: 'russia', Country: 'Syria' } },
    { lat: 68.97,  lng: 33.09,   type: 'base', label: 'Northern Fleet HQ — Murmansk', detail: "Russia's nuclear submarine fleet home port",             severity: 'high', extra: { Nation: 'russia', Country: 'Russia' } },
    { lat: 54.71,  lng: 20.51,   type: 'base', label: 'Kaliningrad Military District', detail: 'Russian Baltic exclave — nuclear-capable Iskander missiles', severity: 'high', extra: { Nation: 'russia', Country: 'Russia' } },
    { lat: 42.85,  lng: 74.85,   type: 'base', label: 'Kant Air Base',              detail: 'Russian Air Force — CSTO base in Kyrgyzstan',              severity: 'high', extra: { Nation: 'russia', Country: 'Kyrgyzstan' } },
    { lat: 38.54,  lng: 68.78,   type: 'base', label: '201st Military Base — Dushanbe', detail: "Russia's largest foreign military base",               severity: 'high', extra: { Nation: 'russia', Country: 'Tajikistan' } },
    // China
    { lat: 10.5,   lng: 103.61,  type: 'base', label: 'Ream Naval Base',            detail: 'Chinese-linked naval facility — Gulf of Thailand',         severity: 'high', extra: { Nation: 'china',  Country: 'Cambodia' } },
    { lat: 11.59,  lng: 43.06,   type: 'base', label: 'PLA Support Base — Djibouti', detail: "China's first overseas military base",                    severity: 'high', extra: { Nation: 'china',  Country: 'Djibouti' } },
    { lat: 9.9,    lng: 115.53,  type: 'base', label: 'Spratly Islands Bases',      detail: 'Artificial island military outposts — South China Sea',    severity: 'high', extra: { Nation: 'china',  Country: 'South China Sea' } },
    { lat: 16.83,  lng: 112.34,  type: 'base', label: 'Paracel Islands Base',       detail: 'Chinese garrison — contested South China Sea territory',   severity: 'high', extra: { Nation: 'china',  Country: 'South China Sea' } },
    // France / UK
    { lat: 24.52,  lng: 54.4,    type: 'base', label: 'Camp de la Paix — Abu Dhabi', detail: "France's first permanent Gulf base",                      severity: 'low',  extra: { Nation: 'france', Country: 'UAE' } },
    { lat: 11.56,  lng: 43.14,   type: 'base', label: 'Camp Lemonnier (FR)',        detail: 'French forces in Djibouti — Héron base',                   severity: 'low',  extra: { Nation: 'france', Country: 'Djibouti' } },
    { lat: 34.58,  lng: 32.97,   type: 'base', label: 'RAF Akrotiri',               detail: 'UK Sovereign Base Area — Cyprus',                          severity: 'low',  extra: { Nation: 'uk',     Country: 'Cyprus' } },
    { lat: 36.14,  lng: -5.35,   type: 'base', label: 'Gibraltar Garrison',         detail: 'British Overseas Territory — NATO southern entrance',      severity: 'low',  extra: { Nation: 'uk',     Country: 'Gibraltar' } },
  ]
}

export function getChokepoints(): MeridianPoint[] {
  return [
    { lat: 30.5,   lng: 32.3,    type: 'chokepoint', label: 'Suez Canal',           detail: '~17,000 vessels/year, ~12% global trade',                 severity: 'high', extra: { Region: 'NE Africa',       AnnualTransit: '~17,000 ships' } },
    { lat: 2.5,    lng: 101.5,   type: 'chokepoint', label: 'Strait of Malacca',    detail: '~90,000 vessels/year, 25% global trade',                  severity: 'high', extra: { Region: 'Southeast Asia',  AnnualTransit: '~90,000 ships' } },
    { lat: 26.5,   lng: 56.5,    type: 'chokepoint', label: 'Strait of Hormuz',     detail: '~20% global oil supply, 17 MBPD',                         severity: 'high', extra: { Region: 'Middle East',     AnnualTransit: '~20,000 ships' } },
    { lat: 12.5,   lng: 43.3,    type: 'chokepoint', label: 'Bab el-Mandeb',        detail: '~9% global oil, Houthi threat zone',                      severity: 'high', extra: { Region: 'Horn of Africa',  AnnualTransit: '~20,000 ships' } },
    { lat: 9.1,    lng: -79.7,   type: 'chokepoint', label: 'Panama Canal',         detail: '~5% global trade, ~14,000 vessels/year',                  severity: 'high', extra: { Region: 'Central America', AnnualTransit: '~14,000 ships' } },
    { lat: 24.0,   lng: 119.5,   type: 'chokepoint', label: 'Taiwan Strait',        detail: '~50% global container traffic, critical flashpoint',       severity: 'high', extra: { Region: 'East Asia',       AnnualTransit: '~50,000 ships' } },
    { lat: -34.36, lng: 18.49,   type: 'chokepoint', label: 'Cape of Good Hope',    detail: 'Africa–Europe backup route, surges when Suez blocked',     severity: 'high', extra: { Region: 'Southern Africa', AnnualTransit: '~20,000 ships' } },
    { lat: 35.9,   lng: -5.6,    type: 'chokepoint', label: 'Strait of Gibraltar',  detail: '~100,000 vessels/year, Atlantic–Mediterranean gateway',    severity: 'high', extra: { Region: 'Southern Europe', AnnualTransit: '~100,000 ships' } },
    { lat: 41.1,   lng: 29.0,    type: 'chokepoint', label: 'Bosphorus',            detail: '~50,000 vessels/year, Black Sea–Mediterranean',            severity: 'high', extra: { Region: 'Turkey',          AnnualTransit: '~50,000 ships' } },
    { lat: 34.0,   lng: 129.0,   type: 'chokepoint', label: 'Korea Strait',         detail: 'Japan–Korea–China shipping corridor',                     severity: 'high', extra: { Region: 'NE Asia',          AnnualTransit: '~20,000 ships' } },
    { lat: 51.0,   lng: 1.5,     type: 'chokepoint', label: 'Dover Strait',         detail: 'Busiest shipping lane in the world — ~500 ships/day',      severity: 'high', extra: { Region: 'NW Europe',        AnnualTransit: '~180,000 ships' } },
    { lat: 45.3,   lng: 36.6,    type: 'chokepoint', label: 'Kerch Strait',         detail: 'Black Sea–Azov Sea, Russia–Ukraine contested',             severity: 'high', extra: { Region: 'Eastern Europe',  AnnualTransit: '~15,000 ships' } },
    { lat: -8.5,   lng: 115.7,   type: 'chokepoint', label: 'Lombok Strait',        detail: 'Malacca alternative, deep-water submarine route',          severity: 'high', extra: { Region: 'Southeast Asia',  AnnualTransit: '~10,000 ships' } },
  ]
}

export function getHotspots(): MeridianPoint[] {
  const raw = [
    { lat: 14,    lng: -1,     label: 'Sahel Region',       detail: 'Jihadist expansion / Wagner presence / coup belt',              esc: 4, extra: { Region: 'West Africa',   Actors: 'JNIM, ISGS, Wagner, AES junta states' } },
    { lat: 18.5,  lng: -72.3,  label: 'Haiti',              detail: 'Gang control ~80% Port-au-Prince, state collapse',              esc: 4, extra: { Region: 'Caribbean',     Status: 'State fragility / gang war' } },
    { lat: 10,    lng: 49,     label: 'Horn of Africa',      detail: 'Somalia / Al-Shabaab / Red Sea Houthi threat spillover',        esc: 3, extra: { Region: 'East Africa',   Actors: 'Al-Shabaab, AMISOM, Ethiopia tensions' } },
    { lat: 31.8,  lng: 69,     label: 'Pak-Afghan Border',  detail: 'TTP cross-border attacks, Pakistan–Afghanistan tensions',       esc: 3, extra: { Region: 'South Asia',    Actors: 'TTP, Pakistani military, Taliban' } },
    { lat: 55.75, lng: 37.6,   label: 'Moscow',             detail: 'Kremlin Activity — war direction, domestic stability',          esc: 4, extra: { Region: 'Russia',        Focus: 'War economy, succession risk' } },
    { lat: 39.9,  lng: 116.4,  label: 'Beijing',            detail: 'PLA posture, Taiwan threat signalling, economic coercion',      esc: 4, extra: { Region: 'China',         Focus: 'Taiwan Strait, Pacific military buildup' } },
    { lat: 50.45, lng: 30.5,   label: 'Kyiv',               detail: 'Ukrainian front — drone war, energy infrastructure attacks',     esc: 5, extra: { Region: 'Ukraine',       Focus: 'Active war, NATO support hub' } },
    { lat: 25.03, lng: 121.5,  label: 'Taipei',             detail: 'Taiwan — PLA encirclement drills, strait tensions',             esc: 5, extra: { Region: 'Taiwan',        Focus: 'Cross-strait deterrence' } },
    { lat: 35.7,  lng: 51.4,   label: 'Tehran',             detail: 'Iran nuclear program, proxy network, US-Israel pressure',       esc: 4, extra: { Region: 'Iran',          Focus: 'Nuclear negotiations, regional proxies' } },
    { lat: 32.1,  lng: 34.8,   label: 'Tel Aviv / Israel',  detail: 'Gaza war management, Hezbollah front, Iran deterrence',         esc: 5, extra: { Region: 'Middle East',   Focus: 'Multi-front conflict management' } },
    { lat: 39.0,  lng: 125.75, label: 'Pyongyang',          detail: 'DPRK missile tests, Russia arms supply, nuclear posture',       esc: 4, extra: { Region: 'North Korea',   Focus: 'Weapons exports, nuclear signalling' } },
    { lat: 50.85, lng: 4.35,   label: 'Brussels / NATO HQ', detail: 'Alliance cohesion, Article 5 credibility, Ukraine support',     esc: 3, extra: { Region: 'Europe',        Focus: 'NATO burden-sharing, eastern flank' } },
    { lat: 10.5,  lng: -66.9,  label: 'Caracas',            detail: 'Maduro consolidation, Essequibo dispute, migration crisis',     esc: 3, extra: { Region: 'Latin America', Focus: 'Venezuela territorial claims, sanctions' } },
  ]
  return raw.map(s => ({
    lat: s.lat, lng: s.lng,
    type: 'hotspot' as const,
    label: s.label, detail: s.detail,
    severity: (s.esc >= 4 ? 'high' : s.esc === 3 ? 'med' : 'low') as MeridianPoint['severity'],
    extra: { ...s.extra, EscalationScore: String(s.esc) },
  }))
}

// ── LIVE FEEDS ───────────────────────────────────────────────────────────────

// Wraps Osiris's own API endpoints — keeps the fetch in one place
const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? ''

export async function fetchOsirisFlights() {
  const r = await fetch(`${BASE}/api/flights`)
  return r.json()
}

export async function fetchOsirisConflicts() {
  const r = await fetch(`${BASE}/api/conflicts`)
  return r.json()
}

export async function fetchOsirisEarthquakes() {
  const r = await fetch(`${BASE}/api/earthquakes`)
  return r.json()
}

export async function fetchOsirisFires() {
  const r = await fetch(`${BASE}/api/fires`)
  return r.json()
}

export async function fetchOsirisSatellites() {
  const r = await fetch(`${BASE}/api/satellites`)
  return r.json()
}

export async function fetchOsirisStats() {
  const r = await fetch(`${BASE}/api/stats`)
  return r.json()
}

// Polymarket — geopolitical prediction markets (not in Osiris core)
const GEO_KEYWORDS = ['war', 'election', 'nuclear', 'ceasefire', 'sanctions', 'conflict', 'treaty', 'crisis', 'military']

export async function fetchPolymarket(): Promise<FeedItem[]> {
  try {
    const r = await fetch('https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=20',
      { signal: AbortSignal.timeout(8000) })
    const d = await r.json()
    const markets: any[] = Array.isArray(d) ? d : (d.markets ?? d.data ?? [])
    return markets
      .filter((m: any) => GEO_KEYWORDS.some(kw => (m.question ?? '').toLowerCase().includes(kw)))
      .map((m: any) => {
        let yesPrice = 0
        try {
          const prices = typeof m.outcomePrices === 'string' ? JSON.parse(m.outcomePrices) : m.outcomePrices
          yesPrice = parseFloat(prices?.[0] ?? 0)
        } catch { /* ignore */ }
        return {
          title: m.question,
          url: `https://polymarket.com/event/${m.slug ?? ''}`,
          source: 'Polymarket',
          category: 'Prediction',
          summary: `${(yesPrice * 100).toFixed(0)}% YES · $${Math.round(parseFloat(m.volume ?? 0)).toLocaleString()} volume`,
        }
      })
  } catch { return [] }
}

// UCDP Georeferenced Events
export async function fetchUCDPFeed(): Promise<FeedItem[]> {
  try {
    const r = await fetch('https://ucdpapi.pcr.uu.se/api/gedevents/23.1?pagesize=30&Year=2024',
      { signal: AbortSignal.timeout(8000) })
    const d = await r.json()
    return (d.Result ?? []).map((item: any) => ({
      title: `${item.conflict_name ?? 'Unknown conflict'} — ${item.country ?? ''}`,
      url: 'https://ucdp.uu.se/',
      source: 'UCDP',
      category: 'Armed Conflict',
      time: item.date_start,
      summary: `Deaths: ${item.deaths_b_best ?? 0} | Type: ${item.type_of_violence ?? '—'}`,
    }))
  } catch { return [] }
}

// Regional Google News RSS (client-side, CORS-friendly)
async function fetchGoogleNewsRSS(rssUrl: string, category: string): Promise<FeedItem[]> {
  try {
    const r = await fetch(rssUrl, { signal: AbortSignal.timeout(10000) })
    const xml = await r.text()
    const doc = new DOMParser().parseFromString(xml, 'application/xml')
    return Array.from(doc.querySelectorAll('item')).slice(0, 25).map(item => {
      const rawTitle = item.querySelector('title')?.textContent?.trim() ?? ''
      const dashIdx = rawTitle.lastIndexOf(' - ')
      const title = dashIdx > 0 ? rawTitle.slice(0, dashIdx) : rawTitle
      const source = dashIdx > 0 ? rawTitle.slice(dashIdx + 3) : 'Google News'
      const link = item.querySelector('link')?.nextSibling?.textContent?.trim()
        ?? item.querySelector('link')?.textContent?.trim() ?? '#'
      return { title, url: link, source, category, time: item.querySelector('pubDate')?.textContent?.trim() }
    }).filter(i => i.title.length > 0)
  } catch { return [] }
}

const GN = 'https://news.google.com/rss'
const NEWS_QUERIES: Record<string, { url: string; label: string }> = {
  world:      { url: `${GN}/search?q=world+news+when:1d&hl=en-US&gl=US&ceid=US:en`,       label: 'World News' },
  us:         { url: `${GN}/search?q=united+states+news+when:1d&hl=en-US&gl=US&ceid=US:en`, label: 'United States' },
  europe:     { url: `${GN}/search?q=europe+news+when:1d&hl=en-US&gl=US&ceid=US:en`,      label: 'Europe' },
  middleeast: { url: `${GN}/search?q=middle+east+news+when:1d&hl=en-US&gl=US&ceid=US:en`, label: 'Middle East' },
  asia:       { url: `${GN}/search?q=asia+news+when:1d&hl=en-US&gl=US&ceid=US:en`,        label: 'Asia-Pacific' },
  africa:     { url: `${GN}/search?q=africa+news+when:1d&hl=en-US&gl=US&ceid=US:en`,      label: 'Africa' },
  latam:      { url: `${GN}/search?q=latin+america+news+when:1d&hl=en-US&gl=US&ceid=US:en`, label: 'Latin America' },
}

export async function fetchRegionalNews(region: string): Promise<FeedItem[]> {
  if (region === 'all') {
    const results = await Promise.allSettled(
      Object.values(NEWS_QUERIES).map(q => fetchGoogleNewsRSS(q.url, q.label))
    )
    const seen = new Set<string>()
    const merged: FeedItem[] = []
    for (const r of results) {
      if (r.status !== 'fulfilled') continue
      for (const item of r.value) {
        const key = item.title.slice(0, 60).toLowerCase()
        if (!seen.has(key)) { seen.add(key); merged.push(item) }
      }
    }
    merged.sort((a, b) => (b.time ? new Date(b.time).getTime() : 0) - (a.time ? new Date(a.time).getTime() : 0))
    return merged
  }
  const q = NEWS_QUERIES[region]
  if (!q) return []
  return fetchGoogleNewsRSS(q.url, q.label)
}

// Utility
export function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const m = Math.floor(ms / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}
