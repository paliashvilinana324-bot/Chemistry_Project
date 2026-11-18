/**
 * caseAssessment.js - ცოდნის შემოწმება და რეალური სიტუაციური ქეისები
 * Formative Assessment & Real-World Scenarios (Georgian 10th Grade ESG)
 */

const CASE_QUESTIONS = [
  {
    id: 'case1',
    category: 'ბექეტოვის ძაბვის მწკრივი',
    title: 'ქეისი 1: ლურსმანი და ვერცხლის მონეტა სპილენძის სულფატის ხსნარში',
    scenario: 'ლაბორატორიაში მოსწავლემ ორ სხვადასხვა ჭიქაში ჩაასხა ცისფერი CuSO₄-ის ხსნარი. პირველ ჭიქაში ჩადო რკინის (Fe) ლურსმანი, ხოლო მეორეში — სუფთა ვერცხლის (Ag) მონეტა. რა მოხდება თითოეულ ჭიქაში?',
    options: [
      { id: 'a', text: 'ორივე ჭიქაში წარიმართება რეაქცია და ორივე მეტალი დაიფარება წითელი სპილენძით.', isCorrect: false },
      { id: 'b', text: 'პირველ ჭიქაში (Fe) ლურსმანი დაიფარება სპილენძის ფენით, ხოლო მეორეში (Ag) არანაირი ცვლილება არ მოხდება.', isCorrect: true },
      { id: 'c', text: 'მეორე ჭიქაში (Ag) წარიმართება რეაქცია, ხოლო რკინის ჭიქაში არაფერი შეიცვლება.', isCorrect: false },
      { id: 'd', text: 'არცერთ ჭიქაში არ წარიმართება რეაქცია, რადგან CuSO₄ სტაბილური მარილია.', isCorrect: false }
    ],
    hint: 'გაიხსენეთ ბექეტოვის ელექტროქიმიური ძაბვის მწკრივი: Fe დგას Cu-ს მარცხნივ, ხოლო Ag — Cu-ს მარჯვნივ!',
    explanation: 'ბექეტოვის ძაბვის მწკრივში რკინა (Fe) დგას სპილენძის (Cu) მარცხნივ, ამიტომ Fe უფრო ძლიერი აღმდგენია და განდევნის Cu-ს მისი მარილის ხსნარიდან (Fe + CuSO₄ &rarr; FeSO₄ + Cu&darr;). ვერცხლი (Ag) კი დგას სპილენძის მარჯვნივ, ის უფრო სუსტი აღმდგენია და Cu²⁺ იონს ვერ აღადგენს!'
  },
  {
    id: 'case2',
    category: 'კოროზიისგან დაცვა',
    title: 'ქეისი 2: გემების კორპუსების პროტექტორული დაცვა',
    scenario: 'ოკეანეში მცურავი ფოლადის (რკინის შენადნობის) გემების კორპუსებსა და წყალქვეშა მილსადენებზე სპეციალურად ამაგრებენ თუთიის (Zn) ფილებს. რატომ იცავს თუთია რკინას დაჟანგვისგან (კოროზიისგან)?',
    options: [
      { id: 'a', text: 'თუთია უფრო ინერტული ლითონია და ქმნის გაუმტარ ჯავშანს რკინის ზედაპირზე.', isCorrect: false },
      { id: 'b', text: 'თუთია რკინაზე უფრო აქტიური მეტალია (დგას მარცხნივ), ამიტომ ელექტრონებს ის გასცემს (თავად იჟანგება და იშლება), რკინას კი აღდგენილ მდგომარეობაში ინარჩუნებს.', isCorrect: true },
      { id: 'c', text: 'თუთია ზღვის წყალში არსებულ ჟანგბადს შლის და კლავს კოროზიის გამომწვევ ბაქტერიებს.', isCorrect: false },
      { id: 'd', text: 'თუთიასა და რკინას შორის არანაირი ელექტროქიმიური კავშირი არ მყარდება.', isCorrect: false }
    ],
    hint: 'ამ მეთოდს ჰქვია "პროტექტორული (მსხვერპლშეწირვითი) დაცვა". რომელი მეტალი გასცემს ელექტრონებს პირველ რიგში?',
    explanation: 'თუთია (Zn) ელექტროქიმიური ძაბვის მწკრივში რკინაზე (Fe) მარცხნივ დგას და გააჩნია უფრო უარყოფითი სტანდარტული პოტენციალი (-0.76 V vs -0.44 V). კოროზიულ არეში თუთია ხდება ანოდი (იჟანგება Zn &rarr; Zn²⁺ + 2e⁻) და "საკუთარ თავს სწირავს", რითაც რკინას იცავს დაჟანგვისგან!'
  },
  {
    id: 'case3',
    category: 'ელექტროქიმიური ენერგია',
    title: 'ქეისი 3: სმარტფონის ლითიუმ-იონური ბატარეა',
    scenario: 'როდესაც სმარტფონს იყენებთ (აკუმულატორი იცლება / განიმუხტება), მიმდინარეობს ჟანგვა-აღდგენითი რეაქცია. რა ემართება ლითიუმს (Li) განმუხტვის დროს ანოდზე?',
    options: [
      { id: 'a', text: 'Li ატომები იჟანგება (კარგავენ ელექტრონს: Li &rarr; Li⁺ + e⁻) და წარმოქმნიან ელექტრულ დენს გარე წრედში.', isCorrect: true },
      { id: 'b', text: 'Li⁺ იონები აღდგება და იძენს ელექტრონებს ბატარეის გასაგრილებლად.', isCorrect: false },
      { id: 'c', text: 'ლითიუმი გარდაიქმნება ჰელიუმად ბირთვული რეაქციის შედეგად.', isCorrect: false },
      { id: 'd', text: 'არანაირი ელექტრონების გადაცემა არ ხდება, ენერგია მხოლოდ მაგნიტურია.', isCorrect: false }
    ],
    hint: 'ბატარეის განმუხტვისას (ენერგიის გაცემისას) ანოდზე ყოველთვის მიმდინარეობს ჟანგვა!',
    explanation: 'განმუხტვის დროს უარყოფით ელექტროდზე (ანოდზე) ლითიუმი იჟანგება: Li &rarr; Li⁺ + e⁻. გამოთავისუფლებული ელექტრონები მიემართებიან გარე წრედში (სმარტფონის პროცესორისა და ეკრანის საკვებად), ხოლო Li⁺ იონები ელექტროლიტის გავლით გადადიან კათოდისკენ!'
  },
  {
    id: 'case4',
    category: 'აზოტმჟავას თავისებურება',
    title: 'ქეისი 4: რატომ არ გამოიყოფა წყალბადი (H₂) სპილენძისა და აზოტმჟავას ურთიერთქმედებისას?',
    scenario: 'ქიმიის გაკვეთილზე მოსწავლეებმა სპილენძის (Cu) ნაქლიბს დაასხეს განზავებული აზოტმჟავა (HNO₃). გამოიყო უფერო აირი (NO), რომელიც ჰაერზე მაშინვე გაყავისფრდა (NO₂). რატომ არ გამოიყო წყალბადის აირი (H₂), როგორც ეს მარილმჟავასთან ხდება ხოლმე?',
    options: [
      { id: 'a', text: 'სპილენძი ბექეტოვის მწკრივში წყალბადის შემდეგ დგას და HNO₃-ში უფრო ძლიერი მჟანგავია აზოტი (N⁺⁵) და არა წყალბადის იონი (H⁺).', isCorrect: true },
      { id: 'b', text: 'აზოტმჟავა წყალბადს არ შეიცავს.', isCorrect: false },
      { id: 'c', text: 'გამოყოფილი წყალბადი მაშინვე დაიწვა ჰაერზე და ამიტომ ვერ შეამჩნიეს.', isCorrect: false },
      { id: 'd', text: 'სპილენძი საერთოდ არ შედის რეაქციაში არცერთ მჟავასთან.', isCorrect: false }
    ],
    hint: 'აზოტმჟავა ცნობილია როგორც "მჟანგავი მჟავა". მისი ცენტრალური აზოტის ატომი N⁺⁵ გაცილებით ძლიერი მჟანგავია, ვიდრე H⁺.',
    explanation: 'აზოტმჟავა (HNO₃) განსაკუთრებული მჟავაა. მასში ელექტრონების მიმღები (მჟანგავი) არის არა წყალბად-იონი H⁺, არამედ აზოტის ატომი N⁺⁵. ამიტომ სპილენძთან რეაქციისას აღდგება აზოტი (წარმოიქმნება NO ან NO₂), ხოლო წყალბადი შედის წყლის (H₂O) შედგენილობაში!'
  },
  {
    id: 'case5',
    category: 'ანტიოქსიდანტები ყოველდღიურობაში',
    title: 'ქეისი 5: რატომ არ ყავისფრდება გაჭრილი ვაშლი, თუ ლიმონის წვენს მოვაპკურებთ?',
    scenario: 'გაჭრილი ვაშლის ზედაპირი ჰაერზე მალე ყავისფრდება (ჰაერის ჟანგბადი ჟანგავს ვაშლში არსებულ პოლიფენოლებს). თუ ვაშლს ლიმონის წვენს მოვაპკურებთ, ის საათობით ინარჩუნებს ბუნებრივ ფერს. რა არის ლიმონის წვენის (ასკორბინის მჟავა - C ვიტამინი) ქიმიური როლი?',
    options: [
      { id: 'a', text: 'C ვიტამინი არის ძლიერი აღმდგენი (ანტიოქსიდანტი), რომელიც ჰაერის ჟანგბადს ასწრებს დაჟანგვას (თავად იჟანგება), რითაც იცავს ვაშლის ნაერთებს.', isCorrect: true },
      { id: 'b', text: 'C ვიტამინი არის ძლიერი მჟანგავი, რომელიც წვავს ვაშლის ზედაპირულ უჯრედებს.', isCorrect: false },
      { id: 'c', text: 'ლიმონის წვენი ქმნის ცვილისებრ მექანიკურ აპკს და ქიმიური რეაქცია არ მიმდინარეობს.', isCorrect: false },
      { id: 'd', text: 'ლიმონის წვენი შლის ვაშლში არსებულ რკინას.', isCorrect: false }
    ],
    hint: 'სიტყვა "ანტიოქსიდანტი" ნიშნავს დაჟანგვის საწინააღმდეგო აგენტს. ასეთი ნივთიერებები თავად არიან აღმდგენები!',
    explanation: 'ასკორბინის მჟავა (C ვიტამინი) კლასიკური ანტიოქსიდანტია. ანტიოქსიდანტი თავისი ბუნებით არის აქტიური აღმდგენი: ის მარტივად გასცემს ელექტრონებს თავისუფალ რადიკალებზე და ჟანგბადზე, რითაც ხელს უშლის საკვები ნივთიერებების ფერმენტულ დაჟანგვას!'
  },
  {
    id: 'case6',
    category: 'ბიოქიმიური რედოქსი',
    title: 'ქეისი 6: უჯრედული სუნთქვა — ცოცხალი ორგანიზმის ენერგეტიკული ბალანსი',
    scenario: 'ჩვენს უჯრედებში მიმდინარეობს გლუკოზის დაჟანგვა: C₆H₁₂O₆ + 6O₂ &rarr; 6CO₂ + 6H₂O + ენერგია (ატფ). ვინ არის ამ სასიცოცხლო რეაქციაში აღმდგენი და ვინ — საბოლოო მჟანგავი?',
    options: [
      { id: 'a', text: 'გლუკოზა (ნახშირბადი) არის აღმდგენი (იჟანგება CO₂-მდე), ხოლო მოლეკულური ჟანგბადი (O₂) არის საბოლოო მჟანგავი (აღდგება H₂O-მდე).', isCorrect: true },
      { id: 'b', text: 'ჟანგბადი არის აღმდგენი, ხოლო გლუკოზა — მჟანგავი.', isCorrect: false },
      { id: 'c', text: 'ნახშირორჟანგი (CO₂) არის აღმდგენი, ხოლო წყალი (H₂O) — მჟანგავი.', isCorrect: false },
      { id: 'd', text: 'ეს არ არის ჟანგვა-აღდგენითი რეაქცია, არამედ მარტივი დაშლაა.', isCorrect: false }
    ],
    hint: 'დააკვირდით ჟანგბადს: მარცხნივ O₂⁰ არის 0, მარჯვნივ H₂O-ში ჟანგბადის ჟანგვის რიცხვი ხდება -2 (შეიძინა ელექტრონები).',
    explanation: 'უჯრედულ სუნთქვაში ორგანული ნივთიერების (გლუკოზის) ნახშირბადი იჟანგება (ჟანგვის რიცხვი იზრდება და გამოიყოფა CO₂), ხოლო ჩვენ მიერ ჩასუნთქული მოლეკულური ჟანგბადი O₂⁰ იძენს ელექტრონებს და წყალბადის პროტონებს, აღდგება H₂O⁻²-მდე. გამოყოფილი ენერგია კი ინახება ატფ-ის მოლეკულებში!'
  }
];

