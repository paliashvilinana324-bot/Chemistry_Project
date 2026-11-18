/**
 * activitySeries.js - ბექეტოვის ელექტროქიმიური ძაბვის მწკრივი და ინტერაქტიული სიმულატორი
 * Georgian National Curriculum 10th Grade Standard
 */

const BEKETOV_SERIES = [
  { symbol: 'Li', name: 'ლითიუმი', e0: -3.04, category: 'alkali', info: 'უაღრესად აქტიური, რეაგირებს ცივ წყალთან' },
  { symbol: 'K',  name: 'კალიუმი',  e0: -2.93, category: 'alkali', info: 'უაღრესად აქტიური, ენერგიულად შლის წყალს' },
  { symbol: 'Ba', name: 'ბარიუმი',  e0: -2.90, category: 'alkaline-earth', info: 'აქტიური ტუტემიწა ლითონი' },
  { symbol: 'Ca', name: 'კალციუმი', e0: -2.87, category: 'alkaline-earth', info: 'აქტიური ტუტემიწა ლითონი' },
  { symbol: 'Na', name: 'ნატრიუმი', e0: -2.71, category: 'alkali', info: 'ენერგიულად ურთიერთქმედებს წყალთან' },
  { symbol: 'Mg', name: 'მაგნიუმი', e0: -2.37, category: 'active', info: 'რეაგირებს ცხელ წყალთან და მჟავებთან' },
  { symbol: 'Al', name: 'ალუმინი',  e0: -1.66, category: 'active', info: 'აქტიური მეტალი, დაცულია ოქსიდური აპკით' },
  { symbol: 'Mn', name: 'მანგანუმი',e0: -1.18, category: 'medium', info: 'საშუალო აქტივობის გარდამავალი მეტალი' },
  { symbol: 'Zn', name: 'თუთია',    e0: -0.76, category: 'medium', info: 'განდევნის Cu, Pb, Fe-ს; აძევებს H₂-ს' },
  { symbol: 'Cr', name: 'ქრომი',    e0: -0.74, category: 'medium', info: 'საშუალო აქტივობის ლითონი' },
  { symbol: 'Fe', name: 'რკინა',    e0: -0.44, category: 'medium', info: 'განდევნის Cu-ს მარილებიდან; აძევებს H₂-ს' },
  { symbol: 'Cd', name: 'კადმიუმი', e0: -0.40, category: 'medium', info: 'ტოქსიკური მძიმე მეტალი' },
  { symbol: 'Co', name: 'კობალტი',  e0: -0.28, category: 'medium', info: 'აძევებს H₂-ს მჟავებიდან' },
  { symbol: 'Ni', name: 'ნიკელი',   e0: -0.25, category: 'medium', info: 'აძევებს H₂-ს მჟავებიდან' },
  { symbol: 'Sn', name: 'კალა',     e0: -0.14, category: 'weak',   info: 'სუსტი აღმდგენი' },
  { symbol: 'Pb', name: 'ტყვია',    e0: -0.13, category: 'weak',   info: 'უშუალოდ წყალბადის წინ მდგომი მეტალი' },
  { symbol: 'H₂', name: 'წყალბადი (სტანდარტი)', e0: 0.00, category: 'reference', info: 'ნულოვანი პოტენციალის ეტალონი' },
  { symbol: 'Cu', name: 'სპილენძი', e0: +0.34, category: 'noble',  info: 'არ აძევებს H₂-ს ჩვეულებრივი მჟავებიდან' },
  { symbol: 'Hg', name: 'ვერცხლისწყალი', e0: +0.79, category: 'noble', info: 'თხევადი, პასიური მეტალი' },
  { symbol: 'Ag', name: 'ვერცხლი',  e0: +0.80, category: 'noble',  info: 'კეთილშობილი მეტალი, სუსტი აღმდგენი' },
  { symbol: 'Pt', name: 'პლატინა',  e0: +1.20, category: 'noble',  info: 'ინერტული კეთილშობილი ლითონი' },
  { symbol: 'Au', name: 'ოქრო',     e0: +1.50, category: 'noble',  info: 'ყველაზე ინერტული მეტალი' }
];

