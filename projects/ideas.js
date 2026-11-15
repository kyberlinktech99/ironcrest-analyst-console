/* Research project ideas.
   Adapted from "Beyond the Flag" v1.0 by Abdullah Rehman (October 2026),
   https://doi.org/10.5281/zenodo.23341872, licensed CC BY-SA 4.0.
   Changes: re-ordered into an Ironcrest page, added AP topic connections and
   setup labels. This file is licensed CC BY-SA 4.0. */
(() => {
  const R = {
    cylab: ['CyLab Challenge Library', 'https://learn.cylabacademy.org/challenge-library'],
    primer: ['CTF Primer', 'https://primer.cylabacademy.org/'],
    chef: ['CyberChef', 'https://gchq.github.io/CyberChef/'],
    ctfd: ['CTFd', 'https://github.com/CTFd/CTFd'],
    bandit: ['OverTheWire Bandit', 'https://overthewire.org/wargames/bandit/'],
    luminarium: ['pwn.college Linux Luminarium', 'https://pwn.college/linux-luminarium'],
    thm: ['TryHackMe Linux Fundamentals', 'https://tryhackme.com/module/linux-fundamentals'],
    cis: ['CIS Benchmarks', 'https://www.cisecurity.org/cis-benchmarks'],
    lynis: ['Lynis', 'https://cisofy.com/lynis/'],
    t1110: ['ATT&CK T1110 Brute Force', 'https://attack.mitre.org/techniques/T1110/'],
    cs50: ['CS50 Cybersecurity', 'https://cs50.harvard.edu/cybersecurity/'],
    cryptohack: ['CryptoHack', 'https://cryptohack.org/courses/'],
    hibp: ['Pwned Passwords API', 'https://haveibeenpwned.com/API/v3'],
    nist63: ['NIST SP 800-63B-4', 'https://pages.nist.gov/800-63-4/sp800-63b.html'],
    natas: ['OverTheWire Natas', 'https://overthewire.org/wargames/natas/'],
    portswigger: ['PortSwigger Academy', 'https://portswigger.net/web-security'],
    owasp: ['OWASP Top 10:2025', 'https://top10.owasp.org/2025/en/'],
    juice: ['OWASP Juice Shop', 'https://owasp.org/www-project-juice-shop/'],
    h101: ['Hacker101 CTF', 'https://ctf.hacker101.com/'],
    cyberdef: ['CyberDefenders', 'https://cyberdefenders.org/blueteam-ctf-challenges/'],
    autopsy: ['Autopsy', 'https://www.autopsy.com/'],
    mta: ['Malware-Traffic-Analysis', 'https://www.malware-traffic-analysis.net/training-exercises.html'],
    pcaps: ['Wireshark sample captures', 'https://wiki.wireshark.org/SampleCaptures'],
    pt: ['Cisco Packet Tracer', 'https://www.netacad.com/cisco-packet-tracer'],
    intro: ['Cisco Intro to Cybersecurity', 'https://www.netacad.com/courses/introduction-to-cybersecurity'],
    wireshark: ['Wireshark', 'https://www.wireshark.org/'],
    suricata: ['Suricata', 'https://suricata.io/'],
    attack: ['MITRE ATT&CK', 'https://attack.mitre.org/'],
    jigsaw: ['Jigsaw Phishing Quiz', 'https://phishingquiz.withgoogle.com/'],
    csf: ['NIST CSF 2.0', 'https://www.nist.gov/cyberframework'],
    gdpr: ['GDPR (official EU text)', 'https://eur-lex.europa.eu/eli/reg/2016/679/oj'],
    llm: ['OWASP Top 10 for LLM Apps', 'https://genai.owasp.org/llm-top-10/'],
    pybandit: ['Bandit for Python', 'https://bandit.readthedocs.io/en/latest/']
  };
  // setup: 'browser' = can start in a browser; 'setup' = needs a VM, install, server or code you run. Check with your teacher either way.
  const D = [
    { n: '01', name: 'CTFs and challenge design', blurb: 'For students who already enjoy CTFs. Turn solving into analysis, then into design.', ideas: [
      ['1.1', 'CTF investigation portfolio', 1, 'Which weaknesses keep appearing in beginner CTF challenges, and how would a defender remove them?', ['cylab', 'primer'], 'browser', ['1.2', '5.1']],
      ['1.2', 'Design a mini-CTF for beginners', 2, 'Can a short sequence of challenges teach beginners to find exposed information and protect it?', ['chef', 'ctfd', 'primer'], 'setup', ['5.2', '5.5']],
      ['1.3', 'Hint design experiment', 3, 'Does the way hints are written change how many beginners finish a challenge, and how well they can explain it afterwards?', ['ctfd'], 'setup', []]
    ]},
    { n: '02', name: 'Linux and system security', blurb: 'Understand what happens underneath the tools. Most work happens in browser labs or a virtual machine.', ideas: [
      ['2.1', 'File permissions investigation', 1, 'How do users, groups and permissions control who can read, change or run a file?', ['bandit', 'luminarium', 'thm'], 'browser', ['5.2']],
      ['2.2', 'Hardening a Linux virtual machine', 2, 'Which configuration changes most reduce the attack surface of a fresh Linux installation, and what do they cost in usability?', ['cis', 'lynis', 'luminarium'], 'setup', ['4.3']],
      ['2.3', 'Detecting brute-force logins', 3, 'Can a simple log-analysis script reliably tell attack-like login patterns apart from ordinary user mistakes?', ['t1110', 'primer'], 'setup', ['1.2', '4.4']]
    ]},
    { n: '03', name: 'Cryptography', blurb: 'For students who enjoy patterns, logic, maths or Python. Strong projects test something, not just explain a cipher.', ideas: [
      ['3.1', 'Encoding is not encryption', 1, 'Why do encoding, encryption and hashing protect different things, and how can a beginner tell them apart?', ['cs50', 'chef'], 'browser', ['5.3', '5.4']],
      ['3.2', 'How much text breaks a substitution cipher?', 2, 'How does message length affect the success of frequency analysis, and does the language of the message matter?', ['cryptohack'], 'browser', ['5.3']],
      ['3.3', 'A breach-aware password checker', 3, 'How can a tool check whether a password has appeared in a breach without sending the password anywhere?', ['hibp', 'nist63'], 'setup', ['4.2']]
    ]},
    { n: '04', name: 'Web security', blurb: 'How websites decide who can see what. Learn requests, cookies and sessions before any practical testing.', ideas: [
      ['4.1', 'How access control fails', 1, 'What does a web application trust, and how do access-control mistakes expose information?', ['natas', 'portswigger'], 'browser', ['5.2']],
      ['4.2', 'One OWASP category in depth', 2, 'How does one category from the OWASP Top 10 appear in a deliberately vulnerable application, and how should it be fixed?', ['owasp', 'juice', 'portswigger', 'h101'], 'browser', ['5.1', '5.5']],
      ['4.3', 'Build it, test it, fix it', 3, 'Can I build a small web application with a login, find its weaknesses through my own testing, and show measurable improvement after fixing them?', ['cs50', 'portswigger', 'owasp'], 'setup', ['5.1', '5.5']]
    ]},
    { n: '05', name: 'Digital forensics', blurb: 'For students who enjoy examining clues. Separate what the evidence shows from what you infer.', ideas: [
      ['5.1', 'What do your files say about you?', 1, 'What hidden information do everyday photos and documents carry, and how can people share them more safely?', ['cs50', 'chef'], 'browser', ['5.6']],
      ['5.2', 'Investigating a fictional incident', 2, 'What can a set of files and logs prove about a simulated incident, and what remains uncertain?', ['cyberdef', 'cylab', 'autopsy'], 'setup', ['4.4', '5.6']],
      ['5.3', 'Reading network evidence', 3, 'What can packet captures reveal about an event, and where does the evidence run out?', ['mta', 'pcaps'], 'setup', ['3.5']]
    ]},
    { n: '06', name: 'Network security', blurb: 'Simulations and isolated labs make network projects possible without touching any real network.', ideas: [
      ['6.1', 'Segmenting a small-office network', 1, 'How does dividing a network into segments limit what an attacker can reach?', ['pt', 'intro'], 'setup', ['3.3']],
      ['6.2', 'What can someone on my network see?', 2, 'How much of my own web traffic is visible on a network, and what does encryption hide?', ['wireshark', 'cs50'], 'setup', ['1.3', '3.1']],
      ['6.3', 'Building and testing detection rules', 3, 'How accurately can a small set of intrusion detection rules flag suspicious traffic in sample captures?', ['suricata', 'attack', 'mta'], 'setup', ['3.5']]
    ]},
    { n: '07', name: 'Human factors, policy and society', blurb: 'For students who prefer research and communication to technical tools. These still need evidence and analysis.', ideas: [
      ['7.1', 'Password policies against the evidence', 1, 'Do the password rules of commonly used services match current NIST guidance, and what would a better policy look like?', ['nist63', 'cs50'], 'browser', ['4.2']],
      ['7.2', 'Designing an awareness lesson', 2, 'Does a short, student-designed lesson change how well younger students recognise suspicious messages?', ['jigsaw', 'cs50'], 'browser', ['1.1']],
      ['7.3', 'Breach response tabletop exercise', 3, 'If a school club’s member list leaked, what would a good response look like, and how would different data-protection laws shape it?', ['csf', 'gdpr'], 'browser', ['5.6']]
    ]},
    { n: '08', name: 'Emerging areas', blurb: 'The topics students ask about most. Scope and permissions matter even more here, so agree boundaries early.', ideas: [
      ['8.1', 'Smart device security at home', 1, 'How securely are the smart devices in my home set up, and which simple changes improve them?', ['cs50'], 'setup', ['4.1', '4.3']],
      ['8.2', 'Prompt injection in my own chatbot', 2, 'How well do different defences protect a simple chatbot from prompt injection and system prompt leakage?', ['llm'], 'setup', ['1.4', '5.1']],
      ['8.3', 'Security review of my own code', 3, 'What security weaknesses appear in student-written code, and how well does an automated tool find them compared with a manual review?', ['pybandit', 'cs50', 'owasp'], 'setup', ['5.1', '5.5']]
    ]}
  ];
  const LEVEL = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };
  window.IRONCREST_PROJECTS = Object.freeze({
    domains: D.map(d => ({ ...d, ideas: d.ideas.map(([id, title, level, question, res, setup, ap]) => ({ id, title, level, levelName: LEVEL[level], question, resources: res.map(k => ({ name: R[k][0], url: R[k][1] })), setup, ap })) }))
  });
})();
