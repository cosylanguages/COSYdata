# COSYdata Home Topic Audit Report (`vocabulary/en`)

## Executive Summary
An exhaustive audit of the **Home / Housing** topic in `vocabulary/en` was conducted across all 30 dedicated files under `vocabulary/en/<level>/home/` (totaling **298 entries**) as well as non-home files across levels A0 through B2.

### Summary Statistics
- **Total entries in `/home/` files audited**: 298
- **Flagged non-home entries in `/home/` files**: 89 (entries belonging to transit, aviation, driving, general services, urban policy, or non-housing general adjectives/verbs)
- **Home entries identified outside `/home/`**: 11
- **Regional variants identified/flagged**: 15
- **Missing essential Home vocabulary items identified**: 13 of 20 checked concepts
- **Total entries in proposed mapping table**: 309

---

## Task 1: Flagged Non-Home Entries in `/home/` Files
The following **89 entries** reside inside `vocabulary/en/<level>/home/` files but are not about homes, rooms, furniture, appliances, household objects, building parts, utilities, smart-home devices, or residential housing transactions. Each entry is listed with a concise one-line explanation.

| Current ID | Word | Current File | Flag Reason / Justification |
| --- | --- | --- | --- |
| `en:clean:adjective` | **clean** | `vocabulary/en/a0/home/furniture/general.json` | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:cup:noun` | **cup** | `vocabulary/en/a0/home/furniture/general.json` | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:dirty:adjective` | **dirty** | `vocabulary/en/a0/home/furniture/general.json` | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:adjusted:adjective` | **adjusted** | `vocabulary/en/a2/home/furniture/general.json` | General descriptor adjective, not specific to home structure, room, furniture, or appliance. |
| `en:bind:verb` | **bind** | `vocabulary/en/a2/home/furniture/general.json` | General action verb meaning to tie or fasten, not a home structure, furniture, or utility concept. |
| `en:noisy:noun` | **noisy** | `vocabulary/en/a2/home/rooms.json` | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:out:noun` | **out** | `vocabulary/en/a2/home/rooms.json` | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:own:verb` | **own** | `vocabulary/en/a2/home/rooms.json` | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:place-of-birth:noun` | **place of birth** | `vocabulary/en/a2/home/rooms.json` | Administrative personal identity metadata, not home structure or household object. |
| `en:postcode:noun` | **postcode** | `vocabulary/en/a2/home/rooms.json` | Administrative personal identity metadata, not home structure or household object. |
| `en:quiet:noun` | **quiet** | `vocabulary/en/a2/home/rooms.json` | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:survive:verb` | **survive** | `vocabulary/en/a2/home/rooms.json` | General action verb, not specific to housing or home environment. |
| `en:alternative-route:noun` | **alternative route** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:bike-lane:noun` | **bike lane** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:boarding-priority:noun` | **boarding priority** | `vocabulary/en/b1/home/furniture/general.json` | Airline boarding procedure concept belonging to aviation/travel. |
| `en:breakdown-assistance:noun` | **breakdown assistance** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:breakdown:noun` | **breakdown** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:budget-carrier:noun` | **budget carrier** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:checked-in-luggage:noun` | **checked-in luggage** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:commute-time:noun` | **commute time** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:commute:verb` | **commute** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:concierge-service:noun` | **concierge service** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:conductor:noun` | **conductor** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:courier-service:noun` | **courier service** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:driving-test:noun` | **driving test** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:e-gate:noun` | **e-gate** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:emergency-landing:noun` | **emergency landing** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:excess-mileage:noun` | **excess mileage** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:expiration:noun` | **expiration** | `vocabulary/en/b1/home/furniture/general.json` | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:fire:noun` | **fire** | `vocabulary/en/b1/home/furniture/general.json` | General hazard noun placed under furniture/general; should be categorized under fireplace/heating or safety sub-theme. |
| `en:fixed-itinerary:noun` | **fixed itinerary** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:flexible-itinerary:noun` | **flexible itinerary** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:frequent-flyer:noun` | **frequent flyer** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:gentrification:noun` | **gentrification** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:infrastructure:noun` | **infrastructure** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:interrail:noun` | **interrail** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:overhead-compartment:noun` | **overhead compartment** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:oversized-baggage:noun` | **oversized baggage** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:personalized-service:noun` | **personalized service** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:pre-boarding:noun` | **pre-boarding** | `vocabulary/en/b1/home/furniture/general.json` | Airline boarding procedure concept belonging to aviation/travel. |
| `en:prohibited-items:noun` | **prohibited items** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:public-transit-system:noun` | **public transit system** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:rebooking-fee:noun` | **rebooking fee** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:regeneration:noun` | **regeneration** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:registration:noun` | **registration** | `vocabulary/en/b1/home/furniture/general.json` | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:restricted-items:noun` | **restricted items** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:ride-sharing:noun` | **ride-sharing** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:roadside-assistance:noun` | **roadside assistance** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:route-planning:noun` | **route planning** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:service-disruption:noun` | **service disruption** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:sleeper-train:noun` | **sleeper train** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:special-meal-request:noun` | **special meal request** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:standby-list:noun` | **standby list** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:stopover:noun` | **stopover** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:technical-delay:noun` | **technical delay** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:toll:noun` | **toll** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:transit:noun` | **transit** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:upgrade-voucher:noun` | **upgrade voucher** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:urbanisation:noun` | **urbanisation** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:urbanization:noun` | **urbanization** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:vehicle-registration:noun` | **vehicle registration** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:weather-delay:noun` | **weather delay** | `vocabulary/en/b1/home/furniture/general.json` | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:zoning:noun` | **zoning** | `vocabulary/en/b1/home/furniture/general.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:room-mix-up:noun` | **room mix-up** | `vocabulary/en/b1/home/rooms.json` | Hotel and hospitality reservation error, not a residential room term. |
| `en:commuter-belt:noun` | **commuter belt** | `vocabulary/en/b2/home/furniture/general.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:holding-pattern:noun` | **holding pattern** | `vocabulary/en/b2/home/furniture/general.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:regulation:noun` | **regulation** | `vocabulary/en/b2/home/furniture/general.json` | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:biometric-passport:noun` | **biometric passport** | `vocabulary/en/b2/home/homes.json` | Travel and identity document, entirely unrelated to home or housing. |
| `en:cabin-pressure:noun` | **cabin pressure** | `vocabulary/en/b2/home/homes.json` | Aviation physics phenomenon inside aircraft, not a residential home term. |
| `en:civic:adjective` | **civic** | `vocabulary/en/b2/home/homes.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:commuter:noun` | **commuter** | `vocabulary/en/b2/home/homes.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:congestion-charge:noun` | **congestion charge** | `vocabulary/en/b2/home/homes.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:congestion:noun` | **congestion** | `vocabulary/en/b2/home/homes.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:couchette:noun` | **couchette** | `vocabulary/en/b2/home/homes.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:denied-boarding:noun` | **denied boarding** | `vocabulary/en/b2/home/homes.json` | Airline boarding procedure concept belonging to aviation/travel. |
| `en:diversion:noun` | **diversion** | `vocabulary/en/b2/home/homes.json` | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:frequent-flyer-status:noun` | **frequent flyer status** | `vocabulary/en/b2/home/homes.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:legacy-carrier:noun` | **legacy carrier** | `vocabulary/en/b2/home/homes.json` | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:municipal:adjective` | **municipal** | `vocabulary/en/b2/home/homes.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:overpopulation:noun` | **overpopulation** | `vocabulary/en/b2/home/homes.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:planning:noun` | **planning** | `vocabulary/en/b2/home/homes.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:provider:noun` | **provider** | `vocabulary/en/b2/home/homes.json` | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:smart:noun` | **smart** | `vocabulary/en/b2/home/homes.json` | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:sprawl:noun` | **sprawl** | `vocabulary/en/b2/home/homes.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:urban-planning:noun` | **urban planning** | `vocabulary/en/b2/home/homes.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:urban:noun` | **urban** | `vocabulary/en/b2/home/homes.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:use:noun` | **use** | `vocabulary/en/b2/home/homes.json` | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:walkability:noun` | **walkability** | `vocabulary/en/b2/home/homes.json` | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:food-desert:noun` | **food desert** | `vocabulary/en/b2/home/rooms.json` | Sociological/geographical term for areas lacking fresh food options, not a residential room or home concept. |

---

## Task 2: Home Entries Residing Outside `/home/` Files
The following terms belong to the Home / Housing domain but currently reside in other directories such as `objects.json`, `general.json`, `tourism.json`, `nature.json`, or `places_transport.json`.

| Entry ID | Word | Current File | Proposed Owner File | Audit Findings & Notes |
| --- | --- | --- | --- | --- |
| `en:blanket:noun` | **blanket** | `vocabulary/en/a0_a1/objects.json` | `vocabulary/en/a0_a1/home/furniture/bedroom.json` | Essential household bedding item currently categorized under general objects. |
| `en:broom:noun` | **broom** | `vocabulary/en/a0_a1/objects.json` | `vocabulary/en/a0_a1/home/furniture/utility_laundry.json` | Household cleaning tool currently categorized under personal/general objects. |
| `en:bucket:noun` | **bucket** | `vocabulary/en/a0_a1/objects.json` | `vocabulary/en/a0_a1/home/furniture/utility_laundry.json` | Household cleaning container currently categorized under general objects. |
| `en:alarm-clock:noun` | **alarm clock** | `vocabulary/en/a2/objects.json` | `vocabulary/en/a2/home/furniture/bedroom.json` | Bedroom clock/fixture currently categorized under general objects. |
| `en:coat-rack:noun` | **coat rack** | `vocabulary/en/a2/general.json` | `vocabulary/en/a2/home/furniture/general.json` | Hallway/entryway furniture piece currently in general.json. |
| `en:cabin:noun` | **cabin** | `vocabulary/en/a2/tourism.json` | `vocabulary/en/a2/home/homes.json` | Residential building type (rustic timber home) currently categorized under tourism. |
| `en:castle:noun` | **castle** | `vocabulary/en/a2/tourism.json` | `vocabulary/en/a2/home/homes.json` | Historic residential building type currently categorized under tourism. |
| `en:block-of-flats:noun` | **block of flats** | `vocabulary/en/a0_a1/places_transport.json` | `vocabulary/en/a0_a1/home/homes.json` | Multi-family residential building concept currently in places_transport.json. |
| `en:dustbin:noun` | **dustbin** | `vocabulary/en/a2/general.json` | `vocabulary/en/a2/home/furniture/utility_laundry.json` | Household waste receptacle currently in general.json. |
| `en:recycling-bin:noun` | **recycling bin** | `vocabulary/en/a2/nature.json` | `vocabulary/en/a2/home/furniture/utility_laundry.json` | Household waste sorting receptacle currently in nature.json. |
| `en:dresser:noun` | **dresser** | `vocabulary/en/a2/general.json` | `vocabulary/en/a2/home/furniture/bedroom.json` | Bedroom furniture piece currently in general.json. |

---

## Task 3: Duplicates & Near-Duplicates Analysis
The following duplicate and near-duplicate terms were identified across the vocabulary files. Proposed canonical owner files are specified for each.

### 1. Concept: apartment / flat / apartment-building / block-of-flats

| ID | Word | Current File | Region | Proposed Canonical Owner File |
| --- | --- | --- | --- | --- |
| `en:apartment:noun` | **apartment** | `vocabulary/en/a0/home/homes.json` | US | `vocabulary/en/a0_a1/home/homes.json` |
| `en:flat:noun` | **flat** | `vocabulary/en/a0/home/homes.json` | UK | `vocabulary/en/a0_a1/home/homes.json` |
| `en:apartment-building:noun` | **apartment building** | `vocabulary/en/a2/home/homes.json` | US | `vocabulary/en/a2/home/homes.json` |
| `en:block-of-flats:noun` | **block of flats** | `vocabulary/en/a0_a1/places_transport.json` | UK | `vocabulary/en/a0_a1/home/homes.json` |

**Proposal / Action**: Co-locate residential building synonyms under vocabulary/en/<level>/home/homes.json, establishing regional links between US (apartment, apartment building) and UK (flat, block of flats) equivalents.

### 2. Concept: bath / bathtub

| ID | Word | Current File | Region | Proposed Canonical Owner File |
| --- | --- | --- | --- | --- |
| `en:bath:noun` | **bath** | `vocabulary/en/a0/home/furniture/bathroom.json` | UK/general | `vocabulary/en/a0_a1/home/furniture/bathroom.json` |
| `en:bathtub:noun` | **bathtub** | `vocabulary/en/a1/home/furniture/bathroom.json` | US | `vocabulary/en/a0_a1/home/furniture/bathroom.json` |

**Proposal / Action**: Keep both entries in vocabulary/en/a0_a1/home/furniture/bathroom.json, adding regional_equivalents cross-references.

### 3. Concept: trash can / bin / dustbin / recycling bin

| ID | Word | Current File | Region | Proposed Canonical Owner File |
| --- | --- | --- | --- | --- |
| `en:dustbin:noun` | **dustbin** | `vocabulary/en/a2/general.json` | UK | `vocabulary/en/a2/home/furniture/utility_laundry.json` |
| `en:recycling-bin:noun` | **recycling bin** | `vocabulary/en/a2/nature.json` | neutral | `vocabulary/en/a2/home/furniture/utility_laundry.json` |

**Proposal / Action**: Move household waste receptacles into vocabulary/en/<level>/home/furniture/utility_laundry.json and link UK (dustbin) with US (trash can).

### 4. Concept: lease (noun vs verb) & rent (noun vs verb)

| ID | Word | Current File | Region | Proposed Canonical Owner File |
| --- | --- | --- | --- | --- |
| `en:rent:noun` | **rent** | `vocabulary/en/a2/home/rooms.json` | neutral | `vocabulary/en/a2/home/homes.json` |
| `en:rent:verb` | **rent** | `vocabulary/en/a2/home/rooms.json` | neutral | `vocabulary/en/a2/home/homes.json` |
| `en:lease:verb` | **lease** | `vocabulary/en/a2/home/rooms.json` | neutral | `vocabulary/en/a2/home/homes.json` |
| `en:lease:noun` | **lease** | `vocabulary/en/b1/home/furniture/general.json` | neutral | `vocabulary/en/b1/home/homes.json` |

**Proposal / Action**: Consolidate tenancy transaction terms (lease, rent) into home/homes.json under housing transactions.

---

## Task 4: Unmarked Regional Variants
The following terms represent regional variants (US vs. UK English) in the Home domain that require region tagging (`region: ["US"]` or `region: ["UK"]`) and bilateral `regional_equivalents` links.

| ID | Word | Current File | Region | Regional Equivalent Term |
| --- | --- | --- | --- | --- |
| `en:closet:noun` | **closet** | `vocabulary/en/a1/home/furniture/bedroom.json` | **US** | en:wardrobe:noun (UK) |
| `en:wardrobe:noun` | **wardrobe** | `vocabulary/en/a1/home/furniture/bedroom.json` | **UK** | en:closet:noun (US) |
| `en:couch:noun` | **couch** | `vocabulary/en/a1/home/furniture/living_room.json` | **US** | en:sofa:noun (neutral/UK) |
| `en:sofa:noun` | **sofa** | `vocabulary/en/a0/home/furniture/living_room.json` | **neutral/UK** | en:couch:noun (US) |
| `en:faucet:noun` | **faucet** | `vocabulary/en/a1/home/furniture/general.json` | **US** | en:tap:noun (UK) |
| `en:tap:noun` | **tap** | `vocabulary/en/a1/home/furniture/general.json` | **UK** | en:faucet:noun (US) |
| `en:cooker:noun` | **cooker** | `vocabulary/en/a1/home/furniture/kitchen.json` | **UK** | en:stove:noun (US) |
| `en:stove:noun` | **stove** | `vocabulary/en/a1/home/furniture/kitchen.json` | **US** | en:cooker:noun (UK) |
| `en:apartment:noun` | **apartment** | `vocabulary/en/a0/home/homes.json` | **US** | en:flat:noun (UK) |
| `en:flat:noun` | **flat** | `vocabulary/en/a0/home/homes.json` | **UK** | en:apartment:noun (US) |
| `en:yard:noun` | **yard** | `vocabulary/en/a2/home/rooms.json` | **US** | en:garden:noun (UK) |
| `en:garden:noun` | **garden** | `vocabulary/en/a0/home/rooms.json` | **UK** | en:yard:noun (US) |
| `en:elevator:noun` | **elevator** | `vocabulary/en/a2/home/rooms.json` | **US** | lift:noun (UK - missing) |
| `en:dustbin:noun` | **dustbin** | `vocabulary/en/a2/general.json` | **UK** | trash can (US - missing) |
| `en:dresser:noun` | **dresser** | `vocabulary/en/a2/general.json` | **US** | chest of drawers (UK - missing) |

---

## Task 5: Level Discrepancies & CEFR Level Alignments

### 1. Focus Terms: bed, chair, table, sofa, desk, apartment, flat, home, house, bathroom, bedroom, dining room, kitchen, living room, room
- **Issue Identified**: Split across separate `a0` subfolder (`vocabulary/en/a0/home/`) vs standard `vocabulary/en/a0_a1/` or `vocabulary/en/a1/home/`.
- **CEFR Recommendation**: Consolidate `a0` and `a1` home subdirectories into unified `vocabulary/en/a0_a1/home/` structure with `levels: ["A0", "A1"]` property.

### 2. Focus Terms: ceiling, floor, wall, door, window, roof
- **Issue Identified**: Ceiling is in `a1/home/rooms.json`, while roof, wall, door, window, floor appear in `a0_a1/` or `a1/` across different files.
- **CEFR Recommendation**: Place basic structural room/building parts in `vocabulary/en/a0_a1/home/rooms.json` or `vocabulary/en/a0_a1/home/homes.json` consistently at A1 level.

### 3. Focus Terms: lease, rent, suburb
- **Issue Identified**: `lease:verb` and `rent:noun` are in `a2/home/rooms.json`, while `lease:noun` is in `b1/home/furniture/general.json` with `levels: ["A2", "B1"]`.
- **CEFR Recommendation**: Harmonize level tagging to A2/B1 across noun/verb forms in `home/homes.json`.

### 4. Focus Terms: furniture general B1/B2 flood
- **Issue Identified**: 86 terms in B1 and 7 terms in B2 in `home/furniture/general.json` are mostly travel/transit/urban planning terms erroneously assigned to Home B1/B2.
- **CEFR Recommendation**: Re-level or re-home non-furniture items to their respective non-home domains, leaving true Home B1/B2 vocabulary (e.g. `insulation`, `electrical wiring`, `ventilation`, `tenancy agreement`).

---

## Task 6: Audit of Common Home Vocabulary
Checking presence or absence of standard beginner and intermediate Home vocabulary items:

| Term | Status in COSYdata | Audit Finding & Action Recommendation |
| --- | --- | --- |
| **bedside table** | missing | Add to `vocabulary/en/a1/home/furniture/bedroom.json` (A1). |
| **bunk bed** | missing | Add to `vocabulary/en/a2/home/furniture/bedroom.json` (A2). |
| **bookshelf** | missing | Add to `vocabulary/en/a1/home/furniture/living_room.json` (A1). |
| **bin** | missing (only dustbin / recycling bin exist) | Add generic `bin` (UK) to `vocabulary/en/a1/home/furniture/general.json` (A1). |
| **bench** | missing in Home (only benchmark exists) | Add `bench` to `vocabulary/en/a2/home/furniture/outdoor_garden.json` (A2). |
| **boiler** | missing | Add to `vocabulary/en/a2/home/furniture/utility_laundry.json` (A2). |
| **bungalow** | missing | Add to `vocabulary/en/a2/home/homes.json` (A2). |
| **chalet** | missing | Add to `vocabulary/en/b1/home/homes.json` (B1). |
| **chimney** | missing | Add to `vocabulary/en/a2/home/homes.json` (A2). |
| **chest of drawers** | missing | Add to `vocabulary/en/a1/home/furniture/bedroom.json` (A1, UK equivalent of dresser). |
| **coffee table** | missing | Add to `vocabulary/en/a1/home/furniture/living_room.json` (A1). |
| **coffee maker** | missing | Add to `vocabulary/en/a2/home/furniture/kitchen.json` (A2). |
| **wardrobe** | present (`en:wardrobe:noun` in `vocabulary/en/a1/home/furniture/bedroom.json`) | Keep; add explicit regional mapping to `closet`. |
| **cooker** | present (`en:cooker:noun` in `vocabulary/en/a1/home/furniture/kitchen.json`) | Keep; add explicit regional mapping to `stove`. |
| **dishwasher** | present (`en:dishwasher:noun` in `vocabulary/en/a2/home/furniture/kitchen.json`) | Keep. |
| **curtain** | present (`en:curtain:noun` in `vocabulary/en/a1/home/homes.json`) | Move from `home/homes.json` to `home/furniture/living_room.json` or `bedroom.json`. |
| **cupboard** | present (`en:cupboard:noun` in `vocabulary/en/a1/home/furniture/kitchen.json`) | Keep. |
| **flat** | present (`en:flat:noun` in `vocabulary/en/a0/home/homes.json`) | Keep; add explicit regional mapping to `apartment`. |
| **lift** | missing as noun in Home (`en:lift:verb` exists in `daily_verbs.json`) | Add `lift:noun` (UK) to `vocabulary/en/a2/home/rooms.json` as regional equivalent of `elevator`. |
| **tap** | present (`en:tap:noun` in `vocabulary/en/a1/home/furniture/general.json`) | Keep; move to `bathroom.json`/`kitchen.json` and map to `faucet`. |

---

## Task 7: Complete Proposed Mapping Table
The table below maps all **309 entries** (current home entries + external home entries) to their proposed primary `theme`, `sub_theme`, `room`, canonical `owner file`, and recommended `action` (`keep` / `move` / `move_and_retheme` / `tag-region`).

| Current ID | Word | Current File | Proposed Theme | Proposed Sub-Theme | Room | Proposed Owner File | Proposed Action | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `en:shower:noun` | **shower** | `vocabulary/en/a0/home/furniture/bathroom.json` | `housing` | `furniture` | `bathroom` | `vocabulary/en/a0_a1/home/furniture/bathroom.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:toilet:noun` | **toilet** | `vocabulary/en/a0/home/furniture/bathroom.json` | `housing` | `furniture` | `bathroom` | `vocabulary/en/a0_a1/home/furniture/bathroom.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:bed:noun` | **bed** | `vocabulary/en/a0/home/furniture/bedroom.json` | `housing` | `furniture` | `bedroom` | `vocabulary/en/a0_a1/home/furniture/bedroom.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:chair:noun` | **chair** | `vocabulary/en/a0/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/furniture/general.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:clean:adjective` | **clean** | `vocabulary/en/a0/home/furniture/general.json` | `descriptors` | `general` | `none` | `vocabulary/en/a2/general_adjectives.json` | **move_and_retheme** | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:clock:noun` | **clock** | `vocabulary/en/a0/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/furniture/general.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:cup:noun` | **cup** | `vocabulary/en/a0/home/furniture/general.json` | `food_drink` | `tableware` | `none` | `vocabulary/en/a0_a1/food_drink.json` | **move_and_retheme** | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:dirty:adjective` | **dirty** | `vocabulary/en/a0/home/furniture/general.json` | `descriptors` | `general` | `none` | `vocabulary/en/a2/general_adjectives.json` | **move_and_retheme** | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:kitchen:noun` | **kitchen** | `vocabulary/en/a0/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/furniture/general.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:lamp:noun` | **lamp** | `vocabulary/en/a0/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/furniture/general.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:table:noun` | **table** | `vocabulary/en/a0/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/furniture/general.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:sofa:noun` | **sofa** | `vocabulary/en/a0/home/furniture/living_room.json` | `housing` | `furniture` | `living_room` | `vocabulary/en/a0_a1/home/furniture/living_room.json` | **tag-region** | Tag region: UK and cross-reference US equivalent. |
| `en:desk:noun` | **desk** | `vocabulary/en/a0/home/furniture/office.json` | `housing` | `furniture` | `office` | `vocabulary/en/a0_a1/home/furniture/office.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:apartment:noun` | **apartment** | `vocabulary/en/a0/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/a0_a1/home/homes.json` | **tag-region** | Tag region: US and cross-reference UK equivalent. |
| `en:flat:noun` | **flat** | `vocabulary/en/a0/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/a0_a1/home/homes.json` | **tag-region** | Tag region: UK and cross-reference US equivalent. |
| `en:home:noun` | **home** | `vocabulary/en/a0/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/a0_a1/home/homes.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:house:noun` | **house** | `vocabulary/en/a0/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/a0_a1/home/homes.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:bathroom:noun` | **bathroom** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:bedroom:noun` | **bedroom** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:dining-room:noun` | **dining room** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:door:noun` | **door** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:floor:noun` | **floor** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:garden:noun` | **garden** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **tag-region** | Tag region: UK and cross-reference US equivalent. |
| `en:room:noun` | **room** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:wall:noun` | **wall** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:window:noun` | **window** | `vocabulary/en/a0/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a0_a1/home/rooms.json` | **move** | Consolidate from legacy a0/ directory to standard a0_a1/ directory structure. |
| `en:bathtub:noun` | **bathtub** | `vocabulary/en/a1/home/furniture/bathroom.json` | `housing` | `furniture` | `bathroom` | `vocabulary/en/a1/home/furniture/bathroom.json` | **keep** | Valid Home/Housing topic entry. |
| `en:closet:noun` | **closet** | `vocabulary/en/a1/home/furniture/bedroom.json` | `housing` | `furniture` | `bedroom` | `vocabulary/en/a1/home/furniture/bedroom.json` | **tag-region** | Tag region: US and cross-reference UK equivalent. |
| `en:wardrobe:noun` | **wardrobe** | `vocabulary/en/a1/home/furniture/bedroom.json` | `housing` | `furniture` | `bedroom` | `vocabulary/en/a1/home/furniture/bedroom.json` | **tag-region** | Tag region: UK and cross-reference US equivalent. |
| `en:bowl:noun` | **bowl** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:carpet:noun` | **carpet** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:cleaning:noun` | **cleaning** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:dining:noun` | **dining** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:faucet:noun` | **faucet** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **tag-region** | Tag region: US and cross-reference UK equivalent. |
| `en:fire-alarm:noun` | **fire alarm** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:fork:noun` | **fork** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:freezer:noun` | **freezer** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:glass:noun` | **glass** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:key:noun` | **key** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:light:verb` | **light** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:living:noun` | **living** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:lock:noun` | **lock** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:machine:noun` | **machine** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:messy:noun` | **messy** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:moving:noun` | **moving** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:napkin:noun` | **napkin** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:pan:noun` | **pan** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:plate:noun` | **plate** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:pot:noun` | **pot** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:rug:noun` | **rug** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:seat:noun` | **seat** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:shelf:noun` | **shelf** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:sink:noun` | **sink** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:soap:noun` | **soap** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:spoon:noun` | **spoon** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:tap:noun` | **tap** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **tag-region** | Tag region: UK and cross-reference US equivalent. |
| `en:tidy:adjective` | **tidy** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:toothbrush:noun` | **toothbrush** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:washing:noun` | **washing** | `vocabulary/en/a1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:cooker:noun` | **cooker** | `vocabulary/en/a1/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a1/home/furniture/kitchen.json` | **tag-region** | Tag region: UK and cross-reference US equivalent. |
| `en:cupboard:noun` | **cupboard** | `vocabulary/en/a1/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a1/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:fridge:noun` | **fridge** | `vocabulary/en/a1/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a1/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:microwave:noun` | **microwave** | `vocabulary/en/a1/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a1/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:oven:noun` | **oven** | `vocabulary/en/a1/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a1/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:refrigerator:noun` | **refrigerator** | `vocabulary/en/a1/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a1/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:stove:noun` | **stove** | `vocabulary/en/a1/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a1/home/furniture/kitchen.json` | **tag-region** | Tag region: US and cross-reference UK equivalent. |
| `en:couch:noun` | **couch** | `vocabulary/en/a1/home/furniture/living_room.json` | `housing` | `furniture` | `living_room` | `vocabulary/en/a1/home/furniture/living_room.json` | **tag-region** | Tag region: US and cross-reference UK equivalent. |
| `en:apartment-building:noun` | **apartment building** | `vocabulary/en/a1/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/a1/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:building:noun` | **building** | `vocabulary/en/a1/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/a1/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:curtain:noun` | **curtain** | `vocabulary/en/a1/home/homes.json` | `housing` | `building_types` | `living_room` | `vocabulary/en/a1/home/furniture/living_room.json` | **move** | Move from home/homes.json to home/furniture/living_room.json. |
| `en:ceiling:noun` | **ceiling** | `vocabulary/en/a1/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a1/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:garage:noun` | **garage** | `vocabulary/en/a1/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a1/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:living-room:noun` | **living room** | `vocabulary/en/a1/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a1/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:roof:noun` | **roof** | `vocabulary/en/a1/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a1/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:stairs:noun` | **stairs** | `vocabulary/en/a1/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a1/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:bath:noun` | **bath** | `vocabulary/en/a2/home/furniture/bathroom.json` | `housing` | `furniture` | `bathroom` | `vocabulary/en/a2/home/furniture/bathroom.json` | **keep** | Valid Home/Housing topic entry. |
| `en:facilities:noun` | **facilities** | `vocabulary/en/a2/home/furniture/bedroom.json` | `housing` | `furniture` | `bedroom` | `vocabulary/en/a2/home/furniture/bedroom.json` | **keep** | Valid Home/Housing topic entry. |
| `en:mattress:noun` | **mattress** | `vocabulary/en/a2/home/furniture/bedroom.json` | `housing` | `furniture` | `bedroom` | `vocabulary/en/a2/home/furniture/bedroom.json` | **keep** | Valid Home/Housing topic entry. |
| `en:adjusted:adjective` | **adjusted** | `vocabulary/en/a2/home/furniture/general.json` | `descriptors` | `general` | `none` | `vocabulary/en/a2/general_adjectives.json` | **move_and_retheme** | General descriptor adjective, not specific to home structure, room, furniture, or appliance. |
| `en:architectural:adjective` | **architectural** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:bind:verb` | **bind** | `vocabulary/en/a2/home/furniture/general.json` | `actions` | `general` | `none` | `vocabulary/en/b1/actions.json` | **move_and_retheme** | General action verb meaning to tie or fasten, not a home structure, furniture, or utility concept. |
| `en:bookcase:noun` | **bookcase** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:brick:noun` | **brick** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:broken:adjective` | **broken** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:bulb:noun` | **bulb** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:childcare:noun` | **childcare** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:daycare:noun` | **daycare** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:extend:verb` | **extend** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:extension:noun` | **extension** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:hole:noun` | **hole** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:household:noun` | **household** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:interior:noun` | **interior** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:layout:noun` | **layout** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:leak:noun` | **leak** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:renew:verb` | **renew** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:renewal:noun` | **renewal** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:restore:verb` | **restore** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:stare:verb` | **stare** | `vocabulary/en/a2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:blender:noun` | **blender** | `vocabulary/en/a2/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a2/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:dishwasher:noun` | **dishwasher** | `vocabulary/en/a2/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a2/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:kettle:noun` | **kettle** | `vocabulary/en/a2/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a2/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:toaster:noun` | **toaster** | `vocabulary/en/a2/home/furniture/kitchen.json` | `housing` | `appliances` | `kitchen` | `vocabulary/en/a2/home/furniture/kitchen.json` | **keep** | Valid Home/Housing topic entry. |
| `en:armchair:noun` | **armchair** | `vocabulary/en/a2/home/furniture/living_room.json` | `housing` | `furniture` | `living_room` | `vocabulary/en/a2/home/furniture/living_room.json` | **keep** | Valid Home/Housing topic entry. |
| `en:fence:noun` | **fence** | `vocabulary/en/a2/home/furniture/outdoor_garden.json` | `housing` | `outdoor` | `outdoor` | `vocabulary/en/a2/home/furniture/outdoor_garden.json` | **keep** | Valid Home/Housing topic entry. |
| `en:vacuum-cleaner:noun` | **vacuum cleaner** | `vocabulary/en/a2/home/furniture/utility_laundry.json` | `housing` | `utilities` | `utility_laundry` | `vocabulary/en/a2/home/furniture/utility_laundry.json` | **keep** | Valid Home/Housing topic entry. |
| `en:vacuum:verb` | **vacuum** | `vocabulary/en/a2/home/furniture/utility_laundry.json` | `housing` | `utilities` | `utility_laundry` | `vocabulary/en/a2/home/furniture/utility_laundry.json` | **keep** | Valid Home/Housing topic entry. |
| `en:washing-machine:noun` | **washing machine** | `vocabulary/en/a2/home/furniture/utility_laundry.json` | `housing` | `utilities` | `utility_laundry` | `vocabulary/en/a2/home/furniture/utility_laundry.json` | **keep** | Valid Home/Housing topic entry. |
| `en:cabinet:noun` | **cabinet** | `vocabulary/en/a2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/a2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:cottage:noun` | **cottage** | `vocabulary/en/a2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/a2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:adjoining-rooms:noun` | **adjoining rooms** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:agreement:noun` | **agreement** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:air-conditioner:noun` | **air conditioner** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:air-conditioning:noun` | **air conditioning** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:air:noun` | **air** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:appliance:noun` | **appliance** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:attic:noun` | **attic** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:balcony:noun` | **balcony** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:basement:noun` | **basement** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:cellar:noun` | **cellar** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:conditioning:noun` | **conditioning** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:corridor:noun` | **corridor** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:cot:noun` | **cot** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:doorbell:noun` | **doorbell** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:drawer:noun` | **drawer** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:dryer:noun` | **dryer** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:elevator:noun` | **elevator** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **tag-region** | Tag region: US and cross-reference UK equivalent. |
| `en:emergency-exit:noun` | **emergency exit** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:expand:verb` | **expand** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:furnish:verb` | **furnish** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:furnished:adjective` | **furnished** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:furniture:noun` | **furniture** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:garden:verb` | **garden** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:gas:noun` | **gas** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:heater:noun` | **heater** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:heating:noun` | **heating** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:iron:noun` | **iron** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:landlord:noun` | **landlord** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:laundromat:noun` | **laundromat** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:lease:verb` | **lease** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:mailbox:noun` | **mailbox** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:mortgage:noun` | **mortgage** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:move-in:noun` | **move in** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:move-out:noun` | **move out** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:neighborhood:noun` | **neighborhood** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:neighbourhood:noun` | **neighbourhood** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:noisy:noun` | **noisy** | `vocabulary/en/a2/home/rooms.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:out:noun` | **out** | `vocabulary/en/a2/home/rooms.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:own:verb` | **own** | `vocabulary/en/a2/home/rooms.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:place-of-birth:noun` | **place of birth** | `vocabulary/en/a2/home/rooms.json` | `identity` | `personal_details` | `none` | `vocabulary/en/a2/identity.json` | **move_and_retheme** | Administrative personal identity metadata, not home structure or household object. |
| `en:playdate:noun` | **playdate** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:postcode:noun` | **postcode** | `vocabulary/en/a2/home/rooms.json` | `identity` | `personal_details` | `none` | `vocabulary/en/a2/identity.json` | **move_and_retheme** | Administrative personal identity metadata, not home structure or household object. |
| `en:property:noun` | **property** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:quiet:noun` | **quiet** | `vocabulary/en/a2/home/rooms.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | General adjective/noun/verb misplaced in home/furniture directory. |
| `en:renovate:verb` | **renovate** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:rent:noun` | **rent** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:rent:verb` | **rent** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:settling-in:noun` | **settling in** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:shelter:noun` | **shelter** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:suburb:noun` | **suburb** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:survive:verb` | **survive** | `vocabulary/en/a2/home/rooms.json` | `actions` | `general` | `none` | `vocabulary/en/b1/actions.json` | **move_and_retheme** | General action verb, not specific to housing or home environment. |
| `en:tenant:noun` | **tenant** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:terrace:noun` | **terrace** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:unfurnished:adjective` | **unfurnished** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:yard:noun` | **yard** | `vocabulary/en/a2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/a2/home/rooms.json` | **tag-region** | Tag region: US and cross-reference UK equivalent. |
| `en:utilities:noun` | **utilities** | `vocabulary/en/b1/home/furniture/bedroom.json` | `housing` | `furniture` | `bedroom` | `vocabulary/en/b1/home/furniture/bedroom.json` | **keep** | Valid Home/Housing topic entry. |
| `en:utility-bill:noun` | **utility bill** | `vocabulary/en/b1/home/furniture/bedroom.json` | `housing` | `furniture` | `bedroom` | `vocabulary/en/b1/home/furniture/bedroom.json` | **keep** | Valid Home/Housing topic entry. |
| `en:affordable:adjective` | **affordable** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:alternative-route:noun` | **alternative route** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:amenities:noun` | **amenities** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:bike-lane:noun` | **bike lane** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:boarding-priority:noun` | **boarding priority** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Airline boarding procedure concept belonging to aviation/travel. |
| `en:breakdown-assistance:noun` | **breakdown assistance** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:breakdown:noun` | **breakdown** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:budget-carrier:noun` | **budget carrier** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:checked-in-luggage:noun` | **checked-in luggage** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:commute-time:noun` | **commute time** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:commute:verb` | **commute** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:commuting:noun` | **commuting** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:complimentary-upgrade:noun` | **complimentary upgrade** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:concierge-service:noun` | **concierge service** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:conductor:noun` | **conductor** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:connecting-time:noun` | **connecting time** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:courier-service:noun` | **courier service** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:driving-test:noun` | **driving test** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:e-gate:noun` | **e-gate** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:emergency-landing:noun` | **emergency landing** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:estate-agency:noun` | **estate agency** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:eviction:noun` | **eviction** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:excess-mileage:noun` | **excess mileage** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:expiration:noun` | **expiration** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:fire:noun` | **fire** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | General hazard noun placed under furniture/general; should be categorized under fireplace/heating or safety sub-theme. |
| `en:fixed-itinerary:noun` | **fixed itinerary** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:flexible-itinerary:noun` | **flexible itinerary** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:frequent-flyer:noun` | **frequent flyer** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:gentrification:noun` | **gentrification** | `vocabulary/en/b1/home/furniture/general.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:housing:noun` | **housing** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:infrastructure:noun` | **infrastructure** | `vocabulary/en/b1/home/furniture/general.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:inspection:noun` | **inspection** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:interrail:noun` | **interrail** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:layover-time:noun` | **layover time** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:learner-s-permit:noun` | **learner's permit** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:lease:noun` | **lease** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:long-term-let:noun` | **long-term let** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:maintenance-issue:noun` | **maintenance issue** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:maintenance:noun` | **maintenance** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:mechanical-issue:noun` | **mechanical issue** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:missed-connection:noun` | **missed connection** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:neighborhood-safety:noun` | **neighborhood safety** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:neighborhood-watch:noun` | **neighborhood watch** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:noise-complaint:noun` | **noise complaint** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:overcrowding:noun` | **overcrowding** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:overhead-compartment:noun` | **overhead compartment** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:oversized-baggage:noun` | **oversized baggage** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:personalized-service:noun` | **personalized service** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:pest-control:noun` | **pest control** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:plumbing:noun` | **plumbing** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:pre-boarding:noun` | **pre-boarding** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Airline boarding procedure concept belonging to aviation/travel. |
| `en:prohibited-items:noun` | **prohibited items** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:property-manager:noun` | **property manager** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:property-value:noun` | **property value** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:public-transit-system:noun` | **public transit system** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:real-estate-agent:noun` | **real estate agent** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:rebooking-fee:noun` | **rebooking fee** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:regeneration:noun` | **regeneration** | `vocabulary/en/b1/home/furniture/general.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:registration:noun` | **registration** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:renovation:noun` | **renovation** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:rental-agreement:noun` | **rental agreement** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:rental-contract:noun` | **rental contract** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:rental-property:noun` | **rental property** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:restricted-items:noun` | **restricted items** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:ride-sharing:noun` | **ride-sharing** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:roadside-assistance:noun` | **roadside assistance** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:route-planning:noun` | **route planning** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:security-deposit:noun` | **security deposit** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:service-disruption:noun` | **service disruption** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:short-term-let:noun` | **short-term let** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:sleeper-train:noun` | **sleeper train** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:special-meal-request:noun` | **special meal request** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:standby-list:noun` | **standby list** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:stopover:noun` | **stopover** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:technical-delay:noun` | **technical delay** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:tenancy-agreement:noun` | **tenancy agreement** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:toll:noun` | **toll** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:transit:noun` | **transit** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:transport:noun` | **transport** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:unreserved-seating:noun` | **unreserved seating** | `vocabulary/en/b1/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b1/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:upgrade-voucher:noun` | **upgrade voucher** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:urbanisation:noun` | **urbanisation** | `vocabulary/en/b1/home/furniture/general.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:urbanization:noun` | **urbanization** | `vocabulary/en/b1/home/furniture/general.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:vehicle-registration:noun` | **vehicle registration** | `vocabulary/en/b1/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:weather-delay:noun` | **weather delay** | `vocabulary/en/b1/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Commercial, travel, or hospitality service term rather than residential home feature. |
| `en:zoning:noun` | **zoning** | `vocabulary/en/b1/home/furniture/general.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:homeowner:noun` | **homeowner** | `vocabulary/en/b1/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b1/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:house-swap:noun` | **house swap** | `vocabulary/en/b1/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b1/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:nursing-home:noun` | **nursing home** | `vocabulary/en/b1/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b1/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:skyscraper:noun` | **skyscraper** | `vocabulary/en/b1/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b1/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:room-mix-up:noun` | **room mix-up** | `vocabulary/en/b1/home/rooms.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Hotel and hospitality reservation error, not a residential room term. |
| `en:affordable-housing:noun` | **affordable housing** | `vocabulary/en/b2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:commuter-belt:noun` | **commuter belt** | `vocabulary/en/b2/home/furniture/general.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:electrical-wiring:noun` | **electrical wiring** | `vocabulary/en/b2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:holding-pattern:noun` | **holding pattern** | `vocabulary/en/b2/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:insulation:noun` | **insulation** | `vocabulary/en/b2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:regulation:noun` | **regulation** | `vocabulary/en/b2/home/furniture/general.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:ventilation:noun` | **ventilation** | `vocabulary/en/b2/home/furniture/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/b2/home/furniture/general.json` | **keep** | Valid Home/Housing topic entry. |
| `en:affordable-housing-crisis:noun` | **affordable housing crisis** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:affordable:noun` | **affordable** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:biometric-passport:noun` | **biometric passport** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Travel and identity document, entirely unrelated to home or housing. |
| `en:cabin-pressure:noun` | **cabin pressure** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Aviation physics phenomenon inside aircraft, not a residential home term. |
| `en:civic:adjective` | **civic** | `vocabulary/en/b2/home/homes.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:commuter:noun` | **commuter** | `vocabulary/en/b2/home/homes.json` | `transport` | `commuting` | `none` | `vocabulary/en/b1/transport.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:congestion-charge:noun` | **congestion charge** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:congestion:noun` | **congestion** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:couchette:noun` | **couchette** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:denied-boarding:noun` | **denied boarding** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Airline boarding procedure concept belonging to aviation/travel. |
| `en:diversion:noun` | **diversion** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to transportation, traffic, and commuting domain rather than residential home. |
| `en:frequent-flyer-status:noun` | **frequent flyer status** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:gated-community:noun` | **gated community** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:homeowners-association:noun` | **homeowners association** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:hub:noun` | **hub** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:land:noun` | **land** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:legacy-carrier:noun` | **legacy carrier** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to aviation and travel domain rather than residential home or housing. |
| `en:minimum-connection-time:noun` | **minimum connection time** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:municipal:adjective` | **municipal** | `vocabulary/en/b2/home/homes.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:overbooking-policy:noun` | **overbooking policy** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:overpopulation:noun` | **overpopulation** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:planning:noun` | **planning** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:provider:noun` | **provider** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:smart:noun` | **smart** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:sprawl:noun` | **sprawl** | `vocabulary/en/b2/home/homes.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:sublet:verb` | **sublet** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:urban-planning:noun` | **urban planning** | `vocabulary/en/b2/home/homes.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:urban:noun` | **urban** | `vocabulary/en/b2/home/homes.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:use:noun` | **use** | `vocabulary/en/b2/home/homes.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Abstract general business/administrative noun improperly categorized under home/housing. |
| `en:utility:noun` | **utility** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:walkability:noun` | **walkability** | `vocabulary/en/b2/home/homes.json` | `society` | `urban_planning` | `none` | `vocabulary/en/b2/society.json` | **move_and_retheme** | Belongs to urban planning, municipal policy, or civic geography rather than residential home. |
| `en:wear-and-tear:noun` | **wear and tear** | `vocabulary/en/b2/home/homes.json` | `housing` | `building_types` | `general` | `vocabulary/en/b2/home/homes.json` | **keep** | Valid Home/Housing topic entry. |
| `en:assisted-living:noun` | **assisted living** | `vocabulary/en/b2/home/rooms.json` | `housing` | `rooms_spaces` | `general` | `vocabulary/en/b2/home/rooms.json` | **keep** | Valid Home/Housing topic entry. |
| `en:food-desert:noun` | **food desert** | `vocabulary/en/b2/home/rooms.json` | `travel` | `general` | `none` | `vocabulary/en/b1/travel.json` | **move_and_retheme** | Sociological/geographical term for areas lacking fresh food options, not a residential room or home concept. |
| `en:blanket:noun` | **blanket** | `vocabulary/en/a0_a1/objects.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/furniture/bedroom.json` | **move** | External home item currently in vocabulary/en/a0_a1/objects.json: Essential household bedding item currently categorized under general objects. |
| `en:broom:noun` | **broom** | `vocabulary/en/a0_a1/objects.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/furniture/utility_laundry.json` | **move** | External home item currently in vocabulary/en/a0_a1/objects.json: Household cleaning tool currently categorized under personal/general objects. |
| `en:bucket:noun` | **bucket** | `vocabulary/en/a0_a1/objects.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/furniture/utility_laundry.json` | **move** | External home item currently in vocabulary/en/a0_a1/objects.json: Household cleaning container currently categorized under general objects. |
| `en:alarm-clock:noun` | **alarm clock** | `vocabulary/en/a2/objects.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/bedroom.json` | **move** | External home item currently in vocabulary/en/a2/objects.json: Bedroom clock/fixture currently categorized under general objects. |
| `en:coat-rack:noun` | **coat rack** | `vocabulary/en/a2/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/general.json` | **move** | External home item currently in vocabulary/en/a2/general.json: Hallway/entryway furniture piece currently in general.json. |
| `en:cabin:noun` | **cabin** | `vocabulary/en/a2/tourism.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/homes.json` | **move** | External home item currently in vocabulary/en/a2/tourism.json: Residential building type (rustic timber home) currently categorized under tourism. |
| `en:castle:noun` | **castle** | `vocabulary/en/a2/tourism.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/homes.json` | **move** | External home item currently in vocabulary/en/a2/tourism.json: Historic residential building type currently categorized under tourism. |
| `en:block-of-flats:noun` | **block of flats** | `vocabulary/en/a0_a1/places_transport.json` | `housing` | `furniture` | `general` | `vocabulary/en/a0_a1/home/homes.json` | **move** | External home item currently in vocabulary/en/a0_a1/places_transport.json: Multi-family residential building concept currently in places_transport.json. |
| `en:dustbin:noun` | **dustbin** | `vocabulary/en/a2/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/utility_laundry.json` | **move** | External home item currently in vocabulary/en/a2/general.json: Household waste receptacle currently in general.json. |
| `en:recycling-bin:noun` | **recycling bin** | `vocabulary/en/a2/nature.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/utility_laundry.json` | **move** | External home item currently in vocabulary/en/a2/nature.json: Household waste sorting receptacle currently in nature.json. |
| `en:dresser:noun` | **dresser** | `vocabulary/en/a2/general.json` | `housing` | `furniture` | `general` | `vocabulary/en/a2/home/furniture/bedroom.json` | **move** | External home item currently in vocabulary/en/a2/general.json: Bedroom furniture piece currently in general.json. |
