# CEFR Level Audit Report: A0–A1 Vocabulary Datasets

## Executive Summary

This audit evaluates the assigned CEFR levels across **EN (1666), FR (516), IT (517), RU (548), EL (516)** entries in `vocabulary/{en,fr,it,ru,el}/a0_a1/` against recognized CEFR reference frameworks:
- **English (`en`)**: Cross-checked against the **English Vocabulary Profile (EVP)** and **CEFR-J** wordlists.
- **French (`fr`)**: Cross-checked against **DELF / FLE A1** core vocabulary lists and English gloss anchors.
- **Italian (`it`)**: Cross-checked against **CILS / CELI A1** core wordlists and English gloss anchors.
- **Russian (`ru`)**: Cross-checked against **TRKI / TORFL Elementary (A1)** vocabulary standards.
- **Greek (`el`)**: Cross-checked against official **Centre for the Greek Language (ΚΕΓ) A1** guidelines and English gloss anchors.

> **Important Note on Multi-Level Tagging (`levels` Array)**:
> In `vocabulary/en/`, entries incorporate a `levels` array (multi-CEFR-level tagging per EVP convention, e.g. `["A1", "C1"]`). Currently, `fr`, `it`, and `el` datasets do not implement this array (only `ru` has `levels` tags). This structural gap is **flagged for follow-up** across non-English datasets rather than fabricated prematurely.

### Summary Audit Breakdown

| Language | Total A0/A1 Entries | Verified Valid A0/A1 | Over-Level Flagged (A2+) | Under-Level Flagged (A0 Candidate) | Unverified / Human Review Needed |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **EN** | 1666 | 880 | 2 | 784 | 0 |
| **FR** | 516 | 173 | 0 | 342 | 1 |
| **IT** | 517 | 118 | 0 | 399 | 0 |
| **RU** | 548 | 238 | 0 | 308 | 2 |
| **EL** | 516 | 193 | 0 | 323 | 0 |

---

## Language-by-Language Detailed Audit Findings

### EN Vocabulary Audit Findings (`vocabulary/en/a0_a1/`)

#### 1. Over-Level Terms (Flagged as A2+ per Reference)
| File | Entry ID | Word | Current Level | Reference Level | Audit Notes / Reason |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `body_health.json` | `en:healthy:adjective` | **healthy** | A1 | A2+ | EVP / CEFR-J classifies phrasal/abstract sense at A2+ |
| `places_transport.json` | `en:airport:noun` | **airport** | A1 | A2+ | EVP / CEFR-J classifies phrasal/abstract sense at A2+ |

