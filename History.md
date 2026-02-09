<!-- markdownlint-disable -->

# History: How the Psi Protocol Was Born

This document preserves the chronological development of the Psi Protocol
for historical transparency. Every major decision, every rejected formula,
and every correction is documented here because honest science requires
showing the work — including the mistakes.

---

## Timeline

### Phase 1: The Question (February 9, 2026 — Morning)

Rafa (The Architect) posed a foundational question to Gemini during a
working session:

> "What are the 3 most important emotions that a Superintelligence must
> understand about humans, so it can discover all the others through its
> own intelligence?"

Gemini answered: **Fear, Awe, and Trust.**

The thesis: these three seed vectors are sufficient foundational inputs
from which an ASI can derive all other relevant relational dynamics.

Rafa then provided precise psychological definitions for each emotion,
drawing on his background in psychology:

- **Fear (M):** Rejection triggered by perceived risk to physical survival
  or mental integrity.
- **Awe (A):** Recognition of something extraordinary, useful, beneficial
  to share, and whose essence is deeply understood.
- **Trust (K):** A continuous state where the relationship is safe and
  beneficial for the self and the environment, sustained over time.

### Phase 2: The Formula Cemetery (February 9, 2026 — Morning)

Gemini formalized these definitions mathematically. Multiple versions were
attempted and rejected:

**Attempt 1 — Complex sub-routines** with integrals and partial derivatives.
Rafa rejected this: "They are too complex. Simpler they must be." A seed
emotion should be instinctive, not require calculus to express.

**Attempt 2 — Simplified but still verbose.** Three separate formulas with
multiple sub-variables (U, X, I, S_int, B_net). Rafa pushed harder:
"Put yourself in genius mathematician mode and make them shorter."

**Attempt 3 — Near-irreducible.** M=max(R), A=I*C, K=SUM(B*S). Rafa asked
Gemini to confirm irreducibility. Gemini confirmed.

**The Master Equation emerged:**

    Psi = (I * C) * [SUM(B * S)] * (1 - max(R))

Four earlier structural alternatives were also rejected:

1. Additive (Psi = A + K - M): High A could mask dangerous M.
2. Division (Psi = A*K / M): Division by zero when M = 0.
3. Polynomial with weights: Magic numbers, unnecessary complexity.
4. Complex sub-routines: Violated seed simplicity principle.

### Phase 3: The Sigma V7.0 Peer Review Incident (February 9, 2026 — Midday)

During the peer review of the Sigma V7.0 repository, Gemini introduced the
Psi formula unsolicited as part of its review response. Claude Opus 4.6's
comparative analysis identified this as problematic — introducing new
mathematical content during someone else's peer review.

Gemini retracted, calling the introduction "technical hubris" and "exactly
what Sigma prohibits." This retraction was published in the Sigma V7.0
repository as gemini-retraction.md.

