# LOG_ON Pan-African Expansion Intelligence

Status: implementation design v1
Research snapshot: 17 September 2026

## Purpose

Extend the opportunity scanner from opportunity discovery into **market-entry intelligence**. Every material startup, funding, partnership, regulatory, hiring, acquisition, payments or infrastructure signal should be translated into:

`signal -> evidence -> target market -> local constraints -> partner graph -> LOG_ON capability -> action`

The system must answer:

1. What changed?
2. Which country/countries are implicated?
3. What must be true locally for the move to work?
4. What can LOG_ON provide or learn from the signal?
5. Who are the public, relevant people or organizations to approach?

## Signal taxonomy

- FUNDING_ROUND
- DEBT_FACILITY
- GRANT_OR_PRIZE
- MARKET_ENTRY_ANNOUNCEMENT
- COUNTRY_LAUNCH
- PARTNERSHIP
- ACQUISITION
- LICENCE_OR_REGULATION
- PAYMENT_RAIL_EXPANSION
- CROSS_BORDER_INFRASTRUCTURE
- HIRING_EXPANSION
- PROCUREMENT_OR_RFP
- ACCELERATOR_OR_ECOSYSTEM_PROGRAMME
- PRODUCT_LOCALISATION
- CLOUD_OR_DATA_INFRASTRUCTURE
- TRADE_OR_DISTRIBUTION_EXPANSION
- COMPETITOR_MOVE

A single source event may produce multiple derived signals.

## Canonical signal fields

Required fields:

- signal_id
- observed_at
- published_at
- last_material_update_at
- signal_type
- company name, HQ country, sector, stage, website
- origin_country
- target_country / target_city / region
- entry_status
- what_changed / why_now / capital_or_contract_value / growth_intent
- local_partner_requirements
- regulatory_friction
- licences_or_approvals
- customer_support_localisation
- language_localisation
- payment_rails
- fx_or_settlement_constraints
- data_constraints
- tax_or_entity_constraints
- infrastructure_constraints
- implementation_opportunities
- relationship_map
- evidence[]
- scores[]
- next_best_action / deadline / status

## Country intelligence packet

For each supported market maintain a versioned profile containing:

- regulators and official market authorities
- company/entity entry routes
- sector-specific permissions
- payment rails and PSP ecosystem
- mobile-money / instant-payment / card coverage
- FX and settlement constraints
- data-protection and cross-border transfer rules
- tax and invoicing watchpoints
- language and customer-support considerations
- WhatsApp/USSD/SMS/call-centre relevance where evidenced
- local partner patterns
- ecosystem anchors
- current regulatory changes
- cross-border links
- source register

Initial priority markets:

Nigeria, Kenya, Ghana, Rwanda, Uganda, Tanzania, South Africa, Egypt, Morocco, Ethiopia.

## Evidence hierarchy

### Tier 1 — verification

Use for legal, regulatory, licensing, payment, data-protection and official programme claims:

- central banks and payment-system authorities
- national data-protection authorities
- company registries
- tax authorities
- EAC, AfCFTA, Afreximbank, PAPSS
- ministries, investment agencies and official government programmes
- official company/investor announcements

### Tier 2 — high-quality intelligence

- Reuters
- TechCrunch
- Disrupt Africa
- TechCabal
- reputable regional business press
- investor portfolio announcements
- accelerator announcements

### Tier 3 — discovery

- X
- LinkedIn
- founder posts
- job listings
- newsletters and ecosystem chatter

Tier 3 can discover a lead but must not establish a regulatory fact without stronger evidence.

## Scoring

Keep dimensions separate; do not collapse evidence into an opaque single judgement.

```text
evidence_confidence: 0-100
expansion_intent:      0-100
commercial_relevance:  0-100
urgency:               0-100
contactability:        0-100

composite =
  0.25 * evidence_confidence +
  0.20 * expansion_intent +
  0.30 * commercial_relevance +
  0.15 * urgency +
  0.10 * contactability
```

The composite is an internal prioritisation mechanism only.

## Expansion triggers

Create a market-entry investigation when any of the following accompany a material signal:

- explicit named country expansion
- country-specific hiring
- local partnership
- local licence application or approval
- acquisition of a local company
- local office or entity
- new payment corridor
- local-language launch
- local enterprise customer
- distributor or reseller appointment
- government/ESO programme participation
- cloud/data-region deployment

