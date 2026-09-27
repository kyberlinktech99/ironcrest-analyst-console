# Unit 1 exercise library

All three existing Unit 1 cases are available from the new landing page:

| Case | Guided focus | Final assessment |
| --- | --- | --- |
| U1-001 · Possible Account Compromise | Baselines, credential exposure, authentication and post-login activity | 8 core subparts + Analyze Risk extension |
| U1-002 · Signal Lost | Existing public-network experience, followed by wireless investigation | 9 core subparts + Analyze Risk extension |
| U1-003 · Chain Reaction | Social engineering, multiple exposure opportunities and causal uncertainty | 8 core subparts + Analyze Risk extension |

Each activity follows seven guided stages, then case acceptance, investigation, and Final FRQ submission. The landing page also offers direct case briefings for returning students. The two new teaching vignettes are explicitly separate from the corresponding case evidence. The three original case datasets and evidence-credit system are unchanged.

Final assessments use Identify, Explain, Describe, Determine and Write. Core questions assess Mitigate Risk and Detect Attacks; Analyze Risk is a separate extension, following the supplied AP Cybersecurity exam excerpt (printed pp. 147–148, 165–166, 171–184). These are original practice exercises, not official exams or automatic grading.

Drafts are stored separately per case. Prior SOC assessments remain accessible in the preserved-assessment section. Completion saves a response locally and offers copying to the teacher's class submission system; nothing is sent automatically. Reset Case clears only the selected case's investigation and final FRQ. Guided progress restarts when returning to an introduction; investigation and FRQ progress persist in the same browser.

## Configuration exercises

Commands are written responses only and are never executed. Hypothetical configuration snapshots are explicitly distinguished from incident findings.

- U1-001: local Windows account status; the exercise distinguishes local account changes from cloud-session revocation. [Microsoft net user reference](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/net-user).
- U1-002: existing saved wireless-profile exercise.
- U1-003: regular-file permissions on a Linux triage workstation, with numeric-mode reference supplied. [GNU numeric modes](https://www.gnu.org/software/coreutils/manual/html_node/Numeric-Modes.html).

## Validation

- Static checks: all catalog cases, unique storage keys, source filtering, stable evidence references, all five verbs, skill mapping, seven-stage lessons, asset references and JavaScript syntax.
- Browser checks: both new guided paths through case acceptance and final FRQ; incorrect checkpoint blocking; blank final-response blocking; final completion; separate drafts; card status updates; direct case entry; preserved Signal Lost launch.
- Desktop and 390px mobile layouts inspected. No document overflow in tested landing, lesson and FRQ views. Fixed the existing hidden mobile return-to-exercises control. No browser warning/error logs during these checks.
- Publication remains limited to the development branch and /preview-evil-twin/; production and other previews are preserved.
