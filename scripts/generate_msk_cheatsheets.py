#!/usr/bin/env python3
from __future__ import annotations

import html
import re
import subprocess
from pathlib import Path

ROOT = Path("/Users/jarviscore/.openclaw/workspace")
OUT = ROOT / "artifacts" / "msk-mri-dictation-cheatsheets"
SHOULDER_DIR = ROOT / "artifacts" / "shoulder-mri-cheatsheet-expanded"

OUTERBRIDGE = """## Modified Outerbridge Chondromalacia Grading - Copy-Ready

Use this for any articular surface. Replace [surface/compartment] with the specific location: patellar median ridge, medial femoral condyle weightbearing surface, anterosuperior acetabulum, radiocapitellar joint, tibiotalar dome, first MTP joint, etc.

| Grade | MRI shorthand |
| --- | --- |
| 0 | Normal cartilage. |
| 1 | Signal heterogeneity/softening or swelling; surface intact. |
| 2 | Superficial fissuring/fraying/partial-thickness defect <50% cartilage depth. |
| 3 | Deep fissuring/partial-thickness defect >50% cartilage depth, not exposing bone. |
| 4 | Full-thickness cartilage loss with exposed subchondral bone, often edema/cysts. |

**Grade 0 - normal cartilage**
**F:** Articular cartilage of the [surface/compartment] is preserved in thickness and signal without focal fissuring, delamination, or subchondral marrow abnormality.
**I:** No chondral defect of the [surface/compartment].

**Grade 1 - chondral signal change / softening**
**F:** Mild focal cartilage signal heterogeneity/softening of the [surface/compartment] with preserved cartilage thickness and intact articular surface. No subchondral marrow edema.
**I:** Grade 1 chondromalacia of the [surface/compartment].

**Grade 2 - superficial partial-thickness chondral loss**
**F:** Superficial chondral fissuring/fraying of the [surface/compartment] involving less than 50% of cartilage thickness. No full-thickness defect or subchondral marrow edema.
**I:** Grade 2 chondromalacia of the [surface/compartment].

**Grade 3 - deep partial-thickness chondral loss**
**F:** Deep partial-thickness chondral fissuring/defect of the [surface/compartment] involving greater than 50% of cartilage thickness without exposed subchondral bone. [Mild adjacent subchondral marrow edema.]
**I:** Grade 3 chondromalacia of the [surface/compartment].

**Grade 4 - full-thickness chondral loss**
**F:** Full-thickness cartilage loss/fissuring of the [surface/compartment] measuring [X] x [Y] mm with exposed subchondral bone and [subchondral marrow edema/cystic change]. [Small unstable chondral flap/loose body if present.]
**I:** Grade 4 chondromalacia/full-thickness chondral defect of the [surface/compartment].
"""

