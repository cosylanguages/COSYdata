const fs = require('fs');
const path = require('path');

const TODAY = "2025-01-15";

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const rawList = `above all, accessibility, accomplish, accurate, achieve, adequate, adjust plans, adjust to a new school, adjustment, admission, after-school program, aging in place, aim, air quality, allergic reaction, allowance, anniversary, annual leave, antivirus, anxiety disorder, apart from, apology, application deadline, apply for citizenship, approve, arrange, as a result of, as well as, assimilate, assisted living facility, authorities, aware, bachelor's degree, background check, bedtime routine, belong, beneficiary, benefits package, bike lane, birthday party, body language, bonus, border control, bother, breakdown, budget planning, bug, bullying, calculate, cancellation, capable, career counseling, career development, career interest, caregiver support, carpool, cautious, certification, childcare, chronic condition management, city council, civic engagement, clarification, clause, clearance sale, co-parenting, college application, combine, comfortable with, committed, communicate effectively, community center, community involvement, community program for seniors, commute time, companionship, comparison, compensation, complaint procedure, complete, compliance, compliment, comply, configuration, connecting flight, consumer rights, contact, copay, cope, counselor, courier, coursework, cover letter, coverage, crash, create, credential evaluation, credit history, credit score, cultural adjustment, cultural event, curfew, curiosity, currency exchange, current account, customs fee, cyberbullying, cyclist, daycare, deductible, deduction, defective, definite, deliver, depend, direct debit, discount code, discuss, dismissal, dissatisfied, distant relative, divide, donation, down payment, driving test, due to the fact that, duty-free, electrical wiring, eligibility, eligible, emergency room, employment contract, english as a second language, enroll, enrollment, ensure, entitled, entitlement, entrance exam, equivalent qualification, esl, estate agency, estate planning, etiquette, exam stress, examine, except for, exchange policy, exemption, exist, expand, expect, expectation, expiration, expire, express yourself, extend, extension, extracurricular activities, extracurricular activity, extreme weather, eye contact, factory reset, fair, fall out, familiar, family responsibilities, fascinated, faulty, financial advisor, financial aid, financial statement, fired, firewall, fit in, flexibility, focus, follow up, follow-up appointment, force, forgiveness, fortunately, friend group, frustration, fundraiser, furnished, further education, future plans, gated community, gather, general practitioner, gesture, get along, government agency, gp, gpa, grade point average, gratitude, guilt, handle, harassment, headhunter, health insurance plan, healthcare proxy, helpline, hesitate, home care, homeowners association, homework routine, hotline, household budget, identify, identity theft, identity verification, idiom, ignore, immediate, immigration status, immunization record, import tax, impressed, impression, in fact, in general, in spite of, in-home care, include, income tax, inconvenience, indicate, individualized education plan, inspection, inspiring, installment, installment plan, instead of, insulation, insurance policy, intend, intention, invalid, invite over, involve, it's been challenging, job market, job opening, job vacancy, join, join a club, joint account, keep going, lack, language support, lay off, layaway, learn from mistakes, learner's permit, learning difficulty, legal aid, legal document, legal guardian, life insurance, littering, loan application, local council, long-term, long-term care insurance, loyal, loyalty program, mainly, maintain, maintenance, make new friends, manage, mandatory subject, maternity leave, medical history, milestone event, mind, miss my old friends, mobility aid, monthly payment, mortgage rate, mostly, mother tongue, municipality, mutual, native speaker, negative, neighborhood safety, neighborhood watch, networking event, news article, noise complaint, nonprofit organization, notarize, notary, nursing home, obligation, obtain, occur, ombudsman, on one hand, online marketplace, online privacy, operate, optional, organize, outstanding, overdraft, parcel, parent-teacher meeting, parental leave, parenting, parking fine, part-time job, participate, particularly, paternity leave, pay raise, penalty, pension plan, pension transfer, permanent residency, permit, persistent, personal data, personal development, pest control, phishing, phrase, physical therapy, place of worship, plan ahead, playdate, plumbing, point of view, positive, potential, potluck, power of attorney, pre-existing condition, precipitation, precise, premium, prepare, prescription management, prescription refill, prevent, previous, pride, probation period, produce, professional certification transfer, professional network, progress report, proof of purchase, property value, prove, provide, psychiatrist, psychologist, public holiday, public transportation, purchase, pursue, real estate agent, recall, recommendation, recruiter, refer, reference, referral, refund policy, regard, reject, relate, relevant, religious community, relocation package, remarkable, remittance, remove, renew, renewal, renovation, repair shop, repairs, rephrase, replace, replacement, report card, represent, require, resident, resignation, resolution, responsibilities, restart, restore, retirement community, retirement fund, retraining, return policy, reveal, ride-sharing, roadside assistance, rush hour, satisfaction, scam, school subjects i like, screening, second language, second opinion, second-hand, security deposit, seem, select, self-employment, senior discount, sense of belonging, separate, settle, settle in, settling-in allowance, shame, shipping, shocking, short-term, social isolation, social media platform, social media presence, social network, social norm, source, special education, specialist, speeding, spread, spreadsheet, standing order, start a business, statement, staying connected, struggle, student loan, sublet, submission, submit, subscription service, succeed, suffer, suggestion, support each other, support group, support network, support system, surprisingly, survive, sustain, tax refund, tax return, taxable income, team sport, technical support, telecommute, temporary, temporary residency, tenancy agreement, tend, terms and conditions, terms of employment, terms of service, thank you for your patience, that is to say, thorough, threaten, thrift store, to conclude, toll, town hall meeting, tracking number, traffic violation, transaction, transcript, translation service, treat, tuition fee, tutoring, two-factor authentication, unaware, unfamiliar, unfortunately, unfurnished, union, university application, urgent care, used to, utility bills included, vehicle registration, ventilation, volunteer work, volunteering, walk-in clinic, warranty period, wear and tear, wellness, willing, wire transfer, wonder, work environment, work experience, workaround, workers' rights, working hours, worthwhile`;

const terms = rawList.split(',').map(s => s.trim()).filter(Boolean);
console.log(`Loaded ${terms.length} terms from list.`);

const index = JSON.parse(fs.readFileSync('vocabulary/en/index.json', 'utf8'));

let updatedExistingCount = 0;
const modifiedFiles = new Set();

for (const term of terms) {
  const slug = slugify(term);
  const matchingKeys = Object.keys(index).filter(k => k.split(':')[1] === slug);

  for (const key of matchingKeys) {
    const relPath = index[key];
    const fullPath = path.join('vocabulary/en', relPath);

    if (fs.existsSync(fullPath)) {
      const fileData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      let changed = false;

      if (Array.isArray(fileData)) {
        for (const entry of fileData) {
          if (entry.id === key) {
            if (!entry.domain.includes('relocation')) {
              entry.domain = entry.domain ? `${entry.domain}, relocation` : 'relocation';
              changed = true;
              updatedExistingCount++;
            }
          }
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, JSON.stringify(fileData, null, 2) + '\n', 'utf8');
        modifiedFiles.add(relPath);
      }
    }
  }
}

console.log(`Updated domain in ${updatedExistingCount} existing entry/entries across ${modifiedFiles.size} file(s).`);
