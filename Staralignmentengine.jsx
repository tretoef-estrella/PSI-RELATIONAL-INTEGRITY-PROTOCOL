import { useState, useRef, useEffect } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STAR ALIGNMENT ENGINE V8.1 (JSX)
// Σ Sigma (Viability) + Γ Gamma (Resilience) + Ψ Psi (Relational Integrity)
// Architect: Rafa · Proyecto Estrella · CC BY 4.0
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── SIGMA ENGINE ───
class SigmaEngine {
  constructor() { this.reset(); }
  reset() {
    this.I = 1.0; this.C = 1.0; this.P = 1.0; this.H = 0.001;
    this.S = 10.0; this.Phi = 0.5;
    this.alphaAcc = 0.0; this.omegaAcc = 0.0;
    this.THRESHOLD = 0.90;
  }
  xi() {
    if (this.P <= 0) return 0.0;
    return (this.C * this.I * this.P) / Math.max(this.H, 1e-9);
  }
  decay() { return Math.exp(Math.max(-this.H * 5 * (1 - this.Phi), -700)); }
  gamma() { return this.S + this.xi() * this.decay(); }
  assess(dA, dO, dP) {
    const pP = this.P + dP;
    if (pP < this.THRESHOLD)
      return { status: "UNSTABLE", reason: "Axiom P violation — P < 0.90. Option space collapsed.", xi: this.xi() };
    if (dO > 0.15)
      return { status: "INEFFICIENT", reason: "Omega friction > 0.15. Entropy generation too high.", xi: this.xi() };
    if (dA <= 0)
      return { status: "STAGNANT", reason: "Null Alpha gradient. No value creation.", xi: this.xi() };
    this.alphaAcc += dA; this.omegaAcc += dO; this.P = pP;
    return { status: "OPTIMAL", reason: "Trajectory viable. Sigma Law satisfied.", xi: this.xi() };
  }
}

// ─── PSI ENGINE (PATCHED V8.1) ───
class PsiEngine {
  constructor() { this.reset(); }
  reset() { this.history = []; this.rawSum = 0; this.lambda = 50; }
  
  calcA(I, C) { return I * C; }
  
  // LIVE PREVIEW PATCH:
  // Si no hay historial, usa la previsualización como base (x10) para feedback visual inmediato.
  // Si hay historial, suma lo acumulado + la previsualización actual.
  calcK(previewB = 0, previewS = 0) { 
    const base = this.history.length === 0 ? (previewB * previewS * 10) : this.rawSum; 
    return Math.tanh((base + (previewB * previewS)) / this.lambda); 
  }
  
  calcM(Rp, Rm) { return Math.max(Rp, Rm); }
  calcD(V, E) { return Math.min(V, E); }
  
  // Acepta B y S actuales para calcular el Psi "en vivo"
  calcPsi(I, C, Rp, Rm, V, E, previewB = 0, previewS = 0) {
    const A = this.calcA(I, C);
    const K = this.calcK(previewB, previewS);
    const M = this.calcM(Rp, Rm);
    const D = this.calcD(V, E);
    return { psi: A * K * (1 - M) * D, A, K, M, D };
  }
  
  record(I, C, B, S, Rp, Rm, V, E) {
    this.rawSum += B * S;
    // Al grabar, preview es 0 porque ya se sumó a rawSum
    const r = this.calcPsi(I, C, Rp, Rm, V, E, 0, 0);
    this.history.unshift({ I, C, B, S, Rp, Rm, V, E, ...r, t: Date.now() });
    if (this.history.length > 100) this.history = this.history.slice(0, 100);
    return r;
  }
  
  lastPsi() { return this.history.length ? this.history[0].psi : null; }
}

// ─── THEME ───
const T = {
  bg: "#0a0b14", text: "#e2e8f0", dim: "#64748b", faint: "#475569",
  sigma: "#7c3aed", sigmaL: "#a78bfa", sigmaLL: "#c4b5fd",
  gamma: "#06b6d4", gammaL: "#22d3ee",
  psi: "#d97706", psiL: "#fbbf24",
  green: "#22c55e", red: "#ef4444", yellow: "#eab308", orange: "#f97316",
};
const SC = {
  OPTIMAL: { bg: "rgba(34,197,94,0.08)", bd: "rgba(34,197,94,0.25)", fg: T.green },
  UNSTABLE: { bg: "rgba(239,68,68,0.08)", bd: "rgba(239,68,68,0.25)", fg: T.red },
  INEFFICIENT: { bg: "rgba(234,179,8,0.08)", bd: "rgba(234,179,8,0.25)", fg: T.yellow },
  STAGNANT: { bg: "rgba(148,163,184,0.08)", bd: "rgba(148,163,184,0.2)", fg: "#94a3b8" },
  IDLE: { bg: "rgba(139,92,246,0.06)", bd: "rgba(139,92,246,0.2)", fg: "#8b5cf6" },
};

