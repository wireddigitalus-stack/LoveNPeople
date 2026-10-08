/**
 * LOVE'N'PEOPLE - Interactive Features & AI-Driven Tools
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.remove('translate-x-full');
    mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.add('translate-x-full');
    mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Initiatives Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const initiativeCards = document.querySelectorAll('.initiative-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-neutral-900', 'text-white', 'shadow-sm');
        b.classList.add('bg-neutral-100', 'text-neutral-700', 'hover:bg-neutral-200');
      });
      btn.classList.add('bg-neutral-900', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-neutral-100', 'text-neutral-700', 'hover:bg-neutral-200');

      const filter = btn.getAttribute('data-filter');

      initiativeCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });

  // =========================================================================
  // AI TOOL 1: "Love'N'Care Compass" - Community Intake & Resource Navigator
  // =========================================================================
  const compassInput = document.getElementById('compass-query');
  const compassSubmit = document.getElementById('compass-submit');
  const compassResults = document.getElementById('compass-results');
  const quickPills = document.querySelectorAll('.compass-pill');

  const loveNPeoplePrograms = [
    {
      id: 'christmas-angel',
      name: 'Christmas Angel Tree Program',
      states: 'TN & VA',
      categories: ['christmas', 'angel', 'kids', 'children', 'toys', 'gifts', 'coat', 'winter', 'holiday', 'family'],
      phone: '(423) 335-2955',
      phoneRaw: '4233352955',
      email: 'jazmin@lovenpeople.org',
      desc: 'Adopting hundreds of local children and families across Northeast TN and Southwest VA each holiday season with warm winter coats, shoes, essentials, and wrapped Christmas gifts.',
      requirements: ['Annual open nomination during Autumn/Winter', 'Families with children in the Tri-Cities area'],
      bestFor: 'Christmas holiday sponsorship, children\'s warm clothing, and youth toy drives.'
    },
    {
      id: 'break-lunch-box',
      name: 'Break Lunch Boxes (PreK-12 Nutrition)',
      states: 'TN & VA',
      categories: ['food', 'lunch', 'school', 'break', 'nutrition', 'kids', 'children', 'snack', 'meals', 'hungry', 'pantry'],
      phone: '(423) 335-2955',
      phoneRaw: '4233352955',
      email: 'jazmin@lovenpeople.org',
      desc: 'Ensuring Tri-Cities children have consistent wholesome nutrition when school is out on summer break, spring recess, and extended holidays.',
      requirements: ['Enrolled students PreK-12 in Northeast TN or Southwest VA'],
      bestFor: 'Wholesome breakfast, lunch, and snack packages during school closures.'
    },
    {
      id: 'veterans-care',
      name: 'Veterans Outreach & Care Packages',
      states: 'TN & VA',
      categories: ['veteran', 'veterans', 'military', 'soldiers', 'service', 'heroes', 'advocacy', 'holiday'],
      phone: '(423) 335-2955',
      phoneRaw: '4233352955',
      email: 'jazmin@lovenpeople.org',
      desc: 'Partnering with Veteran Affairs groups and local service posts to provide essential care items, holiday care packages, and warm companionship for regional veterans.',
      requirements: ['Honorably served veterans or military families in need of assistance'],
      bestFor: 'Support for regional military veterans and their immediate families.'
    },
    {
      id: 'hope-box',
      name: 'Hope Box Blessing Initiative',
      states: 'TN & VA',
      categories: ['hope', 'box', 'emergency', 'hygiene', 'pantry', 'canned', 'immediate', 'toiletries', 'relief'],
      phone: '(423) 335-2955',
      phoneRaw: '4233352955',
      email: 'jazmin@lovenpeople.org',
      desc: 'Community-accessible supply and blessing boxes stocked with non-perishable food, warm socks, and personal hygiene essentials accessible 24/7 without barriers.',
      requirements: ['Open to anyone in immediate need with dignity and zero paperwork'],
      bestFor: 'Immediate emergency toiletries, hygiene supplies, and shelf-stable food.'
    },
    {
      id: 'soldiers-child',
      name: 'A Soldier\'s Child Weekend Retreat',
      states: 'TN & VA',
      categories: ['soldier', 'retreat', 'camp', 'family', 'grief', 'healing', 'children', 'military'],
      phone: '(423) 335-2955',
      phoneRaw: '4233352955',
      email: 'jazmin@lovenpeople.org',
      desc: 'Dedicated weekend camp experiences and uplifting family retreats offering therapeutic support, outdoor adventures, and bonding for children of fallen military heroes.',
      requirements: ['Families of fallen or disabled military service personnel'],
      bestFor: 'Youth emotional support, outdoor retreats, and military family community.'
    },
    {
      id: 'market-showcase',
      name: 'Heart & Heritage Community Market',
      states: 'TN & VA',
      categories: ['event', 'market', 'vendor', 'shopping', 'community', 'craft', 'heritage', 'fundraiser'],
      phone: '(423) 335-2955',
      phoneRaw: '4233352955',
      email: 'jazmin@lovenpeople.org',
      desc: 'Our curated community vendor showcase in the Historic HP King Building in Bristol, featuring 35+ local makers, bakers, and small businesses supporting our charity mission.',
      requirements: ['Open community event with free admission'],
      bestFor: 'Family-friendly community shopping and vendor participation.'
    }
  ];

  function searchCompass(query) {
    if (!query || !query.trim()) return;
    const q = query.toLowerCase();

    // Show loading state
    compassResults.innerHTML = `
      <div class="p-6 text-center text-slate-500 flex flex-col items-center justify-center space-y-3">
        <div class="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-sm font-medium">Love'N'Care Compass is exploring community programs across Northeast TN & Southwest VA...</p>
      </div>
    `;
    compassResults.classList.remove('hidden');

    setTimeout(() => {
      // Intelligent scoring
      const matches = loveNPeoplePrograms.map(item => {
        let score = 0;
        let matchedReasons = [];

        // Check categories
        item.categories.forEach(cat => {
          if (q.includes(cat)) {
            score += 3;
            matchedReasons.push(`Matches ${cat}`);
          }
        });

        // Location check
        if (q.includes('va') || q.includes('virginia') || q.includes('tn') || q.includes('tennessee')) {
          score += 1;
        }

        // Generic keywords
        if (q.includes('help') || q.includes('program') || q.includes('kid') || q.includes('food') || q.includes('volunteer')) score += 1;

        return { ...item, score, matchedReasons };
      }).filter(m => m.score > 0).sort((a, b) => b.score - a.score);

      const finalMatches = matches.length > 0 ? matches : loveNPeoplePrograms.slice(0, 4);

      let html = `
        <div class="apple-mesh-card bg-rose-50/70 border border-rose-100 rounded-2xl p-5 mb-4 text-sm text-slate-800 flex items-start space-x-3">
          <div class="w-8 h-8 rounded-full bg-rose-500 text-white flex-shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">♥</div>
          <div>
            <h4 class="font-bold text-slate-900 mb-1">Programs Matching: "${escapeHtml(query)}"</h4>
            <p class="text-slate-600 text-xs sm:text-sm">Here are Love'N'People's initiatives and community resources best suited to your request:</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      `;

      finalMatches.forEach(item => {
        html += `
          <div class="apple-mesh-card border border-slate-200/90 rounded-2xl p-5 bg-white/95 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700">
                  📍 Regional Initiative (${item.states})
                </span>
                <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Active Program</span>
              </div>
              <h4 class="text-lg font-bold text-slate-900 mb-1.5">${item.name}</h4>
              <p class="text-xs text-slate-600 mb-3 leading-relaxed">${item.desc}</p>
              
              <div class="bg-slate-50 rounded-xl p-3 mb-4 text-xs text-slate-700 space-y-1">
                <p class="font-semibold text-slate-900">How to Participate or Connect:</p>
                <ul class="list-disc list-inside space-y-0.5 text-slate-600">
                  ${item.requirements ? item.requirements.map(r => `<li>${r}</li>`).join('') : '<li>Contact Love\'N\'People for program schedules</li>'}
                </ul>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-100 flex flex-wrap gap-2 items-center justify-between">
              <a href="tel:${item.phoneRaw}" class="inline-flex items-center text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl transition">
                <i data-lucide="phone" class="w-3.5 h-3.5 mr-1.5"></i> Call ${item.phone}
              </a>
              <a href="mailto:${item.email}?subject=Inquiry%20Regarding%20${encodeURIComponent(item.name)}" class="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-700 px-2 py-1">
                <i data-lucide="mail" class="w-3.5 h-3.5 mr-1"></i> Contact Coordinator &rarr;
              </a>
            </div>
          </div>
        `;
      });

      html += `
        </div>
        <div class="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
          Have questions or want to connect with Love'N'People? Call us directly at <a href="tel:4233352955" class="font-bold text-slate-900 underline">(423) 335-2955</a> or email <a href="mailto:jazmin@lovenpeople.org" class="font-bold text-rose-600 underline">jazmin@lovenpeople.org</a>.
        </div>
      `;

      compassResults.innerHTML = html;
      if (window.lucide) lucide.createIcons();
    }, 450);
  }

  if (compassSubmit) {
    compassSubmit.addEventListener('click', () => {
      searchCompass(compassInput.value);
    });
  }

  if (compassInput) {
    compassInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchCompass(compassInput.value);
      }
    });
  }

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-query');
      compassInput.value = q;
      searchCompass(q);
      compassInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // =========================================================================
  // AI TOOL 2: "My Impact Visualizer" - Dynamic Donation Calculator
  // =========================================================================
  const impactSlider = document.getElementById('impact-slider');
  const impactAmountDisplay = document.getElementById('impact-amount-display');
  const impactOutcomeTitle = document.getElementById('impact-outcome-title');
  const impactOutcomeDetails = document.getElementById('impact-outcome-details');
  const impactPresets = document.querySelectorAll('.impact-preset');
  const matchCompanyInput = document.getElementById('match-company-input');
  const matchCompanyBtn = document.getElementById('match-company-btn');
  const matchCompanyResult = document.getElementById('match-company-result');

  const knownMatchingCompanies = [
    { name: 'Ballad Health', match: '1:1 matching up to $1,000 for health & human services non-profits' },
    { name: 'Eastman Chemical', match: '100% match up to $5,000 annually for education & community relief' },
    { name: 'Food City / K-VA-T', match: 'Community giving program & hunger relief matching partnerships' },
    { name: 'Dominion Energy', match: 'Matches employee gifts $1-for-$1 to certified 501(c)(3) charities' },
    { name: 'Appalachian Power / AEP', match: '100% corporate matching gift program for local community relief' },
    { name: 'Bank of America', match: '1:1 match up to $5,000 per employee per calendar year' }
  ];

  function updateImpact(val) {
    const amount = parseInt(val, 10);
    if (impactAmountDisplay) impactAmountDisplay.textContent = `$${amount}`;

    let title = "";
    let details = "";

    if (amount < 35) {
      title = "Essential School Snack & Nutrition Pack";
      details = `Your gift of $${amount} equips ${Math.floor(amount / 5) || 1} local elementary students with high-protein snacks during school recess and emergency break food bags.`;
    } else if (amount < 75) {
      title = "Full School Break Lunch Relief";
      const kids = Math.floor(amount / 10);
      details = `Your generous $${amount} covers daily wholesome lunches for ${kids} Tri-Cities school children during extended holiday breaks when school cafeteria programs are closed.`;
    } else if (amount < 150) {
      title = "Christmas Angel & Warm Winter Sponsorship";
      details = `At $${amount}, you completely sponsor a child on our Christmas Angel Tree—providing a brand-new warm winter coat, shoes, school essentials, and holiday joy.`;
    } else if (amount < 300) {
      title = "Family Emergency Crisis Care & Hygiene Kits";
      details = `Your $${amount} supplies 12 comprehensive Healing Hands hygiene kits for rural youth plus emergency grocery & gas cards for a family facing unexpected displacement.`;
    } else {
      title = "Major Community Resilience & Pilot Relief Anchor";
      details = `At $${amount}, your major philanthropic investment directly seeds Love'N'People's 2026 Financial Relief Pilot Fund—averting evictions and empowering multiple Tri-Cities families toward stability.`;
    }

    if (impactOutcomeTitle) impactOutcomeTitle.textContent = title;
    if (impactOutcomeDetails) impactOutcomeDetails.textContent = details;
  }

  if (impactSlider) {
    impactSlider.addEventListener('input', (e) => {
      updateImpact(e.target.value);
      impactPresets.forEach(p => p.classList.remove('ring-2', 'ring-rose-500', 'bg-rose-50', 'text-rose-700'));
    });
  }

  impactPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      if (impactSlider) impactSlider.value = val;
      updateImpact(val);
      impactPresets.forEach(p => p.classList.remove('ring-2', 'ring-rose-500', 'bg-rose-50', 'text-rose-700'));
      btn.classList.add('ring-2', 'ring-rose-500', 'bg-rose-50', 'text-rose-700');
    });
  });

  if (matchCompanyBtn) {
    matchCompanyBtn.addEventListener('click', () => {
      const query = matchCompanyInput.value.trim().toLowerCase();
      if (!query) return;

      const found = knownMatchingCompanies.find(c => c.name.toLowerCase().includes(query) || query.includes(c.name.toLowerCase().split(' ')[0]));

      if (found) {
        matchCompanyResult.innerHTML = `
          <div class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center space-x-2">
            <span class="font-bold text-sm">✓ Match Eligible!</span>
            <span><strong>${found.name}:</strong> ${found.match}. Request your company's matching form to double your impact!</span>
          </div>
        `;
      } else {
        matchCompanyResult.innerHTML = `
          <div class="p-3 bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-xl text-xs">
            <strong>${escapeHtml(matchCompanyInput.value)}</strong> may match! Many regional employers partner with Benevity or CyberGrants. Email <strong>jazmin@lovenpeople.org</strong> with our 501(c)(3) EIN for quick match verification.
          </div>
        `;
      }
      matchCompanyResult.classList.remove('hidden');
    });
  }

  // =========================================================================
  // AI TOOL 3: "Lend-A-Hand" - Volunteer Skill Matcher
  // =========================================================================
  const volunteerBtn = document.getElementById('volunteer-match-btn');
  const volunteerResult = document.getElementById('volunteer-match-result');
  const skillSelect = document.getElementById('vol-skill');
  const locationSelect = document.getElementById('vol-location');
  const availabilitySelect = document.getElementById('vol-availability');

  if (volunteerBtn) {
    volunteerBtn.addEventListener('click', () => {
      const skill = skillSelect.value;
      const loc = locationSelect.value;
      const avail = availabilitySelect.value;

      volunteerResult.innerHTML = `
        <div class="p-6 text-center text-neutral-500 flex flex-col items-center justify-center space-y-2">
          <div class="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-xs font-medium">Matching your skills with active Love'N'People initiatives...</p>
        </div>
      `;
      volunteerResult.classList.remove('hidden');

      setTimeout(() => {
        let role = "";
        let program = "";
        let why = "";

        if (skill === 'events') {
          program = "Heart & Heritage Market (Historic HP King Building)";
          role = "Vendor Hospitality & Event Host";
          why = "With 35+ local vendors and hundreds of attendees, your event coordination skills will help ensure a welcoming experience.";
        } else if (skill === 'logistics') {
          program = "PreK-12 School Session Break Food Drive";
          role = "Meal Packing & Distribution Lead";
          why = "Your packing and distribution efficiency directly feeds children across Bristol, TN and VA when school lunches stop.";
        } else if (skill === 'youth') {
          program = "Christmas Angel Adoption & Tech Girls / The Refinery Mentoring";
          role = "Youth Mentor & Gift Sponsor Advocate";
          why = "Your passion for kids creates positive mentorship and smiles for over 100 children each holiday season.";
        } else {
          program = "Community Pilot Advocacy & Regional Relief";
          role = "Resource Navigator & Community Ambassador";
          why = "Help connect families in need with verified rent, electric, and hygiene relief across Northeast TN & Southwest VA.";
        }

        volunteerResult.innerHTML = `
          <div class="border border-neutral-200 bg-white rounded-2xl p-5 shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">★ Best Match for You</span>
              <span class="text-xs text-neutral-500">Location: ${loc} • ${avail}</span>
            </div>
            <h4 class="text-base font-bold text-neutral-900 mb-1">${role}</h4>
            <p class="text-xs font-semibold text-neutral-700 mb-2">Program: ${program}</p>
            <p class="text-xs text-neutral-600 mb-4 leading-relaxed">${why}</p>
            <a href="mailto:jazmin@lovenpeople.org?subject=Volunteer%20Match:%20${encodeURIComponent(role)}&body=Hi%20Jazmin,%20I%20used%20the%20Love'N'People%20Volunteer%20Matcher%20and%20was%20paired%20with%20the%20${encodeURIComponent(role)}%20role%20in%20${encodeURIComponent(loc)}.%20I'd%20love%20to%20get%20involved!" class="inline-flex items-center text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2.5 rounded-xl transition">
              Confirm & Connect with Jazmin &rarr;
            </a>
          </div>
        `;
      }, 350);
    });
  }

  // =========================================================================
  // Contact Form Submission Mock
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending message...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        if (formStatus) {
          formStatus.innerHTML = `
            <div class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
              ❤️ Thank you for reaching out! Your message has been received by Jazmin and the Love'N'People team. We will be in touch shortly.
            </div>
          `;
          formStatus.classList.remove('hidden');
        }
      }, 700);
    });
  }

  // Helper escape
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }
});