Funding alone is not sufficient for a market-entry conclusion. Vague international-growth language should remain an inference with lower expansion-intent confidence.

## Relationship graph

Do not store contacts as a flat list. Model relationships among:

`COMPANY -> INVESTOR -> COUNTRY -> REGULATOR -> BANK -> PSP -> TELCO -> DATA_PROVIDER -> DISTRIBUTOR -> ECOSYSTEM_OPERATOR -> LOCAL_SERVICE_PROVIDER -> LOG_ON_CAPABILITY`

Each relationship should record:

- organization/person name
- public role
- relationship type
- country
- contact/discovery URL
- source evidence
- last verified date
- confidence

Only publish public contact channels or professional profiles. Do not infer private contact details.

## LOG_ON opportunity translation

Map constraints to concrete services:

| Market constraint | LOG_ON capability | Example deliverable |
|---|---|---|
| New-country entry | Market-entry intelligence | country-entry dossier |
| Regulatory uncertainty | AI governance / compliance | evidence checklist + control map |
| Payment complexity | Automation/integration | PSP/API integration plan + QA |
| Data-transfer risk | AI safety / data governance | data-flow + transfer assessment |
| Local support burden | Customer-service automation | WhatsApp/support workflow |
| Language/local search gap | GEO/SEO | country-language visibility package |
| Partner discovery | Intelligence + growth | local partner map |
| Post-acquisition integration | Automation/data systems | system/customer migration map |
| Cross-border commerce | Agentic workflows | merchant onboarding + support agent |
| New hiring wave | Operational intelligence | implementation-vendor shortlist |

## Country profiles — operating assumptions

### Nigeria

Anchors: CBN, NDPC, CAC, PAPSS.

CBN's Payments System Vision 2028 (published 1 June 2026) explicitly prioritises interoperability, security, inclusion, innovation, trust and collaboration, with stronger cross-border integration. [CBN PSV 2028](https://www.cbn.gov.ng/PaymentsSystem/PSV2028.html)

Research tasks: payment-rail fit, CBN licensing, NDPC data-transfer assessment, CAC entity route, local support and WhatsApp workflows.

### Kenya

Anchors: CBK, ODPC, EAC, major PSP/mobile-money ecosystems.