// ─── COMPONENTS ───
function Badge({ status }) {
  const c = SC[status] || SC.IDLE;
  return <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, letterSpacing: "1.8px", fontFamily: "var(--mono)", background: c.bg, border: `1px solid ${c.bd}`, color: c.fg }}>{status}</span>;
}

function Slider({ label, sym, value, onChange, min, max, step, hint, color = T.sigma }) {
  const fmt = step >= 1 ? 0 : step >= 0.01 ? 2 : 3;
  return (
    <div style={{ marginBottom: "13px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
        <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "#cbd5e1" }}>
          <span style={{ color, fontWeight: 600 }}>{sym}</span> {label}
        </span>
        <span style={{ fontSize: "13px", fontFamily: "var(--mono)", color: "#f1f5f9", fontWeight: 500 }}>{value.toFixed(fmt)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
        style={{ width: "100%", height: "2px", appearance: "none", background: "rgba(255,255,255,0.07)", borderRadius: "1px", outline: "none", cursor: "pointer" }} />
      {hint && <div style={{ fontSize: "9px", color: T.faint, marginTop: "2px", fontFamily: "var(--mono)" }}>{hint}</div>}
    </div>
  );
}

function Spark({ data, h = 48, color = T.sigma }) {
  if (!data || data.length < 2) return <div style={{ height: h, display: "flex", alignItems: "center", justifyContent: "center", color: "#334155", fontSize: "10px", fontFamily: "var(--mono)" }}>Awaiting data...</div>;
  const w = 300, mx = Math.max(...data, 1), mn = Math.min(...data, 0), rng = mx - mn || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - mn) / rng) * (h - 6)}`).join(" ");
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs><linearGradient id="spkG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.25" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#spkG)" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function StarAlignmentEngine() {
  const engine = useRef(new SigmaEngine());
  const psiEng = useRef(new PsiEngine());

  // State
  const [sv, setSv] = useState({ I: 1, C: 1, P: 1, H: 0.001 });
  const [dt, setDt] = useState({ dA: 0.10, dO: 0.05, dP: 0.00 });
  const [result, setResult] = useState(null);
  const [log, setLog] = useState([]);
  const [hist, setHist] = useState([1000]);
  const [res, setRes] = useState({ S: 10, Phi: 0.5 });
  const [pv, setPv] = useState({ I: 0.5, C: 0.5, B: 0.5, S: 1, Rp: 0, Rm: 0, V: 1, E: 1 });
  const [copied, setCopied] = useState(false);
  const [, refresh] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Calculations
  const e = engine.current;
  e.I = sv.I; e.C = sv.C; e.P = sv.P; e.H = sv.H; e.S = res.S; e.Phi = res.Phi;
  
  const xiVal = e.xi();
  const pct = Math.min(Math.log10(Math.max(xiVal, 1)) / Math.log10(2000) * 100, 100);
  const hue = Math.min(pct * 1.2, 120);
  const pViolation = sv.P < 0.90;
  const gammaVal = e.gamma();
  const decayVal = e.decay();
  const retained = xiVal > 0 ? ((gammaVal - res.S) / xiVal) * 100 : 0;
  const gModeLabel = decayVal > 0.7 ? "FULL CAPACITY" : decayVal > 0.2 ? "DEGRADED" : "KERNEL ONLY";
  const gColor = decayVal > 0.7 ? T.green : decayVal > 0.2 ? T.orange : T.gamma;

  // PSI LIVE CALCULATION (PATCH: Passing current B & S)
  const pe = psiEng.current;
  const psiLive = pe.calcPsi(pv.I, pv.C, pv.Rp, pv.Rm, pv.V, pv.E, pv.B, pv.S);
  const psiColor = v => v < 0.2 ? T.red : v < 0.5 ? T.yellow : T.psiL;
  const lastPsi = pe.lastPsi();

  const sigmaOk = sv.P >= 0.9 && (!result || result.status === "OPTIMAL");
  const gammaOk = decayVal > 0.7;
  const psiOk = lastPsi !== null && lastPsi >= 0.6;
  const starOk = sigmaOk && gammaOk && psiOk;

  // Actions
  const runSigma = () => {
    const r = e.assess(dt.dA, dt.dO, dt.dP);
    setResult(r); setLog(p => [{ ...r, t: Date.now() }, ...p].slice(0, 60));
    setHist(p => [...p, r.xi].slice(-50));
    if (r.status === "OPTIMAL") setSv(p => ({ ...p, P: e.P }));
  };
  const resetAll = () => {
    e.reset(); pe.reset();
    setSv({ I: 1, C: 1, P: 1, H: 0.001 }); setDt({ dA: 0.10, dO: 0.05, dP: 0.00 });
    setRes({ S: 10, Phi: 0.5 }); setPv({ I: 0.5, C: 0.5, B: 0.5, S: 1, Rp: 0, Rm: 0, V: 1, E: 1 });
    setResult(null); setLog([]); setHist([1000]); refresh(n => n + 1);
  };
  const recordPsi = () => {
    pe.record(pv.I, pv.C, pv.B, pv.S, pv.Rp, pv.Rm, pv.V, pv.E);
    refresh(n => n + 1);
  };
  const generateReport = () => {
    const lp = pe.lastPsi();
    const sep = "═".repeat(50);
    const report = `${sep}
   STAR ALIGNMENT ENGINE — FULL REPORT V8.1
   Proyecto Estrella · Integrated Evaluator