class CaseAssessment {
  constructor() {
    this.questions = CASE_QUESTIONS;
    this.currentIdx = 0;
    this.userAnswers = {}; // question id => selected option id
    this.scores = 0;
    this.answeredCount = 0;
  }

  init() {
    this.renderQuestionList();
    this.loadQuestion(0);
  }

  renderQuestionList() {
    const listContainer = document.getElementById('caseNavList');
    if (!listContainer) return;

    listContainer.innerHTML = this.questions.map((q, idx) => `
      <button onclick="window.caseAssessment.loadQuestion(${idx})"
              id="caseNavBtn_${idx}"
              class="w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition flex items-center justify-between ${idx === 0 ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}">
        <span class="truncate pr-2">${q.title.split(':')[0]}</span>
        <span id="caseNavStatus_${idx}" class="text-xs">⚪</span>
      </button>
    `).join('');
  }

  loadQuestion(idx) {
    if (window.soundManager) window.soundManager.playClick();
    this.currentIdx = idx;
    const q = this.questions[idx];

    // Update active nav button
    this.questions.forEach((_, i) => {
      const btn = document.getElementById(`caseNavBtn_${i}`);
      if (btn) {
        if (i === idx) {
          btn.className = 'w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-bold bg-blue-50 border-blue-400 text-blue-900 shadow-sm flex items-center justify-between';
        } else {
          btn.className = 'w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-between';
        }
      }
    });

    const cardContainer = document.getElementById('caseQuestionCard');
    if (!cardContainer) return;

    const alreadyAnswered = this.userAnswers[q.id];

    let optionsHtml = q.options.map(opt => {
      let optStyle = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/50';
      if (alreadyAnswered) {
        if (opt.id === alreadyAnswered) {
          optStyle = opt.isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold' : 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
        } else if (opt.isCorrect) {
          optStyle = 'border-emerald-400 bg-emerald-50/70 text-emerald-900';
        }
      }

      return `
        <label class="flex items-start p-3.5 rounded-xl border-2 cursor-pointer transition ${optStyle}">
          <input type="radio" name="case_opt" value="${opt.id}"
                 ${alreadyAnswered === opt.id ? 'checked' : ''}
                 ${alreadyAnswered ? 'disabled' : ''}
                 onchange="window.caseAssessment.selectOption('${opt.id}')"
                 class="mt-1 mr-3 text-blue-600 focus:ring-blue-500" />
          <span class="text-sm text-slate-800 leading-relaxed">${opt.text}</span>
        </label>
      `;
    }).join('');

    cardContainer.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wide">
            ${q.category}
          </span>
          <span class="text-xs font-semibold text-slate-500">ქეისი ${idx + 1} / ${this.questions.length}</span>
        </div>

        <h3 class="text-lg font-bold text-slate-900">${q.title}</h3>

        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 leading-relaxed">
          ${q.scenario}
        </div>

        <div class="space-y-2 pt-2">
          ${optionsHtml}
        </div>

        <div class="flex items-center space-x-3 pt-3">
          <button onclick="window.caseAssessment.checkAnswer()"
                  id="caseSubmitBtn"
                  ${alreadyAnswered ? 'disabled' : ''}
                  class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            პასუხის შემოწმება
          </button>
          <button onclick="window.caseAssessment.showHint()"
                  class="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            მინიშნება
          </button>
        </div>

        <div id="caseFeedbackBox" class="${alreadyAnswered ? '' : 'hidden'} rounded-xl p-4 text-sm mt-3">
          ${alreadyAnswered ? this.getFeedbackContent(q, alreadyAnswered) : ''}
        </div>
      </div>
    `;
  }

  selectOption(optId) {
    if (window.soundManager) window.soundManager.playClick();
    this.selectedTempOption = optId;
  }

  checkAnswer() {
    const q = this.questions[this.currentIdx];
    const radios = document.getElementsByName('case_opt');
    let chosen = null;
    for (let r of radios) {
      if (r.checked) {
        chosen = r.value;
        break;
      }
    }

    if (!chosen) {
      alert('გთხოვთ აირჩიოთ ერთ-ერთი სავარაუდო პასუხი!');
      return;
    }

    this.userAnswers[q.id] = chosen;
    const selectedOpt = q.options.find(o => o.id === chosen);
    const isCorrect = selectedOpt && selectedOpt.isCorrect;

    const navStatus = document.getElementById(`caseNavStatus_${this.currentIdx}`);
    if (navStatus) {
      navStatus.textContent = isCorrect ? '✅' : '❌';
    }

    if (isCorrect) {
      if (window.soundManager) window.soundManager.playSuccess();
      this.scores++;
    } else {
      if (window.soundManager) window.soundManager.playError();
    }

    this.answeredCount++;
    this.loadQuestion(this.currentIdx);
    this.updateScoreSummary();
  }

  showHint() {
    if (window.soundManager) window.soundManager.playClick();
    const q = this.questions[this.currentIdx];
    const fbBox = document.getElementById('caseFeedbackBox');
    if (!fbBox) return;

    fbBox.className = 'rounded-xl p-3.5 text-sm mt-3 border bg-amber-50 text-amber-900 border-amber-200';
    fbBox.innerHTML = `💡 <b>მინიშნება:</b> ${q.hint}`;
  }

  getFeedbackContent(q, chosenId) {
    const selectedOpt = q.options.find(o => o.id === chosenId);
    const isCorrect = selectedOpt && selectedOpt.isCorrect;

    const colorClass = isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-900 border-rose-300';

    return `
      <div class="border rounded-xl p-4 ${colorClass}">
        <div class="font-bold text-base mb-1">${isCorrect ? '🎉 სწორია! ყოჩაღ!' : '❌ პასუხი არასწორია.'}</div>
        <div class="text-xs sm:text-sm leading-relaxed">${q.explanation}</div>
      </div>
    `;
  }

  updateScoreSummary() {
    const summaryBadge = document.getElementById('caseScoreBadge');
    if (summaryBadge) {
      summaryBadge.textContent = `შედეგი: ${this.scores} / ${this.questions.length}`;
    }

    // If all questions are answered, show certificate button
    const certBtn = document.getElementById('openCertificateBtn');
    if (certBtn && this.answeredCount >= this.questions.length) {
      certBtn.classList.remove('hidden');
    }
  }

  openCertificateModal() {
    if (window.soundManager) window.soundManager.playSuccess();
    const modal = document.getElementById('certificateModal');
    if (!modal) return;

    const certDate = document.getElementById('certDate');
    const certScore = document.getElementById('certScore');

    if (certDate) {
      const now = new Date();
      certDate.textContent = now.toLocaleDateString('ka-GE', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    if (certScore) {
      certScore.textContent = `${this.scores} / ${this.questions.length}`;
    }

    modal.classList.remove('hidden');
  }

  closeCertificateModal() {
    if (window.soundManager) window.soundManager.playClick();
    const modal = document.getElementById('certificateModal');
    if (modal) modal.classList.add('hidden');
  }
}

window.caseAssessment = new CaseAssessment();
