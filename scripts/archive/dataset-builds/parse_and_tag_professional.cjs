const fs = require('fs');
const path = require('path');

// Raw source text from user prompt
const sourceDocs = {
  A2: `
## PART 1 — GENERAL PROFESSIONAL CORE (A0–A2)

### 1. Numbers & Quantities
one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, twenty, thirty,
hundred, thousand, first (adj), second (adj), third (adj), number (n), half (n), quarter (n),
many, much, a lot of, some, any, few, little, enough, all, none

### 2. Time & Calendar
time (n), hour, minute, second (n), day, week, month, year, today, tomorrow, yesterday,
morning, afternoon, evening, night, o'clock, early, late, now, soon, later, before (prep),
after (prep), always, never, sometimes, often, usually, Monday, Tuesday, Wednesday, Thursday,
Friday, Saturday, Sunday, January–December (months, generic), spring, summer, autumn/fall,
winter, date (n), calendar, birthday, weekend, holiday, appointment

### 3. Family & People
family, mother, father, parent, son, daughter, brother, sister, child, children, baby, husband,
wife, grandmother, grandfather, aunt, uncle, cousin, friend, neighbour, people, person, man,
woman, boy, girl, adult, name, age, married, single, colleague, partner, boss, staff, team

### 4. Body & Health
body, head, face, eye, ear, nose, mouth, hair, hand, arm, leg, foot, feet, back, stomach, heart,
tooth, teeth, finger, health, ill, sick, pain, hurt (v), doctor, nurse, hospital, medicine,
tablet, appointment, temperature, cold (n), headache, tired, rest (v), better (adj)

### 5. Feelings & Emotions
happy, sad, angry, afraid, worried, nervous, excited, bored, tired, surprised, calm, relaxed,
sorry, glad, love (v), like (v), hate (v), want (v), need (v), hope (v), feel (v), enjoy (v)

### 6. Food & Drink
food, drink (n/v), eat, breakfast, lunch, dinner, meal, bread, rice, meat, chicken, fish,
vegetable, fruit, apple, banana, orange, potato, tomato, egg, milk, cheese, butter, sugar, salt,
pepper, tea, coffee, water, juice, wine, beer, hungry, thirsty, cook (v), restaurant, menu,
waiter, bill (n), order (v), delicious, cake, chocolate, soup, sandwich, biscuit/cookie, snack,
recipe, kitchen, pan, plate, cup, glass, spoon, fork, knife

### 7. Clothes & Accessories
clothes, shirt, T-shirt, trousers/pants, dress, skirt, jacket, coat, shoes, socks, hat, bag,
glasses, watch, ring, wear (v), put on, take off, size, colour, buy (v), sell (v), shop (n/v)

### 8. House & Home
house, home, flat/apartment, room, bedroom, bathroom, kitchen, living room, door, window, wall,
floor, roof, garden, garage, key (n), address, live (v), move (v), rent (v/n), stay (v), clean
(v/adj), tidy (adj)

### 9. Furniture & Objects
table, chair, bed, sofa, desk, lamp, shelf, mirror, television/TV, radio, phone, computer, clock,
picture, book, pen, pencil, paper, bag, box, bottle, umbrella

### 10. Places in Town
town, city, village, street, road, shop, supermarket, market, bank, post office, station,
airport, hotel, park, church, museum, cinema, theatre, library, school, university, hospital,
office, factory, farm, beach, mountain, river, lake, sea, bridge

### 11. Directions & Location
here, there, left, right, straight on, near, far, opposite, next to, between, in front of,
behind, on, in, under, over, up, down, corner, map, direction

### 12. Transport & Travel
car, bus, train, plane/airplane, taxi, bicycle/bike, boat, ship, ticket, journey, trip, travel
(v), drive (v), fly (v), walk (v), arrive, leave, station, airport, luggage, passport,
ticket office, platform, timetable/schedule, delay (n), traffic

### 13. Weather & Seasons
weather, sun, sunny, rain, rainy, cloud, cloudy, wind, windy, snow, snowy, hot, cold, warm, cool,
temperature, storm, ice

### 14. Nature & Animals
animal, dog, cat, bird, fish, horse, cow, sheep, pig, chicken, tree, flower, grass, forest, sky,
star, moon, sun, earth, world, nature, plant (n/v)

### 15. Colors & Shapes
red, blue, green, yellow, black, white, grey, brown, pink, orange, purple, colour, circle,
square, round, big, small, long, short (adj)

### 16. School & Learning
school, class, classroom, teacher, student, lesson, homework, exam, test, question, answer,
learn, study, teach, book, pen, paper, subject, English, mathematics, science, read, write,
listen, speak, understand, remember, forget, practise, correct (adj), mistake, difficult, easy

### 17. Work & Jobs
work (n/v), job, career, company, business, office, manager, employee, employer, salary, meeting,
task, project, plan (n/v), report (n), customer, client, service, factory, shop assistant,
engineer, driver, cook (n), teacher, doctor, farmer, retire, retired, pension, apply (v),
interview, CV/resume, experience, skill, full-time, part-time

### 18. Money & Shopping
money, price, cost (v), cheap, expensive, pay (v), buy, sell, shop, shopping, cash, card,
credit card, change (n), bill, receipt, discount, sale, budget, save (v), spend (v), bank,
account, salary, tax, coin, note (money)

### 19. Communication & Basic Technology
telephone/phone, mobile phone, call (v/n), message, text (n/v), email, internet, website,
computer, laptop, screen, keyboard, mouse, printer, address, letter, post, send, receive,
answer (v), speak, talk, ask, tell, explain, information, news, television, newspaper, radio

### 20. Sports & Free Time
sport, football, tennis, swim, run, walk, play (v), game, music, song, sing, dance, film/movie,
hobby, holiday, party, visit (v), travel, relax, rest, garden (v)

### 21. Daily Routine Verbs
wake up, get up, get dressed, have breakfast, go to work, start, finish, come home, have dinner,
go to bed, sleep, wash, brush, shower, cook, clean, shop, drive, walk, wait, meet, visit, help,
carry, bring, take, give, put, open, close, turn on, turn off

### 22. Common Verbs (General)
be, have, do, go, come, get, make, take, see, know, think, say, tell, ask, give, find, use, work,
call, try, need, feel, become, leave, put, mean, keep, let, begin, seem, help, talk, turn, start,
show, hear, play, run, move, like, live, believe, bring, happen, write, provide, sit, stand,
lose, pay, meet, include, continue, set, learn, change, lead, understand, watch, follow, stop,
create, speak, read, allow, add, spend, grow, open, walk, win, offer, remember, love, consider,
appear, buy, wait, serve, die, send, expect, build, stay, fall, cut, reach, kill, remain

### 23. Common Adjectives
good, bad, big, small, new, old, young, long, short, high, low, right, wrong, easy, difficult,
important, different, same, happy, sad, hot, cold, warm, cool, beautiful, ugly, clean, dirty,
strong, weak, fast, slow, near, far, full, empty, expensive, cheap, quiet, noisy, safe,
dangerous, free, busy, ready, sure, sorry, tired, hungry, thirsty, interesting, boring, kind,
friendly, funny, serious, polite, rude, careful, popular

### 24. Common Adverbs
very, too, also, only, just, really, quite, almost, always, never, sometimes, often, usually,
again, still, already, yet, now, soon, later, here, there, quickly, slowly, well, badly, easily,
carefully

### 25. Prepositions
in, on, at, to, from, for, with, without, of, about, into, onto, by, near, between, behind, in
front of, under, over, above, below, through, during, since, until, before, after

### 26. Pronouns & Determiners
I, you, he, she, it, we, they, me, him, her, us, them, my, your, his, her, its, our, their, mine,
yours, this, that, these, those, some, any, every, each, all, no, other, another, one, someone,
something, anyone, anything, nobody, nothing

### 27. Question Words
what, who, where, when, why, how, which, whose, how much, how many, how old, how long

### 28. Conjunctions & Linkers
and, but, or, so, because, if, when, while, although, then, also, too, as well

### 29. Common Phrases & Expressions
Hello, Hi, Goodbye, Good morning, Good afternoon, Good evening, Good night, Please, Thank you,
You're welcome, Excuse me, Sorry, How are you?, Nice to meet you, See you later, What's your
name?, Where are you from?, I don't understand, Can you repeat that?, Can I help you?, Of
course, No problem, I think so, I'm not sure, Let's go, I agree, I disagree

### 30. Personal Info & Identity
name, surname, address, age, date of birth, nationality, country, language, job, married,
single, phone number, email address, signature, form (n), fill in

## PART 2 — TEACHERS / PROFESSORS / SCIENTISTS TRACK (add-on to Part 1)

### Classroom & Teaching
teacher, professor, student, pupil, class, classroom, lesson, subject, timetable, homework,
exam, test, mark (n), grade (n), pass (v), fail (v), question, answer, explain, understand,
repeat, practise, exercise, activity, group, pair, board (whiteboard), textbook, notebook,
dictionary, register (attendance), rule, behaviour, absent, present (adj)

### School Levels & People
primary school, secondary school, college, university, headteacher/principal, colleague, staff
room, parent, term, semester, course, curriculum, syllabus, degree, diploma, certificate,
graduate (n/v), scholarship

### Basic Science Vocabulary
science, scientist, experiment, laboratory/lab, test (n/v), result, data, research, observe,
measure, record (v), equipment, chemical, chemistry, biology, physics, plant, animal, cell,
energy, light, heat, water, air, gas, liquid, solid, temperature, weight, size, machine, tool,
material, sample, report (n), discover, invent, method, process, safety, mistake

### Common Academic Actions (simple)
study, learn, teach, explain, describe, compare, list (v), write, read, present (v), discuss,
ask, answer, check, correct (v), improve, review, plan, organise, prepare, present a project,
give a talk, take notes, do research

## PART 3 — IT SPECIALIST TRACK (add-on to Part 1)

### Hardware
computer, laptop, desktop, tablet, phone, smartphone, screen, monitor, keyboard, mouse, printer,
scanner, charger, battery, cable, USB, memory card, headphones, speaker, camera, microphone,
button, switch on, switch off, plug in, charge (v)

### Software & Basic Use
program, app/application, file, folder, document, save (v), open (v), close (v), delete, copy,
paste, click, double-click, type (v), download, upload, install, update (v/n), password,
username, login, logout, sign in, sign up, settings, search (v/n), icon, screen, window (on
screen), link, browser

### Internet & Communication
internet, Wi-Fi, network, website, webpage, email, email address, send, receive, message, chat,
video call, online, offline, connect, connection, social media, account, profile, upload,
download, virus, security, safe (adj), backup (n/v)

### Simple Office/Work Tech
office, work computer, printer, scanner, spreadsheet, table (in document), text, font, image,
photo, video, presentation, slide, meeting online, share (v), attach (v), attachment

### Everyday Problems & Help
problem, error, mistake, slow, fast, broken, work (v — "it doesn't work"), fix (v), help (v/n),
restart, turn off, turn on, try again, technician, support (n), call for help

## PART 4 — LEGAL ENGLISH TRACK (add-on to Part 1)

### Law & Order (basic)
law, rule, right (n — "your rights"), wrong (adj), legal, illegal, police, police officer,
police station, court, judge, lawyer, crime, criminal, steal, thief, arrest, prison, fine (n —
penalty), pay a fine, punishment, guilty, innocent, witness, victim

### Documents & Official Life
document, form (n), sign (v), signature, contract, agreement, agree, permission, permit (n),
licence/license, passport, ID card, identity card, certificate, copy (n), original, application,
apply, official (adj), government, public (adj), private (adj)

### Everyday Legal Situations
rent (v/n), landlord, tenant, agreement, insurance, claim (n/v), accident, report (v — "report
an accident"), complaint, complain, problem, dispute (n), solve (a problem), advice, advise,
appointment, meeting, deadline, pay, fee, tax, fine (n), warning (n)

### People & Places
lawyer, solicitor, judge, jury, court, courtroom, police station, embassy, town hall,
government office, citizen, resident, immigration, visa, border

## PART 5 — ACADEMIC ENGLISH (UNIVERSITY) TRACK (add-on to Part 1)

### University Life
university, college, campus, faculty, department, course, subject, degree, bachelor's degree,
master's degree, PhD/doctorate, student, professor, lecturer, classmate, semester, term,
timetable, scholarship, tuition, fee, library, lecture hall, dormitory/hall of residence,
canteen, student card

### Study Activities
study, learn, read, write, listen, take notes, revise, prepare, research (v/n), project,
assignment, essay, report (n), presentation, group work, discussion, question, answer, ask,
explain, understand, remember, forget, practise

### Exams & Assessment
exam, test, quiz, result, mark (n), grade (n), pass, fail, retake, deadline, submit, hand in,
late (adj), on time, certificate, diploma, graduate (v/n), graduation

### Basic Resources
book, textbook, dictionary, notebook, pen, laptop, computer, library card, website, internet,
online course, video lecture, printer, copy (n/v), file, folder

### Simple Connectors for Academic Writing (A2-appropriate)
first, second, next, then, after that, finally, for example, because, so, but, also, too, in my
opinion, I think, I agree, I disagree
`,
  B1: `
## PART 1 — GENERAL PROFESSIONAL CORE (B1)

### 1. Opinions, Agreement & Discussion
opinion, agree, disagree, argue, argument, discuss, discussion, debate (n/v), point of view,
suggest, suggestion, recommend, recommendation, advise, advice, convince, persuade, decide,
decision, choice, choose, prefer, preference, compare, comparison, contrast, similar,
similarity, difference, positive, negative, advantage, disadvantage, benefit
(n/v), doubt (n/v), certain, uncertain, obvious, unlikely, likely, probably, possibly

### 2. Personality & Character
character, personality, honest, dishonest, patient, impatient, confident, shy, generous, mean
(adj), selfish, reliable, unreliable, sensible, sensitive, stubborn, ambitious, lazy,
hard-working, organised, disorganised, calm, easy-going, strict, flexible, creative, curious,
independent, responsible, cheerful, mature, immature

### 3. Relationships & Society
relationship, relative, friendship, community, society, culture, custom, tradition, generation,
neighbourhood, background, environment (social), behaviour, behave, respect (n/v), trust (n/v),
support (n/v), argument, conflict, get on with, fall out with, break up, marriage, divorce,
engagement, wedding, funeral

### 4. Emotions & Reactions (extended)
disappointed, disappointing, embarrassed, embarrassing, confused, confusing, frustrated,
frustrating, ashamed, proud, jealous, annoyed, annoying, shocked, shocking, amazed, amazing,
satisfied, satisfying, relieved, upset, anxious, stressed, stress (n), depressed, cheer up,
calm down, relax, react, reaction

### 5. Health & the Body (extended)
symptom, illness, disease, injury, injure, wound, bleed, blood, infection, infect, treatment,
treat (v), cure (n/v), surgery, operation, prescribe, prescription, allergy, allergic, diet
(n/v), healthy, unhealthy, fitness, exercise (n/v), gym, recover, recovery, emergency,
ambulance, painkiller, pharmacy/chemist's, vaccine, virus, stress, mental health, physical

### 6. Weather, Environment & Climate
climate, temperature, degree, forecast, humid, dry, drought, flood, pollution, pollute, recycle,
recycling, environment, environmental, natural resource, renewable, energy, solar, wind power,
global warming, climate change, waste (n/v), rubbish/garbage, plastic, protect, protection,
endangered, wildlife, species, disaster, natural disaster

### 7. Travel & Tourism (extended)
tourist, tourism, destination, accommodation, book (v — reserve), reservation, cancel,
cancellation, itinerary, sightseeing, tour, guide (n), abroad, immigration, customs (border),
border, currency, exchange rate, local (adj), foreign, culture shock, jet lag, delay, cancel,
departure, arrival, gate (airport), boarding pass, check in, check out, journey, adventure

### 8. Media, Entertainment & Communication
media, news, journalist, article, magazine, advertisement/ad, advertise, channel, broadcast,
series, episode, reality show, celebrity, review (n/v), rating, subscribe, subscription,
podcast, blog, influencer, content, platform, comment (n/v), post (v/n — social media), like
(v — social media), share (v), viral, trend, trending

### 9. Education (extended)
education, educate, knowledge, skill, ability, training, trainee, qualification, qualify,
diploma, degree, scholarship, tuition fee, lecture, seminar, workshop, assignment, essay, thesis,
research (n/v), academic, distance learning, e-learning, apply for, application, entrance exam,
grade (n), fail, pass, retake

### 10. Work & Career (extended)
career, profession, promotion, promote, employer, employee, employment, unemployment,
unemployed, recruit, recruitment, hire, fire (v — dismiss), resign, quit, retire, retirement,
contract, permanent, temporary, freelance, self-employed, colleague, teamwork, deadline,
workload, overtime, shift (n), part-time, full-time, salary, wage, bonus, benefits (n),
qualification, experience, CV/resume, cover letter, interview, apply, application, skill set,
performance, achievement, achieve, goal, target, responsibility, responsible for, in charge of

### 11. Business & Economy (basic)
company, business, industry, market, product, service, customer, client, consumer, brand,
competition, competitor, profit, loss, budget, invoice, cost, expense, income, revenue,
investment, invest, economy, economic, growth, demand, supply, trade, import, export,
manufacture, production, sell, purchase, deal (n), negotiate, negotiation, contract, agreement,
partnership, headquarters, branch, department, meeting, presentation, report, strategy, plan

### 12. Money & Finance (extended)
finance, financial, budget, save, savings, spend, spending, debt, loan, borrow, lend, interest
(finance), mortgage, insurance, invest, investment, income, expense, afford, cost of living,
inflation, currency, exchange rate, salary, wage, tax, bill, fee, discount, refund, deposit,
withdraw, transfer, account, bank statement, credit, debit

### 13. Technology & Modern Life (extended)
technology, device, gadget, innovation, invent, invention, digital, artificial intelligence,
software, hardware, application/app, update, upgrade, feature, function, data, information,
storage, cloud, network, connection, wireless, virtual, online, offline, automatic,
automatically, robot, screen time, social media, privacy, security, hack, hacker

### 14. Law, Rights & Government (basic)
government, law, rule, regulation, policy, politics, political, politician, election, vote (n/v),
citizen, right (n), freedom, democracy, president, minister, parliament, court, judge, justice,
crime, criminal, punishment, prison, fine (n), tax, public, private, authority, council, local
government

### 15. Global Issues & Society
poverty, wealth, homeless, refugee, immigration, immigrant, equality, inequality, discrimination,
diversity, human rights, charity, donate, donation, volunteer (n/v), campaign, protest, issue
(n), solution, solve, cause (n/v), effect, impact, global, international, developing country,
developed country

### 16. Describing Change & Trends
change (n/v), increase (n/v), decrease (n/v), rise (v), fall (v), improve, improvement, develop,
development, growth, decline (n/v), trend, remain, stay the same, replace, affect, influence
(n/v), process, gradually, rapidly, significantly, dramatically, slightly

### 17. Time, Sequence & Narrative
recently, previously, eventually, meanwhile, immediately, gradually, suddenly, at first, in the
end, afterwards, nowadays, in the past, in the future, used to (phr), while, during, throughout,
by the time, as soon as, until, since

### 18. Extended Common Verbs
achieve, allow, appear, apply, arrange, avoid, base (on), believe, borrow, cause, complain,
consider, contain, continue, contribute, cope with, deal with, decide, deliver, depend on,
describe, develop, discover, discuss, encourage, ensure, establish, expect, experience, explain,
express, improve, increase, influence, involve, lend, manage, mention, mind (v), notice, obtain,
offer, organise, prepare, prevent, provide, publish, realise, recognise, reduce, refuse,
remind, replace, require, respond, result in, reveal, seem, solve, succeed, suggest, support,
survive, translate, treat, warn

### 19. Extended Common Adjectives
available, aware, beneficial, capable, complicated, confident, convenient, crowded, current,
dangerous, efficient, essential, familiar, flexible, generous, huge, ideal, impressive,
independent, likely, unlikely, modern, necessary, obvious, ordinary, particular, patient,
peaceful, popular, positive, negative, practical, precious, reasonable, reliable, remarkable,
responsible, satisfying, significant, similar, specific, successful, sufficient, suitable,
surprising, typical, unique, useful, valuable, various, worth (adj)

### 20. Linking Words & Discourse Markers (B1)
however, although, even though, despite, in spite of, therefore, as a result, because of, due
to, on the other hand, in addition, moreover, furthermore, for instance, such as, in conclusion,
overall, in general, especially, particularly, instead of, apart from, according to, in my view,
as far as I know, to sum up, on the whole

### 21. Idiomatic & Useful Everyday Phrases (B1)
make a decision, make an effort, make progress, take part in, take place, take care of, get used
to, get on well with, look forward to, put off (postpone), give up, run out of, find out, set up,
carry out, point out, come up with, deal with, keep in touch, catch up, break down, turn out,
work out, sort out

## PART 2 — TEACHERS / PROFESSORS / SCIENTISTS TRACK (B1 add-on)

### Teaching Methods & Classroom Management
teaching method, approach (n), lesson plan, curriculum, syllabus, assessment, assess, feedback,
peer, peer review, motivate, motivation, engage, engagement, participation, participate,
discipline (n), behaviour management, differentiation, learning style, progress (n), monitor
(v), evaluate, evaluation, objective (n), outcome, achievement, mark (v), grading, plagiarism,
academic integrity

### Higher Education & Research (entry-level)
faculty, department, dean, tenure, academic staff, researcher, fieldwork, hypothesis, theory,
data, analyse, analysis, variable, sample (research), survey (n/v), questionnaire, statistics,
conclusion, findings, evidence, source, citation, reference (n), bibliography, peer-reviewed,
journal (academic), publish, publication, conference, seminar, workshop, funding, grant (n)

### Science & Lab Vocabulary (entry-level)
hypothesis, experiment, variable, control group, laboratory, apparatus, procedure, observation,
measurement, accuracy, precise, reaction (chemical), substance, element, compound, organism,
ecosystem, evolution, genetics, gene, DNA, molecule, atom, force, gravity, matter (n), theory,
formula, calculate, calculation

### Communication in Academia
present findings, give a lecture, chair a meeting, supervise, supervisor, mentor (n/v), tutor,
tutorial, office hours, deadline, submission, proposal, draft (n/v), revise, revision, edit,
editor, collaborate, collaboration

## PART 3 — IT SPECIALISTS TRACK (B1 add-on)

### Programming & Development (entry-level)
code (n/v), coding, programming, programmer, developer, software, source code, script, bug, debug,
test (v — software), function (programming), variable, database, server, client (computing),
framework, library (code), version, version control, repository, deploy, deployment, environment
(dev), interface, user interface, user experience/UX, front end, back end

### Systems & Infrastructure
system, operating system, hardware, network, server, cloud computing, storage, backup, firewall,
encryption, protocol, IP address, domain, host (v/n), bandwidth, latency, virtual machine,
configuration, configure, install, uninstall, license (software)

### Cybersecurity Basics
security, cyber security, hacker, hacking, malware, virus, phishing, data breach, encryption,
password, authentication, two-factor authentication, firewall, vulnerability, threat, risk (n),
protect, secure (adj/v), privacy, data protection

### Project & Team Work in IT
project, sprint, deadline, requirement, specification, client, stakeholder, team, agile, task,
ticket, issue (n — bug report), release (n/v), update, patch, maintenance, support (technical),
troubleshoot, documentation

### Data & AI Basics
data, database, big data, algorithm, artificial intelligence, machine learning, automation,
automate, analytics, analyse, process (v), input, output, cloud storage, backup, sync,
synchronise

## PART 4 — LEGAL ENGLISH TRACK (B1 add-on)

### Legal System Basics
legal system, law, legislation, legislature, statute, regulation, regulate, court, courtroom,
judge, jury, lawyer, solicitor, barrister, attorney, defendant, plaintiff, prosecutor, witness,
evidence, testimony, verdict, sentence (n/v), appeal (n/v), guilty, innocent, plea, hearing,
trial

### Contracts & Agreements
contract, clause, term (contract), condition, party (legal), agreement, breach (of contract),
obligation, liability, liable, damages, compensation, sue, lawsuit, dispute, negotiate, draft (a
contract), sign, witness (v), notarise, binding, legally binding, terminate, termination

### Rights & Regulations
right (n), obligation, regulation, compliance, comply, violate, violation, penalty, fine (n),
license, permit (n), certificate, authority, jurisdiction, statute, amendment, human rights,
civil rights, discrimination, harassment

### Everyday Legal & Official Situations
property, tenant, landlord, lease, deposit, eviction, dispute, claim, insurance policy, policy
(insurance), premium, coverage, accident report, liability, negligence, complaint, file a
complaint, appeal, deadline, notarised copy, power of attorney, will (n — testament), estate,
inheritance

### Employment Law (basic)
employment contract, notice period, dismissal, unfair dismissal, resign, redundancy, minimum
wage, working hours, overtime, leave (n — holiday), sick leave, maternity/paternity leave,
discrimination, harassment, grievance, union, workplace rights

## PART 5 — ACADEMIC ENGLISH (UNIVERSITY) TRACK (B1 add-on)

### Study Skills & Academic Writing (entry-level)
essay, thesis, dissertation, argument (academic), paragraph, introduction, conclusion, body
(of essay), outline, draft, structure (n), coherent, coherence, evidence, source, cite, citation,
reference list, bibliography, plagiarism, paraphrase, summarise, summary, quote (v/n), footnote,
academic writing, formal language, objective (adj), subjective

### Research Process (entry-level)
research question, literature, literature review, methodology, method, data collection,
qualitative, quantitative, survey, interview (n — research), case study, sample, participant,
analysis, findings, results, limitation, further research, peer review, academic journal, database
(research), search engine (academic)

### University Life & Administration
enrolment, enrol, register (v — for a course), registration, admission, application, entry
requirement, prerequisite, module, credit (academic), transcript, GPA, semester, term, academic
year, exchange programme, scholarship, funding, student loan, campus, faculty, department,
supervisor, advisor

### Presentations & Discussion (academic)
presentation, slide, visual aid, argument, counterargument, debate, discuss, point of view,
evidence, support an argument, critique, critical thinking, analyse, evaluate, compare, contrast,
Q&A session, feedback

### Exams, Degrees & Progression
undergraduate, postgraduate, bachelor's degree, master's degree, doctorate/PhD, thesis defence,
viva, graduate (v/n), graduation ceremony, academic transcript, distinction, honours, pass
(degree classification), fail, resit, extension (deadline), plagiarism check
`,
  B2: `
## PART 1 — GENERAL PROFESSIONAL CORE (B2)

### 1. Abstract Thinking & Argumentation
concept, notion, perspective, assumption, assume, presume, implication, imply, infer,
interpretation, interpret, justify, justification, validity, valid, invalid, logic, logical,
rational, irrational, coherent, consistent, inconsistency, contradiction, contradict, paradox,
ambiguous, ambiguity, nuance, subtle, subtlety, underlying, fundamental, inherent, arbitrary,
objective, subjective, bias, biased, prejudice, stereotype, generalisation, generalise

### 2. Analysis & Evaluation
analyse, analysis, assess, assessment, evaluate, evaluation, examine, investigate,
investigation, critique, criticise, constructive criticism, weigh up, prioritise, priority,
significance, significant, insignificant, relevance, relevant, irrelevant, factor, aspect,
element, component, criteria, framework, structure, mechanism, correlation, causation,
consequence, outcome, implication

### 3. Personality, Attitudes & Behaviour (advanced)
outlook, mindset, attitude, disposition, temperament, resilient, resilience, adaptable,
adaptability, assertive, diplomatic, tactful, tactless, perceptive, intuitive, pragmatic,
idealistic, cynical, sceptical, open-minded, narrow-minded, judgmental, empathetic, empathy,
compassionate, considerate, inconsiderate, conscientious, meticulous, versatile, resourceful,
proactive, initiative

### 4. Society, Culture & Identity
identity, cultural identity, heritage, ethnicity, ethnic, integration, integrate, assimilate,
multicultural, diversity, inclusive, inclusion, exclusion, marginalised, minority, majority,
demographic, generation gap, social norm, taboo, stigma, stereotype, prejudice, tolerance,
tolerant, intolerant, acceptance, belonging, isolation, isolated, alienation, community
cohesion

### 5. Health & Wellbeing (advanced)
wellbeing, mental health, psychological, therapy, therapist, counselling, counsellor, anxiety,
depression, burnout, trauma, chronic (illness), condition (medical), diagnosis, diagnose,
prognosis, symptom, remedy, alternative medicine, holistic, addiction, addictive, rehabilitation,
immune system, immunity, epidemic, pandemic, outbreak, vaccine, vaccination, public health

### 6. Environment & Sustainability (advanced)
sustainability, sustainable, carbon footprint, emissions, greenhouse gas, biodiversity,
ecosystem, conservation, conserve, deforestation, renewable energy, fossil fuel, sustainable
development, eco-friendly, footprint, offset (carbon), circular economy, depletion, deplete,
resource management, ecological, ecology, environmental impact, climate crisis, mitigation,
adaptation (climate)

### 7. Media, Communication & Persuasion
persuasive, rhetoric, propaganda, manipulate, manipulation, credible, credibility, reliable
source, misleading, misinformation, disinformation, fake news, censorship, censor, freedom of
speech, public opinion, mainstream media, tabloid, broadsheet, headline, coverage (media),
sensationalist, objective reporting, editorial, columnist, correspondent

### 8. Business & Management (advanced)
management, strategic, strategy, leadership, executive, stakeholder, shareholder, board of
directors, CEO, merger, acquisition, restructuring, downsizing, outsourcing, subsidiary,
turnover, revenue, margin, overhead, cash flow, forecast (business), projection, viable,
viability, sustainability (business), entrepreneur, entrepreneurial, start-up, venture capital,
competitive advantage, market share, niche, monopoly, supply chain, logistics, procurement,
compliance, corporate governance, ethics (business), transparency, accountability

### 9. Economics & Finance (advanced)
economy, economic growth, recession, inflation, deflation, GDP, fiscal policy, monetary policy,
interest rate, exchange rate, stock market, shares, dividend, bond (finance), asset, liability,
equity, capital, subsidy, tariff, trade deficit, national debt, austerity, disposable income,
consumer spending, purchasing power, cost-effective, cost-efficient

### 10. Technology & Innovation (advanced)
innovation, innovative, disruptive technology, breakthrough, cutting-edge, state-of-the-art,
prototype, patent, intellectual property, automation, digitalisation, digital transformation,
infrastructure, scalability, scalable, integration (tech), implementation, implement,
functionality, compatibility, obsolete, upgrade, deploy, streamline

### 11. Global Issues & Politics (advanced)
globalisation, geopolitics, diplomacy, diplomatic, treaty, sanctions, negotiation, alliance,
sovereignty, autonomy, referendum, coalition, ideology, ideological, regime, authoritarian,
democratic, civil liberties, human rights violation, activism, activist, lobbying, policy
reform, legislation, bureaucracy, bureaucratic

### 12. Workplace & Professional Skills (advanced)
delegate, delegation, mentor, mentorship, appraisal, performance review, KPI, accountability,
work-life balance, burnout, flexible working, remote work, hybrid working, soft skills,
interpersonal skills, negotiation skills, conflict resolution, constructive feedback,
professional development, networking, upskilling, redeployment, succession planning

### 13. Describing Trends, Data & Statistics
statistics, statistical, percentage, proportion, ratio, correlation, trend, fluctuate,
fluctuation, plateau, surge, spike, slump, steady, steadily, marginal, substantial,
considerable, exponential, incremental, projected, estimate, estimated, approximate, on
average, overall, a significant proportion, a marginal increase

### 14. Advanced Verbs (general)
acknowledge, address (an issue), advocate, allocate, anticipate, appreciate, approach (a
problem), assert, attain, attribute (to), challenge (v), clarify, comply, conclude, confront,
contradict, contribute, convey, cope, counteract, demonstrate, derive, determine, differentiate,
diminish, disclose, disregard, distinguish, emerge, emphasise, enable, encounter, enhance,
envisage, exceed, exploit, facilitate, foresee, formulate, generate, highlight, hinder, identify,
illustrate, incorporate, indicate, inhibit, initiate, integrate, interact, maintain, minimise,
mitigate, modify, monitor, negotiate, neglect, obtain, outline, outweigh, overcome, perceive,
predict, prioritise, promote, propose, pursue, reinforce, reject, reveal, sustain, tackle,
transform, undermine, undertake, utilise, validate

### 15. Advanced Adjectives
adequate, ambiguous, arbitrary, comprehensive, controversial, credible, crucial, deliberate,
demanding, distinctive, dominant, drastic, feasible, inevitable, intense, legitimate,
manageable, marginal, notable, notorious, persistent, prevalent, profound, prominent,
questionable, remarkable, resilient, rigorous, robust, subtle, substantial, sufficient,
tentative, thorough, unprecedented, versatile, viable, vulnerable

### 16. Advanced Adverbs & Discourse Markers
arguably, consequently, correspondingly, crucially, essentially, inevitably, initially,
notably, presumably, remarkably, seemingly, significantly, simultaneously, subsequently,
undoubtedly, broadly speaking, in essence, in other words, in that respect, on balance,
paradoxically, strictly speaking, to some extent, with regard to, with reference to, whereas,
albeit, nevertheless, nonetheless, notwithstanding

### 17. Idioms & Collocations (B2)
weigh the pros and cons, strike a balance, bridge the gap, raise awareness, tackle an issue,
address a problem, draw a conclusion, reach a consensus, set a precedent, play a key role, have
a significant impact, take into account, give rise to, stem from, account for, in light of, in
the wake of, on the grounds that, for the sake of, at the expense of, come to terms with, get to
grips with, take for granted

## PART 2 — TEACHERS / PROFESSORS / SCIENTISTS TRACK (B2 add-on)

### Pedagogy & Curriculum Design
pedagogy, pedagogical, curriculum design, learning outcome, competency, competence-based
learning, scaffolding, differentiated instruction, formative assessment, summative assessment,
rubric, benchmark, standardised test, inclusive education, special educational needs (SEN),
individualised learning plan, blended learning, flipped classroom, experiential learning,
lifelong learning, professional development, continuing education, accreditation, accredit

### Research Methodology (advanced)
hypothesis, empirical, empirical evidence, qualitative research, quantitative research, mixed
methods, sample size, control group, variable (dependent/independent), correlation, causation,
statistical significance, peer review, replicate, replicability, validity, reliability
(research), bias (research), ethics committee, informed consent, longitudinal study, cross-
sectional study, meta-analysis, systematic review

### Scientific Disciplines & Concepts
theory, paradigm, hypothesis testing, model (scientific), simulation, phenomenon, mechanism,
catalyst, equilibrium, hypothesis, molecular, cellular, genome, genetic mutation, biodiversity,
ecosystem, thermodynamics, quantum, particle, algorithm (scientific), computation, empirical
data, anomaly, correlation coefficient, statistically significant

### Academic Publishing & Conferences
peer-reviewed journal, impact factor, manuscript, submission, revision, rejection, editor
(academic), reviewer, abstract (n), keynote speech, conference proceedings, poster session,
symposium, grant proposal, funding body, research grant, ethics approval, co-author,
collaboration, interdisciplinary

## PART 3 — IT SPECIALISTS TRACK (B2 add-on)

### Software Development (advanced)
algorithm, data structure, object-oriented programming, class (programming), inheritance,
polymorphism, API, endpoint, microservices, architecture (software), scalability, refactor,
technical debt, unit test, integration test, continuous integration, continuous deployment
(CI/CD), version control, merge, pull request, code review, legacy system, deprecated, open
source, proprietary software

### Infrastructure & Cloud
cloud infrastructure, virtualisation, container, orchestration, load balancing, redundancy,
fault tolerance, latency, throughput, uptime, downtime, disaster recovery, scalable
architecture, on-premises, hybrid cloud, edge computing, DevOps, provisioning

### Cybersecurity (advanced)
penetration testing, vulnerability assessment, exploit (n), zero-day, ransomware, social
engineering, brute force attack, denial-of-service (DoS), intrusion detection, encryption
algorithm, cryptography, compliance (data), GDPR, data governance, risk assessment, incident
response, threat intelligence, patch management

### Data Science & AI (advanced)
machine learning, deep learning, neural network, training data, dataset, model (AI), supervised
learning, unsupervised learning, natural language processing, computer vision, data pipeline,
data warehouse, ETL (extract, transform, load), big data, predictive analytics, data
visualisation, bias (algorithmic), automation, robotics, algorithmic decision-making

### Project & Product Management (IT)
agile methodology, scrum, sprint planning, backlog, stakeholder management, product roadmap,
minimum viable product (MVP), user story, technical specification, quality assurance (QA),
regression testing, release cycle, rollback, scope creep, cross-functional team

## PART 4 — LEGAL ENGLISH TRACK (B2 add-on)

### Court Procedure & Litigation
litigation, litigate, plaintiff, defendant, prosecution, defence (legal), cross-examination,
testimony, affidavit, subpoena, injunction, ruling, precedent, case law, appellate court,
Supreme Court, jurisdiction, statute of limitations, burden of proof, reasonable doubt,
mitigating circumstances, aggravating circumstances, sentencing, acquittal, conviction, appeal
(v/n), overturn (a verdict)

### Contract & Commercial Law (advanced)
breach of contract, force majeure, indemnity, indemnify, warranty, guarantee (legal), consideration
(contract), void, voidable, null and void, enforceable, unenforceable, arbitration, mediation,
alternative dispute resolution, non-disclosure agreement (NDA), intellectual property rights,
trademark, patent infringement, copyright, licensing agreement, due diligence, merger agreement,
liability clause, indemnification

### Corporate & Regulatory Law
compliance, regulatory framework, statutory requirement, corporate governance, fiduciary duty,
shareholder rights, insolvency, bankruptcy, liquidation, receivership, anti-trust law,
competition law, whistleblower, regulatory body, sanction (legal), enforcement, non-compliance

### Human Rights & Public Law
constitutional law, civil liberties, due process, discrimination case, class action, judicial
review, precedent-setting case, landmark ruling, tribunal, ombudsman, statutory rights, asylum
seeker, deportation, extradition, immigration tribunal

### Legal Drafting & Communication
draft (legal document), clause, provision, amendment, addendum, recital, whereas clause,
governing law, jurisdiction clause, boilerplate, plain language (legal writing), legal
terminology, legalese, counsel (n), retainer, billable hours

## PART 5 — ACADEMIC ENGLISH (UNIVERSITY) TRACK (B2 add-on)

### Academic Writing & Argumentation
thesis statement, argumentative essay, counterargument, rebuttal, claim (academic), premise,
evidence-based, substantiate, corroborate, refute, critical analysis, critical evaluation,
synthesis (academic writing), coherence, cohesion, academic register, hedging language,
tentative claim, overgeneralisation, logical fallacy, cite (properly), in-text citation,
reference list, plagiarism detection, academic integrity, paraphrasing technique

### Research Design & Methods
research design, methodology, research paradigm, epistemology, ontology, primary source,
secondary source, triangulation, generalisability, replicability, sampling method, random
sampling, purposive sampling, ethical considerations, ethics approval, informed consent,
literature gap, research gap, theoretical framework, conceptual framework

### Degree Progression & Assessment (advanced)
dissertation, thesis defence, viva voce, supervisory panel, external examiner, academic
misconduct, extenuating circumstances, mitigating circumstances, appeal (academic), resit,
deferral, academic probation, honours classification, distinction, GPA (grade point average),
transcript, accreditation, postgraduate research, doctoral candidate, PhD candidate

### University & Academic Life (advanced)
academia, academic career, tenure track, sabbatical, fellowship, postdoctoral researcher,
research assistant, teaching assistant, interdisciplinary studies, cross-disciplinary, faculty
senate, academic freedom, publish or perish, impact factor, citation index, h-index

### Presenting & Defending Research
oral defence, poster presentation, conference paper, keynote address, panel discussion,
Q&A session, peer feedback, constructive critique, respond to questions, defend a position,
substantiate a claim, anticipate counterarguments
`,
  C1: `
## PART 1 — GENERAL PROFESSIONAL CORE (C1)

### 1. Precision & Nuance in Argument
discern, discernment, differentiate, delineate, elucidate, corroborate, substantiate, refute,
rebut, concede, concession, qualify (a statement), caveat, nuanced, multifaceted, dichotomy,
paradox, juxtaposition, juxtapose, converge, convergence, diverge, divergence, dichotomous,
epistemological, ontological, conceptualise, conceptualisation, operationalise, reconcile
(ideas), reconciliation, disentangle, unpack (an idea), problematise, interrogate (an idea)

### 2. Critical & Evaluative Language
scrutinise, scrutiny, rigorous, rigour, empirical, anecdotal, spurious, tenuous, compelling,
persuasive force, unfounded, unsubstantiated, contentious, controversial, polarising,
polarised, contested, disputed, unequivocal, equivocal, unambiguous, categorical, sweeping
statement, oversimplification, reductive, reductionist, holistic approach, multidimensional

### 3. Advanced Society & Culture
sociocultural, sociopolitical, hegemony, hegemonic, dominant discourse, narrative (societal),
counter-narrative, collective identity, cultural capital, social mobility, socioeconomic
status, structural inequality, systemic, institutionalised, marginalisation, disenfranchised,
disenfranchisement, underrepresented, underrepresentation, intersectionality, cultural
relativism, ethnocentrism, xenophobia, assimilation policy, acculturation

### 4. Psychology & Cognition (advanced)
cognitive bias, confirmation bias, heuristic, subconscious, unconscious bias, introspection,
introspective, self-actualisation, resilience (psychological), coping mechanism, defence
mechanism, cognitive dissonance, groupthink, conditioning (psychological), reinforcement,
motivation (intrinsic/extrinsic), self-efficacy, emotional intelligence, neuroplasticity,
predisposition, temperament

### 5. Economics, Business & Governance (advanced)
macroeconomic, microeconomic, fiscal stimulus, quantitative easing, market volatility,
speculative, speculation, hedge (finance), diversify (investment), leverage (finance),
underwrite, underwriting, venture, due diligence, valuation, IPO (initial public offering),
private equity, conglomerate, oligopoly, cartel, protectionism, deregulation, regulatory
capture, corporate social responsibility, stakeholder capitalism, meritocracy, plutocracy,
kleptocracy, technocracy

### 6. Politics, Law & International Relations (advanced)
geopolitical tension, statecraft, multilateralism, unilateral action, bilateral agreement,
sovereign state, sovereignty dispute, soft power, hard power, deterrence, containment policy,
proxy conflict, non-proliferation, sanction regime, embargo, humanitarian intervention,
self-determination, secession, annexation, insurgency, counterinsurgency, civil disobedience,
grassroots movement, populism, populist rhetoric, authoritarianism, illiberal democracy

### 7. Science, Technology & Ethics (advanced)
bioethics, ethical dilemma, unintended consequence, precautionary principle, dual-use
technology, technological determinism, existential risk, disruptive innovation, technological
singularity, algorithmic bias, surveillance capitalism, data sovereignty, digital divide,
post-truth, epistemic bubble, echo chamber, cognitive overload, information asymmetry

### 8. Environment & Global Challenges (advanced)
anthropogenic, tipping point (climate), planetary boundary, carbon neutrality, net zero, climate
resilience, ecological footprint, environmental degradation, resource scarcity, overexploitation,
biodiversity loss, ecosystem collapse, sustainable transition, green transition, just transition,
climate justice, intergenerational equity, precautionary approach

### 9. Nuanced Description & Register
subtle, understated, overstated, hyperbolic, hyperbole, euphemism, euphemistic, connotation,
connotative, denotation, pejorative, derogatory, colloquial, vernacular, idiomatic, formal
register, informal register, tone (writing), rhetorical device, loaded language, dog-whistle,
figurative language, literal interpretation

### 10. Advanced Verbs
accentuate, alleviate, ameliorate, articulate (v), assert, circumvent, conflate, consolidate,
constitute, contravene, counteract, delineate, deploy (a strategy), derive, differentiate,
disseminate, encapsulate, endorse, entail, epitomise, eradicate, exacerbate, expedite,
exemplify, exert, extrapolate, foster, galvanise, garner, grapple with, hinge on, impede,
incentivise, inculcate, instigate, jeopardise, juxtapose, leverage (v), manifest, mitigate,
mobilise, nullify, obscure (v), permeate, perpetuate, precipitate, preclude, predicate (on),
proliferate, propagate, reconcile, redress, reiterate, relegate, safeguard, scrutinise, stem
from, stifle, subsume, transcend, undercut, underpin, underscore, warrant (v)

### 11. Advanced Adjectives
ambivalent, anomalous, arbitrary, cogent, contentious, contingent, deleterious, discernible,
disparate, elusive, endemic, entrenched, esoteric, exorbitant, formidable, indispensable,
inherent, insidious, intractable, intrinsic, meticulous, multifaceted, negligible, nuanced,
onerous, pervasive, plausible, prevalent, prolific, pronounced, rampant, rudimentary, spurious,
staggering, stark, superfluous, tacit, tangential, tangible, tenuous, unequivocal, unfettered,
unprecedented, untenable, vested (interest), viable, vindicated, volatile

### 12. Advanced Adverbs & Discourse Markers
admittedly, arguably, conceivably, conversely, correspondingly, decidedly, demonstrably,
fundamentally, implicitly, inadvertently, indisputably, invariably, markedly, ostensibly,
overwhelmingly, paradoxically, plausibly, predominantly, purportedly, retrospectively,
seemingly, tacitly, unwittingly, by the same token, in the same vein, insofar as, that being
said, this notwithstanding, to a lesser/greater extent, with this in mind

### 13. Idioms, Collocations & Register (C1)
a double-edged sword, a paradigm shift, a watershed moment, a vicious circle, strike a chord,
tip the balance, set the tone, gain traction, lose momentum, come to the fore, take root, hold
sway, run counter to, be at odds with, be in keeping with, bear the brunt of, walk a fine line,
tread carefully, leave much to be desired, raise the bar, level the playing field, move the
goalposts, muddy the waters, read between the lines

## PART 2 — TEACHERS / PROFESSORS / SCIENTISTS TRACK (C1 add-on)

### Advanced Pedagogy & Educational Theory
constructivism, constructivist approach, social constructivism, andragogy, metacognition,
metacognitive strategy, cognitive load theory, zone of proximal development, self-regulated
learning, formative feedback loop, criterion-referenced assessment, norm-referenced assessment,
psychometrics, educational attainment gap, pedagogical content knowledge, transformative
learning, experiential learning cycle, culturally responsive teaching, universal design for
learning (UDL)

### Advanced Research Methodology
epistemology, ontology, positivism, post-positivism, interpretivism, constructivist paradigm,
grounded theory, phenomenology, ethnography, action research, case study design, mixed-methods
design, triangulation, saturation (qualitative research), inter-rater reliability, construct
validity, external validity, internal validity, confounding variable, effect size, regression
analysis, confidence interval, p-value, statistical power, meta-synthesis

### Scientific Disciplines (advanced)
theoretical framework, paradigm shift, falsifiability, reproducibility crisis, systematic
review, meta-analysis, longitudinal cohort study, biomarker, pathogenesis, epidemiological,
biostatistics, computational modelling, in silico, in vitro, in vivo, gene expression,
epigenetics, quantum entanglement, thermodynamic equilibrium, catalytic reaction, isotopic
analysis

### Academic Leadership & Publishing
tenure review, research impact, altmetrics, grant application, funding cycle, principal
investigator, co-investigator, research ethics board, institutional review board (IRB),
academic misconduct, retraction, replication study, open access publishing, preprint,
interdisciplinary collaboration, knowledge transfer, public engagement (research), impact
statement

## PART 3 — IT SPECIALISTS TRACK (C1 add-on)

### Software Architecture & Engineering (advanced)
distributed systems, event-driven architecture, service-oriented architecture (SOA), domain-
driven design, dependency injection, design pattern, technical debt remediation, idempotency,
concurrency, parallelism, asynchronous processing, race condition, deadlock, garbage collection,
memory leak, code smell, static analysis, code coverage, chaos engineering, observability,
instrumentation

### Cloud, DevOps & Platform Engineering (advanced)
infrastructure as code, immutable infrastructure, container orchestration, service mesh,
Kubernetes cluster, autoscaling, blue-green deployment, canary release, site reliability
engineering (SRE), incident postmortem, error budget, service level agreement (SLA), service
level objective (SLO), multi-tenancy, cost optimisation (cloud), vendor lock-in

### Cybersecurity & Governance (advanced)
threat modelling, attack surface, defence in depth, zero-trust architecture, lateral movement
(attack), advanced persistent threat (APT), security posture, compliance audit, data residency,
GDPR compliance, ISO 27001, penetration test report, red team, blue team, incident response
plan, forensic analysis, chain of custody (digital)

### Data Science, AI & Machine Learning (advanced)
feature engineering, overfitting, underfitting, hyperparameter tuning, gradient descent, loss
function, backpropagation, convolutional neural network, transformer architecture, reinforcement
learning, generative model, explainable AI, model drift, data lineage, data governance
framework, ethical AI, algorithmic accountability, synthetic data

### Product & Engineering Leadership (IT)
technical roadmap, engineering velocity, cross-functional alignment, technical mentorship,
architecture review board, build-vs-buy decision, total cost of ownership (TCO), platform
strategy, developer experience (DX), API-first strategy

## PART 4 — LEGAL ENGLISH TRACK (C1 add-on)

### Advanced Litigation & Procedure
interlocutory injunction, summary judgment, discovery (legal process), deposition, expert
witness testimony, cross-jurisdictional dispute, class action lawsuit, tort (n), tortious
liability, negligence per se, strict liability, vicarious liability, res judicata, stare
decisis, obiter dictum, ratio decidendi, precedential value, en banc hearing, writ of habeas
corpus, injunctive relief, declaratory judgment

### Contract & Commercial Law (advanced)
indemnification clause, limitation of liability clause, force majeure clause, material breach,
anticipatory breach, specific performance, liquidated damages, consequential damages,
representations and warranties, conditions precedent, severability clause, entire agreement
clause, choice of law clause, arbitration clause, escrow arrangement, letter of intent,
memorandum of understanding, heads of terms

### Corporate, Regulatory & Compliance Law (advanced)
fiduciary responsibility, ultra vires, piercing the corporate veil, insider trading,
market manipulation, anti-money laundering (AML), know your customer (KYC), sanctions
compliance, data protection impact assessment, regulatory sandbox, cease and desist order,
consent decree, whistleblower protection, corporate criminal liability

### International & Human Rights Law (advanced)
international humanitarian law, jus cogens, customary international law, extraterritorial
jurisdiction, universal jurisdiction, war crimes tribunal, crimes against humanity, state
responsibility, diplomatic immunity, treaty ratification, non-refoulement, statelessness,
transitional justice

### Advanced Legal Drafting & Practice
plain-language drafting, contractual ambiguity, interpretive canon, contra proferentem,
boilerplate provision, conflict of laws, governing jurisdiction, litigation privilege,
attorney-client privilege, work product doctrine, billable hour structure, pro bono
representation

## PART 5 — ACADEMIC ENGLISH (UNIVERSITY) TRACK (C1 add-on)

### Advanced Academic Argumentation
thesis-driven argument, dialectic, dialectical reasoning, counter-hypothesis, epistemic
authority, discursive strategy, rhetorical positioning, meta-commentary, signposting language,
cohesive device, register shift, authorial stance, hedge/booster language, evidentiality,
intertextuality, situating one's argument, theoretical positioning, framing (academic)

### Advanced Research Design
research paradigm justification, ontological stance, epistemological stance, methodological
rigour, triangulated evidence, reflexivity (researcher), positionality, saturation point,
purposive sampling strategy, stratified sampling, longitudinal design, quasi-experimental
design, counterfactual reasoning, causal inference, confound, extraneous variable, construct
operationalisation

### Doctoral & Postdoctoral Academia
doctoral thesis, candidacy examination, comprehensive exam, dissertation committee, external
examiner report, viva voce examination, minor/major corrections, postdoctoral fellowship,
early career researcher, research trajectory, academic pipeline, publish-or-perish culture,
citation metrics, h-index, journal impact factor, predatory journal, academic gatekeeping

### Scholarly Communication & Publishing
manuscript revision, reviewer comments, desk rejection, revise and resubmit, blind peer review,
double-blind review, editorial board, special issue, monograph, edited volume, book chapter,
conference proceedings, grey literature, preprint server, open science, research reproducibility

### Institutional & Policy Context
higher education policy, academic freedom debate, institutional autonomy, research funding
landscape, impact case study, knowledge exchange, public engagement strategy, widening
participation, academic governance, quality assurance framework (HE)
`,
  C2: `
## PART 1 — GENERAL PROFESSIONAL CORE (C2)

### 1. Precision, Nuance & Rhetorical Mastery
sagacity, perspicacity, acuity, incisive, trenchant, cogency, exegesis, hermeneutics,
dialectical, syllogism, non sequitur, red herring, straw man (argument), circular reasoning,
false dichotomy, slippery slope, equivocation, sophistry, sophistic, rhetorical flourish,
elliptical (style), laconic, verbose, prolix, circumlocution, periphrasis, litotes, understatement
(rhetorical), overstatement, tautology, pleonasm, anaphora (rhetoric), antithesis (rhetoric)

### 2. Abstract & Philosophical Concepts
epistemic, teleological, deontological, utilitarian calculus, existential, phenomenological,
metaphysical, ontological status, a priori, a posteriori, tabula rasa, determinism, free will
debate, moral relativism, moral absolutism, ethical pluralism, praxis, dialectic (philosophical),
first principles, reductio ad absurdum, thought experiment, counterfactual reasoning (advanced)

### 3. Society, Power & Discourse (mastery level)
hegemonic discourse, subaltern, epistemic injustice, structural violence, symbolic violence,
cultural hegemony, false consciousness, panopticon (metaphor), biopolitics, governmentality,
neoliberalism, neocolonialism, postcolonial critique, identity politics, culture wars, moral
panic, othering, performativity, social construct, lived experience, standpoint theory

### 4. Advanced Cognition, Ethics & Judgement
moral hazard, cognitive dissonance (advanced use), confirmation bias (advanced use),
groupthink (advanced use), epistemic humility, intellectual honesty, good faith/bad faith,
supererogatory, culpability, mens rea (general use), moral culpability, complicity, tacit
approval, plausible deniability, whataboutism, gaslighting, scapegoating

### 5. Economic, Political & Global Mastery Vocabulary
stagflation, hyperinflation, sovereign debt crisis, systemic risk, contagion (financial),
moral hazard (finance), rent-seeking, regulatory arbitrage, race to the bottom, beggar-thy-
neighbour policy, zero-sum game, prisoner's dilemma, tragedy of the commons, free-rider
problem, path dependency, black swan event, gray rhino event, punctuated equilibrium (policy),
Overton window, wedge issue

### 6. Advanced Style, Tone & Register
mellifluous, sonorous, evocative, vivid (style), understated elegance, wry, acerbic, caustic,
scathing, mordant, deadpan, tongue-in-cheek, self-deprecating, bathetic, maudlin, saccharine,
turgid, stilted, pedestrian (writing), lucid (writing), lapidary (style), incisive prose,
economical (writing style)

### 7. Advanced Verbs
adjudicate, ameliorate (advanced use), anneal (metaphorical), assuage, avert, capitulate,
castigate, circumscribe, coalesce, conflate (advanced use), connote, countenance, decry,
denigrate, disabuse, dispel, eschew, exculpate, exonerate, extol, foment, foreground,
gainsay, impugn, inveigh against, mollify, obfuscate, obviate, palliate, placate, portend,
posit, prevaricate, proscribe, reify, repudiate, rescind, subjugate, subsume (advanced use),
supplant, temper (v), traduce, vilify, vitiate

### 8. Advanced Adjectives
anodyne, apocryphal, apposite, avant-garde, cavalier, deleterious (advanced use), didactic,
disingenuous, ephemeral, equivocal (advanced use), esoteric (advanced use), fastidious,
fatuous, halcyon, ineffable, inimitable, insular, intransigent, inveterate, myopic
(figurative), nebulous, obsequious, obstreperous, opaque (figurative), parochial,
peripatetic, perfunctory, pernicious, precocious, pretentious, prosaic, quixotic, recalcitrant,
sanguine, self-effacing, solipsistic, specious, surreptitious, tenable, ubiquitous,
unassailable, unimpeachable, vacuous, vitriolic

### 9. Advanced Adverbs & Connective Devices
albeit (advanced use), concomitantly, contra, ex ante, ex post, in extremis, in lieu of, in
principle, inter alia, ipso facto, mutatis mutandis, ostensibly (advanced use), per se, prima
facie, pro forma, pro rata, quintessentially, unassailably, vis-à-vis, by dint of, in the final
analysis, on closer inspection, taken together, when all is said and done

### 10. Latin, Classical & Formal Expressions in Professional English
ad hoc, bona fide, caveat emptor, de facto, de jure, ergo, et al., ex officio, modus operandi,
modus vivendi, non sequitur, per capita, per se, quid pro quo, status quo, sui generis, verbatim,
vice versa, raison d'être, fait accompli, tour de force, laissez-faire

### 11. Advanced Idioms, Collocations & Professional Set Phrases
move the needle, draw a line in the sand, throw down the gauntlet, an elephant in the room, a
storm in a teacup, a Pyrrhic victory, a Trojan horse (metaphor), the tip of the iceberg, a
Gordian knot, a house of cards, thread the needle, kick the can down the road, swim against the
tide, hold water (argument), stand to reason, be predicated on, be contingent upon, run the
gamut, cast a wide net, take stock of, come full circle

## PART 2 — TEACHERS / PROFESSORS / SCIENTISTS TRACK (C2 add-on)

### Advanced Educational Theory & Philosophy
critical pedagogy, banking model of education (Freire), emancipatory education, habitus
(Bourdieu), cultural reproduction, social reproduction theory, epistemic access, decolonising
the curriculum, andragogical praxis, transformative learning theory, communities of practice,
situated cognition, distributed cognition, cognitive apprenticeship

### Advanced Research & Statistics
Bayesian inference, frequentist statistics, structural equation modelling, multivariate
analysis, factor analysis, hierarchical linear modelling, propensity score matching,
instrumental variable, endogeneity, heteroscedasticity, autocorrelation, epistemological
pluralism, methodological triangulation, reflexive positionality, researcher subjectivity,
paradigmatic incommensurability

### Frontier Science & Theoretical Concepts
emergent property, self-organisation (systems theory), complex adaptive system, non-linear
dynamics, chaos theory, stochastic process, heuristic algorithm (scientific), falsification
criterion, incommensurability (Kuhn), scientific consensus formation, replication crisis
(advanced discourse), publication bias, p-hacking, preregistration (research)

### Academic Eminence & Discourse
eminent scholar, seminal work, magnum opus, canonical text, paradigmatic study, festschrift,
emeritus professor, distinguished chair, endowed professorship, scholarly lineage,
intellectual genealogy, disciplinary boundary work

## PART 3 — IT SPECIALISTS TRACK (C2 add-on)

### Advanced Systems & Theoretical Computing
Turing completeness, computational complexity, NP-hard problem, combinatorial explosion,
formal verification, type theory, category theory (computing), lambda calculus, denotational
semantics, Byzantine fault tolerance, consensus algorithm, eventual consistency, CAP theorem,
distributed ledger

### AI Governance & Frontier Concerns
alignment problem, existential risk (AI), superintelligence, emergent capability, model
interpretability, black-box model, algorithmic transparency, AI governance framework,
responsible AI, human-in-the-loop, adversarial example, model hallucination, foundation model,
generative adversarial network, reinforcement learning from human feedback (RLHF)

### Enterprise & Strategic Technology Leadership
digital sovereignty, technology stack rationalisation, enterprise architecture, technical
governance, platform economics, network effects, technological lock-in, disruptive market
entrant, innovation ecosystem, deep tech, moonshot project, technology diffusion curve

### Advanced Security & Risk Discourse
nation-state actor, cyber warfare, critical infrastructure resilience, supply chain attack,
security by design, privacy by design, threat actor attribution, cyber deterrence,
information warfare, digital forensics chain of evidence

## PART 4 — LEGAL ENGLISH TRACK (C2 add-on)

### Jurisprudence & Legal Theory
legal positivism, natural law theory, legal realism, critical legal studies, originalism,
purposive interpretation, textualism, doctrine of precedent, ratio decidendi (advanced use),
persuasive authority, binding authority, comity (international law), jus cogens (advanced use),
lex specialis, pacta sunt servanda, ultra vires (advanced use)

### Advanced Commercial & Financial Law
fiduciary breach, derivative action, oppression remedy, shareholder derivative suit, schemes of
arrangement, pre-pack administration, cross-border insolvency, choice-of-forum clause, most-
favoured-nation clause, anti-assignment clause, change of control provision, drag-along/tag-
along rights, earn-out provision

### Advanced Public & Constitutional Law
separation of powers doctrine, checks and balances, judicial activism, judicial restraint,
constitutional supremacy, entrenched rights, derogation (human rights), margin of appreciation,
proportionality test, rational basis review, strict scrutiny, void for vagueness doctrine

### Elite Legal Practice & Advocacy
silk/King's Counsel, pupillage, articled clerk, chambers (barristers'), oral advocacy, closing
argument, persuasive brief, amicus curiae brief, moot court, landmark precedent, dissenting
opinion, concurring opinion, plurality opinion

## PART 5 — ACADEMIC ENGLISH (UNIVERSITY) TRACK (C2 add-on)

### Mastery-Level Academic Argumentation
epistemic warrant, discursive formation (Foucault), genealogical method, deconstruction
(Derrida), hermeneutic circle, close reading, textual criticism, historiography,
metahistorical, intertextual analysis, semiotic analysis, structuralist reading,
post-structuralist critique, auto-ethnography, reflexive methodology

### Advanced Doctoral & Scholarly Practice
original contribution to knowledge, novel theoretical contribution, scholarly apparatus,
critical apparatus, paratext, palimpsest (metaphor in scholarship), canon formation,
disciplinary gatekeeping, epistemic community, invisible college, scholarly network,
citation cartel (critical term), predatory publishing practices

### Elite Academic Career & Institutional Discourse
chaired professorship, distinguished visiting scholar, festschrift (advanced), academic
lineage, doctoral genealogy, research excellence framework, league table methodology
(critical), academic capitalism, corporatisation of higher education, massification of
higher education, credential inflation

### Nuanced Scholarly Communication
epistemic modesty, scholarly caveat, methodological transparency, reflexive acknowledgment of
limitation, situating oneself within the literature, theoretical eclecticism, interpretive
license, scholarly dialogue, contested terrain (academic debate)
`
};