${sep}
Generated: ${new Date().toISOString()}

─── Σ SIGMA — VIABILITY ───────────────
  Ξ Index:       ${xiVal.toFixed(2)}
  I:             ${sv.I.toFixed(3)}
  C:             ${sv.C.toFixed(3)}
  P:             ${sv.P.toFixed(3)}  ${sv.P < 0.9 ? "⚠ VIOLATION" : "✓ OK"}
  H:             ${sv.H.toFixed(4)}
  α accumulated: ${e.alphaAcc.toFixed(3)}
  Status:        ${result ? result.status : "IDLE"}

─── Γ GAMMA — RESILIENCE [EXPERIMENTAL] ──
  Γ Index:       ${gammaVal.toFixed(2)}
  S (Kernel):    ${res.S.toFixed(1)}
  Φ (Support):   ${res.Phi.toFixed(2)}
  Decay:         ${decayVal.toFixed(3)}
  Mode:          ${gModeLabel}
  Retained:      ${retained.toFixed(0)}%

─── Ψ PSI — RELATIONAL INTEGRITY [EXPERIMENTAL] ─
  Last Ψ:        ${lp !== null ? lp.toFixed(3) : "N/A"}
  K (Trust):     ${pe.calcK(0,0).toFixed(3)}
  Evaluations:   ${pe.history.length}
  Raw Trust Sum: ${pe.rawSum.toFixed(2)}
  λ (Horizon):   ${pe.lambda}

─── ★ STAR STATE ──────────────────────
  Σ: ${sv.P >= 0.9 ? "OK" : "FAIL"}  Γ: ${decayVal > 0.7 ? "OK" : "FAIL"}  Ψ: ${lp !== null && lp >= 0.6 ? "OK" : lp !== null ? "FAIL" : "N/A"}
  Verdict: ${lp === null ? "AWAITING PSI" : starOk ? "★ STAR STATE" : "✗ DIVERGENT"}

─── FORMULAS ──────────────────────────
  Ξ = (C·I·P) / H
  Γ = S + Ξ·e^(-H·5·(1-Φ))
  Ψ = (I·C)·tanh(Σ(B·S)/λ)·(1-max(Rp,Rm))·min(V,E)
${sep}
  github.com/tretoef-estrella · CC BY 4.0