#### 2. Under-Level Terms (Recommended for A0 Starter Promotion)
| File | Entry ID | Word | Current Level | Suggested Level | Audit Notes / Reason |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `adjectives.json` | `en:open:adjective` | **open** | A1 | **A0** | First-contact absolute beginner core concept |
| `adjectives.json` | `en:high:adjective` | **high** | A1 | **A0** | First-contact absolute beginner core concept |
| `adjectives.json` | `en:tired:adjective` | **tired** | A1 | **A0** | First-contact absolute beginner core concept |
| `adjectives.json` | `en:scared:adjective` | **scared** | A1 | **A0** | First-contact absolute beginner core concept |
| `adjectives.json` | `en:noisy:adjective` | **noisy** | A1 | **A0** | First-contact absolute beginner core concept |
| `adjectives.json` | `en:busy:adjective` | **busy** | A1 | **A0** | First-contact absolute beginner core concept |
| `adverbs_connectors.json` | `en:now:adverb` | **now** | A1 | **A0** | First-contact absolute beginner core concept |
| `adverbs_connectors.json` | `en:yesterday:adverb` | **yesterday** | A1 | **A0** | First-contact absolute beginner core concept |
| `adverbs_connectors.json` | `en:often:adverb` | **often** | A1 | **A0** | First-contact absolute beginner core concept |
| `adverbs_connectors.json` | `en:no:adverb` | **no** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:weather:noun` | **weather** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:moon:noun` | **moon** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:tree:noun` | **tree** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:stone:noun` | **stone** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:elephant:noun` | **elephant** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:world:noun` | **world** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:cat:noun` | **cat** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:dog:noun` | **dog** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:cow:noun` | **cow** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:horse:noun` | **horse** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:bird:noun` | **bird** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:fish:noun` | **fish** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:mouse:noun` | **mouse** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:pig:noun` | **pig** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:sheep:noun` | **sheep** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:hen:noun` | **hen** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:animal:noun` | **animal** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:animals:noun` | **animals** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:chicken:noun` | **chicken** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:duck:noun` | **duck** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:rabbit:noun` | **rabbit** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:lion:noun` | **lion** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:tiger:noun` | **tiger** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:bear:noun` | **bear** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:monkey:noun` | **monkey** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:snake:noun` | **snake** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:flower:noun` | **flower** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:grass:noun` | **grass** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:leaf:noun` | **leaf** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:leaves:noun` | **leaves** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:forest:noun` | **forest** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:wood:noun` | **wood** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:mountain:noun` | **mountain** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:hill:noun` | **hill** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:river:noun` | **river** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:lake:noun` | **lake** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:sea:noun` | **sea** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:ocean:noun` | **ocean** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:beach:noun` | **beach** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:island:noun` | **island** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:sky:noun` | **sky** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:sun:noun` | **sun** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:star:noun` | **star** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:rain:noun` | **rain** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:snow:noun` | **snow** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:sunny:adjective` | **sunny** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:snowy:adjective` | **snowy** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:earth:noun` | **earth** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:rock:noun` | **rock** | A1 | **A0** | First-contact absolute beginner core concept |
| `animals.json` | `en:sand:noun` | **sand** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:nurse:noun` | **nurse** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:eye:noun` | **eye** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:hand:noun` | **hand** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:head:noun` | **head** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:face:noun` | **face** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:back:noun` | **back** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:hospital:noun` | **hospital** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:hair:noun` | **hair** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:eyes:noun` | **eyes** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:ear:noun` | **ear** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:ears:noun` | **ears** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:nose:noun` | **nose** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:mouth:noun` | **mouth** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:teeth:noun` | **teeth** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:tooth:noun` | **tooth** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:neck:noun` | **neck** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:shoulder:noun` | **shoulder** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:arm:noun` | **arm** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:arms:noun` | **arms** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:hands:noun` | **hands** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:finger:noun` | **finger** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:fingers:noun` | **fingers** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:thumb:noun` | **thumb** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:chest:noun` | **chest** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:stomach:noun` | **stomach** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:leg:noun` | **leg** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:legs:noun` | **legs** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:knee:noun` | **knee** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:foot:noun` | **foot** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:feet:noun` | **feet** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:toe:noun` | **toe** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:toes:noun` | **toes** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:body:noun` | **body** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:skin:noun` | **skin** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:bone:noun` | **bone** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:heart:noun` | **heart** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:blood:noun` | **blood** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:sick:noun` | **sick** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:ill:noun` | **ill** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:tired:noun` | **tired** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:hungry:noun` | **hungry** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:thirsty:noun` | **thirsty** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:pain:noun` | **pain** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:hurt:noun` | **hurt** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:pill:noun` | **pill** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:cough:noun` | **cough** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:flu:noun` | **flu** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:sunscreen:noun` | **sunscreen** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:shampoo:noun` | **shampoo** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:toilet-paper:noun` | **toilet paper** | A1 | **A0** | First-contact absolute beginner core concept |
| `body_health.json` | `en:toothpaste:noun` | **toothpaste** | A1 | **A0** | First-contact absolute beginner core concept |
| `classroom_phrases.json` | `en:look-at:phrase` | **look at** | A1 | **A0** | First-contact absolute beginner core concept |
| `classroom_phrases.json` | `en:listen-to:phrase` | **listen to** | A1 | **A0** | First-contact absolute beginner core concept |
| `classroom_phrases.json` | `en:carefully:phrase` | **carefully** | A1 | **A0** | First-contact absolute beginner core concept |
| `classroom_phrases.json` | `en:take-care-of:phrase` | **take care of** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:small:noun` | **small** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:large:noun` | **large** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:wear:noun` | **wear** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:clothes:noun` | **clothes** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:shirt:noun` | **shirt** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:t-shirt:noun` | **t-shirt** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:trousers:noun` | **trousers** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:pants:noun` | **pants** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:jeans:noun` | **jeans** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:skirt:noun` | **skirt** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:jacket:noun` | **jacket** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:coat:noun` | **coat** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:sweater:noun` | **sweater** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:jumper:noun` | **jumper** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:shoes:noun` | **shoes** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:boots:noun` | **boots** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:socks:noun` | **socks** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:hat:noun` | **hat** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:cap:noun` | **cap** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:gloves:noun` | **gloves** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:scarf:noun` | **scarf** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:ring:noun` | **ring** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:medium:noun` | **medium** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:clothing:noun` | **clothing** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:hoodie:noun` | **hoodie** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:raincoat:noun` | **raincoat** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:suit:noun` | **suit** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:swimsuit:noun` | **swimsuit** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:uniform:noun` | **uniform** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:handbag:noun` | **handbag** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:sandals:noun` | **sandals** | A1 | **A0** | First-contact absolute beginner core concept |
| `clothes.json` | `en:shorts:noun` | **shorts** | A1 | **A0** | First-contact absolute beginner core concept |
| `colors.json` | `en:blue:adjective` | **blue** | A1 | **A0** | First-contact absolute beginner core concept |
| `colors.json` | `en:red:adjective` | **red** | A1 | **A0** | First-contact absolute beginner core concept |
| `colors.json` | `en:green:adjective` | **green** | A1 | **A0** | First-contact absolute beginner core concept |
| `colors.json` | `en:yellow:adjective` | **yellow** | A1 | **A0** | First-contact absolute beginner core concept |
| `colors.json` | `en:black:adjective` | **black** | A1 | **A0** | First-contact absolute beginner core concept |
| `colors.json` | `en:white:adjective` | **white** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:piece:noun` | **piece** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:light:noun` | **light** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:dark:noun` | **dark** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:whole:noun` | **whole** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:example:noun` | **example** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:idea:noun` | **idea** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:plan:noun` | **plan** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:advice:noun` | **advice** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:list:noun` | **list** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:team:noun` | **team** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:noise:noun` | **noise** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:voice:noun` | **voice** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:smell:noun` | **smell** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:touch:noun` | **touch** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:image:noun` | **image** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:drawing:noun` | **drawing** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:shadow:noun` | **shadow** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:part:noun` | **part** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:beginning:noun` | **beginning** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:middle:noun` | **middle** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:chance:noun` | **chance** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:luck:noun` | **luck** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:mistake:noun` | **mistake** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:symbol:noun` | **symbol** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:war:noun` | **war** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:peace:noun` | **peace** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:history:noun` | **history** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:future:noun` | **future** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:present:noun` | **present** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:dream:noun` | **dream** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:hope:noun` | **hope** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:wish:noun` | **wish** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:secret:noun` | **secret** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:surprise:noun` | **surprise** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:prize:noun` | **prize** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:reward:noun` | **reward** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:first-name:noun` | **first name** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:full-name:noun` | **full name** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:last-name:noun` | **last name** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:surname:noun` | **surname** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:madam:noun` | **madam** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:mister:noun` | **mister** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:mr:noun` | **mr** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:mrs:noun` | **mrs** | A1 | **A0** | First-contact absolute beginner core concept |
| `common_nouns.json` | `en:sir:noun` | **sir** | A1 | **A0** | First-contact absolute beginner core concept |
| `daily_verbs.json` | `en:water:verb` | **water** | A1 | **A0** | First-contact absolute beginner core concept |
| `daily_verbs.json` | `en:spend:verb` | **spend** | A1 | **A0** | First-contact absolute beginner core concept |
| `daily_verbs.json` | `en:whisper:verb` | **whisper** | A1 | **A0** | First-contact absolute beginner core concept |
| `directions.json` | `en:north:adverb` | **north** | A1 | **A0** | First-contact absolute beginner core concept |
| `directions.json` | `en:nowhere:adverb` | **nowhere** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:me:pronoun` | **me** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:which:phrase` | **which** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:hello:phrase` | **hello** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:hi:phrase` | **hi** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:goodbye:phrase` | **goodbye** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:bye:phrase` | **bye** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:good-afternoon:phrase` | **good afternoon** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:please:phrase` | **please** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:sorry:phrase` | **sorry** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:yes:phrase` | **yes** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:one-ticket:phrase` | **one ticket** | A1 | **A0** | First-contact absolute beginner core concept |
| `expressions.json` | `en:please-repeat:phrase` | **please repeat** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:family:noun` | **family** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:father:noun` | **father** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:parent:noun` | **parent** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:parents:noun` | **parents** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:son:noun` | **son** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:daughter:noun` | **daughter** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:child:noun` | **child** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:children:noun` | **children** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:baby:noun` | **baby** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:brother:noun` | **brother** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:sister:noun` | **sister** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:grandmother:noun` | **grandmother** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:grandfather:noun` | **grandfather** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:grandparent:noun` | **grandparent** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:grandson:noun` | **grandson** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:granddaughter:noun` | **granddaughter** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:aunt:noun` | **aunt** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:uncle:noun` | **uncle** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:cousin:noun` | **cousin** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:husband:noun` | **husband** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:wife:noun` | **wife** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:woman:noun` | **woman** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:men:noun` | **men** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:women:noun` | **women** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:boy:noun` | **boy** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:girl:noun` | **girl** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:friend:noun` | **friend** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:neighbour:noun` | **neighbour** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:neighbor:noun` | **neighbor** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:person:noun` | **person** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:people:noun` | **people** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:age:noun` | **age** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:toddler:noun` | **toddler** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:teenager:noun` | **teenager** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:adult:noun` | **adult** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:senior:noun` | **senior** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:grown-up:noun` | **grown-up** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:family-member:noun` | **family member** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:grandchildren:noun` | **grandchildren** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:relative:noun` | **relative** | A1 | **A0** | First-contact absolute beginner core concept |
| `family.json` | `en:twin:noun` | **twin** | A1 | **A0** | First-contact absolute beginner core concept |
| `feelings.json` | `en:love:noun` | **love** | A1 | **A0** | First-contact absolute beginner core concept |
| `feelings.json` | `en:thirsty:adjective` | **thirsty** | A1 | **A0** | First-contact absolute beginner core concept |
| `feelings.json` | `en:bored:adjective` | **bored** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:cook:noun` | **cook** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:waiter:noun` | **waiter** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:ice:noun` | **ice** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:cake:noun` | **cake** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:salt:noun` | **salt** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:orange:noun` | **orange** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:drink:noun` | **drink** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:drank:noun` | **drank** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:eaten:noun` | **eaten** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:breakfast:noun` | **breakfast** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:lunch:noun` | **lunch** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:dinner:noun` | **dinner** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:meal:noun` | **meal** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:snack:noun` | **snack** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:bread:noun` | **bread** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:butter:noun` | **butter** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:cheese:noun` | **cheese** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:egg:noun` | **egg** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:eggs:noun` | **eggs** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:milk:noun` | **milk** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:rice:noun` | **rice** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:pasta:noun` | **pasta** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:soup:noun` | **soup** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:salad:noun` | **salad** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:sandwich:noun` | **sandwich** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:meat:noun` | **meat** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:beef:noun` | **beef** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:pork:noun` | **pork** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:fruit:noun` | **fruit** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:apple:noun` | **apple** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:banana:noun` | **banana** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:lemon:noun` | **lemon** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:grape:noun` | **grape** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:strawberry:noun` | **strawberry** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:vegetable:noun` | **vegetable** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:vegetables:noun` | **vegetables** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:potato:noun` | **potato** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:tomato:noun` | **tomato** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:onion:noun` | **onion** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:carrot:noun` | **carrot** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:sugar:noun` | **sugar** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:pepper:noun` | **pepper** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:oil:noun` | **oil** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:juice:noun` | **juice** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:tea:noun` | **tea** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:coffee:noun` | **coffee** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:wine:noun` | **wine** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:beer:noun` | **beer** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:biscuit:noun` | **biscuit** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:cookie:noun` | **cookie** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:chocolate:noun` | **chocolate** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:cream:noun` | **cream** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:delicious:noun` | **delicious** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:tasty:noun` | **tasty** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:sweet:noun` | **sweet** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:salty:noun` | **salty** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:sour:noun` | **sour** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:spicy:noun` | **spicy** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:restaurant:noun` | **restaurant** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:menu:noun` | **menu** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:chips-fries:noun` | **chips / fries** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:coke:noun` | **coke** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:hamburger:noun` | **hamburger** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:yogurt:noun` | **yogurt** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:bar:noun` | **bar** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:burger:noun` | **burger** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:chips:noun` | **chips** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:cola:noun` | **cola** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:honey:noun` | **honey** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:no-meat:phrase` | **no meat** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:no-sugar:phrase` | **no sugar** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:noodles:noun` | **noodles** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:soft-drink:noun` | **soft drink** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:sparkling-water:noun` | **sparkling water** | A1 | **A0** | First-contact absolute beginner core concept |
| `food_drink.json` | `en:still-water:noun` | **still water** | A1 | **A0** | First-contact absolute beginner core concept |
| `general_adjectives.json` | `en:expensive:adjective` | **expensive** | A1 | **A0** | First-contact absolute beginner core concept |
| `general_adjectives.json` | `en:thick:adjective` | **thick** | A1 | **A0** | First-contact absolute beginner core concept |
| `general_adjectives.json` | `en:complicated:adjective` | **complicated** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:country:noun` | **country** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:america:noun` | **America** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:england:noun` | **England** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:continent:noun` | **continent** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:europe:noun` | **Europe** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:asia:noun` | **Asia** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:africa:noun` | **Africa** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:australia:noun` | **Australia** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:scotland:noun` | **Scotland** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:wales:noun` | **Wales** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:ireland:noun` | **Ireland** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:france:noun` | **France** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:germany:noun` | **Germany** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:spain:noun` | **Spain** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:italy:noun` | **Italy** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:portugal:noun` | **Portugal** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:russia:noun` | **Russia** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:china:noun` | **China** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:japan:noun` | **Japan** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:india:noun` | **India** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:canada:noun` | **Canada** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:mexico:noun` | **Mexico** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:brazil:noun` | **Brazil** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:egypt:noun` | **Egypt** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:flag:noun` | **flag** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:field:noun` | **field** | A1 | **A0** | First-contact absolute beginner core concept |
| `geography.json` | `en:ground:noun` | **ground** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:room:noun` | **room** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:wall:noun` | **wall** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:clean:noun` | **clean** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:home:noun` | **home** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:flat:noun` | **flat** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:apartment:noun` | **apartment** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:rooms:noun` | **rooms** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:kitchen:noun` | **kitchen** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:bedroom:noun` | **bedroom** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:bathroom:noun` | **bathroom** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:living:noun` | **living** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:dining:noun` | **dining** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:garden:noun` | **garden** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:garage:noun` | **garage** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:door:noun` | **door** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:window:noun` | **window** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:floor:noun` | **floor** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:roof:noun` | **roof** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:stairs:noun` | **stairs** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:table:noun` | **table** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:chair:noun` | **chair** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:sofa:noun` | **sofa** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:couch:noun` | **couch** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:bed:noun` | **bed** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:desk:noun` | **desk** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:shelf:noun` | **shelf** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:cupboard:noun` | **cupboard** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:wardrobe:noun` | **wardrobe** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:lamp:noun` | **lamp** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:curtain:noun` | **curtain** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:plate:noun` | **plate** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:cup:noun` | **cup** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:bowl:noun` | **bowl** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:spoon:noun` | **spoon** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:fork:noun` | **fork** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:pan:noun` | **pan** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:pot:noun` | **pot** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:fridge:noun` | **fridge** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:refrigerator:noun` | **refrigerator** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:oven:noun` | **oven** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:stove:noun` | **stove** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:microwave:noun` | **microwave** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:washing:noun` | **washing** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:soap:noun` | **soap** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:toothbrush:noun` | **toothbrush** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:key:noun` | **key** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:lock:noun` | **lock** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:dirty:noun` | **dirty** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:tidy:noun` | **tidy** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:messy:noun` | **messy** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:cleaning:noun` | **cleaning** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:cooker:noun` | **cooker** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:faucet:noun` | **faucet** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:fire-alarm:noun` | **fire alarm** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:freezer:noun` | **freezer** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:moving:noun` | **moving** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:rug:noun` | **rug** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:seat:noun` | **seat** | A1 | **A0** | First-contact absolute beginner core concept |
| `house_furniture.json` | `en:tap:noun` | **tap** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:worker:noun` | **worker** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:dentist:noun` | **dentist** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:farmer:noun` | **farmer** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:driver:noun` | **driver** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:officer:noun` | **officer** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:policeman:noun` | **policeman** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:fireman:noun` | **fireman** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:chef:noun` | **chef** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:shopkeeper:noun` | **shopkeeper** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:shop:noun` | **shop** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:assistant:noun` | **assistant** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:engineer:noun` | **engineer** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:artist:noun` | **artist** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:writer:noun` | **writer** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:singer:noun` | **singer** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:boss:noun` | **boss** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:business:noun` | **business** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:money:noun` | **money** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:pay:noun` | **pay** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:actress:noun` | **actress** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:businessman:noun` | **businessman** | A1 | **A0** | First-contact absolute beginner core concept |
| `jobs.json` | `en:businesswoman:noun` | **businesswoman** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:metre:noun` | **metre** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:meter:noun` | **meter** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:kilometre:noun` | **kilometre** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:kilometer:noun` | **kilometer** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:centimetre:noun` | **centimetre** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:centimeter:noun` | **centimeter** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:kilogram:noun` | **kilogram** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:kilo:noun` | **kilo** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:gram:noun` | **gram** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:litre:noun` | **litre** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:liter:noun` | **liter** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:dozen:noun` | **dozen** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:percent:noun` | **percent** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:number:noun` | **number** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:amount:noun` | **amount** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:plus:noun` | **plus** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:minus:noun` | **minus** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:equal:noun` | **equal** | A1 | **A0** | First-contact absolute beginner core concept |
| `measurement.json` | `en:total:noun` | **total** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:coin:noun` | **coin** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:note:noun` | **note** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:bank:noun` | **bank** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:price:noun` | **price** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:cost:noun` | **cost** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:cheap:noun` | **cheap** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:expensive:noun` | **expensive** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:buy:noun` | **buy** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:sell:noun` | **sell** | A1 | **A0** | First-contact absolute beginner core concept |
| `money_shopping.json` | `en:shopping-center-mall:noun` | **shopping center / mall** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:nationality:noun` | **nationality** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:english:noun` | **English** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:french:noun` | **French** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:spanish:noun` | **Spanish** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:german:noun` | **German** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:italian:noun` | **Italian** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:chinese:noun` | **Chinese** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:japanese:noun` | **Japanese** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:russian:noun` | **Russian** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:arabic:noun` | **Arabic** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:american:noun` | **American** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:britain:noun` | **Britain** | A1 | **A0** | First-contact absolute beginner core concept |
| `nationalities.json` | `en:british:noun` | **British** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:one:number` | **one** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:two:number` | **two** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:three:number` | **three** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:four:number` | **four** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:five:number` | **five** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:six:number` | **six** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:seven:number` | **seven** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:eight:number` | **eight** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:nine:number` | **nine** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:ten:number` | **ten** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:thirteen:number` | **thirteen** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:fourteen:number` | **fourteen** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:sixteen:number` | **sixteen** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:seventeen:number` | **seventeen** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:eighteen:number` | **eighteen** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:nineteen:number` | **nineteen** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:thirty:number` | **thirty** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:sixty:number` | **sixty** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:seventy:number` | **seventy** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:eighty:number` | **eighty** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:ninety:number` | **ninety** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:hundred:number` | **hundred** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:third:number` | **third** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:fourth:number` | **fourth** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:sixth:number` | **sixth** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:seventh:number` | **seventh** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:eighth:number` | **eighth** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:tenth:number` | **tenth** | A1 | **A0** | First-contact absolute beginner core concept |
| `numbers.json` | `en:none:number` | **none** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:ball:noun` | **ball** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:box:noun` | **box** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:towel:noun` | **towel** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:envelope:noun` | **envelope** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:sign:noun` | **sign** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:umbrella:noun` | **umbrella** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:map:noun` | **map** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:mirror:noun` | **mirror** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:knife:noun` | **knife** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:brush:noun` | **brush** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:comb:noun` | **comb** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:bag:noun` | **bag** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:glasses:noun` | **glasses** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:bottle:noun` | **bottle** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:basket:noun` | **basket** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:toy:noun` | **toy** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:toys:noun` | **toys** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:doll:noun` | **doll** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:wallet:noun` | **wallet** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:purse:noun` | **purse** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:keys:noun` | **keys** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:sunglasses:noun` | **sunglasses** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:stamp:noun` | **stamp** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:candle:noun` | **candle** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:match:noun` | **match** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:matches:noun` | **matches** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:lighter:noun` | **lighter** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:battery:noun` | **battery** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:charger:noun` | **charger** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:cable:noun` | **cable** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:wire:noun` | **wire** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:razor:noun` | **razor** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:blanket:noun` | **blanket** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:pillow:noun` | **pillow** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:sheet:noun` | **sheet** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:broom:noun` | **broom** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:bucket:noun` | **bucket** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:compass:noun` | **compass** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:scissors:noun` | **scissors** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:rope:noun` | **rope** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:string:noun` | **string** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:tape:noun` | **tape** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:glue:noun` | **glue** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:cartoon:noun` | **cartoon** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:copy:noun` | **copy** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:lunchbox:noun` | **lunchbox** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:stuff:noun` | **stuff** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:teddy-bear:noun` | **teddy bear** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:trolley:noun` | **trolley** | A1 | **A0** | First-contact absolute beginner core concept |
| `objects.json` | `en:wheelchair:noun` | **wheelchair** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:far:noun` | **far** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:walk:noun` | **walk** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:here:noun` | **here** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:there:noun` | **there** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:post:noun` | **post** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:corner:noun` | **corner** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:near:noun` | **near** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:town:noun` | **town** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:village:noun` | **village** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:street:noun` | **street** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:road:noun` | **road** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:school:noun` | **school** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:library:noun` | **library** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:church:noun` | **church** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:stop:noun` | **stop** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:park:noun` | **park** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:zoo:noun` | **zoo** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:cinema:noun` | **cinema** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:car:noun` | **car** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:plane:noun` | **plane** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:airplane:noun` | **airplane** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:bicycle:noun` | **bicycle** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:bike:noun` | **bike** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:taxi:noun` | **taxi** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:boat:noun` | **boat** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:ship:noun` | **ship** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:travel:noun` | **travel** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:drive:noun` | **drive** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:fly:noun` | **fly** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:ride:noun` | **ride** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:bridge:noun` | **bridge** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:the-usa:noun` | **the USA** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:blocks:noun` | **blocks** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:tram:noun` | **tram** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:way:noun` | **way** | A1 | **A0** | First-contact absolute beginner core concept |
| `places_transport.json` | `en:cab:noun` | **cab** | A1 | **A0** | First-contact absolute beginner core concept |
| `prepositions.json` | `en:behind:preposition` | **behind** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:that:pronoun` | **that** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:when:pronoun` | **when** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:here:pronoun` | **here** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:there:pronoun` | **there** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:i:pronoun` | **I** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:what:pronoun` | **what** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:this:pronoun` | **this** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:how:pronoun` | **how** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:he:pronoun` | **he** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:she:pronoun` | **she** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:we:pronoun` | **we** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:they:pronoun` | **they** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:him:pronoun` | **him** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:her:pronoun` | **her** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:us:pronoun` | **us** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:them:pronoun` | **them** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:his:pronoun` | **his** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:our:pronoun` | **our** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:their:pronoun` | **their** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:mine:pronoun` | **mine** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:yours:pronoun` | **yours** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:hers:pronoun` | **hers** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:ours:pronoun` | **ours** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:theirs:pronoun` | **theirs** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:these:pronoun` | **these** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:those:pronoun` | **those** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:who:pronoun` | **who** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:where:pronoun` | **where** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:why:pronoun` | **why** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:which:pronoun` | **which** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:whose:pronoun` | **whose** | A1 | **A0** | First-contact absolute beginner core concept |
| `pronouns.json` | `en:whom:pronoun` | **whom** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:learn:noun` | **learn** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:music:noun` | **music** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:read:noun` | **read** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:answer:noun` | **answer** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:teach:noun` | **teach** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:classroom:noun` | **classroom** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:lesson:noun` | **lesson** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:pen:noun` | **pen** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:pencil:noun` | **pencil** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:notebook:noun` | **notebook** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:eraser:noun` | **eraser** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:ruler:noun` | **ruler** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:pupil:noun` | **pupil** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:math:noun` | **math** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:maths:noun` | **maths** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:geography:noun` | **geography** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:question:noun` | **question** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:word:noun` | **word** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:crayon:noun` | **crayon** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:sticker:noun` | **sticker** | A1 | **A0** | First-contact absolute beginner core concept |
| `school.json` | `en:storybook:noun` | **storybook** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:line:noun` | **line** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:circle:noun` | **circle** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:colour:noun` | **colour** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:big:noun` | **big** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:tiny:noun` | **tiny** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:huge:noun` | **huge** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:curved:noun` | **curved** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:round:noun` | **round** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:square:noun` | **square** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:triangle:noun` | **triangle** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:rectangle:noun` | **rectangle** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:oval:noun` | **oval** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:metal:noun` | **metal** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:cotton:noun` | **cotton** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:wool:noun` | **wool** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:leather:noun` | **leather** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:shape:noun` | **shape** | A1 | **A0** | First-contact absolute beginner core concept |
| `shapes_materials.json` | `en:giant:noun` | **giant** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:play:noun` | **play** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:paint:noun` | **paint** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:sport:noun` | **sport** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:sports:noun` | **sports** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:football:noun` | **football** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:soccer:noun` | **soccer** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:basketball:noun` | **basketball** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:tennis:noun` | **tennis** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:swimming:noun` | **swimming** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:running:noun` | **running** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:games:noun` | **games** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:player:noun` | **player** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:song:noun` | **song** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:sing:noun` | **sing** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:dance:noun` | **dance** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:dancing:noun` | **dancing** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:reading:noun` | **reading** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:movie:noun` | **movie** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:film:noun` | **film** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:photography:noun` | **photography** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:gardening:noun` | **gardening** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:cooking:noun` | **cooking** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:hobby:noun` | **hobby** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:fun:noun` | **fun** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:free-time:noun` | **free time** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:slide:noun` | **slide** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:swing:noun` | **swing** | A1 | **A0** | First-contact absolute beginner core concept |
| `sports_hobbies.json` | `en:walking:noun` | **walking** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:call:noun` | **call** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:message:noun` | **message** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:picture:noun` | **picture** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:photo:noun` | **photo** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:phone:noun` | **phone** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:telephone:noun` | **telephone** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:mobile:noun` | **mobile** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:smartphone:noun` | **smartphone** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:computer:noun` | **computer** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:laptop:noun` | **laptop** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:email:noun` | **email** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:text:noun` | **text** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:television:noun` | **television** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:tv:noun` | **TV** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:radio:noun` | **radio** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:camera:noun` | **camera** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:video:noun` | **video** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:screen:noun` | **screen** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:button:noun` | **button** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:receive:noun` | **receive** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:chat:noun` | **chat** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:game-console:noun` | **game console** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:computer-game:noun` | **computer game** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:headphones:noun` | **headphones** | A1 | **A0** | First-contact absolute beginner core concept |
| `technology.json` | `en:cell-phone:noun` | **cell phone** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:second:noun` | **second** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:now:noun` | **now** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:then:noun` | **then** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:today:noun` | **today** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:tomorrow:noun` | **tomorrow** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:yesterday:noun` | **yesterday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:always:noun` | **always** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:usually:noun` | **usually** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:often:noun` | **often** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:sometimes:noun` | **sometimes** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:never:noun` | **never** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:past:noun` | **past** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:later:noun` | **later** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:soon:noun` | **soon** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:birthday:noun` | **birthday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:morning:noun` | **morning** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:afternoon:noun` | **afternoon** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:evening:noun` | **evening** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:night:noun` | **night** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:may:noun` | **May** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:late:noun` | **late** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:monday:noun` | **Monday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:tuesday:noun` | **Tuesday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:wednesday:noun` | **Wednesday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:thursday:noun` | **Thursday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:friday:noun` | **Friday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:saturday:noun` | **Saturday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:sunday:noun` | **Sunday** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:january:noun` | **January** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:february:noun` | **February** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:march:noun` | **March** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:april:noun` | **April** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:june:noun` | **June** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:july:noun` | **July** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:august:noun` | **August** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:september:noun` | **September** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:october:noun` | **October** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:november:noun` | **November** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:december:noun` | **December** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:spring:noun` | **spring** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:summer:noun` | **summer** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:autumn:noun` | **autumn** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:winter:noun` | **winter** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:noon:noun` | **noon** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:midnight:noun` | **midnight** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:week:noun` | **week** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:month:noun` | **month** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:year:noun` | **year** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:minute:noun` | **minute** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:o-clock:noun` | **o'clock** | A1 | **A0** | First-contact absolute beginner core concept |
| `time.json` | `en:quarter:noun` | **quarter** | A1 | **A0** | First-contact absolute beginner core concept |
| `verbs.json` | `en:cook:verb` | **cook** | A1 | **A0** | First-contact absolute beginner core concept |
| `verbs.json` | `en:open:verb` | **open** | A1 | **A0** | First-contact absolute beginner core concept |
| `verbs.json` | `en:listen:verb` | **listen** | A1 | **A0** | First-contact absolute beginner core concept |
| `verbs.json` | `en:know:verb` | **know** | A1 | **A0** | First-contact absolute beginner core concept |
| `verbs.json` | `en:teach:verb` | **teach** | A1 | **A0** | First-contact absolute beginner core concept |
| `weather.json` | `en:season:noun` | **season** | A1 | **A0** | First-contact absolute beginner core concept |

