/* Ironcrest Study Center curriculum data. Edit this file to add/revise objective summaries, vocabulary, flashcards and original practice. */
window.IRONCREST_STUDY_DATA = {
  "topics": [
    {
      "id": "1.1",
      "title": "Understanding Social Engineering",
      "status": "ready",
      "cisco": "Cisco Topic 1.1: Social Engineering Red Flag Hunt; Module 2.2 Deception (reinforcement)",
      "objectives": [
        [
          "1.1.A",
          "Identify common indicators of social engineering tactics.",
          "Social engineering uses psychological manipulation to elicit information or persuade someone to click a link, download a file, or reveal sensitive information. It may arrive by email, text, social media, or in person. Urgency pressures fast action; intimidation threatens negative consequences."
        ],
        [
          "1.1.B",
          "Explain how social engineering tactics influence victims to perform a desired action.",
          "Fear of negative consequences can drive compliance. Time pressure can prevent a person from stopping to evaluate whether the request is reasonable or safe."
        ],
        [
          "1.1.C",
          "Describe possible impacts for victims of social engineering attacks.",
          "Exposed personal details can enable impersonation and challenge-question guessing. An exposed one-time code can help an attacker log in. A malicious file or link may install malware, steal browser information, or capture credentials."
        ]
      ],
      "vocab": [
        [
          "Elicitation",
          "Drawing information from a person, often through conversation or apparently harmless questions."
        ],
        [
          "Urgency",
          "Pressure to act quickly, reducing time to verify a request."
        ],
        [
          "Intimidation",
          "Threat of negative consequences if the target does not comply."
        ],
        [
          "Credential harvesting",
          "Capturing a person's login information, often using a deceptive page."
        ],
        [
          "One-time password (OTP)",
          "A temporary code used to verify identity; it is sensitive and should not be shared."
        ]
      ],
      "flash": [
        [
          "How are urgency and intimidation different?",
          "Urgency creates pressure to act quickly; intimidation threatens negative consequences. One message can use both."
        ],
        [
          "Does entering credentials into a fake login page prove an attacker accessed the account?",
          "No. It supports credential exposure; separate authentication or activity evidence is needed to prove account access."
        ],
        [
          "Name two possible consequences of social engineering.",
          "Examples: credential exposure, identity impersonation, malware installation, or stolen one-time codes."
        ]
      ],
      "questions": [
        {
          "q": "A message says an employee's pay will be delayed unless they immediately verify their account. Which two tactics are present?",
          "a": [
            "Urgency and intimidation",
            "Only technical exploitation",
            "War driving and jamming",
            "Only reconnaissance"
          ],
          "c": 0,
          "e": "The deadline creates urgency, and the threatened loss of pay creates intimidation."
        },
        {
          "q": "A user typed a password into a fake sign-in page. Which conclusion is best supported?",
          "a": [
            "The attacker definitely accessed the account.",
            "The credentials may have been exposed; login evidence is needed to confirm later use.",
            "The attacker installed malware.",
            "The website was legitimate."
          ],
          "c": 1,
          "e": "The observed action supports exposure, not proof of later account access."
        },
        {
          "q": "An attacker asks a receptionist about employee email formats and department names. Why might that matter?",
          "a": [
            "It proves a password attack occurred.",
            "It supports later username construction and targeted impersonation.",
            "It prevents phishing.",
            "It verifies the attacker's identity."
          ],
          "c": 1,
          "e": "Elicited organizational details can improve later targeting without immediately proving compromise."
        }
      ]
    },
    {
      "id": "1.2",
      "title": "Suspicious Website Logins",
      "status": "ready",
      "cisco": "Cisco Topic 1.2: Verify User Identity Through Authentication; Module 6 Access Control (reinforcement)",
      "objectives": [
        [
          "1.2.A",
          "Identify common signs of a password attack.",
          "Online password attacks try common, patterned, or stolen passwords. Warning signs include many failed logins in a short period, attempts at unusual times, and attempts from unknown devices."
        ],
        [
          "1.2.B",
          "Explain how adversaries take advantage of weak authentication.",
          "Attackers exploit predictable passwords that use common words, personal dates, family or pet names, or common number/symbol patterns. They may build candidate-password dictionaries from public information and automate guesses."
        ],
        [
          "1.2.C",
          "Explain how to make authentication stronger.",
          "Use long, random, unique passwords or passphrases; use a password manager; avoid personally meaningful words and numbers; enable multifactor authentication (MFA) when available."
        ]
      ],
      "vocab": [
        [
          "Authentication",
          "Verifying that a person or device is who it claims to be."
        ],
        [
          "Authorization",
          "Determining what an authenticated identity is permitted to access or do."
        ],
        [
          "Password manager",
          "A tool that generates and stores strong, unique passwords."
        ],
        [
          "MFA",
          "Authentication requiring more than one factor or independent proof of identity."
        ],
        [
          "Know / Have / Are",
          "Common authentication factors: something you know, have, or are."
        ],
        [
          "Dictionary attack",
          "Trying candidate passwords from a list, often including likely words or patterns."
        ]
      ],
      "flash": [
        [
          "Which login pattern suggests an online password attack?",
          "Many failed attempts over a short time, unusual login times, or unknown devices."
        ],
        [
          "What makes a password stronger?",
          "Long, random, unique; avoid personal details and reuse. Use a password manager or unique passphrase."
        ],
        [
          "How do authentication and authorization differ?",
          "Authentication verifies identity; authorization decides permitted access."
        ]
      ],
      "questions": [
        {
          "q": "An account shows 40 failed sign-ins in two minutes from an unfamiliar device. What is the strongest interpretation?",
          "a": [
            "Normal use is proven.",
            "The activity is consistent with a possible online password attack.",
            "The account was definitely compromised.",
            "MFA has failed."
          ],
          "c": 1,
          "e": "The pattern is suspicious, but failed attempts do not establish successful access."
        },
        {
          "q": "Which password is most resistant to targeted guessing?",
          "a": [
            "DogName2026!",
            "Birthday!2009",
            "A long, randomly generated unique password",
            "SchoolMascot12!"
          ],
          "c": 2,
          "e": "Length, randomness, and uniqueness make guessing and reuse less effective."
        },
        {
          "q": "A person enters a password and then approves a prompt on a registered device. What protection is being used?",
          "a": [
            "Authorization only",
            "Multifactor authentication",
            "War driving",
            "Website defacement"
          ],
          "c": 1,
          "e": "The password and device-based proof provide different authentication factors."
        }
      ]
    },
    {
      "id": "1.3",
      "title": "Best Practices for Public Networks",
      "status": "ready",
      "cisco": "Cisco Topic 1.3: Adversaries; Module 2.4 Wireless and Mobile Device Attacks; Module 11.2 WLAN Threats / 11.3 Secure WLANs",
      "objectives": [
        [
          "1.3.A",
          "Identify the type of adversary conducting a cyberattack.",
          "Low-skilled actors rely on tools made by others and known vulnerabilities. High-skilled actors can create or modify tools, adapt to defenses, and discover undocumented vulnerabilities (zero days). Motivations include greed, recognition, dedication to a cause, revenge, politics, and beliefs. Cisco extends this objective with six threat-actor categories and TTPs."
        ],
        [
          "1.3.B",
          "Identify types of wireless cyberattacks.",
          "Evil twin: an attacker creates a WAP with a similar or identical SSID; a victim may connect and expose traffic, although encrypted HTTPS content cannot be read just by capturing it. Jamming: electromagnetic interference blocks legitimate wireless traffic, causing denial of service. War driving: detecting wireless beacons while driving or walking to map networks and signal reach."
        ],
        [
          "1.3.C",
          "Describe actions individuals can take to increase protection of sensitive data when using the internet and Wi-Fi.",
          "Verify the exact intended SSID; consider data sensitivity before using unencrypted Wi-Fi (DNS queries may be exposed). A VPN encrypts traffic to the VPN operator: the service provider cannot see that traffic, but the VPN provider can. A VPN does not prevent jamming."
        ]
      ],
      "vocab": [
        [
          "Threat actor",
          "A person, group, or organization that may conduct malicious cyber activity."
        ],
        [
          "Low-skilled / high-skilled",
          "Capability based on tools, vulnerability knowledge, and ability to adapt—not the amount of damage."
        ],
        [
          "SSID",
          "The name used to identify a wireless network."
        ],
        [
          "Evil twin",
          "An attacker-controlled wireless access point with a similar or identical network name."
        ],
        [
          "Jamming / DoS",
          "Wireless interference that prevents legitimate communication, affecting availability."
        ],
        [
          "War driving",
          "Detecting wireless beacons while moving around an area; a reconnaissance technique."
        ],
        [
          "VPN",
          "An encrypted connection to a VPN operator; trust shifts to that operator."
        ],
        [
          "TTPs",
          "Tactic = goal; technique = method; procedure = a specific implementation."
        ],
        [
          "Threat-actor categories (Cisco)",
          "Nation-state, cybercriminal, hacktivist, insider threat, script kiddie, and terrorist group."
        ]
      ],
      "flash": [
        [
          "Does severe impact prove high skill?",
          "No. Capability is assessed from the actor's tools, ability to adapt, and vulnerability knowledge."
        ],
        [
          "What distinguishes an evil twin from jamming?",
          "Evil twin lures a device to a rogue access point; jamming interferes with radio communication and causes DoS."
        ],
        [
          "What is war driving?",
          "Detecting wireless network beacons while driving or walking; reconnaissance, not automatically traffic interception."
        ],
        [
          "What does a VPN change on public Wi-Fi?",
          "It encrypts traffic to the VPN operator; the VPN provider can still see traffic, and a VPN does not stop jamming."
        ]
      ],
      "questions": [
        {
          "q": "An attacker uses a publicly available tool against a documented vulnerability and causes a large outage. Which capability assessment is best supported?",
          "a": [
            "High-skilled, because the outage was large.",
            "Low-skilled behavior is supported by the available tool and known vulnerability.",
            "Nation-state attribution is proven.",
            "Skill cannot ever be assessed."
          ],
          "c": 1,
          "e": "The size of the outage is not evidence of technical capability."
        },
        {
          "q": "A café guest connects to a near-identical Wi-Fi network created by an attacker. What is this?",
          "a": [
            "War driving",
            "Jamming",
            "Evil twin",
            "Password spraying"
          ],
          "c": 2,
          "e": "An attacker-controlled WAP with a similar SSID is the evil twin mechanism."
        },
        {
          "q": "An attacker walks around a building collecting wireless beacon information. Which activity is shown?",
          "a": [
            "War driving",
            "Jamming",
            "Credential reuse",
            "Data exfiltration"
          ],
          "c": 0,
          "e": "War driving can be done while walking and gathers network information."
        },
        {
          "q": "A traveler uses a VPN on public Wi-Fi. Which statement is most accurate?",
          "a": [
            "The VPN stops radio interference.",
            "All parties lose access to all traffic.",
            "Traffic is encrypted to the VPN operator, which becomes a trusted party.",
            "The Wi-Fi network is automatically authentic."
          ],
          "c": 2,
          "e": "A VPN changes who can view traffic; it does not validate the SSID or prevent jamming."
        }
      ]
    },
    {
      "id": "1.4",
      "title": "AI-Based Cybersecurity Attacks",
      "status": "foundation",
      "cisco": "Cisco Topic 1.4: AI-Based Cybersecurity Attacks (lesson-plan mapping)",
      "objectives": [
        [
          "1.4.A",
          "Explain how adversaries use AI-powered tools to augment cyberattacks.",
          "AI can create voice/video impersonations from samples, generate fluent phishing in target languages, and assist reconnaissance. Attackers can craft prompts to extract sensitive LLM information, seed false information in web sources that enter training sets, or use AI coding tools to help create malware, modify code, and find vulnerabilities."
        ],
        [
          "1.4.B",
          "Explain how to protect against some AI-augmented cyberattacks.",
          "Verify identity in high-stakes situations using a shared secret or trusted independent channel; enable MFA; avoid entering personal or sensitive information into AI tools; and verify AI-generated claims using reputable, stable, non-AI sources."
        ]
      ],
      "vocab": [
        [
          "Voice cloning / digital avatar",
          "AI-generated imitation of a person's voice or appearance."
        ],
        [
          "Generative AI / LLM",
          "Systems that generate content such as text and code based on patterns learned from data."
        ],
        [
          "Prompt-based data extraction",
          "Crafting inputs intended to make an AI system reveal sensitive information."
        ],
        [
          "AI-assisted reconnaissance",
          "Using AI to gather and organize public information about a target."
        ],
        [
          "Shared secret",
          "A private word or phrase two parties can use to verify identity in a high-stakes interaction."
        ]
      ],
      "flash": [
        [
          "Why is grammar no longer a reliable phishing test?",
          "Generative AI can create fluent messages in many target languages."
        ],
        [
          "How can someone verify a suspicious voice call?",
          "Use an established shared secret or a separate trusted communication channel."
        ],
        [
          "Why should sensitive data stay out of public AI tools?",
          "Inputs may be retained or reused; some information may become exposed or extractable."
        ]
      ],
      "questions": [
        {
          "q": "A caller sounds exactly like a family member and requests an urgent transfer. Which defense best addresses AI impersonation?",
          "a": [
            "Trust the familiar voice.",
            "Verify through a shared secret or independent trusted channel.",
            "Disable all device updates.",
            "Use the same password everywhere."
          ],
          "c": 1,
          "e": "Voice imitation can defeat familiarity; independent verification is safer."
        },
        {
          "q": "Why is a perfectly written email not proof that it is legitimate?",
          "a": [
            "AI can produce convincing phishing in many languages.",
            "All phishing contains spelling mistakes.",
            "Only insiders use AI.",
            "MFA guarantees email authenticity."
          ],
          "c": 0,
          "e": "AI reduces the usefulness of awkward language as a phishing indicator."
        },
        {
          "q": "An AI chatbot returns a claim about a security incident. What is the safest next step?",
          "a": [
            "Repeat the claim immediately.",
            "Treat it as verified because AI generated it.",
            "Verify it against reputable, stable, non-AI sources.",
            "Enter internal credentials to request a better answer."
          ],
          "c": 2,
          "e": "AI output should be evaluated and independently verified."
        }
      ]
    },
    {
      "id": "1.5",
      "title": "Leveraging AI in Cyber Defense",
      "status": "foundation",
      "cisco": "Cisco Topic 1.5: AI-Powered Defensive Tools and Threat Detection (lesson-plan mapping)",
      "objectives": [
        [
          "1.5.A",
          "Explain how cyber defenders can leverage AI-powered tools to protect networks, applications, and data.",
          "AI can review security configurations and suggest improvements, inspect code for vulnerabilities and mitigations, and propose automated detection rules. A knowledgeable security technician, programmer, or detection engineer should review recommendations before implementation."
        ],
        [
          "1.5.B",
          "Explain how AI-powered tools are enabling faster and more accurate threat detection and response.",
          "AI can rapidly analyze volumes of events that people cannot review one by one, sort likely malicious from harmless activity, alert human personnel, and perform specific corrective actions when programmed. Faster intervention can reduce loss and damage."
        ]
      ],
      "vocab": [
        [
          "Security configuration review",
          "Examining settings such as firewall rules and access controls for security weaknesses."
        ],
        [
          "Code analysis",
          "Reviewing application code to identify potential vulnerabilities."
        ],
        [
          "Detection rule",
          "A condition that flags events or behavior for security monitoring."
        ],
        [
          "Alert triage",
          "Evaluating alerts to prioritize likely malicious activity."
        ],
        [
          "Human review",
          "A qualified person checks AI recommendations before deployment or other consequential action."
        ]
      ],
      "flash": [
        [
          "Name three defensive uses of AI.",
          "Review configurations, analyze code, and propose detection rules."
        ],
        [
          "Why does AI help SOC analysts?",
          "It can process large volumes of events and prioritize activity likely to be malicious."
        ],
        [
          "Who should review AI-generated detection rules?",
          "A knowledgeable detection engineer before deployment."
        ]
      ],
      "questions": [
        {
          "q": "An AI tool recommends a new firewall rule. What should happen before it is applied?",
          "a": [
            "Apply it automatically without review.",
            "Have a knowledgeable security technician review the recommendation.",
            "Disable monitoring.",
            "Assume the current configuration is already compromised."
          ],
          "c": 1,
          "e": "The CED requires knowledgeable human review of AI-generated configuration recommendations."
        },
        {
          "q": "A SOC receives millions of daily events. What is a useful role for AI?",
          "a": [
            "Guarantee that no attacks occur.",
            "Prioritize events likely to be malicious for human attention.",
            "Eliminate the need for any analyst.",
            "Prove attribution from one alert."
          ],
          "c": 1,
          "e": "AI helps sort large volumes of events and enables faster detection and response."
        },
        {
          "q": "AI proposes a detection rule. Who should validate it before deployment?",
          "a": [
            "Any end user",
            "A knowledgeable detection engineer",
            "The attacker",
            "No one"
          ],
          "c": 1,
          "e": "A detection engineer should review AI-suggested detection rules."
        }
      ]
    }
  ],
  "actorVocab": [
    [
      "Nation-state",
      "Backed by a government; often associated with espionage or strategic sabotage."
    ],
    [
      "Cybercriminal",
      "Usually motivated by financial gain; may steal data, deploy ransomware, or extort."
    ],
    [
      "Hacktivist",
      "Uses cyber activity to promote a social or political cause; may deface sites or use DDoS."
    ],
    [
      "Insider threat",
      "Current or former authorized person who misuses access or creates a security risk."
    ],
    [
      "Script kiddie",
      "Typically low-skilled and reliant on pre-made tools."
    ],
    [
      "Terrorist group",
      "Uses cyber activity to support terrorist objectives; may target critical infrastructure."
    ]
  ],
  "actorQuestions": [
    {
      "q": "An employee deliberately leaks sensitive company data because of a workplace grievance. Which category fits best?",
      "a": [
        "Insider threat",
        "Nation-state",
        "Hacktivist",
        "Script kiddie"
      ],
      "c": 0,
      "e": "The person's organizational access and misuse of that access support an insider-threat classification."
    },
    {
      "q": "A group deploys ransomware and demands payment to restore access. Which actor motivation is most likely?",
      "a": [
        "Financial gain",
        "National defense",
        "Scientific research",
        "Routine maintenance"
      ],
      "c": 0,
      "e": "The payment demand supports financial motivation commonly associated with cybercrime."
    },
    {
      "q": "Which evidence most directly supports a nation-state classification?",
      "a": [
        "Use of a public tool",
        "Government backing and strategic objectives",
        "An attack that happened at night",
        "A large number of failed logins"
      ],
      "c": 1,
      "e": "Government backing is the defining characteristic."
    },
    {
      "q": "A group defaces a website to publicize its opposition to a policy. Which category best fits the stated motive?",
      "a": [
        "Hacktivist",
        "Insider threat",
        "Script kiddie",
        "Cybercriminal"
      ],
      "c": 0,
      "e": "The stated political or social cause supports hacktivism."
    }
  ],
  "meta": {
    "title": "Unit 1 — Introduction to Security",
    "ced": "2026 AP Cybersecurity CED, Unit 1, Topics 1.1–1.5",
    "cisco": "Cisco AP Cybersecurity 1.0 Scope and Sequence and Topic 1.1–1.5 lesson-plan mapping",
    "version": "Unit 1 foundation · 2026-10-04"
  }
};