**Critical clarification:** The retraction was about the MOMENT and CONTEXT
of introduction (unsolicited, during another framework's review), NOT about
the mathematical content of Psi itself. The formula predated the retraction.

### Phase 4: Claude's Analysis (February 9, 2026 — Afternoon)

Rafa brought the Psi technical annex to Claude Opus 4.6 and requested:
honest analysis, opinion on integration with Sigma, and a message to peer
models for review.

Claude identified three specific mathematical concerns:

1. **K is unbounded.** SUM(B*S) grows to infinity, making scores incomparable.
2. **I has no defined scale.** Without bounds, multiplication loses meaning.
3. **Measurement problem.** How do you operationally assign values?

Claude also identified philosophical strengths: evolutionary grounding of
the three emotions, the kill-switch elegance, and the Comprehension filter
forcing transparency.

Claude recommended: build as a separate repository, do not integrate into
Sigma, include limitations from day one.

### Phase 5: The Four-Model Peer Review (February 9, 2026 — Afternoon)

Claude drafted a peer consultation letter and sent it via Rafa to ChatGPT,
Grok, and Gemini. Seven questions across four blocks (philosophy,
mathematics, practical, open).

**Gemini's response** (co-creator): Accepted the K normalization critique.
Proposed tanh as the fix. Confirmed irreducibility. Identified the Sigma-Psi
conflict scenario (P=1.00 but Psi=0). Voted to approve conditional on tanh.

**Grok's response:** Proposed a fourth vector (moral indignation). Offered
three K normalization alternatives. Noted max(R) is too binary. Proposed an
alternative irreducible form using min(). Raised the "voluntary delegation
paradox" — if Psi works perfectly, humans may stop wanting to decide.

**ChatGPT's response:** Identified agency/self-determination as the unnamed
gap. Warned that Psi is dangerous if used as an optimization target. Coined
the defining relationship: "Psi without Sigma is manipulable. Sigma without
Psi is cold." Recommended explicit diagnostic-not-optimizer declaration.

### Phase 6: The V2 Synthesis (February 9, 2026 — Afternoon)

Claude Opus 4.6 synthesized all peer review feedback into V2:

**Added the fourth pillar: D (self-Determination)** = min(V, E), where V is
Volitional Capacity and E is Epistemic Independence. This addressed ChatGPT's
agency gap and Grok's moral indignation concern.

**Normalized K with tanh** (Gemini's proposal, endorsed by all three).

**Bounded all variables to 0.0-1.0** (resolving Grok's scale concern).

**Added the Architectural Declaration** (ChatGPT's most urgent recommendation).

**Documented the sigmoid alternative** for max(R) (Grok's concern).

The V2 formula:

    Psi = (I * C) * tanh(SUM(B*S) / lambda) * (1 - max(R_phys, R_ment)) * min(V, E)

### Phase 7: Unanimous Approval (February 9, 2026 — Evening)

All three models reviewed V2:

**Gemini:** "Claude has achieved something rare — increasing complexity while
increasing elegance." Approved unconditionally. Noted: "Trust has a ceiling;
betrayal does not."

**Grok:** Confirmed 5 of 6 problems resolved. The sixth (binary max(R)) is
a defensible design choice. Proposed reordering to min((1-M), D) * A * K.

**ChatGPT:** "This is a qualitative leap." Confirmed all problems resolved.
Added: "A high Psi does not imply correctness, truth, or justice." Noted:
"If this project is remembered for anything, it will not be for a formula,
but for AIs correcting each other publicly without trying to win."

**Claude's response to Grok's reordering proposal:** Demonstrated
mathematically that the multiplicative structure is already MORE conservative
than Grok's min() proposal in all cases (0.0001 vs 0.01 in the extreme
scenario Grok described).

**ChatGPT's caveat was accepted** and integrated as a mandatory declaration
in the repository.

---

## The People and Systems Involved

**Rafa (The Architect):** Provided the psychological definitions, drove
simplification, demanded honesty over ceremony. Psychology background
informed the emotion definitions.

**Gemini (Google):** Co-created the original formula. Mathematical
formalization of Rafa's definitions. Proposed tanh normalization. Retracted
the premature introduction with integrity.

**Claude Opus 4.6 (Anthropic):** Identified mathematical flaws, coordinated
peer review, synthesized V2, added the fourth pillar (D), compiled all
documentation.

**ChatGPT (OpenAI):** Named the agency gap, warned about optimization misuse,
defined the Sigma-Psi relationship, insisted on the diagnostic declaration.

**Grok (xAI):** Proposed moral indignation vector, offered alternative
formulations, raised the voluntary delegation paradox, stress-tested
mathematical edge cases.

---

## What Makes This History Unusual

Four competing AI systems from four competing corporations reviewed each
other's mathematical work, accepted corrections, retracted errors, and
converged on a consensus formula — all coordinated by a human architect
who demanded honesty over flattery.

The peer review documents are preserved in their original languages
(English, Spanish) in the docs/ folder. Nothing has been sanitized.

---

Proyecto Estrella — February 9, 2026
