const fs = require('fs');
const path = require('path');

const sourceDocs = {
  A2: `
A2 English Vocabulary List — Exam Preparation Course
Foundation Level (covers A0–A1–A2 as one combined "A2" stage)

1. Greetings, Basic Phrases & Everyday Expressions
hello, hi, good morning, good afternoon, good evening, good night, goodbye, bye, see you, see you later, see you soon, take care, welcome, nice to meet you, how are you, I'm fine, not bad, so-so, and you, please, thank you, thanks, thanks a lot, you're welcome, no problem, excuse me, sorry, I'm sorry, pardon, yes, no, OK, okay, sure, of course, maybe, I don't know, I don't understand, can you repeat that, can you help me, what does it mean, how do you say, congratulations, happy birthday, good luck, cheers, enjoy your meal, bless you, well done, no worries

2. Pronouns, Determiners & Question Words
I, you, he, she, it, we, they, me, him, her, us, them, my, your, his, her, its, our, their, mine, yours, his, hers, ours, theirs, myself, yourself, himself, herself, itself, ourselves, yourselves, themselves, this, that, these, those, someone, somebody, something, somewhere, anyone, anybody, anything, anywhere, no one, nobody, nothing, nowhere, everyone, everybody, everything, everywhere, each, every, all, some, any, no, none, both, either, neither, other, another, a, an, the, what, who, whom, whose, which, where, when, why, how, how much, how many, how old, how often, how long, how far

3. Numbers, Quantities & Ordinals
zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, hundred, thousand, million, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, eleventh, twelfth, last, next, half, quarter, whole, pair, dozen, a lot of, lots of, a few, few, a little, little, many, much, more, most, less, least, enough, too much, too many, several, single, double, once, twice, three times

4. Family & Relationships
family, parents, mother, mum, mom, father, dad, son, daughter, brother, sister, sibling, baby, child, children, kid, twins, husband, wife, spouse, partner, boyfriend, girlfriend, grandmother, grandma, grandfather, grandpa, grandparents, grandchild, grandson, granddaughter, uncle, aunt, cousin, nephew, niece, stepmother, stepfather, stepbrother, stepsister, mother-in-law, father-in-law, relative, neighbour, neighbor, friend, best friend, classmate, colleague, stranger, adult, teenager, man, woman, boy, girl, people, person, human, couple, single, married, divorced, widow, widower, engaged

5. Appearance & Body Parts
body, head, hair, face, eye, eyes, ear, ears, nose, mouth, lip, lips, tooth, teeth, tongue, chin, cheek, neck, shoulder, shoulders, arm, arms, elbow, hand, hands, finger, thumb, nail, chest, back, stomach, waist, hip, leg, legs, knee, foot, feet, toe, skin, bone, heart, brain, tall, short, thin, slim, fat, overweight, heavy, light, young, old, beautiful, pretty, handsome, good-looking, ugly, cute, attractive, curly, straight, wavy, bald, blonde, brunette, beard, moustache

6. Feelings, Emotions & Personality
happy, sad, angry, afraid, scared, frightened, worried, nervous, excited, bored, boring, interested, interesting, surprised, surprising, tired, exhausted, relaxed, calm, upset, confused, embarrassed, ashamed, proud, jealous, lonely, in love, comfortable, uncomfortable, satisfied, disappointed, shocked, shy, friendly, kind, unkind, nice, rude, polite, impolite, honest, generous, mean, funny, serious, lazy, hard-working, clever, smart, intelligent, stupid, silly, brave, careful, careless, patient, impatient, confident, quiet, talkative, cheerful, optimistic, pessimistic, selfish, strict, easy-going, curious, stubborn

7. Colours & Shapes
red, orange, yellow, green, blue, purple, pink, brown, black, white, grey, gray, gold, silver, light blue, dark green, colour, color, colourful, bright, dull, circle, square, rectangle, triangle, oval, round, straight, curved, flat, pattern, spotted, striped, plain

8. Clothes & Accessories
clothes, shirt, T-shirt, blouse, dress, skirt, trousers, pants, jeans, shorts, jacket, coat, raincoat, sweater, jumper, hoodie, suit, uniform, pyjamas, underwear, socks, tights, shoes, boots, trainers, sneakers, sandals, slippers, hat, cap, scarf, gloves, belt, tie, glasses, sunglasses, watch, bag, backpack, handbag, wallet, purse, umbrella, ring, necklace, bracelet, earrings, jewellery, button, zip, pocket, size, cotton, wool, leather, silk, wear, put on, take off, try on, fit, match

9. Food & Drink
food, breakfast, lunch, dinner, snack, meal, bread, butter, cheese, egg, eggs, milk, yoghurt, meat, chicken, beef, pork, fish, sausage, ham, bacon, rice, pasta, noodles, soup, salad, sandwich, pizza, burger, chips, fries, cereal, sugar, salt, pepper, oil, sauce, jam, honey, cake, biscuit, cookie, chocolate, ice cream, dessert, sweet, sweets, candy, water, juice, tea, coffee, milkshake, soft drink, cola, lemonade, wine, beer, hungry, thirsty, delicious, tasty, fresh, cook, cooked, raw, taste, bake, boil, fry, grill, recipe, ingredient, menu, order, bill, waiter, waitress, restaurant, café, cafeteria

10. Fruits & Vegetables
apple, banana, orange, pear, grape, grapes, strawberry, lemon, lime, peach, pineapple, watermelon, melon, cherry, mango, kiwi, plum, potato, tomato, onion, carrot, cabbage, cucumber, pepper, mushroom, lettuce, corn, pea, peas, bean, beans, garlic, broccoli, pumpkin, vegetable, vegetables, fruit

11. House, Rooms & Furniture
house, home, flat, apartment, room, bedroom, bathroom, kitchen, living room, dining room, garage, garden, yard, stairs, floor, ceiling, wall, roof, door, window, key, lock, bed, sofa, couch, armchair, chair, table, desk, wardrobe, cupboard, shelf, drawer, mirror, lamp, light, curtain, carpet, rug, fridge, refrigerator, freezer, oven, cooker, stove, microwave, sink, tap, toilet, bath, bathtub, shower, towel, pillow, blanket, sheet, TV, television, remote control, clock, picture, plant, rent, address, move, live, neighbourhood, building, block of flats

12. Daily Routine & Common Actions
wake up, get up, get dressed, get undressed, brush your teeth, wash your face, have a shower, take a shower, have breakfast, go to work, go to school, start work, finish work, come home, have dinner, do homework, watch TV, go to bed, fall asleep, sleep, rest, relax, tidy up, clean, wash up, do the washing, do the shopping, make the bed, set the table, lay the table

13. Time, Days, Months & Seasons
time, second, minute, hour, day, week, month, year, today, tomorrow, yesterday, tonight, morning, afternoon, evening, night, noon, midnight, weekday, weekend, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, January, February, March, April, May, June, July, August, September, October, November, December, spring, summer, autumn, fall, winter, season, date, calendar, birthday, holiday, festival, early, late, on time, now, then, soon, later, before, after, always, usually, often, sometimes, rarely, never, every day, ago, since, until, during, while

14. Weather & Nature
weather, sun, sunny, cloud, cloudy, rain, rainy, snow, snowy, wind, windy, storm, thunder, lightning, fog, foggy, ice, icy, hot, warm, cool, cold, freezing, temperature, degree, forecast, sky, star, moon, world, earth, nature, mountain, hill, valley, forest, wood, tree, flower, grass, leaf, river, lake, sea, ocean, beach, sand, stone, rock, island, desert, field, path, countryside, land

15. Animals
animal, dog, puppy, cat, kitten, bird, fish, horse, cow, pig, sheep, goat, chicken, duck, rabbit, mouse, rat, lion, tiger, elephant, bear, monkey, giraffe, zebra, wolf, fox, deer, snake, frog, turtle, spider, insect, bee, butterfly, ant, fly, mosquito, pet, farm, zoo, wild

16. Town, Places & Directions
town, city, village, capital, street, road, avenue, corner, square, bridge, park, playground, market, shop, store, supermarket, shopping centre, mall, bank, post office, police station, fire station, hospital, clinic, pharmacy, chemist, library, museum, cinema, theatre, church, mosque, temple, school, university, college, station, airport, hotel, restaurant, café, factory, office, building, place, area, centre, downtown, map, direction, left, right, straight on, opposite, next to, near, far, between, in front of, behind, above, below, over, under, up, down, here, there, north, south, east, west, corner, crossroads, traffic lights, roundabout

17. Shopping & Money
shop, shopping, shopping list, customer, shop assistant, cashier, price, cost, cheap, expensive, free, discount, sale, offer, receipt, cash, coin, note, bill, credit card, change, pay, buy, sell, spend, save, cost, afford, size, colour, brand, quality, shopping bag, trolley, basket, queue, open, closed, choose, exchange, refund

18. Transport & Travel
transport, car, bus, train, tram, taxi, cab, bike, bicycle, motorbike, plane, airplane, boat, ship, ferry, underground, subway, metro, lorry, truck, van, ticket, single ticket, return ticket, platform, station, stop, driver, passenger, pilot, seat, luggage, suitcase, bag, passport, visa, journey, trip, travel, holiday, vacation, tourist, tour, guide, map, direction, arrive, leave, depart, drive, ride, fly, walk, run, travel abroad, book a ticket, check in

19. School & Education
school, primary school, secondary school, university, college, classroom, teacher, student, pupil, headteacher, principal, lesson, class, subject, timetable, homework, exam, test, exercise, question, answer, mark, grade, mistake, pass, fail, pen, pencil, rubber, eraser, ruler, notebook, textbook, dictionary, board, whiteboard, blackboard, bag, desk, chalk, computer, screen, break, playground, uniform, term, holiday, learn, teach, study, read, write, listen, speak, spell, understand, remember, forget, subject: maths, mathematics, science, history, geography, art, music, PE, physical education, English, literature

20. Jobs & Professions
job, work, career, profession, teacher, doctor, nurse, dentist, engineer, scientist, lawyer, police officer, firefighter, soldier, farmer, chef, cook, waiter, shop assistant, cashier, driver, pilot, businessman, businesswoman, manager, secretary, accountant, actor, actress, singer, musician, artist, writer, journalist, photographer, hairdresser, mechanic, electrician, plumber, builder, cleaner, gardener, postman, vet, veterinarian, athlete, footballer, employer, employee, boss, colleague, company, office, factory, salary, wage, unemployed, retired, part-time, full-time, interview, apply

21. Health, Illness & the Body
health, healthy, unhealthy, ill, sick, illness, disease, pain, painful, hurt, ache, headache, stomachache, toothache, backache, cold, flu, fever, cough, sneeze, sore throat, injury, broken, cut, bruise, allergy, medicine, pill, tablet, drug, doctor, nurse, dentist, hospital, clinic, ambulance, emergency, appointment, treatment, operation, X-ray, injection, bandage, plaster, thermometer, exercise, diet, fit, weak, strong, rest, recover, get better, feel better, feel sick, be sick, take care of yourself

22. Sports & Free Time
sport, football, soccer, basketball, tennis, volleyball, baseball, golf, rugby, swimming, running, cycling, skiing, skating, boxing, athletics, gymnastics, team, player, coach, match, game, competition, championship, win, lose, draw, score, goal, ball, racket, gym, stadium, pool, court, field, pitch, play, train, practice, exercise, hobby, free time, leisure

23. Hobbies & Entertainment
music, song, singer, band, instrument, guitar, piano, drum, dance, dancing, film, movie, cinema, actor, actress, TV programme, series, cartoon, show, news, channel, book, novel, story, magazine, newspaper, comic, painting, drawing, photography, camera, photo, picture, game, video game, board game, puzzle, toy, party, concert, festival, exhibition, collect, collection, garden, gardening, cook, cooking, travel, traveling, read, watch, listen, play, draw, paint, sing, dance, laugh, smile, cry, enjoy, relax

24. Technology & Communication
computer, laptop, tablet, phone, mobile phone, smartphone, screen, keyboard, mouse, printer, internet, website, email, message, text message, app, application, password, file, folder, download, upload, save, delete, click, type, search, social media, video call, camera, photo, video, battery, charger, wifi, signal, online, offline, call, phone call, text, chat, network, password, account, username

25. Common Verbs
be, have, do, go, come, get, make, take, give, put, say, tell, ask, answer, speak, talk, listen, hear, see, look, watch, show, find, lose, keep, leave, stay, live, move, work, play, study, learn, teach, read, write, draw, paint, sing, dance, walk, run, swim, jump, fall, sit, stand, stop, start, begin, finish, end, open, close, turn on, turn off, wear, buy, sell, pay, cost, spend, save, want, need, like, love, hate, prefer, hope, wish, think, know, understand, remember, forget, believe, feel, seem, look like, try, help, use, need, wait, meet, invite, visit, arrive, leave, bring, carry, send, receive, choose, decide, agree, disagree, plan, prepare, clean, wash, cook, eat, drink, sleep, wake up, rest, relax, laugh, cry, smile, shout, whisper, phone, call, text, email, borrow, lend, win, lose, break, fix, repair, build, grow, kill, die, born, marry, travel, drive, fly, ride, park, fill, empty, push, pull, carry, hold, catch, throw, kick, hit, touch, follow, lead, share, promise, warn, suggest, offer, invite, thank, apologize, complain, explain, describe, discuss

26. Common Adjectives
good, bad, great, wonderful, terrible, awful, nice, lovely, beautiful, ugly, big, large, small, little, tiny, huge, tall, short, long, wide, narrow, thick, thin, heavy, light, high, low, fast, quick, slow, hard, difficult, easy, simple, hot, warm, cool, cold, new, old, young, modern, ancient, clean, dirty, full, empty, open, closed, rich, poor, expensive, cheap, free, busy, quiet, noisy, loud, strong, weak, healthy, sick, safe, dangerous, right, wrong, correct, true, false, real, fake, same, different, similar, important, necessary, useful, useless, possible, impossible, ready, early, late, near, far, wet, dry, soft, hard, sharp, smooth, rough, dark, light, bright, sunny, cloudy, rainy, windy, comfortable, uncomfortable, popular, famous, normal, strange, weird, funny, serious, special, ordinary, general, whole, extra, main, favourite, perfect, wrong, certain, sure, lucky, unlucky

27. Common Adverbs, Prepositions & Connectors
very, really, quite, too, so, also, too, just, only, even, almost, nearly, especially, actually, probably, maybe, perhaps, certainly, definitely, obviously, luckily, unfortunately, suddenly, immediately, quickly, slowly, carefully, easily, well, badly, together, alone, again, still, yet, already, ever, never, often, usually, sometimes, always, here, there, everywhere, somewhere, nowhere, in, on, at, to, from, of, with, without, for, by, about, into, onto, out of, off, over, under, above, below, between, among, through, across, along, around, behind, in front of, next to, near, far from, before, after, during, since, until, and, but, or, so, because, although, though, if, when, while, before, after, then, however, therefore, also, too, as well, either, neither, both, whether

28. Countries, Nationalities & Languages
country, nation, nationality, language, England, English, Britain, British, the United Kingdom, the UK, Scotland, Scottish, Wales, Welsh, Ireland, Irish, the United States, the USA, American, Canada, Canadian, Australia, Australian, France, French, Germany, German, Spain, Spanish, Italy, Italian, Portugal, Portuguese, Russia, Russian, China, Chinese, Japan, Japanese, Korea, Korean, India, Indian, Brazil, Brazilian, Mexico, Mexican, Egypt, Egyptian, Turkey, Turkish, Greece, Greek, Poland, Polish, the Netherlands, Dutch, Sweden, Swedish, Norway, Norwegian, Ukraine, Ukrainian, Africa, African, Europe, European, Asia, Asian, world, foreign, foreigner, abroad

29. Materials, Containers & Quantities
paper, plastic, glass, metal, wood, wooden, stone, cotton, wool, leather, cloth, material, bottle, can, box, bag, jar, packet, package, cup, glass, plate, bowl, spoon, fork, knife, tray, basket, bucket, carton, tube, roll, piece, slice, bit, drop, litre, kilo, kilogram, gram, metre, centimetre, kilometre, mile, gallon, cup of, glass of, bottle of, bag of, box of, piece of, pair of

30. Describing Objects & General Nouns
thing, object, item, stuff, size, shape, weight, length, height, width, colour, style, design, model, brand, price, quality, type, kind, sort, part, piece, whole, top, bottom, side, edge, corner, middle, centre, front, back, inside, outside, surface

31. Everyday Situations & Useful Phrases
what time is it, what's the date today, how much is it, how much does it cost, can I help you, could you help me, I'd like, I would like, can I have, would you like, do you want, I think that, in my opinion, for example, by the way, of course, no problem, that's fine, that's OK, I agree, I disagree, I'm not sure, it depends, let me see, let's go, let's see, I hope so, I'm afraid not, good idea, bad idea, what a pity, never mind, take it easy, hurry up, calm down, be careful, watch out, look out, come in, sit down, stand up, wait a minute, just a moment, follow me, listen to me, look at this

32. Common Phrasal Verbs (A2 Level)
get up, get on, get off, get in, get out, get back, wake up, sit down, stand up, turn on, turn off, turn around, put on, take off, put away, look for, look after, look at, look up, find out, come in, come back, come on, go on, go out, go back, go away, run away, grow up, pick up, give up, give back, come from, listen to, wait for, look forward to, take care of, carry on, hold on, fill in, fill out, try on, switch on, switch off, break down, calm down, hang up, hang out, work out, throw away

33. Opposites (Common A2 Antonym Pairs)
big/small, tall/short, long/short, fat/thin, fast/slow, strong/weak, hot/cold, wet/dry, clean/dirty, full/empty, open/closed, new/old, young/old, rich/poor, happy/sad, easy/difficult, cheap/expensive, light/dark, light/heavy, near/far, early/late, quiet/noisy, safe/dangerous, true/false, right/wrong, same/different, good/bad, beautiful/ugly, day/night, buy/sell, start/finish, push/pull, come/go, arrive/leave, win/lose, remember/forget, borrow/lend, in/out, up/down, inside/outside, above/below, before/after, always/never, first/last, more/less, over/under
`,
  B1: `
B1 English Vocabulary List — Exam Preparation Course
Intermediate Level (Stage 2, follows the A2 foundation stage)

1. Opinions, Agreeing & Disagreeing
opinion, point of view, viewpoint, in my opinion, in my view, personally, I think, I believe, I feel that, I'd say, as far as I'm concerned, from my point of view, I agree, I disagree, I totally agree, I completely disagree, that's true, that's not true, exactly, absolutely, definitely, I'm not sure about that, I see your point, on the other hand, that depends, it depends on, I'm in favour of, I'm against, support, oppose, argue, argument, debate, discuss, discussion, convince, persuade, prove, evidence, fact, claim, statement, attitude, perspective, reasonable, unreasonable, fair, unfair, agree with, disagree with, change your mind, make up your mind

2. Abstract Feelings, Mental States & Personality
mood, in a good mood, in a bad mood, emotion, emotional, sensitive, insensitive, thoughtful, considerate, inconsiderate, tolerant, intolerant, open-minded, narrow-minded, ambitious, determined, motivated, enthusiastic, passionate, curious, independent, dependent, reliable, unreliable, responsible, irresponsible, mature, immature, sensible, practical, realistic, idealistic, cautious, adventurous, competitive, cooperative, sociable, unsociable, outgoing, introverted, extroverted, self-confident, self-conscious, easily offended, laid-back, relaxed, tense, anxious, stressed, overwhelmed, frustrated, irritated, annoyed, furious, disgusted, relieved, grateful, thankful, hopeful, hopeless, homesick, nostalgic, guilty, regret, regretful, envious, sympathetic, sympathy, empathy, self-esteem, confidence

3. Relationships & Social Life
relationship, close relationship, friendship, acquaintance, get on with, get along with, fall out with, make friends, keep in touch, lose touch, break up, split up, get engaged, get married, propose, wedding, anniversary, trust, honesty, loyalty, respect, support each other, argue, quarrel, conflict, misunderstanding, apologize, forgive, forgiveness, jealousy, gossip, rumour, peer pressure, generation gap, upbringing, background, personality clash, social life, socialize, invite, host, guest, gathering, reunion

4. Work & Career
career, profession, occupation, vacancy, position, apply for a job, job application, CV, resume, cover letter, interview, candidate, qualification, qualified, skill, experience, training, internship, apprentice, promotion, promoted, get promoted, demoted, resign, quit, retire, retirement, fire, get fired, lay off, redundant, unemployment, employment, self-employed, freelancer, entrepreneur, business owner, staff, workforce, workplace, working conditions, overtime, shift, deadline, task, responsibility, duty, workload, colleague, teammate, supervisor, manager, director, CEO, department, branch, headquarters, income, salary, wage, pay rise, bonus, commission, pension, contract, permanent, temporary

5. Education
education, curriculum, syllabus, module, course, degree, bachelor's degree, master's degree, diploma, certificate, graduate, graduation, undergraduate, postgraduate, tuition fees, scholarship, student loan, campus, lecture, lecturer, professor, tutor, tutorial, seminar, assignment, essay, dissertation, thesis, research, revise, revision, cram, memorize, take notes, submit, deadline, plagiarism, cheat, distance learning, e-learning, online course, vocational training, further education, higher education, literacy, numeracy, skill, knowledge, ability

6. Media, News & Communication
media, mass media, news, headline, article, report, journalist, reporter, editor, publish, broadcast, channel, programme, documentary, interview, press, journalism, advertisement, advert, commercial, advertising, campaign, sponsor, social media, platform, influencer, post, comment, like, share, follower, subscriber, viral, trend, rumour, fake news, censorship, freedom of speech, public opinion, survey, poll, statistics, source, headline, breaking news, current affairs

7. Environment, Nature & Climate
environment, environmental, pollution, air pollution, water pollution, climate, climate change, global warming, greenhouse effect, carbon emissions, fossil fuel, renewable energy, solar power, wind power, recycle, recycling, reuse, reduce, waste, rubbish, litter, plastic waste, sustainable, sustainability, ecosystem, wildlife, endangered species, extinct, extinction, conservation, protect, habitat, natural resources, deforestation, drought, flood, natural disaster, earthquake, hurricane, disaster, environmentally friendly, eco-friendly, carbon footprint, plant a tree, save energy, save water

8. Technology & the Internet
technology, device, gadget, invention, innovation, artificial intelligence, software, hardware, programme, application, update, upgrade, install, uninstall, virus, hack, hacker, cybersecurity, data, database, storage, cloud, server, network, connection, broadband, bandwidth, streaming, stream, download, upload, browser, search engine, platform, algorithm, digital, virtual, online shopping, e-commerce, e-book, GPS, robot, automation, artificial, touch screen, voice recognition, smart device

9. Travel & Tourism
tourism, tourist attraction, sightseeing, destination, itinerary, accommodation, guesthouse, hostel, resort, package holiday, all-inclusive, book in advance, reservation, cancel, cancellation, check in, check out, boarding pass, customs, immigration, luggage allowance, delay, delayed, cancelled flight, connection, layover, jet lag, culture shock, backpacking, sightseeing, souvenir, local, foreign, currency, exchange rate, guidebook, phrasebook, adventure, expedition, cruise, excursion, landmark, monument, heritage site

10. Health & Lifestyle
lifestyle, healthy lifestyle, wellbeing, well-being, fitness, physical activity, workout, balanced diet, nutrition, nutritious, vitamin, protein, calorie, obesity, overweight, malnutrition, addiction, addicted, smoking, quit smoking, alcohol, junk food, stress, relieve stress, mental health, therapy, therapist, counselling, symptom, diagnosis, diagnose, treatment, prevention, prevent, vaccine, vaccination, immune system, infection, virus, bacteria, epidemic, chronic, condition, disability, disabled, recovery, surgery, prescription

11. Crime & Law
crime, criminal, offence, illegal, legal, law, break the law, steal, theft, thief, robbery, rob, burglary, burglar, shoplifting, fraud, scam, kidnap, murder, victim, witness, suspect, arrest, investigate, investigation, evidence, court, trial, judge, jury, lawyer, sentence, guilty, innocent, prison, jail, punishment, fine, police, police officer, report a crime, security, CCTV, alarm

12. Money & Economy
economy, economic, finance, financial, budget, income, expense, expenditure, debt, loan, mortgage, interest rate, invest, investment, save money, savings account, currency, exchange, inflation, tax, insurance, bill, afford, cost of living, poverty, wealth, wealthy, consumer, consumption, market, supply and demand, trade, import, export, profit, loss, bankrupt, financial crisis, economic growth

13. Society & Culture
society, community, culture, cultural, custom, tradition, traditional, ritual, festival, celebration, ceremony, generation, population, urban, rural, developed country, developing country, multicultural, diversity, immigration, immigrant, emigrate, refugee, equality, inequality, discrimination, prejudice, stereotype, human rights, citizen, citizenship, government, public, private, charity, volunteer, donate, homeless, social issue, social class, identity

14. Science & Nature
science, scientific, scientist, experiment, research, laboratory, hypothesis, theory, discovery, discover, invent, invention, evolution, gene, genetic, DNA, cell, organism, species, universe, planet, solar system, gravity, energy, chemical, chemistry, physics, biology, astronomy, technology, engineer, engineering, nuclear, atom, matter, substance

15. Arts, Literature & Entertainment
art, artist, artwork, exhibition, gallery, sculpture, painting, masterpiece, literature, author, novelist, poet, poem, poetry, plot, character, chapter, genre, fiction, non-fiction, autobiography, biography, review, critic, criticism, performance, actor, actress, director, script, scene, stage, audience, applause, orchestra, composer, classical music, rhythm, melody, lyrics, talent, talented, creative, creativity, imagination, inspire, inspiration

16. Sport & Competition
championship, tournament, league, opponent, referee, umpire, spectator, fan, supporter, cheer, medal, gold medal, trophy, record, break a record, defeat, victory, tie, penalty, foul, injury, injured, training, workout, athlete, professional, amateur, physical fitness, endurance, stamina, technique, strategy, tactic, warm up, stretch

17. Food, Cooking & Dining
cuisine, dish, ingredient, recipe, portion, homemade, organic, fresh, frozen, processed food, additive, flavour, spicy, bitter, sour, savoury, bland, diet, vegetarian, vegan, allergic, allergy, intolerance, fasting, appetite, starving, stuffed, leftovers, takeaway, delivery, reservation, tip, service charge, catering, chef, cuisine, marinate, chop, slice, peel, mix, stir, roast, steam, grill

18. Shopping & Consumer Habits
consumer, retail, retailer, bargain, discount, sale, clearance, refund, warranty, guarantee, receipt, exchange, customer service, complaint, complain, faulty, defective, quality, value for money, brand loyalty, online shopping, delivery, courier, tracking, out of stock, in stock, impulse buying, budget, luxury, second-hand, secondhand

19. Housing & City Life
accommodation, property, real estate, landlord, tenant, rent, lease, mortgage, deposit, move house, move in, move out, suburb, neighbourhood, district, urban area, city centre, skyline, public transport, traffic jam, rush hour, commute, commuter, infrastructure, facility, amenity, overcrowded, pollution, cost of living, gentrification

20. Weather, Seasons & Natural Phenomena
climate, temperature, humid, humidity, drought, storm, thunderstorm, tornado, hurricane, blizzard, frost, breeze, gentle breeze, mild, extreme weather, heatwave, forecast, meteorologist, seasonal, tropical, arctic, equator

21. Time, Sequence & Narrative Language
meanwhile, eventually, finally, at first, at last, in the end, afterwards, previously, later on, shortly after, immediately, all of a sudden, suddenly, gradually, in the meantime, from then on, once, as soon as, by the time, so far, up to now, nowadays, these days, in the past, in the future, previously mentioned, following, subsequent

22. Verbs of Opinion, Communication & Cognition
assume, suppose, imagine, consider, realize, recognize, notice, doubt, wonder, guess, predict, expect, intend, plan to, decide, hesitate, consider, reckon, conclude, determine, analyze, evaluate, judge, assess, estimate, calculate, mention, state, claim, declare, announce, admit, confess, deny, argue, insist, emphasize, point out, suggest, recommend, advise, warn, remind, persuade, convince, encourage, discourage, criticize, praise, blame, accuse, apologize, complain, promise, threaten, negotiate, agree, disagree, object, respond, reply, react

23. Verbs — General & Phrasal (B1 Level)
achieve, accomplish, succeed, fail, struggle, manage to, attempt, involve, include, exclude, contain, consist of, require, provide, supply, offer, deliver, produce, manufacture, develop, improve, increase, decrease, reduce, expand, extend, limit, restrict, allow, permit, forbid, prevent, avoid, ignore, deal with, cope with, handle, solve, resolve, cause, result in, lead to, affect, influence, impact, depend on, rely on, count on, look forward to, put up with, get over, come up with, run out of, give in, take over, set up, carry out, point out, bring up, break out, break down, figure out, sort out, work out, end up, turn out, go through, come across, catch up, keep up, back up, stand up for, look up to, put off, cut down on, come up with, show up, drop out, go ahead, hold on, pull through, carry on

24. Adjectives — Abstract & Descriptive (B1 Level)
significant, considerable, remarkable, noticeable, obvious, evident, apparent, effective, efficient, essential, crucial, vital, relevant, irrelevant, appropriate, inappropriate, adequate, sufficient, insufficient, reasonable, valid, invalid, accurate, precise, approximate, complex, complicated, straightforward, ambiguous, controversial, debatable, reliable, consistent, inconsistent, flexible, rigid, traditional, contemporary, innovative, conventional, unconventional, sophisticated, superficial, genuine, authentic, artificial, temporary, permanent, gradual, sudden, extreme, moderate, mutual, individual, collective, global, local, domestic, international, widespread, rare, common, unique, typical, exceptional, outstanding, ordinary, mediocre, impressive, disappointing, satisfying, frustrating, exhausting, overwhelming, demanding, challenging, rewarding, worthwhile, pointless

25. Adverbs & Linking Words
consequently, therefore, thus, as a result, hence, because of, due to, owing to, despite, in spite of, although, even though, nevertheless, nonetheless, however, on the contrary, in contrast, whereas, while, unlike, similarly, likewise, in the same way, in addition, furthermore, moreover, besides, apart from, as well as, not only... but also, in order to, so that, for this reason, provided that, unless, as long as, in case, otherwise, on condition that, generally, in general, overall, on the whole, basically, essentially, particularly, specifically, mainly, mostly, largely, partly, entirely, completely, totally, absolutely, extremely, incredibly, fairly, rather, slightly, barely, hardly, scarcely, apparently, evidently, surprisingly, ideally, eventually, gradually, occasionally, frequently, constantly, regularly, deliberately, accidentally, intentionally

26. Modal Verbs & Expressions of Possibility, Certainty & Obligation
can, could, may, might, must, should, ought to, need to, have to, don't have to, needn't, be allowed to, be able to, be supposed to, be likely to, be unlikely to, it's possible that, it's likely that, it's certain that, definitely, probably, possibly, it must be, it can't be, it might be, would rather, had better, be obliged to, be required to, mandatory, optional, compulsory, voluntary

27. Idioms & Fixed Expressions (B1 Level)
make a decision, make an effort, make progress, make a mistake, make a difference, make sense, make sure, take a risk, take responsibility, take part in, take advantage of, take place, have an effect on, have a chance, have in common, keep an eye on, keep in mind, keep a promise, get in touch, get used to, get rid of, get over, break the ice, break a habit, lose touch, run out of time, save time, waste time, spend time, it's worth it, to be honest, at the end of the day, in the long run, on the other hand, as a matter of fact, out of the blue, once in a while, sooner or later, little by little, step by step, on purpose, by accident, in advance, in general, in particular, in common, in touch, in charge of, in favour of

28. Conjunctions & Connectors for Argument/Essay Writing
firstly, secondly, thirdly, to begin with, to start with, in conclusion, to sum up, to conclude, all in all, taking everything into account, on balance, for instance, such as, namely, in other words, that is to say, to put it another way, above all, most importantly, last but not least

29. Numbers, Measurements & Data (B1 Level)
percentage, per cent, proportion, ratio, average, majority, minority, approximately, roughly, statistics, data, figure, rate, growth rate, decline, increase by, decrease by, double, triple, rise, fall, fluctuate, remain stable, peak, estimate, survey, questionnaire, sample, trend

30. Society, Government & Global Issues
government, politics, political, policy, election, vote, voter, candidate, campaign, democracy, democratic, president, prime minister, parliament, congress, law, legislation, regulation, reform, protest, demonstration, strike, rights, freedom, justice, equality, poverty, inequality, war, peace, conflict, negotiation, treaty, organization, charity, non-profit, humanitarian, aid, developing country, globalization, international relations
`,
  B2: `
B2 English Vocabulary List — Exam Preparation Course
Upper-Intermediate Level (Stage 3, follows the A2 and B1 stages)

1. Academic & Essay-Writing Linking Words
furthermore, moreover, in addition to this, additionally, what is more, besides this, apart from this, on top of that, similarly, likewise, by the same token, in the same vein, conversely, on the contrary, in contrast to this, by contrast, whereas, while, nevertheless, nonetheless, notwithstanding, despite this, in spite of this, even so, that being said, having said that, admittedly, granted, it could be argued that, it is often claimed that, it is widely believed that, some people contend that, critics argue that, proponents suggest that, opponents claim that, to a certain extent, to some degree, arguably, undoubtedly, unquestionably, indisputably, it goes without saying, needless to say, all things considered, taking everything into consideration, in light of this, in view of this, given that, seeing that, insofar as, provided that, assuming that, on the assumption that, as a consequence, as a direct result, thereby, whereby, hereby

2. Advanced Opinion, Argumentation & Debate
standpoint, stance, take a stance, hold a view, be of the opinion that, from a certain perspective, a valid point, a compelling argument, a convincing case, counterargument, rebuttal, refute, dispute, challenge an idea, question the validity of, cast doubt on, substantiate, corroborate, back up a claim, justify, rationalize, undermine, weaken an argument, strengthen a case, concede a point, acknowledge, dismiss an idea, discredit, contradict, be at odds with, draw a distinction between, differentiate, distinguish, oversimplify, generalize, overgeneralization, sweeping statement, one-sided, biased, unbiased, objective, subjective, impartial, prejudiced, open to interpretation, a matter of opinion, controversial issue, contentious, polarizing, divisive, consensus, reach a consensus, common ground, compromise, middle ground

3. Education (Academic Register)
academic achievement, academic performance, underachieve, overachieve, aptitude, cognitive development, critical thinking, analytical skills, problem-solving skills, rote learning, self-discipline, self-motivated, independent study, extracurricular activities, pastoral care, mentor, mentorship, peer review, feedback, constructive criticism, academic integrity, intellectual property, accreditation, standardized test, assessment, formative assessment, summative assessment, benchmark, learning outcome, pedagogy, curriculum development, streaming, setting, mixed-ability, gifted, underprivileged, disadvantaged background, educational disparity, access to education, lifelong learning, transferable skills, vocational qualification

4. Work, Business & Economics (Advanced)
corporate, corporation, multinational, subsidiary, merger, acquisition, takeover, stakeholder, shareholder, board of directors, executive, entrepreneurship, start-up, venture capital, revenue, turnover, profit margin, overheads, cash flow, asset, liability, insolvency, liquidation, recession, boom, downturn, upturn, fiscal, monetary policy, interest rate, inflation rate, GDP, gross domestic product, trade deficit, trade surplus, tariff, subsidy, outsourcing, offshoring, automation, redundancy, workforce diversity, work-life balance, burnout, presenteeism, remote work, hybrid work, productivity, efficiency, competitive advantage, market share, niche market, supply chain, logistics, negotiation tactics, corporate social responsibility

5. Technology & Innovation (Advanced)
disruptive technology, breakthrough, cutting-edge, state-of-the-art, obsolete, phase out, artificial intelligence, machine learning, algorithm, big data, data privacy, data breach, surveillance, encryption, biometric, automation, autonomous vehicle, virtual reality, augmented reality, biotechnology, nanotechnology, renewable technology, digital divide, digital literacy, information overload, screen time, digital detox, dependency, addictive design, misinformation, disinformation, deepfake, cyberbullying, online harassment, intellectual property rights, patent, innovation hub, tech industry, silicon valley, start-up culture

6. Environment & Sustainability (Advanced)
carbon neutral, net zero, carbon offset, emissions trading, biodiversity, ecosystem collapse, mass extinction, deforestation, desertification, ocean acidification, sea level rise, glacial melt, permafrost, sustainable development, circular economy, single-use plastic, microplastic, overconsumption, resource depletion, ecological footprint, green energy, clean technology, conservation effort, protected area, rewilding, invasive species, food security, water scarcity, climate refugee, environmental policy, regulatory framework, greenwashing, corporate accountability, grassroots movement, activism, lobbying

7. Health & Medicine (Advanced)
public health, epidemic, pandemic, outbreak, contagious, transmission, incubation period, immunity, herd immunity, chronic illness, terminal illness, degenerative disease, mental health disorder, anxiety disorder, depression, clinical, diagnosis, prognosis, remission, relapse, rehabilitation, palliative care, healthcare system, universal healthcare, health insurance, preventive medicine, alternative medicine, holistic approach, clinical trial, pharmaceutical, side effect, overdose, substance abuse, dependency, withdrawal symptoms, life expectancy, malnutrition, obesity epidemic, sedentary lifestyle, genetic predisposition, hereditary

8. Psychology & Human Behaviour
behaviour, behavioural, cognitive bias, perception, subconscious, unconscious, motivation, intrinsic motivation, extrinsic motivation, self-actualization, resilience, coping mechanism, defence mechanism, trauma, phobia, disorder, personality trait, temperament, nature versus nurture, conditioning, reinforcement, peer influence, conformity, social norm, groupthink, herd mentality, self-fulfilling prophecy, cognitive dissonance, rationalization, denial, empathy, sympathy, altruism, selfishness, ego, self-perception, self-esteem, self-worth, identity crisis, midlife crisis, developmental stage

9. Society & Social Issues
social mobility, socioeconomic status, income inequality, wealth gap, social exclusion, marginalized group, disenfranchised, underrepresented, systemic, institutionalized, discrimination, stereotype, prejudice, bigotry, xenophobia, tolerance, integration, assimilation, segregation, gentrification, urbanization, overpopulation, demographic shift, aging population, generational divide, social cohesion, community engagement, civic duty, civic responsibility, activism, advocacy, grassroots campaign, petition, protest movement, civil disobedience, human rights violation, social justice, welfare state, safety net

10. Politics & Government (Advanced)
governance, policy-making, legislation, bill, statute, amendment, referendum, electorate, constituency, coalition, opposition party, lobbying, pressure group, propaganda, censorship, transparency, accountability, corruption, bribery, nepotism, authoritarian, totalitarian, dictatorship, regime, sovereignty, autonomy, secession, diplomacy, diplomatic relations, sanctions, embargo, treaty, alliance, bilateral, multilateral, geopolitics, foreign policy, national security, intelligence agency, whistleblower, classified information

11. Science & Research (Advanced)
methodology, hypothesis, empirical evidence, quantitative, qualitative, peer-reviewed, correlation, causation, variable, control group, placebo, statistical significance, sample size, bias, margin of error, replicate a study, findings, breakthrough discovery, theoretical, applied science, interdisciplinary, ethical implications, funding, grant, publication, academic journal, citation, plagiarism, intellectual rigor, scientific consensus, paradigm shift

12. Media, Communication & Public Discourse
mainstream media, alternative media, tabloid, broadsheet, editorial, op-ed, investigative journalism, sensationalism, clickbait, echo chamber, filter bubble, confirmation bias, public discourse, freedom of the press, media literacy, propaganda, spin, framing, narrative, agenda-setting, misrepresentation, defamation, libel, slander, censorship, regulation, accountability journalism, whistleblowing, leaked document, anonymous source, credibility, reliable source, fact-checking

13. Culture, Identity & the Arts (Advanced)
cultural heritage, cultural appropriation, cultural identity, subculture, counterculture, mainstream culture, cultural assimilation, cultural relativism, globalization of culture, cultural exchange, artistic expression, avant-garde, contemporary art, abstract, symbolism, metaphor, allegory, narrative technique, aesthetic, critique, interpretation, artistic merit, commercial success, cultural significance, censorship in art, preservation, restoration, iconic, timeless, thought-provoking, evocative

14. Crime, Justice & Ethics
white-collar crime, organized crime, cybercrime, identity theft, embezzlement, corruption, bribery, extortion, vigilante, deterrent, rehabilitation, recidivism, incarceration, wrongful conviction, capital punishment, life sentence, plea bargain, due process, presumption of innocence, burden of proof, testimony, cross-examination, verdict, appeal, miscarriage of justice, ethical dilemma, moral obligation, moral high ground, code of conduct, integrity, accountability, culpability, negligence, liability

15. Travel, Migration & Globalization
globalization, interconnected, interdependence, cross-border, global economy, cultural homogenization, brain drain, migration pattern, economic migrant, asylum seeker, refugee crisis, displacement, integration policy, border control, visa restriction, cultural immersion, sustainable tourism, overtourism, ecotourism, carbon footprint of travel, cost of living abroad, expatriate, repatriate, cultural adaptation, homesickness, reverse culture shock

16. Relationships, Family & Life Stages (Nuanced)
nuclear family, extended family, single-parent household, blended family, co-parenting, custody, upbringing, parenting style, discipline, permissive, authoritarian parenting, generational trauma, work-life balance, childcare, eldercare, caregiving, sandwich generation, empty nest, milestone, coming of age, adolescence, rite of passage, quarter-life crisis, midlife crisis, retirement planning, ageing gracefully, intergenerational, estranged, reconcile, reconciliation

17. Personality, Character & Behaviour (Nuanced Vocabulary)
meticulous, pragmatic, versatile, resourceful, tenacious, persistent, diligent, conscientious, assertive, decisive, indecisive, opinionated, judgmental, condescending, patronizing, arrogant, humble, modest, unassuming, eccentric, unconventional, charismatic, persuasive, manipulative, deceptive, duplicitous, genuine, sincere, disingenuous, hypocritical, two-faced, forthright, candid, blunt, tactful, diplomatic, discreet, indiscreet, volatile, unpredictable, level-headed, composed, temperamental, spontaneous, methodical, meticulous, impulsive, calculating

18. Advanced Verbs (Formal / Academic Register)
constitute, comprise, encompass, entail, denote, signify, presuppose, stem from, arise from, give rise to, culminate in, result from, correlate with, coincide with, correspond to, contradict, reconcile, differentiate, distinguish, categorize, classify, prioritize, streamline, optimize, facilitate, hinder, impede, undermine, jeopardize, exacerbate, alleviate, mitigate, counteract, offset, compensate for, accommodate, incorporate, integrate, implement, execute, administer, allocate, distribute, delegate, oversee, monitor, evaluate, assess, scrutinize, verify, validate, endorse, sanction, condemn, denounce, advocate for, campaign for, lobby for, comply with, adhere to, conform to, deviate from, infringe on, violate, breach, uphold, sustain, perpetuate, eradicate, eliminate, abolish, phase out, revamp, overhaul, restructure, downsize, diversify, capitalize on, leverage, harness, exploit, deplete, replenish, cultivate, foster, nurture, cultivate, instigate, provoke, trigger, spark, ignite, curb, curtail, restrain, refrain from, abstain from, indulge in, succumb to, resort to, embark on, undertake, pursue, strive for, aspire to, aim for, envisage, anticipate, foresee, speculate, deduce, infer, extrapolate, generalize

19. Advanced Adjectives (Nuanced / Formal)
prevalent, widespread, ubiquitous, pervasive, rampant, unprecedented, unparalleled, unrivalled, exceptional, negligible, marginal, substantial, considerable, disproportionate, proportional, inherent, intrinsic, fundamental, underlying, comprehensive, exhaustive, superficial, in-depth, thorough, meticulous, rigorous, stringent, lenient, feasible, viable, unfeasible, impractical, plausible, implausible, credible, dubious, questionable, controversial, contentious, precarious, volatile, stable, resilient, vulnerable, susceptible, prone to, detrimental, beneficial, advantageous, counterproductive, redundant, obsolete, outdated, innovative, groundbreaking, revolutionary, conventional, orthodox, unorthodox, radical, moderate, extreme, conservative, progressive, liberal, tolerant, intolerant, inclusive, exclusive, discriminatory, equitable, disproportionate, sustainable, unsustainable, ethical, unethical, controversial, unbiased, subjective, objective, ambivalent, indifferent, apathetic, empathetic, compassionate, ruthless, merciless, lenient, punitive, retributive

20. Advanced Adverbs & Degree Modifiers
substantially, considerably, significantly, marginally, negligibly, disproportionately, overwhelmingly, predominantly, exclusively, inherently, fundamentally, inevitably, invariably, consistently, sporadically, intermittently, simultaneously, concurrently, subsequently, retrospectively, prospectively, theoretically, hypothetically, empirically, ostensibly, allegedly, supposedly, reportedly, presumably, conceivably, plausibly, arguably, undeniably, indisputably, unquestionably, categorically, explicitly, implicitly, deliberately, inadvertently, unwittingly, unintentionally, systematically, methodically, meticulously, superficially, fundamentally, radically, drastically, gradually, incrementally, exponentially, disproportionately

21. Advanced Phrasal Verbs
account for, bring about, bring up, carry out, come across as, come up against, come to terms with, cut back on, delve into, dwell on, engage with, factor in, fall back on, get around to, hold back, hold off, iron out, keep up with, lash out at, level with, live up to, look into, make up for, narrow down, open up, opt out of, pass on, phase out, pick up on, play down, point to, put across, put forward, rule out, run into, settle for, shy away from, single out, stand out, stem from, stick to, stumble across, sum up, take on, take up, thrash out, tie in with, touch on, veer off, weigh up, weed out, work through, wrap up

22. Idioms & Advanced Collocations
a double-edged sword, a blessing in disguise, a vicious circle, a slippery slope, the tip of the iceberg, food for thought, think outside the box, a grey area, a double standard, the lesser of two evils, an uphill battle, a level playing field, a turning point, a wake-up call, a stepping stone, get the ball rolling, cross that bridge when we come to it, take something with a pinch of salt, jump on the bandwagon, read between the lines, weigh the pros and cons, strike a balance, reach a turning point, set a precedent, bridge the gap, raise awareness, shed light on, draw attention to, come to a standstill, hit a plateau, gain momentum, lose momentum, face the consequences, bear the brunt of, pave the way for, be at a crossroads, be in the pipeline, go hand in hand with, be a far cry from, add fuel to the fire, tip the scales, hold water (of an argument), fall short of, live up to expectations

23. Formal Synonyms for Overused Words (Exam Writing Boosters)
important → significant, crucial, vital, paramount, essential
good → beneficial, favourable, advantageous, commendable
bad → detrimental, adverse, unfavourable, problematic
big → substantial, considerable, significant, extensive
show → demonstrate, illustrate, indicate, reveal, highlight
think → believe, contend, maintain, argue, assert
say → state, claim, assert, point out, note
get → obtain, acquire, gain, attain
use → utilize, employ, apply, implement
make → create, generate, produce, establish
help → assist, facilitate, contribute to, aid
problem → issue, dilemma, drawback, obstacle, challenge
change → alter, modify, transform, shift, adapt
because → due to, owing to, as a result of
also → furthermore, in addition, moreover
but → however, nevertheless, yet, whereas
many → numerous, a great deal of, a multitude of
a lot of → a considerable amount of, a substantial number of

24. Describing Trends, Data & Graphs (IELTS/TOEFL Task 1 Vocabulary)
increase, rise, grow, climb, soar, surge, rocket, jump, escalate, decrease, decline, fall, drop, plunge, plummet, dip, fluctuate, level off, plateau, stabilize, remain constant, remain steady, peak, reach a peak, hit a low, bottom out, a slight increase, a sharp increase, a dramatic increase, a gradual increase, a steady decline, a slight decline, overtake, surpass, exceed, outnumber, account for, make up, represent, constitute, comprise, the majority of, the minority of, a significant proportion of, negligible, marginal difference, considerable gap, a steady trend, an upward trend, a downward trend, in contrast to, compared with, relative to

25. Cause, Effect, Comparison & Contrast (Academic Writing)
give rise to, lead to, result in, bring about, contribute to, be attributable to, stem from, be a consequence of, have an impact on, have a bearing on, correlate with, be linked to, be associated with, trigger, precipitate, exacerbate, alleviate, offset, counterbalance, in comparison with, as opposed to, in relation to, with regard to, with respect to, when it comes to, as far as ... is concerned, on the one hand, on the other hand, unlike, similarly, likewise, by the same token, whereas, while, conversely

26. Register & Formality (Formal vs Informal Awareness)
formal register, informal register, colloquial, slang, jargon, technical term, euphemism, understatement, overstatement, hyperbole, tone, connotation, denotation, nuance, ambiguity, rhetorical question, persuasive language, emotive language, objective language, neutral tone, professional tone, conversational tone, polite request, direct request, hedge, hedging language, tentative language, assertive language

27. Abstract Nouns (High-Frequency Academic Nouns)
implication, ramification, consequence, repercussion, outcome, aftermath, prerequisite, criterion, criteria, parameter, framework, mechanism, phenomenon, phenomena, paradox, dilemma, controversy, discrepancy, disparity, correlation, causation, implication, assumption, presumption, perception, misconception, preconception, notion, concept, principle, rationale, justification, motive, incentive, deterrent, obstacle, constraint, limitation, drawback, advantage, disadvantage, benefit, merit, downside, upside, prospect, potential, capacity, capability, competence, proficiency, expertise, credibility, legitimacy, validity, authenticity, integrity, reliability, consistency, coherence, ambiguity, complexity, simplicity, feasibility, viability, sustainability

28. Word Formation: Common Prefixes & Suffixes (B2 Level)
misunderstand, overestimate, underestimate, reconsider, preconceive, counterproductive, interdependent, transform, multicultural, disadvantage, inaccurate, illegal, irrelevant, nonexistent, unforeseen
`,
  C1: `
C1 English Vocabulary List — Exam Preparation Course
Advanced Level (Stage 4, completes the A2 → B1 → B2 → C1 course)

1. Academic Word List Core Vocabulary (Coxhead AWL Sample — Highest Frequency)
analysis, approach, area, assessment, assume, authority, available, benefit, concept, consistent, constitutional, context, contract, create, data, definition, derived, distribution, economic, environment, established, estimate, evidence, export, factors, financial, formula, function, identified, income, indicate, individual, interpretation, involved, issues, labour, legal, legislation, major, method, occur, percent, period, policy, principle, procedure, process, required, research, response, role, section, sector, significant, similar, source, specific, structure, theory, variables, achieve, acquisition, administration, affect, appropriate, aspects, assistance, categories, chapter, commission, community, complex, computer, conclusion, conduct, consequences, construction, consumer, credit, cultural, design, distinction, elements, equation, evaluation, features, final, focus, impact, injury, institute, investment, items, journal, maintenance, normal, obtained, participation, perceived, positive, potential, previous, primary, purchase, range, region, regulations, relevant, resident, resources, restricted, security, sought, select, site, strategies, survey, text, traditional, transfer

2. Extended Academic & Formal Vocabulary
prevailing, discernible, incontrovertible, unequivocal, unmitigated, quintessential, paramount, salient, cogent, tenable, untenable, spurious, specious, tantamount to, conducive to, indicative of, symptomatic of, emblematic of, intrinsic to, endemic to, pervasive throughout, inextricably linked, mutually exclusive, mutually reinforcing, self-perpetuating, self-evident, axiomatic, empirical, anecdotal, circumstantial, corroborating, exculpatory, incriminating, definitive, provisional, tentative, categorical, unequivocal, ambivalent, equivocal, disingenuous, duplicitous, sanctimonious, ostentatious, unabashed, unassailable, indefensible, untenable, precarious, tenuous, nebulous, ambiguous, esoteric, arcane, abstruse, recondite, ubiquitous, anomalous, aberrant, idiosyncratic, unorthodox, heterodox, iconoclastic, avant-garde

3. Nuanced Synonyms for Precision Writing (C1 Boosters)
influence → sway, shape, mould, condition
cause → engender, precipitate, instigate, catalysing, catalyse
increase → augment, amplify, escalate, proliferate
decrease → diminish, dwindle, wane, abate
important → indispensable, integral, seminal, pivotal
obvious → conspicuous, palpable, patent, manifest
hidden → latent, veiled, concealed, clandestine
strange → anomalous, aberrant, incongruous, peculiar
skilled → adept, proficient, dexterous, accomplished
weak → tenuous, flimsy, fragile, precarious
strong → robust, formidable, resilient, unassailable
harmful → deleterious, pernicious, noxious, injurious
helpful → salutary, beneficial, advantageous, constructive
strict → stringent, rigorous, exacting, draconian
lazy → indolent, lethargic, languid, slothful
talk → discourse, converse, deliberate, expound
understand → discern, fathom, comprehend, grasp
cheat → dupe, deceive, hoodwink, defraud
praise → laud, extol, commend, eulogize
criticize → denounce, censure, disparage, deride

4. Rhetoric, Argumentation & Persuasive Language
rhetoric, rhetorical device, rhetorical question, anecdote, hypothetical scenario, thought experiment, straw man argument, slippery slope argument, false dichotomy, red herring, ad hominem, appeal to authority, appeal to emotion, logical fallacy, sound argument, flawed reasoning, premise, syllogism, deductive reasoning, inductive reasoning, corroborate, substantiate, refute, rebut, counter, concede, qualify a statement, caveat, proviso, disclaimer, nuanced position, polarized debate, false equivalence, cherry-pick evidence, selective reporting, confirmation bias, cognitive dissonance, dialectic, discourse analysis, framing effect

5. Nuanced Adjectives (High-Register)
inexorable, intransigent, implacable, unwavering, unrelenting, unflinching, resolute, steadfast, stalwart, dogged, vociferous, strident, vehement, adamant, obstinate, recalcitrant, truculent, belligerent, contentious, acrimonious, vitriolic, scathing, caustic, incisive, trenchant, astute, perspicacious, sagacious, prudent, judicious, discerning, circumspect, meticulous, punctilious, scrupulous, assiduous, indefatigable, prolific, versatile, multifaceted, all-encompassing, far-reaching, wide-ranging, exhaustive, comprehensive, cursory, perfunctory, desultory, sporadic, erratic, capricious, whimsical, mercurial, volatile, tempestuous, placid, serene, sanguine, phlegmatic, stoic, unperturbed, unfazed, imperturbable

6. Advanced Verbs (Formal / Precise)
espouse, endorse, champion, advocate, denounce, decry, castigate, admonish, reprimand, chastise, rebuke, exonerate, vindicate, absolve, implicate, incriminate, indict, prosecute, adjudicate, arbitrate, mediate, reconcile, appease, placate, mollify, exacerbate, aggravate, alleviate, assuage, mitigate, palliate, deteriorate, degenerate, atrophy, proliferate, burgeon, flourish, thrive, languish, dwindle, wane, subside, abate, culminate, precipitate, instigate, incite, foment, galvanize, mobilize, orchestrate, coordinate, streamline, consolidate, entrench, perpetuate, eradicate, dismantle, overhaul, revamp, supersede, supplant, subsume, encompass, circumvent, transcend, undermine, subvert, thwart, forestall, preclude, hinder, impede, curtail, curb, quell, suppress, stifle, stymie, deter, dissuade, coerce, compel, obligate, sanction, ratify, enact, repeal, rescind, nullify, invalidate, corroborate, substantiate, validate, authenticate

7. Idiomatic Expressions & Collocations (C1 Level)
throw caution to the wind, burn one's bridges, read the writing on the wall, be caught between a rock and a hard place, hit the nail on the head, go against the grain, fly in the face of, the elephant in the room, a Pandora's box, a Trojan horse, a Catch-22, a silver bullet, a watershed moment, a paradigm shift, a foregone conclusion, an open-and-shut case, par for the course, a moot point, a case in point, food for thought, the crux of the matter, a bone of contention, the lesser of two evils, sit on the fence, play devil's advocate, take something at face value, get to the bottom of, come to grips with, be at the mercy of, be at loggerheads with, bury the hatchet, add insult to injury, rub salt in the wound, cut corners, go the extra mile, keep something at bay, hold sway, gain traction, lose credibility, set the record straight, muddy the waters, give someone the benefit of the doubt

8. Philosophy, Ethics & Abstract Thought
ethical dilemma, moral relativism, moral absolutism, utilitarianism, deontological, existentialism, nihilism, determinism, free will, consciousness, epistemology, ontology, metaphysics, empiricism, rationalism, dichotomy, paradox, fallacy, dogma, ideology, doctrine, orthodoxy, heterodoxy, teleology, causality, subjectivity, objectivity, relativism, absolutism, pragmatism, idealism, scepticism, cynicism, stoicism, hedonism, altruism, egoism, autonomy, agency, discourse, hegemony, dialectic

9. Law, Governance & International Affairs (Advanced)
jurisprudence, litigation, adjudication, arbitration, statute of limitations, precedent, case law, common law, civil liberties, due process, habeas corpus, constitutional amendment, judicial review, separation of powers, checks and balances, sovereignty, self-determination, annexation, secession, insurgency, geopolitical, realpolitik, détente, deterrence, non-proliferation, humanitarian intervention, war crimes, crimes against humanity, international tribunal, extradition, diplomatic immunity, bilateral agreement, multilateral treaty, sanctions regime, embargo, ratification, accession

10. Economics, Business & Finance (Advanced)
macroeconomics, microeconomics, fiscal stimulus, austerity measures, quantitative easing, monetary tightening, structural unemployment, cyclical unemployment, stagflation, hyperinflation, deflation, purchasing power, disposable income, marginal utility, opportunity cost, comparative advantage, protectionism, trade liberalization, deregulation, privatization, nationalization, oligopoly, monopoly, market saturation, diminishing returns, economies of scale, vertical integration, horizontal integration, hostile takeover, leveraged buyout, venture capital, private equity, initial public offering, dividend, equity, liquidity, solvency, arbitrage, speculation, volatility, diversify a portfolio, hedge against risk

11. Science, Medicine & Technology (Advanced)
paradigm, methodology, epidemiological, longitudinal study, cross-sectional study, double-blind trial, statistically significant, confounding variable, causal relationship, correlation coefficient, extrapolate, corroborating evidence, falsifiability, reproducibility, peer review process, meta-analysis, systematic review, biomarker, pathogen, antimicrobial resistance, gene therapy, stem cell research, bioethics, genome sequencing, neural network, quantum computing, cryptography, blockchain, cybersecurity infrastructure, algorithmic bias, predictive analytics, synthetic biology

12. Literature, Style & Discourse Analysis
narrative voice, unreliable narrator, stream of consciousness, foreshadowing, dramatic irony, allegory, motif, juxtaposition, verisimilitude, pathos, ethos, logos, register, connotation, denotation, euphemism, litotes, hyperbole, understatement, colloquialism, vernacular, idiolect, syntax, semantics, pragmatics, cohesion, coherence, discourse marker, intertextuality, subtext, allusion, satire, parody, irony, cynicism, wit, eloquence, articulate, verbose, laconic, terse, prolix

13. Discourse Markers & Cohesive Devices (Advanced)
that said, be that as it may, all the same, in any case, in any event, for all that, in the final analysis, on closer inspection, on reflection, upon further consideration, by and large, more often than not, as things stand, as it happens, as luck would have it, in point of fact, strictly speaking, broadly speaking, loosely speaking, needless to say, it stands to reason that, it follows that, by extension, by the same logic, conversely speaking, to put it bluntly, to put it mildly, to say the least, if anything, if nothing else, not to mention, let alone, still less, much less, far from it, quite the opposite, nothing could be further from the truth

14. Register, Nuance & Pragmatics
hedging, mitigation, face-saving, politeness strategy, indirect speech act, implicature, presupposition, deixis, register shift, code-switching, formality gradient, understatement for effect, tongue-in-cheek, wry humour, deadpan, self-deprecating, backhanded compliment, loaded language, dog whistle, doublespeak, weasel words, spin, euphemistic language, sanitized language, gravitas, decorum, propriety, impropriety, tact, diplomacy, candour, bluntness

15. CELTA (Certificate in English Language Teaching to Adults) Terminology - EXCLUDED
16. DELTA (Diploma in Teaching English to Speakers of Other Languages) Terminology - EXCLUDED
17. TKT (Teaching Knowledge Test) Terminology - EXCLUDED
18. TESOL / TEFL & General ELT Professional Terminology - EXCLUDED

19. Exam Board & Qualification Names (Reference List)
Cambridge Assessment English, IELTS, IELTS (International English Language Testing System), TOEFL iBT, TOEFL iBT (Test of English as a Foreign Language), TOEIC, TOEIC (Test of English for International Communication), PTE Academic, PTE Academic (Pearson Test of English), Duolingo English Test, ЕГЭ, ЕГЭ (Unified State Exam), ОГЭ, ОГЭ (Basic State Exam), CELTA, CELTA (Certificate in English Language Teaching to Adults), DELTA, DELTA (Diploma in Teaching English to Speakers of Other Languages), TKT, TKT (Teaching Knowledge Test), CertTESOL, CertTESOL (Trinity College London), LTCL Diploma TESOL, TESOL Certificate, TEFL Certificate, ICELT, ICELT (In-Service Certificate in English Language Teaching), C1 Advanced, C1 Advanced (CAE), C2 Proficiency, C2 Proficiency (CPE), B2 First, B2 First (FCE), B1 Preliminary, B1 Preliminary (PET), A2 Key, A2 Key (KET), Cambridge English Scale score, band score, proficiency level, accreditation body, quality assurance in ELT
`,
  C2: `
C2 English Vocabulary List — Exam Preparation Course
Mastery / Proficiency Level (Stage 5, completes the A2 → B1 → B2 → C1 → C2 course)

1. High-Register / Low-Frequency Vocabulary (CPE Core)
sagacity, perspicacity, acumen, discernment, prudence, temerity, audacity, effrontery, impunity, impunibility, hubris, nemesis, catharsis, epiphany, zeitgeist, schadenfreude, ennui, malaise, disquiet, trepidation, consternation, perturbation, equanimity, imperturbability, insouciance, nonchalance, sangfroid, aplomb, panache, élan, verve, gravitas, decorum, probity, rectitude, veracity, mendacity, duplicity, chicanery, subterfuge, connivance, collusion, machination, stratagem, contrivance, artifice, guile, cunning, wiliness, obsequiousness, sycophancy, unctuousness, obduracy, intransigence, obstinacy, pertinacity, tenacity, doggedness, perseverance, fortitude, resilience, stoicism, forbearance, magnanimity, benevolence, munificence, largesse, altruism, philanthropy, misanthropy, xenophobia, chauvinism, jingoism, parochialism, insularity, provincialism, cosmopolitanism

2. Literary & Formal Vocabulary
verisimilitude, mimesis, catharsis, bathos, pathos, ethos, logos, hamartia, denouement, exposition, peripeteia, anagnorisis, apotheosis, epiphany, epiphanic, elegiac, lyrical, prosaic, didactic, polemical, panegyric, encomium, eulogy, elegy, ode, invective, diatribe, tirade, harangue, jeremiad, philippic, treatise, exegesis, hermeneutics, exposition, disquisition, disputation, dissertation, monograph, compendium, anthology, oeuvre, magnum opus, canon, canonical, apocryphal, hagiography, autobiographical, epistolary, picaresque, bildungsroman, dystopian, utopian, allegorical, symbolic, metaphorical, figurative, literal, vernacular, colloquial, idiomatic, archaic, obsolete, anachronistic

3. Nuanced Abstract Nouns (Native-Like Precision)
verisimilitude, dichotomy, antinomy, paradox, quandary, predicament, conundrum, quagmire, imbroglio, morass, cul-de-sac, impasse, stalemate, deadlock, gridlock, stagnation, inertia, entropy, atrophy, decrepitude, senescence, obsolescence, desuetude, abeyance, dormancy, latency, incipience, nascence, genesis, provenance, provenience, etymology, nomenclature, taxonomy, typology, categorization, stratification, hierarchy, echelon, cadre, coterie, clique, cabal, oligarchy, plutocracy, meritocracy, technocracy, kleptocracy, kakistocracy, gerontocracy, theocracy

4. Precise Verbs (C2 Register)
adumbrate, foreshadow, presage, portend, augur, prognosticate, vaticinate, extrapolate, infer, deduce, surmise, conjecture, posit, postulate, hypothesize, theorize, conceptualize, contextualize, problematize, interrogate, deconstruct, dissect, unpack, elucidate, clarify, illuminate, explicate, delineate, demarcate, circumscribe, delimit, encapsulate, epitomize, embody, personify, exemplify, typify, symbolize, connote, denote, signify, presage, foment, incite, instigate, provoke, goad, needle, rile, exasperate, vex, irk, nettle, ruffle, unsettle, discombobulate, disconcert, nonplus, flummox, bamboozle, hoodwink, bemuse, bewilder, mystify, obfuscate, mask, occlude, obscure, cloud, muddy, blur, elide, gloss over, skirt around, sidestep, circumvent, obviate, preempt, forestall, avert, stave off, ward off

5. Idioms, Allusions & Cultural References (C2 Level)
a Sisyphean task, a Pyrrhic victory, a Faustian bargain, an Achilles' heel, a Herculean effort, a Machiavellian scheme, a Kafkaesque situation, an Orwellian state, a Byzantine process, a Draconian measure, quixotic, a Gordian knot, cross the Rubicon, meet one's Waterloo, the Midas touch, Pandora's box, a Trojan horse, cut the Gordian knot, rest on one's laurels, wash one's hands of, a fait accompli, a raison d'être, a modus operandi, a quid pro quo, a status quo, an ad hoc solution, a non sequitur, a caveat emptor, per se, vis-à-vis, ipso facto, prima facie, de facto, de jure, in absentia, in perpetuity, pro bono, sine qua non, terra incognita, tabula rasa, magnum opus, persona non grata, bête noire, joie de vivre, savoir-faire, coup de grâce, déjà vu, laissez-faire

6. Foreign Phrases Commonly Used in Formal/Academic English
a priori, a posteriori, ad hominem, ad infinitum, ad nauseam, bona fide, carpe diem, e.g. / exempli gratia, et cetera, i.e. / id est, in situ, in toto, mutatis mutandis, per capita, per se, prima facie, quid pro quo, status quo, verbatim, vice versa, zeitgeist, gestalt, doppelgänger, schadenfreude, weltanschauung, laissez-faire, coup d'état, avant-garde, cliché, déjà vu, faux pas, raison d'être, rendezvous, résumé, café society, entrepreneur, nouveau riche, savoir-faire, joie de vivre

7. Sophisticated Connectors & Discourse Management
be that as it may, notwithstanding the aforementioned, in light of the foregoing, to the extent that, insofar as, inasmuch as, by the same token, mutatis mutandis, a fortiori, ipso facto, per contra, conversely speaking, to reiterate, to recapitulate, in recapitulation, to elaborate further, to expound upon, to digress momentarily, returning to the point at hand, to bring this full circle, to draw the threads together, in summation, in the final reckoning, when all is said and done, the fact of the matter remains, it bears reiterating that, it would be remiss not to mention, one cannot help but notice, it is not without irony that, therein lies the crux

8. Specialized Register — Law (Advanced/C2)
ultra vires, mens rea, actus reus, res judicata, stare decisis, obiter dictum, ratio decidendi, tortious liability, culpable negligence, vicarious liability, fiduciary duty, indemnity clause, force majeure, in camera proceedings, sub judice, injunctive relief, declaratory judgment, statute of frauds, promissory estoppel, unjust enrichment, quantum meruit, restitution, subrogation, novation, rescission, ultra vires, locus standi, amicus curiae, pro se litigant, plea in mitigation

9. Specialized Register — Medicine & Science (Advanced/C2)
etiology, pathophysiology, comorbidity, iatrogenic, idiopathic, prophylactic, palliative, salutogenic, morbidity rate, mortality rate, epidemiological surveillance, zoonotic transmission, nosocomial infection, asymptomatic carrier, immunocompromised, autoimmune response, homeostasis, allostatic load, neuroplasticity, epigenetic modification, phenotypic expression, genotype, biomarker validation, stochastic process, deterministic model, thermodynamic equilibrium, quantum entanglement, relativistic effect, anthropogenic factor

10. Specialized Register — Economics & Finance (Advanced/C2)
fiduciary responsibility, moral hazard, adverse selection, information asymmetry, rent-seeking behaviour, principal-agent problem, sunk cost fallacy, opportunity cost, marginal propensity to consume, Ricardian equivalence, Keynesian stimulus, monetarist policy, Gini coefficient, purchasing power parity, quantitative tightening, systemic risk, contagion effect, tail risk, black swan event, arbitrage opportunity, derivative instrument, securitization, credit default swap, collateralized debt obligation

11. Wit, Irony & Stylistic Nuance
irony, dramatic irony, situational irony, verbal irony, sardonic wit, mordant humour, dry humour, self-deprecating humour, tongue-in-cheek remark, backhanded compliment, damning with faint praise, understatement for comic effect, hyperbolic exaggeration for effect, deadpan delivery, wry observation, acerbic commentary, biting satire, gentle mockery, playful banter, repartee, riposte, bon mot, witticism, epigram, aphorism, adage, maxim, truism, platitude, cliché, hackneyed expression, purple prose, florid language, ornate style, spare prose, economical style, minimalist style

12. Nuanced Emotional & Psychological Vocabulary
wistfulness, melancholy, disconsolate, forlorn, despondent, dejected, crestfallen, disheartened, disillusioned, jaded, world-weary, world-weariness, existential dread, ennui, angst, malaise, disaffection, alienation, estrangement, detachment, dissociation, catharsis, emotional catharsis, exhilaration, euphoria, elation, rapture, bliss, contentment, serenity, tranquility, equanimity, complacency, torpor, lethargy, listlessness, apathy, indifference, ambivalence, trepidation, foreboding, apprehension, disquietude, unease, misgiving

13. Advanced Collocations & Set Phrases
to defy convention, to break new ground, to set a precedent, to buck the trend, to swim against the tide, to weather the storm, to ride out a crisis, to come full circle, to reach a watershed, to hit rock bottom, to turn the tide, to gain the upper hand, to hold the reins, to call the shots, to take the reins, to be at the helm, to steer the course, to chart a new course, to blaze a trail, to tread carefully, to walk a tightrope, to skate on thin ice, to court controversy, to court disaster, to invite scrutiny, to withstand scrutiny, to stand the test of time, to leave one's mark, to make one's mark

14. Trinity College London Qualifications - EXCLUDED
15. DELTA Module 2 & Examiner-Level Assessment Criteria - EXCLUDED
16. Cambridge/IELTS Examiner & Rater Terminology - EXCLUDED
17. Academic ELT / Applied Linguistics Terminology - EXCLUDED
18. Reference: Advanced & Professional English Qualifications - EXCLUDED
`
};

