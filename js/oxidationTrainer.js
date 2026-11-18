/**
 * oxidationTrainer.js - ჟანგვის რიცხვების განსაზღვრის ტრენაჟორი
 * Module 1 for 10th-grade Georgian Chemistry Curriculum
 */

const COMPOUNDS_DATA = [
  {
    id: 'kmno4',
    name: 'კალიუმის პერმანგანატი',
    formulaDisplay: 'KMnO<sub>4</sub>',
    charge: 0,
    atoms: [
      { element: 'K', count: 1, known: true, correctState: 1, rule: 'ტუტე ლითონი (I ჯგუფი) ნაერთებში ყოველთვის +1-ია.' },
      { element: 'Mn', count: 1, known: false, correctState: 7, rule: 'უცნობი ცენტრალური ატომი. გამოითვლება მოლეკულის ნეიტრალურობიდან.' },
      { element: 'O', count: 4, known: true, correctState: -2, rule: 'ჟანგბადი თითქმის ყველა ნაერთში -2-ია.' }
    ],
    explanation: '1 · (+1) [K] + 1 · (x) [Mn] + 4 · (-2) [O] = 0 &rArr; +1 + x - 8 = 0 &rArr; x - 7 = 0 &rArr; x = +7. მანგანუმის ჟანგვის რიცხვია +7.'
  },
  {
    id: 'k2cr2o7',
    name: 'კალიუმის დიქრომატი',
    formulaDisplay: 'K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>',
    charge: 0,
    atoms: [
      { element: 'K', count: 2, known: true, correctState: 1, rule: 'ტუტე ლითონი ყოველთვის +1-ია.' },
      { element: 'Cr', count: 2, known: false, correctState: 6, rule: 'უცნობი ელემენტი (Cr). გაითვალისწინეთ, რომ ფორმულაში ქრომის 2 ატომია (2x).' },
      { element: 'O', count: 7, known: true, correctState: -2, rule: 'ჟანგბადი ნაერთებში -2-ია.' }
    ],
    explanation: '2 · (+1) + 2 · (x) + 7 · (-2) = 0 &rArr; +2 + 2x - 14 = 0 &rArr; 2x - 12 = 0 &rArr; 2x = +12 &rArr; x = +6. ქრომის ჟანგვის რიცხვია +6.'
  },
  {
    id: 'h2so4',
    name: 'გოგირდმჟავა',
    formulaDisplay: 'H<sub>2</sub>SO<sub>4</sub>',
    charge: 0,
    atoms: [
      { element: 'H', count: 2, known: true, correctState: 1, rule: 'წყალბადი არალითონებთან ნაერთებში +1-ია.' },
      { element: 'S', count: 1, known: false, correctState: 6, rule: 'უცნობი ელემენტია გოგირდი (S).' },
      { element: 'O', count: 4, known: true, correctState: -2, rule: 'ჟანგბადი ნაერთებში -2-ია.' }
    ],
    explanation: '2 · (+1) + 1 · (x) + 4 · (-2) = 0 &rArr; +2 + x - 8 = 0 &rArr; x - 6 = 0 &rArr; x = +6. გოგირდის ჟანგვის რიცხვია +6.'
  },
  {
    id: 'hno3',
    name: 'აზოტმჟავა',
    formulaDisplay: 'HNO<sub>3</sub>',
    charge: 0,
    atoms: [
      { element: 'H', count: 1, known: true, correctState: 1, rule: 'წყალბადი ნაერთებში +1-ია.' },
      { element: 'N', count: 1, known: false, correctState: 5, rule: 'უცნობი ელემენტია აზოტი (N).' },
      { element: 'O', count: 3, known: true, correctState: -2, rule: 'ჟანგბადი ნაერთებში -2-ია.' }
    ],
    explanation: '1 · (+1) + 1 · (x) + 3 · (-2) = 0 &rArr; +1 + x - 6 = 0 &rArr; x - 5 = 0 &rArr; x = +5. აზოტის ჟანგვის რიცხვია +5.'
  },
  {
    id: 'nh4no3',
    name: 'ამონიუმის ნიტრატი (განსაკუთრებული ქეისი!)',
    formulaDisplay: '[NH<sub>4</sub>]<sup>+</sup>[NO<sub>3</sub>]<sup>&minus;</sup>',
    charge: 0,
    isComplexIon: true,
    atoms: [
      { element: 'N (NH₄⁺-ში)', count: 1, known: false, correctState: -3, rule: 'კატიონში [NH₄]⁺: x + 4(+1) = +1 &rArr; x = -3' },
      { element: 'H', count: 4, known: true, correctState: 1, rule: 'წყალბადი +1-ია.' },
      { element: 'N (NO₃⁻-ში)', count: 1, known: false, correctState: 5, rule: 'ანიონში [NO₃]⁻: y + 3(-2) = -1 &rArr; y = +5' },
      { element: 'O', count: 3, known: true, correctState: -2, rule: 'ჟანგბადი -2-ია.' }
    ],
    explanation: 'ერთსა და იმავე ნივთიერებაში აზოტი ორ განსხვავებულ იონშია: ამონიუმის იონში [NH₄]⁺ აზოტი არის -3, ხოლო ნიტრატის იონში [NO₃]⁻ აზოტი არის +5!'
  },
  {
    id: 'h2o2',
    name: 'წყალბადის პეროქსიდი (გამონაკლისი!)',
    formulaDisplay: 'H<sub>2</sub>O<sub>2</sub>',
    charge: 0,
    atoms: [
      { element: 'H', count: 2, known: true, correctState: 1, rule: 'წყალბადი +1-ია.' },
      { element: 'O', count: 2, known: false, correctState: -1, rule: 'გამონაკლისი! პეროქსიდებში არსებობს -O-O- ხიდი, სადაც ჟანგბადის ჟანგვის რიცხვია -1.' }
    ],
    explanation: '2 · (+1) + 2 · (x) = 0 &rArr; +2 + 2x = 0 &rArr; 2x = -2 &rArr; x = -1. პეროქსიდებში ჟანგბადის ჟანგვის რიცხვი ყოველთვის -1-ია.'
  },
  {
    id: 'nah',
    name: 'ნატრიუმის ჰიდრიდი (გამონაკლისი!)',
    formulaDisplay: 'NaH',
    charge: 0,
    atoms: [
      { element: 'Na', count: 1, known: true, correctState: 1, rule: 'აქტიური ტუტე მეტალი ყოველთვის +1-ია.' },
      { element: 'H', count: 1, known: false, correctState: -1, rule: 'გამონაკლისი! აქტიურ მეტალთა ჰიდრიდებში წყალბადი უფრო ელექტროუარყოფითია და იძენს 1 ელექტრონს (-1).' }
    ],
    explanation: '1 · (+1) + 1 · (x) = 0 &rArr; x = -1. მეტალთა ჰიდრიდებში წყალბადის ჟანგვის რიცხვია -1.'
  },
  {
    id: 'so4_ion',
    name: 'სულფატის იონი (რთული იონი)',
    formulaDisplay: 'SO<sub>4</sub><sup>2&minus;</sup>',
    charge: -2,
    atoms: [
      { element: 'S', count: 1, known: false, correctState: 6, rule: 'უცნობი ელემენტია S. იონის საერთო მუხტია -2.' },
      { element: 'O', count: 4, known: true, correctState: -2, rule: 'ჟანგბადი -2-ია.' }
    ],
    explanation: '1 · (x) + 4 · (-2) = -2 (იონის მუხტი) &rArr; x - 8 = -2 &rArr; x = +6. გოგირდის ჟანგვის რიცხვია +6.'
  }
];