function cleanItem(raw) {
  let item = raw.trim();
  if (!item) return [];

  // Remove trailing period or semicolon
  item = item.replace(/[.;]+$/, '').trim();

  // Strip parenthetical glosses e.g. (n), (v), (adj), (months, generic), (Freire), etc.
  item = item.replace(/\s*\([^)]*\)/g, '').trim();

  if (!item) return [];

  let variants = [];
  if (item.includes('/') && !item.includes(' ')) {
    const parts = item.split('/');
    for (const p of parts) {
      if (p.trim()) variants.push(p.trim());
    }
  } else if (item.includes('/') && item.split('/').every(part => part.trim().split(' ').length <= 3)) {
    const parts = item.split('/');
    for (const p of parts) {
      if (p.trim()) variants.push(p.trim());
    }
  } else {
    variants.push(item);
  }

  return variants;
}

function parseDocument(docText) {
  const lines = docText.split('\n');
  let currentPart = null;
  const sections = {
    part1: [],
    'teachers-scientists': [],
    'it-specialists': [],
    'legal-english': [],
    'academic-english': []
  };

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.includes('PART 1')) {
      currentPart = 'part1';
      continue;
    } else if (line.includes('PART 2') || line.includes('TEACHERS')) {
      currentPart = 'teachers-scientists';
      continue;
    } else if (line.includes('PART 3') || line.includes('IT SPECIALIST')) {
      currentPart = 'it-specialists';
      continue;
    } else if (line.includes('PART 4') || line.includes('LEGAL ENGLISH')) {
      currentPart = 'legal-english';
      continue;
    } else if (line.includes('PART 5') || line.includes('ACADEMIC ENGLISH')) {
      currentPart = 'academic-english';
      continue;
    }

    if (line.startsWith('#')) continue;
    if (!currentPart) continue;

    // Strip parenthetical glosses on the whole line BEFORE splitting by comma
    // so commas inside parentheses like (months, generic) do not split items
    const cleanedLine = line.replace(/\s*\([^)]*\)/g, '').trim();

    const rawItems = cleanedLine.split(',');
    for (const raw of rawItems) {
      const items = cleanItem(raw);
      for (const item of items) {
        if (item && !sections[currentPart].includes(item)) {
          sections[currentPart].push(item);
        }
      }
    }
  }

  return sections;
}