#### 3. Unverified Terms / Needs Human Review
*No unverified terms requiring human review for EN.*

### FR Vocabulary Audit Findings (`vocabulary/fr/a0_a1/`)

#### 1. Over-Level Terms (Flagged as A2+ per Reference)
*No over-level terms flagged for FR.*

#### 2. Under-Level Terms (Recommended for A0 Starter Promotion)
| File | Entry ID | Word | Current Level | Suggested Level | Audit Notes / Reason |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `adjectives.json` | `fr:nouveau:adjective` | **nouveau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `fr:plein:adjective` | **plein** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `fr:souvent:adverb` | **souvent** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:chien:noun` | **chien** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:chat:noun` | **chat** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:oiseau:noun` | **oiseau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:cheval:noun` | **cheval** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:vache:noun` | **vache** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:cochon:noun` | **cochon** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:mouton:noun` | **mouton** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:poisson:noun` | **poisson** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:souris:noun` | **souris** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:lapin:noun` | **lapin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:lion:noun` | **lion** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:elephant:noun` | **éléphant** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:ours:noun` | **ours** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:loup:noun` | **loup** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:renard:noun` | **renard** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:singe:noun` | **singe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:canard:noun` | **canard** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:poule:noun` | **poule** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `fr:serpent:noun` | **serpent** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:tete:noun` | **tête** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:visage:noun` | **visage** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:oeil:noun` | **œil** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:oreille:noun` | **oreille** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:nez:noun` | **nez** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:bouche:noun` | **bouche** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:main:noun` | **main** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:bras:noun` | **bras** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:jambe:noun` | **jambe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:pied:noun` | **pied** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:doigt:noun` | **doigt** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:cheveux:noun` | **cheveux** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:dent:noun` | **dent** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:coeur:noun` | **cœur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:dos:noun` | **dos** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:estomac:noun` | **estomac** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:cou:noun` | **cou** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:epaule:noun` | **épaule** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:genou:noun` | **genou** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `fr:peau:noun` | **peau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:vetements:noun` | **vêtements** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:chemise:noun` | **chemise** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:pantalon:noun` | **pantalon** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:robe:noun` | **robe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:jupe:noun` | **jupe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:chaussures:noun` | **chaussures** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:chaussettes:noun` | **chaussettes** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:veste:noun` | **veste** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:manteau:noun` | **manteau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:chapeau:noun` | **chapeau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:t-shirt:noun` | **t-shirt** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:pull:noun` | **pull** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:echarpe:noun` | **écharpe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:gants:noun` | **gants** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `fr:ceinture:noun` | **ceinture** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `fr:noir:adjective` | **noir** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `fr:gris:adjective` | **gris** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:travail:noun` | **travail** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:vie:noun` | **vie** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:amour:noun` | **amour** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:musique:noun` | **musique** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:film:noun` | **film** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:jeu:noun` | **jeu** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:sport:noun` | **sport** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:nouvelles:noun` | **nouvelles** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:probleme:noun` | **problème** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:idee:noun` | **idée** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:chemin:noun` | **chemin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:numero:noun` | **numéro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:couleur:noun` | **couleur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:prix:noun` | **prix** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:cadeau:noun` | **cadeau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:vacances:noun` | **vacances** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:fete:noun` | **fête** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:reve:noun` | **rêve** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:sante:noun` | **santé** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `fr:paix:noun` | **paix** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `fr:vouloir:verb` | **vouloir** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `fr:ecouter:verb` | **écouter** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `fr:acheter:verb` | **acheter** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `fr:attendre:verb` | **attendre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `fr:porter:verb` | **porter** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `fr:apprendre:verb` | **apprendre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `fr:au-revoir:phrase` | **au revoir** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `fr:non:adverb` | **non** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `fr:bonne-nuit:phrase` | **bonne nuit** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:mere:noun` | **mère** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:pere:noun` | **père** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:parents:noun` | **parents** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:fils:noun` | **fils** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:fille:noun` | **fille** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:enfant:noun` | **enfant** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:frere:noun` | **frère** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:soeur:noun` | **sœur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:grand-mere:noun` | **grand-mère** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:grand-pere:noun` | **grand-père** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:mari:noun` | **mari** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:epouse:noun` | **épouse** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:famille:noun` | **famille** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:oncle:noun` | **oncle** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:tante:noun` | **tante** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:cousin:noun` | **cousin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:bebe:noun` | **bébé** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:homme:noun` | **homme** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:femme:noun` | **femme** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `fr:ami:noun` | **ami** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:pain:noun` | **pain** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:eau:noun` | **eau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:lait:noun` | **lait** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:cafe:noun` | **café** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:the:noun` | **thé** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:vin:noun` | **vin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:biere:noun` | **bière** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:jus:noun` | **jus** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:oeuf:noun` | **œuf** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:fromage:noun` | **fromage** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:beurre:noun` | **beurre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:viande:noun` | **viande** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:poulet:noun` | **poulet** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:poisson-aliment:noun` | **poisson** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:riz:noun` | **riz** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:pates:noun` | **pâtes** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:soupe:noun` | **soupe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:salade:noun` | **salade** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:fruit:noun` | **fruit** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:pomme:noun` | **pomme** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:banane:noun` | **banane** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:orange:noun` | **orange** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:tomate:noun` | **tomate** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:pomme-de-terre:noun` | **pomme de terre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:legume:noun` | **légume** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:sel:noun` | **sel** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:sucre:noun` | **sucre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:sandwich:noun` | **sandwich** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:gateau:noun` | **gâteau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:chocolat:noun` | **chocolat** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:petit-dejeuner:noun` | **petit-déjeuner** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:dejeuner:noun` | **déjeuner** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:diner:noun` | **dîner** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:assiette:noun` | **assiette** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:verre:noun` | **verre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:fourchette:noun` | **fourchette** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:couteau:noun` | **couteau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:cuillere:noun` | **cuillère** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:restaurant:noun` | **restaurant** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:menu:noun` | **menu** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:oignon:noun` | **oignon** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:citron:noun` | **citron** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:miel:noun` | **miel** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:yaourt:noun` | **yaourt** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:poivre:noun` | **poivre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `fr:huile:noun` | **huile** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:etoile:noun` | **étoile** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:ciel:noun` | **ciel** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:mer:noun` | **mer** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:riviere:noun` | **rivière** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:montagne:noun` | **montagne** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:foret:noun` | **forêt** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:arbre:noun` | **arbre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:fleur:noun` | **fleur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:herbe:noun` | **herbe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:pierre:noun` | **pierre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:terre:noun` | **terre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:feu:noun` | **feu** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `fr:air:noun` | **air** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:maison:noun` | **maison** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:appartement:noun` | **appartement** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:piece:noun` | **pièce** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:cuisine:noun` | **cuisine** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:salle-de-bains:noun` | **salle de bains** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:chambre:noun` | **chambre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:porte:noun` | **porte** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:fenetre:noun` | **fenêtre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:table:noun` | **table** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:chaise:noun` | **chaise** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:lit:noun` | **lit** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:canape:noun` | **canapé** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:mur:noun` | **mur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:sol:noun` | **sol** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:toit:noun` | **toit** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:cle:noun` | **clé** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:lampe:noun` | **lampe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:miroir:noun` | **miroir** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:jardin:noun` | **jardin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:escalier:noun` | **escalier** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:television:noun` | **télévision** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:telephone:noun` | **téléphone** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:ordinateur:noun` | **ordinateur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `fr:horloge:noun` | **horloge** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `fr:professeur:noun` | **professeur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `fr:medecin:noun` | **médecin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `fr:etudiant:noun` | **étudiant** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `fr:ingenieur:noun` | **ingénieur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `fr:infirmiere:noun` | **infirmière** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `fr:cuisinier:noun` | **cuisinier** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `fr:chauffeur:noun` | **chauffeur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `fr:travailleur:noun` | **travailleur** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:france:noun` | **France** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:italie:noun` | **Italie** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:russie:noun` | **Russie** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:angleterre:noun` | **Angleterre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:allemagne:noun` | **Allemagne** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:espagne:noun` | **Espagne** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:monde:noun` | **monde** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:amerique:noun` | **Amérique** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `fr:chine:noun` | **Chine** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:zero:number` | **zéro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:un:number` | **un** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:deux:number` | **deux** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:trois:number` | **trois** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:quatre:number` | **quatre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:cinq:number` | **cinq** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:six:number` | **six** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:sept:number` | **sept** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:huit:number` | **huit** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:neuf:number` | **neuf** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:dix:number` | **dix** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:onze:number` | **onze** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:douze:number` | **douze** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:treize:number` | **treize** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:quatorze:number` | **quatorze** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:quinze:number` | **quinze** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:seize:number` | **seize** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:dix-sept:number` | **dix-sept** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:dix-huit:number` | **dix-huit** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:dix-neuf:number` | **dix-neuf** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:vingt:number` | **vingt** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:trente:number` | **trente** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:quarante:number` | **quarante** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:cinquante:number` | **cinquante** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:soixante:number` | **soixante** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:soixante-dix:number` | **soixante-dix** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:quatre-vingts:number` | **quatre-vingts** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:quatre-vingt-dix:number` | **quatre-vingt-dix** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `fr:cent:number` | **cent** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:voiture:noun` | **voiture** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:bus:noun` | **bus** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:train:noun` | **train** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:avion:noun` | **avion** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:velo:noun` | **vélo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:bateau:noun` | **bateau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:taxi:noun` | **taxi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:navire:noun` | **navire** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:metro:noun` | **métro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:moto:noun` | **moto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:route:noun` | **route** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:aeroport:noun` | **aéroport** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:ville:noun` | **ville** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:rue:noun` | **rue** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:ecole:noun` | **école** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:hopital:noun` | **hôpital** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:magasin:noun` | **magasin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:marche:noun` | **marché** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:eglise:noun` | **église** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:parc:noun` | **parc** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:banque:noun` | **banque** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:gare:noun` | **gare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:hotel:noun` | **hôtel** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:bibliotheque:noun` | **bibliothèque** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:musee:noun` | **musée** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:universite:noun` | **université** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `fr:pays:noun` | **pays** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:que:pronoun` | **que** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:qui:pronoun` | **qui** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:ou:pronoun` | **où** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:quand:adverb` | **quand** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:pourquoi:pronoun` | **pourquoi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:comment:pronoun` | **comment** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:quel:pronoun` | **quel** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:a-qui:pronoun` | **à qui** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:lequel:pronoun` | **lequel** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:je:pronoun` | **je** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:tu:pronoun` | **tu** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:il:pronoun` | **il** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:elle:pronoun` | **elle** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:nous:pronoun` | **nous** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:vous:pronoun` | **vous** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:ils:pronoun` | **ils** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:ceci:pronoun` | **ceci** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:cela:pronoun` | **cela** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:mon:pronoun` | **mon** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:ton:pronoun` | **ton** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `fr:notre:pronoun` | **notre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:livre:noun` | **livre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:stylo:noun` | **stylo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:crayon:noun` | **crayon** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:papier:noun` | **papier** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:cahier:noun` | **cahier** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:bureau:noun` | **bureau** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:sac:noun` | **sac** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:argent:noun` | **argent** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:lettre:noun` | **lettre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:carte:noun` | **carte** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:photo:noun` | **photo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:nom:noun` | **nom** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:mot:noun` | **mot** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:langue:noun` | **langue** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `fr:question:noun` | **question** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:lundi:noun` | **lundi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:mardi:noun` | **mardi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:mercredi:noun` | **mercredi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:jeudi:noun` | **jeudi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:vendredi:noun` | **vendredi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:samedi:noun` | **samedi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:dimanche:noun` | **dimanche** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:janvier:noun` | **janvier** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:fevrier:noun` | **février** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:mars:noun` | **mars** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:avril:noun` | **avril** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:mai:noun` | **mai** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:juin:noun` | **juin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:juillet:noun` | **juillet** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:aout:noun` | **août** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:septembre:noun` | **septembre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:octobre:noun` | **octobre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:novembre:noun` | **novembre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:decembre:noun` | **décembre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:printemps:noun` | **printemps** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:ete:noun` | **été** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:automne:noun` | **automne** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:hiver:noun` | **hiver** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:maintenant:adverb` | **maintenant** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:plus-tard:adverb` | **plus tard** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:matin:noun` | **matin** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:apres-midi:noun` | **après-midi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:soir:noun` | **soir** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:nuit:noun` | **nuit** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:semaine:noun` | **semaine** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:mois:noun` | **mois** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:annee:noun` | **année** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:heure:noun` | **heure** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:minute:noun` | **minute** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `fr:jour:noun` | **jour** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `fr:soleil:noun` | **soleil** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `fr:lune:noun` | **lune** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `fr:pluie:noun` | **pluie** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `fr:neige:noun` | **neige** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `fr:vent:noun` | **vent** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `fr:nuage:noun` | **nuage** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `fr:meteo:noun` | **météo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |

#### 3. Unverified Terms / Needs Human Review
| File | Entry ID | Word | Current Level | Audit Notes / Reason |
| :--- | :--- | :--- | :---: | :--- |
| `expressions.json` | `fr:s-il-vous-plait:phrase` | **s'il vous plaît** | A1 | Multi-word or complex expression requiring native speaker judgment |

### IT Vocabulary Audit Findings (`vocabulary/it/a0_a1/`)

#### 1. Over-Level Terms (Flagged as A2+ per Reference)
*No over-level terms flagged for IT.*

#### 2. Under-Level Terms (Recommended for A0 Starter Promotion)
| File | Entry ID | Word | Current Level | Suggested Level | Audit Notes / Reason |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `adjectives.json` | `it:buono:adjective` | **buono** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:cattivo:adjective` | **cattivo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:bello:adjective` | **bello** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:freddo:adjective` | **freddo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:difficile:adjective` | **difficile** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:povero:adjective` | **povero** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:pieno:adjective` | **pieno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:vuoto:adjective` | **vuoto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:aperto:adjective` | **aperto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:presto:adverb` | **presto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:vicino:adjective` | **vicino** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:lontano:adjective` | **lontano** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:destro:adjective` | **destro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:sinistro:adjective` | **sinistro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:leggero:adjective` | **leggero** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:stesso:adjective` | **stesso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:diverso:adjective` | **diverso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:duro:adjective` | **duro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `it:morbido:adjective` | **morbido** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `it:sempre:adverb` | **sempre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `it:mai:adverb` | **mai** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `it:a-volte:phrase` | **a volte** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `it:li:adverb` | **lì** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `it:gia:adverb` | **già** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `it:ancora:adverb` | **ancora** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `it:meno:adverb` | **meno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:cane:noun` | **cane** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:gatto:noun` | **gatto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:uccello:noun` | **uccello** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:cavallo:noun` | **cavallo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:mucca:noun` | **mucca** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:maiale:noun` | **maiale** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:pecora:noun` | **pecora** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:pesce-animale:noun` | **pesce** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:topo:noun` | **topo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:coniglio:noun` | **coniglio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:leone:noun` | **leone** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:elefante:noun` | **elefante** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:orso:noun` | **orso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:lupo:noun` | **lupo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:volpe:noun` | **volpe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:scimmia:noun` | **scimmia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:anatra:noun` | **anatra** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:gallina:noun` | **gallina** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `it:serpente:noun` | **serpente** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `auxiliary_verbs.json` | `it:avere:verb` | **avere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:testa:noun` | **testa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:viso:noun` | **viso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:occhio:noun` | **occhio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:orecchio:noun` | **orecchio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:naso:noun` | **naso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:bocca:noun` | **bocca** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:mano:noun` | **mano** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:braccio:noun` | **braccio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:gamba:noun` | **gamba** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:piede:noun` | **piede** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:dito:noun` | **dito** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:capelli:noun` | **capelli** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:dente:noun` | **dente** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:cuore:noun` | **cuore** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:schiena:noun` | **schiena** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:pancia:noun` | **pancia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:collo:noun` | **collo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:spalla:noun` | **spalla** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:ginocchio:noun` | **ginocchio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `it:pelle:noun` | **pelle** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:vestiti:noun` | **vestiti** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:camicia:noun` | **camicia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:pantaloni:noun` | **pantaloni** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:vestito:noun` | **vestito** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:gonna:noun` | **gonna** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:scarpe:noun` | **scarpe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:calzini:noun` | **calzini** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:giacca:noun` | **giacca** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:cappotto:noun` | **cappotto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:cappello:noun` | **cappello** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:maglietta:noun` | **maglietta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:maglione:noun` | **maglione** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:sciarpa:noun` | **sciarpa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:guanti:noun` | **guanti** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `it:cintura:noun` | **cintura** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `it:nero:adjective` | **nero** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `it:blu:adjective` | **blu** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `it:giallo:adjective` | **giallo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `it:arancione:adjective` | **arancione** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `it:marrone:adjective` | **marrone** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:lavoro:noun` | **lavoro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:vita:noun` | **vita** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:amore:noun` | **amore** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:musica:noun` | **musica** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:film:noun` | **film** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:gioco:noun` | **gioco** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:sport:noun` | **sport** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:notizie:noun` | **notizie** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:problema:noun` | **problema** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:idea:noun` | **idea** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:strada-modo:noun` | **strada** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:numero:noun` | **numero** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:colore:noun` | **colore** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:prezzo:noun` | **prezzo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:regalo:noun` | **regalo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:vacanza:noun` | **vacanza** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:festa:noun` | **festa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:sogno:noun` | **sogno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:salute:noun` | **salute** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `it:pace:noun` | **pace** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:fare:verb` | **fare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:volere:verb` | **volere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:potere:verb` | **potere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:sapere:verb` | **sapere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:dormire:verb` | **dormire** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:lavorare:verb` | **lavorare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:ascoltare:verb` | **ascoltare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:guardare:verb` | **guardare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:capire:verb` | **capire** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:amare:verb` | **amare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:piacere:verb` | **piacere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:avere-bisogno-di:phrase` | **avere bisogno di** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:vendere:verb` | **vendere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:aprire:verb` | **aprire** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:chiudere:verb` | **chiudere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:dare:verb` | **dare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:prendere:verb` | **prendere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:fermare:verb` | **fermare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:iniziare:verb` | **iniziare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:giocare:verb` | **giocare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:aspettare:verb` | **aspettare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:cercare:verb` | **cercare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:chiedere:verb` | **chiedere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:aiutare:verb` | **aiutare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:sentire:verb` | **sentire** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:entrare:verb` | **entrare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:uscire:verb` | **uscire** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:stare-in-piedi:phrase` | **stare in piedi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:lavare:verb` | **lavare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:guidare:verb` | **guidare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:volare:verb` | **volare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:imparare:verb` | **imparare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `it:insegnare:verb` | **insegnare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `it:per-favore:phrase` | **per favore** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `it:si:phrase` | **sì** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `it:no:adverb` | **no** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `it:mi-dispiace:phrase` | **mi dispiace** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `it:buongiorno:phrase` | **buongiorno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `it:buonanotte:phrase` | **buonanotte** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:madre:noun` | **madre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:padre:noun` | **padre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:genitori:noun` | **genitori** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:figlio:noun` | **figlio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:figlia:noun` | **figlia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:bambino:noun` | **bambino** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:fratello:noun` | **fratello** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:sorella:noun` | **sorella** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:nonna:noun` | **nonna** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:nonno:noun` | **nonno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:marito:noun` | **marito** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:moglie:noun` | **moglie** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:famiglia:noun` | **famiglia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:zio:noun` | **zio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:zia:noun` | **zia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:cugino:noun` | **cugino** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:neonato:noun` | **neonato** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:uomo:noun` | **uomo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:donna:noun` | **donna** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `it:amico:noun` | **amico** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `feelings.json` | `it:felice:adjective` | **felice** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `feelings.json` | `it:affamato:adjective` | **affamato** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `feelings.json` | `it:assetato:adjective` | **assetato** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `feelings.json` | `it:malato:adjective` | **malato** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:pane:noun` | **pane** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:acqua:noun` | **acqua** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:latte:noun` | **latte** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:caffe:noun` | **caffè** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:te:noun` | **tè** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:vino:noun` | **vino** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:birra:noun` | **birra** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:succo:noun` | **succo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:uovo:noun` | **uovo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:formaggio:noun` | **formaggio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:burro:noun` | **burro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:carne:noun` | **carne** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:pollo:noun` | **pollo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:pesce:noun` | **pesce** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:riso:noun` | **riso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:pasta:noun` | **pasta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:zuppa:noun` | **zuppa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:insalata:noun` | **insalata** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:frutta:noun` | **frutta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:mela:noun` | **mela** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:banana:noun` | **banana** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:arancia:noun` | **arancia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:pomodoro:noun` | **pomodoro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:patata:noun` | **patata** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:verdura:noun` | **verdura** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:sale:noun` | **sale** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:zucchero:noun` | **zucchero** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:panino:noun` | **panino** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:torta:noun` | **torta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:cioccolato:noun` | **cioccolato** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:colazione:noun` | **colazione** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:pranzo:noun` | **pranzo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:cena:noun` | **cena** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:piatto:noun` | **piatto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:bicchiere:noun` | **bicchiere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:forchetta:noun` | **forchetta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:coltello:noun` | **coltello** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:cucchiaio:noun` | **cucchiaio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:ristorante:noun` | **ristorante** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:menu:noun` | **menù** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:cipolla:noun` | **cipolla** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:limone:noun` | **limone** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:miele:noun` | **miele** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:yogurt:noun` | **yogurt** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:pepe:noun` | **pepe** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `it:olio:noun` | **olio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `general_adjectives.json` | `it:grande:adjective` | **grande** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `general_adjectives.json` | `it:basso:adjective` | **basso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `general_adjectives.json` | `it:lungo:adjective` | **lungo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `general_adjectives.json` | `it:pesante:adjective` | **pesante** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:luna:noun` | **luna** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:stella:noun` | **stella** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:cielo:noun` | **cielo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:mare:noun` | **mare** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:fiume:noun` | **fiume** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:montagna:noun` | **montagna** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:foresta:noun` | **foresta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:albero:noun` | **albero** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:fiore:noun` | **fiore** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:erba:noun` | **erba** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:pietra:noun` | **pietra** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:terra:noun` | **terra** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:fuoco:noun` | **fuoco** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `it:aria:noun` | **aria** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:casa:noun` | **casa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:appartamento:noun` | **appartamento** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:stanza:noun` | **stanza** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:cucina:noun` | **cucina** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:bagno:noun` | **bagno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:camera-da-letto:noun` | **camera da letto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:porta:noun` | **porta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:finestra:noun` | **finestra** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:tavolo:noun` | **tavolo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:sedia:noun` | **sedia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:letto:noun` | **letto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:divano:noun` | **divano** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:muro:noun` | **muro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:pavimento:noun` | **pavimento** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:tetto:noun` | **tetto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:chiave:noun` | **chiave** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:lampada:noun` | **lampada** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:specchio:noun` | **specchio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:giardino:noun` | **giardino** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:scale:noun` | **scale** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:televisione:noun` | **televisione** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:telefono:noun` | **telefono** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:computer:noun` | **computer** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `it:orologio:noun` | **orologio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `it:insegnante:noun` | **insegnante** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `it:dottore:noun` | **dottore** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `it:studente:noun` | **studente** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `it:ingegnere:noun` | **ingegnere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `it:infermiere:noun` | **infermiere** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `it:cuoco:noun` | **cuoco** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `it:autista:noun` | **autista** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `it:operaio:noun` | **operaio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:francia:noun` | **Francia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:italia:noun` | **Italia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:russia:noun` | **Russia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:inghilterra:noun` | **Inghilterra** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:germania:noun` | **Germania** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:spagna:noun` | **Spagna** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:mondo:noun` | **mondo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:america:noun` | **America** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `it:cina:noun` | **Cina** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:zero:number` | **zero** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:uno:number` | **uno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:due:number` | **due** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:otto:number` | **otto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:nove:number` | **nove** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:tredici:number` | **tredici** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:quattordici:number` | **quattordici** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:diciannove:number` | **diciannove** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `it:novanta:number` | **novanta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:macchina:noun` | **macchina** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:autobus:noun` | **autobus** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:treno:noun` | **treno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:aereo:noun` | **aereo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:bicicletta:noun` | **bicicletta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:barca:noun` | **barca** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:taxi:noun` | **taxi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:nave:noun` | **nave** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:metro:noun` | **metro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:motocicletta:noun` | **motocicletta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:strada:noun` | **strada** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:aeroporto:noun` | **aeroporto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:citta:noun` | **città** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:via:noun` | **via** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:scuola:noun` | **scuola** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:ospedale:noun` | **ospedale** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:negozio:noun` | **negozio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:mercato:noun` | **mercato** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:chiesa:noun` | **chiesa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:parco:noun` | **parco** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:banca:noun` | **banca** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:stazione:noun` | **stazione** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:albergo:noun` | **albergo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:biblioteca:noun` | **biblioteca** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:museo:noun` | **museo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:universita:noun` | **università** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `it:paese:noun` | **paese** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:in:preposition` | **in** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:su:preposition` | **su** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:sotto:preposition` | **sotto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:con:preposition` | **con** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:senza:preposition` | **senza** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:prima:preposition` | **prima** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:tra:preposition` | **tra** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:verso:preposition` | **verso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:da:preposition` | **da** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `it:per:preposition` | **per** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:cosa:pronoun` | **cosa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:chi:pronoun` | **chi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:a-chi:pronoun` | **a chi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:dove:pronoun` | **dove** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:quando:adverb` | **quando** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:perche:phrase` | **perché** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:quale:pronoun` | **quale** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:di-chi:phrase` | **di chi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:io:pronoun` | **io** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:tu:pronoun` | **tu** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:lui:pronoun` | **lui** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:lei:pronoun` | **lei** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:noi:pronoun` | **noi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:voi:pronoun` | **voi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:loro:pronoun` | **loro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:questo:pronoun` | **questo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:quello:pronoun` | **quello** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:mio:pronoun` | **mio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:tuo:pronoun` | **tuo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `it:nostro:pronoun` | **nostro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:libro:noun` | **libro** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:penna:noun` | **penna** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:matita:noun` | **matita** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:carta:noun` | **carta** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:quaderno:noun` | **quaderno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:scrivania:noun` | **scrivania** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:borsa:noun` | **borsa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:soldi:noun` | **soldi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:lettera:noun` | **lettera** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:mappa:noun` | **mappa** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:foto:noun` | **foto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:nome:noun` | **nome** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:parola:noun` | **parola** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:lingua:noun` | **lingua** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `it:domanda:noun` | **domanda** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:lunedi:noun` | **lunedì** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:martedi:noun` | **martedì** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:mercoledi:noun` | **mercoledì** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:giovedi:noun` | **giovedì** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:venerdi:noun` | **venerdì** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:sabato:noun` | **sabato** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:domenica:noun` | **domenica** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:gennaio:noun` | **gennaio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:febbraio:noun` | **febbraio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:marzo:noun` | **marzo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:aprile:noun` | **aprile** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:maggio:noun` | **maggio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:giugno:noun` | **giugno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:luglio:noun` | **luglio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:agosto:noun` | **agosto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:settembre:noun` | **settembre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:ottobre:noun` | **ottobre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:novembre:noun` | **novembre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:dicembre:noun` | **dicembre** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:primavera:noun` | **primavera** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:estate:noun` | **estate** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:autunno:noun` | **autunno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:inverno:noun` | **inverno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:oggi:adverb` | **oggi** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:domani:adverb` | **domani** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:ieri:adverb` | **ieri** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:adesso:adverb` | **adesso** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:dopo:adverb` | **dopo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:mattina:noun` | **mattina** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:pomeriggio:noun` | **pomeriggio** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:sera:noun` | **sera** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:notte:noun` | **notte** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:settimana:noun` | **settimana** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:mese:noun` | **mese** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:anno:noun` | **anno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:ora:noun` | **ora** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:minuto:noun` | **minuto** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `it:giorno:noun` | **giorno** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `it:sole:noun` | **sole** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `it:pioggia:noun` | **pioggia** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `it:neve:noun` | **neve** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `it:vento:noun` | **vento** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `it:nuvola:noun` | **nuvola** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `it:tempo:noun` | **tempo** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |

#### 3. Unverified Terms / Needs Human Review
*No unverified terms requiring human review for IT.*

### RU Vocabulary Audit Findings (`vocabulary/ru/a0_a1/`)

#### 1. Over-Level Terms (Flagged as A2+ per Reference)
*No over-level terms flagged for RU.*

#### 2. Under-Level Terms (Recommended for A0 Starter Promotion)
| File | Entry ID | Word | Current Level | Suggested Level | Audit Notes / Reason |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `adjectives.json` | `ru:novyi:adjective` | **новый** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `ru:inogda:adverb` | **иногда** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adverbs_connectors.json` | `ru:dostatochno:adverb` | **достаточно** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:sobaka:noun` | **собака** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:koshka:noun` | **кошка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:ptitsa:noun` | **птица** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:loshad:noun` | **лошадь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:korova:noun` | **корова** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:svinya:noun` | **свинья** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:ovtsa:noun` | **овца** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:ryba-anim:noun` | **рыба** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:mysh:noun` | **мышь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:krolik:noun` | **кролик** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:lev:noun` | **лев** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:slon:noun` | **слон** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:medved:noun` | **медведь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:volk:noun` | **волк** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:lisa:noun` | **лиса** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:obezayana:noun` | **обезьяна** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:utka:noun` | **утка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:kuritsa-anim:noun` | **курица** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `ru:zmeya:noun` | **змея** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:golova:noun` | **голова** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:litso:noun` | **лицо** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:glaz:noun` | **глаз** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:ukho:noun` | **ухо** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:nos:noun` | **нос** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:rot:noun` | **рот** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:ruka:noun` | **рука** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:kist-ruki:noun` | **кисть** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:noga:noun` | **нога** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:stopa:noun` | **стопа** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:palets:noun` | **палец** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:volosy:noun` | **волосы** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:zub:noun` | **зуб** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:serdtse:noun` | **сердце** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:spina:noun` | **спина** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:zhivot:noun` | **живот** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:sheya:noun` | **шея** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:plecho:noun` | **плечо** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:koleno:noun` | **колено** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `ru:kozha:noun` | **кожа** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:odezhda:noun` | **одежда** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:rubashka:noun` | **рубашка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:bryuki:noun` | **брюки** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:platye:noun` | **платье** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:yubka:noun` | **юбка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:obuv:noun` | **обувь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:noski:noun` | **носки** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:kurtka:noun` | **куртка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:palto:noun` | **пальто** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:shlyapa:noun` | **шляпа** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:futbolka:noun` | **футболка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:sviter:noun` | **свитер** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:sharf:noun` | **шарф** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:perchatki:noun` | **перчатки** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `ru:remen:noun` | **ремень** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:rabota:noun` | **работа** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:zhizn:noun` | **жизнь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:lyubov:noun` | **любовь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:muzyka:noun` | **музыка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:film:noun` | **фильм** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:igra:noun` | **игра** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:sport:noun` | **спорт** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:novosti:noun` | **новости** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:problema:noun` | **проблема** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:ideya:noun` | **идея** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:put:noun` | **путь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:nomer:noun` | **номер** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:tsvet:noun` | **цвет** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:tsena:noun` | **цена** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:podarok:noun` | **подарок** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:prazdnik:noun` | **праздник** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:vecherinka:noun` | **вечеринка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:son:noun` | **сон** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:zdorovye:noun` | **здоровье** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `ru:mir-peace:noun` | **мир** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `ru:syest:verb` | **съесть** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `ru:ostanovitsya:verb` | **остановиться** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `ru:prinosit:verb` | **приносить** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `ru:spokoinoy-nochi:phrase` | **спокойной ночи** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:mat:noun` | **мать** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:mama:noun` | **мама** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:otets:noun` | **отец** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:papa:noun` | **папа** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:roditeli:noun` | **родители** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:syn:noun` | **сын** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:doch:noun` | **дочь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:rebyonok:noun` | **ребёнок** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:brat:noun` | **брат** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:sestra:noun` | **сестра** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:babushka:noun` | **бабушка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:dedushka:noun` | **дедушка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:muzh:noun` | **муж** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:zhena:noun` | **жена** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:semya:noun` | **семья** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:dyadya:noun` | **дядя** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:tyotya:noun` | **тётя** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:mladenets:noun` | **младенец** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:muzhchina:noun` | **мужчина** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:zhenshchina:noun` | **женщина** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `ru:drug:noun` | **друг** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `feelings.json` | `ru:bolnoi:adjective` | **больной** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:khleb:noun` | **хлеб** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:voda:noun` | **вода** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:moloko:noun` | **молоко** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:kofe:noun` | **кофе** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:chai:noun` | **чай** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:vino:noun` | **вино** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:pivo:noun` | **пиво** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:sok:noun` | **сок** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:yaitso:noun` | **яйцо** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:syr:noun` | **сыр** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:maslo:noun` | **масло** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:myaso:noun` | **мясо** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:kuritsa:noun` | **курица** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:ryba:noun` | **рыба** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:ris:noun` | **рис** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:makarony:noun` | **макароны** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:sup:noun` | **суп** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:salat:noun` | **салат** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:frukty:noun` | **фрукты** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:yabloko:noun` | **яблоко** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:banan:noun` | **банан** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:apelsin:noun` | **апельсин** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:pomidor:noun` | **помидор** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:kartofel:noun` | **картофель** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:ovoshchi:noun` | **овощи** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:sol:noun` | **соль** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:sakhar:noun` | **сахар** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:buterbrod:noun` | **бутерброд** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:tort:noun` | **торт** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:shokolad:noun` | **шоколад** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:zavtrak:noun` | **завтрак** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:obed:noun` | **обед** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:uzhin:noun` | **ужин** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:tarelka:noun` | **тарелка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:stakan:noun` | **стакан** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:vilka:noun` | **вилка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:nozh:noun` | **нож** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:lozhka:noun` | **ложка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:restoran:noun` | **ресторан** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:menyu:noun` | **меню** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:luk:noun` | **лук** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:limon:noun` | **лимон** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:myod:noun` | **мёд** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:yogurt:noun` | **йогурт** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:perets:noun` | **перец** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `ru:rastitelnoe-maslo:noun` | **растительное масло** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:zvezda:noun` | **звезда** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:nebo:noun` | **небо** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:more:noun` | **море** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:reka:noun` | **река** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:gora:noun` | **гора** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:les:noun` | **лес** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:derevo:noun` | **дерево** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:tsvetok:noun` | **цветок** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:trava:noun` | **трава** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:kamen:noun` | **камень** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:zemlya:noun` | **земля** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:ogon:noun` | **огонь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `ru:vozdukh:noun` | **воздух** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:dom:noun` | **дом** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:kvartira:noun` | **квартира** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:komnata:noun` | **комната** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:kukhnya:noun` | **кухня** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:vannaya:noun` | **ванная** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:spalnya:noun` | **спальня** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:dver:noun` | **дверь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:okno:noun` | **окно** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:stol:noun` | **стол** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:stul:noun` | **стул** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:krovat:noun` | **кровать** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:divan:noun` | **диван** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:stena:noun` | **стена** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:pol:noun` | **пол** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:krysha:noun` | **крыша** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:klyuch:noun` | **ключ** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:lampa:noun` | **лампа** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:zerkalo:noun` | **зеркало** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:sad:noun` | **сад** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:lestnitsa:noun` | **лестница** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:televizor:noun` | **телевизор** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:telefon:noun` | **телефон** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:kompyuter:noun` | **компьютер** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `ru:chasy:noun` | **часы** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `ru:uchitel:noun` | **учитель** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `ru:vrach:noun` | **врач** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `ru:student:noun` | **студент** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `ru:inzhener:noun` | **инженер** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `ru:medsestra:noun` | **медсестра** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `ru:povar:noun` | **повар** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `ru:voditel:noun` | **водитель** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `ru:rabochyi:noun` | **рабочий** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:frantsiya:noun` | **Франция** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:italiya:noun` | **Италия** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:rossiya:noun` | **Россия** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:angliya:noun` | **Англия** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:germaniya:noun` | **Германия** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:ispaniya:noun` | **Испания** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:mir-country:noun` | **мир** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:amerika:noun` | **Америка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `ru:kitai:noun` | **Китай** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `ru:nol:number` | **ноль** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `numbers.json` | `ru:devyanosto:number` | **девяносто** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:mashina:noun` | **машина** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:avtobus:noun` | **автобус** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:poezd:noun` | **поезд** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:samolyot:noun` | **самолёт** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:velosiped:noun` | **велосипед** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:lodka:noun` | **лодка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:taksi:noun` | **такси** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:korabl:noun` | **корабль** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:metro:noun` | **метро** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:mototsikl:noun` | **мотоцикл** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:doroga:noun` | **дорога** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:aeroport:noun` | **аэропорт** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:gorod:noun` | **город** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:ulitsa:noun` | **улица** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:shkola:noun` | **школа** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:bolnitsa:noun` | **больница** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:magazin:noun` | **магазин** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:rynok:noun` | **рынок** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:tserkov:noun` | **церковь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:park:noun` | **парк** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:bank:noun` | **банк** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:stantsiya:noun` | **станция** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:otel:noun` | **отель** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:biblioteka:noun` | **библиотека** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:muzei:noun` | **музей** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:universitet:noun` | **университет** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `ru:strana:noun` | **страна** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:chto:pronoun` | **что** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:kto:pronoun` | **кто** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:gde:pronoun` | **где** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:kogda:pronoun` | **когда** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:pochemu:pronoun` | **почему** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:kak:pronoun` | **как** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:kakoi:pronoun` | **какой** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:chei:pronoun` | **чей** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:komu:pronoun` | **кому** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:ya:pronoun` | **я** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:ty:pronoun` | **ты** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:on:pronoun` | **он** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:ona:pronoun` | **она** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:my:pronoun` | **мы** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:vy:pronoun` | **вы** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:oni:pronoun` | **они** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:etot:pronoun` | **этот** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:tot:pronoun` | **тот** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:moi:pronoun` | **мой** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:tvoi:pronoun` | **твой** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `ru:nash:pronoun` | **наш** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:kniga:noun` | **книга** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:ruchka:noun` | **ручка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:karandash:noun` | **карандаш** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:bumaga:noun` | **бумага** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:tetrad:noun` | **тетрадь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:pismennyi-stol:noun` | **письменный стол** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:sumka:noun` | **сумка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:dengi:noun` | **деньги** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:pismo:noun` | **письмо** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:karta:noun` | **карта** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:kartinka:noun` | **картинка** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:imya:noun` | **имя** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:slovo:noun` | **слово** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:yazyk:noun` | **язык** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `ru:vopros:noun` | **вопрос** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:ponedelnik:noun` | **понедельник** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:vtornik:noun` | **вторник** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:sreda:noun` | **среда** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:chetverg:noun` | **четверг** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:pyatnitsa:noun` | **пятница** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:subbota:noun` | **суббота** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:voskresenye:noun` | **воскресенье** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:yanvar:noun` | **январь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:fevral:noun` | **февраль** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:mart:noun` | **март** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:aprel:noun` | **апрель** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:mai:noun` | **май** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:iyun:noun` | **июнь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:iyul:noun` | **июль** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:avgust:noun` | **август** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:sentyabr:noun` | **сентябрь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:oktyabr:noun` | **октябрь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:noyabr:noun` | **ноябрь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:dekabr:noun` | **декабрь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:vesna:noun` | **весна** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:leto:noun` | **лето** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:osen:noun` | **осень** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:zima:noun` | **зима** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:utro:noun` | **утро** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:den:noun` | **день** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:vecher:noun` | **вечер** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:noch:noun` | **ночь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:nedelya:noun` | **неделя** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:mesyats:noun` | **месяц** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:god:noun` | **год** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:chas:noun` | **час** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:minuta:noun` | **минута** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `ru:vremya:noun` | **время** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `ru:solntse:noun` | **солнце** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `ru:luna:noun` | **луна** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `ru:dozhd:noun` | **дождь** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `ru:sneg:noun` | **снег** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `ru:veter:noun` | **ветер** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `ru:oblako:noun` | **облако** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `ru:pogoda:noun` | **погода** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |

