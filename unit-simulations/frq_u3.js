window.APSIM_FRQ=window.APSIM_FRQ||{};
window.APSIM_FRQ[3]=[
  {
    "id": "frq1",
    "sim": "3.1",
    "simTitle": "Firewall Rule Builder",
    "title": "Rules for a Small Web Business",
    "icon": "🧱",
    "scenario": "A small online shop has a web server at 10.0.0.5 that must be reachable by customers over HTTPS, an admin who manages it remotely over SSH from the office IP 198.51.100.20, and employee laptops that browse the web. Right now the firewall has one rule: <i>allow all</i>.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Write or describe <b>three</b> firewall rules (source, destination, port/protocol, action) that meet the shop's needs."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain why a <b>default deny</b> rule belongs at the end of the rule set and why rule <b>order</b> matters."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Identify <b>one</b> attack the firewall rules above would <b>not</b> stop and recommend an additional control."
      }
    ]
  },
  {
    "id": "frq2",
    "sim": "3.2",
    "simTitle": "Wireshark Packet Analyzer",
    "title": "Reading the Capture",
    "icon": "🦈",
    "scenario": "An analyst reviews a packet capture and notes: <b>(1)</b> 500 TCP SYN packets in ten seconds from 203.0.113.9 to port 443 on the web server, with no final ACK from the sender; <b>(2)</b> an HTTP POST to /login where the username and password appear as readable text; <b>(3)</b> one workstation sending DNS queries every five seconds to a long random-looking domain name.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Identify what <b>each</b> observation most likely indicates."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain why observation 2 is a problem and how it should be fixed."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Recommend <b>one</b> response to observation 1 and explain how it helps."
      }
    ]
  },
  {
    "id": "frq3",
    "sim": "3.3",
    "simTitle": "Network Topology Defender",
    "title": "Flat Network, Big Problem",
    "icon": "🕸️",
    "scenario": "A clinic runs everything on one flat network: staff PCs, the patient records server, a guest Wi-Fi access point, and internet-connected security cameras. A visitor on the guest Wi-Fi can reach the records server directly. The firewall sits only at the internet connection.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Propose a segmented design by naming <b>three</b> separate network zones and listing what belongs in each."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain how segmentation limits an attacker's <b>lateral movement</b>."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "State where you would place an IDS/IPS in this design and why."
      }
    ]
  },
  {
    "id": "frq4",
    "sim": "3.4",
    "simTitle": "Wireless Attack Identifier",
    "title": "Trouble at the Coffee Shop",
    "icon": "📶",
    "scenario": "A coffee shop offers open Wi-Fi called <i>CoffeeShop_Free</i>. Customers report: <b>(1)</b> a second network with the same name appearing with a stronger signal, which asks them to sign in to a \"portal\"; <b>(2)</b> devices repeatedly disconnecting at the same moment; <b>(3)</b> the shop's back-office network, secured with an old standard, being cracked by a parked car in a few minutes.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Identify the most likely attack in <b>each</b> of the three reports."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Explain how an evil twin attack lets the attacker see a victim's traffic."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Recommend <b>two</b> improvements for the shop's wireless security."
      }
    ]
  },
  {
    "id": "frq5",
    "sim": "3.5",
    "simTitle": "Network Attack Timeline",
    "title": "Reconstructing an Intrusion",
    "icon": "⏱️",
    "scenario": "A security team collects these log events (times are in order): 01:02 a single IP scans ports 1–1024 on the web server; 01:20 an exploit against an outdated web application succeeds; 01:25 a new administrator account is created; 01:40 a scheduled task is added that runs at every reboot; 02:10 4 GB is transferred to an unfamiliar external IP.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Label the attack stage shown by <b>three</b> of the events (for example: reconnaissance, exploitation, persistence, privilege escalation, exfiltration)."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "Identify <b>one</b> point on the timeline where the attack could have been stopped and the control that would have done it."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Explain why <b>time-synchronized</b> logs from multiple devices matter during an investigation."
      }
    ]
  },
  {
    "id": "frq6",
    "sim": "3.6",
    "simTitle": "VPN & Encryption Analyzer",
    "title": "Working From a Hotel",
    "icon": "🔐",
    "scenario": "A sales representative works from a hotel using the hotel's public Wi-Fi. The company requires a VPN to its headquarters. Without it, the rep's laptop sends traffic across the hotel network unprotected.",
    "parts": [
      {
        "key": "a",
        "pts": 3,
        "prompt": "Describe <b>three</b> security benefits a VPN provides to the rep."
      },
      {
        "key": "b",
        "pts": 2,
        "prompt": "A VPN often uses <b>asymmetric</b> encryption to start the session and <b>symmetric</b> encryption for the data. Explain why both are used."
      },
      {
        "key": "c",
        "pts": 2,
        "prompt": "Describe <b>one</b> limitation of a VPN that the company should still plan for."
      }
    ]
  }
];
