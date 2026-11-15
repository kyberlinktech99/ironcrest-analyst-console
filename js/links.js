/* Trusted outside resources by unit. Every link was checked on 15 Nov 2026.
   Fields: title, org, url, why (what to use it for), topics (AP topics it supports). */
window.IRONCREST_LINKS = Object.freeze({
  all: [
    { title: 'AP Cybersecurity course page', org: 'College Board · AP Students', url: 'https://apstudents.collegeboard.org/courses/ap-cybersecurity', why: 'Course and exam overview, exam format and dates.' },
    { title: 'Cybersecurity glossary', org: 'NIST', url: 'https://csrc.nist.gov/glossary', why: 'Look up any term with its official definition.' },
    { title: 'Secure Our World', org: 'CISA', url: 'https://www.cisa.gov/secure-our-world', why: 'Short, plain-language guides to everyday security habits.' },
    { title: 'Cisco Networking Academy', org: 'Cisco', url: 'https://www.netacad.com/', why: 'Your primary course modules and Packet Tracer.' }
  ],
  1: [
    { title: 'Phishing Quiz', org: 'Google · Jigsaw', url: 'https://phishingquiz.withgoogle.com/', why: 'Practice spotting realistic phishing messages.', topics: ['1.1'] },
    { title: 'Recognize and report phishing', org: 'CISA', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing', why: 'Warning signs and what to do with a suspicious message.', topics: ['1.1'] },
    { title: 'How to recognize and avoid phishing scams', org: 'FTC', url: 'https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams', why: 'Examples of the pressure tactics scammers use.', topics: ['1.1'] },
    { title: 'Use strong passwords', org: 'CISA', url: 'https://www.cisa.gov/secure-our-world/use-strong-passwords', why: 'Length, uniqueness and password managers.', topics: ['1.2'] },
    { title: 'Brute Force (T1110)', org: 'MITRE ATT&CK', url: 'https://attack.mitre.org/techniques/T1110/', why: 'How password guessing, spraying and credential stuffing differ.', topics: ['1.2'] },
    { title: 'Are public Wi-Fi networks safe?', org: 'FTC', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know', why: 'Risks of public networks and how to protect yourself.', topics: ['1.3'] },
    { title: 'Artificial intelligence', org: 'CISA', url: 'https://www.cisa.gov/ai', why: 'How AI is used in attacks and in defense.', topics: ['1.4', '1.5'] },
    { title: 'AI Risk Management Framework', org: 'NIST', url: 'https://www.nist.gov/itl/ai-risk-management-framework', why: 'How organizations think about AI risk and human oversight.', topics: ['1.5'] }
  ],
  2: [
    { title: 'Cybersecurity Framework 2.0', org: 'NIST', url: 'https://www.nist.gov/cyberframework', why: 'Identify, protect, detect, respond, recover: the big picture of security.', topics: ['2.1'] },
    { title: 'Glossary: confidentiality', org: 'NIST', url: 'https://csrc.nist.gov/glossary/term/confidentiality', why: 'Official CIA triad definitions (also look up integrity and availability).', topics: ['2.1'] },
    { title: 'Physical security', org: 'CISA', url: 'https://www.cisa.gov/topics/physical-security', why: 'How physical and cyber security connect.', topics: ['2.2', '2.3'] },
    { title: 'Insider threat mitigation', org: 'CISA', url: 'https://www.cisa.gov/topics/physical-security/insider-threat-mitigation', why: 'Threats from people with legitimate access.', topics: ['2.2', '2.4'] },
    { title: 'SP 800-53: Physical and Environmental Protection (PE)', org: 'NIST', url: 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final', why: 'The official control catalog; see the PE family for access and monitoring.', topics: ['2.3', '2.4'] }
  ],
  3: [
    { title: 'Cisco Packet Tracer', org: 'Cisco', url: 'https://www.netacad.com/cisco-packet-tracer', why: 'Build and test networks safely in a simulator.', topics: ['3.3', '3.4'] },
    { title: 'Understanding denial-of-service attacks', org: 'CISA', url: 'https://www.cisa.gov/news-events/news/understanding-denial-service-attacks', why: 'What DoS and DDoS attacks are and how to respond.', topics: ['3.1'] },
    { title: 'Securing wireless networks', org: 'CISA', url: 'https://www.cisa.gov/news-events/news/securing-wireless-networks', why: 'Practical wireless controls: encryption, passwords, SSIDs.', topics: ['3.2'] },
    { title: 'Learning Center', org: 'Cloudflare', url: 'https://www.cloudflare.com/learning/', why: 'Clear explainers on firewalls, DDoS, DNS and network attacks.', topics: ['3.1', '3.4'] },
    { title: 'SP 800-41: Guidelines on firewalls', org: 'NIST', url: 'https://csrc.nist.gov/pubs/sp/800/41/r1/final', why: 'How firewall policies and rule sets are designed.', topics: ['3.4'] },
    { title: "Wireshark User's Guide", org: 'Wireshark', url: 'https://www.wireshark.org/docs/wsug_html_chunked/', why: 'How packet capture and filtering work.', topics: ['3.5'] }
  ],
  4: [
    { title: 'Malware, phishing and ransomware', org: 'CISA', url: 'https://www.cisa.gov/topics/cyber-threats-and-advisories/malware-phishing-and-ransomware', why: 'Types of malware and how they spread.', topics: ['4.1'] },
    { title: '#StopRansomware', org: 'CISA', url: 'https://www.cisa.gov/stopransomware', why: 'How ransomware attacks unfold and how to prepare.', topics: ['4.1', '4.4'] },
    { title: 'Multifactor authentication', org: 'CISA', url: 'https://www.cisa.gov/MFA', why: 'Why MFA stops most account takeovers.', topics: ['4.2'] },
    { title: 'SP 800-63B: Authentication guidelines', org: 'NIST', url: 'https://pages.nist.gov/800-63-4/sp800-63b.html', why: 'The official rules for passwords, lockouts and authenticators.', topics: ['4.2'] },
    { title: 'Update software', org: 'CISA', url: 'https://www.cisa.gov/secure-our-world/update-software', why: 'Why patching matters and how to keep devices updated.', topics: ['4.3'] },
    { title: 'CIS Benchmarks', org: 'Center for Internet Security', url: 'https://www.cisecurity.org/cis-benchmarks', why: 'Secure configuration guides for operating systems and devices.', topics: ['4.3'] }
  ],
  5: [
    { title: 'OWASP Top 10', org: 'OWASP', url: 'https://owasp.org/Top10/', why: 'The most critical web application security risks.', topics: ['5.1'] },
    { title: 'SQL injection', org: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security/sql-injection', why: 'How SQL injection works and how to prevent it.', topics: ['5.1', '5.5'] },
    { title: 'Cryptography', org: 'Khan Academy', url: 'https://www.khanacademy.org/computing/computer-science/cryptography', why: 'Ciphers, keys and public-key cryptography, step by step.', topics: ['5.3', '5.4'] },
    { title: 'CyberChef', org: 'GCHQ', url: 'https://gchq.github.io/CyberChef/', why: 'Try encoding, hashing and encryption in the browser.', topics: ['5.3', '5.4'] },
    { title: 'How it works', org: "Let's Encrypt", url: 'https://letsencrypt.org/how-it-works/', why: 'How certificates prove a website is who it claims to be.', topics: ['5.4'] },
    { title: 'Cryptographic standards and guidelines', org: 'NIST', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines', why: 'Which algorithms are approved and why.', topics: ['5.3', '5.4'] },
    { title: 'Cheat Sheet Series', org: 'OWASP', url: 'https://cheatsheetseries.owasp.org/', why: 'Short defensive guides: access control, input validation, logging.', topics: ['5.2', '5.5', '5.6'] }
  ]
});
