// definizioni dei punti e delle polyline utilizzate nel progetto

// ================================= Bologna ==============================================================================
// ____________________ coordinate generali
BolognaZoom = 14;
BolognaLatLng = new GLatLng(44.494301281373076, 11.346516609191894);
BolognaInfo = 'Bologna, <i>piazza di Porta Ravegnana</i>';

BolognaOvr = new ovrMarker(
  'Bologna, <i>piazza di Porta Ravegnana</i>'
  + '<br/>Questa piazza, su cui sorgono le due torri, corrisponde all\'antica porta romana'
  + '<br/>sulla <i>via Emilia</i> verso Oriente'
  + '<br/><i>(su <a href="bologna.html">Bologna</a> sono presenti approfondimenti specifici)</i>',
  13,18,
  BolognaLatLng
);

Bologna2TorriOvr = new ovrMarker(
  '<i>Piazza di Porta Ravegnana</i>, dove sorgono le due Torri, <b>della Garisenda</b> e degli <b>Asinelli</b>.',
  16,18,
  BolognaLatLng
);

BolognaPiazzaMaggioreOvr = new ovrMarker(
  '<i>Piazza Maggiore</i> con la chiesa di <b>San Petronio</b>.',
  15,18,
  new GLatLng(44.493803828073524, 11.342761516571045)
);

BolognaUniversitaOvr = new ovrMarker(
  'La sede attuale dell\'<b>Università di Bologna e della Romagna</b>.',
  13,18,
  new GLatLng(44.496842053576074, 11.352181434631347)
);

BolognaSFOvr = new ovrMarker(
  'Area della stazione ferroviaria.',
  13,18,
  new GLatLng(44.50595195453105, 11.343024373054504)
);

// ____________________ area di via Rizzoli-Ugo Bassi
BolognaRomaBassiOvr = new ovrMarker(
  'Imbocco di <i>via Marconi</i>.',
  13,18,
  new GLatLng(44.4958471860813, 11.336785554885864)
);

// area via ugo Bassi, via Rizzoli, piazza della Vittoria
var BolognaRizzoliReEnzoLatLng = new GLatLng(44.49474515919634, 11.34361982345581);
var BolognaTLatLng = new GLatLng(44.49499005585946, 11.342278718948364);
var BolognaVenezianLatLng = new GLatLng(44.49522347203423, 11.340701580047607);
var BolognaZeccaLatLng = new GLatLng(44.494817863000556, 11.339864730834961);
var BolognaRoosveltLatLng = new GLatLng(44.49466097573088, 11.340556740760803);
// BolognaUgoBassiRizzoli1Points.push(BolognaTLatLng); // angolo via Indipendenza

BolognaRizzoliLatLng = new GLatLng(44.49452704723988, 11.34489119052887); // punto intermedio di via Rizzoli
var BolognaRizzoliPoints = [];
BolognaRizzoliPoints.push(BolognaRizzoliReEnzoLatLng); // via Rizzoli
BolognaRizzoliPoints.push(BolognaRizzoliLatLng); // via Rizzoli
BolognaRizzoliPoints.push(new GLatLng(44.494316587561165, 11.346082091331482)); // piazza Ravegnana
BolognaRizzoliPoints.push(new GLatLng(44.493857400171194, 11.346044540405273)); // piazza Mercanzia
BolognaRizzoliPoints.push(new GLatLng(44.49423240347702, 11.343507170677185)); // piazza Re Enzo
BolognaRizzoliPoints.push(BolognaRizzoliReEnzoLatLng); // via Rizzoli
BolognaRizzoliOvr = new ovrPoly(
  'Nel <b>1909</b> cominciano i lavori per l\'allargamento di <i>via Rizzoli</i> nella zona di'
  + '<br/><i>piazza del Nettuno</i> e di <b>Palazzo Re Enzo</b>.'
  + '<br/>Il tratto successivo, verso la <b>torre degli Asinelli</b>, viene realizzato dopo'
  + '<br/>l\'abbattimento delle vecchie torri <b>Artenisi</b>, <b>Riccadonna</b> e <b>Guidozagni</b>'
  + '<br/>nel biennio <b>1917</b>-<b>1918</b>.',
  16,18,
  BolognaRizzoliLatLng,
  new GPolyline(BolognaRizzoliPoints,'#ff0000')
);

