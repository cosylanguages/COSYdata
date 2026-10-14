# Restoration Log for Removed English Vocabulary Entries

This report documents all 89 vocabulary entries removed in commit `bafad07` (comparing `bafad07^` with `main`), along with their restoration targets or dropped rationale.

## Summary
- **Total Removed Entries:** 89
- **Restored Entries:** 82
- **Dropped Artifacts:** 7 (wrong part-of-speech artifacts)

## Detailed Log

| # | Entry ID | Word | Form | Level | Action | Target File / Rationale | Primary Theme | Sub-theme |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `en:clean:adjective` | clean | adjective | A0 | **Restored** | `vocabulary/en/a0_a1/general_adjectives.json` | `descriptors` | `quality_condition` |
| 2 | `en:cup:noun` | cup | noun | A0 | **Restored** | `vocabulary/en/a0_a1/food_drink.json` | `food` | `drinks` |
| 3 | `en:dirty:adjective` | dirty | adjective | A0 | **Restored** | `vocabulary/en/a0_a1/general_adjectives.json` | `descriptors` | `quality_condition` |
| 4 | `en:adjusted:adjective` | adjusted | adjective | A2 | **Restored** | `vocabulary/en/a2/general_adjectives.json` | `descriptors` | `quality_condition` |
| 5 | `en:bind:verb` | bind | verb | A2 | **Restored** | `vocabulary/en/a2/actions.json` | `actions` | `physical_actions` |
| 6 | `en:noisy:noun` | noisy | noun | A2 | **Dropped** | Wrong part-of-speech artifact | N/A | N/A |
| 7 | `en:out:noun` | out | noun | A2 | **Dropped** | Wrong part-of-speech artifact | N/A | N/A |
| 8 | `en:own:verb` | own | verb | A2 | **Dropped** | Wrong part-of-speech artifact | N/A | N/A |
| 9 | `en:place-of-birth:noun` | place of birth | noun | A2 | **Restored** | `vocabulary/en/a2/identity.json` | `society` | `demographics` |
| 10 | `en:postcode:noun` | postcode | noun | A2 | **Restored** | `vocabulary/en/a2/communication.json` | `society` | `community` |
| 11 | `en:quiet:noun` | quiet | noun | A2 | **Dropped** | Wrong part-of-speech artifact | N/A | N/A |
| 12 | `en:survive:verb` | survive | verb | A2 | **Restored** | `vocabulary/en/a2/actions.json` | `actions` | `physical_actions` |
| 13 | `en:alternative-route:noun` | alternative route | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 14 | `en:bike-lane:noun` | bike lane | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 15 | `en:boarding-priority:noun` | boarding priority | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 16 | `en:breakdown-assistance:noun` | breakdown assistance | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 17 | `en:breakdown:noun` | breakdown | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 18 | `en:budget-carrier:noun` | budget carrier | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 19 | `en:checked-in-luggage:noun` | checked-in luggage | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 20 | `en:commute-time:noun` | commute time | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 21 | `en:commute:verb` | commute | verb | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 22 | `en:concierge-service:noun` | concierge service | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 23 | `en:conductor:noun` | conductor | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 24 | `en:courier-service:noun` | courier service | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 25 | `en:driving-test:noun` | driving test | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 26 | `en:e-gate:noun` | e-gate | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 27 | `en:emergency-landing:noun` | emergency landing | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 28 | `en:excess-mileage:noun` | excess mileage | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 29 | `en:expiration:noun` | expiration | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 30 | `en:fire:noun` | fire | noun | B1 | **Restored** | `vocabulary/en/b1/environment.json` | `environment` | `general` |
| 31 | `en:fixed-itinerary:noun` | fixed itinerary | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 32 | `en:flexible-itinerary:noun` | flexible itinerary | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 33 | `en:frequent-flyer:noun` | frequent flyer | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 34 | `en:gentrification:noun` | gentrification | noun | B1 | **Restored** | `vocabulary/en/b1/society.json` | `society` | `community` |
| 35 | `en:infrastructure:noun` | infrastructure | noun | B1 | **Restored** | `vocabulary/en/b1/society.json` | `society` | `community` |
| 36 | `en:interrail:noun` | interrail | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 37 | `en:overhead-compartment:noun` | overhead compartment | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 38 | `en:oversized-baggage:noun` | oversized baggage | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 39 | `en:personalized-service:noun` | personalized service | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 40 | `en:pre-boarding:noun` | pre-boarding | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 41 | `en:prohibited-items:noun` | prohibited items | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 42 | `en:public-transit-system:noun` | public transit system | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 43 | `en:rebooking-fee:noun` | rebooking fee | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 44 | `en:regeneration:noun` | regeneration | noun | B1 | **Restored** | `vocabulary/en/b1/society.json` | `society` | `community` |
| 45 | `en:registration:noun` | registration | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 46 | `en:restricted-items:noun` | restricted items | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 47 | `en:ride-sharing:noun` | ride-sharing | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 48 | `en:roadside-assistance:noun` | roadside assistance | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 49 | `en:route-planning:noun` | route planning | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 50 | `en:service-disruption:noun` | service disruption | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 51 | `en:sleeper-train:noun` | sleeper train | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 52 | `en:special-meal-request:noun` | special meal request | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 53 | `en:standby-list:noun` | standby list | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 54 | `en:stopover:noun` | stopover | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 55 | `en:technical-delay:noun` | technical delay | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 56 | `en:toll:noun` | toll | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 57 | `en:transit:noun` | transit | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 58 | `en:upgrade-voucher:noun` | upgrade voucher | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 59 | `en:urbanisation:noun` | urbanisation | noun | B1 | **Restored** | `vocabulary/en/b1/society.json` | `society` | `community` |
| 60 | `en:urbanization:noun` | urbanization | noun | B1 | **Restored** | `vocabulary/en/b1/society.json` | `society` | `community` |
| 61 | `en:vehicle-registration:noun` | vehicle registration | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 62 | `en:weather-delay:noun` | weather delay | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 63 | `en:zoning:noun` | zoning | noun | B1 | **Restored** | `vocabulary/en/b1/society.json` | `society` | `community` |
| 64 | `en:room-mix-up:noun` | room mix-up | noun | B1 | **Restored** | `vocabulary/en/b1/travel.json` | `travel` | `transit_booking` |
| 65 | `en:commuter-belt:noun` | commuter belt | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 66 | `en:holding-pattern:noun` | holding pattern | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 67 | `en:regulation:noun` | regulation | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 68 | `en:biometric-passport:noun` | biometric passport | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 69 | `en:cabin-pressure:noun` | cabin pressure | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 70 | `en:civic:adjective` | civic | adjective | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 71 | `en:commuter:noun` | commuter | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 72 | `en:congestion-charge:noun` | congestion charge | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 73 | `en:congestion:noun` | congestion | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 74 | `en:couchette:noun` | couchette | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 75 | `en:denied-boarding:noun` | denied boarding | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 76 | `en:diversion:noun` | diversion | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 77 | `en:frequent-flyer-status:noun` | frequent flyer status | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 78 | `en:legacy-carrier:noun` | legacy carrier | noun | B2 | **Restored** | `vocabulary/en/b2/travel.json` | `travel` | `transit_booking` |
| 79 | `en:municipal:adjective` | municipal | adjective | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 80 | `en:overpopulation:noun` | overpopulation | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 81 | `en:planning:noun` | planning | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 82 | `en:provider:noun` | provider | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 83 | `en:smart:noun` | smart | noun | B2 | **Dropped** | Wrong part-of-speech artifact | N/A | N/A |
| 84 | `en:sprawl:noun` | sprawl | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 85 | `en:urban-planning:noun` | urban planning | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 86 | `en:urban:noun` | urban | noun | B2 | **Dropped** | Wrong part-of-speech artifact | N/A | N/A |
| 87 | `en:use:noun` | use | noun | B2 | **Dropped** | Wrong part-of-speech artifact | N/A | N/A |
| 88 | `en:walkability:noun` | walkability | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
| 89 | `en:food-desert:noun` | food desert | noun | B2 | **Restored** | `vocabulary/en/b2/society.json` | `society` | `community` |