class ActivitySeriesManager {
  constructor() {
    this.series = BEKETOV_SERIES;
  }

  renderSeriesBar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
      <div class="overflow-x-auto pb-4">
        <div class="flex items-center min-w-max space-x-1.5 p-3 bg-slate-900 rounded-xl text-white shadow-inner">
    `;

    this.series.forEach((item) => {
      const isH = item.symbol === 'H₂';
      const isAlkali = item.category === 'alkali' || item.category === 'alkaline-earth';
      const isNoble = item.category === 'noble';

      let bgClass = 'bg-slate-700 text-slate-100 hover:bg-slate-600';
      if (isH) {
        bgClass = 'bg-amber-500 text-slate-950 font-extrabold ring-2 ring-amber-300';
      } else if (isAlkali) {
        bgClass = 'bg-rose-900/80 text-rose-200 border border-rose-500/40 hover:bg-rose-800';
      } else if (isNoble) {
        bgClass = 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/40 hover:bg-emerald-900';
      }

      html += `
        <div class="flex flex-col items-center p-2 rounded-lg ${bgClass} transition-all cursor-pointer text-center min-w-[54px]"
             title="${item.name}: E° = ${item.e0 > 0 ? '+' : ''}${item.e0}V | ${item.info}">
          <span class="text-base font-bold font-mono">${item.symbol}</span>
          <span class="text-[10px] opacity-80">${item.e0 > 0 ? '+' : ''}${item.e0}V</span>
        </div>
      `;
    });

    html += `
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-between text-xs text-slate-600 mt-2 px-1 gap-2">
        <span class="flex items-center font-semibold text-orange-600">
          <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/></svg>
          მარცხნივ: აღდგენითი აქტივობა იზრდება (ელექტრონს ადვილად გასცემს)
        </span>
        <span class="flex items-center font-semibold text-sky-600">
          მარჯვნივ: მჟანგავის ძალა იზრდება (იონები ადვილად იძენენ ელექტრონს)
          <svg class="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </span>
      </div>
    `;

    container.innerHTML = html;
  }

  predictDisplacement(metalSymbol, saltMetalSymbol) {
    const metalIdx = this.series.findIndex(m => m.symbol === metalSymbol);
    const saltIdx = this.series.findIndex(m => m.symbol === saltMetalSymbol);

    if (metalIdx === -1 || saltIdx === -1) {
      return { success: false, reason: 'უცნობი ელემენტი' };
    }

    if (metalIdx < 5) { // Li, K, Ba, Ca, Na
      return {
        success: false,
        proceeds: true,
        special: true,
        text: `⚠️ განსაკუთრებული შემთხვევა! ${metalSymbol} არის ზეაქტიური ტუტე/ტუტემიწა მეტალი. წყალხსნარში ის პირველ რიგში მომენტალურად და ენერგიულად იმოქმედებს წყალთან (H₂O), გამოყოფს H₂-ს და წარმოქმნის ტუტეს, ნაცვლად ${saltMetalSymbol}-ის მარტივი განდევნისა!`
      };
    }

    if (metalIdx < saltIdx) {
      return {
        success: true,
        proceeds: true,
        text: `✅ რეაქცია წარიმართება! რადგან ${metalSymbol} ბექეტოვის მწკრივში დგას ${saltMetalSymbol}-ის მარცხნივ, ის უფრო ძლიერი აღმდგენია (E° უფრო უარყოფითია) და განდევნის მას მარილის წყალხსნარიდან.`
      };
    } else if (metalIdx === saltIdx) {
      return {
        success: false,
        proceeds: false,
        text: `ℹ️ ერთი და იგივე ლითონია. რეაქცია არ მიმდინარეობს.`
      };
    } else {
      return {
        success: false,
        proceeds: false,
        text: `❌ რეაქცია არ წარიმართება! ${metalSymbol} დგას ${saltMetalSymbol}-ის მარჯვნივ. ის უფრო სუსტი აღმდგენია და ვერ შეძლებს ${saltMetalSymbol}-ის განდევნას.`
      };
    }
  }
}

window.activitySeriesManager = new ActivitySeriesManager();
