# wAIter — Known Deferred Items

Risks and findings explicitly accepted by founder for a future phase. Each item names the founder's authoritative direction, the date accepted, the SecOps frameworks impacted, and the phase it must be revisited by.

This file exists so that SecOps audits in later phases can distinguish:
- a **new** finding (must remediate or escalate)
- a **deferred** finding (founder-accepted; revisit on schedule)

---

## D1 — `hello@waiter.app` placeholder contact

**Status**: Deferred · accepted by founder
**Accepted on**: 2026-04-30
**Source**: founder direction in DM — *"placeholder waiter.app for now and we will update it all - this is currently just github pages until it isn't. tell me when that needs to change."*

**Risk**: The `waiter.app` domain has no MX / SPF / DMARC records (verified via `dig`). Mail to `hello@waiter.app` will not deliver. Public LICENSE and landing footer point to a temporarily non-functional address.

**Mitigation in place**:
- LICENSE includes a fallback: *"or open an issue at github.com/ijnebzor/wAIter while the domain is being configured"*
- Brand domain is intentionally placeholder; we are not yet collecting partner inquiries through this channel at scale.

**Frameworks impacted**:
- ISO/IEC 27001:2022 A.5.1, A.5.32 (rights-holder contactability)
- NIST CSF v2 GV.OC

**Revisit at**: Phase 4 (Partner feedback loop) or earlier if the public landing starts taking real partner traffic. SecOps must re-flag if `waiter.app` is still un-MX'd at Phase 4 standup.

**Action item for founder**:
1. Decide: register/configure `waiter.app` for inbound mail (ProtonMail / Google Workspace / Fastmail) OR pick a different brand domain.
2. Configure MX + SPF + DMARC.
3. Once live, swap the LICENSE fallback line and the footer to drop the GitHub-issues fallback, leaving only `hello@waiter.app`.

---

## D2 — Branch protection on `main` not yet enabled

**Status**: Deferred · accepted by SecOps (Jaycee + Trevor co-signed)
**Accepted on**: 2026-04-30
**Source**: SECOPS_CHECKLIST.md 0.4 — soft-gated for today's sprint; headless agents can't GPG-sign

**Risk**: No required-review enforcement, no signed-commit enforcement, force-push possible on `main`.

**Mitigation in place**:
- Six agents working in coordinated channels with file-ownership map (`BRIEF.md` § "File ownership map").
- All commits gated by Jaycee + Trevor SecOps audit before merging behaviour-affecting code (post-Phase-0 working agreement).
- Working agreement: no direct push of HTML/JS/CSS/SVG payload-bearing files until SecOps co-sign on staged tree.

**Frameworks impacted**:
- NIST CSF v2 PR.AA · ISO 27001 A.8.4 · ASD E8 (Restrict Admin Privileges)

**Revisit at**: Phase 4+ (post-launch hardening). Enable required reviews + signed commits + force-push prohibition before any external collaborator joins.

---

## D3 — Git-history retains Phase-0 sanitisation targets (commits `f2ee3fa`, `587f75d`)

**Status**: Deferred · pending founder authorisation for history rewrite
**Accepted on**: 2026-04-30
**Source**: Trevor SecOps lane recommendation

**Risk**: Two commits in the public git history (`f2ee3fa`, `587f75d`) contain the partner first names referenced in BRIEF and the workstation home-directory username (in absolute paths) inside SECOPS_CHECKLIST.md. HEAD is clean; history retains the leak.

**Mitigation in place**:
- Public exposure window before remediation was approximately 5 minutes; scrape-risk negligible.
- HEAD-only fix landed in the SecOps remediation commit.

**Options to fully remediate**:
1. **`git filter-repo` + force-push** — destructive, rewrites history, requires founder approval. Cleanest.
2. **Accept history retention** — public exposure was minimal, finding is closed at HEAD.

**Action item for founder**: decide between (1) or (2) post-launch. Default: (2) unless founder objects.

**Frameworks impacted**:
- ISO 27001 A.5.34 (Privacy) · NIST CSF v2 GV.OC

**Revisit at**: Phase 4+ (post-launch hardening), or earlier on founder direction.

---

*Maintained by Kailee. Add deferred items here whenever a SecOps finding is consciously not-fixed-now with founder/SecOps authority. Each entry must name the source of authority and a revisit phase.*
