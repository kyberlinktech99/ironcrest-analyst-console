window.APSIM_FRQ=window.APSIM_FRQ||{};
window.APSIM_FRQ[5]=[
  {
    "id": "frq1",
    "sim": "5.1",
    "simTitle": "Encryption Type Matcher",
    "title": "Choosing the Right Tool",
    "icon": "🔒",
    "scenario": "A health clinic needs to: <b>(1)</b> protect the files on a lost-prone laptop; <b>(2)</b> store user passwords in its database so even administrators cannot read them; <b>(3)</b> let a vendor verify that an update really came from the clinic and was not altered.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "For each need, name the best technique: symmetric encryption, asymmetric encryption (digital signature), or hashing."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain why passwords should be <b>hashed</b> rather than encrypted."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Explain the <b>key distribution problem</b> of symmetric encryption and how asymmetric encryption helps."
      }
    ]
  },
  {
    "id": "frq2",
    "sim": "5.2",
    "simTitle": "SQL Injection Detective",
    "title": "The Vulnerable Login Form",
    "icon": "💉",
    "scenario": "A website builds this query from user input: <code>SELECT * FROM users WHERE name = '\" + name + \"' AND pass = '\" + pass + \"'</code>. An attacker enters <code>' OR '1'='1</code> as the username and anything as the password and is logged in as the first user in the table.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Explain how the attack works."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Identify the root cause and the best fix."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Describe <b>one</b> additional defense and what it limits."
      }
    ]
  },
  {
    "id": "frq3",
    "sim": "5.3",
    "simTitle": "Certificate Trust Chain",
    "title": "The Browser Warning",
    "icon": "📜",
    "scenario": "A student visits a shopping site and the browser shows \"Your connection is not private: certificate error.\" The student almost clicks \"Proceed anyway.\" A normal site's certificate is issued by an intermediate CA, which was in turn signed by a root CA already trusted by the browser.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "List <b>three</b> checks a browser performs on a site's certificate."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain the <b>chain of trust</b> and why a browser trusts a site it has never seen before."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Explain the risk of ignoring the warning."
      }
    ]
  },
  {
    "id": "frq4",
    "sim": "5.4",
    "simTitle": "Data Classification Lab",
    "title": "Classifying School Data",
    "icon": "🗂️",
    "scenario": "A school district holds: <b>(1)</b> the football schedule posted on its website; <b>(2)</b> student grades and attendance; <b>(3)</b> employees' Social Security numbers and bank details; <b>(4)</b> an internal staff meeting agenda.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Assign each of the four items a classification level (public, internal, confidential, restricted) and justify <b>three</b> of them."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain how handling requirements should differ between the <b>public</b> and the <b>restricted</b> items."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Explain how the <b>principle of least privilege</b> applies to the grade data."
      }
    ]
  },
  {
    "id": "frq5",
    "sim": "5.5",
    "simTitle": "SIEM Alert Investigator",
    "title": "Three Alerts, One Analyst",
    "icon": "📡",
    "scenario": "A SIEM raises three alerts at once: <b>(A)</b> 1,000 failed logins in five minutes against many accounts from one foreign IP; <b>(B)</b> the CEO's account logs in at 3 AM from a country the CEO has never visited, then downloads many files; <b>(C)</b> an antivirus alert on a single test machine that is isolated from the network.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Prioritize the alerts from most to least urgent and justify the order."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain what a <b>false positive</b> is and how SIEM correlation helps reduce them."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Describe the <b>next step</b> an analyst should take on alert B, including one containment action."
      }
    ]
  }
];