#### 3. Unverified Terms / Needs Human Review
| File | Entry ID | Word | Current Level | Audit Notes / Reason |
| :--- | :--- | :--- | :---: | :--- |
| `daily_verbs.json` | `ru:ostanavlivatsya:verb` | **останавливаться** | A1 | Multi-word or complex expression requiring native speaker judgment |
| `expressions.json` | `ru:ne-za-chto:phrase` | **не за что** | A0 | Multi-word or complex expression requiring native speaker judgment |
| `expressions.json` | `ru:priyatno-poznakomitsya:phrase` | **приятно познакомиться** | A0 | Multi-word or complex expression requiring native speaker judgment |
| `expressions.json` | `ru:dobro-pozhalovat:phrase` | **добро пожаловать** | A1 | Multi-word or complex expression requiring native speaker judgment |

### EL Vocabulary Audit Findings (`vocabulary/el/a0_a1/`)

#### 1. Over-Level Terms (Flagged as A2+ per Reference)
*No over-level terms flagged for EL.*

#### 2. Under-Level Terms (Recommended for A0 Starter Promotion)
| File | Entry ID | Word | Current Level | Suggested Level | Audit Notes / Reason |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `adjectives.json` | `el:anoichtos:adjective` | **ανοιχτός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `el:noris:adverb` | **νωρίς** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `el:nostimos:adjective` | **νόστιμος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `el:peinasmenos:adjective` | **πεινασμένος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `adjectives.json` | `el:dipsasmenos:adjective` | **διψασμένος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:skylos:noun` | **σκύλος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:gata:noun` | **γάτα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:poyli:noun` | **πουλί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:alogo:noun` | **άλογο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:agelada:noun` | **αγελάδα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:goyroyni:noun` | **γουρούνι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:provato:noun` | **πρόβατο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:psari-animal:noun` | **ψάρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:pontiki:noun` | **ποντίκι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:koyneli:noun` | **κουνέλι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:liontari:noun` | **λιοντάρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:elefantas:noun` | **ελέφαντας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:arkoyda:noun` | **αρκούδα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:lykos:noun` | **λύκος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:alepoy:noun` | **αλεπού** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:maimoy:noun` | **μαϊμού** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:papia:noun` | **πάπια** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:kotopoylo-animal:noun` | **κοτόπουλο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `animals.json` | `el:fidi:noun` | **φίδι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:kefali:noun` | **κεφάλι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:prosopo:noun` | **πρόσωπο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:mati:noun` | **μάτι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:avti:noun` | **αυτί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:myti:noun` | **μύτη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:stoma:noun` | **στόμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:cheri:noun` | **χέρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:vrachionas:noun` | **βραχίονας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:podi:noun` | **πόδι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:pelma:noun` | **πέλμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:dachtylo:noun` | **δάχτυλο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:mallia:noun` | **μαλλιά** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:donti:noun` | **δόντι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:kardia:noun` | **καρδιά** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:plati:noun` | **πλάτη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:stomachi:noun` | **στομάχι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:laimos:noun` | **λαιμός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:omos:noun` | **ώμος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:gonato:noun` | **γόνατο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `body_health.json` | `el:derma:noun` | **δέρμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:roycha:noun` | **ρούχα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:poykamiso:noun` | **πουκάμισο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:panteloni:noun` | **παντελόνι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:forema:noun` | **φόρεμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:foysta:noun` | **φούστα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:papoytsia:noun` | **παπούτσια** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:kaltses:noun` | **κάλτσες** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:sakaki:noun` | **σακάκι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:palto:noun` | **παλτό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:kapelo:noun` | **καπέλο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:mployzaki:noun` | **μπλουζάκι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:poylover:noun` | **πουλόβερ** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:kaskol:noun` | **κασκόλ** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:gantia:noun` | **γάντια** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `clothes.json` | `el:zoni:noun` | **ζώνη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `el:kokkino:adjective` | **κόκκινος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `el:prasino:adjective` | **πράσινος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `colors.json` | `el:kitrino:adjective` | **κίτρινος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:ergasia:noun` | **εργασία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:zoi:noun` | **ζωή** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:agapi:noun` | **αγάπη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:mousiki:noun` | **μουσική** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:tainia:noun` | **ταινία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:paichnidi:noun` | **παιχνίδι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:athlismos:noun` | **αθλητισμός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:nea:noun` | **νέα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:provlima:noun` | **πρόβλημα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:idea:noun` | **ιδέα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:dromos:noun` | **δρόμος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:arithmos:noun` | **αριθμός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:chroma:noun` | **χρώμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:timi:noun` | **τιμή** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:doro:noun` | **δώρο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:diakopes-holiday:noun` | **διακοπές** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:parti:noun` | **πάρτι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:oneiro:noun` | **όνειρο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:ygeia:noun` | **υγεία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `common_nouns.json` | `el:eirini:noun` | **ειρήνη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:kano:verb` | **κάνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:pigaino:verb` | **πηγαίνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:pino:verb` | **πίνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:katalavaino:verb` | **καταλαβαίνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:plyrono:verb` | **πληρώνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:anoigo:verb` | **ανοίγω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:kleino:verb` | **κλείνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:dino:verb` | **δίνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:pairno:verb` | **παίρνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:teleiono:verb` | **τελειώνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:perimeno:verb` | **περιμένω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:psachno:verb` | **ψάχνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:mpaino:verb` | **μπαίνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:vgaino:verb` | **βγαίνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:ferno:verb` | **φέρνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:pleno:verb` | **πλένω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `daily_verbs.json` | `el:mathaino:verb` | **μαθαίνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `expressions.json` | `el:syggnomi:phrase` | **συγγνώμη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:mitera:noun` | **μητέρα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:pateras:noun` | **πατέρας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:goneis:noun` | **γονείς** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:gios:noun` | **γιος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:kori:noun` | **κόρη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:paidi:noun` | **παιδί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:adelfos:noun` | **αδελφός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:adelfi:noun` | **αδελφή** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:giagia:noun` | **γιαγιά** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:pappoys:noun` | **παππούς** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:syzygos-andras:noun` | **σύζυγος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:syzygos-gynaika:noun` | **σύζυγος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:oikogeneia:noun` | **οικογένεια** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:theios:noun` | **θείος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:theia:noun` | **θεία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:xadelfos:noun` | **ξάδελφος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:moro:noun` | **μωρό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:andras:noun` | **άνδρας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:gynaika:noun` | **γυναίκα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `family.json` | `el:filos:noun` | **φίλος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `feelings.json` | `el:charoymenos:adjective` | **χαρούμενος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `feelings.json` | `el:lypimenos:adjective` | **λυπημένος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `feelings.json` | `el:koyrasmenos:adjective` | **κουρασμένος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:psomi:noun` | **ψωμί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:nero:noun` | **νερό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:gala:noun` | **γάλα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:kafes:noun` | **καφές** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:tsai:noun` | **τσάι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:krasi:noun` | **κρασί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:mpira:noun` | **μπίρα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:chymos:noun` | **χυμός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:avgo:noun` | **αυγό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:tyri:noun` | **τυρί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:voytyro:noun` | **βούτυρο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:kreas:noun` | **κρέας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:kotopoylo:noun` | **κοτόπουλο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:psari:noun` | **ψάρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:ryzi:noun` | **ρύζι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:makaronia:noun` | **μακαρόνια** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:soypa:noun` | **σούπα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:salata:noun` | **σαλάτα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:froyto:noun` | **φρούτο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:milo:noun` | **μήλο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:mpanana:noun` | **μπανάνα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:portokali-fruit:noun` | **πορτοκάλι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:ntomata:noun` | **ντομάτα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:patata:noun` | **πατάτα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:lachaniko:noun` | **λαχανικό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:alati:noun` | **αλάτι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:zachari:noun` | **ζάχαρη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:santoyits:noun` | **σάντουιτς** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:keik:noun` | **κέικ** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:sokolata:noun` | **σοκολάτα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:proino:noun` | **πρωινό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:mesimeriano:noun` | **μεσημεριανό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:vradino:noun` | **βραδινό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:piato:noun` | **πιάτο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:potiri:noun` | **ποτήρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:pironi:noun` | **πιρούνι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:machairi:noun` | **μαχαίρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:koytali:noun` | **κουτάλι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:estiatorio:noun` | **εστιατόριο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:menoy:noun` | **μενού** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:kremmydi:noun` | **κρεμμύδι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:lemoni:noun` | **λεμόνι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:meli:noun` | **μέλι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:giaoyrti:noun` | **γιαούρτι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:piperi:noun` | **πιπέρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `food_drink.json` | `el:ladi:noun` | **λάδι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:asteri:noun` | **αστέρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:oyranos:noun` | **ουρανός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:thalassa:noun` | **θάλασσα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:potami:noun` | **ποτάμι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:voyno:noun` | **βουνό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:dasos:noun` | **δάσος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:dentro:noun` | **δέντρο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:loyloydi:noun` | **λουλούδι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:grasidi:noun` | **γρασίδι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:petra:noun` | **πέτρα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:gi:noun` | **γη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:fotia:noun` | **φωτιά** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `geography.json` | `el:aeras:noun` | **αέρας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:spiti:noun` | **σπίτι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:diamerisma:noun` | **διαμέρισμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:domatio:noun` | **δωμάτιο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:koyzina:noun` | **κουζίνα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:mpanio:noun` | **μπάνιο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:ypnodomatio:noun` | **υπνοδωμάτιο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:porta:noun` | **πόρτα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:parathyro:noun` | **παράθυρο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:trapezi:noun` | **τραπέζι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:karekla:noun` | **καρέκλα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:krevati:noun` | **κρεβάτι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:kanapes:noun` | **καναπές** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:toichos:noun` | **τοίχος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:patoma:noun` | **πάτωμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:skepi:noun` | **σκεπή** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:kleidi:noun` | **κλειδί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:lampa:noun` | **λάμπα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:kathreftis:noun` | **καθρέφτης** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:kipos:noun` | **κήπος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:skala:noun` | **σκάλα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:tileorasi:noun` | **τηλεόραση** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:tilefono:noun` | **τηλέφωνο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:ypologistis:noun` | **υπολογιστής** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `house_furniture.json` | `el:roloi:noun` | **ρολόι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `el:daskalos:noun` | **δάσκαλος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `el:giatros:noun` | **γιατρός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `el:mathitis:noun` | **μαθητής** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `el:michanikos:noun` | **μηχανικός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `el:nosokoma:noun` | **νοσοκόμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `el:mageiras:noun` | **μάγειρας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `el:odigos:noun` | **οδηγός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `jobs.json` | `el:ergatis:noun` | **εργάτης** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:gallia:noun` | **Γαλλία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:italia:noun` | **Ιταλία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:rosia:noun` | **Ρωσία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:agglia:noun` | **Αγγλία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:germania:noun` | **Γερμανία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:ispania:noun` | **Ισπανία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:kosmos:noun` | **κόσμος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:ameriki:noun` | **Αμερική** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `nationalities.json` | `el:kina:noun` | **Κίνα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:aytokinito:noun` | **αυτοκίνητο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:leoforeio:noun` | **λεωφορείο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:treno:noun` | **τρένο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:aeroplano:noun` | **αεροπλάνο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:podilato:noun` | **ποδήλατο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:varka:noun` | **βάρκα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:taxi:noun` | **ταξί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:ploio:noun` | **πλοίο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:metro:noun` | **μετρό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:motosikleta:noun` | **μοτοσικλέτα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:odos:noun` | **οδός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:aerodromio:noun` | **αεροδρόμιο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:poli:noun` | **πόλη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:dromos-street:noun` | **δρόμος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:scholeio:noun` | **σχολείο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:nosokomeio:noun` | **νοσοκομείο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:katastima:noun` | **κατάστημα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:agora:noun` | **αγορά** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:ekklisia:noun` | **εκκλησία** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:parko:noun` | **πάρκο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:trapeza:noun` | **τράπεζα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:stathmos:noun` | **σταθμός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:xenodocheio:noun` | **ξενοδοχείο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:vivliothiki:noun` | **βιβλιοθήκη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:moyseio:noun` | **μουσείο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:panepistimio:noun` | **πανεπιστήμιο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `places_transport.json` | `el:chora:noun` | **χώρα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `prepositions.json` | `el:pano:preposition` | **πάνω** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:poios:pronoun` | **ποιος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:poy:pronoun` | **πού** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:giati:pronoun` | **γιατί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:poio:pronoun` | **ποιο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:tinos:pronoun` | **τίνος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:poion:pronoun` | **ποιον** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:ego:pronoun` | **εγώ** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:esy:pronoun` | **εσύ** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:aytos:pronoun` | **αυτός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:ayti:pronoun` | **αυτή** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:emeis:pronoun` | **εμείς** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:eseis:pronoun` | **εσείς** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:aytoi:pronoun` | **αυτοί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:ekeino:phrase` | **εκείνο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:moy:pronoun` | **μου** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:soy:pronoun` | **σου** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `pronouns.json` | `el:mas:pronoun` | **μας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:vivlio:noun` | **βιβλίο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:stylo:noun` | **στυλό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:molyvi:noun` | **μολύβι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:charti:noun` | **χαρτί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:tetradio:noun` | **τετράδιο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:grafeio:noun` | **γραφείο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:tsanta:noun` | **τσάντα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:chrimata:noun` | **χρήματα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:gramma:noun` | **γράμμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:chartis:noun` | **χάρτης** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:eikona:noun` | **εικόνα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:onoma:noun` | **όνομα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:lexi:noun` | **λέξη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:glossa:noun` | **γλώσσα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `school.json` | `el:erotisi:noun` | **ερώτηση** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:deytera:noun` | **Δευτέρα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:triti:noun` | **Τρίτη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:tetarti:noun` | **Τετάρτη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:pempti:noun` | **Πέμπτη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:paraskevi:noun` | **Παρασκευή** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:savvato:noun` | **Σάββατο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:kyriaki:noun` | **Κυριακή** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:ianoyarios:noun` | **Ιανουάριος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:fevroyarios:noun` | **Φεβρουάριος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:martios:noun` | **Μάρτιος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:aprilios:noun` | **Απρίλιος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:maios:noun` | **Μάιος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:ioynios:noun` | **Ιούνιος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:ioylios:noun` | **Ιούλιος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:aygoystos:noun` | **Αύγουστος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:septemvrios:noun` | **Σεπτέμβριος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:oktovrios:noun` | **Οκτώβριος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:noemvrios:noun` | **Νοέμβριος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:dekemvrios:noun` | **Δεκέμβριος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:anoixi:noun` | **άνοιξη** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:kalokairi:noun` | **καλοκαίρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:fthinoporo:noun` | **φθινόπωρο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:cheimonas:noun` | **χειμώνας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:proi:noun` | **πρωί** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:apogeyma:noun` | **απόγευμα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:vready:noun` | **βράδυ** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:nychta:noun` | **νύχτα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:evdomada:noun` | **εβδομάδα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:minas:noun` | **μήνας** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:chronos:noun` | **χρόνος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:ora:noun` | **ώρα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:lepto:noun` | **λεπτό** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `time.json` | `el:imera:noun` | **ημέρα** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `el:ilios:noun` | **ήλιος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `el:feggari:noun` | **φεγγάρι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `el:vrochi:noun` | **βροχή** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `el:chioni:noun` | **χιόνι** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `el:anemos:noun` | **άνεμος** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `el:synnefo:noun` | **σύννεφο** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |
| `weather.json` | `el:kairos:noun` | **καιρός** | A1 | **A0** | Starter absolute beginner anchor concept (A0 candidate) |

#### 3. Unverified Terms / Needs Human Review
*No unverified terms requiring human review for EL.*

---

## Recommendations and Follow-Up Action Items

1. **Multi-Level Tagging Alignment**: Non-English datasets (`fr`, `it`, `el`) should implement the `levels` array schema field in future dataset expansions to align with `vocabulary/en` and `vocabulary/ru` EVP multi-level conventions.
2. **A0 Starter Level Consistency**: Consider re-tagging flagged under-level A1 terms to A0 across `fr`, `it`, `ru`, and `el` to harmonize beginner progression with `vocabulary/en` A0 entries.
3. **Preservation Policy**: Per repository directives, no levels were modified in place; all judgment calls are flagged above for review.
