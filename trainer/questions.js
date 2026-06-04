window.TRAINER_QUESTIONS = [
{
"type": "dictate",
"joint": "shoulder",
"topic": "Rotator cuff",
"difficulty": 2,
"prompt": "Dictate the findings for a high-grade partial articular-sided (undersurface) supraspinatus tear, including how you quantify it.",
"model": "There is a high-grade partial-thickness articular-surface (undersurface) tear of the distal supraspinatus tendon involving approximately 70% of the tendon thickness, measuring 9 mm in AP dimension, with mild fiber retraction at the greater tuberosity footprint, compatible with a PASTA lesion. No full-thickness tear and no muscle retraction.",
"keyterms": [
{
"label": "articular-sided",
"patterns": [
"articular[ -]sided",
"undersurface",
"articular[ -]surface"
],
"why": "specifies which surface the partial tear involves (vs bursal-sided), which guides surgical approach"
},
{
"label": "partial-thickness",
"patterns": [
"partial[ -]thickness"
],
"why": "distinguishes from a full-thickness tear, the key prognostic split"
},
{
"label": "% of tendon thickness",
"patterns": [
"\\d+\\s*%",
"percent"
],
"why": "quantify tear depth as a percentage of tendon thickness; >50% often changes management"
},
{
"label": "AP/footprint measurement",
"patterns": [
"\\d+\\s*mm",
"footprint",
"greater tuberosity"
],
"why": "give a measurement and name the insertion site so the surgeon can plan repair"
},
{
"label": "PASTA",
"patterns": [
"pasta"
],
"why": "named term for a Partial Articular Supraspinatus Tendon Avulsion"
},
{
"label": "supraspinatus",
"patterns": [
"supraspinatus"
],
"why": "name the specific tendon involved"
}
],
"id": 1
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Impingement",
"difficulty": 2,
"prompt": "Describe subacromial (subacromial-subdeltoid) impingement using MRI terminology, including the structural contributors you grade.",
"model": "There is a hooked (Bigliani type III) acromion with a downsloping lateral configuration and a spurring inferior acromioclavicular osteophyte projecting into the supraspinatus outlet, narrowing the subacromial space. Associated bursal-surface fraying of the distal supraspinatus and subacromial-subdeltoid bursal fluid are present, findings compatible with outlet (extrinsic) subacromial impingement.",
"keyterms": [
{
"label": "acromial morphology / Bigliani",
"patterns": [
"bigliani",
"hooked",
"type\\s*(ii|iii|2|3)",
"flat",
"curved"
],
"why": "acromial shape (Bigliani I flat, II curved, III hooked) is the classic extrinsic contributor"
},
{
"label": "AC osteophyte",
"patterns": [
"ac\\s*(joint)?\\s*osteophyte",
"acromioclavicular\\s*osteophyte",
"inferior\\s*osteophyte",
"downward[ -]projecting"
],
"why": "inferiorly projecting AC joint osteophytes narrow the outlet and impinge the cuff"
},
{
"label": "subacromial space / outlet narrowing",
"patterns": [
"subacromial\\s*space",
"outlet",
"narrow"
],
"why": "the supraspinatus outlet is the space being compromised"
},
{
"label": "bursal-surface fraying",
"patterns": [
"bursal[ -]surface",
"bursal[ -]sided",
"fraying"
],
"why": "extrinsic impingement injures the bursal surface of the cuff first"
},
{
"label": "SASD bursal fluid",
"patterns": [
"subacromial[ -]subdeltoid",
"sasd",
"subdeltoid",
"bursal\\s*fluid",
"bursitis"
],
"why": "subacromial-subdeltoid bursitis/fluid is the reactive marker of impingement"
},
{
"label": "downsloping/lateral acromion",
"patterns": [
"downslop",
"lateral\\s*acromi",
"downward"
],
"why": "lateral downslope and acromial slope further reduce outlet height"
}
],
"id": 2
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Rotator cuff",
"difficulty": 3,
"prompt": "Dictate a full-thickness supraspinatus tear with retraction. Include dimensions and how you stage retraction.",
"model": "There is a full-thickness tear of the supraspinatus tendon measuring 18 mm in the mediolateral (retraction) dimension and 14 mm in the AP dimension. The tendon stump is retracted to the level of the humeral head apex, corresponding to Patte stage 2 retraction. No significant muscle atrophy.",
"keyterms": [
{
"label": "full-thickness",
"patterns": [
"full[ -]thickness"
],
"why": "defines a complete tear spanning articular to bursal surface"
},
{
"label": "mediolateral/retraction dimension",
"patterns": [
"mediolateral",
"retraction\\s*dimension",
"medial[ -]to[ -]lateral"
],
"why": "ML dimension reflects how far the tendon has pulled back, key for repairability"
},
{
"label": "AP dimension",
"patterns": [
"ap\\s*dimension",
"anteroposterior",
"\\d+\\s*mm"
],
"why": "AP width of the tear defines its size and which tendons are involved"
},
{
"label": "Patte stage",
"patterns": [
"patte",
"stage\\s*(1|2|3|i|ii|iii)"
],
"why": "Patte stages retraction in the coronal plane (1=near footprint, 2=humeral head, 3=glenoid)"
},
{
"label": "retracted",
"patterns": [
"retract"
],
"why": "degree of retraction predicts whether a tension-free repair is possible"
},
{
"label": "tendon stump",
"patterns": [
"stump",
"tendon\\s*edge",
"free\\s*edge"
],
"why": "locating the retracted stump is what you measure against"
}
],
"id": 3
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Rotator cuff",
"difficulty": 3,
"prompt": "Dictate the muscle quality of the supraspinatus in a chronic cuff tear, using the standard grading and the tangent sign.",
"model": "The supraspinatus muscle belly demonstrates moderate fatty infiltration, Goutallier grade 3 with more fat than muscle. The muscle belly falls below the superior border of the scapula on the sagittal Y-view, indicating a positive tangent sign, consistent with significant muscle atrophy.",
"keyterms": [
{
"label": "Goutallier grade",
"patterns": [
"goutallier",
"grade\\s*(0|1|2|3|4)",
"fuchs"
],
"why": "Goutallier (0-4) grades fatty infiltration, the strongest predictor of repair failure"
},
{
"label": "fatty infiltration/atrophy",
"patterns": [
"fatty\\s*(infiltration|atrophy|degeneration)",
"fat"
],
"why": "irreversible fatty change signals a chronic, often irreparable tear"
},
{
"label": "tangent sign",
"patterns": [
"tangent\\s*sign"
],
"why": "muscle belly not crossing the line over the scapular spine on Y-view indicates atrophy"
},
{
"label": "sagittal Y-view",
"patterns": [
"y[ -]view",
"sagittal\\s*oblique",
"scapular\\s*y",
"most\\s*lateral"
],
"why": "the tangent and occupation ratio are assessed on the sagittal oblique Y-shaped image"
},
{
"label": "supraspinatus muscle belly",
"patterns": [
"supraspinatus",
"muscle\\s*belly"
],
"why": "specify the muscle being graded, as each cuff muscle is scored separately"
}
],
"id": 4
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Subscapularis",
"difficulty": 3,
"prompt": "Dictate a subscapularis tear with biceps instability, naming the supporting signs.",
"model": "There is a full-thickness tear of the upper subscapularis tendon at the lesser tuberosity insertion with associated disruption of the medial sling (coracohumeral and superior glenohumeral ligaments), resulting in medial subluxation of the long head of the biceps tendon over the torn subscapularis. A comma sign is identified at the superolateral margin of the retracted subscapularis tendon.",
"keyterms": [
{
"label": "subscapularis",
"patterns": [
"subscapularis",
"lesser\\s*tuberosity"
],
"why": "name the tendon and its lesser tuberosity footprint"
},
{
"label": "medial sling",
"patterns": [
"medial\\s*sling",
"biceps\\s*sling",
"pulley",
"coracohumeral",
"superior\\s*glenohumeral"
],
"why": "the CHL/SGHL sling stabilizes the biceps; its disruption permits dislocation"
},
{
"label": "biceps medial subluxation/dislocation",
"patterns": [
"medial\\s*(subluxation|dislocation)",
"medially\\s*(sublux|dislocat)",
"biceps.*sublux"
],
"why": "biceps medial displacement is a strong indirect sign of subscapularis tear"
},
{
"label": "long head of biceps",
"patterns": [
"long\\s*head.*biceps",
"lhbt",
"biceps\\s*tendon"
],
"why": "the LHB is the structure displaced, often over or under the subscapularis"
},
{
"label": "comma sign",
"patterns": [
"comma\\s*sign"
],
"why": "comma-shaped tissue (medial sling fibers) marks the superolateral corner of a torn subscapularis"
}
],
"id": 5
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Biceps",
"difficulty": 2,
"prompt": "Dictate long head of biceps tendon dislocation out of the bicipital groove.",
"model": "The long head of the biceps tendon is medially dislocated out of the bicipital groove, which lies empty, and comes to rest medial to the lesser tuberosity. There is associated tearing of the subscapularis fibers, and the displaced tendon shows intermediate signal in keeping with tendinosis.",
"keyterms": [
{
"label": "long head of biceps",
"patterns": [
"long\\s*head.*biceps",
"lhbt",
"biceps\\s*tendon"
],
"why": "identify the specific tendon, distinct from the short head"
},
{
"label": "empty groove sign",
"patterns": [
"empty\\s*(bicipital\\s*)?groove",
"groove.*empty",
"empty\\s*sulcus"
],
"why": "an empty bicipital groove is the cardinal sign of biceps dislocation"
},
{
"label": "bicipital groove",
"patterns": [
"bicipital\\s*groove",
"intertubercular",
"biceps\\s*groove",
"sulcus"
],
"why": "name the normal location the tendon has left"
},
{
"label": "medial dislocation",
"patterns": [
"medial.*disloc",
"dislocat.*medial",
"medially\\s*displac"
],
"why": "the LHB typically dislocates medially, usually with a subscapularis injury"
},
{
"label": "tendinosis",
"patterns": [
"tendinos",
"tendinopathy",
"intermediate\\s*signal"
],
"why": "describe the intrinsic tendon quality, as dislocated tendons are often degenerated"
}
],
"id": 6
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Labrum",
"difficulty": 3,
"prompt": "Dictate a SLAP II lesion on MR arthrography.",
"model": "On MR arthrogram, contrast undercuts the superior labrum extending both anterior and posterior to the biceps anchor, with detachment of the biceps-labral complex from the superior glenoid, compatible with a SLAP type II lesion. The signal extends laterally and irregularly, distinguishing it from a smoothly contoured sublabral recess.",
"keyterms": [
{
"label": "SLAP II",
"patterns": [
"slap\\s*(ii|2|type\\s*2)",
"superior\\s*labr.*anterior.*posterior"
],
"why": "SLAP II is detachment of the biceps anchor; type matters for management"
},
{
"label": "biceps anchor / biceps-labral complex",
"patterns": [
"biceps\\s*anchor",
"biceps[ -]labral",
"biceps\\s*root"
],
"why": "the SLAP II lesion is defined by detachment of the biceps anchor"
},
{
"label": "superior labrum",
"patterns": [
"superior\\s*labr"
],
"why": "localizes the tear to the superior quadrant, above the equator"
},
{
"label": "anterior to posterior",
"patterns": [
"anterior\\s*(to|and|&)?\\s*posterior",
"ap\\s*extent"
],
"why": "SLAP = Superior Labrum Anterior to Posterior; the lesion straddles the biceps anchor"
},
{
"label": "contrast undercutting / detachment",
"patterns": [
"undercut",
"contrast\\s*extend",
"detach",
"fluid\\s*signal"
],
"why": "contrast tracking into the labral base indicates a true tear, not a recess"
},
{
"label": "sublabral recess (distinguisher)",
"patterns": [
"sublabral\\s*recess",
"sublabral\\s*sulcus",
"normal\\s*variant"
],
"why": "the main pitfall; a smooth medially-oriented recess is normal, not a SLAP"
}
],
"id": 7
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Instability",
"difficulty": 3,
"prompt": "Dictate a bony Bankart lesion and estimate glenoid bone loss.",
"model": "There is an anteroinferior glenoid rim fracture (osseous Bankart lesion) with an attached labral fragment. Using the best-fit circle method on the en-face sagittal image, the osseous defect represents approximately 22% glenoid bone loss, which approaches the critical threshold for soft-tissue stabilization alone.",
"keyterms": [
{
"label": "bony/osseous Bankart",
"patterns": [
"bony\\s*bankart",
"osseous\\s*bankart",
"glenoid\\s*rim\\s*fracture"
],
"why": "a bony Bankart is a fracture of the anteroinferior glenoid, vs a soft-tissue Bankart"
},
{
"label": "anteroinferior glenoid",
"patterns": [
"anteroinferior",
"antero[ -]inferior",
"anterior[ -]inferior\\s*glenoid",
"3.*6\\s*o.?clock"
],
"why": "localizes the classic site of anterior instability injury"
},
{
"label": "glenoid bone loss %",
"patterns": [
"\\d+\\s*%",
"bone\\s*loss",
"glenoid\\s*defect"
],
"why": "quantifying bone loss drives the choice between Bankart repair and Latarjet"
},
{
"label": "best-fit circle method",
"patterns": [
"best[ -]fit\\s*circle",
"circle\\s*method",
"pico",
"en[ -]face"
],
"why": "the standard quantification technique on the sagittal en-face glenoid view"
},
{
"label": "critical threshold",
"patterns": [
"critical",
"threshold",
"20\\s*%",
"25\\s*%",
"subcritical"
],
"why": "~20-25% loss is the inflection point favoring bony augmentation (Latarjet)"
}
],
"id": 8
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Instability",
"difficulty": 3,
"prompt": "Dictate a Hill-Sachs lesion and comment on engagement.",
"model": "There is a Hill-Sachs impaction fracture along the posterosuperior humeral head. It measures 18 mm in width and is relatively deep, and given its orientation it would be expected to engage the anterior glenoid rim in abduction and external rotation (off-track lesion).",
"keyterms": [
{
"label": "Hill-Sachs",
"patterns": [
"hill[ -]sachs"
],
"why": "the named posterolateral humeral head impaction from anterior dislocation"
},
{
"label": "posterosuperior/posterolateral location",
"patterns": [
"posterosuperior",
"posterolateral",
"postero[ -]superior",
"postero[ -]lateral"
],
"why": "location confirms it is a true Hill-Sachs from anterior instability"
},
{
"label": "engaging / off-track",
"patterns": [
"engag",
"off[ -]track",
"on[ -]track",
"glenoid\\s*track"
],
"why": "engagement (off-track) predicts recurrent instability and need for remplissage"
},
{
"label": "impaction fracture",
"patterns": [
"impaction",
"compression\\s*fracture",
"depression"
],
"why": "describes the mechanism: the humeral head impacts the glenoid rim"
},
{
"label": "size/depth",
"patterns": [
"\\d+\\s*mm",
"deep",
"depth",
"width"
],
"why": "larger/deeper lesions are more likely to engage and need addressing"
}
],
"id": 9
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Instability",
"difficulty": 3,
"prompt": "Dictate an ALPSA lesion and contrast it with a Perthes and a Bankart.",
"model": "There is an anteroinferior labroligamentous avulsion that is medially displaced and rolled up onto the glenoid neck with an intact but stripped scapular periosteum, compatible with an ALPSA lesion. There is no displaced labral fragment as would be seen in a classic Bankart, and the labrum is not merely nondisplaced with intact periosteum as in a Perthes lesion.",
"keyterms": [
{
"label": "ALPSA",
"patterns": [
"alpsa",
"anterior\\s*labroligamentous\\s*periosteal\\s*sleeve"
],
"why": "Anterior Labroligamentous Periosteal Sleeve Avulsion - medially displaced, healed in malposition"
},
{
"label": "intact/stripped periosteum",
"patterns": [
"intact\\s*periosteum",
"periosteal\\s*sleeve",
"stripped\\s*periosteum",
"periosteum"
],
"why": "the key feature: the scapular periosteum stays intact but is stripped medially"
},
{
"label": "medially displaced/rolled",
"patterns": [
"medially\\s*displac",
"rolled",
"medialized",
"glenoid\\s*neck"
],
"why": "chronic medial displacement and synovialization distinguishes ALPSA from acute Bankart"
},
{
"label": "Perthes (contrast)",
"patterns": [
"perthes"
],
"why": "Perthes = nondisplaced labrum with intact periosteum, can be occult without ABER views"
},
{
"label": "Bankart (contrast)",
"patterns": [
"bankart"
],
"why": "classic Bankart has a torn periosteum and the labrum is not medially rolled"
}
],
"id": 10
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Instability",
"difficulty": 3,
"prompt": "Dictate a HAGL lesion and name the sign that helps you recognize it.",
"model": "There is avulsion of the anterior band of the inferior glenohumeral ligament from its humeral attachment, with extravasation of joint fluid/contrast inferomedially producing a J-shaped configuration of the axillary pouch, the J-sign, compatible with a HAGL lesion. The glenoid labral attachment is intact.",
"keyterms": [
{
"label": "HAGL",
"patterns": [
"hagl",
"humeral\\s*avulsion.*glenohumeral"
],
"why": "Humeral Avulsion of the Glenohumeral Ligament - an easily missed cause of instability"
},
{
"label": "inferior glenohumeral ligament",
"patterns": [
"inferior\\s*glenohumeral\\s*ligament",
"ighl",
"anterior\\s*band"
],
"why": "the IGHL complex (esp anterior band) is the primary anterior stabilizer in abduction"
},
{
"label": "humeral avulsion",
"patterns": [
"humeral\\s*(side\\s*)?avuls",
"humeral\\s*attachment",
"humeral\\s*neck"
],
"why": "HAGL avulses at the humeral side, unlike Bankart which is glenoid-sided"
},
{
"label": "J-sign",
"patterns": [
"j[ -]sign",
"j[ -]shaped"
],
"why": "the normal U-shaped axillary recess becomes J-shaped when the IGHL detaches humerally"
},
{
"label": "axillary pouch/recess",
"patterns": [
"axillary\\s*(pouch|recess)"
],
"why": "contrast leaking from the axillary pouch is what produces the J configuration"
}
],
"id": 11
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Calcific tendinitis",
"difficulty": 2,
"prompt": "Dictate calcific tendinitis of the supraspinatus in the resorptive phase.",
"model": "There is a focus of hydroxyapatite calcific deposit within the distal supraspinatus tendon measuring 12 mm. Surrounding tendon and bursal edema with ill-defined margins indicates the resorptive (acute) phase, and there is reactive subacromial-subdeltoid bursitis.",
"keyterms": [
{
"label": "calcific tendinitis/hydroxyapatite",
"patterns": [
"calcific",
"hydroxyapatite",
"calcium\\s*hydroxyapatite",
"calcification",
"calcific\\s*deposit"
],
"why": "name the disease and the responsible calcium hydroxyapatite deposit"
},
{
"label": "resorptive phase",
"patterns": [
"resorptive",
"resorption",
"acute\\s*phase"
],
"why": "the resorptive phase is symptomatic with edema; formative phase is quiescent and dense"
},
{
"label": "surrounding edema",
"patterns": [
"edema",
"oedema",
"ill[ -]defined",
"fluffy",
"perifocal"
],
"why": "edema and ill-defined margins signal active resorption, not the dense formative deposit"
},
{
"label": "supraspinatus",
"patterns": [
"supraspinatus"
],
"why": "specify the tendon, as supraspinatus is the most common site"
},
{
"label": "reactive bursitis",
"patterns": [
"bursitis",
"bursal\\s*(edema|fluid)",
"subacromial[ -]subdeltoid"
],
"why": "deposits can rupture into the bursa, causing reactive subacromial-subdeltoid bursitis"
}
],
"id": 12
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Adhesive capsulitis",
"difficulty": 2,
"prompt": "Dictate the MRI findings of adhesive capsulitis (frozen shoulder).",
"model": "There is thickening and edema of the axillary recess and inferior glenohumeral ligament, with thickening of the capsule and soft-tissue edema obliterating the fat in the rotator interval and surrounding the coracohumeral ligament. These findings are compatible with adhesive capsulitis.",
"keyterms": [
{
"label": "adhesive capsulitis",
"patterns": [
"adhesive\\s*capsulitis",
"frozen\\s*shoulder"
],
"why": "name the clinical entity being described"
},
{
"label": "axillary recess thickening/edema",
"patterns": [
"axillary\\s*recess",
"inferior\\s*(capsule|recess)"
],
"why": "capsular thickening (>4 mm) and edema of the axillary recess is the hallmark"
},
{
"label": "inferior glenohumeral ligament",
"patterns": [
"inferior\\s*glenohumeral\\s*ligament",
"ighl"
],
"why": "the IGHL/axillary pouch is the most reliably thickened structure"
},
{
"label": "rotator interval",
"patterns": [
"rotator\\s*interval"
],
"why": "soft-tissue edema/obliteration of rotator interval fat is a key early sign"
},
{
"label": "coracohumeral ligament",
"patterns": [
"coracohumeral\\s*ligament",
"chl"
],
"why": "thickening of the CHL within the rotator interval supports the diagnosis"
},
{
"label": "capsular thickening",
"patterns": [
"capsul.*thick",
"thick.*capsul",
"\\d+\\s*mm"
],
"why": "abnormal capsular thickening is the underlying pathology of frozen shoulder"
}
],
"id": 13
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Denervation",
"difficulty": 3,
"prompt": "Dictate a paralabral cyst causing suprascapular nerve denervation, and localize the level of compression.",
"model": "There is a paralabral cyst extending into the spinoglenoid notch in association with a posterosuperior labral tear. The infraspinatus muscle shows isolated edema/fatty change with sparing of the supraspinatus, localizing the suprascapular nerve compression to the spinoglenoid notch rather than the suprascapular notch.",
"keyterms": [
{
"label": "suprascapular nerve",
"patterns": [
"suprascapular\\s*nerve"
],
"why": "name the nerve responsible for supraspinatus and infraspinatus innervation"
},
{
"label": "spinoglenoid notch",
"patterns": [
"spinoglenoid\\s*notch"
],
"why": "compression here denervates infraspinatus only, sparing supraspinatus"
},
{
"label": "suprascapular notch (contrast)",
"patterns": [
"suprascapular\\s*notch"
],
"why": "compression here denervates BOTH supraspinatus and infraspinatus, localizing more proximally"
},
{
"label": "paralabral/ganglion cyst",
"patterns": [
"paralabral\\s*cyst",
"ganglion",
"spinoglenoid\\s*cyst"
],
"why": "paralabral cysts from labral tears are the classic compressive lesion"
},
{
"label": "infraspinatus denervation pattern",
"patterns": [
"infraspinatus",
"denervation",
"muscle\\s*edema",
"fatty\\s*(change|atrophy)"
],
"why": "the muscle edema/atrophy pattern tells you exactly where the nerve is pinched"
}
],
"id": 14
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Impingement",
"difficulty": 2,
"prompt": "In a 22-year-old overhead-throwing athlete with posterosuperior pain, MRI shows undersurface fraying of the posterior supraspinatus, a posterosuperior labral tear, and a posterosuperior humeral head subcortical cyst. What entity does this triad describe?",
"choices": [
"Outlet (subacromial) impingement",
"Internal (posterosuperior) impingement",
"Subcoracoid impingement",
"Adhesive capsulitis"
],
"answer": 1,
"explain": "This is internal/posterosuperior impingement, where the undersurface of the posterior cuff pinches against the posterosuperior glenoid labrum in abduction-external rotation, classically in throwers. Outlet impingement affects the bursal surface and acromion; subcoracoid impingement involves the subscapularis and a narrowed coracohumeral interval; adhesive capsulitis shows capsular thickening, not this triad.",
"id": 15
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Rotator cuff",
"difficulty": 1,
"prompt": "On the sagittal oblique Y-view, the supraspinatus muscle belly fails to cross a line drawn along the superior borders of the scapular spine and coracoid. This describes:",
"choices": [
"A positive tangent sign",
"Goutallier grade 1",
"A positive PASTA lesion",
"The critical zone"
],
"answer": 0,
"explain": "A positive tangent sign means the supraspinatus muscle belly does not cross the tangent line over the scapular spine, indicating atrophy. Goutallier grades fatty infiltration (not bulk by tangent); PASTA is a partial articular cuff tear; the critical zone is a hypovascular watershed region of the distal supraspinatus.",
"id": 16
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Instability",
"difficulty": 2,
"prompt": "An anteroinferior labral tear with medial displacement of the labroligamentous complex and an INTACT (but stripped) scapular periosteum, often chronic and synovialized, is best termed:",
"choices": [
"Classic Bankart lesion",
"ALPSA lesion",
"GLAD lesion",
"SLAP lesion"
],
"answer": 1,
"explain": "This is an ALPSA (Anterior Labroligamentous Periosteal Sleeve Avulsion): the periosteum stays intact and the labrum heals medially displaced. A classic Bankart has a disrupted periosteum and detached fragment; a GLAD is a labral tear with an articular cartilage defect without instability; a SLAP is a superior labral lesion.",
"id": 17
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Adhesive capsulitis",
"difficulty": 2,
"prompt": "Which combination of MRI findings is most specific for adhesive capsulitis?",
"choices": [
"Subacromial-subdeltoid bursal fluid and an acromial spur",
"Thickening/edema of the axillary recess/IGHL plus obliteration of the rotator interval fat",
"A paralabral cyst in the spinoglenoid notch",
"A full-thickness supraspinatus tear with retraction"
],
"answer": 1,
"explain": "Adhesive capsulitis is characterized by thickening and edema of the axillary recess/inferior glenohumeral ligament and soft-tissue edema obliterating rotator interval fat (with CHL thickening). SASD bursal fluid plus a spur suggests impingement; a spinoglenoid cyst causes denervation; a retracted cuff tear is a different entity.",
"id": 18
},
{
"type": "cloze",
"joint": "shoulder",
"topic": "Rotator cuff",
"difficulty": 1,
"prompt": "The hypovascular watershed region of the distal supraspinatus tendon, where most degenerative tears begin, is called the ___.",
"answers": [
"critical zone",
"watershed zone"
],
"explain": "The critical zone is the relatively hypovascular segment of the distal supraspinatus near its insertion, a common site for degenerative tearing. Naming it shows you understand why tears localize there.",
"id": 19
},
{
"type": "cloze",
"joint": "shoulder",
"topic": "Instability",
"difficulty": 2,
"prompt": "A teres minor that is isolated in showing fatty atrophy/edema points to compression of the axillary nerve within the ___ space.",
"answers": [
"quadrilateral"
],
"explain": "Isolated teres minor denervation localizes to the quadrilateral space, where the axillary nerve travels (quadrilateral space syndrome). Recognizing isolated teres minor change as a localizing sign is an expert-level cue.",
"id": 20
},
{
"type": "cloze",
"joint": "shoulder",
"topic": "Subscapularis",
"difficulty": 2,
"prompt": "A curved band of medial sling fibers seen at the superolateral corner of a torn, retracted subscapularis tendon is known as the ___ sign.",
"answers": [
"comma"
],
"explain": "The comma sign is the comma-shaped tissue (medial sling/SGHL-CHL fibers) at the superolateral subscapularis margin, helping you find and identify a retracted subscapularis tear at surgery and on MRI.",
"id": 21
},
{
"type": "mcq",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 1,
"prompt": "What is the standard MRI rule for confidently calling a meniscal tear?",
"choices": [
"Any increased intrameniscal signal on a single image",
"Intrameniscal signal that unequivocally contacts an articular (meniscal) surface on at least two consecutive images",
"Globular signal that does not reach a surface, seen on three images",
"A morphologically normal meniscus with grade 2 signal"
],
"answer": 1,
"explain": "A tear is called when surface-reaching (grade 3) signal contacts the superior or inferior articular surface (or free edge) on >=2 consecutive images (the 'two-slice-touch' rule). Grade 1 (globular) and grade 2 (linear, non-surfacing) signal represent intrasubstance/myxoid degeneration and are not tears.",
"id": 22
},
{
"type": "dictate",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 2,
"prompt": "Dictate the findings for a radial tear at the medial meniscus body-posterior horn junction.",
"model": "There is a vertically oriented radial tear at the junction of the body and posterior horn of the medial meniscus, with a truncated free edge and a ghost meniscus on the consecutive coronal images. There is associated medial meniscal extrusion measuring 4 mm.",
"keyterms": [
{
"label": "radial tear",
"patterns": [
"radial"
],
"why": "a tear perpendicular to the long axis of the meniscus, extending from the free edge centrally"
},
{
"label": "truncation sign",
"patterns": [
"truncat"
],
"why": "the free edge appears blunted/cut-off where the radial cleft crosses it"
},
{
"label": "ghost meniscus / ghost sign",
"patterns": [
"ghost"
],
"why": "on the slice through the cleft the meniscus appears faint or absent, the classic radial-tear sign"
},
{
"label": "meniscal extrusion",
"patterns": [
"extrus"
],
"why": "radial and root tears disrupt the hoop and let the meniscus subluxate (>=3 mm is significant)"
},
{
"label": "body-posterior horn junction",
"patterns": [
"body[\\s-]?posterior",
"junction"
],
"why": "localizes the tear precisely along the meniscus"
},
{
"label": "measurement",
"patterns": [
"\\d\\s?mm"
],
"why": "quantifying extrusion adds clinical value (predicts osteoarthritis progression)"
}
],
"id": 23
},
{
"type": "dictate",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 3,
"prompt": "Dictate a posterior medial meniscal root tear with secondary extrusion.",
"model": "There is a complete radial tear of the posterior root of the medial meniscus at its tibial attachment, with a fluid-filled cleft and a positive ghost sign. There is grade-3 medial meniscal extrusion measuring 5 mm beyond the tibial margin, functionally equivalent to a total meniscectomy.",
"keyterms": [
{
"label": "posterior root tear",
"patterns": [
"posterior root",
"root tear",
"root"
],
"why": "avulsion/radial tear at the tibial root attachment, biomechanically critical"
},
{
"label": "tibial attachment",
"patterns": [
"tibial attach",
"attachment",
"insertion"
],
"why": "the root anchors the meniscus; tears here destroy hoop-stress function"
},
{
"label": "ghost sign",
"patterns": [
"ghost"
],
"why": "the root is not visualized on the slice through the radial cleft"
},
{
"label": "extrusion",
"patterns": [
"extrus"
],
"why": "root tears cause major extrusion, accelerating cartilage loss"
},
{
"label": "functional meniscectomy",
"patterns": [
"meniscectomy",
"functional"
],
"why": "a root tear leaves the meniscus mechanically incompetent, like having removed it"
},
{
"label": "measurement",
"patterns": [
"\\d\\s?mm"
],
"why": "grading extrusion (>=3 mm significant) communicates severity"
}
],
"id": 24
},
{
"type": "dictate",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 3,
"prompt": "Describe a displaced bucket-handle tear of the medial meniscus using MRI terminology, citing the classic signs.",
"model": "There is a displaced bucket-handle tear of the medial meniscus. The torn inner fragment is displaced into the intercondylar notch, producing a double-PCL sign on the sagittal images, with an absent-bowtie sign and a correspondingly small, blunted residual meniscus. A flipped fragment also creates a double-anterior-horn appearance.",
"keyterms": [
{
"label": "bucket-handle tear",
"patterns": [
"bucket[\\s-]?handle",
"bucket"
],
"why": "a longitudinal vertical tear whose inner fragment displaces like a bucket handle"
},
{
"label": "double-PCL sign",
"patterns": [
"double[\\s-]?pcl",
"double posterior"
],
"why": "the displaced fragment lies anteroinferior to the PCL, mimicking a second PCL"
},
{
"label": "fragment in the notch",
"patterns": [
"intercondylar notch",
"notch",
"fragment"
],
"why": "the displaced inner fragment migrates into the intercondylar notch"
},
{
"label": "absent-bowtie sign",
"patterns": [
"absent[\\s-]?bow",
"bowtie",
"bow tie"
],
"why": "<2 contiguous sagittal slices show the normal bowtie body, indicating the body has displaced"
},
{
"label": "double-anterior-horn sign",
"patterns": [
"double[\\s-]?anterior",
"double anterior horn"
],
"why": "a fragment flipped anteriorly produces a second apparent anterior horn"
},
{
"label": "displaced fragment",
"patterns": [
"displac",
"flipped",
"flip"
],
"why": "emphasizes the fragment has moved from its bed, a surgically relevant detail"
}
],
"id": 25
},
{
"type": "dictate",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 2,
"prompt": "Dictate a stable horizontal (oblique) tear of the posterior horn of the medial meniscus with an associated parameniscal cyst.",
"model": "There is a horizontal oblique tear of the posterior horn of the medial meniscus reaching the inferior articular surface, with an associated parameniscal cyst measuring 1.2 cm tracking along the posteromedial joint line. No meniscal extrusion or displaced fragment.",
"keyterms": [
{
"label": "horizontal/oblique tear",
"patterns": [
"horizontal",
"oblique"
],
"why": "a cleavage tear splitting the meniscus into superior and inferior leaves, common with degeneration"
},
{
"label": "surface-reaching",
"patterns": [
"surface",
"reach",
"inferior articular",
"superior articular"
],
"why": "specifying which surface the tear contacts confirms it meets tear criteria"
},
{
"label": "parameniscal cyst",
"patterns": [
"parameniscal",
"paramenisc",
"cyst"
],
"why": "fluid decompressing through the tear collects adjacent to the meniscus"
},
{
"label": "posterior horn",
"patterns": [
"posterior horn"
],
"why": "localizes the tear segment"
},
{
"label": "no extrusion",
"patterns": [
"no extrus",
"without extrus"
],
"why": "explicitly noting absence of extrusion characterizes a stable tear"
}
],
"id": 26
},
{
"type": "dictate",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 2,
"prompt": "Dictate the findings of a ramp lesion.",
"model": "There is a ramp lesion, seen as a vertical tear at the peripheral meniscocapsular junction of the posterior horn of the medial meniscus, with adjacent fluid signal and posteromedial tibial marrow edema. This finding is strongly associated with the ACL tear also present.",
"keyterms": [
{
"label": "ramp lesion",
"patterns": [
"ramp"
],
"why": "a tear/disruption at the posteromedial meniscocapsular junction, often missed"
},
{
"label": "meniscocapsular junction",
"patterns": [
"meniscocapsul",
"capsular"
],
"why": "the lesion is at the peripheral attachment of the meniscus to the capsule"
},
{
"label": "posterior horn medial meniscus",
"patterns": [
"posterior horn",
"posteromedial"
],
"why": "the characteristic location of a ramp lesion"
},
{
"label": "ACL association",
"patterns": [
"acl",
"anterior cruciate"
],
"why": "ramp lesions are highly associated with ACL injuries and should be sought"
},
{
"label": "marrow edema",
"patterns": [
"edema",
"oedema",
"contusion",
"bruise"
],
"why": "posteromedial tibial edema is a secondary clue to a ramp lesion"
}
],
"id": 27
},
{
"type": "cloze",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 1,
"prompt": "A discoid meniscus is suggested when >=3 contiguous 5 mm sagittal slices show a continuous meniscal body, i.e. an absent ___ pattern of slices, or a transverse meniscal width >15 mm on coronal images.",
"answers": [
"bowtie",
"bow tie",
"bow-tie"
],
"explain": "Normally only 2 contiguous sagittal slices show the bowtie body. >=3 contiguous bowtie slices (or coronal width >15 mm / >20% of tibial width) indicates a discoid meniscus, most often lateral.",
"id": 28
},
{
"type": "dictate",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 2,
"prompt": "You see a band of low signal coursing from the posterior medial femoral condyle, anterior to the PCL, to the posterior horn of the lateral meniscus. Dictate this so it is NOT mistaken for a tear.",
"model": "Note is made of a normal meniscofemoral ligament (ligament of Humphrey, anterior to the PCL), seen as a thin low-signal band coursing to the posterior horn of the lateral meniscus; this is a normal variant and should not be mistaken for a meniscal tear or loose fragment.",
"keyterms": [
{
"label": "meniscofemoral ligament",
"patterns": [
"meniscofemoral"
],
"why": "normal ligaments connecting the lateral meniscus posterior horn to the femur"
},
{
"label": "Humphrey vs Wrisberg",
"patterns": [
"humphrey",
"wrisberg"
],
"why": "Humphrey lies anterior to the PCL, Wrisberg posterior; naming shows mastery"
},
{
"label": "normal variant / mimic",
"patterns": [
"normal variant",
"normal",
"mimic",
"pitfall"
],
"why": "explicitly labeling it normal prevents a false tear call"
},
{
"label": "posterior horn lateral meniscus",
"patterns": [
"posterior horn",
"lateral menisc"
],
"why": "the ligament inserts here, where the pseudotear cleft appears"
},
{
"label": "not a tear",
"patterns": [
"not.*tear",
"should not",
"do not mistake"
],
"why": "closing the loop for the referring clinician"
}
],
"id": 29
},
{
"type": "cloze",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 2,
"prompt": "A vertical longitudinal tear at the posterior medial meniscocapsular junction associated with ACL rupture is termed a ___ lesion.",
"answers": [
"ramp"
],
"explain": "The ramp lesion is a meniscocapsular/peripheral red-zone tear of the posterior horn of the medial meniscus, classically associated with ACL tears and best seen on fluid-sensitive sagittal images with posteromedial tibial edema.",
"id": 30
},
{
"type": "dictate",
"joint": "knee",
"topic": "ACL",
"difficulty": 3,
"prompt": "Dictate an acute complete ACL tear, including the secondary signs that support it.",
"model": "The ACL fibers are discontinuous and not visualized in their expected course, consistent with an acute complete tear. Supporting secondary signs include the pivot-shift bone-contusion pattern with marrow edema in the lateral femoral condyle and posterolateral tibial plateau, anterior translation of the tibia with a positive anterior drawer/PCL buckling sign, and uncovering of the posterior horn of the lateral meniscus.",
"keyterms": [
{
"label": "primary sign (fiber discontinuity)",
"patterns": [
"discontinu",
"not visualized",
"disrupt",
"fibers"
],
"why": "the direct sign is non-visualization/discontinuity of the ACL fibers"
},
{
"label": "pivot-shift contusion pattern",
"patterns": [
"pivot[\\s-]?shift",
"kissing contusion",
"bone contusion",
"bone bruise"
],
"why": "the characteristic impaction bruise pattern of the ACL injury mechanism"
},
{
"label": "lateral femoral condyle + posterolateral tibia",
"patterns": [
"lateral femoral condyle",
"posterolateral tibia",
"posterolateral plateau"
],
"why": "the specific paired contusion locations from the pivot-shift"
},
{
"label": "anterior tibial translation",
"patterns": [
"anterior translat",
"anterior drawer",
"tibial translat"
],
"why": "the tibia subluxes anteriorly when the ACL is incompetent"
},
{
"label": "PCL buckling",
"patterns": [
"pcl buckl",
"buckl"
],
"why": "the PCL takes on a tighter curve as the tibia translates forward"
},
{
"label": "uncovered posterior lateral meniscus",
"patterns": [
"uncover",
"posterior horn.*lateral"
],
"why": "anterior tibial subluxation uncovers the posterior horn of the lateral meniscus"
}
],
"id": 31
},
{
"type": "mcq",
"joint": "knee",
"topic": "ACL",
"difficulty": 2,
"prompt": "Which lateral tibial-rim avulsion fracture is highly associated with an ACL tear and often co-exists with a ramp lesion?",
"choices": [
"Arcuate fracture",
"Segond fracture",
"Reverse Segond fracture",
"Deep notch sign"
],
"answer": 1,
"explain": "The Segond fracture is an avulsion of the lateral tibial rim (anterolateral ligament / lateral capsule), highly associated with ACL tears (and often medial meniscal injury). A reverse Segond (medial rim) associates with PCL injury; an arcuate fracture is a fibular styloid avulsion (PLC).",
"id": 32
},
{
"type": "dictate",
"joint": "knee",
"topic": "ACL",
"difficulty": 2,
"prompt": "Dictate ACL mucoid degeneration so it is not confused with a tear.",
"model": "The ACL is diffusely thickened with increased intrasubstance T2 signal interdigitating between intact, taut fibers, producing a celery-stalk appearance, consistent with mucoid degeneration rather than a tear. There is no fiber discontinuity and no secondary signs of injury; an associated intraosseous ganglion at the tibial insertion is noted.",
"keyterms": [
{
"label": "mucoid degeneration",
"patterns": [
"mucoid"
],
"why": "benign myxoid infiltration of the ACL, not a tear"
},
{
"label": "celery-stalk sign",
"patterns": [
"celery"
],
"why": "the striated appearance of intact fibers separated by mucoid signal"
},
{
"label": "intact fibers",
"patterns": [
"intact",
"taut",
"continu"
],
"why": "fibers remain continuous, distinguishing it from a tear"
},
{
"label": "T2 hyperintensity",
"patterns": [
"t2",
"increased signal",
"hyperintens"
],
"why": "the mucoid material is bright on fluid-sensitive sequences"
},
{
"label": "associated ganglion cyst",
"patterns": [
"ganglion",
"cyst"
],
"why": "intraosseous/intraligamentous ganglia frequently accompany mucoid degeneration"
},
{
"label": "no tear",
"patterns": [
"not.*tear",
"no.*tear",
"rather than"
],
"why": "the key clinical message is that this is not an acute tear"
}
],
"id": 33
},
{
"type": "dictate",
"joint": "knee",
"topic": "PCL/PLC",
"difficulty": 2,
"prompt": "Dictate an acute PCL tear and note the associated posterolateral corner sign you would search for.",
"model": "The PCL is markedly thickened and edematous with increased intrasubstance T2 signal but intact, attenuated fibers, consistent with a high-grade interstitial sprain. An arcuate sign (avulsion fracture of the fibular styloid) is sought given the association with posterolateral corner injury.",
"keyterms": [
{
"label": "PCL thickening/edema",
"patterns": [
"thicken",
"edematous",
"edema",
"oedema"
],
"why": "acute PCL injury typically shows a thickened, high-signal but often still-continuous ligament"
},
{
"label": "T2 signal",
"patterns": [
"t2",
"increased signal",
"hyperintens"
],
"why": "intrasubstance fluid signal marks the acute injury"
},
{
"label": "interstitial/sprain grading",
"patterns": [
"interstit",
"sprain",
"partial",
"high-grade"
],
"why": "PCL tears are often interstitial rather than completely discontinuous"
},
{
"label": "arcuate sign",
"patterns": [
"arcuate"
],
"why": "fibular styloid avulsion, a marker of posterolateral corner injury"
},
{
"label": "posterolateral corner",
"patterns": [
"posterolateral corner",
"plc"
],
"why": "PLC injuries frequently accompany PCL tears and must be assessed"
},
{
"label": "fibular styloid",
"patterns": [
"fibular styloid",
"styloid"
],
"why": "the avulsed bony attachment site of the arcuate complex"
}
],
"id": 34
},
{
"type": "mcq",
"joint": "knee",
"topic": "MCL",
"difficulty": 1,
"prompt": "On MRI, a grade III (complete) MCL injury is best described as:",
"choices": [
"Periligamentous edema with an intact, normal-thickness ligament",
"Partial-thickness fiber disruption with thickening and surrounding edema",
"Complete discontinuity of the ligament fibers with a wavy/lax contour",
"Low-signal thickening without edema (chronic)"
],
"answer": 2,
"explain": "Grade I = periligamentous edema, intact fibers; grade II = partial fiber disruption/thickening; grade III = complete fiber discontinuity, often with a wavy lax contour and adjacent fluid. The superficial MCL most commonly tears proximally near the femoral attachment.",
"id": 35
},
{
"type": "dictate",
"joint": "knee",
"topic": "Cartilage",
"difficulty": 2,
"prompt": "Dictate a focal full-thickness cartilage defect of the medial femoral condyle using a recognized grading scheme.",
"model": "There is a focal full-thickness (modified Outerbridge/ICRS grade 4) cartilage defect of the weight-bearing medial femoral condyle measuring 8 mm in width, extending to subchondral bone with underlying subchondral marrow edema and a small subchondral cyst. No intra-articular cartilage loose body identified.",
"keyterms": [
{
"label": "full-thickness defect",
"patterns": [
"full[\\s-]?thickness",
"grade 4",
"grade iv"
],
"why": "grade 4 = defect extending to subchondral bone"
},
{
"label": "Outerbridge/ICRS grading",
"patterns": [
"outerbridge",
"icrs",
"grade \\d"
],
"why": "naming a standardized grading system communicates severity precisely"
},
{
"label": "subchondral bone exposure",
"patterns": [
"subchondral",
"to bone",
"bone exposed"
],
"why": "full-thickness loss exposes the subchondral plate"
},
{
"label": "measurement",
"patterns": [
"\\d\\s?mm",
"\\d\\s?cm"
],
"why": "defect size guides surgical options (e.g., microfracture vs graft)"
},
{
"label": "subchondral edema/cyst",
"patterns": [
"marrow edema",
"subchondral cyst",
"cyst",
"edema"
],
"why": "reactive marrow changes accompany cartilage loss"
},
{
"label": "loose body search",
"patterns": [
"loose body",
"loose",
"intra-articular body"
],
"why": "a displaced cartilage fragment must be excluded"
}
],
"id": 36
},
{
"type": "dictate",
"joint": "knee",
"topic": "Osteochondral",
"difficulty": 3,
"prompt": "Dictate an unstable osteochondral lesion of the lateral femoral condyle.",
"model": "There is an osteochondral lesion of the lateral femoral condyle with high-signal fluid undermining the osteochondral fragment on fluid-sensitive images and a surrounding rim of cystic change, findings indicating instability. The fragment remains in situ within its donor crater; no displaced intra-articular loose body is seen.",
"keyterms": [
{
"label": "osteochondral lesion",
"patterns": [
"osteochondral",
"ocd",
"oc lesion"
],
"why": "injury involving both cartilage and underlying subchondral bone"
},
{
"label": "fluid undermining",
"patterns": [
"undermin",
"fluid.*beneath",
"fluid.*fragment",
"high.signal.*rim"
],
"why": "a T2-bright line beneath the fragment is the key instability sign"
},
{
"label": "instability criteria",
"patterns": [
"unstabl",
"instab"
],
"why": "distinguishing stable vs unstable changes management"
},
{
"label": "subchondral cysts",
"patterns": [
"cyst"
],
"why": "cysts >5 mm beneath the lesion also suggest instability"
},
{
"label": "in-situ vs displaced",
"patterns": [
"in situ",
"in-situ",
"crater",
"donor",
"displac"
],
"why": "states whether the fragment has separated from its bed"
},
{
"label": "loose body",
"patterns": [
"loose body",
"loose"
],
"why": "a freed fragment becomes an intra-articular loose body"
}
],
"id": 37
},
{
"type": "cloze",
"joint": "knee",
"topic": "Osteochondral",
"difficulty": 2,
"prompt": "A typically subchondral, geographic, diffuse marrow-edema lesion of the medial femoral condyle in an older patient with acute pain, without a discrete fracture line on radiographs, is best described as a subchondral ___ fracture (the entity formerly called SONK).",
"answers": [
"insufficiency"
],
"explain": "'Spontaneous osteonecrosis of the knee' (SONK) is now understood to represent a subchondral insufficiency fracture: a subchondral low-signal line with surrounding marrow edema, distinct from true AVN (which shows serpiginous double-line sign and is often bilateral/multifocal with risk factors).",
"id": 38
},
{
"type": "dictate",
"joint": "knee",
"topic": "Extensor mechanism",
"difficulty": 2,
"prompt": "Dictate a complete patellar tendon tear with patella alta.",
"model": "There is a full-thickness tear of the patellar tendon at its proximal origin from the inferior pole of the patella, with fiber retraction, a fluid-filled gap, and resultant patella alta (Insall-Salvati ratio elevated at 1.5). A joint effusion and infrapatellar hematoma are present.",
"keyterms": [
{
"label": "patellar tendon tear",
"patterns": [
"patellar tendon",
"patellar tend"
],
"why": "identifies the injured structure and that it is the tendon below the patella"
},
{
"label": "full-thickness/complete",
"patterns": [
"full[\\s-]?thickness",
"complete",
"retract"
],
"why": "distinguishes a complete rupture with retraction from a partial tear"
},
{
"label": "inferior pole origin",
"patterns": [
"inferior pole",
"proximal origin",
"origin"
],
"why": "the patellar tendon most often tears proximally at the inferior patellar pole"
},
{
"label": "patella alta",
"patterns": [
"patella alta",
"alta",
"high.riding"
],
"why": "loss of tendon restraint allows the patella to ride high"
},
{
"label": "Insall-Salvati ratio",
"patterns": [
"insall",
"salvati"
],
"why": "the standard ratio for quantifying patellar height (normal ~0.8-1.2)"
},
{
"label": "fluid gap/hematoma",
"patterns": [
"gap",
"hematoma",
"haematoma",
"fluid"
],
"why": "the tendinous gap fills with fluid/blood in an acute rupture"
}
],
"id": 39
},
{
"type": "dictate",
"joint": "knee",
"topic": "Patellar dislocation",
"difficulty": 3,
"prompt": "Dictate the findings of a transient lateral patellar dislocation.",
"model": "Findings are consistent with a transient lateral patellar dislocation: there is a tear of the medial patellofemoral ligament at its patellar attachment, with the characteristic paired bone contusions involving the medial patellar facet and the anterolateral femoral condyle. A joint effusion and a chondral/osteochondral fragment from the medial patellar facet are noted.",
"keyterms": [
{
"label": "transient lateral patellar dislocation",
"patterns": [
"lateral patellar disloc",
"transient",
"patellar disloc"
],
"why": "names the mechanism that self-reduces but leaves a classic imaging footprint"
},
{
"label": "MPFL tear",
"patterns": [
"mpfl",
"medial patellofemoral"
],
"why": "the primary medial restraint, torn during lateral dislocation"
},
{
"label": "paired bone contusions",
"patterns": [
"bone contusion",
"bone bruise",
"contusion",
"bruise"
],
"why": "the pathognomonic bruise pair confirms the diagnosis"
},
{
"label": "medial patellar facet",
"patterns": [
"medial patellar facet",
"medial patella",
"medial facet"
],
"why": "the patella impacts here as it relocates"
},
{
"label": "anterolateral femoral condyle",
"patterns": [
"anterolateral femoral condyle",
"anterolateral.*condyle"
],
"why": "the lateral condyle is struck by the relocating patella"
},
{
"label": "osteochondral fragment",
"patterns": [
"osteochondral",
"chondral fragment",
"loose body",
"fragment"
],
"why": "a shear fragment from the medial facet is a frequent complication"
}
],
"id": 40
},
{
"type": "mcq",
"joint": "knee",
"topic": "Patellofemoral",
"difficulty": 2,
"prompt": "Which measurement and threshold is most commonly used to indicate a pathologically lateralized tibial tubercle predisposing to patellar maltracking?",
"choices": [
"TT-TG distance > 20 mm",
"Sulcus angle < 120 degrees",
"Insall-Salvati ratio < 0.8",
"Patellar tilt angle < 5 degrees"
],
"answer": 0,
"explain": "The tibial tubercle-trochlear groove (TT-TG) distance is abnormal when >20 mm (15-20 mm borderline), indicating lateralization of the tubercle and predisposition to lateral maltracking/dislocation. A sulcus angle >145 degrees suggests trochlear dysplasia, and an Insall-Salvati >1.2 indicates patella alta.",
"id": 41
},
{
"type": "dictate",
"joint": "knee",
"topic": "Patellofemoral",
"difficulty": 2,
"prompt": "Dictate trochlear dysplasia with the supporting measurements.",
"model": "There is trochlear dysplasia with a shallow, flattened trochlea: the sulcus angle is increased at 150 degrees and trochlear depth is reduced at 2 mm, with a crossing sign on the lateral projection. The TT-TG distance is elevated at 22 mm and the Insall-Salvati ratio is 1.4, indicating patella alta; together these findings predispose to lateral patellar instability.",
"keyterms": [
{
"label": "trochlear dysplasia",
"patterns": [
"trochlear dysplas",
"dysplas",
"shallow trochlea",
"flattened"
],
"why": "an abnormally shallow trochlear groove, a key cause of patellar instability"
},
{
"label": "sulcus angle",
"patterns": [
"sulcus angle",
"sulcus"
],
"why": ">145 degrees indicates a flat/dysplastic trochlea"
},
{
"label": "trochlear depth",
"patterns": [
"trochlear depth",
"depth"
],
"why": "reduced depth (<3 mm) quantifies dysplasia"
},
{
"label": "TT-TG distance",
"patterns": [
"tt[\\s-]?tg",
"tubercle.trochlear",
"tibial tubercle"
],
"why": ">20 mm indicates pathologic tubercle lateralization"
},
{
"label": "Insall-Salvati / patella alta",
"patterns": [
"insall",
"salvati",
"patella alta",
"alta"
],
"why": "patella alta (>1.2) reduces trochlear engagement and worsens instability"
},
{
"label": "crossing sign",
"patterns": [
"crossing sign",
"crossing"
],
"why": "the trochlear floor line crosses the anterior condylar margin, a dysplasia sign"
}
],
"id": 42
},
{
"type": "dictate",
"joint": "knee",
"topic": "Meniscus",
"difficulty": 1,
"prompt": "You see an undulating, wavy but smooth contour of the inferior surface of the medial meniscus body on a single image, with no surfacing signal. Dictate it correctly.",
"model": "The medial meniscus demonstrates a meniscal flounce, an undulating wavy contour of the free edge without surface-reaching signal; this is a normal variant and does not represent a tear.",
"keyterms": [
{
"label": "meniscal flounce",
"patterns": [
"flounce"
],
"why": "a normal wavy fold of the meniscal free edge, not a tear"
},
{
"label": "normal variant",
"patterns": [
"normal variant",
"normal",
"variant"
],
"why": "explicitly labeling it benign prevents overcalling"
},
{
"label": "no surfacing signal",
"patterns": [
"no surfac",
"without surfac",
"no.*tear",
"does not represent"
],
"why": "absence of surface-reaching signal confirms it is not a tear"
},
{
"label": "free edge contour",
"patterns": [
"free edge",
"undulat",
"wavy",
"contour"
],
"why": "describes the morphology that defines a flounce"
}
],
"id": 43
},
{
"type": "mcq",
"joint": "knee",
"topic": "Meniscus mimics",
"difficulty": 1,
"prompt": "A linear cleft at the posterolateral lateral meniscus where vessels and the popliteus tendon course should NOT be called a tear because it represents:",
"choices": [
"A radial tear",
"The popliteal hiatus with popliteomeniscal fascicles",
"A displaced bucket-handle fragment",
"A parameniscal cyst"
],
"answer": 1,
"explain": "At the popliteal hiatus the popliteus tendon passes through the lateral meniscus, with superior and inferior popliteomeniscal fascicles creating a normal striated cleft that can mimic a tear. Recognizing this normal anatomy avoids a false-positive lateral meniscal tear call.",
"id": 44
},
{
"type": "cloze",
"joint": "knee",
"topic": "ACL",
"difficulty": 2,
"prompt": "The pivot-shift bone-contusion pattern of an acute ACL tear involves marrow edema in the ___ femoral condyle and the posterolateral tibial plateau.",
"answers": [
"lateral"
],
"explain": "The pivot-shift mechanism impacts the lateral femoral condyle (sulcus terminalis region) against the posterolateral tibial plateau, producing the characteristic 'kissing' contusion pair that is a strong secondary sign of an acute ACL tear.",
"id": 45
},
{
"type": "dictate",
"joint": "knee",
"topic": "ACL graft",
"difficulty": 3,
"prompt": "Dictate evaluation of an ACL reconstruction graft that appears intact but functionally lax.",
"model": "The ACL reconstruction graft is intact and continuous with uniformly low signal, but it follows a slightly horizontal/posteriorly bowed course with mild anterior tibial translation and a positive PCL line, suggesting functional laxity rather than discrete tear. The femoral and tibial tunnels are appropriately positioned without osteolysis or a focal fluid-filled ganglion.",
"keyterms": [
{
"label": "graft integrity",
"patterns": [
"graft",
"intact",
"continu"
],
"why": "first assess whether the graft fibers are continuous"
},
{
"label": "graft signal",
"patterns": [
"low signal",
"signal",
"hyperintens"
],
"why": "a mature graft is low signal; increased signal can mean impingement or partial tear"
},
{
"label": "graft obliquity/laxity",
"patterns": [
"horizontal",
"bowed",
"obliqu",
"lax",
"translat"
],
"why": "a horizontalized or bowed graft with anterior translation implies functional failure"
},
{
"label": "tunnel position",
"patterns": [
"tunnel",
"tunnels"
],
"why": "malpositioned tunnels predispose to graft failure or impingement"
},
{
"label": "tunnel osteolysis/widening",
"patterns": [
"osteolysis",
"widening",
"ganglion"
],
"why": "tunnel widening or a ganglion signals complications"
},
{
"label": "PCL line / Blumensaat",
"patterns": [
"pcl line",
"blumensaat"
],
"why": "graft should parallel the Blumensaat line; deviation indicates malposition/laxity"
}
],
"id": 46
},
{
"type": "dictate",
"joint": "hip",
"topic": "FAI cam",
"difficulty": 2,
"prompt": "Dictate the findings for cam-type femoroacetabular impingement, including the measurement you'd report.",
"model": "There is an osseous bump at the anterosuperior femoral head-neck junction with loss of the normal concave head-neck offset, consistent with cam-type morphology. The alpha angle measured on the oblique axial sequence is 68 degrees, abnormal and above the 55 degree threshold. There is associated anterosuperior chondrolabral junction signal abnormality with cartilage thinning and a small reactive subchondral cyst (herniation pit) within the head-neck junction. No subchondral marrow edema to suggest acute insufficiency fracture.",
"keyterms": [
{
"label": "alpha angle",
"patterns": [
"alpha angle",
"alpha"
],
"why": "the key measurement for cam morphology, abnormal when greater than 55 degrees"
},
{
"label": "head-neck junction",
"patterns": [
"head[- ]neck",
"head neck"
],
"why": "the site of the cam bump where the normal waist of the femur is lost"
},
{
"label": "anterosuperior",
"patterns": [
"anterosuperior",
"anteriosuperior"
],
"why": "the typical clock-face location of cam impingement (1-2 o'clock)"
},
{
"label": "head-neck offset",
"patterns": [
"offset",
"concav"
],
"why": "loss of the normal concave offset is the hallmark of cam morphology"
},
{
"label": "cam morphology",
"patterns": [
"cam"
],
"why": "the specific FAI subtype caused by an aspherical femoral head"
},
{
"label": "chondrolabral junction",
"patterns": [
"chondrolabral"
],
"why": "the cartilage-labrum interface that delaminates under cam shear stress"
},
{
"label": "55 degree threshold",
"patterns": [
"55",
"fifty[- ]five"
],
"why": "the accepted cutoff above which the alpha angle is considered abnormal"
},
{
"label": "herniation pit",
"patterns": [
"herniation pit",
"reactive.*cyst",
"fibrocystic"
],
"why": "a reactive subchondral cyst at the head-neck junction associated with cam FAI"
}
],
"id": 47
},
{
"type": "dictate",
"joint": "hip",
"topic": "FAI pincer",
"difficulty": 2,
"prompt": "Dictate the findings for pincer-type femoroacetabular impingement, including the relevant angle and an associated radiographic sign.",
"model": "There is acetabular overcoverage with a lateral center-edge angle of 43 degrees, exceeding the 40 degree threshold for pincer morphology. Findings of focal anterior overcoverage with a crossover sign are present, reflecting acetabular retroversion. The labrum is degenerated and intrasubstance with a small ganglion, and there is a contrecoup posteroinferior cartilage loss pattern. No cam bump; alpha angle is normal at 48 degrees.",
"keyterms": [
{
"label": "lateral center-edge angle",
"patterns": [
"center[- ]edge",
"LCEA",
"CE angle"
],
"why": "quantifies acetabular coverage, greater than 40 degrees indicates pincer overcoverage"
},
{
"label": "overcoverage",
"patterns": [
"overcoverage",
"over[- ]coverage",
"overcover"
],
"why": "excess acetabular coverage of the femoral head defines pincer FAI"
},
{
"label": "crossover sign",
"patterns": [
"crossover",
"cross[- ]over"
],
"why": "radiographic sign of acetabular retroversion contributing to focal pincer"
},
{
"label": "retroversion",
"patterns": [
"retroversion",
"retrovert"
],
"why": "posteriorly oriented acetabulum causing anterior pincer impingement"
},
{
"label": "pincer morphology",
"patterns": [
"pincer"
],
"why": "the FAI subtype from acetabular-sided overcoverage"
},
{
"label": "contrecoup",
"patterns": [
"contrecoup",
"contre[- ]coup",
"posteroinferior"
],
"why": "the posteroinferior cartilage damage pattern characteristic of pincer impingement"
},
{
"label": "40 degree threshold",
"patterns": [
"40",
"forty"
],
"why": "the LCEA cutoff above which overcoverage/pincer is diagnosed"
}
],
"id": 48
},
{
"type": "dictate",
"joint": "hip",
"topic": "Labral tear",
"difficulty": 2,
"prompt": "Dictate an acetabular labral tear using clock-face localization and note an associated cyst.",
"model": "There is a tear at the anterosuperior acetabular labrum centered at the 12 to 1 o'clock position, manifest as linear high T2 signal extending to the articular surface at the chondrolabral junction. The tear is associated with a small adjacent paralabral cyst measuring 8 millimeters. There is early chondrolabral junction delamination with undermining of the adjacent acetabular cartilage. The remainder of the labrum is intact without detachment.",
"keyterms": [
{
"label": "anterosuperior labrum",
"patterns": [
"anterosuperior",
"12.*o.?clock",
"1 o.?clock",
"11.*o.?clock"
],
"why": "the most common location for acetabular labral tears"
},
{
"label": "clock-face",
"patterns": [
"o.?clock",
"clock"
],
"why": "the standardized localization system for describing labral pathology"
},
{
"label": "chondrolabral junction",
"patterns": [
"chondrolabral"
],
"why": "the cartilage-labrum interface where most tears propagate"
},
{
"label": "paralabral cyst",
"patterns": [
"paralabral",
"para[- ]labral"
],
"why": "a cyst adjacent to a torn labrum, a secondary sign indicating a tear"
},
{
"label": "delamination",
"patterns": [
"delaminat",
"undermin"
],
"why": "separation of cartilage from subchondral bone adjacent to a chondrolabral tear"
},
{
"label": "articular surface",
"patterns": [
"articular surface",
"extend.*surface"
],
"why": "signal reaching the surface confirms a true tear versus degeneration"
},
{
"label": "detachment",
"patterns": [
"detach"
],
"why": "distinguishing a tear from full labral detachment from the acetabular rim"
}
],
"id": 49
},
{
"type": "dictate",
"joint": "hip",
"topic": "AVN",
"difficulty": 3,
"prompt": "Dictate femoral head avascular necrosis including the characteristic signs, staging system, and the measurement you would report for prognosis.",
"model": "There is a serpiginous geographic lesion in the anterosuperior weight-bearing portion of the right femoral head demonstrating the double-line sign on T2, with a peripheral low-signal rim and inner hyperintense granulation tissue. There is a subchondral crescent sign indicating subchondral fracture without articular collapse, consistent with ARCO stage 3A. The lesion involves approximately 35 percent of the weight-bearing surface and subtends a combined necrotic angle that places it in the medium-to-large range. No femoral head flattening to indicate collapse beyond 2 millimeters.",
"keyterms": [
{
"label": "double-line sign",
"patterns": [
"double[- ]line",
"double line"
],
"why": "pathognomonic for osteonecrosis: low-signal sclerotic rim with inner high-signal granulation tissue on T2"
},
{
"label": "crescent sign",
"patterns": [
"crescent"
],
"why": "subchondral lucency/fracture indicating impending collapse, defines later ARCO stage"
},
{
"label": "ARCO staging",
"patterns": [
"ARCO",
"stage 3",
"stage 2",
"stage"
],
"why": "the standard staging system for osteonecrosis based on collapse and crescent"
},
{
"label": "weight-bearing involvement",
"patterns": [
"weight[- ]bearing",
"percent",
"%",
"necrotic angle"
],
"why": "the percentage of weight-bearing surface involved predicts risk of collapse"
},
{
"label": "serpiginous",
"patterns": [
"serpiginous",
"geographic"
],
"why": "describes the wavy demarcating margin of the necrotic segment"
},
{
"label": "subchondral fracture",
"patterns": [
"subchondral fracture",
"subchondral"
],
"why": "the crescent represents a subchondral fracture preceding collapse"
},
{
"label": "collapse",
"patterns": [
"collapse",
"flatten"
],
"why": "articular collapse is the key prognostic and staging determinant"
}
],
"id": 50
},
{
"type": "dictate",
"joint": "hip",
"topic": "Subchondral insufficiency fracture",
"difficulty": 3,
"prompt": "Dictate findings distinguishing a subchondral insufficiency fracture of the femoral head from transient bone marrow edema syndrome.",
"model": "There is extensive bone marrow edema throughout the right femoral head and neck extending into the intertrochanteric region. Critically, there is a low-signal subchondral fracture line paralleling the articular surface in the superior weight-bearing femoral head with associated subchondral marrow edema, consistent with a subchondral insufficiency fracture rather than transient osteoporosis. The presence of the discrete subchondral fracture line distinguishes this from bone marrow edema syndrome, which shows edema without a fracture line. No double-line sign to suggest osteonecrosis.",
"keyterms": [
{
"label": "subchondral fracture line",
"patterns": [
"fracture line",
"subchondral fracture"
],
"why": "the presence of a low-signal subchondral line is what defines insufficiency fracture versus pure marrow edema"
},
{
"label": "bone marrow edema",
"patterns": [
"marrow edema",
"bone marrow"
],
"why": "the nonspecific finding common to both entities"
},
{
"label": "transient osteoporosis",
"patterns": [
"transient osteoporosis",
"transient",
"edema syndrome",
"BMES"
],
"why": "the self-limited diagnosis of exclusion when no fracture line is present"
},
{
"label": "insufficiency fracture",
"patterns": [
"insufficiency"
],
"why": "fracture through abnormal/osteoporotic bone under normal stress"
},
{
"label": "weight-bearing",
"patterns": [
"weight[- ]bearing",
"superior"
],
"why": "the superior weight-bearing region is where insufficiency fractures occur"
},
{
"label": "double-line sign",
"patterns": [
"double[- ]line"
],
"why": "its absence helps exclude osteonecrosis in the differential"
}
],
"id": 51
},
{
"type": "dictate",
"joint": "hip",
"topic": "Gluteal tendons",
"difficulty": 2,
"prompt": "Dictate a gluteus medius/minimus tear at the greater trochanter, using the rotator cuff analogy and noting muscle quality.",
"model": "At the greater trochanter, there is a full-thickness tear of the gluteus medius tendon at its insertion on the lateral facet, with a fluid-filled gap and tendon retraction. The gluteus minimus tendon at the anterior facet shows intermediate-grade tendinosis and partial undersurface tearing. These represent the rotator cuff of the hip. There is moderate fatty atrophy of the gluteus medius muscle belly, Goutallier grade 2. Associated trochanteric bursal fluid is present.",
"keyterms": [
{
"label": "gluteus medius",
"patterns": [
"gluteus medius",
"glut.*medius",
"g.?med"
],
"why": "the primary abductor tendon torn in greater trochanteric pain syndrome"
},
{
"label": "gluteus minimus",
"patterns": [
"gluteus minimus",
"glut.*minimus",
"g.?min"
],
"why": "inserts on the anterior facet, the second component of the hip abductor cuff"
},
{
"label": "rotator cuff of the hip",
"patterns": [
"rotator cuff of the hip",
"rotator cuff"
],
"why": "the analogy describing the gluteal tendon complex at the trochanter"
},
{
"label": "facet anatomy",
"patterns": [
"facet",
"lateral facet",
"anterior facet"
],
"why": "the greater trochanter facets are distinct insertion sites for medius and minimus"
},
{
"label": "fatty atrophy",
"patterns": [
"fatty atrophy",
"fatty infiltrat",
"Goutallier"
],
"why": "muscle quality (graded like the shoulder) predicts repair outcome"
},
{
"label": "trochanteric bursitis",
"patterns": [
"bursa",
"bursal",
"bursitis"
],
"why": "commonly accompanies gluteal tendinopathy in lateral hip pain"
},
{
"label": "tendon retraction",
"patterns": [
"retract",
"gap"
],
"why": "degree of retraction guides surgical planning in full-thickness tears"
}
],
"id": 52
},
{
"type": "dictate",
"joint": "hip",
"topic": "Athletic pubalgia",
"difficulty": 3,
"prompt": "Dictate findings of athletic pubalgia (sports hernia), naming the relevant aponeurosis and the characteristic sign.",
"model": "At the pubic symphysis there is disruption of the rectus abdominis-adductor longus aponeurosis at its insertion on the anterior pubis, with a secondary cleft sign extending inferiorly from the symphyseal fibrocartilage on the symptomatic side. There is associated marrow edema at the pubic body and parasymphyseal bone stress. The findings are consistent with athletic pubalgia. The adductor longus origin shows tendinosis without full-thickness avulsion.",
"keyterms": [
{
"label": "rectus-adductor aponeurosis",
"patterns": [
"rectus.*adductor",
"aponeuros",
"rectus abdominis"
],
"why": "the common rectus abdominis-adductor longus plate is the key structure in athletic pubalgia"
},
{
"label": "secondary cleft sign",
"patterns": [
"secondary cleft",
"cleft sign",
"cleft"
],
"why": "abnormal fluid cleft extending from the symphysis indicating microtearing"
},
{
"label": "athletic pubalgia",
"patterns": [
"athletic pubalgia",
"sports hernia",
"core muscle"
],
"why": "the clinical entity describing this groin injury complex"
},
{
"label": "pubic symphysis",
"patterns": [
"symphysis",
"parasymphys",
"pubic"
],
"why": "the central anatomic focus of the injury"
},
{
"label": "adductor longus",
"patterns": [
"adductor longus",
"adductor"
],
"why": "shares the aponeurotic plate and is commonly co-injured"
},
{
"label": "marrow edema",
"patterns": [
"marrow edema",
"bone stress",
"edema"
],
"why": "parasymphyseal stress edema supports the diagnosis"
}
],
"id": 53
},
{
"type": "dictate",
"joint": "hip",
"topic": "Hamstring avulsion",
"difficulty": 2,
"prompt": "Dictate a proximal hamstring origin avulsion, including the retraction measurement that guides management.",
"model": "There is a full-thickness avulsion of the conjoint hamstring origin from the ischial tuberosity involving the semitendinosus and biceps femoris long head, with the semimembranosus partially involved. The tendon stump is retracted 4 centimeters distally with an intervening fluid-filled gap and surrounding hematoma. Retraction beyond 2 centimeters typically favors surgical repair. No sciatic nerve encasement by hematoma.",
"keyterms": [
{
"label": "ischial tuberosity",
"patterns": [
"ischial tuberosity",
"ischium",
"ischial"
],
"why": "the bony origin of the proximal hamstring tendons"
},
{
"label": "retraction",
"patterns": [
"retract",
"\\d+ ?cm",
"centimeter"
],
"why": "the measured tendon retraction in centimeters drives the surgical decision"
},
{
"label": "conjoint tendon",
"patterns": [
"conjoint",
"conjoined"
],
"why": "semitendinosus and biceps femoris long head share a conjoint origin"
},
{
"label": "semimembranosus",
"patterns": [
"semimembranosus"
],
"why": "the separate anterolateral hamstring origin, important to assess involvement"
},
{
"label": "avulsion",
"patterns": [
"avuls",
"full[- ]thickness"
],
"why": "complete detachment from the ischium versus partial strain"
},
{
"label": "sciatic nerve",
"patterns": [
"sciatic"
],
"why": "proximity to the retracted stump/hematoma is clinically important to report"
}
],
"id": 54
},
{
"type": "dictate",
"joint": "hip",
"topic": "Acetabular dysplasia",
"difficulty": 2,
"prompt": "Dictate findings of acetabular dysplasia and the measurement used to define undercoverage.",
"model": "There is acetabular dysplasia with a shallow undercovered acetabulum; the lateral center-edge angle measures 18 degrees, below the 20 to 25 degree threshold indicating undercoverage. There is lateralization of the femoral head with increased load on the anterosuperior labrum, which is hypertrophied and degenerated with a small paralabral cyst. Early superolateral cartilage loss is present. Findings reflect the instability pattern of dysplasia rather than impingement.",
"keyterms": [
{
"label": "lateral center-edge angle",
"patterns": [
"center[- ]edge",
"LCEA",
"CE angle"
],
"why": "LCEA below 20-25 degrees defines undercoverage/dysplasia"
},
{
"label": "undercoverage",
"patterns": [
"undercoverage",
"under[- ]coverage",
"undercover",
"shallow"
],
"why": "deficient acetabular coverage is the essence of dysplasia"
},
{
"label": "dysplasia",
"patterns": [
"dysplasia",
"dysplastic"
],
"why": "the diagnosis defined by inadequate acetabular containment"
},
{
"label": "labral hypertrophy",
"patterns": [
"hypertroph",
"degenerat"
],
"why": "the labrum hypertrophies to compensate for bony undercoverage"
},
{
"label": "20 degree threshold",
"patterns": [
"20",
"25",
"twenty"
],
"why": "the LCEA cutoff range below which dysplasia is diagnosed"
},
{
"label": "instability",
"patterns": [
"instabilit",
"lateraliz"
],
"why": "dysplasia causes instability, the opposite mechanical problem from FAI"
}
],
"id": 55
},
{
"type": "dictate",
"joint": "ankle",
"topic": "Achilles paratenonitis",
"difficulty": 3,
"prompt": "Dictate Achilles tendon inflammation using the precise terminology, and explain why you do NOT call it tenosynovitis.",
"model": "The Achilles tendon is surrounded by peritendinous edema and fluid within the paratenon, with thickening and enhancement of the paratenon, consistent with paratenonitis. Note that the Achilles tendon lacks a true synovial sheath and is invested only by the paratenon, so this is correctly termed paratenonitis (or paratendinitis) rather than tenosynovitis. The mid-substance tendon shows mild fusiform tendinosis but no discrete tear. There is no fluid distending a tendon sheath because none exists for the Achilles.",
"keyterms": [
{
"label": "paratenonitis",
"patterns": [
"paratenonitis",
"paratendinitis",
"paratenon"
],
"why": "the correct term for Achilles peritendinous inflammation since it has only a paratenon"
},
{
"label": "no synovial sheath",
"patterns": [
"no.*synovial",
"lacks.*synovial",
"without.*sheath",
"no.*sheath"
],
"why": "the Achilles has no synovial sheath, which is why tenosynovitis is the wrong word"
},
{
"label": "not tenosynovitis",
"patterns": [
"not.*tenosynovitis",
"rather than tenosynovitis",
"tenosynovitis"
],
"why": "contrasting the incorrect term teaches the key distinction"
},
{
"label": "peritendinous edema",
"patterns": [
"peritendinous",
"peri[- ]tendinous",
"perit"
],
"why": "fluid/edema around the tendon is the imaging hallmark of paratenonitis"
},
{
"label": "paratenon",
"patterns": [
"paratenon"
],
"why": "the loose connective tissue envelope that becomes inflamed in place of a sheath"
},
{
"label": "tendinosis",
"patterns": [
"tendinosis",
"tendinopathy"
],
"why": "intrasubstance degeneration that frequently coexists with paratenonitis"
}
],
"id": 56
},
{
"type": "dictate",
"joint": "ankle",
"topic": "Achilles tendinosis/tear",
"difficulty": 2,
"prompt": "Dictate mid-substance Achilles tendinosis with a partial tear, including the watershed location and the caliber measurement.",
"model": "There is fusiform thickening of the Achilles tendon in the mid-substance watershed zone, approximately 4 centimeters above the calcaneal insertion, with an anteroposterior diameter of 11 millimeters, abnormal and above the normal 7 millimeter limit. Within this region there is an intrasubstance high-signal cleft involving approximately 40 percent of the cross-sectional area, consistent with a partial-thickness tear. The tendon remains in continuity without a full-thickness gap. The Kager fat pad shows reactive edema.",
"keyterms": [
{
"label": "watershed zone",
"patterns": [
"watershed",
"2.?6 ?cm",
"2 to 6",
"mid[- ]substance",
"midsubstance"
],
"why": "the hypovascular zone 2-6 cm above the insertion where tendinosis and tears concentrate"
},
{
"label": "AP diameter",
"patterns": [
"anteroposterior",
"AP",
"diameter",
"7 ?mm",
"caliber"
],
"why": "AP thickness greater than 7 mm indicates abnormal tendon thickening"
},
{
"label": "fusiform thickening",
"patterns": [
"fusiform",
"thicken"
],
"why": "the typical morphology of tendinosis as opposed to focal nodular change"
},
{
"label": "partial-thickness tear",
"patterns": [
"partial",
"intrasubstance",
"cleft"
],
"why": "distinguishes a partial tear in continuity from a complete rupture"
},
{
"label": "continuity",
"patterns": [
"continuity",
"no.*gap",
"in continuity"
],
"why": "absence of a gap confirms the tendon is not fully ruptured"
},
{
"label": "Kager fat pad",
"patterns": [
"Kager",
"kager",
"pre[- ]Achilles fat"
],
"why": "the fat anterior to the Achilles that shows reactive edema in tendon pathology"
}
],
"id": 57
},
{
"type": "dictate",
"joint": "ankle",
"topic": "Insertional Achilles/Haglund",
"difficulty": 2,
"prompt": "Dictate insertional Achilles tendinopathy with associated Haglund deformity and bursitis.",
"model": "At the Achilles insertion on the posterior calcaneus there is insertional tendinopathy with tendon thickening, intrasubstance signal, and insertional enthesophyte formation. There is a prominent posterosuperior calcaneal tuberosity (Haglund deformity) with reactive marrow edema. Fluid distends the retrocalcaneal bursa consistent with retrocalcaneal bursitis, and there is superficial Achilles bursitis posteriorly. These constitute the Haglund syndrome triad.",
"keyterms": [
{
"label": "insertional tendinopathy",
"patterns": [
"insertional",
"insertion"
],
"why": "degeneration at the calcaneal enthesis, distinct from mid-substance disease"
},
{
"label": "Haglund deformity",
"patterns": [
"Haglund",
"haglund",
"posterosuperior.*tuberosity"
],
"why": "the prominent posterosuperior calcaneal tuberosity that mechanically irritates the tendon"
},
{
"label": "retrocalcaneal bursitis",
"patterns": [
"retrocalcaneal"
],
"why": "inflammation of the bursa between the calcaneus and tendon, part of the syndrome"
},
{
"label": "enthesophyte",
"patterns": [
"enthesophyte",
"enthesis",
"spur"
],
"why": "bony spur at the insertion characteristic of insertional disease"
},
{
"label": "Haglund syndrome",
"patterns": [
"Haglund syndrome",
"triad"
],
"why": "the triad of Haglund deformity, retrocalcaneal bursitis, and insertional tendinopathy"
},
{
"label": "superficial bursitis",
"patterns": [
"superficial.*burs",
"retro[- ]Achilles"
],
"why": "the additional bursa posterior to the tendon that can be inflamed"
}
],
"id": 58
},
{
"type": "dictate",
"joint": "ankle",
"topic": "Lateral ligament sprain",
"difficulty": 2,
"prompt": "Dictate a lateral ankle ligament sprain, naming the ligaments in order of injury frequency and grading the injury.",
"model": "There is a grade III (complete) tear of the anterior talofibular ligament with fiber discontinuity and surrounding edema, and a grade II partial tear of the calcaneofibular ligament with thickening and periligamentous edema. The posterior talofibular ligament is intact. The injury pattern follows the expected sequence ATFL then CFL then PTFL. There is an associated anterolateral soft tissue contusion but no osteochondral lesion of the talar dome.",
"keyterms": [
{
"label": "ATFL",
"patterns": [
"anterior talofibular",
"ATFL"
],
"why": "the first and most commonly injured lateral ankle ligament"
},
{
"label": "CFL",
"patterns": [
"calcaneofibular",
"CFL"
],
"why": "the second ligament injured, signifying a more severe sprain"
},
{
"label": "PTFL",
"patterns": [
"posterior talofibular",
"PTFL"
],
"why": "the strongest and least commonly torn, injured only in severe trauma"
},
{
"label": "grading I/II/III",
"patterns": [
"grade",
"grade I",
"grade II",
"grade III"
],
"why": "sprains are graded I (stretch), II (partial), III (complete) to guide management"
},
{
"label": "injury sequence",
"patterns": [
"ATFL.*CFL",
"sequence",
"order"
],
"why": "the predictable order ATFL>CFL>PTFL helps gauge severity"
},
{
"label": "fiber discontinuity",
"patterns": [
"discontinu",
"complete",
"fiber"
],
"why": "frank fiber disruption defines a grade III complete tear"
}
],
"id": 59
},
{
"type": "dictate",
"joint": "ankle",
"topic": "Syndesmotic injury",
"difficulty": 3,
"prompt": "Dictate a high ankle (syndesmotic) injury, including the named ligaments, the diagnostic measurement and its location, and the associated proximal fracture to exclude.",
"model": "There is a high ankle syndesmotic injury with a complete tear of the anterior inferior tibiofibular ligament and partial tear of the posterior inferior tibiofibular ligament, with interosseous membrane edema extending proximally. The tibiofibular clear space measures 8 millimeters on the axial image 1 centimeter above the tibial plafond, exceeding the 6 millimeter upper limit and indicating syndesmotic widening. Given the proximal interosseous involvement, attention to the proximal fibula is warranted to exclude a Maisonneuve fracture.",
"keyterms": [
{
"label": "AITFL",
"patterns": [
"anterior inferior tibiofibular",
"AITFL",
"anteroinferior tibiofibular"
],
"why": "the most commonly injured syndesmotic ligament in high ankle sprains"
},
{
"label": "tibiofibular clear space",
"patterns": [
"clear space",
"tibiofibular clear"
],
"why": "the key measurement; greater than 6 mm indicates syndesmotic widening"
},
{
"label": "6mm threshold",
"patterns": [
"6 ?mm",
"6 millimeter",
"six millimeter"
],
"why": "the upper normal limit for tibiofibular clear space"
},
{
"label": "1cm above plafond",
"patterns": [
"1 ?cm above",
"above.*plafond",
"1 centimeter above"
],
"why": "the standardized level for measuring clear space, 1 cm above the plafond"
},
{
"label": "Maisonneuve",
"patterns": [
"Maisonneuve",
"maisonneuve"
],
"why": "a proximal fibular fracture associated with complete syndesmotic disruption"
},
{
"label": "interosseous membrane",
"patterns": [
"interosseous"
],
"why": "proximal IOM extension indicates a more unstable injury"
},
{
"label": "syndesmosis",
"patterns": [
"syndesmo",
"high ankle"
],
"why": "the distal tibiofibular joint complex defining this injury type"
}
],
"id": 60
},
{
"type": "dictate",
"joint": "ankle",
"topic": "Peroneal split tear",
"difficulty": 2,
"prompt": "Dictate a peroneus brevis split tear, including the characteristic sign and an associated retinaculum finding.",
"model": "At the level of the lateral malleolus the peroneus brevis tendon demonstrates a longitudinal split into two components with a boomerang or C-shaped configuration on axial images, the peroneus longus interposed within the cleft, consistent with a split tear. There is associated peroneal tenosynovitis with sheath fluid. The superior peroneal retinaculum is thickened but intact, with no tendon subluxation anterior to the fibula. A low-lying peroneus brevis muscle belly is noted as a predisposing factor.",
"keyterms": [
{
"label": "peroneus brevis split",
"patterns": [
"brevis",
"split tear",
"split"
],
"why": "the brevis is the tendon that characteristically splits longitudinally"
},
{
"label": "C/boomerang sign",
"patterns": [
"boomerang",
"C[- ]shape",
"C shaped",
"chevron"
],
"why": "the axial morphology of the split brevis wrapping around the longus"
},
{
"label": "superior peroneal retinaculum",
"patterns": [
"superior peroneal retinaculum",
"SPR",
"retinaculum"
],
"why": "the structure that, when torn, allows subluxation predisposing to splits"
},
{
"label": "subluxation",
"patterns": [
"subluxat",
"dislocat"
],
"why": "peroneal tendon subluxation anterior to the fibula is a key associated finding"
},
{
"label": "tenosynovitis",
"patterns": [
"tenosynovitis",
"sheath fluid"
],
"why": "peroneal tendons do have a synovial sheath, so tenosynovitis is the correct term here"
},
{
"label": "peroneus longus",
"patterns": [
"longus"
],
"why": "the longus often becomes interposed within the brevis split"
}
],
"id": 61
},
{
"type": "dictate",
"joint": "ankle",
"topic": "OLT talar dome",
"difficulty": 3,
"prompt": "Dictate an osteochondral lesion of the talar dome, including the localization grid, the typical location/mechanism, and the instability criterion.",
"model": "There is an osteochondral lesion of the talar dome in the medial-posterior quadrant (zone 4 of the 9-zone grid), demonstrating the cup-shaped morphology typical of atraumatic medial lesions. The overlying cartilage shows a fissure and there is high T2 signal undermining the osteochondral fragment with fluid encircling its base, an instability criterion indicating an unstable lesion. There is underlying subchondral cystic change. The lateral talar dome is normal, without the shallow wafer-shaped lateral-central pattern.",
"keyterms": [
{
"label": "9-zone grid",
"patterns": [
"9[- ]zone",
"nine[- ]zone",
"zone \\d",
"grid"
],
"why": "the standardized 3x3 grid for localizing talar dome lesions"
},
{
"label": "medial-posterior",
"patterns": [
"medial[- ]posterior",
"medial.*posterior",
"posteromedial"
],
"why": "the atraumatic, deeper cup-shaped lesions occur medially and posteriorly"
},
{
"label": "lateral-central",
"patterns": [
"lateral[- ]central",
"lateral.*central",
"anterolateral"
],
"why": "traumatic, shallow wafer-shaped lesions occur laterally"
},
{
"label": "fluid undermining",
"patterns": [
"undermin",
"fluid.*around",
"encircl",
"fluid.*base"
],
"why": "T2 fluid signal undermining the fragment is the key instability criterion"
},
{
"label": "instability criteria",
"patterns": [
"unstable",
"instabilit"
],
"why": "fluid rim, cysts, and displacement determine whether the fragment is unstable"
},
{
"label": "cup vs wafer",
"patterns": [
"cup",
"wafer"
],
"why": "medial lesions are cup-shaped/atraumatic, lateral are wafer-shaped/traumatic"
},
{
"label": "subchondral cyst",
"patterns": [
"subchondral cyst",
"cystic"
],
"why": "subchondral cysts beneath the lesion are a sign of chronicity/instability"
}
],
"id": 62
},
{
"type": "dictate",
"joint": "foot",
"topic": "Lisfranc injury",
"difficulty": 3,
"prompt": "Dictate a Lisfranc ligament injury, naming the key ligament, the diastasis you measure, and the characteristic fracture sign.",
"model": "There is disruption of the Lisfranc ligament complex with a complete tear of the interosseous and plantar components extending between the medial cuneiform and the base of the second metatarsal. There is C1-M2 diastasis with widening of the interval and a small bony fleck avulsed from the second metatarsal base, the fleck sign. Disruption of the plantar component portends instability. There is associated marrow edema at the cuneiform and metatarsal bases without overt malalignment on these non-weight-bearing images.",
"keyterms": [
{
"label": "Lisfranc ligament",
"patterns": [
"Lisfranc",
"lisfranc"
],
"why": "the ligament between the medial cuneiform and second metatarsal base"
},
{
"label": "C1-M2 diastasis",
"patterns": [
"C1[- ]M2",
"cuneiform.*metatarsal",
"diastasis",
"first cuneiform"
],
"why": "widening between medial cuneiform and second metatarsal base is the key abnormality"
},
{
"label": "plantar component",
"patterns": [
"plantar component",
"plantar"
],
"why": "plantar ligament involvement is the most important predictor of instability"
},
{
"label": "fleck sign",
"patterns": [
"fleck"
],
"why": "a small avulsion fragment in the Lisfranc interval indicating ligamentous avulsion"
},
{
"label": "interosseous component",
"patterns": [
"interosseous"
],
"why": "one of the three components (dorsal, interosseous, plantar) of the ligament"
},
{
"label": "instability",
"patterns": [
"instabilit",
"unstable",
"malalign"
],
"why": "the clinical concern that drives surgical fixation"
}
],
"id": 63
},
{
"type": "mcq",
"joint": "hip",
"topic": "FAI cam",
"difficulty": 1,
"prompt": "On MRI, what alpha angle value is the commonly accepted threshold above which cam-type femoroacetabular impingement is suggested?",
"choices": [
"Greater than 25 degrees",
"Greater than 40 degrees",
"Greater than 55 degrees",
"Greater than 80 degrees"
],
"answer": 2,
"explain": "An alpha angle greater than 55 degrees indicates loss of the normal femoral head-neck offset and supports cam morphology. 40 degrees is the LCEA pincer threshold; do not confuse the two.",
"id": 64
},
{
"type": "mcq",
"joint": "ankle",
"topic": "Achilles terminology",
"difficulty": 2,
"prompt": "Why is inflammation around the Achilles tendon correctly called paratenonitis rather than tenosynovitis?",
"choices": [
"The Achilles is too superficial to develop a synovial reaction",
"The Achilles tendon has no true synovial sheath and is invested only by a paratenon",
"Tenosynovitis is reserved for flexor tendons of the hand",
"The Achilles never becomes inflamed, only degenerated"
],
"answer": 1,
"explain": "The Achilles lacks a synovial sheath; it is surrounded only by the paratenon. Therefore peritendinous inflammation is paratenonitis (paratendinitis), not tenosynovitis. Tendons with true sheaths (e.g., peroneals, tibialis posterior) can get tenosynovitis.",
"id": 65
},
{
"type": "mcq",
"joint": "ankle",
"topic": "Syndesmosis",
"difficulty": 2,
"prompt": "At a level 1 cm above the tibial plafond, what tibiofibular clear space measurement suggests a syndesmotic injury?",
"choices": [
"Greater than 2 mm",
"Greater than 6 mm",
"Greater than 12 mm",
"Greater than 20 mm"
],
"answer": 1,
"explain": "A tibiofibular clear space greater than 6 mm measured 1 cm above the plafond indicates syndesmotic widening. Always check the proximal fibula for a Maisonneuve fracture when the syndesmosis is disrupted.",
"id": 66
},
{
"type": "mcq",
"joint": "hip",
"topic": "AVN",
"difficulty": 1,
"prompt": "Which MRI finding is considered the most specific sign of femoral head osteonecrosis?",
"choices": [
"Diffuse bone marrow edema",
"The double-line sign",
"A joint effusion",
"Subchondral cystic change"
],
"answer": 1,
"explain": "The double-line sign (peripheral low-signal sclerotic rim with inner high-signal granulation tissue on T2) is the most specific sign of osteonecrosis. The crescent sign indicates a subchondral fracture and impending collapse but is a later finding.",
"id": 67
},
{
"type": "cloze",
"joint": "hip",
"topic": "Gluteal tendons",
"difficulty": 1,
"prompt": "Because they are the major hip abductors that tear at the greater trochanter, the gluteus medius and minimus tendons are often called the ___ of the hip.",
"answers": [
"rotator cuff",
"rotator cuff of the hip"
],
"explain": "The gluteus medius and minimus form the abductor tendon complex at the greater trochanter, analogous to the rotator cuff at the shoulder, and tear in a similar fashion.",
"id": 68
},
{
"type": "cloze",
"joint": "ankle",
"topic": "Lateral ligaments",
"difficulty": 1,
"prompt": "Lateral ankle ligaments are injured in a predictable sequence: the ___ tears first, followed by the calcaneofibular ligament, with the posterior talofibular ligament torn last.",
"answers": [
"anterior talofibular ligament",
"ATFL",
"anterior talofibular"
],
"explain": "The ATFL is the weakest and first to fail in inversion injury; CFL injury indicates a more severe sprain, and PTFL involvement signifies severe trauma.",
"id": 69
},
{
"type": "cloze",
"joint": "foot",
"topic": "Plantar fasciitis",
"difficulty": 1,
"prompt": "On MRI, plantar fasciitis is suggested when the proximal plantar fascia at its calcaneal origin is thickened beyond ___ mm with adjacent edema.",
"answers": [
"4",
"greater than 4"
],
"explain": "Normal plantar fascia is roughly 3 mm thick; thickening greater than 4 mm at the calcaneal origin, often with perifascial and marrow edema, supports plantar fasciitis.",
"id": 70
},
{
"type": "dictate",
"joint": "elbow",
"topic": "UCL",
"difficulty": 3,
"prompt": "Dictate the findings for a partial undersurface (distal) tear of the UCL anterior bundle in an overhead thrower.",
"model": "The anterior bundle of the ulnar collateral ligament demonstrates a partial-thickness undersurface tear at its distal attachment, with abnormal fluid signal tracking distal to the ligament along the medial margin of the sublime tubercle, producing a T-sign. The proximal humeral attachment is intact and the ligament is not completely disrupted. No full-thickness discontinuity. The flexor-pronator origin is intact. Findings are consistent with valgus instability of a throwing athlete.",
"keyterms": [
{
"label": "anterior bundle",
"patterns": [
"anterior bundle",
"anterior band"
],
"why": "the primary valgus stabilizer and functionally important component of the UCL"
},
{
"label": "sublime tubercle",
"patterns": [
"sublime tubercle"
],
"why": "the ulnar attachment site of the anterior bundle where distal tears occur"
},
{
"label": "T-sign",
"patterns": [
"t[- ]?sign"
],
"why": "fluid/contrast tracking distal to the ligament along the sublime tubercle = partial undersurface tear"
},
{
"label": "undersurface/partial",
"patterns": [
"undersurface",
"partial[- ]thickness",
"partial tear"
],
"why": "distinguishes a partial tear from a complete rupture"
},
{
"label": "distal attachment",
"patterns": [
"distal attachment",
"distal",
"sublime"
],
"why": "localizes the tear, which changes surgical planning"
},
{
"label": "valgus instability",
"patterns": [
"valgus"
],
"why": "the clinical consequence of UCL insufficiency in throwers"
},
{
"label": "flexor-pronator",
"patterns": [
"flexor[- ]pronator",
"common flexor"
],
"why": "adjacent structure that should be assessed and reported as intact or torn"
}
],
"id": 71
},
{
"type": "dictate",
"joint": "elbow",
"topic": "UCL complete tear",
"difficulty": 2,
"prompt": "Dictate a complete full-thickness tear of the UCL anterior bundle at its proximal (humeral) origin.",
"model": "There is a complete full-thickness tear of the anterior bundle of the ulnar collateral ligament at its proximal humeral origin from the medial epicondyle, with ligament discontinuity, wavy retracted fibers, and surrounding edema. Fluid fills the gap at the detachment site. The sublime tubercle attachment is intact distally. Findings indicate gross valgus instability; correlate for Tommy John reconstruction.",
"keyterms": [
{
"label": "complete full-thickness tear",
"patterns": [
"complete",
"full[- ]thickness"
],
"why": "distinguishes from a partial undersurface tear and changes management to reconstruction"
},
{
"label": "proximal humeral origin",
"patterns": [
"proximal",
"humeral origin",
"medial epicondyle"
],
"why": "localizes the tear to the humeral attachment"
},
{
"label": "anterior bundle",
"patterns": [
"anterior bundle",
"anterior band"
],
"why": "the key valgus stabilizer of the UCL"
},
{
"label": "discontinuity/retraction",
"patterns": [
"discontinu",
"retract",
"wavy"
],
"why": "morphologic signs of a complete rupture"
},
{
"label": "valgus instability",
"patterns": [
"valgus"
],
"why": "functional result of complete UCL loss"
},
{
"label": "Tommy John/reconstruction",
"patterns": [
"tommy john",
"reconstruct"
],
"why": "the eponymous UCL reconstruction relevant to surgical correlation"
}
],
"id": 72
},
{
"type": "dictate",
"joint": "elbow",
"topic": "valgus extension overload",
"difficulty": 3,
"prompt": "Dictate findings of valgus extension overload syndrome in a pitcher with a posteromedial olecranon osteophyte.",
"model": "There is a posteromedial olecranon osteophyte at the tip of the olecranon with adjacent subchondral marrow edema and chondral irregularity of the posteromedial trochlea, in keeping with valgus extension overload. The anterior bundle of the UCL shows attenuation/thickening consistent with chronic valgus stress. A small intra-articular loose body is noted in the posterior compartment. Findings reflect repetitive valgus and extension forces of throwing.",
"keyterms": [
{
"label": "valgus extension overload",
"patterns": [
"valgus extension overload",
"veo"
],
"why": "the syndrome name describing repetitive throwing impaction injury"
},
{
"label": "posteromedial olecranon osteophyte",
"patterns": [
"posteromedial",
"olecranon osteophyte",
"olecranon spur"
],
"why": "the hallmark kissing osteophyte from posteromedial impaction"
},
{
"label": "posteromedial trochlea",
"patterns": [
"trochlea"
],
"why": "the apposing articular surface that develops chondral injury"
},
{
"label": "loose body",
"patterns": [
"loose bod",
"intra-?articular bod"
],
"why": "a common associated finding requiring removal"
},
{
"label": "UCL attenuation",
"patterns": [
"ucl",
"anterior bundle",
"collateral"
],
"why": "the underlying valgus laxity that drives the impaction"
},
{
"label": "subchondral edema",
"patterns": [
"marrow edema",
"subchondral",
"bone edema"
],
"why": "indicates active stress response at the impaction site"
}
],
"id": 73
},
{
"type": "dictate",
"joint": "elbow",
"topic": "lateral epicondylitis",
"difficulty": 2,
"prompt": "Dictate a high-grade partial tear of the common extensor tendon origin in lateral epicondylitis (tennis elbow).",
"model": "The common extensor tendon origin demonstrates marked tendinosis with thickening, intermediate signal, and a high-grade partial-thickness tear involving approximately 70 percent of the footprint at the lateral epicondyle, predominantly affecting the deep ECRB fibers. There is underlying lateral epicondyle marrow edema. The adjacent lateral ulnar collateral ligament is intact, so no associated posterolateral instability. Findings consistent with chronic lateral epicondylitis (tennis elbow).",
"keyterms": [
{
"label": "common extensor tendon",
"patterns": [
"common extensor"
],
"why": "the lateral origin tendon affected in tennis elbow"
},
{
"label": "ECRB",
"patterns": [
"ecrb",
"extensor carpi radialis brevis"
],
"why": "the deep fibers most commonly involved in lateral epicondylitis"
},
{
"label": "tendinosis",
"patterns": [
"tendinos"
],
"why": "degenerative thickening/signal that defines epicondylitis rather than acute tendinitis"
},
{
"label": "footprint/grade",
"patterns": [
"footprint",
"partial[- ]thickness",
"\\d+ ?percent",
"high[- ]grade"
],
"why": "quantifying tear depth/footprint guides surgical decision-making"
},
{
"label": "lateral epicondyle",
"patterns": [
"lateral epicondyle"
],
"why": "the bony origin site"
},
{
"label": "LUCL intact",
"patterns": [
"lateral ulnar collateral",
"lucl"
],
"why": "must be assessed because deep tears can extend to the LUCL causing PLRI"
}
],
"id": 74
},
{
"type": "dictate",
"joint": "elbow",
"topic": "medial epicondylitis",
"difficulty": 2,
"prompt": "Dictate common flexor tendon tendinosis with a low-grade partial tear in medial epicondylitis (golfer's elbow).",
"model": "The common flexor-pronator tendon origin at the medial epicondyle shows tendinosis with thickening and increased intrasubstance signal and a low-grade partial-thickness interstitial tear involving less than one-third of the footprint. No full-thickness tear or retraction. The underlying anterior bundle of the UCL is intact. The ulnar nerve in the cubital tunnel is normal in caliber and signal. Findings consistent with medial epicondylitis (golfer's elbow).",
"keyterms": [
{
"label": "common flexor-pronator tendon",
"patterns": [
"common flexor",
"flexor[- ]pronator"
],
"why": "the medial origin tendon involved in golfer's elbow"
},
{
"label": "medial epicondyle",
"patterns": [
"medial epicondyle"
],
"why": "the bony origin site for the flexor-pronator mass"
},
{
"label": "tendinosis",
"patterns": [
"tendinos"
],
"why": "degenerative process defining epicondylitis"
},
{
"label": "partial-thickness/footprint",
"patterns": [
"partial[- ]thickness",
"interstitial",
"footprint",
"one[- ]third"
],
"why": "grading depth and footprint of the tear"
},
{
"label": "UCL assessment",
"patterns": [
"ucl",
"anterior bundle",
"collateral"
],
"why": "the UCL lies deep to the common flexor and is commonly co-injured"
},
{
"label": "ulnar nerve",
"patterns": [
"ulnar nerve",
"cubital tunnel"
],
"why": "the adjacent cubital tunnel nerve must be evaluated in medial-sided pain"
}
],
"id": 75
},
{
"type": "dictate",
"joint": "elbow",
"topic": "distal biceps tear",
"difficulty": 3,
"prompt": "Dictate a complete distal biceps tendon tear with retraction; comment on lacertus fibrosus and use FABS positioning.",
"model": "On the FABS (flexion, abduction, supinated) view the distal biceps tendon is completely torn at its insertion on the radial tuberosity, with full-thickness discontinuity and proximal retraction of the tendon stump approximately 4 cm. The lacertus fibrosus is also torn, accounting for the degree of retraction. The bicipitoradial bursa is distended with fluid and surrounding hemorrhage. Findings indicate a complete distal biceps rupture; correlate clinically for surgical repair given retraction.",
"keyterms": [
{
"label": "radial tuberosity",
"patterns": [
"radial tuberosity",
"bicipital tuberosity"
],
"why": "the insertion site of the distal biceps tendon"
},
{
"label": "FABS view",
"patterns": [
"fabs",
"flexion[, ]?abduction[, ]?supinat"
],
"why": "the dedicated positioning that displays the distal biceps tendon along its length"
},
{
"label": "lacertus fibrosus",
"patterns": [
"lacertus"
],
"why": "if intact it limits retraction; if torn the tendon retracts, affecting repair urgency"
},
{
"label": "retraction",
"patterns": [
"retract"
],
"why": "quantifying retraction guides whether primary repair is feasible"
},
{
"label": "complete/full-thickness",
"patterns": [
"complete",
"full[- ]thickness",
"rupture"
],
"why": "distinguishes from a partial tear"
},
{
"label": "bicipitoradial bursa",
"patterns": [
"bicipitoradial bursa",
"cubital bursa"
],
"why": "fluid here is a secondary sign of distal biceps pathology"
}
],
"id": 76
},
{
"type": "dictate",
"joint": "elbow",
"topic": "capitellar OCD",
"difficulty": 3,
"prompt": "Dictate an unstable osteochondritis dissecans of the capitellum, citing instability criteria, and contrast with the pseudodefect.",
"model": "There is an osteochondritis dissecans lesion of the anterolateral capitellum measuring 9 by 7 mm. High T2 signal fluid undermines the osteochondral fragment, the overlying cartilage is disrupted, and a cyst is present beneath the fragment, all indicating an unstable lesion. A displaced intra-articular loose body is identified in the anterior recess. This is distinct from the normal pseudodefect of the capitellum, which is located posterolaterally at the capitellum-lateral epicondyle junction with normal cartilage. The anterolateral location and fragment make this true OCD rather than Panner disease.",
"keyterms": [
{
"label": "osteochondritis dissecans",
"patterns": [
"osteochondritis dissecans",
"ocd"
],
"why": "the diagnosis; a true osteochondral lesion of the adolescent/teen capitellum"
},
{
"label": "capitellum (anterolateral)",
"patterns": [
"capitell",
"anterolateral"
],
"why": "OCD characteristically involves the anterolateral capitellum"
},
{
"label": "fluid undermining",
"patterns": [
"fluid undermin",
"undermin",
"high t2.*fragment",
"cyst"
],
"why": "a key instability criterion predicting a detachable fragment"
},
{
"label": "loose body",
"patterns": [
"loose bod",
"intra-?articular bod"
],
"why": "presence indicates an unstable, displaced fragment"
},
{
"label": "pseudodefect of capitellum",
"patterns": [
"pseudodefect"
],
"why": "normal posterolateral notch not to be mistaken for OCD"
},
{
"label": "Panner disease",
"patterns": [
"panner"
],
"why": "the younger-child self-limited osteochondrosis without a fragment, the key differential"
}
],
"id": 77
},
{
"type": "dictate",
"joint": "elbow",
"topic": "LUCL / PLRI",
"difficulty": 3,
"prompt": "Dictate a tear of the lateral ulnar collateral ligament producing posterolateral rotatory instability.",
"model": "The lateral ulnar collateral ligament is torn at its humeral origin from the lateral epicondyle with discontinuity and surrounding edema, and fails to course normally to the supinator crest of the ulna. The overlying common extensor origin is also abnormal. Findings indicate posterolateral rotatory instability (PLRI). Correlate with the lateral pivot-shift; the radial head may sublux posterolaterally relative to the capitellum.",
"keyterms": [
{
"label": "lateral ulnar collateral ligament",
"patterns": [
"lateral ulnar collateral",
"lucl"
],
"why": "the primary restraint against posterolateral rotatory instability"
},
{
"label": "PLRI",
"patterns": [
"posterolateral rotatory instability",
"plri"
],
"why": "the instability pattern resulting from LUCL insufficiency"
},
{
"label": "supinator crest",
"patterns": [
"supinator crest"
],
"why": "the ulnar attachment site of the LUCL"
},
{
"label": "lateral epicondyle origin",
"patterns": [
"lateral epicondyle",
"humeral origin"
],
"why": "the common site of LUCL avulsion"
},
{
"label": "pivot-shift",
"patterns": [
"pivot[- ]shift"
],
"why": "the clinical test that confirms PLRI"
},
{
"label": "common extensor co-injury",
"patterns": [
"common extensor"
],
"why": "frequently torn together since they share the lateral epicondyle"
}
],
"id": 78
},
{
"type": "dictate",
"joint": "wrist",
"topic": "TFCC traumatic vs degenerative",
"difficulty": 3,
"prompt": "Dictate a traumatic peripheral foveal (Palmer 1B) TFCC tear with DRUJ instability, and contrast the terminology with a degenerative central tear.",
"model": "There is a traumatic peripheral tear of the triangular fibrocartilage complex at the ulnar/foveal attachment, a Palmer class 1B injury, with fluid signal at the fovea and detachment of the deep radioulnar ligament fibers from the ulnar fovea, associated with distal radioulnar joint instability. The radial attachment and the central disc are intact. This is distinct from a degenerative (Palmer class 2) tear, which produces a central perforation of the articular disc, often with positive ulnar variance and ulnar impaction changes (lunate/ulnar head chondromalacia and subchondral cysts). Ulnar variance measures plus 2 mm.",
"keyterms": [
{
"label": "foveal attachment",
"patterns": [
"fove"
],
"why": "the deep ulnar attachment whose disruption causes DRUJ instability"
},
{
"label": "Palmer 1B / traumatic peripheral",
"patterns": [
"1b",
"class 1",
"palmer",
"peripheral",
"traumatic"
],
"why": "the classification term for a traumatic peripheral/ulnar-sided tear"
},
{
"label": "DRUJ instability",
"patterns": [
"distal radioulnar",
"druj",
"instability"
],
"why": "the key clinical consequence distinguishing peripheral foveal tears"
},
{
"label": "degenerative / class 2",
"patterns": [
"degenerat",
"class 2",
"central perforat",
"central tear"
],
"why": "the contrasting non-traumatic central wear pattern"
},
{
"label": "ulnar variance",
"patterns": [
"ulnar variance",
"positive variance"
],
"why": "positive variance drives degenerative central tears and ulnar impaction"
},
{
"label": "ulnar impaction",
"patterns": [
"ulnar impaction",
"impaction"
],
"why": "the degenerative sequela of positive variance affecting lunate/ulna"
},
{
"label": "radioulnar ligaments",
"patterns": [
"radioulnar ligament",
"dorsal radioulnar",
"volar radioulnar"
],
"why": "the deep dorsal/volar fibers at the fovea that stabilize the DRUJ"
}
],
"id": 79
},
{
"type": "dictate",
"joint": "wrist",
"topic": "scapholunate / DISI",
"difficulty": 3,
"prompt": "Dictate a complete tear of the dorsal scapholunate ligament with DISI deformity.",
"model": "There is a complete tear of the dorsal band of the scapholunate interosseous ligament, the most biomechanically important component, with discontinuity and fluid filling the scapholunate interval, which is widened. The scaphoid is flexed (palmar-flexed) and the lunate is dorsally tilted, with a scapholunate angle of approximately 80 degrees, consistent with dorsal intercalated segment instability (DISI). Early findings of scapholunate advanced collapse are noted with radioscaphoid joint narrowing. The lunotriquetral ligament is intact.",
"keyterms": [
{
"label": "dorsal band",
"patterns": [
"dorsal band",
"dorsal scapholunate",
"dorsal component"
],
"why": "the strongest, most important portion of the SL ligament"
},
{
"label": "scapholunate interosseous ligament",
"patterns": [
"scapholunate",
"sl ligament",
"slil"
],
"why": "the named intrinsic ligament being assessed"
},
{
"label": "DISI",
"patterns": [
"disi",
"dorsal intercalated"
],
"why": "the carpal instability pattern produced by SL dissociation"
},
{
"label": "scapholunate angle",
"patterns": [
"scapholunate angle",
"\\d+ ?degrees"
],
"why": "angle >60-70 degrees confirms DISI"
},
{
"label": "SL widening",
"patterns": [
"widen",
"interval",
"terry thomas",
"gap"
],
"why": "the Terry-Thomas sign of SL diastasis"
},
{
"label": "SLAC",
"patterns": [
"slac",
"scapholunate advanced collapse"
],
"why": "the predictable degenerative progression from chronic SL dissociation"
}
],
"id": 80
},
{
"type": "dictate",
"joint": "wrist",
"topic": "scaphoid fracture / AVN",
"difficulty": 3,
"prompt": "Dictate a scaphoid waist fracture with proximal pole avascular necrosis.",
"model": "There is a transverse fracture through the scaphoid waist. The proximal pole demonstrates diffusely decreased T1 signal with loss of normal marrow fat and decreased enhancement, consistent with avascular necrosis, attributable to disruption of the retrograde blood supply from the dorsal carpal branch of the radial artery. There is early fracture nonunion with a sclerotic margin and a small humpback deformity. No DISI as yet. Correlate for vascularized bone grafting.",
"keyterms": [
{
"label": "scaphoid waist",
"patterns": [
"scaphoid waist",
"waist"
],
"why": "the most common fracture site and watershed for vascular supply"
},
{
"label": "proximal pole AVN",
"patterns": [
"proximal pole",
"avascular necrosis",
"avn",
"osteonecrosis"
],
"why": "the proximal pole is at risk because of the retrograde supply"
},
{
"label": "retrograde blood supply",
"patterns": [
"retrograde",
"dorsal carpal branch",
"radial artery"
],
"why": "the anatomy explaining why proximal fractures undergo AVN"
},
{
"label": "T1 loss/enhancement",
"patterns": [
"t1",
"decreased enhancement",
"loss of.*fat",
"marrow"
],
"why": "low T1 and non-enhancement are MRI signs of nonviable proximal pole"
},
{
"label": "nonunion",
"patterns": [
"nonunion",
"non[- ]union",
"sclerotic"
],
"why": "a complication that follows missed/unstable scaphoid fractures"
},
{
"label": "humpback deformity",
"patterns": [
"humpback"
],
"why": "the flexion deformity of scaphoid nonunion affecting alignment"
}
],
"id": 81
},
{
"type": "dictate",
"joint": "wrist",
"topic": "Kienbock",
"difficulty": 2,
"prompt": "Dictate Kienbock disease (lunate AVN) with negative ulnar variance.",
"model": "The lunate demonstrates diffusely decreased T1 signal involving the entire bone with patchy T2 signal, consistent with avascular necrosis of the lunate (Kienbock disease). There is negative ulnar variance of approximately 2 mm. There is early loss of lunate height with subtle subchondral collapse but preserved carpal height (Lichtman stage II-IIIA). No fragmentation. Correlate clinically.",
"keyterms": [
{
"label": "lunate AVN / Kienbock",
"patterns": [
"kienbock",
"lunate.*avascular",
"lunate.*necrosis"
],
"why": "the eponym for lunate osteonecrosis"
},
{
"label": "negative ulnar variance",
"patterns": [
"negative ulnar variance",
"negative variance"
],
"why": "the classic predisposing morphology in Kienbock"
},
{
"label": "decreased T1 signal",
"patterns": [
"decreased t1",
"low t1",
"t1 signal"
],
"why": "the earliest and most sensitive MRI sign of lunate AVN"
},
{
"label": "lunate collapse",
"patterns": [
"collapse",
"loss of.*height",
"fragmentation"
],
"why": "staging depends on lunate collapse and carpal height"
},
{
"label": "Lichtman staging",
"patterns": [
"lichtman",
"stage"
],
"why": "the staging system guiding treatment of Kienbock"
}
],
"id": 82
},
{
"type": "dictate",
"joint": "wrist",
"topic": "ECU subluxation",
"difficulty": 2,
"prompt": "Dictate an extensor carpi ulnaris subsheath tear with tendon subluxation.",
"model": "There is a tear of the extensor carpi ulnaris subsheath at the ulnar groove, with the ECU tendon subluxed/dislocated medially out of the ulnar groove on the axial images. The tendon itself shows mild tendinosis with intrasubstance signal but no full-thickness split. Findings indicate ECU instability; dynamic correlation with supination/ulnar deviation is recommended. The TFCC is intact.",
"keyterms": [
{
"label": "ECU subsheath",
"patterns": [
"subsheath",
"ecu sheath",
"fibro[- ]osseous"
],
"why": "the dedicated retinaculum whose tear allows ECU subluxation"
},
{
"label": "ulnar groove",
"patterns": [
"ulnar groove",
"groove"
],
"why": "the bony groove the ECU normally sits within"
},
{
"label": "subluxation/dislocation",
"patterns": [
"sublux",
"disloc"
],
"why": "the dynamic instability that is the key finding"
},
{
"label": "ECU tendinosis",
"patterns": [
"tendinos",
"intrasubstance"
],
"why": "commonly coexists and can progress to a split tear"
},
{
"label": "supination provocation",
"patterns": [
"supinat",
"dynamic",
"ulnar deviation"
],
"why": "ECU subluxes in supination/ulnar deviation, so dynamic imaging helps"
}
],
"id": 83
},
{
"type": "dictate",
"joint": "wrist",
"topic": "de Quervain",
"difficulty": 1,
"prompt": "Dictate de Quervain tenosynovitis of the first extensor compartment.",
"model": "The first extensor compartment tendons, the abductor pollicis longus and extensor pollicis brevis, demonstrate tenosynovitis with peritendinous fluid and edema and thickening of the overlying extensor retinaculum at the radial styloid, consistent with de Quervain tenosynovitis. There is an intracompartmental septum separating the APL and EPB subcompartments. Adjacent radial styloid periosteal edema is present.",
"keyterms": [
{
"label": "first extensor compartment",
"patterns": [
"first.*compartment",
"1st.*compartment",
"first dorsal"
],
"why": "the location that defines de Quervain"
},
{
"label": "abductor pollicis longus",
"patterns": [
"abductor pollicis longus",
"apl"
],
"why": "one of the two tendons of the first compartment"
},
{
"label": "extensor pollicis brevis",
"patterns": [
"extensor pollicis brevis",
"epb"
],
"why": "the second first-compartment tendon, may have its own subcompartment"
},
{
"label": "tenosynovitis",
"patterns": [
"tenosynovitis",
"peritendinous"
],
"why": "the inflammatory process being described"
},
{
"label": "intracompartmental septum",
"patterns": [
"septum",
"subcompartment"
],
"why": "a septum predicts treatment failure if missed at injection"
},
{
"label": "radial styloid",
"patterns": [
"radial styloid"
],
"why": "the bony landmark of the first compartment"
}
],
"id": 84
},
{
"type": "dictate",
"joint": "wrist",
"topic": "carpal tunnel",
"difficulty": 2,
"prompt": "Dictate MRI findings of carpal tunnel syndrome with median nerve abnormality.",
"model": "The median nerve is enlarged and edematous at the level of the pisiform with increased T2 signal, and is flattened distally at the level of the hook of hamate, with a flattening ratio greater than 3 to 1. There is volar bowing of the flexor retinaculum. Mild tenosynovitis of the flexor tendons is present within the carpal tunnel. Findings are consistent with carpal tunnel syndrome (median neuropathy).",
"keyterms": [
{
"label": "median nerve",
"patterns": [
"median nerve"
],
"why": "the compressed nerve in carpal tunnel syndrome"
},
{
"label": "nerve flattening",
"patterns": [
"flatten",
"flattening ratio"
],
"why": "distal flattening of the median nerve at the hamate is a key sign"
},
{
"label": "retinacular bowing",
"patterns": [
"bowing",
"volar bow",
"retinacul"
],
"why": "volar bowing of the flexor retinaculum indicates raised tunnel pressure"
},
{
"label": "T2 hyperintensity/swelling",
"patterns": [
"t2 signal",
"edematous",
"enlarged",
"swelling"
],
"why": "proximal nerve swelling and signal change reflect entrapment neuropathy"
},
{
"label": "pisiform/hamate levels",
"patterns": [
"pisiform",
"hamate"
],
"why": "the standard proximal swelling/distal flattening reference levels"
}
],
"id": 85
},
{
"type": "dictate",
"joint": "hand",
"topic": "thumb UCL / Stener",
"difficulty": 3,
"prompt": "Dictate a complete thumb UCL tear at the MCP joint with a Stener lesion (skier's thumb).",
"model": "There is a complete full-thickness tear of the ulnar collateral ligament of the thumb at the metacarpophalangeal joint, avulsed from its distal phalangeal-base attachment. The torn ligament is retracted and displaced superficial and proximal to the adductor aponeurosis, producing a Stener lesion with the characteristic yo-yo on a string appearance. Because the interposed aponeurosis prevents healing, surgical repair is required. Findings consistent with skier's (gamekeeper's) thumb.",
"keyterms": [
{
"label": "thumb UCL",
"patterns": [
"ulnar collateral",
"ucl"
],
"why": "the ligament torn in skier's/gamekeeper's thumb at the thumb MCP"
},
{
"label": "Stener lesion",
"patterns": [
"stener"
],
"why": "interposition of the aponeurosis that mandates surgery"
},
{
"label": "adductor aponeurosis",
"patterns": [
"adductor aponeurosis",
"aponeurosis"
],
"why": "the structure that displaces over the torn ligament forming the Stener lesion"
},
{
"label": "MCP joint",
"patterns": [
"metacarpophalangeal",
"mcp",
"mp joint"
],
"why": "the joint where the thumb UCL tear occurs"
},
{
"label": "retracted/displaced",
"patterns": [
"retract",
"displaced",
"superficial"
],
"why": "proximal-superficial displacement defines the Stener configuration"
},
{
"label": "skier's/gamekeeper's thumb",
"patterns": [
"skier",
"gamekeeper"
],
"why": "the clinical eponyms for the injury mechanism"
}
],
"id": 86
},
{
"type": "dictate",
"joint": "hand",
"topic": "flexor pulley / bowstringing",
"difficulty": 3,
"prompt": "Dictate an A2 pulley rupture with bowstringing in a rock climber.",
"model": "There is a full-thickness rupture of the A2 pulley at the base of the proximal phalanx, with bowstringing of the flexor tendons demonstrated by an increased tendon-to-bone distance of approximately 3 mm during flexion. The flexor digitorum profundus and superficialis tendons are intact but volarly displaced away from the phalanx. Edema surrounds the pulley remnants. Findings consistent with a climber's pulley injury.",
"keyterms": [
{
"label": "A2 pulley",
"patterns": [
"a2 pulley",
"a2",
"a4 pulley",
"a4"
],
"why": "the A2 (and A4) pulleys are the most biomechanically critical annular pulleys"
},
{
"label": "bowstringing",
"patterns": [
"bowstring"
],
"why": "volar tendon displacement is the diagnostic sign of pulley rupture"
},
{
"label": "tendon-bone distance",
"patterns": [
"tendon[- ]to[- ]bone",
"tendon[- ]bone distance",
"\\d+ ?mm"
],
"why": "the measured separation that quantifies bowstringing"
},
{
"label": "flexor tendons FDP/FDS",
"patterns": [
"flexor digitorum profundus",
"fdp",
"superficialis",
"fds"
],
"why": "the tendons held against bone by the pulleys"
},
{
"label": "proximal phalanx",
"patterns": [
"proximal phalanx",
"base of.*phalanx"
],
"why": "the A2 pulley origin location"
},
{
"label": "climber's injury",
"patterns": [
"climb"
],
"why": "the classic mechanism of crimp-grip pulley rupture"
}
],
"id": 87
},
{
"type": "dictate",
"joint": "hand",
"topic": "FDP avulsion / jersey finger",
"difficulty": 3,
"prompt": "Dictate a flexor digitorum profundus avulsion (jersey finger), commenting on Leddy classification.",
"model": "There is avulsion of the flexor digitorum profundus tendon from its insertion at the volar base of the distal phalanx of the ring finger, consistent with a jersey finger. The retracted tendon stump lies at the level of the proximal interphalangeal joint, retained by the vincula, with no associated bony fragment, in keeping with a Leddy and Packer type II injury. There is fluid and hemorrhage along the flexor sheath. Surgical correlation is advised given the degree of retraction.",
"keyterms": [
{
"label": "FDP avulsion",
"patterns": [
"flexor digitorum profundus",
"fdp"
],
"why": "the avulsed tendon in jersey finger"
},
{
"label": "jersey finger",
"patterns": [
"jersey finger"
],
"why": "the eponym for FDP avulsion, classically the ring finger"
},
{
"label": "distal phalanx base",
"patterns": [
"distal phalanx",
"volar base"
],
"why": "the FDP insertion site that is avulsed"
},
{
"label": "Leddy classification",
"patterns": [
"leddy",
"packer",
"type ii",
"type 2",
"type i",
"type iii"
],
"why": "the classification graded by level of retraction and presence of a fragment"
},
{
"label": "vincula",
"patterns": [
"vincul"
],
"why": "determine how far the tendon retracts and surgical urgency"
},
{
"label": "retraction level",
"patterns": [
"retract",
"proximal interphalangeal",
"pip",
"palm"
],
"why": "retraction level dictates classification and repair timing"
}
],
"id": 88
},
{
"type": "dictate",
"joint": "hand",
"topic": "central slip / boutonniere",
"difficulty": 2,
"prompt": "Dictate a central slip rupture at the PIP joint producing a boutonniere mechanism.",
"model": "There is a full-thickness tear of the central slip of the extensor mechanism at its insertion on the dorsal base of the middle phalanx, with fluid filling the gap and adjacent soft-tissue edema. The lateral bands are intact but at risk of volar subluxation, which would produce a boutonniere deformity. The terminal tendon is intact. Findings consistent with a central slip injury.",
"keyterms": [
{
"label": "central slip",
"patterns": [
"central slip"
],
"why": "the extensor component whose rupture causes boutonniere"
},
{
"label": "middle phalanx base",
"patterns": [
"middle phalanx",
"dorsal base"
],
"why": "the central slip insertion site"
},
{
"label": "boutonniere",
"patterns": [
"boutonniere"
],
"why": "the resultant deformity from central slip loss and lateral band subluxation"
},
{
"label": "lateral bands",
"patterns": [
"lateral band"
],
"why": "their volar subluxation produces the boutonniere posture"
},
{
"label": "PIP joint",
"patterns": [
"proximal interphalangeal",
"pip"
],
"why": "the joint where the central slip injury occurs"
}
],
"id": 89
},
{
"type": "mcq",
"joint": "elbow",
"topic": "PIN / arcade of Frohse",
"difficulty": 2,
"prompt": "A patient has a posterior interosseous nerve neuropathy without sensory loss. At which anatomic structure is the nerve most commonly entrapped?",
"choices": [
"Cubital tunnel retinaculum",
"Arcade of Frohse at the proximal supinator",
"Lacertus fibrosus",
"Guyon canal"
],
"answer": 1,
"explain": "The posterior interosseous nerve (deep motor branch of the radial nerve) is most commonly compressed at the arcade of Frohse, the fibrous proximal edge of the supinator muscle. Because the PIN is purely motor, there is no sensory loss. The cubital tunnel relates to the ulnar nerve, and Guyon canal also involves the ulnar nerve at the wrist.",
"id": 90
},
{
"type": "mcq",
"joint": "elbow",
"topic": "pseudodefect of capitellum",
"difficulty": 2,
"prompt": "On sagittal elbow MRI, an apparent notch at the posterolateral capitellum with normal overlying cartilage most likely represents:",
"choices": [
"Osteochondritis dissecans",
"Pseudodefect of the capitellum",
"Panner disease",
"Occult fracture"
],
"answer": 1,
"explain": "The pseudodefect of the capitellum is a normal groove at the junction of the posterolateral capitellum and lateral epicondyle, seen on posterior sagittal images. It has intact, normal cartilage and should not be mistaken for OCD, which involves the anterolateral capitellum with a fragment and/or fluid undermining.",
"id": 91
},
{
"type": "mcq",
"joint": "wrist",
"topic": "lunotriquetral / VISI",
"difficulty": 2,
"prompt": "A tear of the lunotriquetral interosseous ligament classically produces which carpal malalignment?",
"choices": [
"DISI (dorsal intercalated segment instability)",
"VISI (volar intercalated segment instability)",
"Ulnar translocation",
"Axial instability"
],
"answer": 1,
"explain": "Lunotriquetral ligament tears allow the lunate to follow the scaphoid into flexion, producing VISI (volar/palmar intercalated segment instability), where the lunate is volarly tilted. By contrast, scapholunate ligament tears produce DISI, where the lunate tilts dorsally.",
"id": 92
},
{
"type": "mcq",
"joint": "wrist",
"topic": "Guyon canal",
"difficulty": 1,
"prompt": "Compression of which nerve occurs in Guyon canal syndrome at the wrist?",
"choices": [
"Median nerve",
"Ulnar nerve",
"Posterior interosseous nerve",
"Anterior interosseous nerve"
],
"answer": 1,
"explain": "Guyon canal (the ulnar tunnel, bounded by the pisiform and hook of hamate) transmits the ulnar nerve and artery. Compression here, often from a hook of hamate fracture, ganglion, or repetitive trauma, causes ulnar neuropathy, distinct from carpal tunnel syndrome which involves the median nerve.",
"id": 93
},
{
"type": "cloze",
"joint": "hand",
"topic": "mallet finger",
"difficulty": 1,
"prompt": "Avulsion or rupture of the ___ tendon at the dorsal base of the distal phalanx produces a mallet finger.",
"answers": [
"terminal",
"terminal extensor"
],
"explain": "The terminal extensor tendon inserts on the dorsal base of the distal phalanx. Its disruption (bony or tendinous) causes loss of DIP extension, the mallet finger deformity. This contrasts with central slip injury at the PIP, which causes boutonniere.",
"id": 94
},
{
"type": "cloze",
"joint": "hand",
"topic": "sagittal band / boxer's knuckle",
"difficulty": 2,
"prompt": "Tear of the ___ band over the MCP joint allows ulnar subluxation of the extensor tendon, an injury known as boxer's knuckle.",
"answers": [
"sagittal"
],
"explain": "The sagittal bands centralize the extensor digitorum tendon over the metacarpal head. A radial sagittal band tear (classically the long finger) allows ulnar subluxation of the extensor tendon into the intermetacarpal groove, the boxer's knuckle injury.",
"id": 95
},
{
"type": "cloze",
"joint": "wrist",
"topic": "SLAC vs SNAC",
"difficulty": 2,
"prompt": "Untreated scaphoid nonunion progresses to a predictable degenerative pattern called ___ wrist, the fracture-based analogue of SLAC.",
"answers": [
"SNAC",
"scaphoid nonunion advanced collapse"
],
"explain": "SNAC (scaphoid nonunion advanced collapse) follows chronic scaphoid nonunion, whereas SLAC (scapholunate advanced collapse) follows chronic scapholunate ligament dissociation. Both progress in a predictable radioscaphoid-to-capitolunate sequence of arthrosis.",
"id": 96
},
{
"type": "dictate",
"joint": "general",
"topic": "Tendon lexicon",
"difficulty": 2,
"prompt": "How do you describe (and distinguish) tendinosis from a tendon tear using MRI signal terminology?",
"model": "Tendinosis is intrasubstance intermediate signal on T1 and proton-density that does NOT become fluid-bright on fluid-sensitive T2 fat-saturated sequences, typically accompanied by fusiform thickening of the tendon and loss of the normal uniformly low (dark) signal. A tear, by contrast, shows fluid-bright signal - a fluid-signal cleft, gap, or fiber discontinuity that follows fluid on T2. So the discriminator is the T2 signal: intermediate and non-fluid means degeneration (tendinosis), whereas a focal fluid-bright defect means a tear. I always specify whether the abnormality is intrasubstance, partial-thickness, or full-thickness, and describe the caliber change.",
"keyterms": [
{
"label": "intermediate signal / not fluid-bright",
"patterns": [
"intermediate",
"not fluid[- ]bright",
"non[- ]fluid",
"does not become fluid",
"without fluid"
],
"why": "tendinosis = intermediate intrasubstance signal that does NOT match fluid on T2"
},
{
"label": "T2 / fluid-sensitive",
"patterns": [
"t2",
"fluid[- ]sensitive",
"proton[- ]?density",
"\\bpd\\b",
"fat[- ]sat"
],
"why": "the discriminating sequence is fluid-sensitive (T2/PD FS); fluid-bright defines a tear"
},
{
"label": "fusiform thickening",
"patterns": [
"thicken",
"fusiform",
"caliber",
"enlarge"
],
"why": "tendinosis enlarges/thickens the tendon; always describe caliber"
},
{
"label": "fluid-bright cleft = tear",
"patterns": [
"fluid[- ]bright",
"fluid[- ]signal",
"fluid cleft",
"gap",
"discontinu"
],
"why": "a fluid-bright cleft/gap or fiber discontinuity on T2 indicates a tear"
},
{
"label": "loss of normal low signal",
"patterns": [
"loss of (the )?normal",
"normally (low|dark)",
"low signal",
"dark"
],
"why": "normal tendon is uniformly low signal; degeneration disrupts this"
},
{
"label": "partial vs full thickness",
"patterns": [
"partial[- ]thickness",
"full[- ]thickness",
"intrasubstance"
],
"why": "experts always categorize tear depth, not just presence"
}
],
"id": 97
},
{
"type": "dictate",
"joint": "general",
"topic": "Partial-thickness tear measurement",
"difficulty": 3,
"prompt": "How would you describe a high-grade partial-thickness articular-sided tear of a tendon, including measurements (any tendon)?",
"model": "I would dictate: there is a high-grade partial-thickness tear involving the articular surface of the tendon, with fluid-bright signal undermining the articular-sided fibers. I quantify it two ways: as a percentage of the tendon thickness involved - for example, fluid-signal defect involving the deep approximately 70% of the tendon thickness, consistent with high-grade - and in absolute terms, measuring the defect in the AP (anteroposterior) and craniocaudal/mediolateral dimensions in millimeters, e.g., the defect measures 8 mm craniocaudal by 4 mm AP. I specify the side involved - articular (deep, joint side), bursal (superficial), or interstitial (intrasubstance) - and note the intact remaining fibers and any tendon retraction. High-grade means greater than ~50% of thickness; calling it high-grade signals it is near full-thickness.",
"keyterms": [
{
"label": "articular-sided (deep/joint side)",
"patterns": [
"articular[- ]sided",
"articular surface",
"deep",
"joint[- ]side"
],
"why": "specify which surface: articular = deep/joint side"
},
{
"label": "bursal vs interstitial sides",
"patterns": [
"bursal",
"interstitial",
"intrasubstance",
"superficial"
],
"why": "the three partial-tear locations: articular, bursal, interstitial"
},
{
"label": "% of tendon thickness",
"patterns": [
"\\d{1,3}\\s*%",
"percent",
"thickness",
"high[- ]grade",
">\\s*50"
],
"why": "quantify partial tears as a percentage of tendon thickness; >50% = high-grade"
},
{
"label": "measurements in mm (2-3 dimensions)",
"patterns": [
"\\d+\\s*mm",
"millimet",
"\\bap\\b",
"craniocaudal",
"mediolateral",
"dimension"
],
"why": "always give absolute size in mm in AP and craniocaudal/ML planes"
},
{
"label": "fluid-bright defect",
"patterns": [
"fluid[- ]bright",
"fluid[- ]signal",
"fluid undermin",
"fluid defect"
],
"why": "the tear is defined by fluid-signal involvement on T2"
},
{
"label": "intact remaining fibers",
"patterns": [
"intact",
"remaining fib",
"residual",
"preserved"
],
"why": "describe how much tendon is preserved to gauge severity"
},
{
"label": "retraction",
"patterns": [
"retract",
"stump",
"gap"
],
"why": "note retraction if present - affects surgical planning"
}
],
"id": 98
},
{
"type": "dictate",
"joint": "general",
"topic": "Sheath terminology - tenosynovitis vs paratenonitis",
"difficulty": 3,
"prompt": "Explain the difference between tenosynovitis and paratenonitis, and when to use each term.",
"model": "The distinction depends on the tendon's anatomy. Tendons that run through a true synovial-lined tendon sheath - such as the flexor and extensor tendons of the hand and foot, the tibialis posterior, the peroneals, and the long head of biceps - can develop tenosynovitis, which is fluid and/or synovial thickening WITHIN the tendon sheath, seen as a fluid-bright halo surrounding the tendon on axial T2. Tendons that do NOT have a synovial sheath but instead are invested by a paratenon - classically the Achilles and the patellar tendon - cannot have tenosynovitis; instead they develop paratenonitis (also called peritendinitis), which is edema and inflammation in the paratenon and peritendinous fat surrounding the tendon, without a discrete fluid-filled sheath. So I use tenosynovitis only for sheathed tendons and paratenonitis/peritendinitis for the Achilles and patellar tendons. A small physiologic amount of sheath fluid can be normal, especially around the ankle tendons, so I judge it as abnormal when circumferential or disproportionate.",
"keyterms": [
{
"label": "synovial sheath = tenosynovitis",
"patterns": [
"sheath",
"synovial",
"tenosynovitis"
],
"why": "tenosynovitis requires a true synovial tendon sheath"
},
{
"label": "sheathed tendon examples",
"patterns": [
"tibialis posterior",
"perone",
"flexor",
"extensor",
"long head of (the )?biceps",
"biceps"
],
"why": "these run in sheaths and can get tenosynovitis"
},
{
"label": "paratenon = paratenonitis",
"patterns": [
"paratenon",
"paratenonitis",
"peritendinitis",
"peritendinous"
],
"why": "paratenon-invested tendons get paratenonitis, not tenosynovitis"
},
{
"label": "Achilles & patellar = no sheath",
"patterns": [
"achilles",
"patellar tendon"
],
"why": "the classic paratenon-only tendons lacking a synovial sheath"
},
{
"label": "fluid-bright halo in sheath",
"patterns": [
"halo",
"circumferential",
"surround",
"fluid (in|within) (the )?sheath"
],
"why": "tenosynovitis = fluid/synovium within and around the sheath on T2"
},
{
"label": "physiologic sheath fluid pitfall",
"patterns": [
"physiologic",
"small amount",
"normal",
"trace"
],
"why": "a little ankle sheath fluid can be normal; judge by amount/circumferentiality"
}
],
"id": 99
},
{
"type": "dictate",
"joint": "general",
"topic": "Tendinopathy umbrella term",
"difficulty": 1,
"prompt": "What does the term 'tendinopathy' encompass, and how does it relate to tendinosis and tendinitis?",
"model": "Tendinopathy is the broad umbrella clinical term for any disorder of a tendon. It is deliberately nonspecific because imaging and histology usually show degeneration rather than true inflammation. Tendinosis refers specifically to the degenerative changes - mucoid/myxoid degeneration, intermediate intrasubstance signal, and thickening - without active inflammatory cells. Tendinitis (or tendonitis) implies an inflammatory process, which is histologically uncommon in chronic overuse tendons, so many radiologists avoid it and prefer tendinosis or the umbrella tendinopathy. On MRI I describe what I see - intermediate signal and thickening = tendinosis - and reserve tendinopathy as the inclusive descriptor when I do not want to imply a specific mechanism.",
"keyterms": [
{
"label": "umbrella/nonspecific term",
"patterns": [
"umbrella",
"broad",
"nonspecific",
"inclusive",
"any disorder"
],
"why": "tendinopathy is the general term for any tendon disorder"
},
{
"label": "tendinosis = degeneration",
"patterns": [
"tendinosis",
"degener",
"mucoid",
"myxoid"
],
"why": "tendinosis specifies degenerative, non-inflammatory change"
},
{
"label": "tendinitis implies inflammation (often avoided)",
"patterns": [
"tendinitis",
"tendonitis",
"inflammat"
],
"why": "tendinitis implies inflammation, histologically uncommon, often avoided"
},
{
"label": "intermediate signal + thickening",
"patterns": [
"intermediate",
"thicken",
"signal"
],
"why": "the MRI hallmark of tendinosis described under tendinopathy"
},
{
"label": "describe what you see",
"patterns": [
"describe what",
"what (i|you) see",
"imaging finding"
],
"why": "prefer describing the finding over implying a mechanism"
}
],
"id": 100
},
{
"type": "dictate",
"joint": "general",
"topic": "Fluid-sensitive sequences",
"difficulty": 2,
"prompt": "Compare T1, T2/PD fat-saturated, and STIR sequences - what does each show and when do you rely on each in MSK MRI?",
"model": "T1 is my anatomy and marrow sequence: fat is bright, fluid is dark, and it best shows normal fatty marrow, fat planes, and marrow replacement - low T1 signal replacing the normal bright fatty marrow is the key sign of an infiltrative or marrow-replacing process like tumor or infection. T2 or proton-density with fat saturation is my pathology-detection sequence: fat is suppressed (dark) so that fluid and edema become conspicuously bright - fluid-bright - which is how I detect joint effusion, edema-like marrow signal, tears, and soft-tissue edema. STIR is an alternative fat-suppression technique that is more uniform and reliable on inhomogeneous fields or large fields of view; it suppresses fat by its short inversion time and is very sensitive to edema, but has lower signal-to-noise. So in practice: T1 for anatomy and marrow replacement, fluid-sensitive fat-sat T2/PD for edema and fluid, and STIR when fat-sat fails or I need maximal edema sensitivity.",
"keyterms": [
{
"label": "T1 = anatomy/marrow, fat bright",
"patterns": [
"t1",
"fat (is )?bright",
"anatomy",
"marrow"
],
"why": "T1: fat bright, fluid dark; best for anatomy and marrow"
},
{
"label": "marrow replacement = low T1",
"patterns": [
"marrow[- ]?replac",
"low t1",
"replaces? (the )?(normal )?fat",
"infiltrat"
],
"why": "loss of bright fatty T1 marrow signals tumor/infection"
},
{
"label": "fluid-sensitive fat-sat T2/PD",
"patterns": [
"t2",
"proton[- ]?density",
"\\bpd\\b",
"fat[- ]sat",
"fluid[- ]sensitive"
],
"why": "fat-suppressed T2/PD makes fluid/edema bright for detection"
},
{
"label": "fluid-bright / edema conspicuous",
"patterns": [
"fluid[- ]bright",
"edema",
"conspicu",
"bright"
],
"why": "on fat-sat T2, fluid and edema are bright and conspicuous"
},
{
"label": "STIR = robust fat suppression",
"patterns": [
"stir",
"inversion",
"uniform",
"robust",
"inhomogene"
],
"why": "STIR gives uniform fat suppression, useful when fat-sat fails"
},
{
"label": "STIR lower SNR",
"patterns": [
"lower (signal|snr)",
"signal[- ]to[- ]noise",
"less signal"
],
"why": "STIR trades signal-to-noise for fat-suppression reliability"
}
],
"id": 101
},
{
"type": "dictate",
"joint": "general",
"topic": "Marrow edema terminology",
"difficulty": 2,
"prompt": "How do you describe and what do you call abnormal marrow signal, and why is 'edema-like signal' the preferred phrase?",
"model": "Abnormal marrow shows low signal on T1 and high signal on fluid-sensitive sequences (T2 fat-sat or STIR). I describe it as edema-like marrow signal rather than simply 'marrow edema,' because the same imaging appearance is produced by many things - true edema, hyperemia, microtrabecular injury, inflammation, or neoplasm - and the term 'edema-like signal' acknowledges that the signal is nonspecific and does not commit to a single histology. The key discriminator from a marrow-replacing process is the T1: edema-like signal usually preserves some fatty marrow and is not as confluently dark on T1 as tumor, whereas marrow-replacing lesions show confluent low T1 that replaces the normal fat. I localize it (subchondral, metaphyseal), and look for an associated fracture line or cortical abnormality.",
"keyterms": [
{
"label": "low T1 / high fluid-sensitive",
"patterns": [
"low (on )?t1",
"high (on )?(t2|fluid|stir)",
"fluid[- ]sensitive",
"bright on (t2|stir)"
],
"why": "marrow edema = low T1, high T2/STIR signal"
},
{
"label": "'edema-like signal' preferred term",
"patterns": [
"edema[- ]like",
"oedema[- ]like",
"bone marrow edema[- ]like"
],
"why": "'edema-like signal' acknowledges the appearance is nonspecific"
},
{
"label": "nonspecific etiology",
"patterns": [
"nonspecific",
"many (causes|things)",
"hyperemia",
"microtrabecular",
"does not commit"
],
"why": "the signal has many causes; the term avoids implying one"
},
{
"label": "T1 distinguishes from marrow replacement",
"patterns": [
"marrow[- ]?replac",
"confluent",
"preserves? (some )?fat",
"t1"
],
"why": "replacement = confluent low T1; edema preserves some fat"
},
{
"label": "localize: subchondral/metaphyseal",
"patterns": [
"subchondral",
"metaphys",
"localiz",
"distribution"
],
"why": "location guides the differential"
},
{
"label": "look for fracture line",
"patterns": [
"fracture line",
"cortical",
"associated"
],
"why": "a fracture line within edema changes the diagnosis"
}
],
"id": 102
},
{
"type": "dictate",
"joint": "general",
"topic": "Bone injury spectrum",
"difficulty": 3,
"prompt": "Distinguish bone contusion, stress reaction, stress fracture, insufficiency fracture, and complete fracture on MRI.",
"model": "These form a spectrum and the key discriminators are the presence/absence of a fracture line and the underlying bone quality. A bone contusion (bone bruise) is reticulated edema-like marrow signal - low T1, high T2 fat-sat - from microtrabecular injury after impaction, with NO discrete fracture line and intact cortex. A stress reaction is periosteal and marrow edema from repetitive loading of normal bone, again WITHOUT a visible fracture line - it is the precursor on the continuum. A stress fracture is the next step: marrow edema PLUS a discrete low-signal fracture line; when this occurs in normal bone under abnormal/repetitive load it is a fatigue fracture, and when it occurs in abnormal (weakened/osteoporotic) bone under normal load it is an insufficiency fracture. A complete fracture is a fracture line traversing the entire bone, often with cortical disruption and possible displacement. So I always state: is there a fracture line, does it involve the cortex, and is the bone normal (fatigue) or weakened (insufficiency)?",
"keyterms": [
{
"label": "contusion = reticulated edema, no line",
"patterns": [
"contusion",
"bone bruise",
"reticulat",
"microtrabecular",
"no (discrete )?fracture line"
],
"why": "bruise = marrow edema from microtrabecular injury, no fracture line"
},
{
"label": "stress reaction = edema, no line",
"patterns": [
"stress reaction",
"periosteal",
"without (a )?(visible )?(fracture )?line",
"precursor"
],
"why": "stress reaction = edema from repetitive load, no fracture line yet"
},
{
"label": "stress fracture = edema + fracture line",
"patterns": [
"stress fracture",
"fracture line",
"low[- ]signal line"
],
"why": "stress fracture adds a discrete low-signal fracture line"
},
{
"label": "fatigue vs insufficiency",
"patterns": [
"fatigue fracture",
"insufficiency",
"abnormal load",
"weakened",
"osteoporotic",
"normal bone"
],
"why": "fatigue = normal bone/abnormal load; insufficiency = weak bone/normal load"
},
{
"label": "complete fracture = full traverse + cortex",
"patterns": [
"complete fracture",
"through(-| )out",
"entire",
"cortical disrupt",
"displac"
],
"why": "complete fracture traverses the bone with cortical break"
},
{
"label": "state fracture line presence",
"patterns": [
"fracture line",
"cortex",
"cortical"
],
"why": "the discriminator across the spectrum is the fracture line and cortex"
}
],
"id": 103
},
{
"type": "dictate",
"joint": "general",
"topic": "Cartilage lexicon",
"difficulty": 3,
"prompt": "Describe the vocabulary for chondral injury - fissuring, fibrillation, delamination, and full-thickness defect - and how depth is conveyed.",
"model": "Cartilage abnormalities are described by surface integrity and depth. Fibrillation is fraying or irregularity of the articular surface - superficial roughening. A fissure is a vertical or oblique cleft extending into the cartilage from the surface, which I grade by depth: partial-thickness if it does not reach bone, full-thickness if it extends to the subchondral plate. Delamination is a horizontal cleavage at the cartilage-bone interface - the cartilage separates from subchondral bone, sometimes with fluid undercutting it, while the surface can look deceptively intact. A full-thickness chondral defect is loss of cartilage down to and exposing the subchondral bone - I use the phrase 'exposed subchondral bone.' I always state the surface/compartment involved, the depth (partial vs full thickness, or a percentage), the size in mm, and associated subchondral changes like marrow edema or subchondral cysts.",
"keyterms": [
{
"label": "fibrillation = surface fraying",
"patterns": [
"fibrillat",
"fray",
"surface irregular",
"roughen"
],
"why": "fibrillation = superficial surface fraying/irregularity"
},
{
"label": "fissure = vertical cleft, graded by depth",
"patterns": [
"fissur",
"cleft",
"vertical",
"oblique"
],
"why": "a fissure is a cleft graded partial vs full thickness by depth"
},
{
"label": "delamination = horizontal cleavage",
"patterns": [
"delaminat",
"horizontal",
"cleavage",
"undercut",
"cartilage[- ]bone interface"
],
"why": "delamination = separation at the cartilage-bone interface"
},
{
"label": "full-thickness defect / exposed bone",
"patterns": [
"full[- ]thickness",
"exposed subchondral",
"down to bone",
"subchondral bone exposed"
],
"why": "full-thickness loss exposes subchondral bone"
},
{
"label": "convey depth (partial vs full)",
"patterns": [
"partial[- ]thickness",
"depth",
"percent",
"\\d{1,3}\\s*%",
"reaches? (the )?bone"
],
"why": "depth (partial/full or %) is the core descriptor"
},
{
"label": "location, size, associated subchondral change",
"patterns": [
"compartment",
"surface",
"\\d+\\s*mm",
"subchondral (cyst|edema)",
"size"
],
"why": "always state location, size, and subchondral findings"
}
],
"id": 104
},
{
"type": "dictate",
"joint": "general",
"topic": "Outerbridge / ICRS grading",
"difficulty": 2,
"prompt": "Walk through the modified Outerbridge / ICRS cartilage grading system, grades 0 through 4.",
"model": "The modified Outerbridge (and the analogous ICRS) system grades cartilage from 0 to 4 by depth of involvement. Grade 0 is normal cartilage. Grade 1 is signal heterogeneity with an intact surface - abnormal internal signal but no surface defect. Grade 2 is a superficial defect involving less than 50% of cartilage thickness - fibrillation/fissuring into the superficial half. Grade 3 is a deep defect involving more than 50% of thickness but not reaching the subchondral bone. Grade 4 is a full-thickness defect extending to and exposing the subchondral bone. It is a depth-based scale, so my dictation maps directly: surface intact = grade 1, less than half = 2, more than half = 3, down to bone = 4.",
"keyterms": [
{
"label": "grade 0 normal",
"patterns": [
"grade 0",
"normal cartilage"
],
"why": "baseline normal cartilage"
},
{
"label": "grade 1 = signal heterogeneity, intact surface",
"patterns": [
"grade 1",
"heterogen|soften",
"intact surface",
"internal signal"
],
"why": "grade 1 = signal heterogeneity, surface intact"
},
{
"label": "grade 2 = <50% thickness",
"patterns": [
"grade 2",
"less than 50",
"<\\s*50",
"superficial",
"fibrillat"
],
"why": "grade 2 = superficial defect <50% thickness"
},
{
"label": "grade 3 = >50% not to bone",
"patterns": [
"grade 3",
"more than 50",
">\\s*50",
"deep",
"not (reaching|to) bone"
],
"why": "grade 3 = deep defect >50% but not exposing bone"
},
{
"label": "grade 4 = full-thickness to bone",
"patterns": [
"grade 4",
"full[- ]thickness",
"subchondral bone",
"exposes? bone"
],
"why": "grade 4 = full-thickness defect exposing subchondral bone"
},
{
"label": "depth-based scale",
"patterns": [
"depth",
"thickness",
"based on depth"
],
"why": "the system is organized by depth of cartilage loss"
}
],
"id": 105
},
{
"type": "dictate",
"joint": "general",
"topic": "Ligament injury grading",
"difficulty": 2,
"prompt": "How do you grade a ligament sprain (I/II/III) on MRI and what descriptive terms apply to partial versus complete tears?",
"model": "Ligament injury is graded I to III. Grade I is a sprain with periligamentous edema and intact, taut fibers - the ligament shows surrounding high T2 signal but the fibers are continuous and normal in thickness. Grade II is a partial tear: some fiber disruption with intrasubstance high signal, possible thickening, and fibers that may appear lax or partially discontinuous, but a portion remains intact. Grade III is a complete tear: full discontinuity of fibers, often with a wavy, lax, or retracted appearance and fluid filling the gap, plus periligamentous edema and sometimes a torn stump. I also localize the tear - midsubstance versus an avulsion at the bony attachment (which may take a bone fragment) - and describe whether fibers are taut, lax/wavy, or frankly discontinuous.",
"keyterms": [
{
"label": "grade I = periligamentous edema, intact",
"patterns": [
"grade (1|i)\\b",
"periligamentous",
"intact",
"taut",
"sprain"
],
"why": "grade I = surrounding edema, fibers intact"
},
{
"label": "grade II = partial tear",
"patterns": [
"grade (2|ii)\\b",
"partial",
"intrasubstance",
"some fiber"
],
"why": "grade II = partial fiber disruption, some intact"
},
{
"label": "grade III = complete tear/discontinuity",
"patterns": [
"grade (3|iii)\\b",
"complete",
"discontinu",
"full"
],
"why": "grade III = complete fiber discontinuity"
},
{
"label": "lax / wavy fibers",
"patterns": [
"lax",
"wavy",
"redundant",
"retract"
],
"why": "complete tears show lax, wavy, or retracted fibers"
},
{
"label": "periligamentous edema",
"patterns": [
"periligamentous",
"surrounding (high )?signal",
"edema"
],
"why": "periligamentous edema is a key sign across grades"
},
{
"label": "avulsion vs midsubstance",
"patterns": [
"avulsion",
"midsubstance",
"mid[- ]substance",
"attachment",
"bony fragment"
],
"why": "localize: midsubstance vs bony avulsion"
}
],
"id": 106
},
{
"type": "dictate",
"joint": "general",
"topic": "Muscle strain grading",
"difficulty": 2,
"prompt": "Describe the MRI grading of a muscle strain (grades 1-3) and the descriptors you use, including the myotendinous junction.",
"model": "Muscle strains are graded 1 to 3 and most occur at the myotendinous junction, the weak link. Grade 1 is a low-grade strain: feathery or interstitial edema-like high T2 signal tracking along muscle fibers and fascia, with no architectural disruption and minimal or no fiber loss - I often estimate it involves a small percentage of the cross-sectional area. Grade 2 is a partial tear: edema plus some fiber disruption, perifascial fluid, and partial loss of the muscle cross-section, frequently with a focal hematoma. Grade 3 is a complete tear/rupture with full-thickness fiber discontinuity, retraction, and often a large hematoma with the torn muscle ends. Descriptors I use: feathery edema, perifascial/fascial fluid, percentage of muscle cross-sectional area involved, location relative to the myotendinous junction, and retraction.",
"keyterms": [
{
"label": "myotendinous junction",
"patterns": [
"myotendinous",
"musculotendinous",
"mtj"
],
"why": "strains classically occur at the myotendinous junction"
},
{
"label": "grade 1 = feathery edema, no disruption",
"patterns": [
"grade 1",
"feathery",
"interstitial",
"no (architectural )?disrupt"
],
"why": "grade 1 = feathery edema without fiber disruption"
},
{
"label": "grade 2 = partial tear + fascial fluid",
"patterns": [
"grade 2",
"partial",
"perifascial",
"fascial fluid",
"fiber disrupt"
],
"why": "grade 2 = partial tear with perifascial fluid"
},
{
"label": "grade 3 = complete rupture + retraction",
"patterns": [
"grade 3",
"complete",
"rupture",
"retract",
"discontinu"
],
"why": "grade 3 = complete rupture with retraction"
},
{
"label": "% cross-sectional area",
"patterns": [
"cross[- ]section",
"percent",
"\\d{1,3}\\s*%",
"csa"
],
"why": "quantify by percent of muscle cross-section involved"
},
{
"label": "fascial / perifascial fluid & hematoma",
"patterns": [
"fascial fluid",
"perifascial",
"hematoma",
"haematoma"
],
"why": "fascial fluid and hematoma indicate higher grade"
}
],
"id": 107
},
{
"type": "dictate",
"joint": "general",
"topic": "Denervation vs fatty atrophy",
"difficulty": 2,
"prompt": "How do you distinguish subacute denervation edema from chronic fatty atrophy of a muscle, and what does each imply?",
"model": "These represent the time course of a muscle losing its nerve supply. Subacute denervation produces edema-like signal in the muscle - diffuse high signal on T2 fat-sat/STIR with preserved muscle bulk and no focal injury - distributed in a specific nerve or myotomal territory, which is the clue that it is neurogenic rather than traumatic. If denervation persists, it progresses to chronic changes: fatty infiltration and atrophy, seen as high T1 fatty replacement of the muscle with volume loss and decreased bulk. So subacute = bright on fluid-sensitive sequences with normal volume; chronic = fatty (bright on T1) with shrinkage. Recognizing a nerve-territory distribution lets me suggest a denervation etiology and point to the responsible nerve.",
"keyterms": [
{
"label": "denervation edema = high T2/STIR, normal bulk",
"patterns": [
"denervation",
"edema[- ]like",
"high (t2|stir|signal)",
"preserved (bulk|volume)",
"subacute"
],
"why": "subacute denervation = diffuse muscle edema, bulk preserved"
},
{
"label": "nerve/myotomal territory distribution",
"patterns": [
"nerve (territory|distribution)",
"myotom",
"territory",
"innervat"
],
"why": "a nerve-territory distribution signals a neurogenic cause"
},
{
"label": "chronic = fatty atrophy",
"patterns": [
"fatty (atrophy|infiltrat|replac)",
"atrophy",
"chronic",
"volume loss"
],
"why": "chronic denervation = fatty atrophy and volume loss"
},
{
"label": "fat is high T1",
"patterns": [
"high t1",
"bright on t1",
"t1 (bright|hyper)",
"fat"
],
"why": "fatty replacement is bright on T1"
},
{
"label": "time course / progression",
"patterns": [
"subacute",
"chronic",
"progress",
"time course",
"reversible"
],
"why": "edema (subacute) precedes fatty atrophy (chronic)"
},
{
"label": "localize responsible nerve",
"patterns": [
"responsible nerve",
"which nerve",
"specific nerve",
"point to"
],
"why": "distribution lets you name the affected nerve"
}
],
"id": 108
},
{
"type": "dictate",
"joint": "general",
"topic": "AVN / double-line sign",
"difficulty": 2,
"prompt": "Describe osteonecrosis on MRI including the double-line sign, and contrast it with subchondral insufficiency fracture.",
"model": "Osteonecrosis (avascular necrosis) of an epiphysis shows a serpiginous or geographic peripheral rim demarcating a necrotic segment. The classic double-line sign on T2 is an outer low-signal rim (sclerotic reactive interface) with an inner high-signal line (hyperemic granulation tissue) - the two parallel lines bordering the infarcted marrow, which often retains fat signal centrally early on. Contrast this with a subchondral insufficiency fracture, which shows a subchondral low-signal line paralleling the articular surface with surrounding marrow edema, occurring in weakened bone (often elderly osteoporotic or post-meniscectomy knees), and is a fracture rather than primary infarction - though it can lead to secondary collapse. So the discriminators are the serpiginous double-line rim of AVN versus the subchondral fracture line and prominent edema of insufficiency fracture; both can progress to subchondral collapse.",
"keyterms": [
{
"label": "osteonecrosis / AVN",
"patterns": [
"osteonecrosis",
"avascular necrosis",
"\\bavn\\b",
"infarct"
],
"why": "AVN = avascular necrosis/infarction of marrow"
},
{
"label": "double-line sign",
"patterns": [
"double[- ]line",
"two (parallel )?lines"
],
"why": "the classic AVN sign on T2"
},
{
"label": "outer low + inner high line",
"patterns": [
"outer low",
"inner high",
"sclerotic (rim|interface)",
"granulation",
"hyperemic"
],
"why": "outer dark sclerosis + inner bright granulation = double line"
},
{
"label": "serpiginous/geographic rim",
"patterns": [
"serpiginous",
"geographic",
"rim",
"demarcat"
],
"why": "AVN demarcates a serpiginous/geographic segment"
},
{
"label": "subchondral insufficiency fracture",
"patterns": [
"subchondral (insufficiency )?fracture",
"insufficiency fracture",
"subchondral (low[- ]signal )?line"
],
"why": "SIF = subchondral fracture line in weakened bone"
},
{
"label": "both can collapse",
"patterns": [
"collapse",
"subchondral collapse",
"articular collapse"
],
"why": "both AVN and SIF can progress to subchondral collapse"
}
],
"id": 109
},
{
"type": "dictate",
"joint": "general",
"topic": "Magic-angle artifact",
"difficulty": 3,
"prompt": "What is the magic-angle artifact, how does it mimic tendinosis, and how do you confirm it is artifact?",
"model": "The magic-angle artifact is artifactual increased signal within a tendon or ligament on short-TE sequences - T1, proton-density, and gradient-echo - that occurs when the fibers are oriented approximately 55 degrees to the main magnetic field B0. At that angle, dipolar interactions are minimized, T2 lengthens, and the normally dark tendon shows spuriously increased intermediate signal, mimicking tendinosis or a partial tear. The way I confirm it is artifact rather than real pathology is to look at a long-TE sequence - a T2-weighted image: magic-angle signal disappears (the tendon goes dark again) on long-TE T2, whereas true tendinosis or a tear persists and tendinosis stays intermediate while a tear becomes fluid-bright. It is classically seen where curved tendons hit ~55 degrees - for example the supraspinatus near its insertion or the peroneal/posterior tibial tendons around the ankle.",
"keyterms": [
{
"label": "~55 degrees to B0",
"patterns": [
"55",
"magic angle",
"fifty[- ]five",
"angle to (the )?(main )?field",
"b0"
],
"why": "the artifact peaks near 55 degrees to the main field"
},
{
"label": "short-TE sequences (T1/PD/GRE)",
"patterns": [
"short[- ]?te",
"low te",
"t1",
"proton[- ]?density",
"\\bpd\\b",
"gradient[- ]?echo",
"\\bgre\\b"
],
"why": "the artifact appears on short-TE sequences"
},
{
"label": "mimics tendinosis/partial tear",
"patterns": [
"mimic",
"mimics tendinosis",
"false",
"artifactual (increased )?signal"
],
"why": "raised short-TE signal mimics tendinosis"
},
{
"label": "confirm on long-TE T2 (disappears)",
"patterns": [
"long[- ]?te",
"t2",
"disappear",
"resolves?",
"goes (dark|away)"
],
"why": "on long-TE T2 the artifactual signal vanishes; pathology persists"
},
{
"label": "curved tendon locations",
"patterns": [
"supraspinatus",
"perone",
"posterior tibial",
"curved",
"insertion"
],
"why": "occurs where curved tendons reach ~55 degrees"
}
],
"id": 110
},
{
"type": "dictate",
"joint": "general",
"topic": "Named grading systems",
"difficulty": 3,
"prompt": "Name the common MSK grading systems - Goutallier, Outerbridge, Patte, Palmer - and state when each is used.",
"model": "These are eponymous grading systems each tied to a specific application. Goutallier grades fatty muscle degeneration/atrophy - originally the rotator cuff muscles - from 0 (no fat) to 4 (more fat than muscle); it is used to assess muscle quality and reparability, classically of the supraspinatus and infraspinatus. Outerbridge (modified for MRI) grades articular cartilage damage 0 to 4 by depth, as discussed. Patte grades the degree of rotator cuff tendon retraction in the coronal plane - stage 1 near the footprint, stage 2 to the humeral head level, stage 3 retracted to the glenoid. Palmer classifies triangular fibrocartilage complex (TFCC) lesions of the wrist - class 1 traumatic and class 2 degenerative, each subdivided. So: Goutallier for muscle fat, Outerbridge for cartilage, Patte for cuff retraction, Palmer for the TFCC.",
"keyterms": [
{
"label": "Goutallier = fatty muscle atrophy",
"patterns": [
"goutallier",
"fatty (muscle|infiltrat|atrophy|degener)",
"muscle quality"
],
"why": "Goutallier grades fatty degeneration of muscle (e.g., cuff)"
},
{
"label": "Outerbridge = cartilage depth",
"patterns": [
"outerbridge",
"cartilage",
"chondral"
],
"why": "Outerbridge grades articular cartilage by depth"
},
{
"label": "Patte = cuff tendon retraction",
"patterns": [
"patte",
"retraction",
"coronal",
"cuff retract"
],
"why": "Patte stages rotator cuff tendon retraction"
},
{
"label": "Palmer = TFCC lesions",
"patterns": [
"palmer",
"tfcc",
"triangular fibrocartilage"
],
"why": "Palmer classifies TFCC tears (traumatic vs degenerative)"
},
{
"label": "each tied to a specific use",
"patterns": [
"specific (use|application)",
"tied to",
"used (for|to)",
"when (to use|each)"
],
"why": "each eponym applies to one anatomic/clinical question"
}
],
"id": 111
},
{
"type": "dictate",
"joint": "general",
"topic": "Structured lesion description",
"difficulty": 2,
"prompt": "What are the essential descriptors an MSK radiologist states for any lesion or abnormality, and why include relevant negatives?",
"model": "For any abnormality I dictate a consistent set of descriptors: location (which bone/compartment, which surface or zone), size in three dimensions in millimeters, morphology (shape, margins, well- vs ill-defined), signal characteristics (on T1, on fluid-sensitive sequences, and after contrast if given), and the integrity/stability of the involved structure. I then state associated findings - effusion, marrow edema, soft-tissue changes - and, importantly, the relevant negatives: explicitly noting the absence of a fracture line, of full-thickness tear, of aggressive features, or of a fragment. Relevant negatives matter because they document that the pertinent differential considerations were actively assessed and excluded, they directly answer the clinical question, and they make the report defensible and useful to the referring surgeon. The framework is: location, size, morphology, signal, stability, associated findings, and relevant negatives.",
"keyterms": [
{
"label": "location (surface/zone/compartment)",
"patterns": [
"location",
"which (surface|zone|compartment|bone)",
"surface",
"compartment"
],
"why": "always anchor the finding to a precise location"
},
{
"label": "size in 3 dimensions (mm)",
"patterns": [
"size",
"three dimension",
"\\d+\\s*mm",
"measure",
"dimension"
],
"why": "give size in mm, ideally three dimensions"
},
{
"label": "morphology / margins",
"patterns": [
"morphology",
"margin",
"shape",
"well[- ]defined",
"ill[- ]defined"
],
"why": "describe shape and margins"
},
{
"label": "signal characteristics",
"patterns": [
"signal",
"t1",
"t2",
"fluid[- ]sensitive",
"enhanc"
],
"why": "characterize signal on each sequence"
},
{
"label": "stability / integrity",
"patterns": [
"stability",
"integrity",
"stable",
"unstable"
],
"why": "state whether the structure/lesion is stable"
},
{
"label": "associated findings",
"patterns": [
"associated",
"effusion",
"marrow edema",
"soft[- ]tissue"
],
"why": "note secondary/associated findings"
},
{
"label": "relevant negatives",
"patterns": [
"relevant negative",
"pertinent negative",
"no (evidence of|fracture|tear)",
"absence of",
"exclud"
],
"why": "relevant negatives show the differential was assessed"
}
],
"id": 112
},
{
"type": "mcq",
"joint": "general",
"topic": "Fluid-bright definition",
"difficulty": 1,
"prompt": "When a radiologist says a tendon defect is 'fluid-bright,' on which sequence is this signal characteristic assessed and what does it indicate?",
"choices": [
"High signal on T1, indicating fatty change",
"High signal following fluid on T2/fluid-sensitive sequences, indicating a tear",
"Low signal on T2, indicating normal tendon",
"High signal on gradient-echo only, indicating magic angle"
],
"answer": 1,
"explain": "'Fluid-bright' means the signal follows fluid (becomes bright) on T2/fluid-sensitive fat-sat sequences. In a tendon, a fluid-bright cleft indicates a tear, as opposed to the intermediate, non-fluid signal of tendinosis.",
"id": 113
},
{
"type": "mcq",
"joint": "general",
"topic": "Marrow replacement on T1",
"difficulty": 2,
"prompt": "Which finding most specifically suggests a marrow-replacing process (e.g., tumor or infection) rather than benign edema-like signal?",
"choices": [
"High signal on STIR",
"Confluent low signal replacing the normal fatty marrow on T1",
"A small joint effusion",
"Periligamentous high T2 signal"
],
"answer": 1,
"explain": "Confluent low T1 signal that replaces the normal bright fatty marrow is the hallmark of a marrow-replacing process. Edema-like signal is bright on fluid-sensitive sequences but typically preserves some fatty marrow on T1 and is not confluently dark.",
"id": 114
},
{
"type": "mcq",
"joint": "general",
"topic": "Sheath terminology",
"difficulty": 2,
"prompt": "Which tendon can develop true tenosynovitis (rather than paratenonitis)?",
"choices": [
"Achilles tendon",
"Patellar tendon",
"Tibialis posterior tendon",
"Quadriceps tendon"
],
"answer": 2,
"explain": "The tibialis posterior runs within a true synovial tendon sheath and can develop tenosynovitis. The Achilles and patellar tendons lack a synovial sheath (they have a paratenon), so they develop paratenonitis/peritendinitis instead.",
"id": 115
},
{
"type": "mcq",
"joint": "general",
"topic": "Stress fracture vs reaction",
"difficulty": 2,
"prompt": "What single feature distinguishes a stress fracture from a stress reaction on MRI?",
"choices": [
"The presence of marrow edema",
"A discrete low-signal fracture line",
"A joint effusion",
"Periosteal thickening"
],
"answer": 1,
"explain": "Both stress reaction and stress fracture show marrow/periosteal edema. The presence of a discrete low-signal fracture line is what defines a stress fracture; without a fracture line it is a stress reaction (the earlier point on the continuum).",
"id": 116
},
{
"type": "cloze",
"joint": "general",
"topic": "Outerbridge grade 4",
"difficulty": 1,
"prompt": "A modified Outerbridge grade 4 chondral lesion is a full-thickness defect that exposes the underlying ___ bone.",
"answers": [
"subchondral"
],
"explain": "Grade 4 is a full-thickness cartilage defect extending down to and exposing the subchondral bone.",
"id": 117
},
{
"type": "cloze",
"joint": "general",
"topic": "AVN double-line",
"difficulty": 2,
"prompt": "The classic MRI sign of osteonecrosis is the ___-line sign, with an outer low-signal (sclerotic) line and an inner high-signal (granulation tissue) line on T2.",
"answers": [
"double"
],
"explain": "The double-line sign - outer dark sclerotic rim and inner bright hyperemic granulation tissue - is the classic T2 appearance of osteonecrosis.",
"id": 118
},
{
"type": "cloze",
"joint": "general",
"topic": "Muscle strain location",
"difficulty": 1,
"prompt": "Most acute muscle strains occur at the ___ junction, where feathery edema-like signal tracks along the muscle fibers.",
"answers": [
"myotendinous",
"musculotendinous"
],
"explain": "The myotendinous (musculotendinous) junction is the weakest link and the typical site of muscle strain, showing feathery edema on fluid-sensitive sequences.",
"id": 119
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Management",
"difficulty": 2,
"prompt": "A young patient has recurrent anterior shoulder dislocations. CT shows ~25% glenoid bone loss with an engaging Hill-Sachs lesion. What does this most change about surgical management?",
"choices": [
"Favors an isolated arthroscopic Bankart repair",
"Favors a bony augmentation procedure such as Latarjet",
"Favors nonoperative physiotherapy alone",
"Favors reverse total shoulder arthroplasty"
],
"answer": 1,
"explain": "Glenoid bone loss above roughly 20-25% (and engaging/off-track Hill-Sachs lesions) markedly raises the failure rate of isolated soft-tissue (arthroscopic Bankart) repair. The standard recommendation is a bony procedure such as the Latarjet, which restores the glenoid arc and adds a sling effect. Isolated Bankart is for low bone-loss cases; nonoperative care fails in recurrent instability; rTSA is for cuff-deficient arthropathy.",
"id": 120
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Management",
"difficulty": 2,
"prompt": "MRI of a full-thickness supraspinatus tear shows Goutallier grade 3-4 fatty atrophy of the muscle belly. How should this influence management?",
"choices": [
"The tendon is highly reparable with expected good outcome",
"Advanced fatty atrophy predicts irreparability/poor healing, favoring tendon transfer or reverse arthroplasty",
"Atrophy grading is irrelevant to surgical decision-making",
"Recommend immediate primary repair regardless of muscle quality"
],
"answer": 1,
"explain": "Goutallier 3-4 (more fat than muscle) indicates irreversible degeneration; primary repair has high re-tear rates. This steers the surgeon toward salvage options (tendon transfer, superior capsular reconstruction, or reverse total shoulder arthroplasty). Reporting the grade directly affects whether repair is attempted.",
"id": 121
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Management",
"difficulty": 2,
"prompt": "For a bony Bankart lesion, what is the expected method to quantify glenoid bone loss for the surgeon?",
"choices": [
"Subjective visual estimate on a single axial slice",
"Best-fit circle on the en-face (sagittal oblique) glenoid view",
"Measuring only the humeral head diameter",
"AP radiograph width of the acromion"
],
"answer": 1,
"explain": "The accepted method is a best-fit circle over the inferior glenoid on the en-face sagittal-oblique view (3D CT or MR), measuring the missing arc as a percentage. This drives the >20-25% threshold for bony procedures, so the report should provide it, not a vague estimate.",
"id": 122
},
{
"type": "mcq",
"joint": "knee",
"topic": "Management",
"difficulty": 2,
"prompt": "During MRI for a complete ACL tear you identify a ramp lesion (posteromedial meniscocapsular tear). Why does flagging this change management?",
"choices": [
"It is incidental with no surgical relevance",
"It is frequently missed arthroscopically and, if unrepaired, increases ACL graft failure and persistent instability",
"It mandates total meniscectomy",
"It contraindicates ACL reconstruction"
],
"answer": 1,
"explain": "Ramp lesions are easily overlooked at arthroscopy. Left unaddressed they increase rotatory laxity and ACL graft failure, so the surgeon will specifically inspect and repair them. Reporting it prompts targeted repair at reconstruction.",
"id": 123
},
{
"type": "mcq",
"joint": "knee",
"topic": "Management",
"difficulty": 2,
"prompt": "MRI shows a complete posterior root tear of the medial meniscus with extrusion. What is the most appropriate principle?",
"choices": [
"Observe; root tears do not affect mechanics",
"Recommend root repair because an untreated root tear is biomechanically equivalent to total meniscectomy and accelerates OA",
"Total meniscectomy first-line",
"No follow-up needed"
],
"answer": 1,
"explain": "A posterior medial root tear disrupts hoop-stress function, producing extrusion and load equivalent to total meniscectomy with rapid cartilage loss. In non-arthritic patients, root repair restores hoop tension and is recommended to prevent rapid degeneration.",
"id": 124
},
{
"type": "mcq",
"joint": "knee",
"topic": "Management",
"difficulty": 2,
"prompt": "Radiographs show a lipohemarthrosis (fat-fluid level) in the suprapatellar recess but no obvious fracture line. Next best step?",
"choices": [
"No further imaging; effusion is benign",
"Obtain CT to find the intra-articular fracture the marrow fat indicates",
"Aspirate and discharge",
"MRI of the contralateral knee"
],
"answer": 1,
"explain": "A fat-fluid level means marrow fat escaped into the joint, essentially pathognomonic of an intra-articular fracture even when occult on radiographs. CT is the next step to find and characterize it (commonly tibial plateau) for fixation planning.",
"id": 125
},
{
"type": "mcq",
"joint": "ankle",
"topic": "Management",
"difficulty": 2,
"prompt": "After a twisting injury, radiographs show medial and tibiofibular clear space widening with a normal-appearing distal fibula. What is essential?",
"choices": [
"No further work-up",
"Image the proximal fibula to exclude a Maisonneuve fracture and obtain weight-bearing/stress views for instability",
"Cast and discharge",
"MRI of the contralateral ankle"
],
"answer": 1,
"explain": "Medial clear space widening with syndesmotic disruption but an intact distal fibula should prompt evaluation of the proximal fibula (Maisonneuve), as force transmits proximally. Weight-bearing/stress views confirm instability. Unstable syndesmotic injuries need fixation.",
"id": 126
},
{
"type": "mcq",
"joint": "wrist",
"topic": "Management",
"difficulty": 3,
"prompt": "MR arthrography shows a peripheral (foveal/ulnar) TFCC tear with DRUJ instability. How does location change management vs a central tear?",
"choices": [
"Peripheral foveal tears are degenerative and debrided only",
"Peripheral foveal tears are vascular and repairable, whereas central tears are typically debrided",
"Both managed identically with immobilization",
"Central tears always require ulnar shortening"
],
"answer": 1,
"explain": "The peripheral/foveal TFCC is vascularized and repairable, especially with DRUJ instability. Central tears are avascular/degenerative and usually debrided (± ulnar shortening for abutment). Location dictates repair vs debridement.",
"id": 127
},
{
"type": "mcq",
"joint": "wrist",
"topic": "Management",
"difficulty": 2,
"prompt": "MRI of a scaphoid fracture shows proximal pole nonunion with low T1/T2 marrow and no enhancement (AVN). What does this favor surgically?",
"choices": [
"Simple cast immobilization",
"A vascularized bone graft procedure",
"Excision of the entire scaphoid",
"Observation with repeat film in 6 weeks"
],
"answer": 1,
"explain": "The proximal pole's retrograde supply makes it prone to AVN/nonunion. Avascular proximal pole nonunion favors a vascularized bone graft to provide blood supply and union; casting/non-vascularized grafts are likely to fail.",
"id": 128
},
{
"type": "mcq",
"joint": "hand",
"topic": "Management",
"difficulty": 2,
"prompt": "MRI of the thumb shows a torn UCL displaced superficial to the adductor aponeurosis (Stener lesion). Why does this require surgery?",
"choices": [
"It heals with thumb spica casting",
"The interposed aponeurosis prevents the ligament ends from apposing, so it cannot heal conservatively",
"It is a stable injury needing no treatment",
"Buddy taping suffices"
],
"answer": 1,
"explain": "In a Stener lesion the adductor aponeurosis is interposed between the retracted UCL and its insertion, physically blocking healing, so surgical repair is required. Distinguishing it from a non-displaced UCL tear is the key management determinant.",
"id": 129
},
{
"type": "mcq",
"joint": "hand",
"topic": "Management",
"difficulty": 3,
"prompt": "A climber has rupture of both A2 and A4 pulleys with marked bowstringing. How does multi-pulley involvement change management?",
"choices": [
"Both single- and multi-pulley injuries are managed with taping",
"Combined A2+A4 rupture with bowstringing favors surgical pulley reconstruction rather than conservative care",
"All pulley injuries require amputation",
"Multi-pulley injury needs no immobilization"
],
"answer": 1,
"explain": "Isolated single-pulley injuries usually heal conservatively. Combined ruptures of multiple critical pulleys (A2 and A4) cause significant bowstringing/biomechanical loss and are an indication for surgical reconstruction. The combination involved tips toward surgery.",
"id": 130
},
{
"type": "mcq",
"joint": "ankle",
"topic": "Management",
"difficulty": 2,
"prompt": "MRI shows a complete Achilles rupture. Which feature is most relevant to report for the operative-vs-nonoperative discussion?",
"choices": [
"The presence of a plantaris tendon",
"The gap size between tendon ends and whether the gap apposes in plantar flexion",
"The signal of the adjacent fat pad only",
"The length of the calcaneus"
],
"answer": 1,
"explain": "Management (surgical repair vs functional bracing) is influenced by the gap between torn ends and whether it closes in plantar flexion. A large, non-apposing gap favors surgery; ends that appose support functional nonoperative care. Report gap size and apposition.",
"id": 131
},
{
"type": "mcq",
"joint": "hip",
"topic": "Management",
"difficulty": 3,
"prompt": "MRI shows a femoral neck stress fracture on the superolateral (tension) side. Why is this more urgent than a compression-side fracture?",
"choices": [
"Tension-side fractures are low risk; continue running",
"Tension-side femoral neck stress fractures are high risk for completion/displacement and require urgent referral and non-weight-bearing",
"Both managed identically with rest",
"Compression-side need surgery while tension-side need none"
],
"answer": 1,
"explain": "Superolateral (tension-side) femoral neck stress fractures are under distraction and at high risk of completing/displacing with possible AVN, so they warrant urgent referral, non-weight-bearing, and often prophylactic fixation. Compression-side fractures are lower risk.",
"id": 132
},
{
"type": "mcq",
"joint": "foot",
"topic": "Management",
"difficulty": 2,
"prompt": "MRI shows a tarsal navicular stress fracture. Why is it 'high-risk,' and how does that change management?",
"choices": [
"Low-risk; continue activity",
"High-risk for nonunion/AVN due to poor central blood supply, warranting CT and non-weight-bearing immobilization",
"Requires no immobilization",
"Always immediate screw fixation regardless of grade"
],
"answer": 1,
"explain": "The central third of the navicular is relatively avascular, making these prone to delayed/nonunion and AVN. Management is aggressive: CT to assess completeness and strict non-weight-bearing (or surgery for complete/displaced), unlike low-risk stress fractures.",
"id": 133
},
{
"type": "mcq",
"joint": "foot",
"topic": "Management",
"difficulty": 2,
"prompt": "A fifth metatarsal fracture is at the metaphyseal-diaphyseal junction (zone 2, Jones). How does management differ from a zone-1 tuberosity avulsion?",
"choices": [
"Both heal reliably with weight-bearing as tolerated",
"The Jones fracture has a high nonunion rate in a watershed zone and often warrants non-weight-bearing or screw fixation, unlike the well-healing tuberosity avulsion",
"Zone 1 avulsions require surgery while Jones do not",
"Location does not affect prognosis"
],
"answer": 1,
"explain": "The zone-2 Jones fracture lies in a vascular watershed with a high nonunion rate, managed with strict non-weight-bearing or (especially in athletes) intramedullary screw fixation. The zone-1 tuberosity avulsion has good blood supply and heals with symptomatic care.",
"id": 134
},
{
"type": "mcq",
"joint": "general",
"topic": "Management",
"difficulty": 3,
"prompt": "On a knee MRI you incidentally find a focal lesion that is low T1 (replacing fatty marrow) in the distal femur. Why change your recommendation?",
"choices": [
"Low-T1 marrow-replacing lesions are always benign red marrow",
"A T1 marrow-replacing lesion is not simple edema and warrants further work-up for tumor or infection",
"Describe it as a bone bruise",
"Repeat MRI in 2 years only"
],
"answer": 1,
"explain": "Normal marrow and edema retain some T1 fat signal; a lesion truly replacing T1 marrow signal indicates a cellular/infiltrative process (metastasis, primary tumor, marrow infiltration, osteomyelitis), mandating further work-up rather than dismissal.",
"id": 135
},
{
"type": "mcq",
"joint": "ankle",
"topic": "Management",
"difficulty": 2,
"prompt": "A talar dome osteochondral lesion has a rim of high T2 fluid completely undermining the fragment. How does this change management vs a stable lesion?",
"choices": [
"Indicates instability favoring surgical fixation/removal, whereas a stable lesion can be conservative",
"Both managed conservatively regardless of fluid",
"Fluid undermining means it has healed",
"Mandates total ankle arthroplasty"
],
"answer": 0,
"explain": "A continuous rim of T2-bright fluid undermining the fragment indicates instability (detached). Unstable lesions risk displacement/loose bodies and are managed surgically (fixation, microfracture, grafting); stable lesions without undermining fluid can be conservative.",
"id": 136
},
{
"type": "cloze",
"joint": "shoulder",
"topic": "Management",
"difficulty": 1,
"prompt": "For labral/intrinsic-ligament questions where conventional MRI is equivocal, the recommended next study is MR ___ to distend the joint and improve detection.",
"answers": [
"arthrography",
"arthrogram"
],
"explain": "Intra-articular gadolinium distends the capsule and outlines the labrum and intrinsic ligaments, improving sensitivity for SLAP/Bankart and TFCC/intrinsic carpal ligament tears versus conventional MRI.",
"id": 137
},
{
"type": "cloze",
"joint": "knee",
"topic": "Management",
"difficulty": 2,
"prompt": "An untreated posterior medial meniscus root tear is biomechanically equivalent to a total ___, leading to extrusion and rapidly progressive osteoarthritis.",
"answers": [
"meniscectomy"
],
"explain": "Loss of the root eliminates conversion of axial load into hoop stress, so the meniscus extrudes and no longer protects cartilage — functionally equal to removing it. This is why root repair is recommended in appropriate patients.",
"id": 138
},
{
"type": "cloze",
"joint": "hip",
"topic": "Management",
"difficulty": 2,
"prompt": "A femoral neck stress fracture on the ___ (superolateral) side is high-risk and warrants urgent referral and non-weight-bearing because it is prone to completion and displacement.",
"answers": [
"tension",
"tension-side",
"distraction"
],
"explain": "The superolateral femoral neck experiences distraction (tension) forces; a stress fracture here can propagate to a complete displaced fracture with risk of AVN, the high-risk pattern requiring urgent management.",
"id": 139
},
{
"type": "cloze",
"joint": "wrist",
"topic": "Management",
"difficulty": 2,
"prompt": "A proximal pole scaphoid nonunion with avascular necrosis is best treated with a ___ bone graft to restore blood supply and achieve union.",
"answers": [
"vascularized",
"vascularised"
],
"explain": "Because the proximal pole has a tenuous retrograde supply, an avascular proximal pole nonunion is unlikely to heal with a conventional graft or casting; a vascularized bone graft supplies blood flow for union.",
"id": 140
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Mimics",
"difficulty": 2,
"prompt": "On an MR arthrogram, how do you describe a smooth recess at the 11–1 o'clock superior labrum so it is NOT over-called as a SLAP tear?",
"model": "There is a smooth, regular sublabral recess at the superior labrum at the 12 o'clock position, with contrast insinuating between the labrum and glenoid rim in a medially-oriented direction that follows the contour of the glenoid. The recess has smooth margins, extends less than a few millimeters, does not extend posterior to the biceps anchor, and shows no lateral or irregular extension into the labral substance. These features are consistent with a normal sublabral recess rather than a SLAP tear.",
"keyterms": [
{
"label": "sublabral recess",
"patterns": [
"sublabral\\s+recess",
"superior\\s+sulcus"
],
"why": "Names the normal variant at the biceps-labral anchor."
},
{
"label": "smooth margins",
"patterns": [
"smooth",
"regular",
"well[-\\s]?defined"
],
"why": "Smooth contour favors a recess over a tear."
},
{
"label": "medial orientation",
"patterns": [
"medial",
"follows\\s+the\\s+(glenoid\\s+)?contour",
"parallel"
],
"why": "Recesses point medially/parallel to glenoid; SLAP tears extend laterally."
},
{
"label": "12 o'clock location",
"patterns": [
"12\\s*o.?clock",
"11.*1\\s*o.?clock",
"superior"
],
"why": "Recess is at the superior labrum; tears extend posterior to biceps anchor."
},
{
"label": "no lateral extension",
"patterns": [
"no\\s+lateral",
"not\\s+lateral",
"does\\s+not\\s+extend\\s+lateral"
],
"why": "Lateral/irregular extension would suggest a true SLAP tear."
},
{
"label": "small size",
"patterns": [
"less\\s+than|<\\s*\\d",
"few\\s+millimeters|small"
],
"why": "A deep, wide cleft (>3-5 mm) is more concerning for a tear."
},
{
"label": "biceps anchor",
"patterns": [
"biceps\\s+anchor",
"biceps[-\\s]labral"
],
"why": "SLAP tears involve and extend posterior to the biceps anchor."
}
],
"id": 141
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you dictate an absent anterosuperior labrum with a cord-like middle glenohumeral ligament so it is not mistaken for a labral tear?",
"model": "At the anterosuperior quadrant there is congenital absence of the anterosuperior labrum associated with a thickened, cord-like middle glenohumeral ligament. There is no labral tear elsewhere and the remainder of the labrum is intact. These findings represent a Buford complex, a normal anatomic variant, and should not be mistaken for an anterosuperior labral tear or detachment.",
"keyterms": [
{
"label": "Buford complex",
"patterns": [
"buford"
],
"why": "Names the recognized variant: absent AS labrum + cord-like MGHL."
},
{
"label": "cord-like MGHL",
"patterns": [
"cord[-\\s]?like",
"thickened\\s+middle\\s+glenohumeral",
"cord[-\\s]?like\\s+MGHL"
],
"why": "The hallmark thick cord-like middle glenohumeral ligament."
},
{
"label": "middle glenohumeral ligament",
"patterns": [
"middle\\s+glenohumeral",
"MGHL"
],
"why": "The ligament involved in the complex."
},
{
"label": "anterosuperior absence",
"patterns": [
"absen\\w+\\s+(of\\s+the\\s+)?anterosuperior",
"anterosuperior\\s+labr\\w+\\s+absen"
],
"why": "The labrum is congenitally absent, not torn."
},
{
"label": "normal variant",
"patterns": [
"normal\\s+(anatomic\\s+)?variant",
"not\\s+a\\s+tear",
"should\\s+not\\s+be\\s+mistaken"
],
"why": "Calling it a tear and repairing it can worsen stability."
},
{
"label": "anterosuperior quadrant",
"patterns": [
"anterosuperior\\s+quadrant",
"1.*3\\s*o.?clock"
],
"why": "Location of the variant; pathology elsewhere is still real."
}
],
"id": 142
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe a focal contrast cleft at the anterosuperior labrum (1–3 o'clock) so it is not called a Bankart-type detachment?",
"model": "There is a smooth focal separation of the anterosuperior labrum from the glenoid at the 1 to 3 o'clock position, communicating with the subscapularis recess, with smooth margins and an intact, normally-attached labrum below the equator. The anteroinferior labrum is intact. This represents a normal sublabral foramen rather than a labral tear or Bankart lesion.",
"keyterms": [
{
"label": "sublabral foramen",
"patterns": [
"sublabral\\s+foramen",
"sublabral\\s+hole"
],
"why": "Names the normal AS labral detachment variant."
},
{
"label": "anterosuperior location",
"patterns": [
"anterosuperior",
"1.*3\\s*o.?clock"
],
"why": "Foramen is confined to AS quadrant, above the equator."
},
{
"label": "above the equator",
"patterns": [
"above\\s+the\\s+equator",
"superior\\s+to\\s+the\\s+(glenoid\\s+)?equator",
"not\\s+below"
],
"why": "Detachment below the equator/3 o'clock is pathologic."
},
{
"label": "smooth margins",
"patterns": [
"smooth",
"regular",
"well[-\\s]?defined"
],
"why": "Smooth edges favor a variant over a tear."
},
{
"label": "intact anteroinferior labrum",
"patterns": [
"anteroinferior\\s+labr\\w+\\s+(is\\s+)?intact",
"inferior\\s+labrum\\s+intact"
],
"why": "A true Bankart involves the anteroinferior labrum."
},
{
"label": "subscapularis recess",
"patterns": [
"subscapular\\w*\\s+recess",
"communicat"
],
"why": "Foramen communicates with the subscapularis recess."
}
],
"id": 143
},
{
"type": "dictate",
"joint": "shoulder",
"topic": "Mimics",
"difficulty": 1,
"prompt": "How do you describe the bare area of the humeral head so it is not called a chondral defect or osteochondral lesion?",
"model": "At the posterosuperolateral humeral head there is a normal bare area with mild cortical irregularity and thin overlying cartilage just above the level of the surgical neck. This is the normal bare area of the humeral head and should not be mistaken for a Hill-Sachs lesion or an osteochondral defect; it is well above the typical Hill-Sachs location and present bilaterally.",
"keyterms": [
{
"label": "bare area",
"patterns": [
"bare\\s+area"
],
"why": "Names the normal cartilage-deficient zone."
},
{
"label": "posterosuperolateral",
"patterns": [
"posterosuperolateral",
"posterolateral\\s+humeral"
],
"why": "The bare area lies posterolaterally on the head."
},
{
"label": "not Hill-Sachs",
"patterns": [
"not\\s+a\\s+Hill[-\\s]?Sachs",
"Hill[-\\s]?Sachs",
"above\\s+the\\s+typical"
],
"why": "Located above the true Hill-Sachs level."
},
{
"label": "cortical irregularity",
"patterns": [
"cortical\\s+irregularity",
"irregular\\w*",
"groove"
],
"why": "Normal irregularity here mimics an impaction injury."
},
{
"label": "normal variant",
"patterns": [
"normal",
"physiologic",
"should\\s+not\\s+be\\s+mistaken"
],
"why": "Bilateral and reproducible favors a normal finding."
}
],
"id": 144
},
{
"type": "dictate",
"joint": "knee",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe the anterior transverse intermeniscal ligament so it is not called an anterior horn lateral meniscus tear?",
"model": "There is a normal transverse (intermeniscal) ligament coursing anteriorly between the anterior horns of the medial and lateral menisci. At its insertion onto the anterior horn of the lateral meniscus there is a small cleft of fat/fluid signal at the ligament-meniscus junction, which is a normal pseudotear and should not be mistaken for an anterior horn tear. The ligament is followed on contiguous slices to confirm its course.",
"keyterms": [
{
"label": "transverse ligament",
"patterns": [
"transverse\\s+(intermeniscal\\s+)?ligament",
"intermeniscal\\s+ligament"
],
"why": "Names the structure crossing the anterior knee."
},
{
"label": "pseudotear",
"patterns": [
"pseudo[-\\s]?tear",
"pseudotear",
"mimic"
],
"why": "The junctional cleft mimics an anterior horn tear."
},
{
"label": "anterior horn lateral meniscus",
"patterns": [
"anterior\\s+horn.*lateral",
"lateral\\s+meniscus\\s+anterior\\s+horn"
],
"why": "The classic site of the pseudotear."
},
{
"label": "ligament-meniscus junction",
"patterns": [
"junction",
"insertion",
"attach\\w+"
],
"why": "The cleft is at the attachment, not within the meniscus."
},
{
"label": "trace on contiguous slices",
"patterns": [
"contiguous\\s+slices",
"adjacent\\s+slices",
"followed|traced|track"
],
"why": "Tracing the ligament confirms the variant."
},
{
"label": "normal",
"patterns": [
"normal",
"not\\s+a\\s+tear"
],
"why": "Avoids over-calling a meniscal tear anteriorly."
}
],
"id": 145
},
{
"type": "dictate",
"joint": "knee",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe the meniscofemoral ligaments near the posterior horn of the lateral meniscus so they are not called a tear?",
"model": "There is a normal meniscofemoral ligament — the ligament of Humphrey anterior to the PCL and/or the ligament of Wrisberg posterior to the PCL — arising from the posterior horn of the lateral meniscus and inserting on the medial femoral condyle. A thin cleft of fluid signal between the ligament and the adjacent posterior horn is a normal pseudotear at the attachment and should not be mistaken for a posterior horn lateral meniscus tear.",
"keyterms": [
{
"label": "meniscofemoral ligament",
"patterns": [
"meniscofemoral\\s+ligament"
],
"why": "The parent structure causing the pseudotear."
},
{
"label": "Humphrey",
"patterns": [
"humphrey",
"humphry"
],
"why": "Anterior meniscofemoral ligament, anterior to PCL."
},
{
"label": "Wrisberg",
"patterns": [
"wrisberg"
],
"why": "Posterior meniscofemoral ligament, posterior to PCL."
},
{
"label": "relation to PCL",
"patterns": [
"anterior\\s+to\\s+the\\s+PCL",
"posterior\\s+to\\s+the\\s+PCL",
"PCL"
],
"why": "Defines which ligament you are naming."
},
{
"label": "posterior horn lateral meniscus",
"patterns": [
"posterior\\s+horn.*lateral",
"lateral\\s+meniscus\\s+posterior\\s+horn"
],
"why": "Site where the pseudotear is over-called."
},
{
"label": "pseudotear",
"patterns": [
"pseudo[-\\s]?tear",
"pseudotear",
"not\\s+a\\s+tear"
],
"why": "The junctional cleft mimics a tear."
}
],
"id": 146
},
{
"type": "dictate",
"joint": "knee",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe the popliteomeniscal fascicles and popliteus hiatus so they are not over-called as a posterior horn lateral meniscus tear?",
"model": "At the popliteus hiatus the popliteomeniscal fascicles are seen attaching the posterior horn of the lateral meniscus, with the popliteus tendon coursing through its sheath within the hiatus. The fluid-filled hiatus and the obliquely-oriented fascicles produce normal linear signal abutting the meniscus and should not be mistaken for a posterior horn tear. There is no meniscal substance signal reaching the articular surface and the meniscal contour is preserved.",
"keyterms": [
{
"label": "popliteomeniscal fascicles",
"patterns": [
"popliteomeniscal\\s+fascicl\\w+",
"popliteal\\s+fascicl\\w+"
],
"why": "Normal attachments that mimic a tear."
},
{
"label": "popliteus hiatus",
"patterns": [
"popliteus\\s+hiatus",
"popliteal\\s+hiatus"
],
"why": "Fluid-filled hiatus simulates a cleft."
},
{
"label": "popliteus tendon",
"patterns": [
"popliteus\\s+tendon"
],
"why": "The tendon and its sheath occupy the hiatus."
},
{
"label": "posterior horn lateral meniscus",
"patterns": [
"posterior\\s+horn.*lateral",
"lateral\\s+meniscus\\s+posterior\\s+horn"
],
"why": "Classic over-call location."
},
{
"label": "no surface extension",
"patterns": [
"does\\s+not\\s+reach\\s+the\\s+(articular\\s+)?surface",
"no\\s+(signal|extension)\\s+to\\s+the\\s+surface",
"contour\\s+(is\\s+)?preserved"
],
"why": "A true tear reaches an articular surface."
},
{
"label": "normal",
"patterns": [
"normal",
"not\\s+a\\s+tear"
],
"why": "Avoids over-calling."
}
],
"id": 147
},
{
"type": "dictate",
"joint": "knee",
"topic": "Mimics",
"difficulty": 1,
"prompt": "How do you describe meniscal flounce so it is not reported as a tear or displaced fragment?",
"model": "There is a smooth, undulating fold of the free edge of the medial meniscus, with normal internal meniscal signal and intact margins. This is a meniscal flounce, a normal redundant folding of the meniscus seen in extension, and is not associated with an underlying tear; no surfacing signal or displaced fragment is identified.",
"keyterms": [
{
"label": "meniscal flounce",
"patterns": [
"flounce"
],
"why": "Names the normal undulating fold."
},
{
"label": "smooth undulation",
"patterns": [
"undulat\\w+",
"fold",
"wav\\w+",
"ruffl\\w+"
],
"why": "Smooth folding distinguishes it from a tear."
},
{
"label": "free edge",
"patterns": [
"free\\s+edge",
"inner\\s+(free\\s+)?margin"
],
"why": "Flounce involves the inner free margin."
},
{
"label": "medial meniscus",
"patterns": [
"medial\\s+meniscus"
],
"why": "Most commonly seen medially."
},
{
"label": "no surfacing signal",
"patterns": [
"no\\s+surfac\\w+\\s+signal",
"normal\\s+(internal\\s+)?signal",
"intact"
],
"why": "Normal signal excludes a tear."
},
{
"label": "not a tear",
"patterns": [
"not\\s+a\\s+tear",
"normal"
],
"why": "Avoids over-calling a tear/fragment."
}
],
"id": 148
},
{
"type": "dictate",
"joint": "ankle",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe a well-corticated ossicle behind the talus so it is not called a fracture (and distinguish it from a Stieda process)?",
"model": "Posterior to the talus there is a well-corticated, rounded ossicle with smooth margins separated from the posterolateral talar process by a smooth corticated cleft, without marrow edema. This is consistent with an os trigonum (an unfused ossification center) rather than an acute fracture. A Stieda process would be an elongated posterolateral talar process in bony continuity with the talus; here the corticated separation favors an os trigonum, though it may become symptomatic in os trigonum syndrome.",
"keyterms": [
{
"label": "os trigonum",
"patterns": [
"os\\s+trigonum"
],
"why": "Names the accessory ossicle behind the talus."
},
{
"label": "well-corticated",
"patterns": [
"well[-\\s]?cortic\\w+",
"corticated\\s+margins",
"smooth\\s+cortex"
],
"why": "Corticated margins distinguish it from acute fracture."
},
{
"label": "Stieda process",
"patterns": [
"stieda"
],
"why": "Elongated talar process in continuity—the key DDx."
},
{
"label": "posterolateral talus",
"patterns": [
"posterolateral\\s+(talar|talus)\\s*(process)?",
"posterior\\s+to\\s+the\\s+talus"
],
"why": "The relevant location."
},
{
"label": "no marrow edema",
"patterns": [
"no\\s+marrow\\s+edema",
"without\\s+edema",
"no\\s+bone\\s+marrow\\s+edema"
],
"why": "Edema would suggest fracture or os trigonum syndrome."
},
{
"label": "corticated cleft",
"patterns": [
"corticated\\s+(cleft|separation|synchondrosis)",
"synchondrosis",
"smooth\\s+(cleft|separation)"
],
"why": "A smooth synchondrosis favors a variant over a fracture line."
}
],
"id": 149
},
{
"type": "dictate",
"joint": "foot",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe an accessory navicular at the PTT insertion so it is not over-called and the type is specified?",
"model": "There is an accessory ossicle at the medial aspect of the navicular at the posterior tibial tendon insertion, separated from the navicular tuberosity by a corticated synchondrosis. This is a type II accessory navicular (os naviculare); a type I is a small separate sesamoid within the PTT, and a type III (cornuate navicular) is fused. Marrow edema across the synchondrosis would suggest a symptomatic/stressed synchondrosis rather than a normal incidental variant.",
"keyterms": [
{
"label": "accessory navicular",
"patterns": [
"accessory\\s+navicular",
"os\\s+naviculare",
"os\\s+tibiale\\s+externum"
],
"why": "Names the variant at the PTT insertion."
},
{
"label": "type II",
"patterns": [
"type\\s*(II|2)\\b"
],
"why": "Type II has a synchondrosis and is most often symptomatic."
},
{
"label": "synchondrosis",
"patterns": [
"synchondrosis",
"corticated\\s+(cleft|junction)",
"cartilaginous\\s+junction"
],
"why": "The fibrocartilaginous junction defines type II."
},
{
"label": "posterior tibial tendon",
"patterns": [
"posterior\\s+tibial\\s+tendon",
"PTT"
],
"why": "The PTT inserts at/near the accessory navicular."
},
{
"label": "marrow edema if symptomatic",
"patterns": [
"marrow\\s+edema",
"edema\\s+across\\s+the\\s+synchondrosis",
"stress"
],
"why": "Edema indicates a stressed/symptomatic synchondrosis."
},
{
"label": "navicular tuberosity",
"patterns": [
"navicular\\s+tuberosity",
"medial\\s+(aspect\\s+of\\s+the\\s+)?navicular"
],
"why": "Location of the ossicle."
}
],
"id": 150
},
{
"type": "dictate",
"joint": "foot",
"topic": "Mimics",
"difficulty": 1,
"prompt": "How do you describe the os peroneum so it is not mistaken for an avulsion fracture or intratendinous tear?",
"model": "There is a well-corticated ossicle within the peroneus longus tendon at the level of the cuboid/calcaneocuboid groove, consistent with a normal os peroneum. It has smooth corticated margins without marrow edema or tendon fiber disruption. Migration, fragmentation, or a wide diastasis would raise concern for the painful os peroneum syndrome or peroneus longus tear.",
"keyterms": [
{
"label": "os peroneum",
"patterns": [
"os\\s+peroneum"
],
"why": "Names the sesamoid in peroneus longus."
},
{
"label": "peroneus longus",
"patterns": [
"peroneus\\s+longus"
],
"why": "The os peroneum lies within this tendon."
},
{
"label": "cuboid groove",
"patterns": [
"cuboid",
"calcaneocuboid",
"cuboid\\s+(groove|tunnel)"
],
"why": "Typical location at the lateral cuboid."
},
{
"label": "well-corticated",
"patterns": [
"well[-\\s]?cortic\\w+",
"smooth\\s+cortex",
"corticated\\s+margins"
],
"why": "Corticated favors a normal sesamoid over avulsion."
},
{
"label": "no fiber disruption",
"patterns": [
"no\\s+(tendon\\s+)?fiber\\s+disruption",
"intact\\s+tendon",
"no\\s+tear"
],
"why": "Excludes intratendinous tear."
},
{
"label": "os peroneum syndrome",
"patterns": [
"os\\s+peroneum\\s+syndrome",
"migrat\\w+",
"diastasis|fragment"
],
"why": "Migration/fragmentation indicates pathology."
}
],
"id": 151
},
{
"type": "dictate",
"joint": "ankle",
"topic": "Mimics",
"difficulty": 3,
"prompt": "How do you describe increased signal in the peroneal/posterior tibial tendons that is due to magic-angle so it is not called tendinosis or a tear?",
"model": "There is mildly increased intratendinous signal in the peroneal tendons as they curve around the lateral malleolus, seen on the short-TE (T1/proton-density) sequence where the tendon lies near 55 degrees to the main magnetic field. The signal resolves on the long-TE (T2) sequence and there is no tendon thickening or fiber discontinuity. This is magic-angle artifact and should not be mistaken for tendinosis or a tear.",
"keyterms": [
{
"label": "magic-angle",
"patterns": [
"magic[-\\s]?angle"
],
"why": "Names the artifact causing intratendinous signal."
},
{
"label": "55 degrees",
"patterns": [
"55\\s*(degrees|°)",
"fifty[-\\s]?five"
],
"why": "Signal peaks where the tendon is ~55° to B0."
},
{
"label": "short-TE only",
"patterns": [
"short[-\\s]?TE",
"T1|proton[-\\s]?density|PD",
"low\\s+TE"
],
"why": "Artifact appears on short-TE sequences."
},
{
"label": "resolves on T2",
"patterns": [
"resolves?\\s+on\\s+(the\\s+)?(long[-\\s]?TE|T2)",
"long[-\\s]?TE",
"disappears\\s+on\\s+T2"
],
"why": "Resolution on long-TE confirms artifact."
},
{
"label": "curving tendon",
"patterns": [
"curv\\w+",
"around\\s+the\\s+(lateral\\s+)?malleolus",
"retromalleolar"
],
"why": "Curvature places fibers near 55°."
},
{
"label": "no thickening or discontinuity",
"patterns": [
"no\\s+thickening",
"no\\s+(fiber\\s+)?discontinuity",
"normal\\s+caliber"
],
"why": "Real tendinosis/tear thickens or disrupts fibers."
}
],
"id": 152
},
{
"type": "dictate",
"joint": "elbow",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe the pseudodefect of the capitellum so it is not called an osteochondral lesion?",
"model": "At the posterolateral margin of the capitellum, at the junction of the capitellum and the lateral epicondyle, there is a normal abrupt change in contour (a groove between the articular capitellum and the non-articular lateral epicondyle) with intact overlying cartilage and no marrow edema. This is the normal pseudodefect of the capitellum and should not be mistaken for an osteochondral defect or osteochondritis dissecans, which characteristically involves the anterior/central capitellum.",
"keyterms": [
{
"label": "pseudodefect of the capitellum",
"patterns": [
"pseudo[-\\s]?defect.*capitell\\w+",
"capitell\\w+.*pseudo[-\\s]?defect"
],
"why": "Names the normal posterolateral contour change."
},
{
"label": "posterolateral capitellum",
"patterns": [
"posterolateral\\s+capitell\\w+",
"junction.*lateral\\s+epicondyle"
],
"why": "The pseudodefect lies posterolaterally."
},
{
"label": "not OCD",
"patterns": [
"not\\s+(an\\s+)?(osteochondr\\w+|OCD)",
"osteochondritis\\s+dissecans",
"osteochondral\\s+(defect|lesion)"
],
"why": "True OCD involves anterior/central capitellum."
},
{
"label": "intact cartilage",
"patterns": [
"intact\\s+(overlying\\s+)?cartilage",
"cartilage\\s+(is\\s+)?intact"
],
"why": "Preserved cartilage favors a variant."
},
{
"label": "no marrow edema",
"patterns": [
"no\\s+marrow\\s+edema",
"without\\s+edema"
],
"why": "Edema would suggest a true osteochondral lesion."
},
{
"label": "anterior/central is real",
"patterns": [
"anterior.*central",
"central.*capitell\\w+",
"mid[-\\s]?capitell\\w+"
],
"why": "Real OCD is anterior/central, not posterolateral."
}
],
"id": 153
},
{
"type": "dictate",
"joint": "elbow",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe the trochlear groove/pseudodefect and normal trochlear notch so they are not called erosions?",
"model": "There is a normal transverse trochlear groove (the bare area of the trochlear notch dividing it into anterior and posterior facets) with smooth corticated margins and intact adjacent cartilage. This is a normal anatomic bare area, not an erosion or osteochondral lesion. No marrow edema or subchondral cyst is present.",
"keyterms": [
{
"label": "trochlear groove",
"patterns": [
"trochlear\\s+(groove|notch)",
"transverse\\s+trochlear"
],
"why": "Names the normal bare area dividing the notch."
},
{
"label": "bare area",
"patterns": [
"bare\\s+area"
],
"why": "Cartilage-deficient zone that mimics erosion."
},
{
"label": "anterior and posterior facets",
"patterns": [
"anterior\\s+and\\s+posterior\\s+facet",
"two\\s+facets",
"facets"
],
"why": "The groove separates the two articular facets."
},
{
"label": "smooth cortex",
"patterns": [
"smooth\\s+cortic\\w+",
"corticated",
"well[-\\s]?defined"
],
"why": "Smooth margins favor a variant over an erosion."
},
{
"label": "not an erosion",
"patterns": [
"not\\s+an\\s+erosion",
"no\\s+erosion",
"not.*osteochondral"
],
"why": "Avoids over-calling inflammatory erosion."
},
{
"label": "no marrow edema",
"patterns": [
"no\\s+marrow\\s+edema",
"no\\s+subchondral\\s+(cyst|edema)"
],
"why": "Absence of edema/cyst supports normal."
}
],
"id": 154
},
{
"type": "dictate",
"joint": "wrist",
"topic": "Mimics",
"difficulty": 2,
"prompt": "How do you describe age-related central TFCC thinning so it is not over-called as a traumatic perforation?",
"model": "There is thinning with intermediate signal at the central/radial portion of the triangular fibrocartilage articular disc, without fluid-signal full-thickness defect and with smooth margins. In a patient of this age, this is consistent with degenerative/age-related central TFCC thinning (a Palmer 2 degenerative spectrum / normal aging change) rather than an acute traumatic (Palmer 1) peripheral perforation; the peripheral/ulnar attachments are intact.",
"keyterms": [
{
"label": "central TFCC thinning",
"patterns": [
"central\\s+TFCC",
"central.*triangular\\s+fibrocartilage",
"central\\s+disc"
],
"why": "Age-related thinning occurs centrally/radially."
},
{
"label": "degenerative/age-related",
"patterns": [
"degenerative",
"age[-\\s]?related",
"aging"
],
"why": "Central thinning is degenerative, not traumatic."
},
{
"label": "peripheral attachments intact",
"patterns": [
"peripher\\w+.*intact",
"ulnar\\s+(attachment|insertion).*intact",
"foveal\\s+attachment"
],
"why": "Traumatic tears typically affect the periphery."
},
{
"label": "no full-thickness fluid defect",
"patterns": [
"no\\s+full[-\\s]?thickness",
"no\\s+fluid[-\\s]?signal\\s+defect",
"no\\s+perforation"
],
"why": "A discrete fluid-filled defect suggests a true tear."
},
{
"label": "Palmer classification",
"patterns": [
"palmer",
"class\\s*(1|2|I|II)"
],
"why": "Palmer 1 traumatic vs Palmer 2 degenerative."
},
{
"label": "triangular fibrocartilage",
"patterns": [
"triangular\\s+fibrocartilage",
"TFCC",
"articular\\s+disc"
],
"why": "The structure in question."
}
],
"id": 155
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Mimics",
"difficulty": 1,
"prompt": "On MR arthrography, which feature most favors a normal sublabral recess over a SLAP tear?",
"choices": [
"Contrast extending laterally into the labral substance",
"A smooth, medially-oriented cleft following the glenoid contour at 12 o'clock",
"Extension posterior to the biceps anchor",
"Irregular margins with a paralabral cyst"
],
"answer": 1,
"explain": "A sublabral recess is smooth and medially oriented, paralleling the glenoid at the superior labrum. Lateral extension, posterior-to-anchor extension, irregular margins, or a paralabral cyst favor a true SLAP tear.",
"id": 156
},
{
"type": "mcq",
"joint": "shoulder",
"topic": "Mimics",
"difficulty": 1,
"prompt": "A Buford complex consists of which two findings?",
"choices": [
"Absent anteroinferior labrum and torn IGHL",
"Cord-like middle glenohumeral ligament and congenital absence of the anterosuperior labrum",
"Thickened biceps anchor and SLAP tear",
"Sublabral foramen and a Bankart lesion"
],
"answer": 1,
"explain": "A Buford complex is a cord-like MGHL with congenital absence of the anterosuperior labrum. Mistaking it for a tear and surgically repairing it can compromise motion/stability.",
"id": 157
},
{
"type": "mcq",
"joint": "knee",
"topic": "Mimics",
"difficulty": 1,
"prompt": "A cleft of signal at the anterior horn of the lateral meniscus that turns out to be normal is most often caused by the insertion of which structure?",
"choices": [
"Anterior cruciate ligament",
"Transverse (intermeniscal) ligament",
"Popliteus tendon",
"Fabella"
],
"answer": 1,
"explain": "The transverse intermeniscal ligament inserts on the anterior horn of the lateral meniscus, creating a junctional pseudotear. Tracing the ligament on contiguous slices confirms the variant.",
"id": 158
},
{
"type": "mcq",
"joint": "knee",
"topic": "Mimics",
"difficulty": 2,
"prompt": "The ligament of Humphrey and the ligament of Wrisberg are distinguished by their relationship to which structure?",
"choices": [
"The ACL",
"The PCL",
"The medial collateral ligament",
"The patellar tendon"
],
"answer": 1,
"explain": "Both are meniscofemoral ligaments from the posterior horn of the lateral meniscus to the medial femoral condyle. Humphrey runs anterior to the PCL; Wrisberg runs posterior to it. Both can mimic a posterior horn tear.",
"id": 159
},
{
"type": "mcq",
"joint": "ankle",
"topic": "Mimics",
"difficulty": 1,
"prompt": "What best distinguishes an os trigonum from a Stieda process?",
"choices": [
"An os trigonum is anterior to the talus",
"A Stieda process is a separate ossicle with a corticated cleft",
"An os trigonum is a separate ossicle, whereas a Stieda process is an elongated posterolateral talar process in bony continuity with the talus",
"Only the os trigonum can ever be symptomatic"
],
"answer": 2,
"explain": "An os trigonum is a separate, corticated ossicle (unfused ossification center); a Stieda process is an elongated posterolateral talar process continuous with the talus. Either can cause posterior impingement.",
"id": 160
},
{
"type": "mcq",
"joint": "foot",
"topic": "Mimics",
"difficulty": 2,
"prompt": "Which type of accessory navicular has a synchondrosis with the navicular and is most often symptomatic?",
"choices": [
"Type I (os tibiale externum within the PTT)",
"Type II",
"Type III (cornuate navicular)",
"All types are fused"
],
"answer": 1,
"explain": "Type II accessory navicular connects to the tuberosity via a fibrocartilaginous synchondrosis and is the type most prone to symptoms; marrow edema across the synchondrosis suggests it is the pain source.",
"id": 161
},
{
"type": "mcq",
"joint": "general",
"topic": "Mimics",
"difficulty": 2,
"prompt": "Magic-angle artifact in tendons is best characterized by which combination?",
"choices": [
"High signal on long-TE images that persists on all sequences",
"Increased signal on short-TE (low-TE) images when the tendon lies near 55 degrees to B0, resolving on T2",
"Signal only when the tendon is parallel to B0",
"Tendon thickening with fiber disruption"
],
"answer": 1,
"explain": "Magic-angle artifact produces increased intratendinous signal on short-TE (T1/PD) sequences when collagen fibers are oriented ~55 degrees to the main field; it resolves on long-TE (T2) images and lacks thickening or fiber disruption.",
"id": 162
},
{
"type": "mcq",
"joint": "elbow",
"topic": "Mimics",
"difficulty": 2,
"prompt": "The pseudodefect of the capitellum is located where, and how is it distinguished from osteochondritis dissecans?",
"choices": [
"Anterior capitellum; OCD is posterior",
"Posterolateral capitellum at the capitellum-lateral epicondyle junction; true OCD involves the anterior/central capitellum",
"Central capitellum; identical to OCD",
"Radial head; OCD spares cartilage"
],
"answer": 1,
"explain": "The pseudodefect is a normal contour change at the posterolateral capitellum (junction with the non-articular lateral epicondyle). OCD characteristically involves the anterior/central capitellum and shows marrow edema and cartilage abnormality.",
"id": 163
},
{
"type": "cloze",
"joint": "hip",
"topic": "Mimics",
"difficulty": 2,
"prompt": "A small subcortical lucency/cyst at the anterosuperior femoral head-neck junction, often associated with cam-type morphology, is called a herniation ___.",
"answers": [
"pit",
"herniation pit"
],
"explain": "A herniation pit (fibrocystic change) is a well-corticated subcortical lucency at the anterosuperior head-neck junction; it can be incidental but is associated with FAI/cam morphology and should not be mistaken for an aggressive lesion.",
"id": 164
},
{
"type": "cloze",
"joint": "hip",
"topic": "Mimics",
"difficulty": 2,
"prompt": "A horizontal band of low T1 signal across the femoral neck representing the residuum of the growth plate is the physeal ___.",
"answers": [
"scar",
"physeal scar",
"physeal line"
],
"explain": "The physeal scar is the normal residual line of the closed growth plate, low signal on T1, and should not be mistaken for a fracture or sclerotic lesion.",
"id": 165
},
{
"type": "cloze",
"joint": "general",
"topic": "Mimics",
"difficulty": 2,
"prompt": "On T1-weighted images, normal hematopoietic (red) marrow should remain ___ to or higher than skeletal muscle/intervertebral disc; signal below this raises concern for marrow replacement.",
"answers": [
"isointense",
"equal",
"iso"
],
"explain": "Normal red marrow is isointense to or brighter than muscle on T1. Marrow that is hypointense to muscle/disc on T1 is the key flag for true marrow-replacing disease, helping distinguish normal red marrow reconversion from pathology.",
"id": 166
},
{
"type": "cloze",
"joint": "wrist",
"topic": "Mimics",
"difficulty": 2,
"prompt": "A persistent ___ artery accompanying a bifid median nerve in the carpal tunnel is a normal vascular variant that can be mistaken for a mass.",
"answers": [
"median",
"persistent median"
],
"explain": "A persistent median artery often accompanies a bifid median nerve; on MR/US it is a normal tubular vascular structure and should not be mistaken for a ganglion or nerve sheath tumor.",
"id": 167
},
{
"type": "cloze",
"joint": "elbow",
"topic": "Mimics",
"difficulty": 2,
"prompt": "Using the CRITOE ossification order, an ossific fragment near the medial elbow in a child before the trochlea ossifies should raise concern for an avulsed medial ___ rather than a normal ossification center.",
"answers": [
"epicondyle",
"epicondylar",
"internal epicondyle"
],
"explain": "In CRITOE (Capitellum, Radial head, Internal/medial epicondyle, Trochlea, Olecranon, External/lateral epicondyle), the internal (medial) epicondyle ossifies before the trochlea. A 'trochlear' ossicle without a visible medial epicondyle suggests a displaced/avulsed medial epicondyle.",
"id": 168
},
{"id":169,"type":"dictate","joint":"knee","topic":"Cartilage grading - Grade 3","difficulty":2,"prompt":"How would you describe a grade 3 (modified Outerbridge) cartilage lesion of the weight-bearing medial femoral condyle?","keyterms":[{"label":"Grade 3 (ICRS 3)","why":"Modified Outerbridge grade 3 corresponds to ICRS grade 3.","patterns":["grade\\s*3","outerbridge","icrs\\s*3"]},{"label":">50% depth, not to bone","why":"Grade 3 = fissuring/loss extending >50% of cartilage thickness but not exposing subchondral bone.","patterns":[">\\s*50%|greater than 50","not (?:reaching|extending|down) to (?:the )?(?:subchondral )?bone","partial[- ]thickness"]},{"label":"Fissuring/cartilage loss","why":"Describe the chondral surface morphology.","patterns":["fissur","chondral (?:loss|defect)|cartilage loss"]},{"label":"Location","why":"Localize to compartment/surface.","patterns":["medial femoral condyle|weight[- ]bearing"]},{"label":"Size in mm","why":"Measure the defect width/area.","patterns":["\\d+\\s*mm","measuring"]},{"label":"Subchondral marrow","why":"Comment on presence/absence of subchondral BME.","patterns":["subchondral","marrow edema|bone marrow edema|bme"]}],"model":"There is a focal grade 3 chondral lesion (ICRS 3) along the weight-bearing medial femoral condyle, with fissuring and partial-thickness cartilage loss extending greater than 50% of the cartilage thickness but not reaching the subchondral bone, measuring approximately 9 mm in width. Mild underlying subchondral marrow edema is present."},
{"id":170,"type":"dictate","joint":"knee","topic":"Cartilage grading - Grade 4","difficulty":2,"prompt":"How would you describe a grade 4 (modified Outerbridge) full-thickness cartilage defect with subchondral changes?","keyterms":[{"label":"Grade 4 (ICRS 4)","why":"Outerbridge grade 4 = full-thickness loss to bone; ICRS 4 analog.","patterns":["grade\\s*4","icrs\\s*4"]},{"label":"Full-thickness to bone","why":"Grade 4 exposes subchondral bone.","patterns":["full[- ]thickness","down to (?:the )?(?:subchondral )?bone|exposing (?:the )?(?:subchondral )?bone"]},{"label":"Subchondral bone exposure/edema","why":"Note reactive subchondral marrow edema and possible cysts.","patterns":["subchondral","marrow edema|bone marrow edema","cyst"]},{"label":"Location","why":"Localize the defect.","patterns":["trochlea|patella|femoral condyle|tibial plateau"]},{"label":"Size in mm","why":"Measure the defect.","patterns":["\\d+\\s*mm","measuring"]}],"model":"There is a focal grade 4 full-thickness chondral defect (ICRS 4) of the lateral trochlea, with cartilage loss extending down to the subchondral bone, measuring approximately 12 mm. There is reactive subchondral marrow edema with a small subchondral cyst."},
{"id":171,"type":"dictate","joint":"knee","topic":"Cartilage repair - MOCART","difficulty":3,"prompt":"How would you describe a postoperative cartilage repair site using MOCART concepts?","keyterms":[{"label":"MOCART","why":"MOCART scores cartilage repair tissue on MRI.","patterns":["mocart","cartilage repair"]},{"label":"Degree of fill","why":"Describe defect fill of the repair tissue.","patterns":["fill","(?:complete|incomplete|hypertrophic) fill|flush with"]},{"label":"Integration/border zone","why":"Assess integration to native cartilage.","patterns":["integrat","border zone|fissure at the (?:margin|interface)"]},{"label":"Surface","why":"Repair tissue surface should be intact/congruent.","patterns":["surface","congruent|intact surface"]},{"label":"Subchondral lamina/bone","why":"Assess subchondral plate, edema, cysts.","patterns":["subchondral","edema|cyst|lamina"]}],"model":"At the cartilage repair site in the medial femoral condyle, the repair tissue demonstrates complete fill flush with the adjacent native cartilage and good integration at the border zone without a marginal fissure. The repair surface is intact and congruent. The subchondral lamina is preserved with only mild subchondral marrow edema and no subchondral cyst, findings favorable on MOCART assessment."},
{"id":172,"type":"dictate","joint":"elbow","topic":"LUCL tear / PLRI","difficulty":3,"prompt":"How would you describe a tear of the lateral ulnar collateral ligament (LUCL) of the elbow in MRI terms?","keyterms":[{"label":"LUCL","why":"Name the lateral ulnar collateral ligament, the key PLRI restraint.","patterns":["lateral ulnar collateral ligament","lucl"]},{"label":"Humeral origin avulsion","why":"LUCL classically tears from its humeral (lateral epicondyle) origin.","patterns":["humeral origin|lateral epicondyle","avuls|detach"]},{"label":"Discontinuity/full-thickness","why":"Describe fiber discontinuity and tear completeness.","patterns":["full[- ]thickness|complete tear","discontinu|fiber disruption"]},{"label":"T2 hyperintensity/fluid","why":"Edema/fluid at the torn ligament.","patterns":["t2 hyperintens|fluid[- ]?signal|fluid signal","edema"]},{"label":"PLRI","why":"Clinical correlate is posterolateral rotatory instability.","patterns":["posterolateral rotatory instability","plri"]}],"model":"There is a full-thickness tear of the lateral ulnar collateral ligament (LUCL) at its humeral origin from the lateral epicondyle, with fiber discontinuity and surrounding T2 hyperintense fluid signal and edema. Findings predispose to posterolateral rotatory instability (PLRI)."},
{"id":173,"type":"dictate","joint":"elbow","topic":"UCL tear (Tommy John)","difficulty":3,"prompt":"How would you describe a tear of the ulnar collateral ligament (UCL) anterior bundle of the elbow?","keyterms":[{"label":"UCL anterior bundle","why":"Anterior bundle of the UCL is the primary valgus restraint.","patterns":["ulnar collateral ligament|ucl","anterior bundle"]},{"label":"Sublime tubercle / distal","why":"Distal tears occur at the sublime tubercle insertion.","patterns":["sublime tubercle","distal (?:insertion|attachment)"]},{"label":"T sign / partial undersurface","why":"Partial undersurface tear shows the T sign on arthrography.","patterns":["t sign","partial[- ]?(?:thickness)?\\s*(?:undersurface|under[- ]?surface)"]},{"label":"Full vs partial","why":"Specify completeness of the tear.","patterns":["full[- ]thickness|complete tear","partial[- ]thickness"]},{"label":"Edema/fluid","why":"Note periligamentous edema/fluid.","patterns":["edema","t2 hyperintens|fluid signal"]}],"model":"There is a partial-thickness undersurface tear of the anterior bundle of the ulnar collateral ligament (UCL) at the distal sublime tubercle attachment, demonstrating a T sign with contrast/fluid signal tracking along the undersurface and surrounding edema. The ligament is otherwise in continuity without full-thickness disruption."},
{"id":174,"type":"dictate","joint":"elbow","topic":"Common extensor tendinosis","difficulty":1,"prompt":"How would you describe lateral epicondylitis (common extensor tendinosis) on MRI?","keyterms":[{"label":"Common extensor origin","why":"Lateral epicondylitis involves the common extensor tendon origin.","patterns":["common extensor (?:tendon|origin)","lateral epicondyle"]},{"label":"Tendinosis (thickening/signal)","why":"Tendinosis = thickening with intermediate signal, no discrete tear.","patterns":["tendinosis|tendinopathy","thicken"]},{"label":"Intermediate/T2 signal","why":"Intrasubstance signal without fluid-signal cleft.","patterns":["intermediate signal|intrasubstance signal","t2 hyperintens"]},{"label":"No full-thickness tear","why":"Distinguish tendinosis from tear.","patterns":["no (?:full[- ]thickness )?tear|without (?:a )?tear|without a discrete tear|no discrete tear"]}],"model":"There is thickening and intermediate-to-T2 hyperintense intrasubstance signal within the common extensor tendon origin at the lateral epicondyle, consistent with common extensor tendinosis (lateral epicondylitis), without a discrete tear."},
{"id":175,"type":"dictate","joint":"shoulder","topic":"Partial articular-sided cuff tear","difficulty":2,"prompt":"How would you describe a partial articular-surface supraspinatus tear with depth measurement?","keyterms":[{"label":"Partial articular-sided","why":"Specify partial-thickness articular (undersurface) tear; PASTA lesion.","patterns":["partial[- ]thickness","articular[- ]?(?:sided|surface)|undersurface|pasta"]},{"label":"Supraspinatus","why":"Name the involved tendon.","patterns":["supraspinatus"]},{"label":"Depth in mm/%","why":"Quantify tear depth relative to footprint.","patterns":["\\d+\\s*mm","\\d+\\s*%|percent"]},{"label":"Footprint/insertion","why":"Localize at the footprint near the greater tuberosity.","patterns":["footprint","greater tuberosity|insertion"]},{"label":"Fluid signal","why":"Fluid-signal cleft within the tendon.","patterns":["fluid[- ]?signal|fluid signal","t2 hyperintens"]}],"model":"There is a partial-thickness articular-sided (PASTA) tear of the supraspinatus at its footprint on the greater tuberosity, with fluid signal extending into the tendon undersurface to a depth of approximately 5 mm, involving roughly 40% of the tendon thickness."},
{"id":176,"type":"dictate","joint":"shoulder","topic":"Full-thickness cuff tear with retraction","difficulty":3,"prompt":"How would you describe a full-thickness supraspinatus tear with retraction and fatty atrophy?","keyterms":[{"label":"Full-thickness tear","why":"Tear extends through both surfaces.","patterns":["full[- ]thickness","complete tear"]},{"label":"Retraction measurement","why":"Measure tendon retraction (e.g. to glenoid).","patterns":["retract","\\d+\\s*(?:mm|cm)"]},{"label":"Patte stage","why":"Patte classifies retraction in the coronal plane.","patterns":["patte"]},{"label":"Goutallier fatty atrophy","why":"Goutallier grades fatty muscle degeneration.","patterns":["goutallier","fatty (?:atrophy|infiltration|degeneration)"]},{"label":"Tear width / AP","why":"Measure tear in AP/mediolateral dimension.","patterns":["\\d+\\s*(?:mm|cm)","anteroposterior|ap dimension|width"]},{"label":"Supraspinatus","why":"Name the tendon.","patterns":["supraspinatus"]}],"model":"There is a full-thickness tear of the supraspinatus measuring approximately 2.5 cm in the anteroposterior width, with tendon retraction to the level of the glenoid (Patte stage 3) and moderate Goutallier grade 3 fatty atrophy of the supraspinatus muscle belly."},
{"id":177,"type":"dictate","joint":"shoulder","topic":"SLAP tear","difficulty":2,"prompt":"How would you describe a superior labral anterior-posterior (SLAP) tear on MR arthrography?","keyterms":[{"label":"SLAP / superior labrum","why":"Name the superior labral anterior-posterior tear.","patterns":["slap","superior labr"]},{"label":"Biceps anchor","why":"SLAP involves the biceps-labral anchor.","patterns":["biceps anchor|biceps[- ]labral|labral[- ]biceps"]},{"label":"Contrast/fluid undercutting","why":"Contrast extends into the superior labrum.","patterns":["contrast|fluid signal","undercut|extend(?:s|ing)? (?:into|beneath)"]},{"label":"Type II","why":"Specify SLAP type (II = detachment of anchor).","patterns":["type ii|type 2"]},{"label":"Posterior to anterior","why":"Note AP extent.","patterns":["anterior","posterior"]}],"model":"There is a type II SLAP tear with contrast undercutting the superior labrum at the biceps anchor, extending from anterior to posterior to the biceps-labral complex, separating the labrum from the superior glenoid rim."},
{"id":178,"type":"dictate","joint":"shoulder","topic":"Bankart and Hill-Sachs","difficulty":3,"prompt":"How would you describe an anteroinferior labral tear (Bankart) with a Hill-Sachs lesion after anterior dislocation?","keyterms":[{"label":"Bankart / anteroinferior labrum","why":"Anteroinferior labral tear from anterior dislocation.","patterns":["bankart","anteroinferior labr|antero[- ]inferior labr"]},{"label":"Hill-Sachs","why":"Posterosuperior humeral head impaction.","patterns":["hill[- ]sachs","posterosuperior|postero[- ]superior"]},{"label":"Hill-Sachs measurement","why":"Measure the impaction defect.","patterns":["\\d+\\s*mm","measuring"]},{"label":"Glenoid bone loss","why":"Quantify any anteroinferior glenoid bone loss.","patterns":["glenoid bone loss|bony bankart","\\d+\\s*%|percent"]},{"label":"Impaction fracture","why":"Hill-Sachs is an impaction fracture.","patterns":["impaction (?:fracture|defect|deformity)"]}],"model":"There is an anteroinferior labral tear (Bankart lesion) with a small bony Bankart and approximately 10% anteroinferior glenoid bone loss. There is a corresponding Hill-Sachs impaction fracture along the posterosuperior humeral head measuring approximately 14 mm in width, consistent with prior anterior dislocation."},
{"id":179,"type":"dictate","joint":"knee","topic":"Meniscus tear morphology","difficulty":2,"prompt":"How would you describe a meniscal tear specifying morphology and surface extension?","keyterms":[{"label":"Surface extension","why":"Tear must contact an articular surface on a fluid-sensitive sequence.","patterns":["articular surface|extend(?:s|ing)? to the (?:inferior|superior) (?:articular )?surface","surface[- ]reaching"]},{"label":"Morphology","why":"Name tear pattern (horizontal, oblique, radial, complex).","patterns":["horizontal|oblique|radial|complex|longitudinal","flap"]},{"label":"Location (zone/horn)","why":"Localize to posterior/anterior horn or body, medial/lateral.","patterns":["posterior horn|anterior horn|body","medial meniscus|lateral meniscus"]},{"label":"T2 signal","why":"Increased signal reaching surface.","patterns":["t2 hyperintens|increased signal|high signal"]},{"label":"Displaced fragment","why":"Note any displaced/flap fragment if present.","patterns":["displaced|flap","fragment"]}],"model":"There is an oblique tear of the posterior horn of the medial meniscus with increased T2 hyperintense signal extending to the inferior articular surface. No displaced fragment is identified and meniscal morphology is otherwise maintained."},
{"id":180,"type":"dictate","joint":"knee","topic":"Meniscal root tear and extrusion","difficulty":3,"prompt":"How would you describe a posterior medial meniscal root tear with extrusion?","keyterms":[{"label":"Posterior root","why":"Name the posterior meniscal root attachment.","patterns":["posterior (?:medial )?(?:meniscal )?root","root (?:tear|attachment|avulsion)"]},{"label":"Radial/avulsion","why":"Root tears are typically radial or avulsive.","patterns":["radial","avuls"]},{"label":"Extrusion mm","why":"Measure meniscal extrusion (>3 mm significant).","patterns":["extru","\\d+\\s*mm"]},{"label":"Ghost sign / cleft","why":"Vertical cleft / ghost sign of the root.","patterns":["ghost sign","cleft|gap"]},{"label":"Insufficiency/load","why":"Functional consequence akin to total meniscectomy.","patterns":["meniscectomy|hoop|insufficien|load"]}],"model":"There is a radial tear/avulsion of the posterior root of the medial meniscus with a vertical cleft (ghost sign) at the root attachment and associated medial meniscal extrusion measuring 5 mm, functionally equivalent to a total meniscectomy with loss of hoop stress."},
{"id":181,"type":"dictate","joint":"knee","topic":"ACL tear primary/secondary signs","difficulty":2,"prompt":"How would you describe a complete ACL tear including primary and secondary signs?","keyterms":[{"label":"ACL discontinuity","why":"Primary sign is fiber discontinuity/nonvisualization.","patterns":["anterior cruciate ligament|acl","discontinu|nonvisuali|fiber disruption|complete tear"]},{"label":"Abnormal angle/orientation","why":"Loss of normal taut fiber orientation.","patterns":["abnormal (?:angle|orientation|contour)|horizontal orientation|wavy"]},{"label":"Pivot-shift bone bruises","why":"Lateral femoral condyle and posterolateral tibia contusions.","patterns":["lateral femoral condyle","posterolateral tibia|posterior lateral tibial"]},{"label":"Anterior translation","why":"Secondary sign of anterior tibial translation.","patterns":["anterior (?:tibial )?translation|anterior drawer"]},{"label":"PCL buckling / Segond","why":"Secondary signs: PCL buckling, Segond fracture.","patterns":["pcl buckl|buckled pcl","segond"]}],"model":"There is complete discontinuity of the anterior cruciate ligament with an abnormal horizontal orientation of the residual fibers. Secondary signs include pivot-shift bone contusions of the lateral femoral condyle and posterolateral tibia, anterior tibial translation, and a buckled PCL."},
{"id":182,"type":"dictate","joint":"knee","topic":"MCL sprain grading","difficulty":1,"prompt":"How would you describe MCL injury using grades I, II, and III?","keyterms":[{"label":"MCL","why":"Name the medial collateral ligament.","patterns":["medial collateral ligament|mcl"]},{"label":"Grade I","why":"Grade I = periligamentous edema, intact fibers.","patterns":["grade (?:i|1)\\b","periligamentous edema|sprain"]},{"label":"Grade II partial","why":"Grade II = partial tear with some fiber disruption.","patterns":["grade (?:ii|2)\\b","partial[- ](?:thickness )?tear"]},{"label":"Grade III complete","why":"Grade III = complete disruption.","patterns":["grade (?:iii|3)\\b","complete (?:tear|disruption)|full[- ]thickness"]},{"label":"Fiber integrity","why":"Comment on fiber continuity.","patterns":["fiber","continu|disrupt"]}],"model":"Grade I MCL injury shows periligamentous edema with intact fibers; grade II shows partial-thickness tear with some fiber disruption but maintained continuity; grade III represents complete disruption of the medial collateral ligament fibers with retraction."},
{"id":183,"type":"dictate","joint":"hip","topic":"Acetabular labral tear","difficulty":2,"prompt":"How would you describe an anterosuperior acetabular labral tear on MR arthrography?","keyterms":[{"label":"Anterosuperior labrum","why":"Most common location for labral tears.","patterns":["anterosuperior|antero[- ]superior","labr"]},{"label":"Contrast/fluid into substance","why":"Contrast undercuts/enters the labrum.","patterns":["contrast|fluid signal","(?:into|undercut|tracking) (?:the )?(?:labral )?(?:substance|base)|chondrolabral junction"]},{"label":"Tear type","why":"Specify detachment vs intrasubstance.","patterns":["detach|intrasubstance|peripheral"]},{"label":"Clock position","why":"Localize using clock-face position.","patterns":["o'?clock|clock position|\\d+\\s*(?:to|-)\\s*\\d+\\s*o"]},{"label":"Paralabral cyst","why":"Associated paralabral cyst supports a tear.","patterns":["paralabral cyst","cyst"]}],"model":"There is a tear of the anterosuperior acetabular labrum at the 12 to 2 o'clock position, with contrast undercutting the chondrolabral junction and partial labral detachment from the acetabular rim. A small adjacent paralabral cyst is present."},
{"id":184,"type":"dictate","joint":"hip","topic":"Cam FAI alpha angle","difficulty":2,"prompt":"How would you describe cam-type femoroacetabular impingement including the alpha angle?","keyterms":[{"label":"Cam morphology","why":"Aspherical femoral head-neck junction with osseous bump.","patterns":["cam","aspheric|bump|loss of (?:the )?(?:normal )?(?:head[- ]neck )?offset|reduced (?:head[- ]neck )?offset"]},{"label":"Alpha angle >55","why":"Alpha angle >55 degrees indicates cam morphology.","patterns":["alpha angle",">\\s*55|greater than 55|5[5-9]\\s*(?:degrees|°)|6\\d\\s*(?:degrees|°)"]},{"label":"Head-neck junction","why":"Localize the bump anterosuperiorly.","patterns":["head[- ]neck junction","anterosuperior|antero[- ]superior"]},{"label":"Labral/chondral injury","why":"Cam FAI causes anterosuperior labral/cartilage damage.","patterns":["labr","chondral|cartilage"]},{"label":"FAI","why":"Name femoroacetabular impingement.","patterns":["femoroacetabular impingement|fai"]}],"model":"There is cam-type femoroacetabular impingement with an osseous bump and loss of normal head-neck offset at the anterosuperior femoral head-neck junction, with an alpha angle measuring 62 degrees (greater than 55). There is associated anterosuperior labral and chondral injury."},
{"id":185,"type":"dictate","joint":"ankle","topic":"ATFL and CFL grading","difficulty":2,"prompt":"How would you describe lateral ankle ligament injury (ATFL and CFL) using sprain grades?","keyterms":[{"label":"ATFL","why":"Anterior talofibular ligament, most commonly injured.","patterns":["anterior talofibular ligament|atfl"]},{"label":"CFL","why":"Calcaneofibular ligament involved in higher-grade injury.","patterns":["calcaneofibular ligament|cfl"]},{"label":"Grade (sprain)","why":"Grade I sprain, II partial, III complete.","patterns":["grade (?:i|ii|iii|1|2|3)\\b","sprain"]},{"label":"Full vs partial","why":"Describe fiber disruption.","patterns":["partial[- ]thickness","full[- ]thickness|complete (?:tear|disruption)"]},{"label":"Edema/fluid","why":"Periligamentous edema/fluid.","patterns":["edema","t2 hyperintens|fluid signal"]}],"model":"There is a grade III complete tear of the anterior talofibular ligament (ATFL) with full-thickness fiber disruption and surrounding T2 hyperintense edema, and a grade II partial-thickness tear of the calcaneofibular ligament (CFL) with periligamentous fluid."},
{"id":186,"type":"dictate","joint":"ankle","topic":"Syndesmosis injury","difficulty":3,"prompt":"How would you describe a high ankle (syndesmotic) injury on MRI?","keyterms":[{"label":"Syndesmosis / AITFL","why":"Anterior inferior tibiofibular ligament is key.","patterns":["syndesmo","anterior inferior tibiofibular ligament|aitfl"]},{"label":"PITFL / interosseous","why":"Posterior inferior tibiofibular and interosseous ligament/membrane.","patterns":["posterior inferior tibiofibular|pitfl","interosseous (?:ligament|membrane)"]},{"label":"Tibiofibular widening","why":"Diastasis/widening of the clear space.","patterns":["diastas|widening","clear space|tibiofibular"]},{"label":"Fiber disruption","why":"Describe ligament tear.","patterns":["disrupt|tear","discontinu"]},{"label":"Edema/fluid","why":"Edema in the syndesmotic recess.","patterns":["edema","fluid"]}],"model":"There is disruption of the anterior inferior tibiofibular ligament (AITFL) of the syndesmosis with fiber discontinuity and edema in the syndesmotic recess, along with partial injury of the interosseous ligament and mild widening of the tibiofibular clear space, consistent with a high ankle syndesmotic injury."},
{"id":187,"type":"dictate","joint":"ankle","topic":"Peroneal split tear","difficulty":2,"prompt":"How would you describe a longitudinal split tear of the peroneus brevis tendon?","keyterms":[{"label":"Peroneus brevis","why":"Brevis is most prone to longitudinal split tears.","patterns":["peroneus brevis|peroneal brevis"]},{"label":"Longitudinal split / C-shape","why":"Split/boomerang/C-shaped morphology.","patterns":["longitudinal split|split tear","c[- ]shape|boomerang|chevron"]},{"label":"Retromalleolar groove","why":"Localize at the retromalleolar/fibular groove.","patterns":["retromalleolar|fibular groove|retrofibular"]},{"label":"Peroneus longus interposition","why":"Longus may be interposed within the split.","patterns":["peroneus longus|longus","interpos|envelop"]},{"label":"Tenosynovial fluid","why":"Associated peroneal tenosynovitis.","patterns":["tenosynov","fluid"]}],"model":"There is a longitudinal split tear of the peroneus brevis at the retromalleolar groove, giving a C-shaped/boomerang configuration that partially envelops the peroneus longus, with surrounding peroneal tenosynovial fluid."},
{"id":188,"type":"dictate","joint":"foot","topic":"Plantar plate tear","difficulty":3,"prompt":"How would you describe a plantar plate tear at the lesser MTP joint?","keyterms":[{"label":"Plantar plate","why":"Name the plantar plate of the MTP joint.","patterns":["plantar plate"]},{"label":"Second MTP / lesser","why":"Second MTP joint is most common.","patterns":["second (?:metatarsophalangeal|mtp)|2nd mtp|lesser (?:metatarsophalangeal|mtp)"]},{"label":"Distal/plantar base insertion","why":"Tear typically at the distal insertion on the proximal phalanx base.","patterns":["proximal phalan(?:x|geal) base|distal (?:insertion|attachment)|plantar base"]},{"label":"Tear / detachment","why":"Describe attenuation, tear, or detachment.","patterns":["tear|detach|disrupt|attenuat"]},{"label":"Fluid signal","why":"T2 hyperintense fluid at the defect.","patterns":["t2 hyperintens|fluid signal","edema"]}],"model":"There is a tear of the plantar plate at the second MTP joint with disruption and fluid signal at the distal insertion on the plantar base of the proximal phalanx, with associated T2 hyperintense edema and capsular distension."},
{"id":189,"type":"dictate","joint":"ankle","topic":"Achilles tear with gap","difficulty":2,"prompt":"How would you describe an Achilles tendon tear, distinguishing partial from full-thickness with a gap measurement?","keyterms":[{"label":"Achilles tendon","why":"Name the tendon.","patterns":["achilles"]},{"label":"Full vs partial","why":"Specify partial-thickness vs complete tear.","patterns":["full[- ]thickness|complete (?:tear|rupture)","partial[- ]thickness"]},{"label":"Gap measurement","why":"Measure the tendon gap in cm/mm.","patterns":["gap","\\d+\\s*(?:mm|cm)"]},{"label":"Distance from calcaneus","why":"Localize tear relative to calcaneal insertion (watershed).","patterns":["calcane","\\d+\\s*(?:mm|cm) (?:proximal|above|from)|watershed"]},{"label":"Tendon retraction/ends","why":"Describe retracted/frayed tendon ends.","patterns":["retract|frayed|tendon ends|stump"]}],"model":"There is a full-thickness complete rupture of the Achilles tendon approximately 4 cm proximal to the calcaneal insertion within the watershed zone, with frayed retracted tendon ends and a tendon gap measuring approximately 2.5 cm."},
{"id":190,"type":"dictate","joint":"ankle","topic":"Osteochondral lesion of talus","difficulty":3,"prompt":"How would you describe an osteochondral lesion of the talar dome including stability features?","keyterms":[{"label":"Osteochondral lesion","why":"Name the OLT.","patterns":["osteochondral lesion|osteochondral defect|olt"]},{"label":"Talar dome location","why":"Localize (medial vs lateral talar dome).","patterns":["talar dome","medial|lateral"]},{"label":"Cartilage/fragment","why":"Describe overlying cartilage and any fragment.","patterns":["cartilage|chondral","fragment|osteochondral fragment"]},{"label":"Instability - fluid undercutting","why":"T2 fluid signal around fragment suggests instability.","patterns":["fluid (?:signal )?(?:undercut|around|beneath|rim|cleft)|high T2 (?:signal )?(?:line|rim)","unstable|loose"]},{"label":"Subchondral cyst/edema","why":"Subchondral cysts and marrow edema.","patterns":["subchondral","cyst|marrow edema"]},{"label":"Size mm","why":"Measure the lesion.","patterns":["\\d+\\s*mm","measuring"]}],"model":"There is an osteochondral lesion of the medial talar dome measuring approximately 10 mm, with an in-situ osteochondral fragment and a high T2 signal fluid cleft undercutting the fragment indicating instability. Underlying subchondral marrow edema and a small subchondral cyst are present."},
{"id":191,"type":"dictate","joint":"wrist","topic":"TFCC tear (Palmer)","difficulty":3,"prompt":"How would you describe a triangular fibrocartilage complex (TFCC) tear using the Palmer classification?","keyterms":[{"label":"TFCC","why":"Name the triangular fibrocartilage complex.","patterns":["triangular fibrocartilage(?: complex)?|tfcc"]},{"label":"Palmer class","why":"Palmer 1 traumatic vs 2 degenerative.","patterns":["palmer","class (?:1|i|2|ii)|type (?:1|i|2|ii)|1[a-d]|2[a-e]"]},{"label":"Central perforation (1A)","why":"Palmer 1A = central avascular disc perforation.","patterns":["central (?:disc )?perforation|1a|disc perforation"]},{"label":"Articular disc location","why":"Localize central disc vs peripheral/ulnar attachment.","patterns":["articular disc|central disc","ulnar (?:attachment|fovea)|peripheral"]},{"label":"Fluid signal","why":"Fluid signal traversing the disc.","patterns":["fluid signal|t2 hyperintens|contrast","perforat|defect"]}],"model":"There is a Palmer 1A traumatic central perforation of the articular disc of the triangular fibrocartilage complex (TFCC), with fluid signal traversing the central disc, and an intact peripheral ulnar foveal attachment."},
{"id":192,"type":"dictate","joint":"wrist","topic":"Scapholunate ligament and DISI","difficulty":3,"prompt":"How would you describe a scapholunate ligament tear with DISI deformity?","keyterms":[{"label":"Scapholunate ligament","why":"Name the SL interosseous ligament (dorsal band key).","patterns":["scapholunate (?:interosseous )?ligament|sl ligament|slil","dorsal band"]},{"label":"Tear/disruption","why":"Describe full-thickness tear/disruption.","patterns":["tear|disrupt|discontinu","full[- ]thickness|complete"]},{"label":"SL widening (Terry Thomas)","why":"Widened SL interval, Terry Thomas sign.","patterns":["scapholunate (?:interval|gap|widening)|sl (?:interval|gap|widening)|terry[- ]thomas","\\d+\\s*mm"]},{"label":"DISI","why":"Dorsal intercalated segment instability pattern.","patterns":["disi|dorsal intercalated segment instability"]},{"label":"SL angle >60","why":"Increased scapholunate angle (>60 degrees).","patterns":["scapholunate angle|sl angle",">\\s*60|greater than 60|6\\d\\s*(?:degrees|°)|7\\d\\s*(?:degrees|°)"]}],"model":"There is a complete tear of the dorsal band of the scapholunate interosseous ligament with widening of the scapholunate interval to 5 mm (Terry-Thomas sign) and a DISI deformity, the scapholunate angle measuring 75 degrees (greater than 60)."},
{"id":193,"type":"dictate","joint":"hand","topic":"Pulley injury","difficulty":2,"prompt":"How would you describe an A2 pulley rupture (climber's finger)?","keyterms":[{"label":"A2 pulley","why":"A2 is the most commonly ruptured flexor pulley.","patterns":["a2 pulley","annular pulley"]},{"label":"Bowstringing","why":"Volar bowstringing of the flexor tendons is diagnostic.","patterns":["bowstring","volar (?:displacement|separation)"]},{"label":"Tendon-bone distance","why":"Increased distance between flexor tendon and phalanx.","patterns":["tendon[- ](?:to[- ])?bone (?:distance|separation)|flexor[- ]bone","\\d+\\s*mm"]},{"label":"Proximal phalanx","why":"A2 overlies the proximal phalanx.","patterns":["proximal phalan"]},{"label":"Edema/disruption","why":"Pulley disruption with edema.","patterns":["disrupt|tear|rupture","edema|fluid"]}],"model":"There is rupture of the A2 pulley over the proximal phalanx with volar bowstringing of the flexor tendons, the flexor tendon-to-bone distance increased to 4 mm, with surrounding edema, consistent with a climber's pulley injury."},
{"id":194,"type":"dictate","joint":"general","topic":"Tendinosis vs tear lexicon","difficulty":1,"prompt":"How would you correctly use the terms tendinosis, tendinopathy, partial-thickness tear, and full-thickness tear?","keyterms":[{"label":"Tendinosis","why":"Tendinosis = degeneration with thickening and intrasubstance signal, no fluid cleft.","patterns":["tendinosis","thicken|intrasubstance signal|intermediate signal"]},{"label":"Tendinopathy","why":"Tendinopathy is a broader clinical term encompassing tendinosis.","patterns":["tendinopathy","umbrella|broader|clinical term"]},{"label":"Partial-thickness tear","why":"Partial tear = fluid-signal cleft involving part of the tendon.","patterns":["partial[- ]thickness tear","fluid[- ]?signal (?:cleft|defect)|part of the (?:tendon )?thickness"]},{"label":"Full-thickness tear","why":"Full-thickness = fluid signal traversing the entire tendon.","patterns":["full[- ]thickness tear","(?:through|across) the (?:entire|full) (?:tendon )?thickness|complete (?:tear|discontinuity)"]}],"model":"Tendinosis describes tendon degeneration with thickening and intrasubstance intermediate signal without a fluid-signal cleft; tendinopathy is the broader clinical term. A partial-thickness tear shows a fluid-signal cleft involving part of the tendon thickness, whereas a full-thickness tear shows fluid signal traversing the entire tendon thickness with complete discontinuity."},
{"id":195,"type":"dictate","joint":"general","topic":"Ligament sprain grading","difficulty":1,"prompt":"How would you describe ligament sprain grades I, II, and III generically?","keyterms":[{"label":"Grade I","why":"Grade I = stretch/edema, fibers intact.","patterns":["grade (?:i|1)\\b","periligamentous edema|sprain|intact fibers"]},{"label":"Grade II","why":"Grade II = partial tear with some fiber disruption.","patterns":["grade (?:ii|2)\\b","partial[- ](?:thickness )?tear"]},{"label":"Grade III","why":"Grade III = complete disruption.","patterns":["grade (?:iii|3)\\b","complete (?:tear|disruption)|full[- ]thickness"]},{"label":"Fiber continuity","why":"Comment on fiber integrity.","patterns":["fiber","continu|disrupt|laxity"]}],"model":"Grade I sprain shows periligamentous edema with intact fibers; grade II shows a partial-thickness tear with some fiber disruption but maintained continuity; grade III shows complete disruption of the ligament fibers with discontinuity and laxity."},
{"id":196,"type":"dictate","joint":"general","topic":"Muscle strain grading","difficulty":1,"prompt":"How would you describe muscle strain grades 1, 2, and 3?","keyterms":[{"label":"Grade 1","why":"Grade 1 = feathery edema, <5% fibers, no architectural distortion.","patterns":["grade 1|grade i\\b","feathery edema|interstitial edema"]},{"label":"Grade 2 partial","why":"Grade 2 = partial tear with some fiber disruption and hematoma.","patterns":["grade 2|grade ii\\b","partial (?:thickness )?tear|fiber disruption"]},{"label":"Grade 3 complete","why":"Grade 3 = complete tear with retraction.","patterns":["grade 3|grade iii\\b","complete (?:tear|rupture)|full[- ]thickness"]},{"label":"Myotendinous junction","why":"Strains center at the myotendinous junction.","patterns":["myotendinous junction|musculotendinous"]}],"model":"Grade 1 muscle strain shows feathery interstitial edema at the myotendinous junction without architectural distortion; grade 2 shows a partial tear with fiber disruption and a small hematoma; grade 3 represents a complete tear with retraction of the muscle at the myotendinous junction."},
{"id":197,"type":"dictate","joint":"general","topic":"Signal and measurement lexicon","difficulty":1,"prompt":"How would you phrase signal characteristics and measurements in standard MRI report language?","keyterms":[{"label":"T2 hyperintense","why":"Fluid/edema is bright on T2.","patterns":["t2 hyperintens","bright on t2"]},{"label":"Fluid-sensitive sequence","why":"Refer to STIR/fat-suppressed T2 as fluid-sensitive.","patterns":["fluid[- ]sensitive","stir|fat[- ]suppressed t2|fat sat"]},{"label":"T1 hypointense marrow edema","why":"Marrow edema is T1 hypointense, T2 hyperintense.","patterns":["marrow edema|bone marrow edema","t1 hypointens|low T1"]},{"label":"Measure in mm/cm","why":"Always provide measurements with units.","patterns":["\\d+\\s*(?:mm|cm)","measuring|approximately"]}],"model":"The lesion is T2 hyperintense and bright on fluid-sensitive (STIR/fat-suppressed T2) sequences, with associated T1 hypointense bone marrow edema, measuring approximately 12 mm. Describing signal relative to a sequence and providing measurements in mm or cm is standard reporting language."},
{"id":198,"type":"dictate","joint":"shoulder","topic":"Subscapularis tear","difficulty":2,"prompt":"How would you describe a subscapularis tendon tear?","keyterms":[{"label":"Subscapularis","why":"Name the subscapularis tendon.","patterns":["subscapularis"]},{"label":"Lesser tuberosity insertion","why":"Inserts on the lesser tuberosity.","patterns":["lesser tuberosity","insertion|footprint"]},{"label":"Upper vs full tendon","why":"Specify upper-third partial vs complete tear.","patterns":["upper (?:third|portion)|cranial","partial[- ]thickness|full[- ]thickness|complete"]},{"label":"Biceps medial subluxation","why":"Tear permits medial biceps subluxation.","patterns":["biceps","medial(?:ly)? sublux|disloc"]},{"label":"Fluid/retraction","why":"Fluid signal and any retraction.","patterns":["fluid signal|t2 hyperintens","retract"]}],"model":"There is a full-thickness tear of the upper portion of the subscapularis at its insertion on the lesser tuberosity with fluid signal and mild medial retraction of the tendon, and associated medial subluxation of the long head of the biceps tendon."}
];
