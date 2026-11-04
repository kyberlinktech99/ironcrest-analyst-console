window.STUDIO_LESSONS=[
  {
    "id": "phishing",
    "name": "The invitation that asks too much",
    "skill": "Phishing analysis",
    "minutes": 12,
    "topic": "1.1",
    "objective": "1.1.A",
    "target": "Explain how a message manipulates a person and choose an independent verification path.",
    "source": "Simulation HUB / Spot the Phish",
    "steps": [
      [
        "Read before you react",
        "MAIL-01 · From: Campus Events <events@campus-invites.example>\nSubject: Your place expires in 20 minutes\nConfirm your seat using your school account.\nButton destination: https://campus-check.example/confirm",
        "Which observations would you record before deciding whether this is phishing?",
        "Record the exact sender, destination, requested action, and urgency. Urgency is a warning sign, not proof of malicious intent. These are fictional, nonfunctional example domains."
      ],
      [
        "Separate identity from appearance",
        "MAIL-02 · Display name: Campus Events\nKnown campus portal: portal.school.example\nMessage destination: campus-check.example\nNo event appears in the known portal.",
        "What can the mismatch establish? What can it not establish?",
        "The destination differs from the known portal. That supports suspicion; it does not identify the operator or prove credentials were stolen. Logos and polished language do not establish identity."
      ],
      [
        "Choose a verification route",
        "USER-03 · Student has not clicked.\nSchool provides a report-phishing control and a known events office number.",
        "How can the student verify the invitation without trusting the message?",
        "Report through the approved channel and check the known portal or contact the events office using independently obtained details. Do not reply to the suspicious sender to verify it."
      ],
      [
        "Transfer the concept",
        "MAIL-04 · A polished message comes from a real staff mailbox.\nIt unexpectedly asks for a password on a new site.",
        "Does a familiar sender make the request safe?",
        "A real mailbox can be compromised. Evaluate the requested action and destination, verify independently, and report the concern. Good grammar and familiarity are not safety guarantees."
      ]
    ],
    "challenge": {
      "evidence": "MAIL-11 · From: Library Services <library@school.example>\nA familiar account asks you to enter your password at library-access.example within 30 minutes. The known library portal is library.school.example.",
      "question": "Write two observations, one inference with a limitation, and a safe next action. Cite MAIL-11.",
      "options": [
        "Use the link because the sender is familiar",
        "Verify through the known library portal and report the message",
        "Reply with a password to confirm identity"
      ]
    }
  },
  {
    "id": "firewall",
    "name": "One rule can undo the boundary",
    "skill": "Firewall rules",
    "minutes": 15,
    "topic": "3.4",
    "objective": "3.4.A",
    "target": "Predict traffic outcomes in an explicitly ordered, first-match ruleset.",
    "source": "Unit3 / Firewall Rule Builder",
    "steps": [
      [
        "State the evaluation model",
        "MODEL · Stateless inbound filter; top to bottom; first match wins.\nDefault action: DENY.\nWeb server: 192.0.2.10\nApproved admin: 198.51.100.5",
        "Why do we need the model before predicting behavior?",
        "Firewall products differ. In this exercise, the first matching rule decides. We are evaluating one inbound packet, not stateful return traffic or an entire product configuration."
      ],
      [
        "Predict the approved flow",
        "R1 ALLOW TCP from ANY to 192.0.2.10 port 443\nR2 ALLOW TCP from 198.51.100.5 to 192.0.2.10 port 22\nR3 DENY ANY to 192.0.2.10\nTEST: 198.51.100.5 → 192.0.2.10 TCP/22",
        "Which rule decides, and why?",
        "R1 does not match port 22; R2 matches source, destination, protocol, and port, so the packet is allowed. R3 is not evaluated."
      ],
      [
        "Find the shadowed rule",
        "R1 ALLOW TCP from ANY to 192.0.2.10 port 22\nR2 DENY TCP from 203.0.113.9 to 192.0.2.10 port 22\nTEST: 203.0.113.9 → 192.0.2.10 TCP/22",
        "Will the specific deny block this source?",
        "No. R1 matches first. Move the specific deny before the broad allow, or replace the broad allow with a narrowly scoped permission that meets the policy. Test both permitted and blocked flows."
      ],
      [
        "Check the claim",
        "RULE · DENY TCP destination port 23\nTRAFFIC · An unencrypted service operates on TCP/2323.",
        "Does blocking a conventional port block every instance of a protocol?",
        "No. A port rule matches port numbers. It does not inherently recognize a service running on another port. Application inspection requires additional capabilities and configuration."
      ]
    ],
    "challenge": {
      "evidence": "MODEL: first match, default DENY.\nR1 DENY TCP from ANY to 192.0.2.10 port 22\nR2 ALLOW TCP from 198.51.100.5 to 192.0.2.10 port 22",
      "question": "Predict the admin packet outcome, identify the deciding rule, and propose a least-privilege correction plus two tests.",
      "options": [
        "Allowed by R2",
        "Denied by R1",
        "Allowed because it is an admin address"
      ]
    }
  },
  {
    "id": "logs",
    "name": "A login is an event, not a verdict",
    "skill": "Log analysis",
    "minutes": 15,
    "topic": "4.4",
    "objective": "4.4.C",
    "target": "Use device logs to distinguish observed activity, an inference, and missing context.",
    "source": "Unit4 / Log Analysis Detective",
    "steps": [
      [
        "Read the recorded facts",
        "AUTH-01 03:14:01 FAILED user=root src=203.0.113.33\nAUTH-02 03:14:02 FAILED user=admin src=203.0.113.33\nAUTH-03 03:14:31 SUCCESS user=backup_svc src=203.0.113.33",
        "Which statement can you make without guessing?",
        "The displayed records show two failures and a successful authentication from the same source address. The excerpt does not establish the total attempt count, password values, or the human behind the address."
      ],
      [
        "Form a bounded hypothesis",
        "BASE-04 · backup_svc normally authenticates from 192.0.2.50.\nNo maintenance is scheduled.\nAuthentication logs do not record password candidates.",
        "What does this add? Can we distinguish spraying from stuffing?",
        "The deviation raises suspicion of unauthorized access. Without attempted credential patterns or other evidence, these records cannot establish spraying, stuffing, or a particular password-guessing method."
      ],
      [
        "Ask for useful evidence",
        "Available: session activity, change ticket, account-owner verification, unrelated printer log.",
        "Which request would most directly test whether this session was authorized?",
        "Check the change ticket and verify with the account owner using a trusted channel. Session activity shows subsequent actions. Select requests because they test the hypothesis, rather than collecting unrelated records."
      ],
      [
        "Respond with scope",
        "ENDPOINT-05 · Session launches an unexpected archive command.\nPolicy permits shift lead to revoke suspicious sessions.",
        "What can you recommend while preserving evidence?",
        "Preserve relevant records and escalate for authorized, scoped session containment. Verify whether the archive was created and transferred. An archive command alone does not prove successful data theft."
      ]
    ],
    "challenge": {
      "evidence": "AUTH-11 · 40 failed logins followed by one success from 198.51.100.77.\nBASE-12 · The account normally uses an approved automation host.\nNo session activity is available yet.",
      "question": "Cite an observation and a bounded hypothesis. Request one record that could change your assessment and explain why.",
      "options": [
        "Confirmed data theft",
        "Suspicious authentication requiring context",
        "Proven password spraying"
      ]
    }
  },
  {
    "id": "siem",
    "name": "Three signals, one defensible decision",
    "skill": "SIEM triage",
    "minutes": 18,
    "topic": "5.6",
    "objective": "5.6.A–E (topic-level mapping)",
    "target": "Correlate application signals and recommend a proportionate response while stating uncertainty.",
    "source": "Unit5 / SIEM Alert Investigator",
    "steps": [
      [
        "Start with an alert",
        "WAF-01 14:22:01 request_id=Q17 SQL-like pattern detected\nAction: LOG ONLY\nEndpoint: /api/search",
        "What does this alert establish?",
        "A detection rule matched a request and the WAF logged it. It does not establish that the database executed injected input or that data left the organization."
      ],
      [
        "Correlate by a shared identifier",
        "DB-02 14:22:03 request_id=Q17 unusual query; 8400 rows returned\nAPP-03 14:22:04 request_id=Q17 HTTP 200; response_bytes=2100000",
        "Why is the identifier stronger than time proximity alone?",
        "The shared request identifier links records to the same request more directly. The query and large response support concern about unintended data access, but do not establish the exact response contents."
      ],
      [
        "Identify the evidence boundary",
        "DLP-04 request_id=Q17 sensitive-data pattern match\nNo response capture or recipient confirmation is available.",
        "What can you say about data exposure without overstating it?",
        "The correlated evidence supports possible sensitive-data exposure. Confirm response content and affected records through approved investigation. A pattern match can be wrong; alert severity is not proof."
      ],
      [
        "Recommend and verify",
        "POLICY · Shift lead may temporarily restrict the affected endpoint.\nBusiness owner needs a service-impact estimate.",
        "What belongs in the handoff?",
        "Cite Q17 and the four records, describe the suspected scope and remaining uncertainty, recommend approved endpoint restriction and evidence preservation, and verify that the risky path is blocked without disrupting required flows."
      ]
    ],
    "challenge": {
      "evidence": "WAF-11 · request_id=Q21 blocked suspicious input\nDB-12 · request_id=Q22 large approved export\nAPP-13 · request_id=Q21 HTTP 403",
      "question": "Should these be merged into one confirmed data-loss incident? Explain using identifiers and propose a next check.",
      "options": [
        "Yes, timestamps are enough",
        "No; distinguish Q21 from Q22 and verify the export authorization",
        "Yes, every WAF alert proves compromise"
      ]
    }
  },
  {
    "id": "trust",
    "name": "Encrypted does not mean trustworthy",
    "skill": "Certificate trust",
    "minutes": 12,
    "topic": "5.4",
    "objective": null,
    "target": "Explain the difference between a trusted certificate chain, hostname validation, and a safe website.",
    "source": "Unit5 / Certificate Trust Chain",
    "steps": [
      [
        "Follow the chain",
        "Leaf: portal.school.example → signed by Training Intermediate\nIntermediate → signed by Training Root\nTraining Root → installed in this browser trust store",
        "Why is a self-signature not enough to trust every root?",
        "Trust comes from a configured trust anchor, not simply from a self-signature. The browser validates signatures and constraints along the path to an accepted anchor."
      ],
      [
        "Check more than the chain",
        "Requested host: portal.school.example\nLeaf subject alternative name: accounts.school.example\nDates: currently within validity period",
        "Would a trusted issuer make this host mismatch acceptable?",
        "No. Hostname validation must also succeed. A valid chain for a different host does not authenticate the requested host."
      ],
      [
        "Interpret expiration",
        "Leaf certificate expired yesterday.\nA browser displays a certificate warning.",
        "Does expiration prove the operator is malicious or that encryption is impossible?",
        "Neither. The certificate is outside its validity period and should fail normal validation. Encryption can still be technically possible; that does not justify bypassing the warning."
      ],
      [
        "Transfer to a phishing site",
        "An attacker-controlled lookalike site obtains a valid certificate for its own domain.",
        "Does the browser lock establish that the organization is legitimate?",
        "No. TLS authenticates the domain under the certificate validation model and protects transport. It does not establish that a business is honest or that a page is safe."
      ]
    ],
    "challenge": {
      "evidence": "Requested: records.school.example\nCertificate SAN: records.school.example\nChain: trusted; dates: current\nPage asks for an unexpected payment to release grades.",
      "question": "What does the certificate support, what remains unproven, and how should the request be verified?",
      "options": [
        "The payment is legitimate",
        "The domain connection can validate; the payment request still needs independent verification",
        "A trusted certificate makes phishing impossible"
      ]
    }
  }
];