BolognaUgoBassiLatLng = new GLatLng(44.495544896057254, 11.338711380958557); // punto intermedio di via Ugo Bassi, angolo San Gervasio
var BolognaUgoBassiPoints = [];
BolognaUgoBassiPoints.push(BolognaVenezianLatLng); // angolo via Venezian
BolognaUgoBassiPoints.push(BolognaUgoBassiLatLng); // angolo San Gervasio
BolognaUgoBassiPoints.push(new GLatLng(44.49568264866762, 11.337354183197021)); // angolo Testoni
BolognaUgoBassiPoints.push(new GLatLng(44.495502804916946, 11.337354183197021)); // Testoni
BolognaUgoBassiPoints.push(new GLatLng(44.49545688727471, 11.337724328041076)); // interno cortile Testoni
BolognaUgoBassiPoints.push(new GLatLng(44.49523112500776, 11.337724328041076)); // sbecco 1 edificio
BolognaUgoBassiPoints.push(new GLatLng(44.49518903364097, 11.337724328041076)); // sbecco 2 edificio
BolognaUgoBassiPoints.push(new GLatLng(44.495196686619, 11.338056921958923)); // sbecco 3 edificio
BolognaUgoBassiPoints.push(new GLatLng(44.49522347203423, 11.338571906089782)); // Battisti 1
BolognaUgoBassiPoints.push(new GLatLng(44.495143115751645, 11.338566541671753)); // Battisti 2
BolognaUgoBassiPoints.push(new GLatLng(44.494982402854305, 11.339285373687744)); // 
BolognaUgoBassiPoints.push(BolognaZeccaLatLng); // angolo via della Zecca
BolognaUgoBassiPoints.push(BolognaRoosveltLatLng); // angolo via Venezian piazza Roosvelt
BolognaUgoBassiPoints.push(BolognaVenezianLatLng); // angolo via Venezian via Bassi
BolognaUgoBassiOvr = new ovrPoly(
  'Nella seconda metà degli anni \'<b>20</b> si completa, con la sistemazione del lato sud'
  + '<br/>di <i>via Ugo Bassi</i>, l\'allargamento del tratto <i>Ugo Bassi-Rizzoli</i> già previsto'
  + '<br/>dal piano regolatore del <b>1889</b>.'
  + '<br/>&Egrave; un esempio classico di completamento, in epoca fascista, di scelte urbanistiche'
  + '<br/>risalenti al periodo liberale.',
  16,18,
  BolognaUgoBassiLatLng,
  new GPolyline(BolognaUgoBassiPoints,'#ff0000')
);

var BolognaPiazzaVittoriaPoints = [];
BolognaPiazzaVittoriaPoints.push(BolognaZeccaLatLng); // angolo via della Zecca
BolognaPiazzaVittoriaPoints.push(BolognaRoosveltLatLng); // angolo via Venezian piazza Roosvelt
BolognaPiazzaVittoriaPoints.push(new GLatLng(44.49394923793844, 11.340476274490356)); // angolo roosvelt 4 Novembre est
BolognaPiazzaVittoriaPoints.push(new GLatLng(44.493432648616405, 11.340304613113403)); // piazza Galielo
BolognaPiazzaVittoriaPoints.push(new GLatLng(44.49357423281176, 11.33915662765503)); // via Volto Santo
BolognaPiazzaVittoriaPoints.push(new GLatLng(44.494178831723836, 11.339317560195922)); // 4 novembre
BolognaPiazzaVittoriaPoints.push(new GLatLng(44.494178831723836, 11.339564323425293)); // angolo roosvelt 4 Novembre ovest
BolognaPiazzaVittoriaPoints.push(BolognaZeccaLatLng); // angolo via della Zecca
BolognaPiazzaVittoriaOvr = new ovrPoly(
  'Negli anni <b>\'30</b> un nuovo scenario urbano si apre nelle immediate vicinanze del'
  + '<br/><b>Palazzo Comunale</b>. Infatti, gli sventramenti operati nella zona di <b>Palazzo'
  + '<br/>Caprara</b> producono lo spazio destinato ad ospitare <i>piazza della Vittoria</i>'
  + '<br/>(oggi <i>piazza Roosvelt</i>).'
  + '<br/>Una analoga operazione, compiuta sull\'area di <i>via dei Gargiolari</i>, darà luogo'
  + '<br/>alla contigua <i>piazza Galileo</i>, sulla quale si affaccia la nuova ala del'
  + '<br/>&laquo;Palazzo del Governo&raquo; (oggi sede della Questura). La facciata rispecchia'
  + '<br/>gli stili e le caratteristiche di molta edilizia pubblica del periodo.',
  17,18,
  new GLatLng(44.4943242406537, 11.34040653705597),
  new GPolyline(BolognaPiazzaVittoriaPoints,'#ffff00')
);

