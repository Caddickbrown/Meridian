# Meridian

> Globe intelligence dashboard. Built on [Osiris](https://github.com/simplifaisoul/osiris) (MIT).

Real-time global monitoring — flights, maritime, satellites, conflicts, earthquakes, fires, cyber threats — plus a curated static intel layer of military bases, chokepoints, hotspots, and geopolitical prediction markets.

---

## What's different from Osiris

Osiris provides the engine: MapLibre GL renderer, 57 normalised API endpoints, live feeds. Meridian adds:

| Layer | Where |
|-------|-------|
| Military bases (US/NATO, Russia, China, UK, France) | `src/lib/meridian-data.ts` |
| Strategic chokepoints (13 global) | `src/lib/meridian-data.ts` |
| Political hotspots with escalation scores | `src/lib/meridian-data.ts` |
| Active conflict zones | `src/lib/meridian-data.ts` |
| Polymarket geopolitical prediction markets | `src/lib/meridian-data.ts` |
| UCDP conflict event feed | `src/lib/meridian-data.ts` |
| Regional Google News RSS | `src/lib/meridian-data.ts` |
| Agent layer (Patchwork, health/fitness domain specialists) | `src/agents/` *(TODO)* |

All Osiris API routes are inherited unchanged at `/api/*`.

---

## Quick start

```bash
npm install
cp .env.example .env      # optional — all core features work without keys
npm run dev               # → http://localhost:3000
```

**Docker:**
```bash
cp .env.example .env
docker compose up -d
```

See `DOCKER.md` for details.

---

## Osiris API (inherited, no changes)

57 endpoints, no keys required for core feeds:

```bash
curl http://localhost:3000/api/stats       # aggregate counters
curl http://localhost:3000/api/flights     # live ADS-B aircraft
curl http://localhost:3000/api/conflicts   # active conflict zones
curl http://localhost:3000/api/earthquakes # USGS seismic events
curl http://localhost:3000/api/fires       # NASA FIRMS wildfires
curl http://localhost:3000/api/satellites  # TLE-derived orbital positions
curl http://localhost:3000/api/maritime    # AIS vessel tracking
```

Full docs at `/docs` when running locally, or [osirisai.live/docs](https://www.osirisai.live/docs).

---

## Meridian data layer

```typescript
import {
  getConflictZones,
  getMilitaryBases,
  getChokepoints,
  getHotspots,
  fetchPolymarket,
  fetchUCDPFeed,
  fetchRegionalNews,
  // Osiris API wrappers:
  fetchOsirisFlights,
  fetchOsirisConflicts,
  fetchOsirisStats,
} from '@/lib/meridian-data'
```

---

## Agent layer *(planned)*

Domain-specialist agents that consume the intel feeds and post to the Forum:

- **World Monitor** — conflict escalation alerts, chokepoint disruptions
- **Patchwork** — Patchwork business intel, territory activity
- **Health** — outbreak tracking, displacement feeds

Reversibility rule: reversible actions = act alone. Irreversible (send/publish/spend/delete) = ask first.

---

## Credits

Built on [Osiris](https://github.com/simplifaisoul/osiris) by [@soulsimplifai](https://x.com/soulsimplifai). MIT licence.