COMMON_STYLE = """
@page { size: Letter; margin: 0.34in; }
* { box-sizing: border-box; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; color: #101828; font-size: 8.2pt; line-height: 1.16; }
h1 { margin: 0 0 5px; padding: 6px 8px; color: #fff; background: #0b3046; border-radius: 5px; font-size: 14.5pt; letter-spacing: 0; }
h2 { margin: 6px 0 3px; padding: 3px 5px; color: #fff; background: #155c77; border-radius: 4px; font-size: 9.3pt; letter-spacing: 0; break-after: avoid; }
h3 { margin: 4px 0 2px; color: #0b3046; font-size: 8.7pt; border-bottom: 0.5px solid #b9c7d0; break-after: avoid; }
p { margin: 2px 0; }
ul { margin: 1px 0 2px 14px; padding: 0; }
li { margin: 0 0 1px; }
table { width: 100%; border-collapse: collapse; margin: 2px 0; font-size: 7.4pt; }
th { background: #e6f0f5; color: #0b3046; text-align: left; }
th, td { border: 0.5px solid #c8d4db; padding: 2px 3px; vertical-align: top; }
.section { break-inside: avoid; border: 0.7px solid #b9c7d0; border-radius: 5px; padding: 4px 5px; margin: 0 0 5px; background: #fff; }
.dx { font-weight: 800; color: #0b3046; font-size: 8.15pt; margin-top: 2px; }
.f b, .i b { color: #7a2e0e; }
.subtitle { font-size: 7.4pt; color: #46515c; margin: 0 0 5px; }
.source { margin-top: 4px; font-size: 6.7pt; color: #667085; }

@media screen {
  html { background: #090d12; }
  body {
    max-width: 1180px;
    margin: 0 auto;
    padding: 28px 32px 48px;
    font-size: 17px;
    line-height: 1.46;
  }
  h1 {
    margin: 0 0 20px;
    padding: 14px 18px;
    border-radius: 8px;
    font-size: 30px;
    line-height: 1.15;
  }
  h2 {
    margin: 26px 0 12px;
    padding: 9px 12px;
    border-radius: 7px;
    font-size: 22px;
    line-height: 1.2;
  }
  h3 {
    margin: 18px 0 8px;
    font-size: 19px;
    line-height: 1.25;
  }
  p { margin: 8px 0; }
  ul { margin: 8px 0 12px 24px; }
  li { margin: 4px 0; }
  table {
    margin: 12px 0 16px;
    font-size: 16px;
    line-height: 1.35;
  }
  th, td { padding: 8px 10px; }
  .section {
    padding: 16px 18px;
    margin: 0 0 18px;
    border-radius: 8px;
  }
  .dx {
    margin-top: 14px;
    font-size: 18px;
    line-height: 1.3;
  }
  .subtitle { font-size: 16px; line-height: 1.35; }
  .source { font-size: 14px; line-height: 1.35; }
}
"""

def dx(name: str, finding: str, impression: str) -> tuple[str, str, str]:
    return name, finding, impression

def templates(title: str, sections: list[tuple[str, list[tuple[str, str, str]]]], pearls: list[str]) -> str:
    chunks = [
        f"# {title}",
        "Copy-ready MRI dictation language. Replace bracketed text. Findings are intentionally complete enough to paste verbatim, then trim.",
        "## Search Pattern",
        "\n".join(f"- {p}" for p in pearls),
        OUTERBRIDGE,
    ]
    for heading, items in sections:
        chunks.append(f"## {heading}")
        for name, finding, impression in items:
            chunks.append(f"**{name}**\n**F:** {finding}\n**I:** {impression}")
    chunks.append("## Source Notes\nBuilt as a practical dictation aid from standard MSK MRI reporting patterns, review-level radiology references, and the existing shoulder cheat-sheet style. Use surgical correlation and local report conventions when needed.")
    return "\n\n".join(chunks) + "\n"