// ____________________ area di via Roma ===============================================
BolognaRomaLatLng = new GLatLng(44.50002934166891, 11.338598728179931); // via Roma intermedio
// overlay base, formata da una sola polinomiale
var BolognaRomaPoints = [];
BolognaRomaPoints.push(BolognaRomaBassiOvr.LatLng); // angolo via Roma Ugo Bassi
BolognaRomaPoints.push(BolognaRomaLatLng); // via Roma intermedia
BolognaRomaPoints.push(new GLatLng(44.50217195841872, 11.33965015411377)); // piazza Martiri
BolognaRomaPoints.push(new GLatLng(44.505446948993054, 11.3411146402359)); // Viale Pietramellara
BolognaRomaPoints.push(new GLatLng(44.505213573743674, 11.342841982841491)); // fronte stazione
BolognaRomaPoints.push(BolognaSFOvr.LatLng); // stazione
BolognaRomaOvrPart = new ovrPart(
  'Parzialmente realizzata prima della seconda guerra mondiale, poi completata negli anni della'
  + '<br/>ricostruzione, <i>via Roma</i> (oggi <i>via Marconi</i>) rappresenta un imponente asse di collegamento'
  + '<br/>tra <i>piazza Malpighi</i> e la <b>stazione ferroviaria</b>. &Egrave; un tratto stradale già previsto'
  + '<br/>dal piano regolatore del <b>1889</b>, ma realizzato, nelle sue parti più significative, in stile'
  + '<br/>«littorio», visto che i lavori cominciarono soltanto nel <b>1932</b>, e che diversi professionisti'
  + '<br/>dell\'epoca, tra i quali <i>Marcello Piacentini</i>, parteciparono ai dibattiti e ai progetti'
  + '<br/>relativi all\'assetto urbanistico e architettonico della strada.'
  + '<form id="BolognaRomaForm" name="BolognaRomaForm"><ul><li><input type="checkbox" onclick="switchOvrPart(this,BolognaRomaOvrPart,0);"/> Vedi gli interventi degli <span style="color:#0000ff;">anni <b>\'30</b></span></li>'
  + '<li><input type="checkbox" onclick="switchOvrPart(this,BolognaRomaOvrPart,1);"/> Vedi gli interventi del <span style="color:#00ff00;">dopoguerra</span></li></ul></form>',
  13,15,
  BolognaRomaLatLng,
  [new GPolyline(BolognaRomaPoints,'#ff0000')]
);

// Parte 0, formata da 2 overlay, relativa agli anni 30
BolognaRoma30LatLng = new GLatLng(44.50009056038308, 11.338534355163574); // angolo via Roma Caduti del Lavoro
BolognaIntCadutiLavoroLatLng = new GLatLng(44.500209171458835, 11.33765459060669); // intermedio Caduti del Lavoro
BolognaAngPortoLatLng = new GLatLng(44.50155596416797, 11.339258551597595); // angolo via Porto

var BolognaRoma30Ovr0Points = []; // parte 0 Ovr 0
BolognaRoma30Ovr0Points.push(BolognaRoma30LatLng); // angolo via Roma Caduti del Lavoro
BolognaRoma30Ovr0Points.push(new GLatLng(44.49666986618586, 11.336967945098877)); // angolo via Roma
BolognaRoma30Ovr0Points.push(new GLatLng(44.49667369257782, 11.336678266525268)); // angolo via Lame
BolognaRoma30Ovr0Points.push(new GLatLng(44.49703719867034, 11.336538791656494)); // intermedio via Lame
BolognaRoma30Ovr0Points.push(new GLatLng(44.49901157112868, 11.337509751319885)); // intermedio via Riva di Reno
BolognaRoma30Ovr0Points.push(new GLatLng(44.49975385665975, 11.337552666664123)); // intermedio via Azzo Gardino
BolognaRoma30Ovr0Points.push(BolognaIntCadutiLavoroLatLng); // intermedio Caduti del Lavoro
BolognaRoma30Ovr0Points.push(BolognaRoma30LatLng); // angolo via Roma Caduti del Lavoro

