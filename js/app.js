/**
 * app.js - Main Application Controller & UI Coordinator
 * Georgian 10th-grade Redox Chemistry Application
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Sound Manager toggle button
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const isEnabled = window.soundManager.toggle();
      soundToggleBtn.innerHTML = isEnabled
        ? `<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg><span class="hidden sm:inline text-xs font-semibold">ხმა: ჩართულია</span>`
        : `<svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg><span class="hidden sm:inline text-xs font-semibold">ხმა: გამორთულია</span>`;
    });
  }

  // Initialize Beketov series bar in reference drawer
  if (window.activitySeriesManager) {
    window.activitySeriesManager.renderSeriesBar('beketovSeriesContainer');
    initDisplacementPredictor();
  }

  // Initialize Module 1: Oxidation Trainer
  if (window.oxidationTrainer) {
    window.oxidationTrainer.init();
  }

  // Initialize Module 2: Redox Lab
  if (window.redoxLab) {
    window.redoxLab.init('redoxCanvas');
  }

  // Initialize Module 3: Balance Workshop
  if (window.balanceWorkshop) {
    window.balanceWorkshop.init();
  }

  // Initialize Module 4: Case Assessment
  if (window.caseAssessment) {
    window.caseAssessment.init();
  }

  // Tab Navigation Handling
  window.switchTab = function(tabId) {
    if (window.soundManager) window.soundManager.playClick();

    const tabs = ['tab_trainer', 'tab_lab', 'tab_workshop', 'tab_cases'];
    tabs.forEach(t => {
      const el = document.getElementById(t);
      const btn = document.getElementById(`btn_${t}`);
      if (el) {
        if (t === tabId) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
      if (btn) {
        if (t === tabId) {
          btn.className = 'tab-btn active px-4 py-3 text-sm sm:text-base font-bold text-blue-600 border-b-2 border-blue-600 flex items-center gap-2 whitespace-nowrap';
        } else {
          btn.className = 'tab-btn px-4 py-3 text-sm sm:text-base font-semibold text-slate-600 hover:text-slate-900 border-b-2 border-transparent flex items-center gap-2 whitespace-nowrap transition';
        }
      }
    });

    // If switching to Lab tab, trigger canvas resize to ensure crisp pixel ratio
    if (tabId === 'tab_lab' && window.redoxLab) {
      setTimeout(() => window.redoxLab.resizeCanvas(), 50);
    }
  };

  // Beketov Modal Handlers
  window.openBeketovModal = function() {
    if (window.soundManager) window.soundManager.playClick();
    const modal = document.getElementById('beketovModal');
    if (modal) modal.classList.remove('hidden');
  };

  window.closeBeketovModal = function() {
    if (window.soundManager) window.soundManager.playClick();
    const modal = document.getElementById('beketovModal');
    if (modal) modal.classList.add('hidden');
  };

  // Safety Modal Handlers
  window.openSafetyModal = function() {
    if (window.soundManager) window.soundManager.playClick();
    const modal = document.getElementById('safetyModal');
    if (modal) modal.classList.remove('hidden');
  };

  window.closeSafetyModal = function() {
    if (window.soundManager) window.soundManager.playClick();
    const modal = document.getElementById('safetyModal');
    if (modal) modal.classList.add('hidden');
  };

  // Certificate printing / saving
  window.printCertificate = function() {
    const studentInput = document.getElementById('certStudentNameInput');
    const studentDisplay = document.getElementById('certStudentName');
    if (studentInput && studentDisplay) {
      studentDisplay.textContent = studentInput.value.trim() || 'X კლასის წარჩინებული მოსწავლე';
    }
    window.print();
  };
});

function initDisplacementPredictor() {
  const metalASelect = document.getElementById('predMetalA');
  const saltBSelect = document.getElementById('predSaltB');
  const resultDiv = document.getElementById('predResult');

  if (!metalASelect || !saltBSelect || !resultDiv) return;

  const series = window.activitySeriesManager.series.filter(m => m.symbol !== 'H₂');

  metalASelect.innerHTML = series.map(m => `<option value="${m.symbol}">${m.name} (${m.symbol})</option>`).join('');
  saltBSelect.innerHTML = series.map(m => `<option value="${m.symbol}">${m.name} (${m.symbol}-ის მარილი)</option>`).join('');

  // Default selection: Zn and Cu
  metalASelect.value = 'Zn';
  saltBSelect.value = 'Cu';

  window.runDisplacementPrediction = function() {
    if (window.soundManager) window.soundManager.playClick();
    const metalA = metalASelect.value;
    const metalB = saltBSelect.value;
    const res = window.activitySeriesManager.predictDisplacement(metalA, metalB);

    resultDiv.innerHTML = `
      <div class="p-3.5 rounded-xl border text-xs sm:text-sm ${res.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : (res.special ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-rose-50 text-rose-900 border-rose-300')}">
        <div class="font-bold mb-1">${metalA} + ${metalB}-ის მარილის წყალხსნარი:</div>
        <div>${res.text}</div>
      </div>
    `;
  };

  // Run once initially
  window.runDisplacementPrediction();
}