DATA = {
    "knee": templates("Knee MRI Dictation Cheat Sheet - Findings & Impressions", [
        ("Meniscus", [
            dx("Horizontal tear", "Horizontal fluid-signal tear of the [body/posterior horn] [medial/lateral] meniscus extending to the [superior/inferior] articular surface with mild meniscal degeneration. No displaced fragment.", "Horizontal tear of the [medial/lateral] meniscus [body/posterior horn]."),
            dx("Radial tear / root equivalent", "Radial tear of the [posterior horn/root] of the [medial/lateral] meniscus with truncation/ghosting on sagittal images and [X] mm peripheral extrusion of the meniscal body.", "Radial/root tear of the [medial/lateral] meniscus with meniscal extrusion."),
            dx("Bucket-handle tear", "Displaced longitudinal tear of the [medial/lateral] meniscus with centrally displaced fragment in the intercondylar notch. Donor meniscal body is diminutive.", "Bucket-handle tear of the [medial/lateral] meniscus with displaced fragment."),
            dx("Meniscal extrusion", "[Medial/lateral] meniscal body is extruded [X] mm beyond the tibial margin, associated with [root tear/advanced compartment chondrosis].", "[Medial/lateral] meniscal extrusion, usually functionally significant when >=3 mm."),
        ]),
        ("Ligaments / Extensor Mechanism", [
            dx("ACL complete tear", "Complete discontinuity of the ACL fibers with abnormal horizontal fiber orientation, intercondylar edema, and pivot-shift bone contusions of the lateral femoral condyle and posterolateral tibial plateau.", "Complete ACL tear with pivot-shift bone bruise pattern."),
            dx("ACL sprain / partial tear", "ACL is thickened and edematous with partial fiber disruption but preserved fiber continuity and orientation. No anterior tibial translation.", "ACL sprain/high-grade partial tear without complete rupture."),
            dx("MCL sprain", "Edema superficial and deep to the MCL with [mild thickening/partial fiber disruption] and preserved overall continuity.", "Grade [1/2] MCL sprain."),
            dx("Patellar tendon rupture", "Full-thickness disruption of the [proximal/mid/distal] patellar tendon with [X] cm gap, surrounding hemorrhage/edema, and patella alta.", "Complete patellar tendon rupture."),
        ]),
        ("Cartilage / Arthritis / Loose Bodies", [
            dx("Patellofemoral chondrosis", "[Grade 2/3/4] chondromalacia of the [lateral patellar facet/trochlea] with [subchondral marrow edema/cystic change]. TT-TG distance measures [X] mm. Patella is [centered/laterally tilted/subluxed].", "[Mild/moderate/severe] patellofemoral chondrosis with [maltracking features if present]."),
            dx("Osteochondral lesion", "Focal osteochondral defect of the [medial femoral condyle/lateral femoral condyle/trochlea] measuring [X] x [Y] mm with fluid signal undermining the fragment and adjacent marrow edema.", "Unstable osteochondral lesion of the [location]."),
            dx("Tricompartmental OA", "Tricompartmental osteoarthrosis with cartilage loss greatest in the [medial/lateral/patellofemoral] compartment, marginal osteophytes, subchondral marrow edema/cysts, and small effusion/synovitis.", "Tricompartmental osteoarthrosis, greatest in the [compartment]."),
        ]),
        ("Common Other Diagnoses", [
            dx("Baker cyst leak/rupture", "Multiloculated popliteal cyst between the semimembranosus and medial gastrocnemius tendons with inferior fluid tracking along the calf fascial planes.", "Leaking/ruptured Baker cyst."),
            dx("IT band friction syndrome", "Edema deep to the iliotibial band over the lateral femoral epicondyle without IT band tear.", "Iliotibial band friction syndrome."),
            dx("Pes anserine bursitis", "Fluid and edema in the pes anserine bursa deep to the sartorius/gracilis/semitendinosus tendons.", "Pes anserine bursitis."),
        ]),
    ], ["Menisci: surface-reaching signal on two slices; always assess roots and extrusion.", "ACL: confirm fiber discontinuity/orientation and pivot-shift contusions.", "Cartilage: report grade, compartment, size, unstable flap, and subchondral edema.", "Patellofemoral: include tilt/subluxation, trochlear dysplasia, TT-TG when relevant."]),
    "elbow": templates("Elbow MRI Dictation Cheat Sheet - Findings & Impressions", [
        ("Tendons", [
            dx("Common extensor tendinosis", "Thickening and intermediate signal of the common extensor tendon origin with [low-grade partial-thickness interstitial tearing] and adjacent peritendinous edema.", "Common extensor tendinosis/lateral epicondylitis [with low-grade partial tear]."),
            dx("Common extensor high-grade tear", "High-grade partial/full-thickness tear of the common extensor tendon origin from the lateral epicondyle with [X] mm retraction and surrounding soft tissue edema.", "High-grade tear of the common extensor tendon origin."),
            dx("Common flexor tendinosis", "Thickening and intermediate signal of the common flexor tendon origin with mild peritendinous edema. No full-thickness tear.", "Common flexor tendinosis/medial epicondylitis."),
            dx("Distal biceps tear", "Full-thickness tear of the distal biceps tendon from the radial tuberosity with [X] cm proximal retraction and fluid/hemorrhage along the bicipitoradial bursa.", "Complete distal biceps tendon rupture with [X] cm retraction."),
            dx("Triceps tear", "Partial/full-thickness tear of the distal triceps tendon at the olecranon insertion with surrounding posterior soft tissue edema and [olecranon enthesophyte/avulsion fragment].", "[Partial/full-thickness] distal triceps tendon tear."),
        ]),
        ("Ligaments / Instability", [
            dx("UCL sprain", "Ulnar collateral ligament is thickened and edematous with partial fiber irregularity, greatest at the [proximal/distal] attachment. No complete discontinuity.", "Grade [1/2] UCL sprain/partial tear."),
            dx("UCL complete tear", "Complete discontinuity of the anterior band of the ulnar collateral ligament at the [humeral/ulnar] attachment with fluid-filled gap and medial soft tissue edema.", "Complete tear of the anterior band UCL."),
            dx("RCL/LUCL injury", "Irregularity/discontinuity of the [radial collateral/lateral ulnar collateral] ligament complex with posterolateral capsular edema.", "[RCL/LUCL] tear; correlate for posterolateral rotatory instability."),
        ]),
        ("Cartilage / Nerves / Loose Bodies", [
            dx("Capitellar OCD", "Osteochondral lesion of the capitellum measuring [X] mm with overlying chondral irregularity, subchondral marrow edema/cystic change, and [fluid undermining/loose body].", "Capitellar osteochondral lesion, [stable/unstable]."),
            dx("Ulnar neuritis", "Ulnar nerve in the cubital tunnel is enlarged and T2 hyperintense with surrounding perineural edema. No compressive mass identified.", "Ulnar neuritis/cubital tunnel syndrome pattern."),
            dx("Synovitis / loose body", "Small elbow effusion with synovial thickening and [X] mm intra-articular osteochondral body in the [olecranon/coronoid/radiocapitellar] recess.", "Elbow synovitis with intra-articular loose body."),
        ]),
    ], ["Lateral pain: common extensor plus LUCL if instability symptoms.", "Thrower: inspect UCL, posteromedial olecranon, radiocapitellar chondrosis/OCD.", "Always look in olecranon/coronoid/radiocapitellar recesses for loose bodies.", "Cubital tunnel: report nerve caliber/signal and compressive causes."]),
}