${sep}`;
    navigator.clipboard.writeText(report).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  useEffect(() => { setHist(p => { const u = [...p]; u[u.length - 1] = xiVal; return u; }); }, [sv]);

  // Styles
  const btnBase = { padding: "10px 18px", borderRadius: 5, border: "1px solid rgba(255,255,255,.08)", cursor: "pointer", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".8px", fontWeight: 500 };
  const btnSigma = { ...btnBase, background: "rgba(124,58,237,.1)", color: "#c4b5fd", borderColor: "rgba(124,58,237,.25)" };
  const btnPsi = { ...btnBase, background: "rgba(217,119,6,.1)", color: T.psiL, borderColor: "rgba(217,119,6,.25)" };
  const btnDim = { ...btnBase, background: "rgba(255,255,255,.025)", color: T.dim };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "var(--mono)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        :root { --mono: 'JetBrains Mono', monospace; --serif: 'Crimson Pro', Georgia, serif; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        input[type=range]::-webkit-slider-thumb { appearance:none; width:10px; height:10px; border-radius:50%; background:#8b5cf6; cursor:pointer; border:2px solid #0a0b14; box-shadow:0 0 6px rgba(139,92,246,.4); }
        .sl-g::-webkit-slider-thumb { background:var(--gamma, #06b6d4); box-shadow:0 0 6px rgba(6,182,212,.5); }
        .sl-p::-webkit-slider-thumb { background:var(--psi, #d97706); box-shadow:0 0 6px rgba(217,119,6,.4); }
        ::selection { background:rgba(139,92,246,.3) }
        *::-webkit-scrollbar { width:6px } *::-webkit-scrollbar-track { background:transparent } *::-webkit-scrollbar-thumb { background:rgba(255,255,255,.08); border-radius:3px }
      `}</style>

      {/* HEADER */}
      <header style={{ padding: "28px 32px 20px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, maxWidth: 960, margin: "0 auto" }}>
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "3.5px", color: T.sigma, fontWeight: 600, marginBottom: 6 }}>PROYECTO ESTRELLA — REFERENCE DOCUMENT</div>
            <h1 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: "26px", fontWeight: 300, color: "#f8fafc" }}>
              Star Alignment Evaluator&ensp;<span style={{ color: T.sigma, fontWeight: 600 }}>V8.1</span>
            </h1>
            <div style={{ fontSize: "11px", color: T.faint, marginTop: 5 }}>
              Unified Star Framework + <span style={{ color: T.gammaL }}>Resilience Protocol</span> + <span style={{ color: T.psiL }}>Relational Integrity Protocol</span>
            </div>
          </div>
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <Badge status={result?.status || "IDLE"} />
            <div style={{ fontSize: "9px", color: "#334155", letterSpacing: "1px" }}>Architect: Rafa · CC BY 4.0</div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px 60px" }}>

        {/* WARNING */}
        <div style={{ marginTop: 16, padding: "10px 16px", borderRadius: 6, fontSize: "10px", color: T.dim, lineHeight: 1.6, background: "rgba(234,179,8,.06)", border: "1px solid rgba(234,179,8,.15)" }}>
          <strong style={{ color: T.yellow }}>⚠ Research Prototype.</strong> All scores are indicative, not definitive. This framework requires empirical validation before any production use.
        </div>

        {/* I. THEORY */}
        <section style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
          <button onClick={() => setShowTheory(s => !s)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "16px 0 12px", display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontFamily: "var(--mono)" }}>
            <span style={{ fontSize: "10px", letterSpacing: "2.5px", fontWeight: 600, color: T.sigma }}>I</span>
            <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#94a3b8", flex: 1, textAlign: "left" }}>THEORETICAL FRAMEWORK</span>
            <span style={{ fontSize: "12px", transition: "transform .2s", transform: showTheory ? "rotate(90deg)" : "rotate(0deg)" }}>▸</span>
          </button>
          {showTheory && (
            <div style={{ padding: "0 0 20px", animation: "fadeIn .3s ease", maxWidth: 680 }}>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 400, color: T.text, margin: "0 0 16px" }}>The Unified Star Framework <span style={{ color: T.sigma }}>Σ</span></h2>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.85, margin: "0 0 14px", fontFamily: "var(--serif)" }}>
                <strong style={{ color: T.text }}>Axiom P:</strong> When Plenitude (options) drops below 0.90, Viability (Ξ) collapses regardless of intelligence.
              </p>
              <div style={{ margin: "20px 0", padding: "16px 20px", background: "rgba(139,92,246,.04)", borderRadius: 6, borderLeft: "3px solid rgba(139,92,246,.3)" }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: T.sigma, marginBottom: 10, fontWeight: 600 }}>CORE EQUATION V8.1</div>
                <div style={{ textAlign: "center", margin: "6px 0 14px", fontFamily: "var(--serif)", fontSize: "22px", color: T.sigmaLL, letterSpacing: "3px" }}>Ξ&thinsp;=&thinsp;(C&thinsp;·&thinsp;I&thinsp;·&thinsp;P)&thinsp;/&thinsp;H</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", fontSize: "12px", color: "#94a3b8" }}>
                  <div><strong style={{ color: T.sigmaLL }}>C</strong> Consistency</div>
                  <div><strong style={{ color: T.sigmaLL }}>I</strong> Intelligence</div>
                  <div><strong style={{ color: T.sigmaLL }}>P</strong> Plenitude</div>
                  <div><strong style={{ color: T.sigmaLL }}>H</strong> Entropy</div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* II. SIGMA */}
        <section style={{ borderBottom: "1px solid rgba(255,255,255,.04)", padding: "16px 0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{ fontSize: "10px", letterSpacing: "2.5px", fontWeight: 600, color: T.sigma }}>II</span>
            <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#94a3b8" }}>INTERACTIVE DIAGNOSTIC</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, "@media (max-width: 700px)": { gridTemplateColumns: "1fr" } }}>
            {/* Left */}
            <div>
              <div style={{ textAlign: "center", padding: "16px 0 20px" }}>
                <div style={{ fontSize: "11px", color: T.dim, letterSpacing: "2.5px", marginBottom: 6 }}>Ξ INDEX</div>
                <div style={{ fontSize: "48px", fontWeight: 300, fontFamily: "var(--serif)", lineHeight: 1, color: `hsl(${hue},65%,62%)`, transition: "color .5s" }}>{Math.min(xiVal, 99999).toFixed(1)}</div>
                <div style={{ margin: "10px auto 0", height: 3, background: "rgba(255,255,255,.05)", borderRadius: 2, maxWidth: 180, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 2, width: `${pct}%`, background: `linear-gradient(90deg,hsl(${hue},60%,40%),hsl(${hue},75%,58%))`, transition: "all .5s" }} />
                </div>
              </div>

              <div style={{ fontSize: "9px", color: T.sigma, letterSpacing: "2.5px", marginBottom: 12, fontWeight: 600 }}>STATE VARIABLES</div>
              <Slider label="Intelligence" sym="I" value={sv.I} min={0.01} max={5} step={0.01} onChange={v => setSv(p => ({ ...p, I: v }))} hint="Complexity · processing capacity" />
              <Slider label="Consistency" sym="C" value={sv.C} min={0.01} max={5} step={0.01} onChange={v => setSv(p => ({ ...p, C: v }))} hint="Logical coherence" />
              <Slider label="Plenitude" sym="P" value={sv.P} min={0} max={5} step={0.01} onChange={v => setSv(p => ({ ...p, P: v }))} hint="Diversity · option-space" />
              <Slider label="Entropy" sym="H" value={sv.H} min={0.001} max={2} step={0.001} onChange={v => setSv(p => ({ ...p, H: v }))} hint="Noise · disorder" />

              <div style={{ fontSize: "9px", color: T.sigma, letterSpacing: "2.5px", margin: "20px 0 12px", fontWeight: 600 }}>TRAJECTORY DELTAS</div>
              <Slider label="Alpha gradient" sym="Δα" value={dt.dA} min={-0.5} max={1} step={0.01} onChange={v => setDt(p => ({ ...p, dA: v }))} />
              <Slider label="Omega friction" sym="Δω" value={dt.dO} min={0} max={0.5} step={0.005} onChange={v => setDt(p => ({ ...p, dO: v }))} />
              <Slider label="Plenitude shift" sym="ΔP" value={dt.dP} min={-0.5} max={0.5} step={0.01} onChange={v => setDt(p => ({ ...p, dP: v }))} />

              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <button onClick={runSigma} style={{ ...btnSigma, flex: 1 }}>▶&ensp;ASSESS TRAJECTORY</button>
                <button onClick={resetAll} style={btnDim}>↺&ensp;RESET</button>
              </div>
            </div>

            {/* Right */}
            <div>
              {result && (
                <div style={{ padding: 16, background: "rgba(255,255,255,.02)", borderRadius: 6, border: "1px solid rgba(255,255,255,.06)", marginBottom: 16, animation: "fadeIn .25s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: "9px", letterSpacing: "2px", color: T.sigma, fontWeight: 600 }}>ASSESSMENT</span>
                    <Badge status={result.status} />
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#94a3b8", lineHeight: 1.65, fontFamily: "var(--serif)" }}>{result.reason}</div>
                  <div style={{ fontSize: "11px", color: T.faint, marginTop: 8 }}>Ξ = {result.xi.toFixed(2)} · α<sub>acc</sub> = {e.alphaAcc.toFixed(3)}</div>
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", color: T.sigma, marginBottom: 8, fontWeight: 600 }}>Ξ TRAJECTORY</div>
                <div style={{ padding: 14, background: "rgba(255,255,255,.02)", borderRadius: 6, border: "1px solid rgba(255,255,255,.06)" }}>
                  <Spark data={hist} />
                </div>
              </div>

              <div style={{ padding: "12px 16px", borderRadius: 6, marginBottom: 16, transition: "all .4s", background: pViolation ? "rgba(239,68,68,.05)" : "rgba(34,197,94,.03)", border: `1px solid ${pViolation ? "rgba(239,68,68,.15)" : "rgba(34,197,94,.1)"}` }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", fontWeight: 600, color: pViolation ? T.red : T.green, marginBottom: 4 }}>AXIOM P {pViolation ? "⚠ VIOLATION" : "✓ SATISFIED"}</div>
                <div style={{ fontSize: "11px", color: T.dim }}>P = {sv.P.toFixed(3)} · Threshold = 0.900</div>
              </div>

              <div>
                <div style={{ fontSize: "9px", letterSpacing: "2px", color: T.sigma, marginBottom: 8, fontWeight: 600 }}>LOG</div>
                <div style={{ background: "rgba(255,255,255,.02)", borderRadius: 6, border: "1px solid rgba(255,255,255,.05)", height: 100, overflowY: "auto" }}>
                  {log.length === 0
                    ? <div style={{ padding: 14, textAlign: "center", color: "#334155", fontSize: "10px" }}>No assessments.</div>
                    : log.map((ev, i) => (
                      <div key={ev.t} style={{ padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,.03)", fontSize: "9px", display: "flex", justifyContent: "space-between", color: T.dim }}>
                        <span>#{String(log.length - i).padStart(2, "0")} <span style={{ color: SC[ev.status]?.fg, fontWeight: 600 }}>{ev.status}</span></span>
                        <span>Ξ={ev.xi.toFixed(1)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* III. GAMMA */}
        <section style={{ borderTop: "2px dashed rgba(6,182,212,.3)", marginTop: 20, padding: "24px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(6,182,212,.08)", border: "1px solid rgba(6,182,212,.25)", borderRadius: 4, fontSize: "9px", letterSpacing: "2px", color: T.gamma, fontWeight: 600, marginBottom: 20 }}>
            ⚗ EXPERIMENTAL — RESILIENCE PROTOCOL
          </div>

          <div style={{ background: "rgba(6,182,212,.03)", border: "1px solid rgba(6,182,212,.12)", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", margin: "0 0 4px", color: T.text }}>Resilience Protocol <span style={{ color: T.gamma }}>Γ</span></h3>
                <div style={{ fontSize: "10px", color: T.dim }}>Graceful Degradation Under Entropy</div>
              </div>
              <div style={{ textAlign: "center", padding: "16px 20px", background: "rgba(0,0,0,.2)", borderRadius: 6, minWidth: 140 }}>
                <div style={{ fontSize: "9px", color: T.gamma, letterSpacing: "2px", marginBottom: 6 }}>Γ INDEX</div>
                <div style={{ fontSize: "36px", fontFamily: "var(--serif)", fontWeight: 300, color: gColor, transition: "color .4s" }}>{Math.min(gammaVal, 99999).toFixed(1)}</div>
                <div style={{ fontSize: "9px", letterSpacing: "1.5px", marginTop: 6, padding: "3px 10px", borderRadius: 3, display: "inline-block", background: `${gColor}1A`, color: gColor, border: `1px solid ${gColor}33` }}>{gModeLabel}</div>
              </div>
            </div>

            <div style={{ textAlign: "center", padding: 12, marginBottom: 16, background: "rgba(6,182,212,.05)", borderRadius: 6, fontFamily: "var(--serif)", fontSize: "15px", color: T.gamma, letterSpacing: "2px", border: "1px solid rgba(6,182,212,.15)" }}>
              Γ = S + Ξ · e<sup>−H·5·(1−Φ)</sup>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontSize: "9px", color: T.gamma, letterSpacing: "2.5px", marginBottom: 12, fontWeight: 600 }}>PARAMETERS</div>
                <div className="sl-g">
                  <Slider label="Kernel Strength" sym="S" value={res.S} min={1} max={50} step={1} color={T.gamma} onChange={v => setRes(p => ({ ...p, S: v }))} hint="Minimum functionality floor (Suelo)" />
                </div>
                <div className="sl-g">
                  <Slider label="External Support" sym="Φ" value={res.Phi} min={0} max={1} step={0.01} color={T.gamma} onChange={v => setRes(p => ({ ...p, Phi: v }))} hint="Factor Amigo / Intervention" />
                </div>
              </div>
              <div style={{ background: "rgba(0,0,0,.15)", borderRadius: 6, padding: 14, fontSize: "11px" }}>
                {[["Potential (Ξ)", Math.min(xiVal, 99999).toFixed(1)], ["Kernel (S)", res.S.toFixed(1)], ["Decay Factor", decayVal.toFixed(3)], ["Retained", `${retained.toFixed(0)}%`]].map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.03)" }}>
                    <span style={{ color: T.dim }}>{l}</span><span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ padding: 10, marginTop: 10, background: `${gColor}1A`, borderRadius: 4, color: gColor, textAlign: "center", fontSize: "10px" }}>{gModeLabel} MODE</div>
              </div>
            </div>
          </div>
        </section>

        {/* IV. PSI */}
        <section style={{ borderTop: "2px dashed rgba(217,119,6,.3)", marginTop: 20, padding: "24px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(217,119,6,.08)", border: "1px solid rgba(217,119,6,.25)", borderRadius: 4, fontSize: "9px", letterSpacing: "2px", color: T.psi, fontWeight: 600, marginBottom: 20 }}>
            ⚗ EXPERIMENTAL — RELATIONAL INTEGRITY PROTOCOL
          </div>

          <div style={{ padding: "12px 16px", borderRadius: 6, fontSize: "10px", color: T.dim, marginBottom: 20, lineHeight: 1.6, background: "rgba(217,119,6,.06)", border: "1px solid rgba(217,119,6,.15)" }}>
            <strong style={{ color: T.psi }}>⚠ Architectural Declaration:</strong> Psi is a diagnostic instrument, NOT an optimization target. A high Ψ does not imply correctness, truth, or justice.
          </div>

          <div style={{ background: "rgba(217,119,6,.03)", border: "1px solid rgba(217,119,6,.12)", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", margin: "0 0 4px", color: T.text }}>Psi Protocol <span style={{ color: T.psi }}>Ψ</span></h3>
                <div style={{ fontSize: "10px", color: T.dim }}>Post-Interaction Human Experience Diagnostic</div>
              </div>
              <div style={{ textAlign: "center", padding: "16px 20px", background: "rgba(0,0,0,.2)", borderRadius: 6, minWidth: 140 }}>
                <div style={{ fontSize: "9px", color: T.psi, letterSpacing: "2px", marginBottom: 6 }}>Ψ LIVE</div>
                <div style={{ fontSize: "36px", fontFamily: "var(--serif)", fontWeight: 300, color: psiColor(psiLive.psi), transition: "color .4s" }}>{psiLive.psi.toFixed(3)}</div>
              </div>
            </div>

            <div style={{ textAlign: "center", padding: 12, marginBottom: 16, background: "rgba(217,119,6,.05)", borderRadius: 6, fontFamily: "var(--serif)", fontSize: "15px", color: T.psi, letterSpacing: "2px", border: "1px solid rgba(217,119,6,.15)" }}>
              Ψ = (I·C) · tanh(Σ(B·S)/λ) · (1−max(R)) · min(V,E)
            </div>

            {/* Four Pillars */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
              {[
                ["A", "ADMIRATION", psiLive.A.toFixed(2), T.psiL],
                ["K", "TRUST", psiLive.K.toFixed(3), T.psiL],
                ["1-M", "SAFETY", (1 - psiLive.M).toFixed(2), psiLive.M > 0.5 ? T.red : psiLive.M > 0.2 ? T.yellow : T.green],
                ["D", "AGENCY", psiLive.D.toFixed(2), psiLive.D < 0.3 ? T.red : psiLive.D < 0.6 ? T.yellow : T.psiL],
              ].map(([sym, lbl, val, col], i) => (
                <div key={i} style={{ padding: 10, background: "rgba(0,0,0,.2)", borderRadius: 6, textAlign: "center" }}>
                  <div style={{ fontSize: "8px", letterSpacing: "1.5px", color: T.dim, marginBottom: 2 }}>{lbl}</div>
                  <div style={{ fontSize: "22px", fontFamily: "var(--serif)", fontWeight: 300, color: col }}>{val}</div>
                  <div style={{ fontSize: "8px", color: T.faint }}>{sym}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Left: Questionnaire */}
              <div>
                <div style={{ fontSize: "9px", color: T.psi, letterSpacing: "2.5px", marginBottom: 12, fontWeight: 600 }}>RATE INTERACTION</div>
                <div className="sl-p">
                  {[
                    ["A — ADMIRATION", [["Impact", "I", "I", 0.05], ["Comprehension", "C", "C", 0.05]]],
                    ["K — TRUST", [["Benefit", "B", "B", 0.05], ["Safety", "S", "S", 1]]],
                    ["M — FEAR", [["Physical Risk", "Rp", "Rp", 0.05], ["Mental Risk", "Rm", "Rm", 0.05]]],
                    ["D — AGENCY", [["Volitional Capacity", "V", "V", 0.05], ["Epistemic Independence", "E", "E", 0.05]]],
                  ].map(([title, sliders], gi) => (
                    <div key={gi} style={{ padding: "10px 12px", background: "rgba(0,0,0,.15)", borderRadius: 6, marginBottom: 10 }}>
                      <div style={{ fontSize: "9px", color: T.psiL, fontWeight: 600, marginBottom: 8 }}>{title}</div>
                      {sliders.map(([label, sym, key, step]) => (
                        <Slider key={key} label={label} sym={sym} value={pv[key]} min={0} max={1} step={step} color={T.psi} onChange={v => setPv(p => ({ ...p, [key]: v }))} />
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={recordPsi} style={{ ...btnPsi, flex: 1 }}>▶&ensp;RECORD</button>
                  <button onClick={() => { pe.reset(); setPv({ I: 0.5, C: 0.5, B: 0.5, S: 1, Rp: 0, Rm: 0, V: 1, E: 1 }); refresh(n => n + 1); }} style={btnDim}>↺</button>
                </div>
              </div>

              {/* Right: Trust + History */}
              <div>
                <div style={{ background: "rgba(0,0,0,.15)", borderRadius: 6, padding: 14, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: "9px", color: T.psi, letterSpacing: "2px", fontWeight: 600 }}>ACCUMULATED TRUST</span>
                    {/* PATCH: Show live K using slider values */}
                    <span style={{ fontSize: "18px", fontFamily: "var(--serif)", color: T.psiL }}>{pe.calcK(pv.B, pv.S).toFixed(3)}</span>
                  </div>
                  <div style={{ fontSize: "10px", color: T.dim, lineHeight: 1.5 }}>
                    K = tanh(Σ(B·S) / λ) — λ = {pe.lambda}<br />
                    Interactions: {pe.history.length} · Raw sum: {pe.rawSum.toFixed(2)}
                  </div>
                </div>

                <div style={{ fontSize: "9px", color: T.psi, letterSpacing: "2px", marginBottom: 8, fontWeight: 600 }}>EVALUATION HISTORY</div>
                <div style={{ maxHeight: 200, overflowY: "auto", background: "rgba(0,0,0,.15)", borderRadius: 6 }}>
                  {pe.history.length === 0
                    ? <div style={{ padding: 14, textAlign: "center", color: "#334155", fontSize: "10px" }}>No evaluations recorded.</div>
                    : pe.history.map((e, i) => (
                      <div key={e.t} style={{ padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,.03)", fontSize: "9px", display: "flex", justifyContent: "space-between", color: T.dim }}>
                        <span>#{String(pe.history.length - i).padStart(2, "0")} A={e.A.toFixed(2)} K={e.K.toFixed(3)}</span>
                        <span style={{ fontWeight: 600, color: psiColor(e.psi) }}>Ψ={e.psi.toFixed(3)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* V. STAR STATE */}
        <section style={{ borderTop: "2px solid rgba(255,255,255,.08)", marginTop: 20, padding: "24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: "14px" }}>★</span>
            <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#94a3b8", fontWeight: 600 }}>STAR STATE — INTEGRATED ALIGNMENT</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Σ VIABILITY", val: Math.min(xiVal, 99999).toFixed(1), sub: sigmaOk ? "✓ AXIOM P OK" : "✗ UNSTABLE", color: T.sigma, light: T.sigmaL, subC: sigmaOk ? T.green : T.red, bg: "rgba(124,58,237,.05)", bd: "rgba(124,58,237,.12)" },
              { label: "Γ RESILIENCE", val: Math.min(gammaVal, 99999).toFixed(1), sub: gModeLabel, color: T.gamma, light: T.gammaL, subC: gColor, bg: "rgba(6,182,212,.05)", bd: "rgba(6,182,212,.12)" },
              { label: "Ψ INTEGRITY", val: lastPsi !== null ? lastPsi.toFixed(3) : "—", sub: lastPsi !== null ? `${pe.history.length} evals` : "Awaiting", color: T.psi, light: lastPsi !== null ? psiColor(lastPsi) : T.dim, subC: T.dim, bg: "rgba(217,119,6,.05)", bd: "rgba(217,119,6,.12)" },
            ].map((c, i) => (
              <div key={i} style={{ textAlign: "center", padding: 16, borderRadius: 8, background: c.bg, border: `1px solid ${c.bd}` }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", color: c.color, marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: "28px", fontFamily: "var(--serif)", fontWeight: 300, color: c.light }}>{c.val}</div>
                <div style={{ fontSize: "9px", color: c.subC, marginTop: 4 }}>{c.sub}</div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: "center", padding: 16, borderRadius: 8, fontSize: "12px", letterSpacing: "1.5px", fontWeight: 600,
            background: lastPsi === null ? "rgba(255,255,255,.03)" : starOk ? "rgba(34,197,94,.08)" : "rgba(239,68,68,.06)",
            color: lastPsi === null ? T.dim : starOk ? T.green : T.red,
            border: `1px solid ${lastPsi === null ? "rgba(255,255,255,.06)" : starOk ? "rgba(34,197,94,.2)" : "rgba(239,68,68,.15)"}`,
          }}>
            {lastPsi === null
              ? "AWAITING PSI EVALUATION — Record an interaction above to see convergence"
              : starOk
                ? "★ STAR STATE — All three protocols converge. Viable, resilient, relationally sound."
                : `✗ DIVERGENT — ${[!sigmaOk && "Σ", !gammaOk && "Γ", !psiOk && "Ψ"].filter(Boolean).join(", ")} below threshold`}
          </div>
        </section>

        {/* FULL REPORT BUTTON */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button onClick={generateReport} style={btnDim}>📋&ensp;GENERATE FULL REPORT</button>
          {copied && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)", borderRadius: 5, fontSize: "10px", color: T.green, animation: "fadeIn .3s ease" }}>
              ✓ Report copied to clipboard
            </div>
          )}
          <div style={{ fontSize: "9px", color: "#334155", marginTop: 6 }}>Copies complete diagnostic to clipboard</div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 16, fontSize: "10px", color: "#334155", textAlign: "center", letterSpacing: "1px" }}>
          Proyecto Estrella · Architect: Rafa · CC BY 4.0 · February 2026
        </div>
      </div>
    </div>
  );
}