var BolognaRoma30Ovr1Points = []; // parte 0 Ovr 1
BolognaRoma30Ovr1Points.push(BolognaAngPortoLatLng); // angolo via Porto
BolognaRoma30Ovr1Points.push(new GLatLng(44.50188500538496, 11.33815884590149)); // intermedio via Porto
BolognaRoma30Ovr1Points.push(new GLatLng(44.50249717014955, 11.33815884590149)); // via Don Minzoni
BolognaRoma30Ovr1Points.push(new GLatLng(44.502963941463335, 11.338469982147216)); // interno Don Minzoni Amendola
BolognaRoma30Ovr1Points.push(new GLatLng(44.50301750514554, 11.339575052261352)); // interno Amndola sud ovest
BolognaRoma30Ovr1Points.push(new GLatLng(44.50548138132779, 11.340701580047607)); // angolo Amendola Pietramellara ovest
BolognaRoma30Ovr1Points.push(new GLatLng(44.50532834857322, 11.341484785079956)); // angolo Amendola Pietramellara est
BolognaRoma30Ovr1Points.push(new GLatLng(44.50402755393909, 11.340926885604858)); // intermedio Amendola est
BolognaRoma30Ovr1Points.push(new GLatLng(44.50400459847906, 11.341248750686645)); // sbecco Amendola est
BolognaRoma30Ovr1Points.push(new GLatLng(44.503407753344824, 11.341023445129394)); // intermedio via Milazzo
BolognaRoma30Ovr1Points.push(new GLatLng(44.50339244954309, 11.341259479522705)); // continuazione via Milazzo
BolognaRoma30Ovr1Points.push(new GLatLng(44.50188500538496, 11.341570615768432)); // intermedio via dei Mille
BolognaRoma30Ovr1Points.push(new GLatLng(44.50205335133601, 11.340347528457641)); // angolo Mille piazza Martiri
BolognaRoma30Ovr1Points.push(new GLatLng(44.50173961530877, 11.33938193321228)); // angolo piazza Martiri via Roma
BolognaRoma30Ovr1Points.push(BolognaAngPortoLatLng); // angolo via Porto

BolognaRomaOvrPart.Part[0] = [
  new GPolyline(BolognaRoma30Ovr0Points,'#0000ff'),
  new GPolyline(BolognaRoma30Ovr1Points,'#0000ff')
];

// Parte 1, formata da 2 overlay, relativa agli anni 50
BolognaRoma50LatLng = new GLatLng(44.49984185895695, 11.338571906089782); // angolo nord ovest lato est
var BolognaRoma50Ovr0Points = [];
BolognaRoma50Ovr0Points.push(BolognaRoma30LatLng); // angolo via Roma Caduti del Lavoro
BolognaRoma50Ovr0Points.push(BolognaIntCadutiLavoroLatLng); // intermedio Caduti del Lavoro
BolognaRoma50Ovr0Points.push(new GLatLng(44.50076778811975, 11.337949633598327)); // angolo nord ovest
BolognaRoma50Ovr0Points.push(new GLatLng(44.50059178618765, 11.338722109794616)); // angolo nord est
BolognaRoma50Ovr0Points.push(BolognaRoma30LatLng); // angolo via Roma Caduti del Lavoro
var BolognaRoma50Ovr1Points = [];
BolognaRoma50Ovr1Points.push(BolognaRoma50LatLng); // angolo nord ovest lato est
BolognaRoma50Ovr1Points.push(new GLatLng(44.49595815291212, 11.33689820766449)); // angolo via Ugo Bassiù
BolognaRoma50Ovr1Points.push(new GLatLng(44.495797442261015, 11.337364912033081)); // interno via Ugo Bassi
BolognaRoma50Ovr1Points.push(new GLatLng(44.49962376606406, 11.339269280433654)); // angolo nord est lato est
BolognaRoma50Ovr1Points.push(BolognaRoma50LatLng); // angolo nord ovest lato est

BolognaRomaOvrPart.Part[1] = [
  new GPolyline(BolognaRoma50Ovr0Points,'#00ff00'),
  new GPolyline(BolognaRoma50Ovr1Points,'#00ff00')
];