MORE = {
    "hip": [
        ("Labrum / FAI / Cartilage", [
            dx("Anterosuperior labral tear", "Irregular fluid-signal tear of the anterosuperior acetabular labrum at [1-2 o'clock] with [small paralabral cyst]. Adjacent acetabular cartilage is [intact/fissured/delaminated].", "Anterosuperior acetabular labral tear [with paralabral cyst]."),
            dx("Cam FAI", "Asphericity/osseous prominence at the anterolateral femoral head-neck junction with elevated alpha angle of [X] degrees, anterosuperior labral tear, and adjacent acetabular chondral delamination.", "Cam-type femoroacetabular impingement with anterosuperior labral tear/chondral injury."),
            dx("Pincer FAI", "Acetabular overcoverage/retroversion with prominent anterior acetabular rim, labral degeneration/tear, and [posteroinferior chondral wear/contrecoup marrow edema].", "Pincer-type femoroacetabular impingement pattern."),
            dx("Acetabular chondral delamination", "Chondrolabral separation and delaminating cartilage flap at the anterosuperior acetabulum measuring [X] mm with fluid undermining the cartilage.", "Anterosuperior acetabular chondral delamination associated with labral tear."),
        ]),
        ("Tendons / Bursae", [
            dx("Gluteus medius/minimus tendinosis", "Gluteus [medius/minimus] tendon is thickened and intermediate signal at the greater trochanter insertion with peritendinous edema. No full-thickness tear.", "Gluteus [medius/minimus] tendinosis/peritendinitis."),
            dx("Gluteal tendon tear", "Partial/full-thickness tear of the [anterior gluteus medius/gluteus minimus] tendon at the greater trochanter with [X] cm retraction and fatty atrophy.", "[Partial/full-thickness] gluteal tendon tear."),
            dx("Trochanteric bursitis", "Fluid and synovial thickening in the greater trochanteric bursa with adjacent lateral peritrochanteric soft tissue edema.", "Greater trochanteric bursitis/peritrochanteric pain syndrome."),
            dx("Hamstring origin tear", "Partial/full-thickness tear of the conjoint/semitendinosus-biceps femoris and semimembranosus tendon origin from the ischial tuberosity with [X] cm distal retraction.", "[Partial/full-thickness] proximal hamstring origin tear."),
        ]),
        ("Bone / AVN / Stress", [
            dx("AVN", "Serpiginous subchondral low-signal line with inner T2 hyperintense rim in the femoral head involving approximately [X]% of the weightbearing surface. [No collapse/early subchondral collapse present].", "Avascular necrosis of the femoral head, [without/with] articular surface collapse."),
            dx("Femoral neck stress fracture", "Linear low-signal fracture line and marrow edema at the [compression/tension] side of the femoral neck involving [X]% of neck width. No displacement.", "[Compression/tension]-side femoral neck stress fracture."),
            dx("Osteoarthritis", "Diffuse hip chondral thinning/loss with marginal osteophytes, subchondral cystic change/marrow edema, degenerative labral tearing, and small effusion/synovitis.", "[Mild/moderate/severe] hip osteoarthrosis with degenerative labral tearing."),
        ]),
    ],
    "ankle": [
        ("Ligaments / Instability", [
            dx("ATFL sprain", "Anterior talofibular ligament is thickened and edematous with partial fiber irregularity and surrounding lateral soft tissue edema. No complete discontinuity.", "Grade [1/2] ATFL sprain."),
            dx("ATFL complete tear", "Complete discontinuity/nonvisualization of the anterior talofibular ligament with fluid-filled gap and anterolateral soft tissue edema.", "Complete ATFL tear."),
            dx("Syndesmotic injury", "Thickening/edema or discontinuity of the anterior inferior tibiofibular ligament with edema in the syndesmosis and [widening/malalignment if present].", "Syndesmotic sprain/high ankle sprain involving the AITFL."),
            dx("Deltoid sprain", "Deep deltoid ligament is thickened and edematous with partial fiber disruption at the [talar/tibial] attachment. Superficial deltoid fibers are [intact/injured].", "Deep deltoid ligament sprain/partial tear."),
        ]),
        ("Tendons / OLT / Impingement", [
            dx("Peroneal split tear", "Longitudinal split tear of the peroneus brevis tendon at/just distal to the retromalleolar groove with C-shaped tendon configuration around the peroneus longus. [Peroneal tenosynovitis].", "Longitudinal split tear of the peroneus brevis tendon."),
            dx("Posterior tibial tendinosis", "Posterior tibial tendon is thickened and heterogeneous with tenosynovitis at/above the medial malleolus. No full-thickness tear.", "Posterior tibial tendinosis/tenosynovitis."),
            dx("Achilles rupture", "Full-thickness Achilles tendon rupture [X] cm proximal to the calcaneal insertion with [Y] cm tendon gap and surrounding hemorrhage/edema.", "Complete Achilles tendon rupture with [Y] cm gap."),
            dx("Talar dome OLT", "Osteochondral lesion of the [medial/lateral] talar dome measuring [X] x [Y] mm with overlying cartilage defect, subchondral marrow edema/cystic change, and [fluid undermining/fragment instability].", "[Stable/unstable] osteochondral lesion of the [medial/lateral] talar dome."),
            dx("Anterolateral impingement", "Synovial/scar tissue thickening in the anterolateral gutter with adjacent capsular edema, often sequela of prior lateral ankle sprain.", "Anterolateral ankle impingement/scarring."),
            dx("Plantar fasciitis", "Thickening and increased signal of the proximal central cord plantar fascia at the calcaneal origin with perifascial edema and reactive calcaneal marrow edema.", "Plantar fasciitis without rupture."),
        ]),
    ],
    "foot": [
        ("Forefoot / Stress / Lisfranc", [
            dx("Plantar plate tear", "Partial/full-thickness tear of the [2nd] MTP plantar plate at the phalangeal attachment with pericapsular edema and [dorsal subluxation/crossover deformity].", "[Partial/full-thickness] [2nd] MTP plantar plate tear."),
            dx("Morton neuroma", "Ovoid low-to-intermediate signal soft tissue mass in the [2nd/3rd] intermetatarsal space measuring [X] mm with adjacent intermetatarsal bursitis.", "Morton neuroma in the [2nd/3rd] intermetatarsal space."),
            dx("Metatarsal stress reaction", "Marrow edema of the [2nd] metatarsal shaft/neck with periosteal edema but no discrete low-signal fracture line.", "Stress reaction of the [2nd] metatarsal without completed fracture."),
            dx("Metatarsal stress fracture", "Linear low-signal fracture line through the [2nd] metatarsal [shaft/neck] with surrounding marrow and periosteal edema.", "Nondisplaced stress fracture of the [2nd] metatarsal."),
            dx("Lisfranc ligament tear", "Disruption/edema of the Lisfranc ligament between the medial cuneiform and second metatarsal base with adjacent marrow edema and [diastasis/malalignment].", "Lisfranc ligament injury [with/without] malalignment."),
            dx("First MTP OA", "First MTP osteoarthrosis with cartilage loss, marginal osteophytes, subchondral cystic change/marrow edema, and small joint effusion/synovitis.", "First MTP osteoarthrosis/hallux rigidus."),
        ]),
    ],
    "finger": [
        ("Pulley / Tendon / Ligament", [
            dx("A2 pulley tear", "Disruption/attenuation of the A2 pulley with volar bowstringing of the flexor tendons, measuring [X] mm from the proximal phalanx cortex, and surrounding soft tissue edema.", "A2 pulley tear with flexor tendon bowstringing."),
            dx("A4 pulley tear", "Disruption of the A4 pulley at the middle phalanx with focal flexor tendon bowstringing and peripulley edema.", "A4 pulley tear."),
            dx("Flexor tendon tear", "Partial/full-thickness tear of the [FDP/FDS] tendon at the [zone] with [X] mm tendon gap/retraction and tenosynovial fluid.", "[Partial/full-thickness] [FDP/FDS] tendon tear."),
            dx("Central slip tear", "Discontinuity/irregularity of the central slip insertion at the dorsal base of the middle phalanx with surrounding edema and [small avulsion fragment].", "Central slip extensor tendon injury."),
            dx("Volar plate injury", "Partial/full-thickness tear of the volar plate at the [PIP/MCP] joint with capsular edema and [small avulsion fragment].", "[Partial/full-thickness] volar plate injury of the [joint]."),
            dx("Thumb MCP UCL tear", "Tear of the thumb MCP ulnar collateral ligament at the distal attachment with [proximal retraction superficial to the adductor aponeurosis].", "Thumb MCP UCL tear [with Stener lesion if retracted superficial to adductor aponeurosis]."),
        ]),
    ],
    "wrist": [
        ("TFCC / Ligaments / Tendons", [
            dx("Central TFCC perforation", "Full-thickness perforation of the central articular disc of the TFCC with fluid communicating between the radiocarpal and distal radioulnar joints. Peripheral foveal attachment is intact.", "Central TFCC perforation/Palmer 1A tear."),
            dx("Foveal TFCC tear", "Disruption of the foveal/deep radioulnar ligament attachment of the TFCC with fluid at the ulnar fovea and [DRUJ effusion/instability].", "Peripheral/foveal TFCC tear, a potential cause of DRUJ instability."),
            dx("Ulnar impaction", "Positive ulnar variance with lunate/triquetral ulnar-sided marrow edema, TFCC degeneration/tear, and ulnocarpal chondral loss.", "Ulnar impaction syndrome."),
            dx("Scapholunate tear", "Full-thickness tear of the [dorsal/membranous/volar] scapholunate ligament with [widening of the scapholunate interval/DISI alignment].", "Scapholunate ligament tear [with instability features]."),
            dx("De Quervain tenosynovitis", "Fluid and synovial thickening in the first extensor compartment tendon sheath involving the APL/EPB tendons with retinacular thickening.", "De Quervain tenosynovitis."),
            dx("ECU instability", "ECU tendon is thickened/heterogeneous with tenosynovitis and [ulnar subluxation/dislocation from the ulnar groove], compatible with subsheath injury.", "ECU tendinosis/tenosynovitis with subsheath injury/instability."),
        ]),
    ],
}

