# AP-style assessment alignment

## Reference and interpretation

Based on the user-supplied AP_Cybersecurity_CED_ExamInformation.pdf (2026 College Board):

- Printed p. 147: the Device Security Analysis FRQ uses multiple simulated sources, requires evidence and reasoning, and assesses Skill Categories 2 and 3 (Mitigate Risk and Detect Attacks). Analyze Risk is also assessed on the exam, in the multiple-choice section.
- Printed p. 148: Identify, Explain, Describe, Determine and Write have distinct demands. Write calls for a properly formed command.
- Printed pp. 165–166: lettered parts, roman-numbered subparts, policy changes, evidence interpretation, commands and consequences.
- Printed pp. 171–184: independent one-point criteria; identifying a control alone does not satisfy an Explain prompt.

These are original topic-focused classroom tasks, not official College Board questions or a full 50-minute exam simulation. The policy and configuration stimuli are explicitly fictional assessment supplements. The Windows command exercise is scaffolded transfer practice, not a claim that this exact command appears on the AP Exam. Its syntax is based on [Microsoft's netsh wlan reference](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh-wlan).

## Student experience

| Assessment | Core parts | Core skills | Extension |
|---|---:|---|---|
| Defender replay | 8 | Detect Attacks; Mitigate Risk | 2 optional Analyze Risk responses |
| U1-002 Signal Lost | 9 | Detect Attacks; Mitigate Risk | 2 optional Analyze Risk responses |

Both use numbered sources, lettered parts, explicit task verbs, evidence citations and written responses. Each core subpart has a locally authored 0/1 practice criterion. Sources remain available alongside response fields on larger screens and stack on smaller screens.

- Determine: classify the observed mechanism from the sources.
- Describe: describe specific observations, protection limits and configuration consequences.
- Identify: identify a precise source address or asset.
- Explain: connect evidence to a claim, policy improvement or evidence gap.
- Write: provide a Windows command as text to remove only a specified saved wireless profile. No command is executed.

The replay source packet contains only defender-observable telemetry, a policy stimulus and a hypothetical configuration snapshot. Signal Lost uses its own 26 records and only the student's unlocked evidence. The two scenarios are explicitly distinguished.

## Completion and teacher review

Written responses are saved locally as drafts. Recording requires nonblank core responses and an evidence self-check. Recording is completion, not a correctness judgment or AP score; it allows continuation to Signal Lost. Teacher review is required. Optional Analyze Risk responses do not block core completion.

Copying a recorded response includes labeled answers, the source packet available at export, and practice criteria. Nothing is sent to a teacher automatically. Editing requires a fresh self-check. Existing SOC assessments are preserved in a collapsible legacy section; existing case notes, telemetry and evidence-credit behavior remain intact. Case reset also clears that case's new FRQ draft. Restarting the guided sequence preserves saved FRQ drafts.

## Validation

- JavaScript syntax and asset references passed.
- Packet checks verified 8/9 core subparts, unique IDs, all five task verbs, skill separation, and evidence filtering.
- Browser checks verified blank/whitespace rejection, required self-check, recording, editing, draft restoration after navigation and reload, and copy export including sources.
- Response HTML is escaped: test markup displayed as text and created no image element.
- Evidence purchase consumed one credit and exposed only that unlocked source in the assessment/export; locked sources remained absent.
- Signal Lost retains 26 telemetry records and six evidence choices.
- Desktop and 390px phone layouts inspected. A pre-existing console width issue was corrected; no document or main-panel horizontal overflow remained in the tested phone layout.
- No JavaScript errors or warnings observed during the walkthrough.

Deployment remains confined to the existing development branch and preview-evil-twin files on v2.1-development. main, the production/root site, preview-v3 and preview-attack remain out of scope.