function updateDomain(existingDomain) {
  if (!existingDomain || existingDomain.trim() === '') {
    return "general, professional";
  }
  let parts = existingDomain.split(',').map(s => s.trim()).filter(Boolean);
  if (!parts.includes('professional')) {
    parts.push('professional');
  }
  if (parts.includes('general')) {
    parts = ['general', ...parts.filter(p => p !== 'general')];
  }
  return parts.join(', ');
}

function loadVocabFiles() {
  const rootDir = path.resolve(__dirname, '../vocabulary/en');
  const levelDirs = ['a2', 'b1', 'b2', 'c1', 'c2'];
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

function normalizeWord(w) {
  return w.toLowerCase().replace(/[-–—]/g, ' ').replace(/\s+/g, ' ').trim();
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

  const parsedByLevel = {};
  for (const [level, text] of Object.entries(sourceDocs)) {
    parsedByLevel[level] = parseDocument(text);
  }

  const taggedByTrackAndLevel = {
    part1: { A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
    'teachers-scientists': { A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
    'it-specialists': { A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
    'legal-english': { A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
    'academic-english': { A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }
  };

  const levelMismatches = [];
  const deferredList = {
    part1: { A2: [], B1: [], B2: [], C1: [], C2: [] },
    'teachers-scientists': { A2: [], B1: [], B2: [], C1: [], C2: [] },
    'it-specialists': { A2: [], B1: [], B2: [], C1: [], C2: [] },
    'legal-english': { A2: [], B1: [], B2: [], C1: [], C2: [] },
    'academic-english': { A2: [], B1: [], B2: [], C1: [], C2: [] }
  };

  const modifiedFiles = new Set();
  const taggedEntryIds = new Set();

  for (const [sourceLevel, sections] of Object.entries(parsedByLevel)) {
    for (const [sectionKey, items] of Object.entries(sections)) {
      for (const item of items) {
        const normItem = normalizeWord(item);
        let matches = entryMap.get(normItem);

        if (!matches && normItem.endsWith('s')) {
          matches = entryMap.get(normItem.slice(0, -1));
        }

        if (matches && matches.length > 0) {
          for (const { entry, filePath } of matches) {
            const newDomain = updateDomain(entry.domain);
            if (entry.domain !== newDomain) {
              entry.domain = newDomain;
              modifiedFiles.add(filePath);
            }

            if (sectionKey !== 'part1') {
              if (entry.sub_theme !== sectionKey) {
                entry.sub_theme = sectionKey;
                modifiedFiles.add(filePath);
              }
            }

            const trackingKey = `${entry.id}:${sectionKey}:${sourceLevel}`;
            if (!taggedEntryIds.has(trackingKey)) {
              taggedEntryIds.add(trackingKey);
              const targetLevel = entry.level || 'A2';
              taggedByTrackAndLevel[sectionKey][targetLevel] = (taggedByTrackAndLevel[sectionKey][targetLevel] || 0) + 1;

              if (entry.level && entry.level.toUpperCase() !== sourceLevel.toUpperCase()) {
                levelMismatches.push({
                  word: item,
                  entryId: entry.id,
                  sourceLevel,
                  existingLevel: entry.level,
                  sectionKey
                });
              }
            }
          }
        } else {
          deferredList[sectionKey][sourceLevel].push(item);
        }
      }
    }
  }

  if (applyChanges) {
    for (const filePath of modifiedFiles) {
      fs.writeFileSync(filePath, JSON.stringify(fileData[filePath], null, 2) + '\n', 'utf8');
    }
    console.log(`Updated ${modifiedFiles.size} JSON files.`);
  }

  return {
    taggedByTrackAndLevel,
    levelMismatches,
    deferredList,
    modifiedFilesCount: modifiedFiles.size
  };
}

if (require.main === module) {
  const applyFlag = process.argv.includes('--apply');
  console.log(applyFlag ? 'Applying changes...' : 'Running dry run...');
  const res = processTagging(applyFlag);

  console.log('\n--- TAGGING SUMMARY BY TRACK & LEVEL (Entry CEFR Level) ---');
  console.table(res.taggedByTrackAndLevel);
  console.log(`Total Level Mismatches: ${res.levelMismatches.length}`);
  console.log(`Modified Files Count: ${res.modifiedFilesCount}`);

  const reportsDir = path.resolve(__dirname, '../reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  let reportMd = `# Professional Domain Tagging Summary Audit\n\n`;
  reportMd += `## 1. Counts of Tagged Entries by Track and CEFR Level\n\n`;
  reportMd += `| Section / Track | A2 | B1 | B2 | C1 | C2 | Total |\n`;
  reportMd += `| --- | --- | --- | --- | --- | --- | --- |\n`;

  for (const [track, levels] of Object.entries(res.taggedByTrackAndLevel)) {
    const total = Object.values(levels).reduce((a, b) => a + b, 0);
    reportMd += `| \`${track}\` | ${levels.A2} | ${levels.B1} | ${levels.B2} | ${levels.C1} | ${levels.C2} | **${total}** |\n`;
  }

  reportMd += `\n## 2. Level Mismatches (Source Level vs COSYdata Entry Level)\n\n`;
  reportMd += `Total Mismatches Recorded: ${res.levelMismatches.length}\n\n`;
  reportMd += `| Word | Entry ID | Source Level | Existing Level | Track |\n`;
  reportMd += `| --- | --- | --- | --- | --- |\n`;
  for (const m of res.levelMismatches.slice(0, 100)) {
    reportMd += `| ${m.word} | \`${m.entryId}\` | ${m.sourceLevel} | ${m.existingLevel} | \`${m.sectionKey}\` |\n`;
  }
  if (res.levelMismatches.length > 100) {
    reportMd += `\n*... and ${res.levelMismatches.length - 100} additional level mismatches.*\n`;
  }

  reportMd += `\n## 3. Part 1 & Tracks Words Not Found — Deferred to Phase 2\n\n`;
  for (const [sectionKey, levels] of Object.entries(res.deferredList)) {
    reportMd += `### Section / Track: \`${sectionKey}\`\n\n`;
    for (const [lvl, words] of Object.entries(levels)) {
      if (words.length > 0) {
        reportMd += `#### CEFR Level ${lvl} (${words.length} deferred words)\n`;
        reportMd += words.map(w => `- ${w}`).join('\n') + '\n\n';
      }
    }
  }

  fs.writeFileSync(path.join(reportsDir, 'professional_tagging_summary.md'), reportMd, 'utf8');
  console.log(`Report written to reports/professional_tagging_summary.md`);
}

module.exports = {
  processTagging,
  sourceDocs
};
