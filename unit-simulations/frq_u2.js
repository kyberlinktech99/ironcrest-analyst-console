window.APSIM_FRQ=window.APSIM_FRQ||{};
window.APSIM_FRQ[2]=[
  {
    "id": "frq1",
    "sim": "2.1",
    "simTitle": "Physical Controls Classifier",
    "title": "Securing a Pharmacy Storage Room",
    "icon": "🏢",
    "scenario": "Riverside Community Hospital stores controlled medications in a pharmacy storage room. The room has three security measures: <b>(1)</b> a keypad lock whose 4-digit PIN is shared by all 40 pharmacy and nursing staff and has not been changed in two years; <b>(2)</b> a camera in the hallway outside the door that records to a server and is reviewed only after a loss is reported; and <b>(3)</b> a written policy requiring staff to sign a paper log whenever they remove medication.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "For <b>each</b> of the three measures, state its control <b>type</b> (physical, technical, or administrative) and its primary <b>function</b> (preventive or detective)."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Identify the <b>weakest</b> of the three measures. Explain the specific weakness and one security consequence it creates."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Recommend <b>one</b> technical control to replace or strengthen the weakest measure. Explain how it both <b>prevents</b> unauthorized entry and <b>detects</b> misuse."
      }
    ]
  },
  {
    "id": "frq2",
    "sim": "2.2",
    "simTitle": "Social Engineering Response",
    "title": "The Friday Afternoon Phone Call",
    "icon": "🎭",
    "scenario": "At 4:50 PM on the Friday before a holiday weekend, the front-desk receptionist at Delgado Accounting answers a call. The caller says he is \"Mark from the corporate IT help desk\" and that the payroll server will lock in 10 minutes unless she reads him the temporary access code that just appeared on her screen. He sounds stressed, uses the office manager's first name, and says he will \"get in trouble\" if she hangs up to verify his identity.",
    "parts": [
      {
        "key": "a",
        "pts": 2,
        "prompt": "Identify the type of social engineering attack and describe <b>two</b> red flags in the call."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Describe the correct response the receptionist should take, in order."
      },
      {
        "key": "c",
        "pts": 3,
        "prompt": "Explain why a technical control such as a firewall would not stop this attack. Then recommend <b>one</b> administrative control and explain how it would change the outcome."
      }
    ]
  },
  {
    "id": "frq3",
    "sim": "2.3",
    "simTitle": "RFID Vulnerability Lab",
    "title": "Cloned Cards at Lincoln High",
    "icon": "📡",
    "scenario": "Lincoln High School secures its network server closet with 125 kHz proximity cards. Each card broadcasts one fixed ID number, unencrypted, to any reader within a short range. A student with a $30 handheld reader stands near a teacher in a crowded hallway and captures the teacher's card ID. Later, the student writes that ID onto a blank card and opens the server closet.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Explain how this attack works. In your answer, identify the characteristic of 125 kHz cards that makes it possible."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Identify which element of the CIA triad is <b>most directly</b> violated by this attack and justify your answer."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Recommend a replacement technology and explain how it defeats a replay attack."
      }
    ]
  },
  {
    "id": "frq4",
    "sim": "2.4",
    "simTitle": "Access Control Matrix Builder",
    "title": "Westfield Family Clinic Access Matrix",
    "icon": "🔐",
    "scenario": "Westfield Family Clinic has five roles (Receptionist, Nurse, Physician, Billing Clerk, and IT Administrator) and four resources (Patient Medical Records, Billing/Insurance Records, Appointment Calendar, and System Configuration). Currently every employee account has <b>FULL</b> access to every resource. Possible access levels are DENY, READ, WRITE, and FULL.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Choose the most appropriate access level for each pair below and justify each choice in one sentence: <br>&bull; Receptionist &rarr; Patient Medical Records<br>&bull; Billing Clerk &rarr; Billing/Insurance Records<br>&bull; IT Administrator &rarr; Patient Medical Records"
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Define the principle of <b>least privilege</b> and describe one specific harm that could result from the clinic's current \"FULL for everyone\" setup."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Describe one example of <b>separation of duties</b> for this clinic and explain why it reduces risk."
      }
    ]
  },
  {
    "id": "frq5",
    "sim": "2.5",
    "simTitle": "Physical Security Audit",
    "title": "Auditing Harbor Tax & Accounting",
    "icon": "🔍",
    "scenario": "You are auditing Harbor Tax &amp; Accounting, a six-person firm. Your walkthrough notes: <b>(1)</b> Client tax returns (with Social Security numbers) are kept in unlocked filing cabinets in the open office. <b>(2)</b> The back door is propped open by staff on smoke breaks and has no camera. <b>(3)</b> A bookkeeper who quit last month still has an active door badge. <b>(4)</b> The lobby has a decorative fountain and modern furniture. <b>(5)</b> The building is new and has good lighting throughout.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Identify <b>two</b> genuine vulnerabilities from the notes, then state which one is your <b>highest priority</b> and justify the ranking."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Identify <b>one</b> item that is <b>not</b> a security vulnerability and justify your answer. Explain why flagging non-issues is a problem in a real audit."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "For your highest-priority vulnerability, recommend a specific control. State the control's <b>type</b> (physical, technical, or administrative) and <b>function</b> (preventive or detective)."
      }
    ]
  }
];