// ____________________ Bologna stadio
BolognaStadioLatLng = new GLatLng(44.49383826728482, 11.310489177703857)
var BolognaStadioPoints = [];
BolognaStadioPoints.push(BolognaStadioLatLng); // angolo nord est
BolognaStadioPoints.push(new GLatLng(44.493490047655946, 11.307833790779113)); // angolo nord ovest (piscina)
BolognaStadioPoints.push(new GLatLng(44.49204357463325, 11.308032274246215)); // punto intermedio lato ovest
BolognaStadioPoints.push(new GLatLng(44.491067759075555, 11.30790889263153)); // angolo sud ovest (campi da tennis)
BolognaStadioPoints.push(new GLatLng(44.491274403732774, 11.309223175048828)); // punto intermedio lato sud
BolognaStadioPoints.push(new GLatLng(44.490845806591174, 11.30941092967987)); // sbecco lato sud
BolognaStadioPoints.push(new GLatLng(44.49089555463524, 11.31092369556427)); // angolo sud est
BolognaStadioPoints.push(BolognaStadioLatLng); // angolo nord est
BolognaStadioOvr = new ovrPoly(
  'Si tratta della prima «opera del regime» realizzata a Bologna (l\'inaugurazione ufficiale'
  + '<br/>avviene nell\'<b>ottobre 1926</b>, anche se l\'impianto comincia ad essere utilizzato'
  + '<br/>a partire dalla primavera del <b>1927</b>).' 
  + '<br/>La  scelta di realizzare un impianto sportivo di questa imponenza va messa in relazione'
  + '<br/>sia ad alcuni aspetti dell\'ideologia fascista sia all\'influenza politica del principale'
  + '<br/>gerarca locale di quegli anni, <i>Leandro Arpinati</i>, che alla metà degli anni <b>\'20</b>'
  + '<br/>divenne anche presidente della <i>Federcalcio</i>.',
  15,18,
  BolognaStadioLatLng,
  new GPolyline(BolognaStadioPoints,'#ff0000')
);

// ================================= Rimini ============================================================================
// ____________________ coordinate generali
RiminiZoom = 14;
RiminiLatLng = new GLatLng(44.06075339531616, 12.565773725509643);
RiminiInfo = 'Rimini, zona del centro';

RiminiOvr = new ovrMarker(
  'Rimini, zona del centro',
  13,18,
  RiminiLatLng
);

RiminiCavourOvr = new ovrMarker(
  '<i>Piazza Cavour</i>',
  13,18,
  RiminiLatLng
);

Rimini3MartiriOvr = new ovrMarker(
  '<i>Piazza Tre Martiri</i> già <i>Giulio Cesare</i>',
  13,18,
  new GLatLng(44.059242260755475, 12.56837010383606)
);

RiminiTiberioOvr = new ovrMarker(
  '<b>Ponte di Tiberio</b> (<b>14-21 d.C.</b>)',
  13,18,
  new GLatLng(44.06361365156746, 12.563681602478027)
);

RiminiArcoLatLng = new GLatLng(44.056940790401804, 12.570928931236267);
RiminiArcoOvr = new ovrMarker(
  '<b>Arco di Augusto</b> (<b>27 a.C.</b>)',
  13,18,
  RiminiArcoLatLng
);

// ____________________ Marina
RiminiMarinaCristoforoColombo = new GLatLng(44.07523057634612, 12.574592828750610);
RiminiRotondaExKursaal = new GLatLng(44.07266379452472, 12.577908039093017);
RiminiStabilimentoLatLng = new GLatLng(44.072941289818665, 12.5783371925354);
RiminiMarinaFS = new GLatLng(44.0658955897922 , 12.570912837982177); // viale dei Bagni verso stazione
/*
// da reintrodurre verificando la possibilità di uso di una InfoWindow a più tab
RiminiStabilimentoOvr = new ovrMarker(
  'Area in cui sorge il primo stabilimento balneare di Rimini nel <b>1843</b>'
  + '<br/>Successivamente viene costruito il <i>Kursaal</i> e, agli inizi del <b>\'900</b>, il <i>Grand Hotel</i>.',
  13,18,
  RiminiStabilimentoLatLng
);
*/

RiminiSFOvr = new ovrMarker(
  'Area della stazione ferroviaria, capolinea del primo collegamento stradale'
  + '<br/>(<i>Viale dei Bagni</i>) con lo stabilimento balneare fondato nel <b>1843</b>.',
  13,18,
  new GLatLng(44.06396442819852, 12.573654055595398)
);