PEARLS = {
    "hip": ["Hip preservation reports need labrum, cartilage, alpha angle/cam, pincer/coverage, and version clues.", "Lateral hip pain: gluteal tendons plus trochanteric bursa.", "Always exclude AVN and femoral neck stress injury when marrow edema is present."],
    "ankle": ["After inversion injury: ATFL, CFL, peroneals, talar dome cartilage, anterolateral gutter.", "Medial pain/flatfoot: posterior tibial tendon, spring ligament, deltoid, hindfoot alignment.", "OLT: report location, size, cartilage integrity, marrow edema/cysts, and instability."],
    "foot": ["Forefoot pain: plantar plate, neuroma/bursa, stress injury, MTP cartilage.", "Lisfranc: inspect dorsal/interosseous/plantar components plus alignment and marrow edema.", "Report exact ray/space because surgical planning depends on it."],
    "finger": ["Name the digit, joint, side, and zone.", "Pulley injury: report A2/A3/A4 and amount of bowstringing.", "Thumb MCP UCL: explicitly state Stener lesion present/absent."],
    "wrist": ["Ulnar-sided pain: TFCC central vs foveal, ulnar variance, ECU, lunotriquetral ligament.", "Radial-sided pain: scapholunate ligament, first compartment, radioscaphoid cartilage, occult scaphoid fracture.", "For instability, report ligament component and alignment: SL gap, DISI/VISI."],
}

