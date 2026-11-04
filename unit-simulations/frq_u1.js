window.APSIM_FRQ=window.APSIM_FRQ||{};
window.APSIM_FRQ[1]=[
  {
    "id": "frq1",
    "sim": "1.1",
    "simTitle": "CIA Triad Lab",
    "title": "Three Incidents at Lakeside High",
    "icon": "🔺",
    "scenario": "Lakeside High runs an online grade portal. In one month, three incidents occur: <b>(1)</b> ransomware encrypts the portal server and no one can view grades for four days; <b>(2)</b> a student guesses a teacher's weak password and quietly changes two of their own grades; <b>(3)</b> a misconfigured backup folder exposes a spreadsheet of student names and home addresses to anyone with the link.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "For <b>each</b> incident, identify the <b>one</b> CIA triad property that was primarily violated."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Describe <b>one</b> specific control that would have prevented Incident 2, and explain which property it protects."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "A single security event can violate more than one CIA property. Give an example from a school setting and name <b>both</b> properties affected."
      }
    ]
  },
  {
    "id": "frq2",
    "sim": "1.2",
    "simTitle": "Threat Actor Profiler",
    "title": "Who Is Behind the Attack?",
    "icon": "🕵️",
    "scenario": "Three organizations report incidents: <b>(A)</b> a regional hospital's files are encrypted and a payment in cryptocurrency is demanded; <b>(B)</b> a city's website homepage is replaced with a political slogan after the council passes a controversial law; <b>(C)</b> a power utility discovers someone has quietly accessed its control network for eight months using custom tools, taking only diagrams.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Match each incident to the most likely threat actor type (for example: cybercriminal, hacktivist, nation-state, insider, script kiddie)."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "For <b>one</b> of the incidents, explain the actor's <b>motivation</b> and what the evidence in the scenario says about their <b>resources or skill</b>."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Explain why the same defense plan may not work equally well against all three actors. Use two actors in your answer."
      }
    ]
  },
  {
    "id": "frq3",
    "sim": "1.3",
    "simTitle": "Spot the Phish",
    "title": "The Expiring Password Email",
    "icon": "🎣",
    "scenario": "A student receives this email: <i>From: IT-Helpdesk@school-support-portal.net — \"Your school password expires in 1 hour! Click here to keep your account: http://school-support-portal.net/verify. Failure to act will lock you out and your grades may be lost.\"</i> The student clicks the link and enters their school username and password.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Identify <b>three</b> specific red flags in the email."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Name the <b>social engineering technique</b> the attacker relies on and explain why it works on people."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "The student already entered their password. Describe <b>one immediate response</b> and <b>one control</b> that would limit damage from a stolen password in the future."
      }
    ]
  },
  {
    "id": "frq4",
    "sim": "1.4",
    "simTitle": "Attack Surface Mapper",
    "title": "Mapping a Dental Clinic's Attack Surface",
    "icon": "🗺️",
    "scenario": "A dental clinic has: a public website with an appointment form; a patient portal; a guest Wi-Fi network that shares a network with the office computers; an old FTP server nobody uses but that is still online; and 12 staff laptops that allow USB drives. A former receptionist's account was never disabled.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Identify <b>three</b> items from the scenario that expand the clinic's attack surface and state what kind of weakness or exposure each creates."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain how the clinic could <b>reduce</b> its attack surface for <b>one</b> of the items you identified."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Reducing the attack surface does not eliminate risk. Explain why the clinic still needs detection and response controls."
      }
    ]
  },
  {
    "id": "frq5",
    "sim": "1.5",
    "simTitle": "Risk Matrix Lab",
    "title": "Prioritizing Three Risks",
    "icon": "📊",
    "scenario": "A small company assesses three risks. <b>Risk 1:</b> a laptop is stolen (likelihood high, impact low because disks are encrypted). <b>Risk 2:</b> the customer database is breached (likelihood low, impact very high). <b>Risk 3:</b> an employee falls for a phishing email (likelihood high, impact high).",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Rank the three risks from highest to lowest priority and justify the ranking using likelihood and impact."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Name <b>two</b> different risk response strategies (accept, avoid, transfer, reduce) and apply each to one of the risks."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Define <b>residual risk</b> and explain why it remains after a control is added to Risk 3."
      }
    ]
  },
  {
    "id": "frq6",
    "sim": "1.6",
    "simTitle": "Defense-in-Depth Builder",
    "title": "Protecting a School Records Server",
    "icon": "🧅",
    "scenario": "A school stores student records on a server. Currently the only protection is a firewall at the network edge. A teacher plugs an infected USB drive into a classroom computer; the malware spreads to the records server and copies files.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Identify <b>three</b> additional layers of defense (from different categories such as physical, network, host, application, data, or administrative) that the school should add, and state what each protects."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain the principle of <b>defense in depth</b> and use the scenario to show what went wrong."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Describe one <b>trade-off</b> the school faces when adding more layers."
      }
    ]
  }
];