class OxidationTrainer {
  constructor() {
    this.compounds = COMPOUNDS_DATA;
    this.currentCompoundIndex = 0;
    this.selectedAtomIndex = 0;
    this.studentStates = {}; // key: atom index, value: number
    this.solvedCompounds = new Set();
  }

  init() {
    this.renderCompoundSelect();
    this.loadCompound(0);
  }

  renderCompoundSelect() {
    const selector = document.getElementById('compoundSelector');
    if (!selector) return;

    selector.innerHTML = this.compounds.map((c, idx) => `
      <option value="${idx}">
        ${c.id.toUpperCase()} - ${c.name}
      </option>
    `).join('');

    selector.addEventListener('change', (e) => {
      this.loadCompound(parseInt(e.target.value, 10));
    });
  }

  loadCompound(index) {
    this.currentCompoundIndex = index;
    const compound = this.compounds[index];

    // Initialize student states: known atoms get their correct state pre-filled, unknown atoms start as null
    this.studentStates = {};
    let firstUnknownIdx = -1;

    compound.atoms.forEach((atom, idx) => {
      if (atom.known) {
        this.studentStates[idx] = atom.correctState;
      } else {
        this.studentStates[idx] = 0; // default initial guess
        if (firstUnknownIdx === -1) firstUnknownIdx = idx;
      }
    });

    this.selectedAtomIndex = firstUnknownIdx !== -1 ? firstUnknownIdx : 0;
    this.renderFormulaExplorer();
    this.renderCalculationPanel();
    this.clearFeedback();
  }

  selectAtom(idx) {
    if (window.soundManager) window.soundManager.playClick();
    this.selectedAtomIndex = idx;
    this.renderFormulaExplorer();
    this.renderCalculationPanel();
  }

