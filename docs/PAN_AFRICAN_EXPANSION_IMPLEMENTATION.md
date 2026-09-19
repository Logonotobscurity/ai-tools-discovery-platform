# Pan-African Expansion Intelligence — Implementation Notes

Status: feature branch / PR #2

## Runtime surfaces

| Surface | Purpose |
|---|---|
| `/pan-african` | Operator dashboard for expansion signals, country radar, evidence, constraints and referral paths |
| `GET /api/pan-african` | Returns the normalized fixture queue for development/demo validation |
| `POST /api/pan-african` | Ingestion boundary for the opportunity scanner |
| `EXPANSION_INGEST_SECRET` | Bearer secret protecting ingestion |
| `lib/panAfricanExpansionIntelligence.ts` | Canonical types, evidence checks, scoring and stable dedupe |
| `lib/panAfricanExpansionService.ts` | Queue construction, opportunity translation and country radar |
| `lib/panAfricanCountryProfiles.ts` | Country verification anchors and research tracks |
| `database/pan_african_expansion.sql` | PostgreSQL/Supabase persistence model |

## Scanner integration contract

The daily scanner should produce a JSON object:

```json
{
  "signals": [
    {
      "signalId": "stable-id",
      "observedAt": "2026-09-19T00:00:00.000Z",
      "publishedAt": "2026-09-18T00:00:00.000Z",
      "lastMaterialUpdateAt": "2026-09-18T00:00:00.000Z",
      "signalType": "PARTNERSHIP",
      "company": {
        "name": "Example",
        "hqCountry": "Nigeria",
        "sector": "Fintech",
        "subsector": "Payments",
        "stage": "Growth"
      },
      "markets": [],
      "whatChanged": "Concrete event description.",
      "entryStatus": "partnered",
      "constraints": [],
      "evidence": [],
      "relationships": []
    }
  ]
}
```

The ingestion endpoint should reject empty payloads, missing evidence, missing target-market structure, malformed relationship/constraint arrays and weak regulator evidence.

## Scoring semantics

The visible queue score is composed from five explainable dimensions:

- evidence confidence — source strength and corroboration
- expansion intent — explicit country/move evidence
- commercial relevance — connection to a sellable implementation need
- urgency — recency of the material signal
- contactability — confidence and availability of a public relationship path

A material update should change the existing signal/version rather than create a second active queue record. `stableSignalKey` is therefore persistent; `signalVersionKey` is the history/version key.

## Current test set

The dashboard currently ships with four development fixtures:

- Flowcart + Mastercard: Kenya launch and wider African payment expansion.
- CreditChek + Algosys: Uganda acquisition and post-acquisition integration.
- Nomba: DRC cross-border payments infrastructure and financing.
- ChipMango: Africa-wide engineering/edge-AI capacity expansion with Rwanda treated as an inferred market lead rather than a confirmed country launch.

These fixtures are for evaluation and UI verification. They are not a permanent replacement for live source ingestion.

## Production gap after PR #2

The application still needs a persistence adapter wired to the Supabase/PostgreSQL schema and a scanner transport that actually POSTs normalized signals. The current PR deliberately stops at the verified application boundary rather than pretending those external runtime connections already exist.