RiminiPortoCanaleOvr = new ovrMarker(
  'Intersezione tra la <i>via Destra del Porto</i> e il primo asse stradale di collegamento'
  + '<br/>tra il porto canale e lo stabilimento balneare del <b>1843</b>.'
  + '<br/>Questo tracciato corrisponde approssimativamente all\'attuale <i>via Cristoforo Colombo</i>.'
  + '<br/>La stazione nasce come snodo della Bologna-Ancona nel <b>1861</b>. Nel <b>1889</b> viene realizzata'
  + '<br/>la linea Rimini-Ravenna.'
  + '<br/>La sede attuale è un ampliamento di fine <b>\'800</b>.',
  13,18,
  RiminiMarinaCristoforoColombo
);

var RiminiMarinaPoints = [];
RiminiMarinaPoints.push(RiminiMarinaFS); // inizio via Dei Bagni presso Ferrovia
RiminiMarinaPoints.push(RiminiRotondaExKursaal); // centro della rotonda
RiminiMarinaPoints.push(RiminiMarinaCristoforoColombo); // estremo verso il porto di via Cristoforo Colombo
RiminiMarinaPoints.push(new GLatLng(44.07299139299695, 12.573396563529968)); // lato intermedio verso il porto
RiminiMarinaPoints.push(new GLatLng(44.07042065979773, 12.572200298309326)); // secondo lato intermedio verso il porto
RiminiMarinaPoints.push(new GLatLng(44.06656627788159, 12.569078207015991)); // ferrovia/porto
RiminiMarinaPoints.push(RiminiMarinaFS); // chiusura polyline
RiminiMarinaOvrPart = new ovrPart(
  'L\'urbanizzazione della zona litoranea di Rimini si realizza secondo uno schema destinato a<br/>riprodursi in altre realtà dell\'Adriatico centro settentrionale.'
  + '<br/>Lo schema prevede la costruzione di un primo stabilimento balneare e la successiva <br/>realizzazione di collegamenti tra questo, il centro storico e il porto canale.'
  + '<br/>All\'interno di questa area comincia a realizzarsi una prima maglia urbanizzata'
  + '<form id="RiminiMarinaForm" name="RiminiMarinaForm"><ul>'
  + '<li><input type="checkbox" onclick="switchOvrPart(this,RiminiMarinaOvrPart,0);"/> <b>1843</b>: realizzazione del primo stabilimento balneare</li>'
  + '<li><input type="checkbox" onclick="switchOvrPart(this,RiminiMarinaOvrPart,1);"/> <b>1848-1860</b>: realizzazione del <i><span style="color:#00ff00;">viale dei Bagni</span></i> (poi <i>viale Principe Amedeo</i>)</li>'
  + '<li><input type="checkbox" onclick="switchOvrPart(this,RiminiMarinaOvrPart,2);"/> <b>1861</b>: realizzazione della <b>stazione ferroviaria</b>.</li>'
  + '<li><input type="checkbox" onclick="switchOvrPart(this,RiminiMarinaOvrPart,3);"/> <b>1860-1880</b>: realizzazione di <i><span style="color:#0000ff;">via Cristoforo Colombo</span></i></li>'
  + '<li><input type="checkbox" onclick="switchOvrPart(this,RiminiMarinaOvrPart,4);"/> <b>1870-1872</b>: costruzione del <b>Kursaal</b></li>'
  + '<li><input type="checkbox" onclick="switchOvrPart(this,RiminiMarinaOvrPart,5);"/> <b>1906-1912</b>: costruzione del <b>Grand Hotel</b></li>'
  + '<li><input type="checkbox" onclick="switchOvrPart(this,RiminiMarinaOvrPart,6);"/> <b>inizio 1900</b>: area della prima urbanizzazione di <b><span style="color:#993333;">Marina Centro</span></b>.</li>'
// gestire tramite l'uso di una InfoWindow a più tab
//  + 'Le immagini satellitari non descrivono adeguatamente questa fase,<br/> in quanto sono relative alle ricostruzioni del <b>dopoguerra</b>.'
  + '</ul></form>',
  13,15,
  new GLatLng(44.07261754518259, 12.574914693832397),
  [new GPolyline(RiminiMarinaPoints,'#ff0000')]
);