for slug, sections in MORE.items():
    DATA[slug] = templates(f"{slug.title()} MRI Dictation Cheat Sheet - Findings & Impressions", sections, PEARLS[slug])

def inject_outerbridge_into_shoulder(md: str) -> str:
    if "Modified Outerbridge Chondromalacia Grading" in md:
        return md
    return md.replace("## Rotator Cuff Tells", OUTERBRIDGE + "\n## Rotator Cuff Tells", 1)

def inline_markup(text: str) -> str:
    text = html.escape(text)
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)

def markdown_to_html(md: str, title: str) -> str:
    out = []
    in_ul = False
    in_table = False
    current_section = False
    table_rows = 0
    def close_ul():
        nonlocal in_ul
        if in_ul:
            out.append("</ul>")
            in_ul = False
    def close_table():
        nonlocal in_table, table_rows
        if in_table:
            out.append("</table>")
            in_table = False
            table_rows = 0
    def close_section():
        nonlocal current_section
        close_ul(); close_table()
        if current_section:
            out.append("</div>")
            current_section = False
    for raw in md.splitlines():
        line = raw.strip()
        if not line:
            close_ul(); close_table()
            continue
        if line.startswith("# "):
            close_section()
            out.append(f"<h1>{html.escape(line[2:])}</h1>")
        elif line.startswith("## "):
            close_section()
            out.append(f'<div class="section"><h2>{html.escape(line[3:])}</h2>')
            current_section = True
        elif line.startswith("### "):
            close_ul(); close_table()
            out.append(f"<h3>{html.escape(line[4:])}</h3>")
        elif line.startswith("- "):
            close_table()
            if not in_ul:
                out.append("<ul>"); in_ul = True
            out.append(f"<li>{inline_markup(line[2:])}</li>")
        elif line.startswith("|"):
            close_ul()
            cells = [c.strip() for c in line.strip("|").split("|")]
            if cells and all(set(c) <= set("-: ") for c in cells):
                continue
            if not in_table:
                out.append("<table>"); in_table = True; table_rows = 0
            tag = "th" if table_rows == 0 else "td"
            out.append("<tr>" + "".join(f"<{tag}>{inline_markup(c)}</{tag}>" for c in cells) + "</tr>")
            table_rows += 1
        elif re.match(r"^\*\*[^*].+\*\*$", line):
            close_ul(); close_table()
            out.append(f'<div class="dx">{inline_markup(line)[3:-4] if inline_markup(line).startswith("<b>") else inline_markup(line)}</div>')
        else:
            close_ul(); close_table()
            cls = ' class="f"' if line.startswith("**F:**") else (' class="i"' if line.startswith("**I:**") else "")
            out.append(f"<p{cls}>{inline_markup(line)}</p>")
    close_section()
    return f'<!doctype html><html><head><meta charset="utf-8"><title>{html.escape(title)}</title><style>{COMMON_STYLE}</style></head><body>' + "\n".join(out) + "</body></html>\n"

