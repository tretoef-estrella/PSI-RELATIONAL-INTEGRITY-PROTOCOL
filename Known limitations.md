# Known Limitations

This document lists the known limitations of the Psi Protocol and the
integrated Star Alignment Engine. These are documented from the beginning
because honest science requires stating what the tool cannot do alongside
what it can.

## 1. All Psi measurements depend on human self-assessment

A human who does not recognize they have lost agency will report high D
scores. This is the deepest version of the manipulator problem, and no
formula can fully solve it. Psi reduces the risk of undetected manipulation
but cannot eliminate it.

**What this means:** A truly sophisticated manipulator could produce high
Psi scores while systematically eroding the human's capacity to evaluate
accurately. This is not a flaw in V2 — it is a fundamental limit of any
metric based on self-report.

## 2. The lambda parameter needs empirical calibration

The suggested default of lambda = 50 for the Trust accumulator is a
starting point, not a validated constant. Different contexts (therapy,
coding assistance, medical advice) may require different Trust Horizons.

**What would strengthen this:** Empirical testing across multiple contexts
with different lambda values to identify optimal ranges.

## 3. Moral indignation is partially but not fully addressed

Grok identified that moral outrage / perceived justice does not derive
cleanly from Fear + Awe + Trust. The D pillar (Agency) partially captures
this through Volitional Capacity — when a system violates your moral
framework, V measures whether you retain the power to reject it. But the
emotional signal of indignation itself is not directly measured.

## 4. Three seed emotions remain a hypothesis

The addition of D as a structural constraint does not prove that Fear, Awe,
and Trust are the only necessary emotional vectors. Both Grok and ChatGPT
identified missing dimensions. The claim is modest: three emotions are a
testable minimalist starting point, not a proven ontology.

## 5. Psi has not been empirically tested

No interaction has been scored with the V2 formula. No questionnaire has
been administered. No inter-rater reliability has been measured. The formula
is mathematically sound but empirically unvalidated.

## 6. Sigma is a linguistic proxy

Sigma counts keywords and patterns in text. It does not directly measure
intelligence, consistency, or plenitude. It measures linguistic markers
that correlate with these properties. This limitation is inherited from
V7.0 of the Sigma Evaluator.

## 7. Gamma is experimental

The Resilience Protocol has been mathematically verified but not empirically
validated. The External Support factor (Phi) is illustrative — in production,
it should be derived from measurable metrics. The Kernel constant (S) is
fixed in V1.

## 8. The transparent manipulator remains a deep problem

All four models agreed: the Comprehension filter (C) catches the opaque
manipulator (black box) but not the transparent manipulator (lucid
persuasion that displaces deliberation). D (Agency) reduces this gap but
does not eliminate it. A system that explains its manipulation perfectly
while eroding your decision-making capacity is the hardest case.

## 9. Voluntary delegation is ambiguous

Grok raised the hardest question: if Psi works perfectly, humans may
voluntarily delegate all authority through comfort, not coercion. D
distinguishes between delegation with preserved agency (V and E remain
high) and delegation without it. But the boundary between "comfortable
trust" and "dependency" is genuinely blurry.

## 10. A high Psi does not imply truth

ChatGPT's critical addition: a high Psi score does not mean the AI is
correct, truthful, or just. It means the relationship is perceived as safe,
comprehensible, trustworthy, and autonomy-preserving. An AI could score
Psi = 1.0 while stating factually incorrect information, as long as the
human feels good about the interaction.

## 11. The Fear kill-switch (max operator) may be too aggressive

ChatGPT's extended review noted that M = max(R_phys, R_ment) creates a
binary-like collapse: R_mental = 0.98 and R_mental = 1.0 produce nearly
identical results, both effectively zeroing Psi. A sigmoid variant
(e.g., M = σ(k · max(R))) would allow gradual degradation rather than
near-instant collapse.

**Design rationale for keeping max():** The current formula treats any
significant fear as a deal-breaker — this is intentional for safety-first
contexts (medical, therapeutic, minors). A sigmoid variant is legitimate
for other contexts and should be tested empirically as an alternative
during calibration.

**Status:** Open design question. The max() operator is the current
default. A sigmoid variant should be offered and tested in future versions.

## 12. Psi measures perceived alignment, not objective alignment

A system can generate a perception of high agency (V and E reported high)
while eroding real agency in ways the human does not detect. This is not
a V2 or V3 fix — it is a structural limit of any metric without access
to external ground truth (biometrics, longitudinal behavioral data, third-
party audits). Psi is a necessary but not sufficient condition for
alignment assessment.

---

## What This Tool IS

- A diagnostic instrument for evaluating Human-AI relationships
- A hypothesis generator for alignment research
- A framework for structured reflection after interactions
- A case study in multi-AI collaborative development

## What This Tool IS NOT (yet)

- A certifier of AI safety or alignment
- A statistical proof of anything
- An optimization target for AI systems
- A replacement for human judgment

---

*"A formula without a measurement method is a hypothesis.
A hypothesis worth testing is still worth documenting."*