RiminiMarinaOvrPart.Part[0] = [new GMarker(RiminiStabilimentoLatLng)]; // staabilimento balneare
RiminiMarinaOvrPart.Part[1] = [
  new GPolyline(
    [RiminiMarinaFS,RiminiRotondaExKursaal],
    '#00ff00'
  )
]; // via Dei Bagni
RiminiMarinaOvrPart.Part[2] = [new GMarker(RiminiMarinaFS)]; // stazione FS
RiminiMarinaOvrPart.Part[3] = [
  new GPolyline(
    [RiminiMarinaCristoforoColombo,RiminiRotondaExKursaal],
    '#0000ff'
  )
]; // via Cristoforo Colombo
RiminiMarinaOvrPart.Part[4] = [new GMarker(RiminiRotondaExKursaal)]; // stazione FS
RiminiMarinaOvrPart.Part[5] = [new GMarker(new GLatLng(44.07262910752152, 12.576561570167541))]; // Grand Hotel
RiminiMarinaOvrPart6Start = new GLatLng(44.07265223219259, 12.577543258666992);
RiminiMarinaOvrPart.Part[6] = [
  new GPolyline(
    [
      RiminiMarinaOvrPart6Start,
      new GLatLng(44.074995485345326, 12.574667930603027),
      new GLatLng(44.07293743572626, 12.57358431816101),
      new GLatLng(44.071453591504344, 12.576373815536499),
      RiminiMarinaOvrPart6Start
    ],
    '#993333'
  )
]; // prima area di urbanizzazione

/*
RiminiMarinaOvr = new ovrPoly(
  'L\'urbanizzazione della zona litoranea di Rimini si realizza secondo uno schema destinato a<br/>riprodursi in altre realtà dell\'Adriatico centro settentrionale.'
  + '<br/>Lo schema prevede la costruzione di un primo stabilimento balneare e la successiva <br/>realizzazione di collegamenti tra questo, il centro storico e il porto canale.'
  + '<br/>All\'interno di questa area comincia a realizzarsi una prima maglia urbanizzata',
  13,15,
  new GLatLng(44.07261754518259, 12.574914693832397),
  new GPolyline(RiminiMarinaPoints,'#ff0000')
);


<span style="color:#0000ff;">anni <b>\'30</b></span>
*/

// ____________________ arco d'Augusto
var RiminiPolyAreaArcoPoints = [];
RiminiPolyAreaArcoPoints.push(new GLatLng(44.0567827296911, 12.57011890411377)); // vertice ovest
RiminiPolyAreaArcoPoints.push(new GLatLng(44.05654371025402, 12.570161819458007)); // arco ovest
RiminiPolyAreaArcoPoints.push(new GLatLng(44.056358662285305, 12.570483684539795)); // vertice sud
RiminiPolyAreaArcoPoints.push(new GLatLng(44.05665936494084, 12.571202516555786)); // angolo via Flaminia
RiminiPolyAreaArcoPoints.push(new GLatLng(44.057145112158665, 12.571814060211181)); // vertice est
RiminiPolyAreaArcoPoints.push(new GLatLng(44.057430390413415, 12.571470737457275)); // vertice nord
RiminiPolyAreaArcoPoints.push(new GLatLng(44.05738798427333, 12.57108986377716)); // inizio rientranza
RiminiPolyAreaArcoPoints.push(new GLatLng(44.05741111489896, 12.570998668670654)); // rientranza nord
RiminiPolyAreaArcoPoints.push(new GLatLng(44.05699476225515, 12.570253014564514)); // rientranza ovest
RiminiPolyAreaArcoPoints.push(new GLatLng(44.05693693526753, 12.570301294326782)); // fine rientranza
RiminiPolyAreaArcoPoints.push(new GLatLng(44.05687910822344, 12.570199370384216)); // angolo palazzo
RiminiPolyAreaArcoPoints.push(RiminiPolyAreaArcoPoints[0]); // chiusura polyline
RiminiPolyAreaArcoOvr = new ovrPoly(
  '<b>Arco di Augusto</b> (27 a.C.)'
  + '<br/>La radicale risistemazione dell\'area costituisce un esempio lampante della'
  + '<br/>retorica monumentale che caratterizza una buona parte dell\'urbanistica italiana'
  + '<br/>negli anni \'<b>30</b>. Il piano regolatore riminese del <b>1934</b> prevede infatti'
  + '<br/>l\'abbattimento delle mura e dell\'agglomerato urbano sorto intorno all\'Arco;'
  + '<br/>ciò perfettamente in linea con la politica di isolamento scenografico dei manufatti'
  + '<br/>storici, soprattutto se risalenti all\'epoca romana.'
  + '<br/>I lavori di isolamento dell\'Arco sono conclusi nel <b>1938</b>; erano stati significativamente'
  + '<br/>avviati da Mussolini nell\'estate del <b>1936</b>.',
  15,18,
  new GLatLng(44.05725305544372, 12.571427822113037),
  new GPolyline(RiminiPolyAreaArcoPoints,'#0000ff')
);