def write_set(slug: str, md: str, dest: Path) -> Path:
    dest.mkdir(parents=True, exist_ok=True)
    md_path = dest / f"{slug}-mri-cheatsheet.md"
    html_path = dest / f"{slug}-mri-cheatsheet.html"
    md_path.write_text(md, encoding="utf-8")
    html_path.write_text(markdown_to_html(md, md.splitlines()[0].lstrip("# ")), encoding="utf-8")
    return html_path

def chrome_pdf(html_path: Path, pdf_path: Path) -> None:
    chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-first-run", f"--print-to-pdf={pdf_path}", f"file://{html_path}"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def main() -> None:
    outputs = []
    shoulder_md_path = SHOULDER_DIR / "shoulder-mri-cheatsheet-expanded.md"
    shoulder_md = inject_outerbridge_into_shoulder(shoulder_md_path.read_text(encoding="utf-8"))
    shoulder_html_path = SHOULDER_DIR / "shoulder-mri-cheatsheet-expanded.html"
    shoulder_md_path.write_text(shoulder_md, encoding="utf-8")
    shoulder_html_path.write_text(markdown_to_html(shoulder_md, "Expanded Shoulder MRI Dictation Cheat Sheet"), encoding="utf-8")
    outputs.append((shoulder_html_path, SHOULDER_DIR / "shoulder-mri-cheatsheet-expanded.pdf"))
    shoulder_copy_html = write_set("shoulder", shoulder_md, OUT / "shoulder")
    outputs.append((shoulder_copy_html, OUT / "shoulder" / "shoulder-mri-cheatsheet.pdf"))
    for slug, md in DATA.items():
        html_path = write_set(slug, md, OUT / slug)
        outputs.append((html_path, OUT / slug / f"{slug}-mri-cheatsheet.pdf"))
    for html_path, pdf_path in outputs:
        chrome_pdf(html_path, pdf_path)
    index = ["# MSK MRI Dictation Cheat Sheets", "", "Copy-ready regional MRI findings and impressions.", ""]
    for folder in ["shoulder", *DATA.keys()]:
        index.append(f"- [{folder.title()}]({folder}/{folder}-mri-cheatsheet.md) | PDF: {folder}/{folder}-mri-cheatsheet.pdf")
    (OUT / "README.md").write_text("\n".join(index) + "\n", encoding="utf-8")
    print(f"Wrote {len(outputs)} PDFs and matching Markdown/HTML files under {OUT}")

if __name__ == "__main__":
    main()