  formatState(val) {
    if (val === null || val === undefined) return '?';
    if (val > 0) return `+${val}`;
    return `${val}`;
  }

  renderFormulaExplorer() {
    const displayContainer = document.getElementById('interactiveFormulaDisplay');
    if (!displayContainer) return;

    const compound = this.compounds[this.currentCompoundIndex];

    let atomsHtml = compound.atoms.map((atom, idx) => {
      const stateVal = this.studentStates[idx];
      const isSelected = this.selectedAtomIndex === idx;
      let badgeColor = 'ox-badge-unknown';

      if (atom.known) {
        badgeColor = atom.correctState > 0 ? 'ox-badge-positive' : (atom.correctState < 0 ? 'ox-badge-negative' : 'ox-badge-zero');
      } else if (stateVal !== null) {
        badgeColor = stateVal > 0 ? 'ox-badge-positive' : (stateVal < 0 ? 'ox-badge-negative' : 'ox-badge-zero');
      }

      const displayNum = this.formatState(stateVal);

      return `
        <div class="atom-cell ${isSelected ? 'selected' : ''}" onclick="window.oxidationTrainer.selectAtom(${idx})">
          <span class="ox-state-badge ${badgeColor}">${displayNum}</span>
          <span class="text-3xl font-bold font-mono tracking-tight text-slate-800">
            ${atom.element}${atom.count > 1 ? `<sub class="text-xl text-slate-600 font-sans">${atom.count}</sub>` : ''}
          </span>
        </div>
      `;
    }).join('');

    displayContainer.innerHTML = `
      <div class="flex items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
        <div class="flex items-center space-x-2">
          ${atomsHtml}
          ${compound.charge !== 0 ? `<span class="text-xl font-bold text-slate-500 font-mono ml-2">(${compound.charge > 0 ? `+${compound.charge}` : compound.charge})</span>` : ''}
        </div>
      </div>
      <p class="text-xs text-center text-slate-500 mt-2">
        👆 დააწკაპუნეთ ელემენტის ატომზე მისი ჟანგვის რიცხვის შესარჩევად ან წესის გასაცნობად.
      </p>
    `;
  }

  renderCalculationPanel() {
    const calcContainer = document.getElementById('calculationStepPanel');
    if (!calcContainer) return;

    const compound = this.compounds[this.currentCompoundIndex];
    const curAtom = compound.atoms[this.selectedAtomIndex];
    const currentState = this.studentStates[this.selectedAtomIndex] ?? 0;

    let equationStepsHtml = '';
    let totalKnownSum = 0;
    let unknownTerms = [];

    compound.atoms.forEach((atom, idx) => {
      if (idx === this.selectedAtomIndex) {
        unknownTerms.push(`${atom.count > 1 ? `${atom.count}&middot;` : ''}(<span class="font-bold text-amber-600">x</span>) [${atom.element}]`);
      } else {
        const val = this.studentStates[idx] ?? atom.correctState;
        totalKnownSum += atom.count * val;
        unknownTerms.push(`${atom.count > 1 ? `${atom.count}&middot;` : ''}(${val > 0 ? `+${val}` : val}) [${atom.element}]`);
      }
    });

    const equationString = `${unknownTerms.join(' + ')} = ${compound.charge}`;

    calcContainer.innerHTML = `
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h4 class="font-bold text-lg text-slate-900 flex items-center gap-2">
              არჩეული ელემენტი: <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-mono text-xl">${curAtom.element}</span>
            </h4>
            <p class="text-xs text-slate-500 mt-0.5">${curAtom.rule}</p>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">სტატუსი</span>
            <div>${curAtom.known ? '<span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">ფიქსირებული წესი</span>' : '<span class="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">გამოსათვლელი (x)</span>'}</div>
          </div>
        </div>

        <!-- Interactive Adjuster -->
        <div class="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl">
          <label class="text-sm font-semibold text-slate-700 mb-2">დააყენეთ ჟანგვის რიცხვი:</label>
          <div class="flex items-center space-x-3">
            <button onclick="window.oxidationTrainer.adjustState(-1)" class="w-11 h-11 flex items-center justify-center bg-white border border-slate-300 rounded-xl font-extrabold text-xl hover:bg-slate-100 active:scale-95 shadow-sm transition">
              &minus;
            </button>
            <div class="w-20 text-center font-mono text-3xl font-extrabold ${currentState > 0 ? 'text-rose-600' : (currentState < 0 ? 'text-sky-600' : 'text-slate-600')}">
              ${this.formatState(currentState)}
            </div>
            <button onclick="window.oxidationTrainer.adjustState(+1)" class="w-11 h-11 flex items-center justify-center bg-white border border-slate-300 rounded-xl font-extrabold text-xl hover:bg-slate-100 active:scale-95 shadow-sm transition">
              &#43;
            </button>
          </div>
        </div>

        <!-- Algebraic Equation Walkthrough -->
        <div class="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 text-xs sm:text-sm">
          <div class="font-semibold text-indigo-900 mb-1 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            ალგებრული ბალანსის განტოლება:
          </div>
          <div class="font-mono text-slate-800 bg-white p-2.5 rounded-lg border border-indigo-200 overflow-x-auto">
            ${equationString}
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-3 pt-2">
          <button onclick="window.oxidationTrainer.checkCurrentAnswer()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow transition active:scale-98 flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            შემოწმება
          </button>
          <button onclick="window.oxidationTrainer.showHint()" class="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            მინიშნება
          </button>
        </div>

        <div id="trainerFeedbackBox" class="hidden rounded-xl p-3 text-sm"></div>
      </div>
    `;
  }

