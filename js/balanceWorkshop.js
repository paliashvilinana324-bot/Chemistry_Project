/**
 * balanceWorkshop.js - ელექტრონული ბალანსის ინტერაქტიული სახელოსნო
 * 4-Step Scaffolding & Mastery Learning for 10th-grade Chemistry
 */

const BALANCE_REACTIONS = [
  {
    id: 'rx1',
    title: 'დონე 1: მარტივი ნივთიერებების ურთიერთქმედება',
    equationSkeleton: 'Fe + Cl<sub>2</sub> &rarr; FeCl<sub>3</sub>',
    equationParts: [
      { prefix: '', name: 'Fe', role: 'reducer' },
      { prefix: ' + ', name: 'Cl<sub>2</sub>', role: 'oxidizer' },
      { prefix: ' &rarr; ', name: 'FeCl<sub>3</sub>', role: 'product' }
    ],
    elements: {
      reducer: { symbol: 'Fe', from: 0, to: 3, electronsLost: 3, label: 'Fe⁰ &rarr; Fe⁺³' },
      oxidizer: { symbol: 'Cl', from: 0, to: -1, electronsGained: 2, label: 'Cl₂⁰ &rarr; 2Cl⁻¹' }
    },
    lcm: 6,
    multipliers: { reducer: 2, oxidizer: 3 },
    correctCoefficients: [2, 3, 2], // 2Fe + 3Cl2 -> 2FeCl3
    explanation: 'Fe⁰ კარგავს 3 ელექტრონს (ჟანგვა, აღმდგენია). Cl₂⁰ მოლეკულა (2 ატომი) იძენს 2 ელექტრონს (აღდგენა, მჟანგავია). უსჯ(3, 2) = 6. გამრავლების კოეფიციენტები: Fe &times; 2, Cl₂ &times; 3. გათანაბრებული ტოლობა: 2Fe + 3Cl₂ &rarr; 2FeCl₃.'
  },
  {
    id: 'rx2',
    title: 'დონე 2: ლითონის ურთიერთქმედება მჟავასთან',
    equationSkeleton: 'Al + HCl &rarr; AlCl<sub>3</sub> + H<sub>2</sub>',
    equationParts: [
      { prefix: '', name: 'Al', role: 'reducer' },
      { prefix: ' + ', name: 'HCl', role: 'acid' },
      { prefix: ' &rarr; ', name: 'AlCl<sub>3</sub>', role: 'salt' },
      { prefix: ' + ', name: 'H<sub>2</sub>', role: 'gas' }
    ],
    elements: {
      reducer: { symbol: 'Al', from: 0, to: 3, electronsLost: 3, label: 'Al⁰ &rarr; Al⁺³' },
      oxidizer: { symbol: 'H', from: 1, to: 0, electronsGained: 2, label: '2H⁺¹ &rarr; H₂⁰' }
    },
    lcm: 6,
    multipliers: { reducer: 2, oxidizer: 3 },
    correctCoefficients: [2, 6, 2, 3], // 2Al + 6HCl -> 2AlCl3 + 3H2
    explanation: 'Al⁰ გასცემს 3e⁻-ს (აღმდგენი). 2H⁺¹ იძენს 2e⁻-ს და წარმოქმნის H₂⁰-ს (მჟანგავი). უსჯ(3, 2) = 6. Al-თან იწერება 2, H₂-თან 3. HCl-თან ვსვამთ 6-ს (ქლორის და წყალბადის დასაბალანსებლად): 2Al + 6HCl &rarr; 2AlCl₃ + 3H₂.'
  },
  {
    id: 'rx3',
    title: 'დონე 3: სპილენძი და განზავებული აზოტმჟავა (აზოტი ორ როლში)',
    equationSkeleton: 'Cu + HNO<sub>3</sub>(განზ.) &rarr; Cu(NO<sub>3</sub>)<sub>2</sub> + NO + H<sub>2</sub>O',
    equationParts: [
      { prefix: '', name: 'Cu', role: 'reducer' },
      { prefix: ' + ', name: 'HNO<sub>3</sub>', role: 'acid_oxidizer' },
      { prefix: ' &rarr; ', name: 'Cu(NO<sub>3</sub>)<sub>2</sub>', role: 'salt' },
      { prefix: ' + ', name: 'NO', role: 'reduced_gas' },
      { prefix: ' + ', name: 'H<sub>2</sub>O', role: 'water' }
    ],
    elements: {
      reducer: { symbol: 'Cu', from: 0, to: 2, electronsLost: 2, label: 'Cu⁰ &rarr; Cu⁺²' },
      oxidizer: { symbol: 'N', from: 5, to: 2, electronsGained: 3, label: 'N⁺⁵ &rarr; N⁺² (NO-ში)' }
    },
    lcm: 6,
    multipliers: { reducer: 3, oxidizer: 2 },
    correctCoefficients: [3, 8, 3, 2, 4], // 3Cu + 8HNO3 -> 3Cu(NO3)2 + 2NO + 4H2O
    explanation: 'Cu⁰ გასცემს 2e⁻-ს (Cu &times; 3). N⁺⁵ იძენს 3e⁻-ს (NO &times; 2). ყურადღება! HNO₃-ის აზოტი ორ როლშია: 2 მოლეკულა აღდგა NO-მდე, ხოლო 6 მოლეკულა მარილის წარმოქმნაზე დაიხარჯა [3Cu(NO₃)₂ &rArr; 6 აზოტი]. ჯამში HNO₃-თან იწერება 2 + 6 = 8! წყალთან: 8H &rArr; 4H₂O.'
  },
  {
    id: 'rx4',
    title: 'დონე 4: ქლორის ლაბორატორიული მიღება (KMnO₄ + HCl)',
    equationSkeleton: 'KMnO<sub>4</sub> + HCl &rarr; KCl + MnCl<sub>2</sub> + Cl<sub>2</sub> + H<sub>2</sub>O',
    equationParts: [
      { prefix: '', name: 'KMnO<sub>4</sub>', role: 'oxidizer' },
      { prefix: ' + ', name: 'HCl', role: 'acid_reducer' },
      { prefix: ' &rarr; ', name: 'KCl', role: 'salt1' },
      { prefix: ' + ', name: 'MnCl<sub>2</sub>', role: 'salt2' },
      { prefix: ' + ', name: 'Cl<sub>2</sub>', role: 'gas' },
      { prefix: ' + ', name: 'H<sub>2</sub>O', role: 'water' }
    ],
    elements: {
      reducer: { symbol: 'Cl', from: -1, to: 0, electronsLost: 2, label: '2Cl⁻¹ &rarr; Cl₂⁰' },
      oxidizer: { symbol: 'Mn', from: 7, to: 2, electronsGained: 5, label: 'Mn⁺⁷ &rarr; Mn⁺²' }
    },
    lcm: 10,
    multipliers: { reducer: 5, oxidizer: 2 },
    correctCoefficients: [2, 16, 2, 2, 5, 8], // 2KMnO4 + 16HCl -> 2KCl + 2MnCl2 + 5Cl2 + 8H2O
    explanation: 'Mn⁺⁷ იძენს 5e⁻-ს (მჟანგავი, &times; 2). 2Cl⁻¹ კარგავს 2e⁻-ს (აღმდგენი, Cl₂ &times; 5). უსჯ(5, 2) = 10. მარჯვნივ ქლორის ატომების საერთო რაოდენობა: 2(KCl) + 4(2MnCl₂) + 10(5Cl₂) = 16! ამიტომ HCl-თან იწერება 16, ხოლო წყალთან: 8H₂O.'
  },
  {
    id: 'rx5',
    title: 'დონე 5: დიქრომატით რკინა(II)-ის დაჟანგვა მჟავა არეში',
    equationSkeleton: 'K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub> + FeSO<sub>4</sub> + H<sub>2</sub>SO<sub>4</sub> &rarr; Cr<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O',
    equationParts: [
      { prefix: '', name: 'K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>', role: 'oxidizer' },
      { prefix: ' + ', name: 'FeSO<sub>4</sub>', role: 'reducer' },
      { prefix: ' + ', name: 'H<sub>2</sub>SO<sub>4</sub>', role: 'medium' },
      { prefix: ' &rarr; ', name: 'Cr<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>', role: 'prod1' },
      { prefix: ' + ', name: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>', role: 'prod2' },
      { prefix: ' + ', name: 'K<sub>2</sub>SO<sub>4</sub>', role: 'prod3' },
      { prefix: ' + ', name: 'H<sub>2</sub>O', role: 'water' }
    ],
    elements: {
      reducer: { symbol: 'Fe', from: 2, to: 3, electronsLost: 1, label: 'Fe⁺² &minus; 1e⁻ &rarr; Fe⁺³' },
      oxidizer: { symbol: 'Cr', from: 6, to: 3, electronsGained: 6, label: 'Cr₂⁺⁶ + 6e⁻ &rarr; 2Cr⁺³' }
    },
    lcm: 6,
    multipliers: { reducer: 6, oxidizer: 1 },
    correctCoefficients: [1, 6, 7, 1, 3, 1, 7], // 1 K2Cr2O7 + 6 FeSO4 + 7 H2SO4 -> 1 Cr2(SO4)3 + 3 Fe2(SO4)3 + 1 K2SO4 + 7 H2O
    explanation: 'Cr₂⁺⁶ იძენს 6e⁻-ს (Cr₂O₇ &times; 1). Fe⁺² კარგავს 1e⁻-ს (&times; 6, ამიტომ 6FeSO₄ და 3Fe₂(SO₄)₃). სულფატ იონები მარჯვნივ: 3 + 9 + 1 = 13. მარცხნივ უკვე გვაქვს 6 SO₄ FeSO₄-ში, ე.ი. H₂SO₄-თან გვჭირდება 7! წყალთან: 7H₂O.'
  }
];

class BalanceWorkshop {
  constructor() {
    this.reactions = BALANCE_REACTIONS;
    this.currentRxIndex = 0;
    this.currentStep = 1; // 1 to 4
    this.userAnswers = {
      step1: { oxidizer: '', reducer: '' },
      step2: { eLost: '', eGained: '' },
      step3: { lcm: '', multRed: '', multOx: '' },
      step4: [] // user inputted coefficients array
    };
    this.solvedReactions = new Set();
  }

  init() {
    this.renderReactionSelector();
    this.loadReaction(0);
  }

  renderReactionSelector() {
    const navContainer = document.getElementById('workshopRxNav');
    if (!navContainer) return;

    navContainer.innerHTML = this.reactions.map((rx, idx) => `
      <button onclick="window.balanceWorkshop.loadReaction(${idx})"
              id="rxTabBtn_${idx}"
              class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition text-left flex items-center justify-between border ${idx === 0 ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
        <span>${rx.title.split(':')[0]}</span>
        <span id="rxStatusIcon_${idx}" class="ml-1 text-xs">${this.solvedReactions.has(rx.id) ? '✅' : '⚪'}</span>
      </button>
    `).join('');
  }

  loadReaction(index) {
    if (window.soundManager) window.soundManager.playClick();
    this.currentRxIndex = index;
    this.currentStep = 1;
    const rx = this.reactions[index];

    // Reset answers
    this.userAnswers = {
      step1: { oxidizer: '', reducer: '' },
      step2: { eLost: '', eGained: '' },
      step3: { lcm: '', multRed: '', multOx: '' },
      step4: new Array(rx.correctCoefficients.length).fill('')
    };

    // Update active nav button
    this.reactions.forEach((_, idx) => {
      const btn = document.getElementById(`rxTabBtn_${idx}`);
      if (btn) {
        if (idx === index) {
          btn.className = 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-left flex items-center justify-between border bg-blue-600 text-white border-blue-600 shadow';
        } else {
          btn.className = 'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition text-left flex items-center justify-between border bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
        }
      }
    });

    this.renderHeader();
    this.renderStepNavigation();
    this.renderCurrentStep();
    this.clearStepFeedback();
  }

  renderHeader() {
    const rx = this.reactions[this.currentRxIndex];
    const headerTitle = document.getElementById('workshopRxTitle');
    const headerSkeleton = document.getElementById('workshopRxSkeleton');

    if (headerTitle) headerTitle.textContent = rx.title;
    if (headerSkeleton) headerSkeleton.innerHTML = rx.equationSkeleton;
  }

  renderStepNavigation() {
    const stepNav = document.getElementById('workshopStepNav');
    if (!stepNav) return;

    const steps = [
      { num: 1, title: '1. მჟანგავი & აღმდგენი' },
      { num: 2, title: '2. ელექტრონები' },
      { num: 3, title: '3. უსჯ & კოეფიციენტები' },
      { num: 4, title: '4. საბოლოო ბალანსი' }
    ];

    stepNav.innerHTML = steps.map(s => {
      const isActive = s.num === this.currentStep;
      const isPast = s.num < this.currentStep;

      let style = 'bg-slate-100 text-slate-500 border-slate-200';
      if (isActive) style = 'bg-blue-600 text-white border-blue-600 shadow-md font-bold';
      else if (isPast) style = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold';

      return `
        <button onclick="window.balanceWorkshop.goToStep(${s.num})"
                class="flex-1 py-2 px-2 text-center rounded-xl border text-xs sm:text-sm transition ${style}">
          ${isPast ? '✓ ' : ''}${s.title}
        </button>
      `;
    }).join('');
  }

  goToStep(stepNum) {
    if (stepNum > this.currentStep) {
      // Don't skip ahead without checking current step
      return;
    }
    if (window.soundManager) window.soundManager.playClick();
    this.currentStep = stepNum;
    this.renderStepNavigation();
    this.renderCurrentStep();
    this.clearStepFeedback();
  }

  renderCurrentStep() {
    const contentArea = document.getElementById('workshopStepContent');
    if (!contentArea) return;

    const rx = this.reactions[this.currentRxIndex];

    switch (this.currentStep) {
      case 1:
        contentArea.innerHTML = this.renderStep1(rx);
        break;
      case 2:
        contentArea.innerHTML = this.renderStep2(rx);
        break;
      case 3:
        contentArea.innerHTML = this.renderStep3(rx);
        break;
      case 4:
        contentArea.innerHTML = this.renderStep4(rx);
        break;
    }
  }

  // STEP 1: Identify Oxidizer & Reducer
  renderStep1(rx) {
    return `
      <div class="space-y-4">
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-900">
          <span class="font-bold">ნაბიჯი 1:</span> განსაზღვრეთ, რომელმა ელემენტებმა შეიცვალეს ჟანგვის რიცხვები. ვინ არის აღმდგენი (გასცა e⁻) და ვინ არის მჟანგავი (შეიძინა e⁻)?
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Reducer input card -->
          <div class="card-oxidation p-4 rounded-xl shadow-sm border border-orange-200">
            <h4 class="font-bold text-orange-900 flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-orange-500"></span>
              აღმდგენი (ელემენტი, რომელმაც გასცა e⁻):
            </h4>
            <p class="text-xs text-orange-700 mt-1 mb-3">ჟანგვის რიცხვი გაიზარდა (მიმდინარეობს ჟანგვა).</p>
            <input type="text" id="step1_reducer" placeholder="ჩაწერეთ ელემენტის სიმბოლო (მაგ. ${rx.elements.reducer.symbol})"
                   value="${this.userAnswers.step1.reducer}"
                   class="w-full p-2.5 rounded-lg border border-orange-300 font-mono text-base focus:ring-2 focus:ring-orange-500 outline-none uppercase" />
          </div>

          <!-- Oxidizer input card -->
          <div class="card-reduction p-4 rounded-xl shadow-sm border border-sky-200">
            <h4 class="font-bold text-sky-900 flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-sky-500"></span>
              მჟანგავი (ელემენტი, რომელმაც შეიძინა e⁻):
            </h4>
            <p class="text-xs text-sky-700 mt-1 mb-3">ჟანგვის რიცხვი შემცირდა (მიმდინარეობს აღდგენა).</p>
            <input type="text" id="step1_oxidizer" placeholder="ჩაწერეთ ელემენტის სიმბოლო (მაგ. ${rx.elements.oxidizer.symbol})"
                   value="${this.userAnswers.step1.oxidizer}"
                   class="w-full p-2.5 rounded-lg border border-sky-300 font-mono text-base focus:ring-2 focus:ring-sky-500 outline-none uppercase" />
          </div>
        </div>

        ${this.renderActionButtons(1)}
      </div>
    `;
  }

  // STEP 2: Electrons Lost / Gained
  renderStep2(rx) {
    return `
      <div class="space-y-4">
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-900">
          <span class="font-bold">ნაბიჯი 2:</span> შეადგინეთ ელექტრონული ნახევარრეაქციები და ჩაწერეთ გაცემული და შეძენილი ელექტრონების რაოდენობა.
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="card-oxidation p-4 rounded-xl border border-orange-200 space-y-2">
            <div class="font-bold text-orange-900">ჟანგვის ნახევარრეაქცია:</div>
            <div class="font-mono text-sm bg-white p-2 rounded border border-orange-200">${rx.elements.reducer.label}</div>
            <label class="block text-xs font-semibold text-slate-700 pt-2">გაცემული ელექტრონების რაოდენობა (&minus;e⁻):</label>
            <input type="number" id="step2_eLost" min="1" max="10" placeholder="e⁻ რაოდენობა"
                   value="${this.userAnswers.step2.eLost}"
                   class="w-full p-2.5 rounded-lg border border-orange-300 font-mono text-lg font-bold focus:ring-2 focus:ring-orange-500 outline-none" />
          </div>

          <div class="card-reduction p-4 rounded-xl border border-sky-200 space-y-2">
            <div class="font-bold text-sky-900">აღდგენის ნახევარრეაქცია:</div>
            <div class="font-mono text-sm bg-white p-2 rounded border border-sky-200">${rx.elements.oxidizer.label}</div>
            <label class="block text-xs font-semibold text-slate-700 pt-2">შეძენილი ელექტრონების რაოდენობა (+e⁻):</label>
            <input type="number" id="step2_eGained" min="1" max="10" placeholder="e⁻ რაოდენობა"
                   value="${this.userAnswers.step2.eGained}"
                   class="w-full p-2.5 rounded-lg border border-sky-300 font-mono text-lg font-bold focus:ring-2 focus:ring-sky-500 outline-none" />
          </div>
        </div>

        ${this.renderActionButtons(2)}
      </div>
    `;
  }

  // STEP 3: LCM and Multipliers
  renderStep3(rx) {
    return `
      <div class="space-y-4">
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-900">
          <span class="font-bold">ნაბიჯი 3:</span> იპოვეთ უმცირესი საერთო ჯერადი (უსჯ) გაცემულ (${rx.elements.reducer.electronsLost}) და შეძენილ (${rx.elements.oxidizer.electronsGained}) ელექტრონებს შორის, შემდეგ გამოთვალეთ გამრავლების კოეფიციენტები.
        </div>

        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-48 text-sm font-semibold text-slate-700">უმცირესი საერთო ჯერადი (უსჯ):</label>
            <input type="number" id="step3_lcm" min="1" max="30" placeholder="უსჯ"
                   value="${this.userAnswers.step3.lcm}"
                   class="w-28 p-2 rounded-lg border border-slate-300 font-mono text-lg font-bold text-center focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div class="flex items-center gap-3">
            <label class="w-48 text-sm font-semibold text-orange-800">კოეფიციენტი აღმდგენისთვის (${rx.elements.reducer.symbol}):</label>
            <input type="number" id="step3_multRed" min="1" max="12" placeholder="მამრავლი"
                   value="${this.userAnswers.step3.multRed}"
                   class="w-28 p-2 rounded-lg border border-orange-300 font-mono text-lg font-bold text-center focus:ring-2 focus:ring-orange-500 outline-none" />
            <span class="text-xs text-slate-500">(უსჯ / ${rx.elements.reducer.electronsLost})</span>
          </div>

          <div class="flex items-center gap-3">
            <label class="w-48 text-sm font-semibold text-sky-800">კოეფიციენტი მჟანგავისთვის (${rx.elements.oxidizer.symbol}):</label>
            <input type="number" id="step3_multOx" min="1" max="12" placeholder="მამრავლი"
                   value="${this.userAnswers.step3.multOx}"
                   class="w-28 p-2 rounded-lg border border-sky-300 font-mono text-lg font-bold text-center focus:ring-2 focus:ring-sky-500 outline-none" />
            <span class="text-xs text-slate-500">(უსჯ / ${rx.elements.oxidizer.electronsGained})</span>
          </div>
        </div>

        ${this.renderActionButtons(3)}
      </div>
    `;
  }

  // STEP 4: Balance Main Equation
  renderStep4(rx) {
    let eqInputsHtml = rx.equationParts.map((part, idx) => {
      const val = this.userAnswers.step4[idx] || '';
      return `
        <span class="inline-flex items-center my-1">
          ${part.prefix ? `<span class="mx-1 font-bold text-slate-600">${part.prefix}</span>` : ''}
          <input type="number" id="coeffInput_${idx}" min="1" max="30" placeholder="1"
                 value="${val}"
                 class="w-12 h-10 text-center font-mono font-bold text-lg border-2 border-slate-300 focus:border-blue-500 rounded-lg outline-none mx-1" />
          <span class="font-mono font-bold text-lg text-slate-800">${part.name}</span>
        </span>
      `;
    }).join('');

    return `
      <div class="space-y-4">
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900">
          <span class="font-bold">ნაბიჯი 4:</span> გადაიტანეთ ელექტრონული ბალანსიდან მიღებული კოეფიციენტები მთავარ ტოლობაში. გაათანაბრეთ დარჩენილი ატომები (ლითონები &rarr; არალითონები &rarr; H &rarr; O-ს შემოწმება).
          თუ კოეფიციენტი არის 1, ჩაწერეთ 1 (ან დატოვეთ ცარიელი).
        </div>

        <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto text-center">
          <div class="inline-flex flex-wrap items-center justify-center p-2">
            ${eqInputsHtml}
          </div>
        </div>

        ${this.renderActionButtons(4)}
      </div>
    `;
  }

  renderActionButtons(stepNum) {
    return `
      <div class="flex items-center space-x-3 pt-3">
        <button onclick="window.balanceWorkshop.checkStep(${stepNum})"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          შემოწმება და გაგრძელება
        </button>
        <button onclick="window.balanceWorkshop.showHint(${stepNum})"
                class="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5">
          <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
          მინიშნება
        </button>
      </div>
      <div id="workshopFeedbackBox" class="hidden rounded-xl p-3 text-sm mt-3"></div>
    `;
  }

  checkStep(stepNum) {
    const rx = this.reactions[this.currentRxIndex];
    const fbBox = document.getElementById('workshopFeedbackBox');
    if (!fbBox) return;

    fbBox.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-800', 'border-emerald-200', 'bg-rose-50', 'text-rose-800', 'border-rose-200');
    fbBox.classList.add('border');

    if (stepNum === 1) {
      const redVal = (document.getElementById('step1_reducer')?.value || '').trim().toLowerCase();
      const oxVal = (document.getElementById('step1_oxidizer')?.value || '').trim().toLowerCase();
      this.userAnswers.step1 = { reducer: redVal, oxidizer: oxVal };

      const matchElement = (input, symbol) => {
        const s = symbol.toLowerCase();
        if (input === s) return true;
        // Georgian name aliases
        const aliases = {
          'fe': ['რკინა', 'რკინის', 'fe', 'fe0', 'fe2+'],
          'cl': ['ქლორი', 'ქლორის', 'cl', 'cl2', 'cl-'],
          'al': ['ალუმინი', 'ალუმინის', 'al', 'al0'],
          'h':  ['წყალბადი', 'წყალბადის', 'h', 'h+', 'h2'],
          'cu': ['სპილენძი', 'სპილენძის', 'cu', 'cu0', 'cu2+'],
          'n':  ['აზოტი', 'აზოტის', 'n', 'n+5', 'no'],
          'mn': ['მანგანუმი', 'მანგანუმის', 'mn', 'mn+7', 'kmno4'],
          'cr': ['ქრომი', 'ქრომის', 'cr', 'cr+6', 'k2cr2o7']
        };
        const validList = aliases[s] || [s];
        return validList.includes(input);
      };

      const redMatch = matchElement(redVal, rx.elements.reducer.symbol);
      const oxMatch = matchElement(oxVal, rx.elements.oxidizer.symbol);

      if (redMatch && oxMatch) {
        if (window.soundManager) window.soundManager.playSuccess();
        fbBox.classList.add('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
        fbBox.innerHTML = `✅ <b>სწორია!</b> აღმდგენია ${rx.elements.reducer.symbol} (ჟანგვის რიცხვი გაიზარდა), ხოლო მჟანგავია ${rx.elements.oxidizer.symbol} (ჟანგვის რიცხვი შემცირდა).`;
        setTimeout(() => this.goToStep(2), 900);
      } else {
        if (window.soundManager) window.soundManager.playError();
        fbBox.classList.add('bg-rose-50', 'text-rose-800', 'border-rose-200');
        fbBox.innerHTML = `❌ გადაამოწმეთ: რომელი ატომი კარგავს ელექტრონს (+ მუხტი ემატება) და რომელი იძენს (- მუხტი ემატება)?`;
      }
    } else if (stepNum === 2) {
      const eLost = parseInt(document.getElementById('step2_eLost')?.value, 10);
      const eGained = parseInt(document.getElementById('step2_eGained')?.value, 10);
      this.userAnswers.step2 = { eLost, eGained };

      if (eLost === rx.elements.reducer.electronsLost && eGained === rx.elements.oxidizer.electronsGained) {
        if (window.soundManager) window.soundManager.playSuccess();
        fbBox.classList.add('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
        fbBox.innerHTML = `✅ <b>ზუსტია!</b> გაცემულია ${eLost}e⁻ და შეძენილია ${eGained}e⁻. გადავიდეთ უსჯ-ს მოძებნაზე.`;
        setTimeout(() => this.goToStep(3), 900);
      } else {
        if (window.soundManager) window.soundManager.playError();
        fbBox.classList.add('bg-rose-50', 'text-rose-800', 'border-rose-200');
        fbBox.innerHTML = `❌ ელექტრონების რაოდენობა არ ემთხვევა. დააკვირდით ჟანგვის რიცხვების სხვაობას და ინდექსებს!`;
      }
    } else if (stepNum === 3) {
      const lcm = parseInt(document.getElementById('step3_lcm')?.value, 10);
      const mRed = parseInt(document.getElementById('step3_multRed')?.value, 10);
      const mOx = parseInt(document.getElementById('step3_multOx')?.value, 10);
      this.userAnswers.step3 = { lcm, multRed: mRed, multOx: mOx };

      if (lcm === rx.lcm && mRed === rx.multipliers.reducer && mOx === rx.multipliers.oxidizer) {
        if (window.soundManager) window.soundManager.playSuccess();
        fbBox.classList.add('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
        fbBox.innerHTML = `✅ <b>შესანიშნავია!</b> უსჯ = ${lcm}. გამრავლების კოეფიციენტებია: ${mRed} და ${mOx}.`;
        setTimeout(() => this.goToStep(4), 900);
      } else {
        if (window.soundManager) window.soundManager.playError();
        fbBox.classList.add('bg-rose-50', 'text-rose-800', 'border-rose-200');
        fbBox.innerHTML = `❌ გამოთვლაში შეცდომაა. გაიხსენეთ: უსჯ არის უმცირესი რიცხვი, რომელიც უნაშთოდ იყოფა ${rx.elements.reducer.electronsLost}-ზეც და ${rx.elements.oxidizer.electronsGained}-ზეც.`;
      }
    } else if (stepNum === 4) {
      const inputs = rx.correctCoefficients.map((_, idx) => {
        const val = parseInt(document.getElementById(`coeffInput_${idx}`)?.value, 10);
        return isNaN(val) ? 1 : val;
      });
      this.userAnswers.step4 = inputs;

      const allMatch = inputs.every((val, idx) => val === rx.correctCoefficients[idx]);

      if (allMatch) {
        if (window.soundManager) window.soundManager.playSuccess();
        fbBox.classList.add('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
        fbBox.innerHTML = `
          <div class="space-y-1">
            <div class="font-bold text-base">🎉 ბრწყინვალეა! რეაქციის ტოლობა სრულად და სწორად გათანაბრდა!</div>
            <div class="text-xs text-emerald-700">${rx.explanation}</div>
          </div>
        `;
        this.solvedReactions.add(rx.id);
        const icon = document.getElementById(`rxStatusIcon_${this.currentRxIndex}`);
        if (icon) icon.textContent = '✅';
        this.updateOverallProgress();
      } else {
        if (window.soundManager) window.soundManager.playError();
        fbBox.classList.add('bg-rose-50', 'text-rose-800', 'border-rose-200');
        fbBox.innerHTML = `❌ კოეფიციენტები ჯერ არ არის სრულად დაბალანსებული. შეამოწმეთ ატომების რაოდენობა ტოლობის მარცხენა და მარჯვენა მხარეს!`;
      }
    }
  }

  showHint(stepNum) {
    if (window.soundManager) window.soundManager.playClick();
    const rx = this.reactions[this.currentRxIndex];
    const fbBox = document.getElementById('workshopFeedbackBox');
    if (!fbBox) return;

    fbBox.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-800', 'border-emerald-200', 'bg-rose-50', 'text-rose-800', 'border-rose-200');
    fbBox.classList.add('border', 'bg-amber-50', 'text-amber-800', 'border-amber-200');

    let hintText = '';
    if (stepNum === 1) {
      hintText = `დააკვირდით: ${rx.elements.reducer.symbol} არის მარცხნივ ${rx.elements.reducer.from} და მარჯვნივ +${rx.elements.reducer.to}. ${rx.elements.oxidizer.symbol} არის მარცხნივ +${rx.elements.oxidizer.from} (ან 0) და მარჯვნივ ${rx.elements.oxidizer.to}.`;
    } else if (stepNum === 2) {
      hintText = `ნახევარრეაქცია ${rx.elements.reducer.label}: გასცა ${rx.elements.reducer.electronsLost}e⁻. ნახევარრეაქცია ${rx.elements.oxidizer.label}: შეიძინა ${rx.elements.oxidizer.electronsGained}e⁻.`;
    } else if (stepNum === 3) {
      hintText = `უსჯ(${rx.elements.reducer.electronsLost}, ${rx.elements.oxidizer.electronsGained}) = ${rx.lcm}. მამრავლი აღმდგენისთვის = ${rx.lcm} / ${rx.elements.reducer.electronsLost} = ${rx.multipliers.reducer}; მჟანგავისთვის = ${rx.lcm} / ${rx.elements.oxidizer.electronsGained} = ${rx.multipliers.oxidizer}.`;
    } else if (stepNum === 4) {
      hintText = `სწორი კოეფიციენტებია: ${rx.correctCoefficients.join(', ')}. გადაამოწმეთ თითოეული ნივთიერების წინ!`;
    }

    fbBox.innerHTML = `💡 <b>მინიშნება:</b> ${hintText}`;
  }

  clearStepFeedback() {
    const fbBox = document.getElementById('workshopFeedbackBox');
    if (fbBox) {
      fbBox.classList.add('hidden');
      fbBox.innerHTML = '';
    }
  }

  updateOverallProgress() {
    const badge = document.getElementById('workshopProgressBadge');
    if (badge) {
      badge.textContent = `გათანაბრებულია: ${this.solvedReactions.size} / ${this.reactions.length}`;
    }
  }
}

window.balanceWorkshop = new BalanceWorkshop();
