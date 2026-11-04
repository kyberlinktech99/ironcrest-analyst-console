window.APSIM_FRQ=window.APSIM_FRQ||{};
window.APSIM_FRQ[4]=[
  {
    "id": "frq1",
    "sim": "4.1",
    "simTitle": "Malware Taxonomy Lab",
    "title": "Classify the Threat",
    "icon": "🦠",
    "scenario": "Three incidents are reported: <b>(1)</b> all documents on a workstation are encrypted and a note demands payment; <b>(2)</b> an employee downloads a \"free game\" that secretly installs a program giving an attacker remote access; <b>(3)</b> a program spreads to hundreds of computers across the network overnight without anyone opening a file.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Classify the malware in each incident."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Compare how a <b>trojan</b> and a <b>worm</b> spread."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "For <b>two</b> of the incidents, name one defense that is specific to that malware type."
      }
    ]
  },
  {
    "id": "frq2",
    "sim": "4.2",
    "simTitle": "Authentication Factor Builder",
    "title": "Securing Admin Logins",
    "icon": "🔑",
    "scenario": "A company's administrators log in with only a username and a password. After a breach, the security team considers adding: a fingerprint scanner, a code sent by a phone app, and a second, security-question answer.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Classify the password, the fingerprint, and the phone app code by <b>authentication factor</b> (something you know, have, or are)."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain why adding a security-question answer to a password is <b>not</b> true multi-factor authentication."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Recommend one MFA method for the administrators and describe a trade-off."
      }
    ]
  },
  {
    "id": "frq3",
    "sim": "4.3",
    "simTitle": "Log Analysis Detective",
    "title": "The 2 AM Login",
    "icon": "🔍",
    "scenario": "An authentication log shows: 11:40 PM–12:10 AM, 214 failed logins for the account <i>admin</i> from IP 198.51.100.77; 12:12 AM, a successful login for <i>admin</i> from the same IP; 12:20 AM, 3 GB copied from the file server to an external address.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Identify <b>three</b> indicators of compromise in the logs and explain what each suggests."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain why correlating events across the log is more useful than reviewing each line alone."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Recommend <b>two</b> controls that would have stopped or detected this attack earlier."
      }
    ]
  },
  {
    "id": "frq4",
    "sim": "4.4",
    "simTitle": "Patch Priority Ranker",
    "title": "Limited Maintenance Window",
    "icon": "🩹",
    "scenario": "A team has one maintenance window and time for only <b>two</b> of three patches: <b>(A)</b> a critical remote code execution flaw in the internet-facing web server, with exploit code already circulating; <b>(B)</b> a medium-severity flaw in an internal office printer; <b>(C)</b> a low-severity bug in a rarely used app on one workstation.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Rank the three patches and justify the order."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain why the severity score alone should not decide patch priority. Name <b>two</b> other factors."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "The patch for A cannot be applied until next week. Describe <b>two</b> compensating controls."
      }
    ]
  },
  {
    "id": "frq5",
    "sim": "4.5",
    "simTitle": "Incident Response Sequencer",
    "title": "Ransomware at Midday",
    "icon": "🚨",
    "scenario": "At noon, a school's IT team sees that a teacher's computer has encrypted files and a ransom note. Other machines on the same network show unusual activity. The team has an incident response plan and offline backups.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Place <b>three</b> of the following actions in the correct incident response phase and name the phase: disconnect the infected computers; restore from backups; identify how the malware got in; remove the malware; hold a post-incident review; confirm the alert is real."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain why containment should happen <b>before</b> eradication and recovery."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Describe the purpose of the <b>lessons learned</b> phase and give one outcome it might produce."
      }
    ]
  }
];