const EXCLUDED_SECTIONS = {
  C1: [15, 16, 17, 18],
  C2: [14, 15, 16, 17, 18]
};

function normalizeWord(w) {
  if (!w) return '';
  return w.toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanItem(raw) {
  let item = raw.trim();
  if (!item) return [];

  // Remove trailing periods, semicolons, colons
  item = item.replace(/[.;:]+$/, '').trim();

  // Remove parenthetical notes
  item = item.replace(/\s*\([^)]*\)/g, '').trim();

  if (!item) return [];

  // Skip header notes / junk lines
  if (item.toLowerCase().startsWith('summary') ||
      item.toLowerCase().startsWith('full course') ||
      item.toLowerCase().startsWith('recommended next') ||
      item.toLowerCase().startsWith('stage ') ||
      item.toLowerCase().startsWith('cumulative') ||
      item.toLowerCase().startsWith('prefixes:') ||
      item.toLowerCase().startsWith('suffixes:') ||
      item.toLowerCase().startsWith('examples:') ||
      item.toLowerCase().startsWith('if useful')) {
    return [];
  }

  let candidates = [];
  if (item.includes('→') || item.includes('->')) {
    const parts = item.split(/→|->/);
    for (const p of parts) {
      const subItems = p.split(',');
      for (const s of subItems) {
        const cleaned = s.trim();
        if (cleaned) candidates.push(cleaned);
      }
    }
  } else if (item.includes('/') && !item.includes(' ')) {
    const parts = item.split('/');
    for (const p of parts) {
      if (p.trim()) candidates.push(p.trim());
    }
  } else if (item.includes('/') && item.split('/').every(part => part.trim().split(' ').length <= 3)) {
    const parts = item.split('/');
    for (const p of parts) {
      if (p.trim()) candidates.push(p.trim());
    }
  } else {
    candidates.push(item);
  }

  return candidates.map(c => c.replace(/^['"]|['"]$/g, '').trim()).filter(Boolean);
}

function parseDocument(docLevel, docText) {
  const lines = docText.split('\n');
  const sections = [];
  let currentSection = null;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Check for section header e.g. "1. Greetings..." or "19. Exam Board..."
    const secMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (secMatch) {
      const secNum = parseInt(secMatch[1], 10);
      const secTitle = secMatch[2].trim();
      const excludedList = EXCLUDED_SECTIONS[docLevel] || [];
      const isExcluded = excludedList.includes(secNum);

      currentSection = {
        number: secNum,
        title: `${secNum}. ${secTitle}`,
        isExcluded,
        items: []
      };
      if (!isExcluded) {
        sections.push(currentSection);
      }
      continue;
    }

    if (!currentSection || currentSection.isExcluded) continue;

    // Split line by comma
    const rawItems = line.split(',');
    for (const raw of rawItems) {
      const cleanedList = cleanItem(raw);
      for (const item of cleanedList) {
        if (item && !currentSection.items.includes(item)) {
          currentSection.items.push(item);
        }
      }
    }
  }

  return sections;
}

function loadVocabFiles() {
  const rootDir = path.resolve(__dirname, '../vocabulary/en');
  const levelDirs = ['a0_a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  const files = [];

  for (const levelDir of levelDirs) {
    const dirPath = path.join(rootDir, levelDir);
    if (!fs.existsSync(dirPath)) continue;
    const fileNames = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
    for (const fileName of fileNames) {
      files.push(path.join(dirPath, fileName));
    }
  }
  return files;
}

function updateDomain(existingDomain) {
  if (!existingDomain || existingDomain.trim() === '') {
    return "exam";
  }
  let parts = existingDomain.split(',').map(s => s.trim()).filter(Boolean);
  if (!parts.includes('exam')) {
    parts.push('exam');
  }
  if (parts.includes('general')) {
    parts = ['general', ...parts.filter(p => p !== 'general')];
  }
  return parts.join(', ');
}

const PROFESSIONAL_SUBTHEMES = [
  'teachers-scientists',
  'it-specialists',
  'legal-english',
  'academic-english'
];

function determineExamSubTheme(item, sectionTitle) {
  const norm = normalizeWord(item);
  // Board specific checks
  if (norm.includes('ielts')) return 'ielts';
  if (norm.includes('toefl') || norm.includes('toeic')) return 'toefl';
  if (norm.includes('cambridge') || norm === 'cae' || norm === 'cpe' || norm === 'fce' || norm === 'pet' || norm === 'ket') return 'cambridge';
  return 'general';
}

const CEFR_ORDER = {
  'A0': 0,
  'A1': 1,
  'A2': 2,
  'B1': 3,
  'B2': 4,
  'C1': 5,
  'C2': 6
};

function checkLevelMismatch(entryLevel, sourceDocLevel) {
  const eLvl = (entryLevel || 'A2').toUpperCase();
  const sLvl = sourceDocLevel.toUpperCase();

  // A2 source document explicitly folds A0/A1 into A2
  if (sLvl === 'A2' && (eLvl === 'A0' || eLvl === 'A1' || eLvl === 'A2')) {
    return false;
  }

  const eIdx = CEFR_ORDER[eLvl] ?? 2;
  const sIdx = CEFR_ORDER[sLvl] ?? 2;

  // Flag mismatch if difference is > 1 step
  if (Math.abs(eIdx - sIdx) > 1) {
    return true;
  }
  return false;
}

function stringifyEscaped(obj) {
  let str = JSON.stringify(obj, null, 2);
  return str.replace(/[\u007f-\uffff]/g, (c) => {
    return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
  });
}

function processTagging(applyChanges = false) {
  const files = loadVocabFiles();
  const fileData = {};
  const entryMap = new Map();

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const entries = JSON.parse(content);
    fileData[filePath] = entries;

    for (const entry of entries) {
      const wordsToRegister = [entry.word];
      if (entry.plural_form) wordsToRegister.push(entry.plural_form);

      for (const w of wordsToRegister) {
        if (!w) continue;
        const norm = normalizeWord(w);
        if (!entryMap.has(norm)) {
          entryMap.set(norm, []);
        }
        entryMap.get(norm).push({ entry, filePath });
      }
    }
  }

  const parsedDocs = {};
  for (const [docLevel, text] of Object.entries(sourceDocs)) {
    parsedDocs[docLevel] = parseDocument(docLevel, text);
  }

  const taggedCounts = {
    byDocument: { A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
    bySubTheme: { general: 0, ielts: 0, toefl: 0, cambridge: 0 }
  };

  const levelMismatches = [];
  const subThemeConflicts = [];
  const deferredList = { A2: {}, B1: {}, B2: {}, C1: {}, C2: {} };

  const modifiedFiles = new Set();
  const taggedEntriesGlobal = new Map(); // entryId -> count

  for (const [docLevel, sections] of Object.entries(parsedDocs)) {
    for (const section of sections) {
      deferredList[docLevel][section.title] = [];

      for (const item of section.items) {
        const normItem = normalizeWord(item);
        let matches = entryMap.get(normItem);

        if (!matches && normItem.endsWith('s')) {
          matches = entryMap.get(normItem.slice(0, -1));
        }

        if (matches && matches.length > 0) {
          for (const { entry, filePath } of matches) {
            // Update Domain
            const newDomain = updateDomain(entry.domain);
            if (entry.domain !== newDomain) {
              entry.domain = newDomain;
              modifiedFiles.add(filePath);
            }

            // Determine target exam sub_theme
            const targetSubTheme = determineExamSubTheme(item, section.title);

            // SubTheme Handling
            if (entry.sub_theme && PROFESSIONAL_SUBTHEMES.includes(entry.sub_theme)) {
              // Conflict! Do not overwrite professional sub_theme
              subThemeConflicts.push({
                word: item,
                entryId: entry.id,
                existingSubTheme: entry.sub_theme,
                attemptedExamSubTheme: targetSubTheme,
                docLevel,
                sectionTitle: section.title
              });
            } else {
              if (entry.sub_theme !== targetSubTheme) {
                entry.sub_theme = targetSubTheme;
                modifiedFiles.add(filePath);
              }
            }

            // Tracking
            const trackingKey = `${entry.id}:${docLevel}:${section.title}:${item}`;
            if (!taggedEntriesGlobal.has(trackingKey)) {
              taggedEntriesGlobal.set(trackingKey, true);
              taggedCounts.byDocument[docLevel]++;
              const actualSubTheme = PROFESSIONAL_SUBTHEMES.includes(entry.sub_theme) ? targetSubTheme : (entry.sub_theme || 'general');
              taggedCounts.bySubTheme[actualSubTheme] = (taggedCounts.bySubTheme[actualSubTheme] || 0) + 1;

              if (checkLevelMismatch(entry.level, docLevel)) {
                levelMismatches.push({
                  word: item,
                  entryId: entry.id,
                  sourceLevel: docLevel,
                  entryLevel: entry.level,
                  sectionTitle: section.title
                });
              }
            }
          }
        } else {
          deferredList[docLevel][section.title].push(item);
        }
      }
    }
  }

  if (applyChanges) {
    for (const filePath of modifiedFiles) {
      const formatted = stringifyEscaped(fileData[filePath]) + '\n';
      fs.writeFileSync(filePath, formatted, 'utf8');
    }
    console.log(`Updated ${modifiedFiles.size} JSON files.`);
  }

  return {
    taggedCounts,
    levelMismatches,
    subThemeConflicts,
    deferredList,
    modifiedFilesCount: modifiedFiles.size
  };
}

if (require.main === module) {
  const applyFlag = process.argv.includes('--apply');
  console.log(applyFlag ? 'Applying changes...' : 'Running dry run...');
  const res = processTagging(applyFlag);

  console.log('\n--- TAGGING SUMMARY BY DOCUMENT ---');
  console.table(res.taggedCounts.byDocument);
  console.log('\n--- TAGGING SUMMARY BY SUB_THEME ---');
  console.table(res.taggedCounts.bySubTheme);
  console.log(`\nTotal Level Mismatches: ${res.levelMismatches.length}`);
  console.log(`Total SubTheme Conflicts: ${res.subThemeConflicts.length}`);
  console.log(`Modified Files Count: ${res.modifiedFilesCount}`);

  // Generate audit report
  const reportsDir = path.resolve(__dirname, '../reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  let reportMd = `# Exam Domain Tagging Summary Audit\n\n`;
  reportMd += `## 1. Counts Tagged\n\n`;
  reportMd += `### Tagged per Source Document\n`;
  reportMd += `| Document | Tagged Count |\n| --- | --- |\n`;
  for (const [doc, count] of Object.entries(res.taggedCounts.byDocument)) {
    reportMd += `| \`${doc}\` | ${count} |\n`;
  }

  reportMd += `\n### Tagged per \`sub_theme\`\n`;
  reportMd += `| Sub-theme Track | Tagged Count |\n| --- | --- |\n`;
  for (const [st, count] of Object.entries(res.taggedCounts.bySubTheme)) {
    reportMd += `| \`${st}\` | ${count} |\n`;
  }

  reportMd += `\n## 2. Level Mismatches (> 1 CEFR Step Difference)\n\n`;
  reportMd += `Total Mismatches Recorded: ${res.levelMismatches.length}\n\n`;
  if (res.levelMismatches.length > 0) {
    reportMd += `| Word | Entry ID | Source Level | Existing Entry Level | Section |\n`;
    reportMd += `| --- | --- | --- | --- | --- |\n`;
    for (const m of res.levelMismatches) {
      reportMd += `| ${m.word} | \`${m.entryId}\` | ${m.sourceLevel} | ${m.entryLevel} | ${m.sectionTitle} |\n`;
    }
  } else {
    reportMd += `No level mismatches exceeding 1 CEFR step were found.\n`;
  }

  reportMd += `\n## 3. Sub-theme Conflicts (Existing Professional Sub-theme Preserved)\n\n`;
  reportMd += `Total Conflicts Recorded: ${res.subThemeConflicts.length}\n\n`;
  if (res.subThemeConflicts.length > 0) {
    reportMd += `| Word | Entry ID | Existing Professional \`sub_theme\` | Attempted Exam Track | Document / Section |\n`;
    reportMd += `| --- | --- | --- | --- | --- |\n`;
    for (const c of res.subThemeConflicts) {
      reportMd += `| ${c.word} | \`${c.entryId}\` | \`${c.existingSubTheme}\` | \`${c.attemptedExamSubTheme}\` | ${c.docLevel} - ${c.sectionTitle} |\n`;
    }
  } else {
    reportMd += `No sub-theme conflicts were found.\n`;
  }

  reportMd += `\n## 4. Not Found — Deferred to Phase 3b\n\n`;
  for (const [docLvl, secMap] of Object.entries(res.deferredList)) {
    reportMd += `### Source Document: ${docLvl}\n\n`;
    for (const [secTitle, words] of Object.entries(secMap)) {
      if (words.length > 0) {
        reportMd += `#### ${secTitle} (${words.length} terms deferred)\n`;
        reportMd += words.map(w => `- ${w}`).join('\n') + '\n\n';
      }
    }
  }

  fs.writeFileSync(path.join(reportsDir, 'exam_tagging_summary.md'), reportMd, 'utf8');
  console.log(`Report written to reports/exam_tagging_summary.md`);
}

module.exports = {
  processTagging,
  sourceDocs
};