  adjustState(delta) {
    if (window.soundManager) window.soundManager.playClick();
    let current = this.studentStates[this.selectedAtomIndex] ?? 0;
    current += delta;
    if (current > 8) current = 8;
    if (current < -4) current = -4;
    this.studentStates[this.selectedAtomIndex] = current;
    this.renderFormulaExplorer();
    this.renderCalculationPanel();
  }

  checkCurrentAnswer() {
    const compound = this.compounds[this.currentCompoundIndex];
    const atom = compound.atoms[this.selectedAtomIndex];
    const userVal = this.studentStates[this.selectedAtomIndex];
    const fbBox = document.getElementById('trainerFeedbackBox');
    if (!fbBox) return;

    fbBox.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-800', 'border-emerald-200', 'bg-rose-50', 'text-rose-800', 'border-rose-200', 'border');
    fbBox.classList.add('border');

    if (userVal === atom.correctState) {
      if (window.soundManager) window.soundManager.playSuccess();
      fbBox.classList.add('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');
      fbBox.innerHTML = `
        <div class="flex items-start gap-2">
          <svg class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div>
            <div class="font-bold">ყოჩაღ! სწორია! (${atom.element} = ${this.formatState(atom.correctState)})</div>
            <div class="text-xs text-emerald-700 mt-1">${compound.explanation}</div>
          </div>
        </div>
      `;
      this.solvedCompounds.add(compound.id);
      this.updateProgress();
    } else {
      if (window.soundManager) window.soundManager.playError();
      fbBox.classList.add('bg-rose-50', 'text-rose-800', 'border-rose-200');
      fbBox.innerHTML = `
        <div class="flex items-start gap-2">
          <svg class="w-5 h-5 text-rose-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div>
            <div class="font-bold">არაუშავს, სცადეთ კიდევ ერთხელ!</div>
            <div class="text-xs text-rose-700 mt-1">დააკვირდით განტოლებას: ყველა ცნობილი ატომის ჟანგვის რიცხვების ჯამი უნდა აბალანსებდეს მოლეკულის მუხტს (${compound.charge}).</div>
          </div>
        </div>
      `;
    }
  }

  showHint() {
    if (window.soundManager) window.soundManager.playClick();
    const compound = this.compounds[this.currentCompoundIndex];
    const atom = compound.atoms[this.selectedAtomIndex];
    const fbBox = document.getElementById('trainerFeedbackBox');
    if (!fbBox) return;

    fbBox.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-800', 'border-emerald-200', 'bg-rose-50', 'text-rose-800', 'border-rose-200');
    fbBox.classList.add('border', 'bg-amber-50', 'text-amber-800', 'border-amber-200');
    fbBox.innerHTML = `
      <div class="flex items-start gap-2">
        <svg class="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <div>
          <div class="font-bold">მინიშნება:</div>
          <div class="text-xs text-amber-700 mt-0.5">
            ${atom.rule} <br/>
            თუ x არის ${atom.element}-ის ჟანგვის რიცხვი: ამოხსენით განტოლება ისე, რომ ჯამი გახდეს ${compound.charge}.
          </div>
        </div>
      </div>
    `;
  }

  clearFeedback() {
    const fbBox = document.getElementById('trainerFeedbackBox');
    if (fbBox) {
      fbBox.classList.add('hidden');
      fbBox.innerHTML = '';
    }
  }

  updateProgress() {
    const progressEl = document.getElementById('trainerProgressBadge');
    if (progressEl) {
      progressEl.textContent = `ათვისებულია: ${this.solvedCompounds.size} / ${this.compounds.length}`;
    }
  }
}

window.oxidationTrainer = new OxidationTrainer();