// ================================= Via Emilia, escluse Bologna e Rimini ===================================================
ViaEmiliaCentroZoom = 8;
ViaEmiliaCentroLatLng = new GLatLng(44.53763230134611, 11.195068359375);
ViaEmiliaCentroInfo = 'La <span style="color:#ff0000;">linea</span> descrive il tracciato della <i>via Emilia</i>, compreso tra <b>Rimini</b> e <b>Piacenza</b>.'
  + '<br/>Il tracciato indicato corrisponde sostanzialmente, salvo piccoli aggiustamenti'
  + '<br/>avvenuti nel corso dei secoli, al tracciato storico.'
  + '<br/>La <i>via Emilia</i> prende il nome dal console romano <b>Marco Emilio Lepido</b>'
  + '<br/>che ne decise la costruzione nel <b>187 a.C.</b> allo scopo di collegare in modo'
  + '<br/>efficace le già esistenti colonie vicine all\'Adriatico (prima tra tutte <b><i>Ariminum</i></b>,'
  + '<br/>la futura <b>Rimini</b>) con la lontana <b><i>Placentia</i></b> (oggi <b>Piacenza</b>), collocata'
  + '<br/>sulle rive del <b>Po</b>, colonia strategicamente importante e minacciata dalla vicinanza dei'
  + '<br/><b>Galli Boi</b>.';

PiacenzaLatLng = new GLatLng(45.051210473097356, 9.69818115234375);
PiacenzaOvr = new ovrMarker(
  '<b>Piacenza</b> (fondata come <b><i>Placentia</i></b> nel <b>223 a.C.</b>) è, insieme a <b>Rimini</b>, una delle prime'
  + '</br>città costruite dai Romani nella pianura Padana; è inoltre, sempre con <b>Rimini</b>, uno'
  + '</br>dei due estremi della <b>via Emilia</b> romana.',
  8,18,
  PiacenzaLatLng
);

BolognaViaEmiliaOvr = new ovrMarker(
  BolognaOvr.Info,
  8,18,
  BolognaLatLng
);

RiminiArcoViaEmiliaOvr = new ovrMarker(
  '<br/><b>Rimini</b> (fondata come <b><i>Ariminum</i></b> nel <b>268 a.C.</b>) è, insieme a Piacenza, una delle prime'
  + '<br/>città costruite dai Romani nella pianura Padana; l\'<b>Arco di Augusto</b> (<b>27 a.C.</b>)'
  + '<br/>è uno dei due estremi della <b>via Emilia</b> romana.'
  + '<br/><i>(su <a href="rimini.html">Rimini</a> sono presenti approfondimenti specifici)</i>',
  8,18,
  RiminiArcoLatLng
);

var ViaEmiliaPolyPoints = [];
ViaEmiliaPolyPoints.push(PiacenzaLatLng);
ViaEmiliaPolyPoints.push(new GLatLng(44.867549659447214, 10.05249023437500)); // fidenza
ViaEmiliaPolyPoints.push(new GLatLng(44.799377946716950, 10.32714843750000)); // Parma
ViaEmiliaPolyPoints.push(new GLatLng(44.688182838424860, 10.67871093750000)); // Reggio
ViaEmiliaPolyPoints.push(new GLatLng(44.639345580517110, 10.90942382812500)); // Modena
ViaEmiliaPolyPoints.push(ViaEmiliaCentroLatLng );
ViaEmiliaPolyPoints.push(BolognaLatLng);
ViaEmiliaPolyPoints.push(new GLatLng(44.215678472351130, 12.03552246093750)); // Forlì
ViaEmiliaPolyPoints.push(new GLatLng(44.140826830775550, 12.24151611328125)); // Cesena
ViaEmiliaPolyPoints.push(RiminiArcoLatLng); // arco d'Augusto
ViaEmiliaOvr = new ovrPoly(
  ViaEmiliaCentroInfo,
  8,18,
  ViaEmiliaCentroLatLng,
  new GPolyline(ViaEmiliaPolyPoints,'#ff0000')
);