CBK regulates payment service providers under the National Payment System framework. ODPC registration and cross-border data considerations must be assessed for controllers/processors handling Kenyan resident data. [CBK NPS](https://www.centralbank.go.ke/national-payments-system/) [CBK legislation](https://www.centralbank.go.ke/policy-procedures/legislation-and-guidelines/)

Research tasks: M-PESA/mobile-money vs card/bank fit, PSP authorisation, ODPC registration/transfer safeguards, EAC corridor implications, English/Swahili support.

### Ghana

Anchors: Bank of Ghana, Data Protection Commission, GIPC, GhIPSS.

On 10 September 2026 the Bank of Ghana published updated licensing materials for PSPs; on 17 September 2026 it announced a Payment and Financial Technology Service Provider (PFTSP) category. PFTSP activities include digital product development/support, credit scoring analytics, AML/CFT platforms, fraud management and KYC/CDD services. [BoG licensing](https://www.bog.gov.gh/notice/licensing-and-authorisation-of-payment-service-providers/) [BoG PFTSP](https://www.bog.gov.gh/notice/licensing-of-payment-and-financial-technology-service-providers/) [BoG licence categories](https://www.bog.gov.gh/fintech-innovation/licence-categories/)

Research tasks: foreign-entry structure, Ghanaian ownership requirements where applicable, licensing category fit, partner/SLA requirements and data-protection controls.

### Rwanda

Anchors: BNR, RDB, Rwanda Revenue Authority, EAC.

Research tasks: foreign-company route, payment provider licensing, Law No. 058/2021 data protection requirements, local partner patterns, multilingual support, Rwanda-Tanzania payment connectivity.

### Uganda

Anchors: Bank of Uganda, Personal Data Protection Office, URSB, EAC.

Research tasks: financial-sector licensing, PDPO registration, credit-data permissions, local entity route, post-acquisition integration needs, English/Swahili support.

### Tanzania

Anchors: Bank of Tanzania, Personal Data Protection Commission, TRA, EAC.

Research tasks: payment/e-money requirements, TIPS integration, data protection, Swahili customer operations, local banking/telecom partners.

### South Africa

Anchors: SARB, Information Regulator, FSCA as applicable, payment-system ecosystem.

Research tasks: payment-institution authorisation model, POPIA/cross-border data, financial-services licensing, mature enterprise procurement, AI governance demand.

### Egypt

Anchors: Central Bank of Egypt, GAFI, ITIDA, data-protection authorities.

Research tasks: regulated-finance AI, Arabic/English support, local entity route, international expansion signals, financial-sector partnerships.

### Morocco

Anchors: Bank Al-Maghrib, Ministry of Digital Transition, Tamwilcom, CDG/Mohammed VI Investment Fund.

Research tasks: Arabic/French localisation, startup ecosystem, investment-fund signals, enterprise sales channels and regulated-finance constraints.

### Ethiopia

Anchors: National Bank of Ethiopia, Ethio telecom, Telebirr, licensed payment operators.

Research tasks: payment-instrument licensing, digital-payments strategy, local-language support, telecom/payment ecosystem and foreign-entry requirements.

## Regional infrastructure feeds

### EAC cross-border payments

On 24 August 2026 EAC announced three technical working groups to drive implementation of its Cross-Border Payment System Masterplan. Participants include central banks from EAC Partner States plus World Bank, GIZ, FSD Network and TradeMark Africa. This is a high-value infrastructure trigger for payments, commerce, remittances, logistics and intra-EAC trade. [EAC](https://www.eac.int/press-releases/145-financial-sector/3582-eac-inaugurates-three-technical-working-groups-to-drive-implementation-of-regional-cross-border-payment-system-masterplan)

### PAPSS

Track PAPSS connectivity, participating financial institutions, new corridors and onboarding requirements as a first-class payment-infrastructure feed. [PAPSS](https://papss.com/connect/)

## Current test signals — September 2026

Use these as fixtures for evaluation, not as permanent facts:

1. **Nomba** — Nigeria -> DRC -> Zambia -> Uganda; US$3m debt facility; cross-border payments. Test multi-country payment/regulatory/partner inference.
2. **CreditChek** — Nigeria -> Uganda; acquisition of Algosys; test post-acquisition installed-base and data/integration intelligence.
3. **Flowcart + Mastercard** — Kenya launch with wider African expansion; test payment partnership + country sequencing + merchant-support implications.
4. **ChipMango** — Nigeria -> Rwanda and international expansion; US$1.9m seed; test education/hardware/AI-infrastructure ecosystem mapping.
5. **Synapse Analytics** — Egypt; US$13m Series A; international reach; test regulated-AI market-entry and governance mapping.
6. **Madica** — first portfolio investments in Algeria and Cameroon; test ecosystem-expansion and follow-on monitoring.

## Daily pipeline

1. Discover new events from web and social sources.
2. Normalize company, geography, sector, stage and event type.
3. Deduplicate against prior signals using company + event + market + material-update hash.
4. Verify material claims with Tier 1/2 sources.
5. Resolve target market and expansion intent.
6. Load country profile.
7. Enrich regulatory, payment, data, language and partner requirements.
8. Generate LOG_ON capability matches.
9. Build relationship graph nodes.
10. Score evidence, intent, commercial relevance, urgency and contactability.
11. Produce 3-8 action-oriented records for the daily briefing.
12. Persist evidence and last-verified timestamps.

## Output contract

Each surfaced signal should contain:

**Headline**

**What changed**

**Country/sector**

**Funding/stage**

**Local partner requirements**

**Regulatory friction**

**Customer-support localisation**

**Payment + data constraints**

**Implementation opportunity for LOG_ON**

**Potential referral/partnership contacts**

**Why now**

**Evidence**

**Next action**

## Guardrails

- Never convert a funding event into a certainty of expansion without evidence.
- Clearly separate sourced facts from inference.
- Never invent regulators, partners, contact names or licence requirements.
- Regulatory claims require primary evidence whenever possible.
- Country profiles are versioned; stale regulatory data must be marked stale.
- Social discovery is not sufficient for legal conclusions.
- Contact information must be public and professionally relevant.
- Keep the system auditable: every enriched field should have source provenance where factual.
