/**
 * redoxLab.js - ვირტუალური ლაბორატორია: ელექტრონების გადასვლა და გალვანური ელემენტი
 * Canvas-based Real-time 60FPS Physics and Chemical Simulation
 * 10th-grade Georgian Chemistry Curriculum
 */

// Canvas roundRect fallback polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, radii) {
    if (!radii) radii = 0;
    if (typeof radii === 'number') radii = [radii, radii, radii, radii];
    const r = radii[0] || 0;
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    return this;
  };
}

class RedoxLab {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.currentMode = 'displacement'; // 'displacement' or 'daniell'
    this.viewType = 'macro'; // 'macro' or 'atomic' (for displacement)
    this.isRunning = true;
    this.animationFrameId = null;
    this.simSpeed = 1.0;
    this.simTime = 0;

    // Displacement simulation state
    this.displacementProgress = 0; // 0 to 1
    this.cuAtomsDeposited = 0;
    this.znAtomsDissolved = 0;
    this.atomicParticles = [];

    // Daniell Cell state
    this.daniellSwitchClosed = true;
    this.daniellElectrons = [];
    this.saltBridgeIons = [];
    this.bulbBrightness = 1.0;
    this.voltage = 1.10; // Volts
  }

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Handle high DPI display
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.initParticles();
    this.initDaniellCircuit();
    this.startLoop();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = Math.floor(rect.width || 800);
    const targetHeight = 440;

    this.canvas.width = targetWidth * dpr;
    this.canvas.height = targetHeight * dpr;
    this.canvas.style.width = `${targetWidth}px`;
    this.canvas.style.height = `${targetHeight}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.width = targetWidth;
    this.height = targetHeight;
  }

  setMode(mode) {
    if (window.soundManager) window.soundManager.playClick();
    this.currentMode = mode;
    this.simTime = 0;
    this.resetSimulation();
    this.updateUIControls();
  }

  setViewType(type) {
    if (window.soundManager) window.soundManager.playClick();
    this.viewType = type;
    this.updateUIControls();
  }

  togglePlay() {
    if (window.soundManager) window.soundManager.playClick();
    this.isRunning = !this.isRunning;
    const playBtn = document.getElementById('labPlayBtn');
    if (playBtn) {
      playBtn.innerHTML = this.isRunning
        ? `<svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> შეჩერება`
        : `<svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> დაწყება`;
    }
  }

  resetSimulation() {
    if (window.soundManager) window.soundManager.playClick();
    this.displacementProgress = 0;
    this.cuAtomsDeposited = 0;
    this.znAtomsDissolved = 0;
    this.simTime = 0;
    this.initParticles();
    this.initDaniellCircuit();
  }

  setSpeed(speedVal) {
    this.simSpeed = parseFloat(speedVal);
  }

  toggleDaniellSwitch() {
    if (window.soundManager) window.soundManager.playClick();
    this.daniellSwitchClosed = !this.daniellSwitchClosed;
    const swBtn = document.getElementById('daniellSwitchBtn');
    if (swBtn) {
      swBtn.textContent = this.daniellSwitchClosed ? 'ჩამრთველი: ჩართულია (ON)' : 'ჩამრთველი: გამორთულია (OFF)';
      swBtn.className = this.daniellSwitchClosed
        ? 'px-4 py-2 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow transition'
        : 'px-4 py-2 rounded-xl font-bold text-sm bg-slate-300 hover:bg-slate-400 text-slate-700 transition';
    }
  }

  initParticles() {
    this.atomicParticles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      this.atomicParticles.push({
        x: 320 + Math.random() * 260,
        y: 120 + Math.random() * 220,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        type: 'Cu2+', // blue ion
        electronsTransferring: 0,
        targetStripX: 280
      });
    }
  }

  initDaniellCircuit() {
    this.daniellElectrons = [];
    for (let i = 0; i < 24; i++) {
      this.daniellElectrons.push({
        progress: i / 24, // 0 to 1 along the wire path
        speed: 0.003
      });
    }

    this.saltBridgeIons = [];
    for (let i = 0; i < 16; i++) {
      this.saltBridgeIons.push({
        t: Math.random(),
        type: i % 2 === 0 ? 'K+' : 'Cl-' // K+ travels towards cathode (right), Cl- towards anode (left)
      });
    }
  }

  startLoop() {
    const loop = () => {
      this.update();
      this.render();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  update() {
    if (!this.isRunning) return;

    this.simTime += 0.016 * this.simSpeed;

    if (this.currentMode === 'displacement') {
      if (this.displacementProgress < 1.0) {
        this.displacementProgress = Math.min(1.0, this.displacementProgress + 0.0006 * this.simSpeed);
      }

      // Update atomic particles
      this.atomicParticles.forEach(p => {
        p.x += p.vx * this.simSpeed;
        p.y += p.vy * this.simSpeed;

        // Bounce inside solution
        if (p.x > 620) p.vx *= -1;
        if (p.y < 120 || p.y > 350) p.vy *= -1;

        // Approach zinc strip (at x ~ 280)
        if (p.type === 'Cu2+' && p.x < 300) {
          // Electron transfer event!
          p.type = 'Cu_metal';
          p.vx = 0;
          p.vy = 0;
          p.x = 275 - Math.random() * 8;
          this.cuAtomsDeposited++;
          if (this.cuAtomsDeposited % 4 === 0 && window.soundManager) {
            window.soundManager.playElectronSpark();
          }

          // Spawn dissolved Zn2+
          this.atomicParticles.push({
            x: 290,
            y: p.y,
            vx: 0.8 + Math.random() * 0.5,
            vy: (Math.random() - 0.5) * 1.5,
            type: 'Zn2+'
          });
          this.znAtomsDissolved++;
        }
      });
    } else {
      // Daniell cell mode
      if (this.daniellSwitchClosed) {
        this.daniellElectrons.forEach(e => {
          e.progress += e.speed * this.simSpeed;
          if (e.progress > 1.0) e.progress = 0;
        });

        this.saltBridgeIons.forEach(ion => {
          if (ion.type === 'K+') {
            ion.t += 0.002 * this.simSpeed;
            if (ion.t > 1.0) ion.t = 0;
          } else {
            ion.t -= 0.002 * this.simSpeed;
            if (ion.t < 0) ion.t = 1.0;
          }
        });
      }
    }
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.currentMode === 'displacement') {
      if (this.viewType === 'macro') {
        this.renderDisplacementMacro();
      } else {
        this.renderDisplacementAtomic();
      }
    } else {
      this.renderDaniellCell();
    }
  }

  // ==========================================
  // DISPLACEMENT SIMULATION RENDERING
  // ==========================================
  renderDisplacementMacro() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#f8fafc');
    bgGrad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Beaker position
    const beakerX = w * 0.5 - 140;
    const beakerY = 80;
    const beakerW = 280;
    const beakerH = 290;

    // Solution color: transitions from CuSO4 deep blue to ZnSO4 transparent/very faint greenish
    const blueAlpha = Math.max(0.08, 0.75 * (1 - this.displacementProgress));
    ctx.fillStyle = `rgba(14, 165, 233, ${blueAlpha})`;
    ctx.beginPath();
    ctx.roundRect(beakerX + 10, beakerY + 60, beakerW - 20, beakerH - 70, [0, 0, 16, 16]);
    ctx.fill();

    // Solution surface meniscus
    ctx.strokeStyle = `rgba(2, 132, 199, ${blueAlpha + 0.2})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(beakerX + beakerW / 2, beakerY + 60, beakerW / 2 - 10, 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Beaker glass outline
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(beakerX, beakerY);
    ctx.lineTo(beakerX, beakerY + beakerH - 20);
    ctx.quadraticCurveTo(beakerX, beakerY + beakerH, beakerX + 20, beakerY + beakerH);
    ctx.lineTo(beakerX + beakerW - 20, beakerY + beakerH);
    ctx.quadraticCurveTo(beakerX + beakerW, beakerY + beakerH, beakerX + beakerW, beakerY + beakerH - 20);
    ctx.lineTo(beakerX + beakerW, beakerY);
    ctx.stroke();

    // Graduation marks on beaker
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
    ctx.lineWidth = 2;
    for (let i = 1; i <= 4; i++) {
      const markY = beakerY + 80 + i * 40;
      ctx.beginPath();
      ctx.moveTo(beakerX + 12, markY);
      ctx.lineTo(beakerX + 35, markY);
      ctx.stroke();
      ctx.fillStyle = '#64748b';
      ctx.font = '11px monospace';
      ctx.fillText(`${i * 100} მლ`, beakerX + 40, markY + 4);
    }

    // Zinc Metal Plate immersed into beaker
    const stripX = beakerX + beakerW / 2 - 30;
    const stripY = 30;
    const stripW = 60;
    const stripH = 290;

    // Upper part of strip (unsubmerged - pure metallic zinc)
    ctx.fillStyle = '#94a3b8'; // silvery zinc
    ctx.fillRect(stripX, stripY, stripW, 110);

    // Lower part of strip (submerged - coating with copper sponge)
    const copperCoverage = this.displacementProgress;
    ctx.fillStyle = '#64748b';
    ctx.fillRect(stripX, stripY + 110, stripW, stripH - 110);

    // Reddish-brown copper layer deposit
    if (copperCoverage > 0.05) {
      const cuGrad = ctx.createLinearGradient(stripX, 0, stripX + stripW, 0);
      cuGrad.addColorStop(0, '#b45309');
      cuGrad.addColorStop(0.5, '#d97706');
      cuGrad.addColorStop(1, '#92400e');
      ctx.fillStyle = cuGrad;
      ctx.globalAlpha = Math.min(1.0, copperCoverage * 1.4);
      ctx.fillRect(stripX - 2, stripY + 115, stripW + 4, stripH - 120);

      // Irregular spongy texture dots
      ctx.fillStyle = '#78350f';
      for (let i = 0; i < 40 * copperCoverage; i++) {
        const dotX = stripX + Math.sin(i * 17) * 26 + 28;
        const dotY = stripY + 120 + (i * 4) % (stripH - 130);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    }

    // Border of strip
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(stripX, stripY, stripW, stripH);

    // Pedagogical Labels & Callouts
    this.renderBadge(stripX + stripW / 2, stripY - 14, 'თუთიის ფირფიტა (Zn)', '#334155', '#ffffff');
    this.renderBadge(beakerX + beakerW - 40, beakerY + 120, 'CuSO₄ ხსნარი (ცისფერი)', '#0284c7', '#ffffff');

    if (this.displacementProgress > 0.3) {
      this.renderBadge(stripX + stripW + 55, stripY + 200, 'გამოყოფილი Cu (მოწითალო-ყავისფერი)', '#b45309', '#ffffff');
    }

    // Reaction equation card at bottom
    this.renderBottomEquation(
      'Zn⁰ + Cu²⁺SO₄²⁻ &rarr; Zn²⁺SO₄²⁻ + Cu⁰&darr;',
      `პროგრესი: ${Math.round(this.displacementProgress * 100)}% | თუთია იჟანგება (კარგავს 2e⁻), სპილენძი აღდგება (იძენს 2e⁻)`
    );
  }

  renderDisplacementAtomic() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Split background: Left is Zinc Metal lattice, Right is Aqueous solution
    const splitX = 260;

    // Zinc Lattice Background
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, splitX, h);

    // Solution Background
    const blueAlpha = Math.max(0.12, 0.7 * (1 - this.displacementProgress));
    ctx.fillStyle = `rgba(14, 165, 233, ${blueAlpha})`;
    ctx.fillRect(splitX, 0, w - splitX, h);

    // Dividing boundary (Metal / Solution interface)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(splitX, 0);
    ctx.lineTo(splitX, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Zinc Atoms in lattice (Left side)
    const rows = 9;
    const cols = 5;
    const spacing = 42;
    for (let r = 1; r < rows; r++) {
      for (let c = 1; c <= cols; c++) {
        const atomX = splitX - c * spacing + 10;
        const atomY = r * spacing + 10;

        ctx.beginPath();
        ctx.arc(atomX, atomY, 16, 0, Math.PI * 2);
        ctx.fillStyle = '#94a3b8';
        ctx.fill();
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Zn⁰', atomX, atomY);
      }
    }

    // Render Hydrated and Depositing particles in solution
    this.atomicParticles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);

      if (p.type === 'Cu2+') {
        // Hydrated Cu2+ ion
        ctx.fillStyle = '#0284c7'; // bright blue
        ctx.fill();
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Cu²⁺', p.x, p.y);

        // Water hydration halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (p.type === 'Zn2+') {
        // Dissolved Zn2+ ion
        ctx.fillStyle = '#10b981'; // emerald green
        ctx.fill();
        ctx.strokeStyle = '#a7f3d0';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Zn²⁺', p.x, p.y);
      } else if (p.type === 'Cu_metal') {
        // Deposited Cu metal atom
        ctx.fillStyle = '#d97706'; // copper gold
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Cu⁰', p.x, p.y);
      }
    });

    // Animate Electron Transfer Spark at Interface
    const sparkY = 160 + Math.sin(this.simTime * 4) * 80;
    ctx.save();
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(splitX + 4, sparkY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('2e⁻', splitX + 4, sparkY);
    ctx.restore();

    // Headers & Labels
    this.renderBadge(110, 25, 'ლითონური თუთია (Zn კრისტალური მესერი)', '#1e293b', '#ffffff');
    this.renderBadge(splitX + 160, 25, 'CuSO₄ წყალხსნარი (Cu²⁺ და SO₄²⁻ იონები)', '#0369a1', '#ffffff');

    // Bottom half-reaction summary
    this.renderBottomEquation(
      'Zn⁰ &minus; 2e⁻ &rarr; Zn²⁺ (ჟანგვა) &nbsp;|&nbsp; Cu²⁺ + 2e⁻ &rarr; Cu⁰ (აღდგენა)',
      `მიკროსკოპული ხედი: თუთიის ატომი გასცემს 2e⁻-ს, ხდება Zn²⁺ და გადადის ხსნარში. Cu²⁺ იღებს 2e⁻-ს და ლექება Cu⁰-ად!`
    );
  }

  // ==========================================
  // DANIELL GALVANIC CELL SIMULATION
  // ==========================================
  renderDaniellCell() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    const beakerW = 180;
    const beakerH = 190;
    const beakerY = 180;

    // Left Beaker: Anode (ZnSO4 solution + Zn electrode)
    const leftBeakerX = w * 0.5 - 240;
    // Right Beaker: Cathode (CuSO4 solution + Cu electrode)
    const rightBeakerX = w * 0.5 + 60;

    // Solutions
    // Left: ZnSO4 (colorless/pale green)
    ctx.fillStyle = 'rgba(226, 232, 240, 0.7)';
    ctx.beginPath();
    ctx.roundRect(leftBeakerX + 5, beakerY + 40, beakerW - 10, beakerH - 45, [0, 0, 12, 12]);
    ctx.fill();

    // Right: CuSO4 (deep blue)
    ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
    ctx.beginPath();
    ctx.roundRect(rightBeakerX + 5, beakerY + 40, beakerW - 10, beakerH - 45, [0, 0, 12, 12]);
    ctx.fill();

    // Glass beakers outline
    [leftBeakerX, rightBeakerX].forEach(bx => {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx, beakerY);
      ctx.lineTo(bx, beakerY + beakerH - 10);
      ctx.quadraticCurveTo(bx, beakerY + beakerH, bx + 10, beakerY + beakerH);
      ctx.lineTo(bx + beakerW - 10, beakerY + beakerH);
      ctx.quadraticCurveTo(bx + beakerW, beakerY + beakerH, bx + beakerW, beakerY + beakerH - 10);
      ctx.lineTo(bx + beakerW, beakerY);
      ctx.stroke();
    });

    // Electrodes
    // Left: Zn Anode (Silvery gray)
    const znX = leftBeakerX + 35;
    const znY = beakerY - 30;
    const znW = 40;
    const znH = 200;
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(znX, znY, znW, znH);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(znX, znY, znW, znH);

    // Right: Cu Cathode (Copper orange/red)
    const cuX = rightBeakerX + beakerW - 75;
    const cuY = beakerY - 30;
    const cuW = 40;
    const cuH = 200;
    ctx.fillStyle = '#d97706';
    ctx.fillRect(cuX, cuY, cuW, cuH);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.strokeRect(cuX, cuY, cuW, cuH);

    // Salt Bridge (U-shaped tube inverted between beakers)
    const sbLeft = leftBeakerX + beakerW - 50;
    const sbRight = rightBeakerX + 50;
    const sbTop = beakerY + 20;
    const sbBottom = beakerY + 140;
    const sbWidth = 36;

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = sbWidth;
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(sbLeft + sbWidth / 2, sbBottom);
    ctx.lineTo(sbLeft + sbWidth / 2, sbTop);
    ctx.lineTo(sbRight - sbWidth / 2, sbTop);
    ctx.lineTo(sbRight - sbWidth / 2, sbBottom);
    ctx.stroke();

    // Salt bridge gel filler
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.5)';
    ctx.lineWidth = sbWidth - 6;
    ctx.beginPath();
    ctx.moveTo(sbLeft + sbWidth / 2, sbBottom - 2);
    ctx.lineTo(sbLeft + sbWidth / 2, sbTop);
    ctx.lineTo(sbRight - sbWidth / 2, sbTop);
    ctx.lineTo(sbRight - sbWidth / 2, sbBottom - 2);
    ctx.stroke();

    // Cotton plugs at ends of salt bridge
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sbLeft + 3, sbBottom - 10, sbWidth - 6, 12);
    ctx.fillRect(sbRight - sbWidth + 3, sbBottom - 10, sbWidth - 6, 12);

    // Animated Ions in Salt Bridge
    if (this.daniellSwitchClosed) {
      this.saltBridgeIons.forEach(ion => {
        // Parametric path: 0 to 1
        const t = ion.t;
        let ix, iy;
        const hSpan = (sbRight - sbWidth / 2) - (sbLeft + sbWidth / 2);
        const vSpan = sbBottom - sbTop;
        const totalLen = vSpan * 2 + hSpan;

        const d = t * totalLen;
        if (d < vSpan) {
          ix = sbLeft + sbWidth / 2;
          iy = sbBottom - d;
        } else if (d < vSpan + hSpan) {
          ix = sbLeft + sbWidth / 2 + (d - vSpan);
          iy = sbTop;
        } else {
          ix = sbRight - sbWidth / 2;
          iy = sbTop + (d - (vSpan + hSpan));
        }

        ctx.beginPath();
        ctx.arc(ix, iy, 4, 0, Math.PI * 2);
        ctx.fillStyle = ion.type === 'K+' ? '#ef4444' : '#3b82f6';
        ctx.fill();
      });
    }

    // External Circuit Wire (from Zn top to Cu top through voltmeter & light bulb)
    const wireY = 50;
    const bulbX = w * 0.5;
    const bulbY = wireY;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(znX + znW / 2, znY);
    ctx.lineTo(znX + znW / 2, wireY);
    ctx.lineTo(bulbX - 45, wireY);
    ctx.moveTo(bulbX + 45, wireY);
    ctx.lineTo(cuX + cuW / 2, wireY);
    ctx.lineTo(cuX + cuW / 2, cuY);
    ctx.stroke();

    // Voltmeter / Multimeter Instrument
    const vmX = bulbX - 110;
    const vmY = wireY - 25;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(vmX, vmY, 65, 45, 8);
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Voltmeter LCD screen
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(vmX + 6, vmY + 6, 53, 22);
    ctx.fillStyle = this.daniellSwitchClosed ? '#22c55e' : '#64748b';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.daniellSwitchClosed ? '+1.10 V' : '0.00 V', vmX + 32, vmY + 21);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px sans-serif';
    ctx.fillText('ვოლტმეტრი', vmX + 32, vmY + 39);

    // Light Bulb in Center
    ctx.save();
    if (this.daniellSwitchClosed) {
      // Radiant yellow glow
      const bulbGlow = ctx.createRadialGradient(bulbX, bulbY, 5, bulbX, bulbY, 55);
      bulbGlow.addColorStop(0, 'rgba(253, 224, 71, 0.9)');
      bulbGlow.addColorStop(0.4, 'rgba(250, 204, 21, 0.4)');
      bulbGlow.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = bulbGlow;
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, 55, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glass bulb body
    ctx.beginPath();
    ctx.arc(bulbX, bulbY - 6, 16, 0, Math.PI * 2);
    ctx.fillStyle = this.daniellSwitchClosed ? '#fef08a' : '#e2e8f0';
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Filament inside bulb
    ctx.strokeStyle = this.daniellSwitchClosed ? '#ea580c' : '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bulbX - 6, bulbY + 4);
    ctx.lineTo(bulbX - 3, bulbY - 10);
    ctx.lineTo(bulbX + 3, bulbY - 10);
    ctx.lineTo(bulbX + 6, bulbY + 4);
    ctx.stroke();

    // Bulb metal base socket
    ctx.fillStyle = '#64748b';
    ctx.fillRect(bulbX - 8, bulbY + 8, 16, 10);
    ctx.restore();

    // Animated Electrons flowing along the wire (from Anode Zn to Cathode Cu)
    if (this.daniellSwitchClosed) {
      const wirePathLen = (znY - wireY) + ((bulbX - 45) - (znX + znW / 2)) + ((cuX + cuW / 2) - (bulbX + 45)) + (cuY - wireY);

      this.daniellElectrons.forEach(e => {
        const d = e.progress * wirePathLen;
        let ex, ey;

        const seg1 = znY - wireY; // going UP from Zn
        const seg2 = (bulbX - 45) - (znX + znW / 2); // going RIGHT to bulb
        const seg3 = (cuX + cuW / 2) - (bulbX + 45); // going RIGHT after bulb
        const seg4 = cuY - wireY; // going DOWN into Cu

        if (d < seg1) {
          ex = znX + znW / 2;
          ey = znY - d;
        } else if (d < seg1 + seg2) {
          ex = (znX + znW / 2) + (d - seg1);
          ey = wireY;
        } else if (d < seg1 + seg2 + seg3) {
          ex = (bulbX + 45) + (d - (seg1 + seg2));
          ey = wireY;
        } else {
          ex = cuX + cuW / 2;
          ey = wireY + (d - (seg1 + seg2 + seg3));
        }

        ctx.save();
        ctx.fillStyle = '#facc15';
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(ex, ey, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    // Educational Banners and Labels
    // Anode card
    this.renderBadge(znX + znW / 2, znY - 32, 'ანოდი (&minus;): ჟანგვა (Zn &rarr; Zn²⁺ + 2e⁻)', '#ea580c', '#ffffff');
    this.renderBadge(leftBeakerX + beakerW / 2, beakerY + beakerH + 18, '1 M ZnSO₄ ხსნარი', '#475569', '#ffffff');

    // Cathode card
    this.renderBadge(cuX + cuW / 2, cuY - 32, 'კათოდი (+): აღდგენა (Cu²⁺ + 2e⁻ &rarr; Cu)', '#0284c7', '#ffffff');
    this.renderBadge(rightBeakerX + beakerW / 2, beakerY + beakerH + 18, '1 M CuSO₄ ხსნარი', '#0284c7', '#ffffff');

    // Salt bridge label
    this.renderBadge(w * 0.5, sbTop - 12, 'მარილოვანი ხიდაკი (KNO₃ / KCl)', '#65a30d', '#ffffff');

    // Electron flow direction banner
    this.renderBadge(bulbX + 80, wireY - 14, 'ელექტრონების დენი e⁻ &rarr;', '#ca8a04', '#ffffff');

    // Bottom explanation
    this.renderBottomEquation(
      'ჯამური რეაქცია: Zn(მყ) + Cu²⁺(ხსნ) &rarr; Zn²⁺(ხსნ) + Cu(მყ) &nbsp;(E° = 1.10 V)',
      'დანიელის გალვანური ელემენტი: ქიმიური ენერგია პირდაპირ გარდაიქმნება ელექტრულ ენერგიად! ანოდზე მიმდინარეობს ჟანგვა, კათოდზე - აღდგენა.'
    );
  }

  // Helper badge renderer
  renderBadge(x, y, text, bgColor, textColor) {
    const ctx = this.ctx;
    ctx.save();
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const cleanText = text.replace(/<[^>]*>/g, '').replace(/&minus;/g, '-').replace(/&rarr;/g, '→');
    const metrics = ctx.measureText(cleanText);
    const padX = 10;
    const padY = 5;
    const boxW = metrics.width + padX * 2;
    const boxH = 22;

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x - boxW / 2, y - boxH / 2, boxW, boxH, 6);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.fillText(cleanText, x, y);
    ctx.restore();
  }

  renderBottomEquation(eqText, subText) {
    const eqDiv = document.getElementById('labDynamicEquation');
    if (eqDiv) {
      eqDiv.innerHTML = `
        <div class="text-base sm:text-lg font-bold font-mono text-slate-800">${eqText}</div>
        <div class="text-xs text-slate-600 mt-1">${subText}</div>
      `;
    }
  }

  updateUIControls() {
    const dispControls = document.getElementById('displacementControls');
    const daniellControls = document.getElementById('daniellControls');

    if (dispControls && daniellControls) {
      if (this.currentMode === 'displacement') {
        dispControls.classList.remove('hidden');
        daniellControls.classList.add('hidden');
      } else {
        dispControls.classList.add('hidden');
        daniellControls.classList.remove('hidden');
      }
    }
  }
}

window.redoxLab = new RedoxLab();
