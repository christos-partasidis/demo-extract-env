/*cookie exp date for tracking*/
var exp = new Date()
exp.setTime(exp.getTime() + 3600 * 1000 * 24 * 365 * 10) /*10 years*/
/*Icelandair digital labs tracking*/
var paxList = {
  ADT: 0,
  INF: 0,
  CHD: 0,
  YTH: 0
}

var rates = {
  "ISK": 122.956,
  "EUR": 0.88,
  "GBP": 0.79,
  "DKK": 6.54,
  "NOK": 8.50,
  "SEK": 9.04,
  "CHF": 0.99,
  "CAD": 1.33
};

// TODO: there is no difference between swiss-fr and fr - need to check this further
var lang = {
  US: { langIdentifiers: 'en-us', edit:'Edit Search' , url: 'icelandair.us' , conditionUrl: '/support/pre-flight/previous-fare-rules/'},
  DK: { langIdentifiers: 'da-dk', edit:'&AElig;ndre s&oslash;gning' , url: 'icelandair.dk' , conditionUrl: '/da-dk/support/for-afgang/previous-fare-rules/'},
  GB: { langIdentifiers: 'en-gb', edit:'Edit Search' , url: 'icelandair.co.uk' , conditionUrl: '/en-gb/support/pre-flight/previous-fare-rules/'},
  CA: { langIdentifiers: 'en-ca', edit:'Edit Search' , url: 'icelandair.ca' , conditionUrl: '/en-ca/support/pre-flight/previous-fare-rules/'},
  FRCA: { langIdentifiers: 'fr-ca', edit:'Modifier la recherche' , url: 'fr.icelandair.ca' , conditionUrl: '/fr-ca/service-client/avant-depart/previous-fare-rules/'},
  DE: { langIdentifiers: 'de-de', edit:'Suche &auml;ndern' , url: 'icelandair.de', conditionUrl: '/de-de/hilfe/vor-dem-flug/previous-fare-rules/' },
  SE: { langIdentifiers: 'sv-se', edit:'&Auml;ndra s&ouml;kning' , url: 'icelandair.se' , conditionUrl: '/sv-se/support/fore-avfard/previous-fare-rules/'},
  NO: { langIdentifiers: 'no-no', edit:'Endre s&oslash;k' , url: 'icelandair.no' , conditionUrl: '/no-no/kundeservice/for-flygningen/previous-fare-rules/'},
  RU: { langIdentifiers: 'ru-ru', edit:'&#1056;&#1077;&#1076;&#1072;&#1082;&#1090;&#1080;&#1088;&#1086;&#1074;&#1072;&#1090;&#1100; &#1087;&#1086;&#1080;&#1089;&#1082;' , url: 'ru.icelandair.net' , conditionUrl: '/ru-ru/support/pre-flight/previous-fare-rules/'},
  IT: { langIdentifiers: 'it-it', edit:'Modifica ricerca' , url: 'icelandair.it' , conditionUrl: '/it-it/supporto/prima-del-volo/previous-fare-rules/'},
  ES: { langIdentifiers: 'es-es', edit:'Editar b&uacute;squeda' , url: 'icelandair.es' , conditionUrl: '/es-es/asistencia/antes-del-vuelo/previous-fare-rules/'},
  FR: { langIdentifiers: 'fr-fr', edit:'Modifier la recherche' , url: 'icelandair.fr' , conditionUrl: '/fr-fr/service-client/avant-depart/previous-fare-rules/'},
  NL: { langIdentifiers: 'nl-nl', edit:'Zoekopdracht wijzigen' , url: 'icelandair.nl',  conditionUrl: '/nl-nl/klantenservice/voor-vertrek/previous-fare-rules/'},
  FI: { langIdentifiers: 'fi-fi', edit:'Muokkaa hakua' , url: 'icelandair.fi' , conditionUrl: '/fi-fi/tuki/ennen-lentoa/previous-fare-rules/'},
  IS: { langIdentifiers: 'is-is', edit:'Breyta leit' , url: 'icelandair.is' , conditionUrl: '/is/adstod/fyrir-flugid/previous-fare-rules/'},
  IE: { langIdentifiers: 'en-ie', edit:'Edit Search' , url: 'icelandair.ie' , conditionUrl: '/en-ie/support/pre-flight/previous-fare-rules/'}
}

var continent = {
  US: 'North America',
  IS: 'Iceland'
}

var terms = {
  'en-us':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;By clicking &#8222;CONTINUE&#8220; below you have read and accepted Icelandair&#8216;s &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/support/terms-and-conditions/privacy-terms/&#39;&gt;privacy policy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;,  &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;purchase conditions&lt;/span&gt;, limits of liability, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/support/baggage/allowance/&#39;&gt;baggage policy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; and the &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/support/baggage/restrictions/&#39;&gt;hazardous materials conditions&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;Please note, Icelandair&#39;s baggage allowance may differ from other airlines in your itinerary.&lt;/p&gt;&lt;p&gt;By completing this booking, you consent to our sharing your personal information with third parties (e.g. other airlines, government agencies, service providers), as applicable, to deliver the services you purchased. We may also send you service emails associated with your purchase (e.g. itinerary change) and your email address will be subscribed to receive promotional emails, from which you may immediately unsubscribe.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Dangerous goods&lt;/strong&gt;&lt;br/&gt;Passenger baggage must not contain any articles or substances that may present a danger during transport: e.g Acids ,Compressed Gas, Explosives, Flammable Substances, Pollutants, Oxidising Agents, Infectious Substances, Poisons Some exceptions apply. Please check the &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/support/baggage/restrictions/&#39;&gt;hazardous materials conditions&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. You may also visit the &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Transportation Security Administration (TSA) website&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; for a list of items that can and cannot be transported on passenger aircraft.&lt;/p&gt;&lt;/section&gt;',
  'is-is':
    "&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Me&eth; &thorn;v&iacute; a&eth; smella &aacute; &bdquo;HALDA &Aacute;FRAM&ldquo; h&eacute;r a&eth; ne&eth;an sam&thorn;ykkir &thorn;&uacute; a&eth; hafa lesi&eth; og sam&thorn;ykkt &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/is/adstod/skilmalar-og-skilyrdi/trunadaryfirlysing/'&gt;Pers&oacute;nuverndarstefnu Icelandair&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink'&gt;Skilyr&eth;i fyrir kaupum&lt;/span&gt;, Takm&ouml;rkun &aacute;byrg&eth;ar, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/is/adstod/farangur/heimild/'&gt; Farangursreglur&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; og &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/is/adstod/farangur/takmarkanir/'&gt;&Aacute;kv&aelig;&eth;i um h&aelig;ttulegan varning&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;Vinsamlega athugi&eth; a&eth; farangursreglur annarra flugf&eacute;laga sem &thorn;&uacute; fer&eth;ast me&eth; &iacute; s&ouml;mu fer&eth;, kunna a&eth; vera a&eth;rar en farangursreglur Icelandair.&lt;/p&gt;&lt;p&gt;Me&eth; &thorn;v&iacute; a&eth; lj&uacute;ka &thorn;essari b&oacute;kun sam&thorn;ykkir &thorn;&uacute; a&eth; vi&eth; deilum uppl&yacute;singum um &thorn;ig me&eth; &thorn;ri&eth;ja a&eth;ila (t.d. &ouml;&eth;rum flugf&eacute;l&ouml;gum, r&iacute;kisstofnunum, &thorn;j&oacute;nustua&eth;ilum), &iacute; &thorn;eim tilvikum &thorn;ar sem &thorn;a&eth; er nau&eth;synlegt, svo h&aelig;gt s&eacute; a&eth; veita &thorn;&aacute; &thorn;j&oacute;nustu sem &thorn;&uacute; hefur keypt. Einnig kann a&eth; vera a&eth; vi&eth; sendum &thorn;&eacute;r t&ouml;lvup&oacute;sta sem var&eth;a &thorn;essa &thorn;j&oacute;nustu (t.d. breytingar &aacute; fer&eth;atilh&ouml;gun) og anna&eth; kynningarefni fr&aacute; okkur, en &thorn;&uacute; getur alltaf sagt upp &aacute;skrift a&eth; &thorn;v&iacute; kynningarefni.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;H&aelig;ttulegur varningur&lt;/strong&gt;&lt;br /&gt;Far&thorn;egum er ekki heimilt a&eth; hafa me&eth; s&eacute;r efni e&eth;a hluti sem kunna a&eth; valda skemmdum e&eth;a stefna &ouml;&eth;rum far&thorn;egum og &aacute;h&ouml;fn &iacute; h&aelig;ttu af neinu tagi, s.s. a-s&yacute;rur, &thorn;jappa&eth; gas, sprengiefni, eldfimt efni, mengunarefni, &aelig;tandi efni, smitefni, eiturefni. Undantekningar kunna a&eth; eiga vi&eth; &iacute; einhverjum tilvikum. N&aacute;nari uppl&yacute;singar er a&eth; finna &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/is/adstod/farangur/takmarkanir/'&gt;Takmarkanir &aacute; farangri&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. Einnig er gott a&eth; kynna s&eacute;r &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring'&gt;vefs&iacute;&eth;u Umfer&eth;arstofnun Bandar&iacute;kjanna (Transport Security Administration (TSA))&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; til a&eth; f&aacute; n&aacute;kv&aelig;mt yfirlit yfir &thorn;&aacute; hluti sem ekki er h&aelig;gt a&eth; hafa me&eth; s&eacute;r &iacute; far&thorn;egaflug.&lt;/p&gt;&lt;/section&gt;",
  'da-dk':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Ved at klikke p&aring; &#8222;FORTS&AElig;T&#8222; nedenunder bekr&aelig;fter du, at du har l&aelig;st og accepteret Icelandairs &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/da-dk/support/vilkaar-og-betingelser/erklaering-om-beskyttelse-af-personlige-oplysninger/&#39;&gt;fortrolighedspolitik&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;k&oslash;bsbetingelser&lt;/span&gt;,ansvarsbegr&aelig;nsninger, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/da-dk/support/bagage/tilladte-bagage/&#39;&gt;bagagepolitik&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; samt &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/da-dk/support/bagage/restriktioner/&#39;&gt;betingelser for farlige materialer&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;Bem&aelig;rk, at Icelandsairs bagagekvoter kan variere ift. andre flyselskaber i din rejseplan.&lt;/p&gt;&lt;p&gt;Ved at gennemf&oslash;re denne booking accepterer du, at vi deler dine personlige oplysninger med tredjeparter (f.eks. andre flyselskaber, offentlige myndigheder, tjenesteudbydere), alt efter hvad der er relevant for at levere de tjenester, du har k&oslash;bt. Vi kan ogs&aring; sende dig service-email, der er forbundet med dit k&oslash;b (f.eks. &aelig;ndring af rejseplan), og din e-mailadresse vil blive registreret til at modtage salgsfremmende e-mail, som du kan afmelde til enhver tid.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Farligt gods&lt;/strong&gt;&lt;br/&gt;Passagerbagage m&aring; ikke indeholde artikler eller stoffer, som kan udg&oslash;re en fare under transport, f.eks. syre, komprimeret gas, eksplosivstoffer, brandfarlige stoffer, forurenende stoffer, oxiderende stoffer, smittefarlige stoffer, giftstoffer. Der er enkelte undtagelser. L&aelig;s &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/da-dk/support/bagage/restriktioner/&#39;&gt;betingelserne for farlige materialer&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.  Bes&oslash;g alternativt &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;webstedet for Transportation Security Administration (TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; for at f&aring; vist en liste over de emner, der m&aring; og ikke m&aring; transporteres p&aring; et passagerfly.&lt;/p&gt;&lt;/section&gt;',
  'en-gb':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;By clicking &#8222;CONTINUE&#8220; below you have read and accepted Icelandair&#8216;s &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-gb/support/terms-and-conditions/privacy-terms/&#39;&gt;privacy policy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;,  &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;purchase conditions&lt;/span&gt;, limits of liability, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-gb/support/baggage/allowance/&#39;&gt;baggage policy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; and the &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-gb/support/baggage/restrictions/&#39;&gt;hazardous materials conditions&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;Please note, Icelandair&#39;s baggage allowance may differ from other airlines in your itinerary.&lt;/p&gt;&lt;p&gt;By completing this booking, you consent to our sharing your personal information with third parties (e.g. other airlines, government agencies, service providers), as applicable, to deliver the services you purchased. We may also send you service emails associated with your purchase (e.g. itinerary change) and your email address will be subscribed to receive promotional emails, from which you may immediately unsubscribe.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Dangerous goods&lt;/strong&gt;&lt;br/&gt;Passenger baggage must not contain any articles or substances that may present a danger during transport: e.g Acids ,Compressed Gas, Explosives, Flammable Substances, Pollutants, Oxidising Agents, Infectious Substances, Poisons Some exceptions apply. Please check the &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-gb/support/baggage/restrictions/&#39;&gt;hazardous materials conditions&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. You may also visit the &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Transportation Security Administration (TSA) website&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; for a list of items that can and cannot be transported on passenger aircraft.&lt;/p&gt;&lt;/section&gt;',
  'de-de':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Indem Sie nachstehend auf &bdquo;WEITER&ldquo; klicken, best&Auml;tigen Sie, dass Sie die &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/de-de/hilfe/allgemeine-geschaftsbedingungen/datenschutz/&#39;&gt;Datenschutzrichtlinie&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, die &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;Kaufbedingungen&lt;/span&gt;, die Haftungsbeschr&Auml;nkungen, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/de-de/hilfe/gepaeck/freigepackmenge/&#39;&gt;Gep&Auml;ckbestimmungen&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; und die &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/de-de/hilfe/gepaeck/freigepackmenge/&#39;&gt;Gefahrgutbestimmungen&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; von Icelandair gelesen haben und sie akzeptieren.*&lt;/p&gt;&lt;p&gt;Bitte beachten Sie, dass die bei Icelandair zul&Auml;ssige Freigep&Auml;ckmenge von den zul&Auml;ssigen Freigep&Auml;ckmengen anderer Fluglinien auf Ihrer Flugroute abweichen kann.&lt;/p&gt;&lt;p&gt;Wenn Sie diese Buchung abschließen, stimmen Sie zu, dass Ihre pers&ouml;nlichen Daten nach Bedarf mit Dritten geteilt werden d&uuml;rfen (z. B. anderen Fluglinien, staatlichen Stellen, Dienstleistern), um die von Ihnen erworbenen Dienstleistungen bereitstellen zu k&ouml;nnen. Im Zusammenhang mit Ihrem Kauf erhalten Sie von uns u. U. auch Service-E-Mails (z. B. bei einer &Auml;nderung der Reisedaten). Ihre E-Mail-Adresse wird in den Verteiler f&uuml;r Aktions-E-Mails aufgenommen, Sie k&ouml;nnen diese E-Mails jedoch auch sofort wieder abbestellen.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Gef&Auml;hrliche Gegenst&Auml;nde&lt;/strong&gt;&lt;br/&gt;Um die Sicherheit an Bord zu gew&Auml;hrleisten, ist die Mitnahme von gef&Auml;hrlichen Gegenst&Auml;nden oder Substanzen im aufgegebenen Gep&Auml;ck oder im Handgep&Auml;ck nicht erlaubt: Dazu z&Auml;hlen u. a. S&Auml;uren, Beh&Auml;lter mit Gasen, Explosivstoffe, leicht entz&uuml;ndliche Stoffe, Schadstoffe, oxidierende Stoffe, infekti&ouml;se Substanzen und giftige (toxische) Stoffe. Unter bestimmten Umst&Auml;nden gelten jedoch Ausnahmen. Bitte beachten Sie die &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/de-de/hilfe/gepaeck/freigepackmenge/#39;&gt;Gefahrgutbestimmungen&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. Sie k&ouml;nnen auch die &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Website der Transportation Security Administration (TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; besuchen, um eine Liste der Gegenst&Auml;nde einzusehen, die mit Passagierflugzeugen bef&ouml;rdert bzw. nicht bef&ouml;rdert werden d&uuml;rfen.&lt;/p&gt;&lt;/section&gt;',
  'sv-se':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Genom att klicka p&aring; &#8222;FORTS&Auml;TT&#8222; nedan s&aring; har du l&auml;st och accepterat Icelandairs &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/sv-se/support/villkor-och-bestammelser/juridiska-villkor/&#39;&gt;integritetspolicy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;k&ouml;pvillkor&lt;/span&gt;, ansvarsbegr&auml;nsningar, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/sv-se/support/bagage/regler/&#39;&gt;bagagepolicy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; och &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/sv-se/support/bagage/regler/&#39;&gt;villkor f&ouml;r farliga material&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;Observera att den till&aring;tna m&auml;ngden bagage hos Icelandair kan skilja sig fr&aring;n andra flygbolag i din reseplan.&lt;/p&gt;&lt;p&gt;Genom att fullborda denna bokning s&aring; samtycker du till att vi delar personlig information med tredje part (t.ex andra flygbolag, myndigheter, tj&auml;nsteleverant&ouml;rer) som till&auml;mpligt, f&ouml;r att leverera de tj&auml;nster du k&ouml;pte. Vi kan ocks&aring; skicka service-epost associerat med ditt k&ouml;p (t.ex resv&auml;gs&auml;ndring) och din e-postadress kommer att ing&aring; en prenumeration p&aring; att ta emot reklampost, n&aring;got som omedelbart kan s&auml;gas upp.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Farligt gods&lt;/strong&gt;&lt;br/&gt;Passagerares bagage f&aring;r inte inneh&aring;lla n&aring;gra artiklar eller substanser som kan utg&ouml;ra en fara under transport: t.ex. syror, komprimerad gas, explosiva &auml;mnen, brandfarliga &auml;mnen, f&ouml;roreningar, oxidationsmedel, smittsamma &auml;mnen, gifter. Vissa undantag g&auml;ller. V&auml;nligen se &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/sv-se/support/bagage/regler/&#39;&gt;villkoren f&ouml;r farligt material&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. Du kan &auml;ven bes&ouml;ka &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Transportation Security Administrations (TSA) webbsida&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; d&auml;r det finns en lista &ouml;ver saker som man f&aring;r och inte f&aring;r transportera ombord p&aring; passagerarflyg.&lt;/p&gt;&lt;/section&gt;',
  'it-it':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Facendo clic su &#8222;CONTINUA&#8222; qui sotto, dichiarate di aver letto e accettato l&#39;&lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/it-it/supporto/termini-e-condizioni/privacy-terms/&#39;&gt;Informativa sulla privacy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;le Condizioni di acquisto&lt;/span&gt;, i Limiti di responsabilit&agrave;, l&#39;&lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/it-it/supporto/bagaglio/allowance/&#39;&gt;Informativa sui bagagli&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; e le &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/it-it/supporto/bagaglio/restrictions/&#39;&gt;Condizioni per il trasporto di materiali pericolosi&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;La franchigia bagaglio potrebbe differire da quella applicata da altre compagnie aeree che utilizzerete nel vostro itinerario.&lt;/p&gt;&lt;p&gt;Completando questa prenotazione, acconsentite alla condivisione dei vostri dati personali con terze parti (quali altre compagnie aeree, agenzie governative o fornitori di servizi), a seconda dei casi, per l’erogazione dei servizi acquistati. Potremmo anche inviarvi e-mail di servizio associate al vostro acquisto (es. per informarvi di un cambio di itinerario) e il vostro indirizzo e-mail verr&agrave; inserito nella mailing list per ricevere messaggi promozionali (iscrizione che &egrave; possibile annullare immediatamente).&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Merci pericolose&lt;/strong&gt;&lt;br/&gt;Il bagaglio dei passeggeri non deve contenere articoli o sostanze pericolose per il trasporto come ad esempio: acidi, gas compressi, esplosivi, sostanze infiammabili, inquinanti, agenti ossidanti, sostanze infette e veleni. In alcuni casi potrebbero sussistere eccezioni. Consultate le &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/it-it/supporto/bagaglio/restrictions/&#39;&gt;Condizioni per il trasporto di materiali pericolosi&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. Per un elenco degli oggetti ammessi, e non, a bordo degli aerei passeggeri, visitate il sito dell&#39;&lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Amministrazione per la sicurezza dei trasporti (Transportation Security Administration, TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.&lt;/p&gt;&lt;/section&gt;',
  'es-es':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Al hacer clic en &laquo;CONTINUAR&raquo; m&aacute;s abajo confirma que ha le&iacute;do y acepta la &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/es-es/asistencia/condiciones/privacy-terms/&#39;&gt;pol&iacute;tica de privacidad&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;las condiciones de compra&lt;/span&gt;, la limitaci&oacute;n de responsabilidad, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/es-es/asistencia/equipaje/allowance/&#39;&gt;la pol&iacute;tica de equipajes&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; y las &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/es-es/asistencia/equipaje/restrictions/&#39;&gt;condiciones para materiales peligrosos&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; de Icelandair.*&lt;/p&gt;&lt;p&gt;Tenga en cuenta que el l&iacute;mite de equipaje permitido por Icelandair puede diferir del de otras aerol&iacute;neas de su itinerario.&lt;/p&gt;&lt;p&gt;Al completar esta reserva, da su consentimiento para que compartamos su informaci&oacute;n personal con terceros (como otras aerol&iacute;neas, agencias del gobierno o proveedores de servicios), seg&uacute;n sea necesario, para proporcionarle los servicios que ha contratado. Tambi&eacute;n podremos enviarle mensajes de correo electr&oacute;nicos de servicio relacionados con su compra (como cambios de itinerario) y su direcci&oacute;n de correo ser&aacute; incluida en una lista para recibir mensajes promocionales, de la que podr&aacute; darse de baja inmediatamente.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Objetos peligrosos&lt;/strong&gt;&lt;br/&gt;El equipaje de los pasajeros no puede contener ning&uacute;n art&iacute;culo o sustancia que suponga un riesgo durante el vuelo; por ejemplo, &aacute;cido, gas comprimido, explosivos, sustancias inflamables, sustancias contaminantes, agentes oxidantes, sustancias infecciosas o venenos, con algunas excepciones. Consulte las &lt;a target=&#39;_blank&#39; href=&#39;hhttps://www.icelandair.com/es-es/asistencia/equipaje/restrictions/&#39;&gt;condiciones para materiales peligrosos&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. Tambi&eacute;n puede visitar el sitio web de la &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Administraci&oacute;n de Seguridad en el Transporte (TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; para consultar una lista de los art&iacute;culos que se permite transportar a bordo de la cabina y los que no.&lt;/p&gt;&lt;/section&gt;',
  'no-no':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Ved &aring; klikke p&aring; &laquo;FORTSETT&raquo; nedenfor har du lest og godtatt Icelandairs &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/no-no/kundeservice/betingelser-og-vilkar/personvernerklaering/&#39;&gt;personvernerkl&aelig;ring&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;betingelser for kj&oslash;p&lt;/span&gt;, ansvarsbegrensninger, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/no-no/kundeservice/bagasje/bagasjekvoter/&#39;&gt;retningslinjer for bagasje&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; og &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/no-no/kundeservice/bagasje/restriksjoner/&#39;&gt;farlige gjenstander&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;V&aelig;r oppmerksom p&aring; at Icelandairs tillatelser i forhold til bagasje kan avvike fra andre flyselskaper i din reiserute.&lt;/p&gt;&lt;p&gt;Ved &aring; fullf&oslash;re denne bestillingen samtykker du i at vi kan dele dine personlige opplysninger med tredjeparter (for eksempel andre flyselskap, myndigheter, tjenesteleverand&oslash;rer) dersom det er aktuelt for &aring; levere tjenestene du har kj&oslash;pt. Vi kan ogs&aring; sende deg e-post knyttet til kj&oslash;pet ditt (for eksempel reiseruteendring), og du vil som abonnement motta salgsfremmende e-postmeldinger til din e-postadresse. Dette kan du melde deg av med umiddelbar virkning.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Farlig gods&lt;/strong&gt;&lt;br/&gt;Passasjerens bagasje m&aring; ikke inneholde artikler eller gjenstander som kan medf&oslash;re fare under transporten: f.eks. syrer, komprimert gass, eksplosiver, brennbare stoffer, forurensende stoffer, oksyderende midler, smittsomme stoffer, giftstoffer Noen unntak gjelder. Les &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/no-no/kundeservice/bagasje/restriksjoner/&#39;&gt;vilk&aring;rene for farlige stoffer.&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; Du kan ogs&aring; bes&oslash;ke nettsiden for &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;transportsikkerhetsadministrasjon (Transport Security Administration, TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; for &aring; se en liste over artikler som kan og ikke kan transporteres p&aring; passasjerfly.&lt;/p&gt;&lt;/section&gt;',
  'en-ca':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;By clicking &#8222;CONTINUE&#8220; below you have read and accepted Icelandair&#8216;s &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-ca/support/terms-and-conditions/privacy-terms/&#39;&gt;privacy policy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;,  &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;purchase conditions&lt;/span&gt;, limits of liability, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-ca/support/baggage/allowance/&#39;&gt;baggage policy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; and the &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-ca/support/baggage/restrictions/&#39;&gt;hazardous materials conditions&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;Please note, Icelandair&#39;s baggage allowance may differ from other airlines in your itinerary.&lt;/p&gt;&lt;p&gt;By completing this booking, you consent to our sharing your personal information with third parties (e.g. other airlines, government agencies, service providers), as applicable, to deliver the services you purchased. We may also send you service emails associated with your purchase (e.g. itinerary change) and your email address will be subscribed to receive promotional emails, from which you may immediately unsubscribe.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Dangerous goods&lt;/strong&gt;&lt;br/&gt;Passenger baggage must not contain any articles or substances that may present a danger during transport: e.g Acids ,Compressed Gas, Explosives, Flammable Substances, Pollutants, Oxidising Agents, Infectious Substances, Poisons Some exceptions apply. Please check the &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-ca/support/baggage/restrictions/&#39;&gt;hazardous materials conditions&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. You may also visit the &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Transportation Security Administration (TSA) website&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; for a list of items that can and cannot be transported on passenger aircraft.&lt;/p&gt;&lt;/section&gt;',
  'fr-fr':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;En cliquant sur le bouton &laquo;CONTINUER&raquo; ci-dessous, vous reconnaissez avoir lu et accept&eacute; la &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fr-fr/voyageur-frequent/termes-et-conditions/&#39;&gt;politique de confidentialit&eacute;&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;les conditions d&#39;achat&lt;/span&gt;, les limites de responsabilit&eacute;, les &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fr-fr/service-client/bagages/franchise-bagages/&#39;&gt;conditions de transport des bagages&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; et les &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fr-fr/service-client/bagages/restrictions-relatives-aux-bagages/&#39;&gt;conditions relatives aux mati&egrave;res dangereuses&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; d&#39;Icelandair.*&lt;/p&gt;&lt;p&gt;Veuillez noter que la franchise de bagages d&#39;Icelandair peut diff&eacute;rer de celle des autres compagnies a&eacute;riennes de votre voyage.&lt;/p&gt;&lt;p&gt;En effectuant cette r&eacute;servation, vous acceptez que nous partagions vos informations personnelles avec des tiers (par exemple, d&#39;autres compagnies a&eacute;riennes, des agences gouvernementales ou des prestataires de services), le cas &eacute;ch&eacute;ant, afin de vous fournir les services que vous avez achet&eacute;s. Nous pouvons &eacute;galement vous envoyer des e-mails d&#39;information en lien avec votre achat (en cas de changement d&#39;itin&eacute;raire, par exemple). Votre adresse e-mail sera ajout&eacute;e &agrave; notre liste de diffusion afin de vous communiquer nos e-mails promotionnels. Notez que vous pourrez vous d&eacute;sabonner de cette liste de diffusion &agrave; tout moment.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Articles dangereux&lt;/strong&gt;&lt;br/&gt;Les bagages des passagers ne doivent pas contenir d&#39;articles ou de substances pouvant pr&eacute;senter un danger lors de leur transport (acides, gaz comprim&eacute;, explosifs, substances inflammables, polluants, agents oxydants, substances infectieuses, poisons, etc.). Certaines exceptions s&#39;appliquent. Veuillez consulter les &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fr-fr/service-client/bagages/restrictions-relatives-aux-bagages/&#39;&gt;conditions relatives aux mati&egrave;res dangereuses &lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. Vous pouvez &eacute;galement consulter le site de la &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Transportation Security Administration (TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; pour obtenir la liste d&eacute;taill&eacute;e des articles pouvant et ne pouvant pas &ecirc;tre transport&eacute;s &agrave; bord des avions commerciaux.&lt;/p&gt;&lt;/section&gt;',
  'fi-fi':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Napsauttamalla JATKA-painiketta alla olet lukenut ja hyv&auml;ksynyt Icalandairin &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fi-fi/tuki/ehdot-ja-maaraykset/privacy-terms/&#39;&gt;tietosuojak&auml;yt&auml;nn&ouml;n&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;ostoehdot&lt;/span&gt;, vastuurajat, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fi-fi/tuki/matkatavarat/allowance/&#39;&gt;matkatavarak&auml;yt&auml;nn&ouml;n&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; ja &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fi-fi/tuki/matkatavarat/rajoitukset/&#39;&gt;vaarallisten aineiden ehdot&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;Huomautus: Icelandairin matkatavaram&auml;&auml;r&auml; saattaa poiketa matkaohjelmasi muista lentoyhti&ouml;ist&auml;.&lt;/p&gt;&lt;p&gt;Suorittamalla t&auml;m&auml;n varauksen hyv&auml;ksyt, ett&auml; jaamme henkil&ouml;tietosi kolmansien osapuolten kanssa (esim. toiset lentoyhti&ouml;t, hallintoviranomaiset, palvelutoimittajat) tarpeen mukaan, toimittaaksemme ostamasi palvelut. Saatamme my&ouml;s l&auml;hett&auml;&auml; ostoosi liittyvi&auml; s&auml;hk&ouml;posteja (esim. matkaohjelman muutos) ja s&auml;hk&ouml;postiosoitteesi liitet&auml;&auml;n vastaanottamaan tarjouss&auml;hk&ouml;posteja. Voit kuitenkin halutessasi lopettaa t&auml;m&auml;n palvelun v&auml;litt&ouml;m&auml;sti.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Vaaralliset tavarat&lt;/strong&gt;&lt;br/&gt;Matkustajan matkatavarat eiv&auml;t saa sis&auml;lt&auml;&auml; mit&auml;&auml;n tavaroita tai aineita, jotka voivat aiheuttaa vaaran kuljetuksen aikana. T&auml;llaisia ovat esim. hapot, paineistetut kaasut, r&auml;j&auml;hdysaineet, palavat aineet, saastuttavat aineet, hapettimet, tartuntavaaralliset aineet, myrkyt muutamin poikkeuksin. Tarkista &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fi-fi/tuki/matkatavarat/rajoitukset/&#39;&gt;vaarallisia aineita koskevat ehdot&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. My&ouml;s &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Transportation Security Administration (TSA) website&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; (TSA) (Matkustuksen turvallisuushallinto) on koonnut sivustollensa luettelon tavaroista ja esineist&auml;, joita saa ja joita ei saa kuljettaa matkustajalentokoneessa.&lt;/p&gt;&lt;/section&gt;',
  'nl-nl':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;Door hieronder op &bdquo;DOORGAAN&ldquo; te klikken geeft u aan dat u het &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/nl-nl/klantenservice/voorwaarden/privacybeleid/&#39;&gt;privacybeleid&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;de aankoopvoorwaarden&lt;/span&gt;, de aansprakelijkheidsbeperkingen, het &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/nl-nl/klantenservice/bagage/bagagevrijstelling/&#39;&gt;bagagebeleid&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; en de &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/nl-nl/klantenservice/bagage/restricties/&#39;&gt;voorwaarden voor gevaarlijke materialen&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; van Icelandair heeft gelezen en geaccepteerd.*&lt;/p&gt;&lt;p&gt;Houd er rekening mee dat de bagagevrijstelling van Icelandair kan verschillen van die van andere luchtvaartmaatschappijen waarmee u reist.&lt;/p&gt;&lt;p&gt;Als u deze boeking voltooit, stemt u ermee in dat we uw persoonsgegevens met derde partijen delen (bijv. andere luchtvaartmaatschappijen, overheidsinstanties, dienstverleners), om de diensten te verlenen die u heeft gekocht, indien van toepassing. Het is ook mogelijk dat we u e-mails sturen met betrekking tot uw aankoop (bijv. wijziging van de vluchttijden), en we registreren uw e-mailadres om regelmatige promotiemails te verzenden. U kunt zich onmiddellijk uitschrijven van dergelijke e-mails.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Gevaarlijke goederen&lt;/strong&gt;&lt;br/&gt;De passagiersbagage mag geen artikelen of stoffen bevatten die een gevaar kunnen vormen tijdens het transport, bijv. zuren, geperst gas, explosieven, brandbare stoffen, vervuilers, oxidatiemiddelen, besmettelijke stoffen, giffen Hierop kunnen uitzonderingen gelden. Lees de &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/nl-nl/klantenservice/bagage/restricties/&#39;&gt;voorwaarden voor gevaarlijke materialen&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. Op de website van de &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Amerikaanse Transportation Security Administration (TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; vindt u een lijst met items die al dan niet mogen worden vervoerd in een passagiersvliegtuig.&lt;/p&gt;&lt;/section&gt;',
  'ru-ru':
    "&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;&#1053;&#1072;&#1078;&#1080;&#1084;&#1072;&#1103; &#1088;&#1072;&#1089;&#1087;&#1086;&#1083;&#1086;&#1078;&#1077;&#1085;&#1085;&#1091;&#1102; &#1085;&#1080;&#1078;&#1077; &#1082;&#1085;&#1086;&#1087;&#1082;&#1091;&laquo;&#1055;&#1056;&#1054;&#1044;&#1054;&#1051;&#1046;&#1048;&#1058;&#1068;&raquo;, &#1074;&#1099; &#1087;&#1086;&#1076;&#1090;&#1074;&#1077;&#1088;&#1078;&#1076;&#1072;&#1077;&#1090;&#1077;, &#1095;&#1090;&#1086; &#1087;&#1088;&#1086;&#1095;&#1080;&#1090;&#1072;&#1083;&#1080; &#1080; &#1087;&#1088;&#1080;&#1085;&#1080;&#1084;&#1072;&#1077;&#1090;&#1077;  &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/ru-ru/support/terms-and-conditions/privacy-terms/'>&#1087;&#1086;&#1083;&#1080;&#1090;&#1080;&#1082;&#1091; &#1082;&#1086;&#1085;&#1092;&#1080;&#1076;&#1077;&#1085;&#1094;&#1080;&#1072;&#1083;&#1100;&#1085;&#1086;&#1089;&#1090;&#1080;&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; &#1082;&#1086;&#1084;&#1087;&#1072;&#1085;&#1080;&#1080; Icelandair, &#1077;&#1077;&lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink'>&#1091;&#1089;&#1083;&#1086;&#1074;&#1080;&#1103; &#1087;&#1086;&#1082;&#1091;&#1087;&#1082;&#1080;&lt;/span&gt;, &#1086;&#1075;&#1088;&#1072;&#1085;&#1080;&#1095;&#1077;&#1085;&#1080;&#1103; &#1086;&#1090;&#1074;&#1077;&#1090;&#1089;&#1090;&#1074;&#1077;&#1085;&#1085;&#1086;&#1089;&#1090;&#1080;,  &lt;a target=&quot;_blank&quot; target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/ru-ru/support/baggage/allowance/'>&#1087;&#1086;&#1083;&#1080;&#1090;&#1080;&#1082;&#1091; &#1074; &#1086;&#1090;&#1085;&#1086;&#1096;&#1077;&#1085;&#1080;&#1080; &#1073;&#1072;&#1075;&#1072;&#1078;&#1072;&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; &#1080;  &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/ru-ru/support/baggage/restrictions/'>&#1091;&#1089;&#1083;&#1086;&#1074;&#1080;&#1103; &#1087;&#1077;&#1088;&#1077;&#1074;&#1086;&#1079;&#1082;&#1080; &#1086;&#1087;&#1072;&#1089;&#1085;&#1099;&#1093; &#1084;&#1072;&#1090;&#1077;&#1088;&#1080;&#1072;&#1083;&#1086;&#1074;&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;&#1054;&#1073;&#1088;&#1072;&#1090;&#1080;&#1090;&#1077; &#1074;&#1085;&#1080;&#1084;&#1072;&#1085;&#1080;&#1077; &#1085;&#1072; &#1090;&#1086;, &#1095;&#1090;&#1086; &#1076;&#1086;&#1087;&#1091;&#1089;&#1090;&#1080;&#1084;&#1072;&#1103; &#1085;&#1086;&#1088;&#1084;&#1072; &#1082;&#1086;&#1084;&#1087;&#1072;&#1085;&#1080;&#1080; Icelandair &#1085;&#1072; &#1087;&#1088;&#1086;&#1074;&#1086;&#1079; &#1073;&#1072;&#1075;&#1072;&#1078;&#1072; &#1084;&#1086;&#1078;&#1077;&#1090; &#1086;&#1090;&#1083;&#1080;&#1095;&#1072;&#1090;&#1100;&#1089;&#1103; &#1086;&#1090; &#1085;&#1086;&#1088;&#1084;&#1099; &#1076;&#1088;&#1091;&#1075;&#1080;&#1093; &#1072;&#1074;&#1080;&#1072;&#1082;&#1086;&#1084;&#1087;&#1072;&#1085;&#1080;&#1081; &#1074; &#1074;&#1072;&#1096;&#1077;&#1084; &#1084;&#1072;&#1088;&#1096;&#1088;&#1091;&#1090;&#1077;.&lt;/p&gt;&lt;p&gt;&#1057;&#1086;&#1074;&#1077;&#1088;&#1096;&#1072;&#1103; &#1101;&#1090;&#1086; &#1073;&#1088;&#1086;&#1085;&#1080;&#1088;&#1086;&#1074;&#1072;&#1085;&#1080;&#1077;, &#1074;&#1099; &#1076;&#1072;&#1077;&#1090;&#1077; &#1089;&#1074;&#1086;&#1077; &#1089;&#1086;&#1075;&#1083;&#1072;&#1089;&#1080;&#1077; &#1085;&#1072; &#1090;&#1086;, &#1095;&#1090;&#1086; &#1084;&#1099; &#1084;&#1086;&#1078;&#1077;&#1084; &#1087;&#1088;&#1077;&#1076;&#1086;&#1089;&#1090;&#1072;&#1074;&#1083;&#1103;&#1090;&#1100; &#1074;&#1072;&#1096;&#1091; &#1083;&#1080;&#1095;&#1085;&#1091;&#1102; &#1080;&#1085;&#1092;&#1086;&#1088;&#1084;&#1072;&#1094;&#1080;&#1102; &#1090;&#1088;&#1077;&#1090;&#1100;&#1080;&#1084; &#1089;&#1090;&#1086;&#1088;&#1086;&#1085;&#1072;&#1084; (&#1085;&#1072;&#1087;&#1088;&#1080;&#1084;&#1077;&#1088;, &#1076;&#1088;&#1091;&#1075;&#1080;&#1084; &#1072;&#1074;&#1080;&#1072;&#1082;&#1086;&#1084;&#1087;&#1072;&#1085;&#1080;&#1103;&#1084;, &#1075;&#1086;&#1089;&#1091;&#1076;&#1072;&#1088;&#1089;&#1090;&#1074;&#1077;&#1085;&#1085;&#1099;&#1084; &#1086;&#1088;&#1075;&#1072;&#1085;&#1072;&#1084;, &#1087;&#1086;&#1089;&#1090;&#1072;&#1074;&#1097;&#1080;&#1082;&#1072;&#1084; &#1091;&#1089;&#1083;&#1091;&#1075; &#1080; &#1090;. &#1087;.), &#1077;&#1089;&#1083;&#1080; &#1101;&#1090;&#1086; &#1085;&#1077;&#1086;&#1073;&#1093;&#1086;&#1076;&#1080;&#1084;&#1086; &#1076;&#1083;&#1103; &#1087;&#1088;&#1077;&#1076;&#1086;&#1089;&#1090;&#1072;&#1074;&#1083;&#1077;&#1085;&#1080;&#1103; &#1087;&#1088;&#1080;&#1086;&#1073;&#1088;&#1077;&#1090;&#1077;&#1085;&#1085;&#1099;&#1093; &#1074;&#1072;&#1084;&#1080; &#1091;&#1089;&#1083;&#1091;&#1075;. &#1052;&#1099; &#1090;&#1072;&#1082;&#1078;&#1077; &#1084;&#1086;&#1078;&#1077;&#1084; &#1087;&#1088;&#1080;&#1089;&#1099;&#1083;&#1072;&#1090;&#1100; &#1074;&#1072;&#1084; &#1089;&#1083;&#1091;&#1078;&#1077;&#1073;&#1085;&#1099;&#1077; &#1101;&#1083;&#1077;&#1082;&#1090;&#1088;&#1086;&#1085;&#1085;&#1099;&#1077; &#1089;&#1086;&#1086;&#1073;&#1097;&#1077;&#1085;&#1080;&#1103;, &#1089;&#1074;&#1103;&#1079;&#1072;&#1085;&#1085;&#1099;&#1077; &#1089; &#1074;&#1072;&#1096;&#1077;&#1081; &#1087;&#1086;&#1082;&#1091;&#1087;&#1082;&#1086;&#1081; (&#1085;&#1072;&#1087;&#1088;&#1080;&#1084;&#1077;&#1088;, &#1091;&#1074;&#1077;&#1076;&#1086;&#1084;&#1083;&#1077;&#1085;&#1080;&#1103; &#1086;&#1073; &#1080;&#1079;&#1084;&#1077;&#1085;&#1077;&#1085;&#1080;&#1080; &#1084;&#1072;&#1088;&#1096;&#1088;&#1091;&#1090;&#1072;), &#1080; &#1085;&#1072; &#1074;&#1072;&#1096; &#1101;&#1083;&#1077;&#1082;&#1090;&#1088;&#1086;&#1085;&#1085;&#1099;&#1081; &#1072;&#1076;&#1088;&#1077;&#1089; &#1073;&#1091;&#1076;&#1077;&#1090; &#1086;&#1092;&#1086;&#1088;&#1084;&#1083;&#1077;&#1085;&#1072; &#1087;&#1086;&#1076;&#1087;&#1080;&#1089;&#1082;&#1072; &#1085;&#1072; &#1088;&#1072;&#1089;&#1089;&#1099;&#1083;&#1082;&#1091; &#1088;&#1077;&#1082;&#1083;&#1072;&#1084;&#1085;&#1099;&#1093; &#1089;&#1086;&#1086;&#1073;&#1097;&#1077;&#1085;&#1080;&#1081;, &#1082;&#1086;&#1090;&#1086;&#1088;&#1091;&#1102; &#1074;&#1099; &#1084;&#1086;&#1078;&#1077;&#1090;&#1077; &#1086;&#1090;&#1084;&#1077;&#1085;&#1080;&#1090;&#1100; &#1074; &#1083;&#1102;&#1073;&#1086;&#1081; &#1084;&#1086;&#1084;&#1077;&#1085;&#1090;.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;&#1054;&#1087;&#1072;&#1089;&#1085;&#1099;&#1077; &#1087;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090;&#1099;&lt;/strong&gt;&lt;br/&gt;&#1042; &#1073;&#1072;&#1075;&#1072;&#1078;&#1077; &#1079;&#1072;&#1087;&#1088;&#1077;&#1097;&#1072;&#1077;&#1090;&#1089;&#1103; &#1087;&#1088;&#1086;&#1074;&#1086;&#1079;&#1080;&#1090;&#1100; &#1087;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090;&#1099; &#1080;&#1083;&#1080; &#1074;&#1077;&#1097;&#1077;&#1089;&#1090;&#1074;&#1072;, &#1082;&#1086;&#1090;&#1086;&#1088;&#1099;&#1077; &#1084;&#1086;&#1075;&#1091;&#1090; &#1087;&#1088;&#1077;&#1076;&#1089;&#1090;&#1072;&#1074;&#1083;&#1103;&#1090;&#1100; &#1086;&#1087;&#1072;&#1089;&#1085;&#1086;&#1089;&#1090;&#1100; &#1074; &#1093;&#1086;&#1076;&#1077; &#1087;&#1077;&#1088;&#1077;&#1074;&#1086;&#1079;&#1082;&#1080;: &#1082;&#1080;&#1089;&#1083;&#1086;&#1090;&#1099;, &#1075;&#1072;&#1079;&#1099; &#1087;&#1086;&#1076; &#1076;&#1072;&#1074;&#1083;&#1077;&#1085;&#1080;&#1077;&#1084;, &#1074;&#1079;&#1088;&#1099;&#1074;&#1095;&#1072;&#1090;&#1099;&#1077;, &#1083;&#1077;&#1075;&#1082;&#1086;&#1074;&#1086;&#1089;&#1087;&#1083;&#1072;&#1084;&#1077;&#1085;&#1103;&#1102;&#1097;&#1080;&#1077;&#1089;&#1103; &#1080;&#1083;&#1080; &#1079;&#1072;&#1075;&#1088;&#1103;&#1079;&#1085;&#1103;&#1102;&#1097;&#1080;&#1077; &#1074;&#1077;&#1097;&#1077;&#1089;&#1090;&#1074;&#1072;, &#1086;&#1082;&#1080;&#1089;&#1083;&#1080;&#1090;&#1077;&#1083;&#1080;, &#1079;&#1072;&#1088;&#1072;&#1079;&#1085;&#1099;&#1077; &#1074;&#1077;&#1097;&#1077;&#1089;&#1090;&#1074;&#1072; &#1080; &#1103;&#1076;&#1099;. &#1052;&#1086;&#1075;&#1091;&#1090; &#1076;&#1077;&#1081;&#1089;&#1090;&#1074;&#1086;&#1074;&#1072;&#1090;&#1100; &#1080;&#1089;&#1082;&#1083;&#1102;&#1095;&#1077;&#1085;&#1080;&#1103;. &#1055;&#1088;&#1086;&#1074;&#1077;&#1088;&#1100;&#1090;&#1077;  &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/ru-ru/support/baggage/restrictions/'>&#1091;&#1089;&#1083;&#1086;&#1074;&#1080;&#1103; &#1087;&#1077;&#1088;&#1077;&#1074;&#1086;&#1079;&#1082;&#1080; &#1086;&#1087;&#1072;&#1089;&#1085;&#1099;&#1093; &#1084;&#1072;&#1090;&#1077;&#1088;&#1080;&#1072;&#1083;&#1086;&#1074;&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. &#1058;&#1072;&#1082;&#1078;&#1077; &#1074;&#1099; &#1084;&#1086;&#1078;&#1077;&#1090;&#1077; &#1087;&#1086;&#1089;&#1077;&#1090;&#1080;&#1090;&#1100; &#1074;&#1077;&#1073;-&#1089;&#1072;&#1081;&#1090;  &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring'>&#1059;&#1087;&#1088;&#1072;&#1074;&#1083;&#1077;&#1085;&#1080;&#1103; &#1090;&#1088;&#1072;&#1085;&#1089;&#1087;&#1086;&#1088;&#1090;&#1085;&#1086;&#1081; &#1073;&#1077;&#1079;&#1086;&#1087;&#1072;&#1089;&#1085;&#1086;&#1089;&#1090;&#1080; &#1057;&#1064;&#1040; (TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &#1075;&#1076;&#1077; &#1088;&#1072;&#1079;&#1084;&#1077;&#1097;&#1077;&#1085; &#1089;&#1087;&#1080;&#1089;&#1086;&#1082; &#1087;&#1088;&#1077;&#1076;&#1084;&#1077;&#1090;&#1086;&#1074;, &#1088;&#1072;&#1079;&#1088;&#1077;&#1096;&#1077;&#1085;&#1085;&#1099;&#1093; &#1080; &#1079;&#1072;&#1087;&#1088;&#1077;&#1097;&#1077;&#1085;&#1085;&#1099;&#1093; &#1082; &#1087;&#1077;&#1088;&#1077;&#1074;&#1086;&#1079;&#1082;&#1077; &#1085;&#1072; &#1087;&#1072;&#1089;&#1089;&#1072;&#1078;&#1080;&#1088;&#1089;&#1082;&#1080;&#1093; &#1074;&#1086;&#1079;&#1076;&#1091;&#1096;&#1085;&#1099;&#1093; &#1089;&#1091;&#1076;&#1072;&#1093;.&lt;/p&gt;&lt;/section&gt;",
  'fr-ca':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;En cliquant sur le bouton &laquo;CONTINUER&raquo; ci-dessous, vous reconnaissez avoir lu et accept&eacute; la &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fr-ca/voyageur-frequent/termes-et-conditions/&#39;&gt;politique de confidentialit&eacute;&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;, &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;les conditions d&#39;achat&lt;/span&gt;, les limites de responsabilit&eacute;, les &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fr-ca/service-client/bagages/franchise-bagages/&#39;&gt;conditions de transport des bagages&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; et les &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fr-ca/service-client/bagages/restrictions/&#39;&gt;conditions relatives aux mati&egrave;res dangereuses&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; d&#39;Icelandair.*&lt;/p&gt;&lt;p&gt;Veuillez noter que la franchise de bagages d&#39;Icelandair peut diff&eacute;rer de celle des autres compagnies a&eacute;riennes de votre voyage.&lt;/p&gt;&lt;p&gt;En effectuant cette r&eacute;servation, vous acceptez que nous partagions vos informations personnelles avec des tiers (par exemple, d&#39;autres compagnies a&eacute;riennes, des agences gouvernementales ou des prestataires de services), le cas &eacute;ch&eacute;ant, afin de vous fournir les services que vous avez achet&eacute;s. Nous pouvons &eacute;galement vous envoyer des e-mails d&#39;information en lien avec votre achat (en cas de changement d&#39;itin&eacute;raire, par exemple). Votre adresse e-mail sera ajout&eacute;e &agrave; notre liste de diffusion afin de vous communiquer nos e-mails promotionnels. Notez que vous pourrez vous d&eacute;sabonner de cette liste de diffusion &agrave; tout moment.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Articles dangereux&lt;/strong&gt;&lt;br/&gt;Les bagages des passagers ne doivent pas contenir d&#39;articles ou de substances pouvant pr&eacute;senter un danger lors de leur transport (acides, gaz comprim&eacute;, explosifs, substances inflammables, polluants, agents oxydants, substances infectieuses, poisons, etc.). Certaines exceptions s&#39;appliquent. Veuillez consulter les &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/fr-ca/service-client/bagages/restrictions/&#39;&gt;conditions relatives aux mati&egrave;res dangereuses &lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. Vous pouvez &eacute;galement consulter le site de la &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Transportation Security Administration (TSA)&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; pour obtenir la liste d&eacute;taill&eacute;e des articles pouvant et ne pouvant pas &ecirc;tre transport&eacute;s &agrave; bord des avions commerciaux.&lt;/p&gt;&lt;/section&gt;',
  'en-ie':
    '&lt;section id=&#39;terms&#39;&gt;&lt;p&gt;By clicking &#8222;CONTINUE&#8220; below you have read and accepted Icelandair&#8216;s &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-ie/support/terms-and-conditions/privacy-terms/&#39;&gt;privacy policy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;,  &lt;span class=&#39;link&#39; tabindex=&#39;0&#39; id=&#39;purchaseConditionLink&#39;&gt;purchase conditions&lt;/span&gt;, limits of liability, &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-ie/support/baggage/allowance/&#39;&gt;baggage policy&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; and the &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-ie/support/baggage/restrictions/&#39;&gt;hazardous materials conditions&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;.*&lt;/p&gt;&lt;p&gt;Please note, Icelandair&#39;s baggage allowance may differ from other airlines in your itinerary.&lt;/p&gt;&lt;p&gt;By completing this booking, you consent to our sharing your personal information with third parties (e.g. other airlines, government agencies, service providers), as applicable, to deliver the services you purchased. We may also send you service emails associated with your purchase (e.g. itinerary change) and your email address will be subscribed to receive promotional emails, from which you may immediately unsubscribe.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Dangerous goods&lt;/strong&gt;&lt;br/&gt;Passenger baggage must not contain any articles or substances that may present a danger during transport: e.g Acids ,Compressed Gas, Explosives, Flammable Substances, Pollutants, Oxidising Agents, Infectious Substances, Poisons Some exceptions apply. Please check the &lt;a target=&#39;_blank&#39; href=&#39;https://www.icelandair.com/en-ie/support/baggage/restrictions/&#39;&gt;hazardous materials conditions&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt;. You may also visit the &lt;a target=&#39;_blank&#39; href=&#39;https://www.tsa.gov/travel/security-screening/whatcanibring&#39;&gt;Transportation Security Administration (TSA) website&lt;i class=&quot;padding-left icon-external-link&quot; aria-hidden=&quot;true&quot; title=&quot;Open new window&quot;&gt;&lt;/i&gt;&lt;span class=&quot;plnext-sr-only&quot;&gt;Open new window&lt;/span&gt;&lt;/a&gt; for a list of items that can and cannot be transported on passenger aircraft.&lt;/p&gt;&lt;/section&gt;'
}

var checkBoxTerms = {
  'en-us':{
    baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/support/terms-and-conditions/optional-service-and-fees/" class="link" target="_blank">Additional Baggage and optional service fees may apply <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
    terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Privacy Policy</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> I understand that Icelandair will process my personal information. I confirm that I have reviewed icelandair&lsquo;s <a href="https://www.icelandair.com/support/terms-and-conditions/privacy-policy/" class="link" target="_blank">privacy policy <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> which describes how personal information is processed.</label></p></div></section>',
    errorMessage: '<p class="error">We think it&lsquo;s important that you understand how your personal information is processed. To continue, please confirm that you have reviewed our Privacy Policy.</p>'
  },
  'is-is': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/is/adstod/skilmalar-og-skilyrdi/bokanir-farangur-og-thjonusta-um-bord/" class="link" target="_blank">Yfirvigtargjald og &ouml;nnur aukagj&ouml;ld geta &aacute;tt vi&eth; <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms:'<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Pers&oacute;nuverndarskilm&aacute;lar</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy">&Eacute;g skil og sam&thorn;ykki a&eth; Icelandair muni me&eth;h&ouml;ndla pers&oacute;nulegar uppl&yacute;singar um mig. &Eacute;g sta&eth;fest h&eacute;r me&eth; a&eth; &eacute;g hafi lesi&eth; <a href="https://www.icelandair.com/is/adstod/skilmalar-og-skilyrdi/privacy-policy/" class="link" target="_blank">Pers&oacute;nuverndarskilm&aacute;la<i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> Icelandair, sem &uacute;tsk&yacute;rir &aacute; &iacute;tarlegan h&aacute;tt hvernig uppl&yacute;singarnar eru me&eth;h&ouml;ndla&eth;ar.</label></p></div></section>',
  errorMessage: '<p class="error">&THORN;a&eth; er mikilv&aelig;gt a&eth; &thorn;&uacute; vitir hvernig vi&eth; me&eth;h&ouml;ndlum pers&oacute;nuuppl&yacute;singar. Til a&eth; halda &aacute;fram &thorn;arftu a&eth; sta&eth;festa a&eth; &thorn;&uacute; hafir lesi&eth; pers&oacute;nuverndarskilm&aacute;lan okkar.</p>'  },
  'da-dk':{
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/da-dk/support/vilkaar-og-betingelser/valgfri-service-og-gebyr/" class="link" target="_blank">Der kan v&aelig;re gebyrer for ekstra tilladt bagage og valgfri service <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Fortrolighedspolitik</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Jeg forst&aring;r, at Icelandair vil behandle mine personlige oplysninger. Jeg bekr&aelig;fter, at jeg har gennemg&aring;et Islandairs <a href="https://www.icelandair.com/da-dk/support/vilkaar-og-betingelser/privacy-policy/" class="link" target="_blank">fortrolighedspolitik <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a>, som beskriver, hvordan personoplysninger behandles.</label></p></div></section>',
  errorMessage: '<p class="error">Vi mener, at det er vigtigt, at du forst&aring;r, hvordan dine personlige oplysninger behandles. For at forts&aelig;tte, bedes du bekr&aelig;fte, at du har gennemg&aring;et vores fortrolighedspolitik.</p>'
  },
  'en-gb':{
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/en-gb/support/terms-and-conditions/optional-service-and-fees/" class="link" target="_blank">Additional Baggage and optional service fees may apply <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms:'<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Privacy Policy</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> I understand that Icelandair will process my personal information. I confirm that I have reviewed icelandair&lsquo;s <a href="https://www.icelandair.com/support/terms-and-conditions/privacy-policy/" class="link" target="_blank">privacy policy <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> which describes how personal information is processed.</label></p></div></section>',
  errorMessage: '<p class="error">We think it&lsquo;s important that you understand how your personal information is processed. To continue, please confirm that you have reviewed our Privacy Policy.</p>'
  },
  'de-de': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/de-de/hilfe/allgemeine-geschaftsbedingungen/optionale-dienstleistungen-und-gebuehren/" class="link" target="_blank">Zus&auml;tzliche Gep&auml;ck- und optionale Bearbeitungsgeb&uuml;hren k&ouml;nnen anfallen. <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Datenschutzbestimmungen</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Ich verstehe, dass Icelandair meine pers&ouml;nlichen Daten verarbeitet. Ich best&auml;tige hiermit, dass ich die <a href="https://www.icelandair.com/de-de/hilfe/allgemeine-geschaftsbedingungen/privacy-policy/" class="link" target="_blank">Datenschutzerkl&auml;rung <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> von Icelandair gelesen habe, in der beschrieben wird, wie personenbezogene Daten verarbeitet werden.</label></p></div></section>',
  errorMessage: '<p class="error">Wir finden es wichtig, dass Sie verstehen, wie Ihre pers&ouml;nlichen Daten verarbeitet werden. Um fortzufahren, best&auml;tigen Sie bitte, dass Sie unsere Datenschutzerkl&auml;rung gelesen haben.</p>'
  },
  'sv-se': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/sv-se/support/villkor-och-bestammelser/tillvalda-tjanster-och-kostnader/" class="link" target="_blank">Ytterligare avgifter f&ouml;r extra bagage och valfria tj&auml;nster kan tillkomma <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Integritet policy</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Jag f&ouml;rst&aring;r att Icelandair kommer att behandla mina personuppgifter. Jag bekr&auml;ftar att jag har granskat Icelandairs <a href="https://www.icelandair.com/sv-se/support/villkor-och-bestammelser/privacy-policy/" class="link" target="_blank">integritetspolicy <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a>, som beskriver hur personlig information behandlas.</label></p></div></section>',
  errorMessage: '<p class="error">Vi anser att det &auml;r viktigt att du f&ouml;rst&aring;r hur din personliga information behandlas. F&ouml;r att forts&auml;tta, bekr&auml;fta att du har granskat v&aring;r integritetspolicy.</p>'
  },
  'it-it': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/it-it/supporto/termini-e-condizioni/optional-service-and-fees/" class="link" target="_blank">si possono verificare dei bagagli e di servizio opzionale &Egrave; possibile che tariffe <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Politica di Privacy</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Comprendo che Icelandair elaborer&agrave;  le mie informazioni personali. Confermo di aver preso visione <a href="https://www.icelandair.com/it-it/supporto/termini-e-condizioni/privacy-policy/" class="link" target="_blank">dell&acute;Informativa sulla Privacy <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a>, che descrive come le informazioni personali vengono elaborate. </label></p></div></section>',
  errorMessage: '<p class="error">Pensiamo sia importante che tu capisca come le tue informazioni personali vengono elaborate.  Per continuare, conferma cortesemente di aver esaminato la nostra Informativa sulla Privacy.</p>'
  },
  'es-es': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/es-es/asistencia/condiciones/optional-service-and-fees/" class="link" target="_blank">Se pueden aplicar cargos por equipaje adicional y servicio opcional. <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Pol&iacute;tica de privacidad</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Entiendo que Icelandair procesar&aacute; mi informaci&oacute;n personal. Confirmo que revis&eacute; <a href="https://www.icelandair.com/es-es/asistencia/condiciones/privacy-policy/" class="link" target="_blank">la Pol&iacute;tica de privacidad <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> de Icelandair, que describe c&oacute;mo se procesa la informaci&oacute;n personal.</label></p></div></section>',
  errorMessage: '<p class="error">Para nosotros es importante que comprenda c&oacute;mo se procesa su informaci&oacute;n personal. Para continuar, confirme que ha revisado nuestra Pol&iacute;tica de privacidad.</p>'
  },
  'no-no': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/no-no/kundeservice/betingelser-og-vilkar/valgfri-service-og-avgifter/" class="link" target="_blank">Ekstra avgifter for bagasje og valgfrie tjenester kan gjelde <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Personverns&aelig;rklering</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Jeg forst&aring;r at Icelandair vil behandle mine personlige opplysninger. Jeg bekrefter at jeg har gjennomg&aring;tt Icelandairs <a href="https://www.icelandair.com/no-no/kundeservice/betingelser-og-vilkar/privacy-policy/" class="link" target="_blank">retningslinjer for personvern <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a>, som beskriver hvordan personlig informasjon behandles.</label></p></div></section>',
  errorMessage: '<p class="error">Vi synes det er viktig at du forst&aring;r hvordan dine personlige opplysninger behandles. For &aring; fortsette, vennligst bekreft at du har gjennomg&aring;tt v&aring;re retningslinjer for personvern.</p>'
  },
  'en-ca': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/en-ca/support/terms-and-conditions/optional-service-and-fees/" class="link" target="_blank">Additional Baggage and optional service fees may apply <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Privacy Policy</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> I understand that Icelandair will process my personal information. I confirm that I have reviewed icelandair&lsquo;s <a href="https://www.icelandair.com/en-ca/support/terms-and-conditions/privacy-policy/" class="link" target="_blank">privacy policy <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> which describes how personal information is processed.</label></p></div></section>',
  errorMessage: '<p class="error">We think it&lsquo;s important that you understand how your personal information is processed. To continue, please confirm that you have reviewed our Privacy Policy.</p>'
  },
  'fr-fr': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/fr-fr/service-client/termes-et-conditions/frais-et-services-optionnels/" class="link" target="_blank">Des frais pour les bagages exc&eacute;dentaires et les services optionnels peuvent s&lsquo;appliquer. <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Politique de Confidentialit&eacute;</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Je comprends qu&lsquo;Icelandair traitera mes informations personnelles. Je confirme avois pris connaissance de la politique de <a href="https://www.icelandair.com/fr-fr/service-client/termes-et-conditions/privacy-policy/" class="link" target="_blank">confidentialit&eacute; <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> d&lsquo;Icelandair, qui d&eacute;crit comment les informations personnelles sont trait&eacute;es.</label></p></div></section>',
  errorMessage: '<p class="error">Nous pensons qu&lsquo;il est important que vous sachiez comment vos informations personnelles sont trait&eacute;es. Pour continuer, veuillez confirmer que vous avez pris connaissance de notre politique de confidentialit&eacute;.</p>'
  },
  'fi-fi': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/fi-fi/tuki/ehdot-ja-maaraykset/optional-service-and-fees/" class="link" target="_blank">Lis&auml;matkatavaroista ja valinnaisista palveluista saatetaan peri&auml; lis&auml;maksuja <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Tietosuojaseloste</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Ymm&auml;rr&auml;n, ett&auml; Icelandair k&auml;sittelee henkil&ouml;tietojani. Vahvistan, ett&auml; olen lukenut Icelandairin <a href="https://www.icelandair.com/fi-fi/tuki/ehdot-ja-maaraykset/privacy-policy/" class="link" target="_blank">tietosuojak&auml;yt&auml;nn&ouml;n <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> , jossa kerrotaan, kuinka henkil&ouml;tietojani k&auml;sitell&auml;&auml;n.</label></p></div></section>',
  errorMessage: '<p class="error">Meille on t&auml;rke&auml;&auml;, ett&auml; tied&auml;t, kuinka henkil&ouml;tietojasi k&auml;sitell&auml;&auml;n. Jatkaaksesi vahvista, ett&auml; olet lukenut tietosuojak&auml;yt&auml;nt&ouml;mme.</p>'
  },
  'nl-nl': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/nl-nl/klantenservice/voorwaarden/optionele-diensten-en-kosten/" class="link" target="_blank">Het is mogelijk dat kosten worden aangerekend voor extra bagage en services <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Privacybeleid</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Ik begrijp dat Icelandair mijn persoonlijke gegevens zal verwerken. Ik bevestig dat ik het <a href="https://www.icelandair.com/nl-nl/klantenservice/voorwaarden/privacy-policy/" class="link" target="_blank">Privacybeleid <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a>van Icelandair heb gelezen, waarin wordt beschreven hoe persoonlijke informatie wordt verwerkt.</label></p></div></section>',
  errorMessage: '<p class="error">We vinden het belangrijk dat u begrijpt hoe uw persoonlijke informatie wordt verwerkt. Bevestig dat u ons Privacybeleid hebt herzien om door te gaan.</p>'
  },
  'ru-ru': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/ru-ru/support/terms-and-conditions/optional-service-and-fees/" class="link" target="_blank">&#1052;&#1086;&#1075;&#1091;&#1090; &#1087;&#1088;&#1080;&#1084;&#1077;&#1085;&#1103;&#1090;&#1100;&#1089;&#1103; &#1076;&#1086;&#1087;&#1086;&#1083;&#1085;&#1080;&#1090;&#1077;&#1083;&#1100;&#1085;&#1099;&#1077; &#1089;&#1073;&#1086;&#1088;&#1099; &#1079;&#1072; &#1073;&#1072;&#1075;&#1072;&#1078; &#1080; &#1089;&#1077;&#1088;&#1074;&#1080;&#1089;&#1085;&#1099;&#1077; &#1089;&#1073;&#1086;&#1088;&#1099; <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">&#1087;&#1086;&#1083;&#1080;&#1090;&#1080;&#1082;&#1072; &#1082;&#1086;&#1085;&#1092;&#1080;&#1076;&#1077;&#1085;&#1094;&#1080;&#1072;&#1083;&#1100;&#1085;&#1086;&#1089;&#1090;&#1080;</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> &#1071; &#1087;&#1086;&#1085;&#1080;&#1084;&#1072;&#1102;, &#1095;&#1090;&#1086; Icelandair &#1086;&#1073;&#1088;&#1072;&#1073;&#1086;&#1090;&#1072;&#1077;&#1090; &#1084;&#1086;&#1102; &#1083;&#1080;&#1095;&#1085;&#1091;&#1102; &#1080;&#1085;&#1092;&#1086;&#1088;&#1084;&#1072;&#1094;&#1080;&#1102;. &#1071; &#1087;&#1086;&#1076;&#1090;&#1074;&#1077;&#1088;&#1078;&#1076;&#1072;&#1102;, &#1095;&#1090;&#1086; &#1088;&#1072;&#1089;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1083; &#1055;&#1086;&#1083;&#1080;&#1090;&#1080;&#1082;&#1091; <a href="https://www.icelandair.com/ru-ru/support/terms-and-conditions/privacy-policy/" class="link" target="_blank">&#1082;&#1086;&#1085;&#1092;&#1080;&#1076;&#1077;&#1085;&#1094;&#1080;&#1072;&#1083;&#1100;&#1085;&#1086;&#1089;&#1090;&#1080; <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> Icelandair, &#1074; &#1082;&#1086;&#1090;&#1086;&#1088;&#1086;&#1081; &#1086;&#1087;&#1080;&#1089;&#1099;&#1074;&#1072;&#1077;&#1090;&#1089;&#1103;, &#1082;&#1072;&#1082; &#1086;&#1073;&#1088;&#1072;&#1073;&#1072;&#1090;&#1099;&#1074;&#1072;&#1077;&#1090;&#1089;&#1103; &#1083;&#1080;&#1095;&#1085;&#1072;&#1103; &#1080;&#1085;&#1092;&#1086;&#1088;&#1084;&#1072;&#1094;&#1080;&#1103;.</label></p></div></section>',
  errorMessage: '<p class="error">&#1052;&#1099; &#1089;&#1095;&#1080;&#1090;&#1072;&#1077;&#1084; &#1074;&#1072;&#1078;&#1085;&#1099;&#1084;, &#1095;&#1090;&#1086;&#1073;&#1099; &#1074;&#1099; &#1087;&#1086;&#1085;&#1080;&#1084;&#1072;&#1083;&#1080;, &#1082;&#1072;&#1082; &#1086;&#1073;&#1088;&#1072;&#1073;&#1072;&#1090;&#1099;&#1074;&#1072;&#1077;&#1090;&#1089;&#1103; &#1074;&#1072;&#1096;&#1072; &#1083;&#1080;&#1095;&#1085;&#1072;&#1103; &#1080;&#1085;&#1092;&#1086;&#1088;&#1084;&#1072;&#1094;&#1080;&#1103;. &#1063;&#1090;&#1086;&#1073;&#1099; &#1087;&#1088;&#1086;&#1076;&#1086;&#1083;&#1078;&#1080;&#1090;&#1100;, &#1087;&#1086;&#1078;&#1072;&#1083;&#1091;&#1081;&#1089;&#1090;&#1072;, &#1087;&#1086;&#1076;&#1090;&#1074;&#1077;&#1088;&#1076;&#1080;&#1090;&#1077;, &#1095;&#1090;&#1086; &#1074;&#1099; &#1087;&#1077;&#1088;&#1077;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1083;&#1080; &#1085;&#1072;&#1096;&#1091; &#1055;&#1086;&#1083;&#1080;&#1090;&#1080;&#1082;&#1091; &#1082;&#1086;&#1085;&#1092;&#1080;&#1076;&#1077;&#1085;&#1094;&#1080;&#1072;&#1083;&#1100;&#1085;&#1086;&#1089;&#1090;&#1080;.</p>'
  },
  'fr-ca': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/fr-ca/service-client/termes-et-conditions/frais-et-services-optionnels/" class="link" target="_blank">Des frais pour les bagages exc&eacute;dentaires et les services optionnels peuvent s&lsquo;appliquer. <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Politique de Confidentialit&eacute;</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> Je comprends qu&lsquo;Icelandair traitera mes informations personnelles. Je confirme avois pris connaissance de la politique de <a href="https://www.icelandair.com/fr-ca/service-client/termes-et-conditions/privacy-policy/" class="link" target="_blank">confidentialit&eacute; <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> d&lsquo;Icelandair, qui d&eacute;crit comment les informations personnelles sont trait&eacute;es.</label></p></div></section>',
  errorMessage: '<p class="error">Nous pensons qu&lsquo;il est important que vous sachiez comment vos informations personnelles sont trait&eacute;es. Pour continuer, veuillez confirmer que vous avez pris connaissance de notre politique de confidentialit&eacute;.</p>'
  },
  'en-ie': {
  baggageFees: '<section id="component-additional-baggage" class="component-container col-xs-24 anchor"><div class="checkbox"><p><label style="display: inline;" for="additional_baggage"><a href="https://www.icelandair.com/en-ie/support/terms-and-conditions/optional-service-and-fees/" class="link" target="_blank">Additional Baggage and optional service fees may apply <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a></label></p></div></section>',
  terms: '<section id="component-term-conditions" class="component-container col-xs-24 anchor"><span class="bold">Privacy Policy</span><div class="checkbox"><p><input type="checkbox" name="privacy_policy" id="privacy_policy"><label style="display: inline;" for="privacy_policy"> I understand that Icelandair will process my personal information. I confirm that I have reviewed icelandair&lsquo;s <a href="https://www.icelandair.com/en-ie/support/terms-and-conditions/privacy-policy/" class="link" target="_blank">privacy policy <i class="icon icon-external-link" aria-hidden="true" title="Open new window"></i></a> which describes how personal information is processed.</label></p></div></section>',
  errorMessage: '<p class="error">We think it&lsquo;s important that you understand how your personal information is processed. To continue, please confirm that you have reviewed our Privacy Policy.</p>'
  }
}

var ancills = {
  SEA: 0, // SEAT
  BAG: 0, // EXTRA BAG
  MEA: 0, // MEAL
  SPO: 0 // SPORTS BAG
}

var cabinIndicator = {
  'Economy Light': 'M',
  'Economy Standard': 'M',
  'Economy Flex': 'M',
  'Economy Comfort': 'Y',
  'Saga Business Class': 'C',
  'Saga Class': 'C',
  'Saga Premium Flex': 'C',
  'Saga Premium': 'C'
}

$.urlParam = function(name) {
  var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)
  if (results == null) {
    return 'unknown'
  } else {
    return results[1] || 0
  }
}

if (window.addEventListener) {
  window.addEventListener('message', postToBookingFlow, false)
} else if (window.attachEvent) {
  window.attachEvent('onmessage', postToBookingFlow, false)
}

if(getUrlParameter('EMBEDDED_TRANSACTION') === 'RetrievePNR' && getUrlParameter('SO_SITE_ALLOW_SEC_SERV_QUOT') === 'FALSE') {
  var url = window.location.href.replace('SO_SITE_ALLOW_SEC_SERV_QUOT=FALSE', 'SO_SITE_ALLOW_SEC_SERV_QUOT=TRUE')
  $(location).attr('href', url)
}

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}
//Hack for header booking enginge cross origin
function postToBookingFlow(event) {
  if (event !== undefined && event.data !== undefined && event.data.url !== undefined) {
    if (event.data.url.indexOf('https://www.icelandair.com/booking/flow/') !== -1) {
      document.location.assign(event.data.url)
    }
  }
  return
}

function getLang(langParam, external_id) {
  if (langParam === 'FR' && external_id === 'CA') {
    return lang[langParam + external_id]
  } else if (langParam === 'US' && external_id === 'IE' || langParam === 'US' && external_id === 'CA' || langParam === 'GB' && external_id === 'IE' ) {
    return lang[external_id]
  }
  return lang[langParam]
}

function SetCookie (name, value) {
  var argv = SetCookie.arguments;
  var argc = SetCookie.arguments.length;
  var expires = (argc > 2) ? argv[2] : null;
  var path = '/';
  //var domain = '.icelandair.is';
  var domain = '.icelandair.com';
  var secure = (argc > 5) ? argv[5] : false;

  document.cookie = name + "=" + escape (value) +
      ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
      ((path == null) ? "" : ("; path=" + path)) +
      ((domain == null) ? "" : ("; domain=" + domain)) +
      ((secure) ? "; secure" : "");
}

function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
    return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}
function getCookieVal(offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
  endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function formatDepartureDate(date) {
  if (date.indexOf('/') !== -1) {
    var day = date.substring(0, 2)
    var month = date.substring(3, 5)
    var year = date.substring(6, 10)
    return month + '/' + day + '/' + year
  } else if (date.indexOf(',') !== -1) {
    date = new Date(date)
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
  }
}

function formatDate(date) {
  var day = date.substring(0, 2)
  var month = date.substring(3, 5)
  var year = date.substring(6, 10)
  var formatted = year + '-' + month + '-' + day
  return formatted
}

function formatDateOfSale(date) {
  var year = date.substring(0, 4)
  var month = date.substring(5, 7)
  var day = date.substring(8, 10) 
  var formatted = year + '/' + month + '/' + day
  return formatted
}

function formatErrorDate(date) {
  var year = date.substring(0, 4)
  var month = date.substring(4, 6)
  var day = date.substring(6, 8)
  var formatted = year + '-' + month + '-' + day
  return formatted
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function formatAmadeusDate(date){
  if (date != null && date != 'undefined') {
    return new Date(date.split('/')[2], date.split('/')[1]-1, date.split('/')[0]);;
  } else {
    return null;
  }
}

function calculate(amount) {
  try {
    var amountToUse = validateAmount(amount)
    if (eBaDataLayer.currency === 'USD') {
      return parseFloat(amountToUse);
    }  
    var rate = findRate(eBaDataLayer.currency)
    return (parseFloat(amountToUse) / parseFloat(rate)).toFixed(2);
  } catch (error) 
  {
    console.log(error);
  }
}

function findRate(rateCode) {
  return rates[rateCode];
}

  var eventVersionMap = {
    ancillary_product_selected: 8,
    ancillary_product_selection_confirmed: 10,
    ancillary_section_opened: 8,
    booking_step_1_completed_select_flight: 13,
    booking_step_2_completed_passenger_info: 12,
    booking_step_2b_completed_apis: 5,
    booking_step_3_completed_ancillaries: 13,
    booking_step_3b_completed_overview: 11,
    booking_step_6_completed_booking_confirmed: 15,
    edit_search_clicked: 10,
    error: 14,
    manage_booking_overview_opened: 5,
    successful_flight_search_made: 19,
    upsell_teaser_clicked: 3,
    warning: 16,
    systemPropertiesVersion: 10,
    userPropertiesVersion: 14,
    nativePropertiesVersion: 16
  }

function validateAmount(amount) {
  if (/^[0-9\.\,]+$/.test(amount) === false) {
    return 0
  }
  amount = amount.toString()
  var commaIndex = amount.indexOf(',')
  var dotIndex = amount.indexOf('.')
  if (commaIndex > -1 && dotIndex > -1) {
    if (dotIndex > commaIndex) {
      amount = amount.replace(',', '')
    } else {
      amount = amount.replace('.', '').replace(',', '.')
    }
  } else if (commaIndex > -1) {
    if (commaIndex === amount.length - 3 || commaIndex === amount.length - 2) {
      amount = amount.replace(',', '.')
    } else {
      amount = amount.replace(',', '')
    }
  } else if (dotIndex > -1) {
    if (dotIndex === amount.length - 3 || dotIndex === amount.length - 2) {
    } else {
      amount = amount.replace('.', '')
    }
  }
  amount = parseFloat(amount)
  if (isNaN(amount)) {
    return 0
  }
  return amount
}

function createEditSearchUrl(data) {
  jQuery.each(data.passengers, function(index, value) {
    if (value.pax_type === 'B15') {
      paxList['YTH'] = value.nb_pax_type
    } else {
      paxList[value.pax_type] = value.nb_pax_type
    }
  })
  var inbound = data.city_search_in;
  var outbound = data.city_search_out;
  if (inbound === 'REK') {
    inbound = 'KEF';
  }
  if (outbound === 'REK') {
    outbound = 'KEF';
  }
  var lang = getLang(data.language, data.external_id).langIdentifiers;
  if (lang === 'en-us'){
    lang = '';
  } else if (lang === 'is-is') {
    lang = 'is/'
  } else {
    lang = lang + '/';
  }
  var url = 'https://www.icelandair.com/' + lang;
  var tryptype = data.trip_type === 'RT' ? 'return' : 'oneway';
  // TODO add locale
  url += '?triptype=' + tryptype;
  url +=  '&adt=' + paxList['ADT'];
  url +=  '&yth=' + paxList['YTH'];
  url +=  '&chd=' + paxList['CHD'];
  url +=  '&inf=' + paxList['INF'];
  url +=  '&legstart1=' + outbound
  url +=  '&legend1=' + inbound;
  url +=  '&legdate1=' + formatDate(data.date_search_out);
  if (data.trip_type === 'RT') {
    url +=  '&legstart2=' + inbound;
    url +=  '&legend2=' + outbound;
    url +=  '&legdate2=' + formatDate(data.date_search_in);
  }
  return url;
}

function formatNewCarSerach(dateIn, dateOut, arrival, data, page, currency){
  var newCarSearch = '&pickupIATACode=' + arrival
  newCarSearch += '&pickupYear=' + dateIn.getFullYear();
  var month = dateIn.getMonth() + 1;
  newCarSearch += '&pickupMonth=' + month;
  newCarSearch += '&pickupDate='  + dateIn.getDate();
  newCarSearch += '&pickupHour=17&pickupMinute=00'
  newCarSearch += '&returnYear=' + dateOut.getFullYear();
  var monthout = dateOut.getMonth() + 1;
  newCarSearch += '&returnMonth=' + monthout;
  newCarSearch += '&returnDate=' + dateOut.getDate();
  newCarSearch += '&returnHour=17&returnMinute=00';
  if(data.language.toLowerCase() !== 'se') {
    newCarSearch += '&preflang=' +  data.language.toLowerCase() 
  } else {
    newCarSearch += '&preflang=' + 'sv';
  }
  newCarSearch += '&results=1';
  if (currency !== undefined) {
    newCarSearch += '&prefcurrency=' + currency.toLowerCase();
  }
  if (page === 'RTPL') {
    newCarSearch += '&adcamp=managepage';
  } else {
    newCarSearch += '&adcamp=confpage';
  }
  newCarSearch += '&dateJump=false';
  return newCarSearch;
}

function formatNewHotelSearch(dateIn, dateOut, city, data){
  var month = dateIn.getMonth() + 1;
  var newHotelSearch = '?checkin=' + dateIn.getFullYear() + '-' + month + '-' + dateIn.getDate();
  var monthOut = dateOut.getMonth() + 1;
  newHotelSearch +=  '&checkout=' + dateOut.getFullYear() + '-' + monthOut + '-' + dateOut.getDate();
  newHotelSearch +=  '&iata_orr=' + 1;
  if (city === 'KEF' || city === 'REK') {
    city = 'RKV'
  }
  newHotelSearch += '&iata=' + city;
  if(data.language.toLowerCase() !== 'se') {
    newHotelSearch += '&lang=' +  data.language.toLowerCase() 
  } else {
    newHotelSearch += '&lang=' + 'sv';
  }
  if(data.currency !== undefined) {
    newHotelSearch += '&selected_currency=' + data.currency;
  }
  if (data.page_code === 'RTPL') {
    newHotelSearch += '&label=icelandair-mb-link';
  } else {
    newHotelSearch += '&label=icelandair-confpage-link';
  }
  return newHotelSearch;
}

function getUserID() {
  var userID = GetCookie('ice_uuid')
  if (userID == null) {
    userID = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 45; i++) {
      userID += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    SetCookie('ice_uuid', userID, exp, '/', getDomain(window.location.href))
  }
  return userID
}

function getCid() {
  var gaCookie = GetCookie('_ga')
    if (gaCookie) {
      return gaCookie.split(gaCookie.match(/GA[0-9]+\.[0-9]+\./))[1]
    }
    return 'unknown'
}

/*used for inbound cabin in event tracking, group all economy types to class and saga premium types to saga premium, leave comfort untouched */
/* after fare family changes need to remove this date check and always send all economy types as economy */
function checkIfEconomyClass(cls) {
  if (typeof cls != 'undefined' && cls.indexOf('Economy Comfort') == -1 && cls.indexOf('Saga') == -1) {
     return 'Economy'
  } else if (typeof cls != 'undefined' && cls.indexOf('Saga Premium') !== -1) {
    return 'Saga Premium'
  } else if (typeof cls == 'undefined') {
    return 'not-available'
  }
  return cls
}

function checkIfCookieHasExpired() {
  var currentTime = new Date().getTime();
  var sessionValue = GetCookie('ice_sessionId');
  var lastEventSentTime = GetCookie('ice_lastEventSent');
  // Check if sessionstarted never been sent or last event was sent more than 30 minutes ago
  if (!sessionValue
      || lastEventSentTime && currentTime - lastEventSentTime > 30 * 60000
      || !lastEventSentTime && sessionValue && currentTime - sessionValue > 30 * 60000) {
    // To fire off another sessionStarted event
    SetCookie('ice_sessionId', currentTime)
  }
}

function trackUpsellTeaser(event, bookingInfo, upsellTo) {
  var upgradefromClass = null;
  if(upsellTo === 'Saga Premium') {
    upgradefromClass = 'Economy Standard'
  } else if (upsellTo === 'Saga Premium Flex') {
    upgradefromClass = 'Economy Flex'
  } else {
    upgradefromClass = 'Economy Light'
  }
  eventtracking(event, bookingInfo, null, null, upgradefromClass, upsellTo);
}

function getLeadTime(outboundDepartureDate) {
  try {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var secondDate = new Date(new Date(outboundDepartureDate));
    var firstDate = new Date();
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  } catch(e) {
    return undefined;
  }
}

function getLowestAvailablePrice () {
  if (
    plnextv2 != undefined &&
    plnextv2.utils != undefined &&
    plnextv2.utils.pageProvider != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData != undefined && 
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.Availability != undefined && 
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.Availability.cube != undefined && 
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.Availability.cube.bestCombinationPrice != undefined
  ) {
    return plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.Availability.cube.bestCombinationPrice;
  }
  return null;
}

function getPriceMatch(instantPrice, lowestPriceAvailable) {
  if (instantPrice && $.isNumeric(instantPrice) && lowestPriceAvailable){
    var price = parseInt(instantPrice)
    var diff = 100 * Math.abs( (lowestPriceAvailable - price) / ( (lowestPriceAvailable + price)/2 ) );
    return Math.round(diff);
  }
  return null;
}

function eventtracking(event, bookingInfo, type, portal, upsellFrom, upsellTo) {
  /*For now only trigger tracking for round trip and one way searches*/
  /*this needs to be done as bound isnt available on the first step in amadeus*/
  var version = eventVersionMap[event] || 3
  try {
    checkIfCookieHasExpired();
    var outboundDep = bookingInfo.hasOwnProperty('bound')
      ? bookingInfo.bound[0].dep_airport
      : bookingInfo.search.flights[0].departure.location_code
    var outboundArr = bookingInfo.hasOwnProperty('bound')
      ? bookingInfo.bound[0].arr_airport
      : bookingInfo.search.flights[0].arrival.location_code
    var outboundCabinIndicator = bookingInfo.hasOwnProperty('bound')
      ? cabinIndicator[bookingInfo.bound[0].selected_ff_name]
      : 'not-available'
    var outboundFareFamily = bookingInfo.hasOwnProperty('bound')
      ? bookingInfo.bound[0].selected_ff_name
      : 'not-available'
    if (outboundFareFamily === 'Saga Class') {
      outboundFareFamily = 'Saga Premium'
    }
    var outboundCabin = checkIfEconomyClass(outboundFareFamily)
    var outboundCityPair = bookingInfo.hasOwnProperty('bound')
      ? bookingInfo.bound[0].dep_airport + '-' + bookingInfo.bound[0].arr_airport
      : bookingInfo.search.flights[0].departure.location_code +
        '-' +
        bookingInfo.search.flights[0].arrival.location_code
    var outboundNumberOfLegs =
      bookingInfo.hasOwnProperty('bound') && bookingInfo.bound[0].hasOwnProperty('flights')
        ? bookingInfo.bound[0].flights.length
        : 1
    var outboundDepartureDate = bookingInfo.date_search_out !== undefined ? formatDate(bookingInfo.date_search_out): formatDate(bookingInfo.bound[0].dep_date)
    var outboundPrice = bookingInfo.hasOwnProperty('bound') ? bookingInfo.bound[0].selected_ff_price : 0
    var outboundDepartureDateLowestPrice =
      bookingInfo.hasOwnProperty('bound') && bookingInfo.bound[0].lowest_ff_price != undefined
        ? bookingInfo.bound[0].lowest_ff_price.totalAmount
        : 0
    var outboundArrivalContinent = 'not-applicable'
    var outboundDepartureContinent = 'not-applicable'
    if (bookingInfo.hasOwnProperty('bound')) {
      outboundArrivalContinent =
        continent[bookingInfo.bound[0].arr_country] != undefined
          ? continent[bookingInfo.bound[0].arr_country]
          : 'Europe'
      outboundDepartureContinent =
        continent[bookingInfo.bound[0].dep_country] != undefined
          ? continent[bookingInfo.bound[0].dep_country]
          : 'Europe'
    }
    var outboundAirlineCodes =
      bookingInfo.hasOwnProperty('bound') && bookingInfo.bound[0].airlines_code != undefined
        ? bookingInfo.bound[0].airlines_code
        : 'not-available'

    //fareFamilys outbound
    var outboundAvailableFareFamilies = []
    var outboundLowestPriceDayOfFlight = 0
    var outboundHighestPriceDayOfFlight = 0

    var portalData = null
    if(portal !== null || portal !== undefined){
      portalData = portal
    }
    var sectionType = null
    if(type !== null || type !== undefined){
      sectionType = type
    }

    var upsellFromClass = null
    if(upsellFrom !== null || upsellFrom !== undefined){
      upsellFromClass = upsellFrom
    }

    var upsellToClass = null
    if(upsellTo !== null || upsellTo !== undefined){
      upsellToClass = upsellTo
    }

    if (bookingInfo.hasOwnProperty('bound') && bookingInfo.bound[0].other_fare_families != undefined) {
      jQuery.each(bookingInfo.bound[0].other_fare_families, function(index, value) {
        if (value.fare_family_name === 'Saga Class') {
          outboundAvailableFareFamilies.push('Saga Premium')
        } else {
          outboundAvailableFareFamilies.push(value.fare_family_name)
        }
        outboundHighestPriceDayOfFlight =
          outboundHighestPriceDayOfFlight < value.price ? value.price : outboundHighestPriceDayOfFlight
        if (value.price != null) {
          outboundLowestPriceDayOfFlight =
            outboundLowestPriceDayOfFlight === 0 || outboundLowestPriceDayOfFlight > value.price
              ? value.price
              : outboundLowestPriceDayOfFlight
        }
      })
    }

    var ip = 'not-available'
    var device_manufacturer = ''
    var os_name = ''
    var browser_version = ''
    var first_passanger_age = null
    var first_passanger_gender = null
    var device_type = 'Desktop';
    var promoC = undefined;
    if (
      plnextv2 != undefined &&
      plnextv2.utils != undefined &&
      plnextv2.utils.pageProvider != undefined &&
      plnextv2.utils.pageProvider.PlnextPageProvider != undefined &&
      plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig != undefined &&
      plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData != undefined &&
      plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts != undefined
    ) {
      var basefacts = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts;
      ip = basefacts.ipAddress;
      device_manufacturer = basefacts.deviceManufacturer;
      os_name = basefacts.operatingSystem;
      browser_version = basefacts.browserVersion;
      first_passanger_age = basefacts.age1 != undefined ? basefacts.age1 : 0
      first_passanger_gender = basefacts.gender1 != undefined ? basefacts.gender1: null
      device_type = basefacts.deviceType != undefined ? capitalizeFirstLetter(basefacts.deviceType): 'Desktop'
      promoC = basefacts['PROMOCODE'];
    }

    var inboundCabin = 'not-applicable'
    var inboundCabinIndicator = 'not-applicable'
    var inboundFareFamily = 'not-applicable'
    var inboundCityPair = 'not-applicable'
    var inboundNumberOfLegs = 0
    var inboundDepartureDate = 'not-applicable'
    var inboundDep = 'not-applicable'
    var inboundArr = 'not-applicable'
    var inboundPrice = 0
    var inboundDepartureDateLowestPrice = 0
    var inboundAvailableFareFamilies = []
    var inboundLowestPriceDayOfFlight = 0
    var inboundHighestPriceDayOfFlight = 0
    var inboundArrivalContinent = 'not-applicable'
    var inboundDepartureContinent = 'not-applicable'
    var flightType = 'One Way'
    var inboundAirlineCodes = 'not-applicable'
    var AAASPrice =
      eBaDataLayer.hasOwnProperty('price_details') && bookingInfo.price_details.hasOwnProperty('AAAS_price')
        ? bookingInfo.price_details.AAAS_price.toFixed(2)
        : 0
    /* TODO: This needs be reviewed for stopover and open jaw and put the right variable in flighttype */
    if (
      bookingInfo.trip_type == 'RT' ||
      (bookingInfo.office_id.indexOf('FI08FX') != -1 && (bookingInfo.hasOwnProperty('bound') && bookingInfo.bound.length > 1 || bookingInfo.search && bookingInfo.search.flights.length > 1)) ||
      (bookingInfo.office_id.indexOf('FI08AA') != -1 && (bookingInfo.hasOwnProperty('bound') && bookingInfo.bound.length > 1 || bookingInfo.search && bookingInfo.search.flights.length > 1))
    ) {
      flightType = 'Round-trip'
      inboundDep = bookingInfo.hasOwnProperty('bound')
        ? bookingInfo.bound[1].dep_airport
        : bookingInfo.search.flights[1].departure.location_code
      inboundArr = bookingInfo.hasOwnProperty('bound')
        ? bookingInfo.bound[1].arr_airport
        : bookingInfo.search.flights[1].arrival.location_code
      inboundFareFamily = bookingInfo.hasOwnProperty('bound') ? bookingInfo.bound[1].selected_ff_name : 'not-available'
      if (inboundFareFamily === 'Saga Class') {
        inboundFareFamily = 'Saga Premium'
      }
      inboundCabin = checkIfEconomyClass(inboundFareFamily)
      inboundCabinIndicator = bookingInfo.hasOwnProperty('bound')
        ? cabinIndicator[bookingInfo.bound[1].selected_ff_name]
        : 'not-available'
      inboundCityPair = bookingInfo.hasOwnProperty('bound')
        ? bookingInfo.bound[1].dep_airport + '-' + bookingInfo.bound[1].arr_airport
        : bookingInfo.search.flights[1].departure.location_code +
          '-' +
          bookingInfo.search.flights[1].arrival.location_code
      inboundNumberOfLegs =
        bookingInfo.hasOwnProperty('bound') && bookingInfo.bound[1].hasOwnProperty('flights')
          ? bookingInfo.bound[1].flights.length
          : 1
      inboundDepartureDate = bookingInfo.date_search_in !== undefined ? formatDate(bookingInfo.date_search_in): formatDate(bookingInfo.bound[1].dep_date)
      inboundPrice =
        flightType === 'Round-trip' && bookingInfo.hasOwnProperty('bound') ? bookingInfo.bound[1].selected_ff_price : 0
      inboundDepartureDateLowestPrice =
        bookingInfo.hasOwnProperty('bound') && bookingInfo.bound[1].lowest_ff_price != undefined
          ? bookingInfo.bound[1].lowest_ff_price.totalAmount
          : 0
      if (bookingInfo.hasOwnProperty('bound')) {
        inboundArrivalContinent =
          continent[bookingInfo.bound[1].arr_country] != undefined
            ? continent[bookingInfo.bound[1].arr_country]
            : 'Europe'
        inboundDepartureContinent =
          continent[bookingInfo.bound[1].dep_country] != undefined
            ? continent[bookingInfo.bound[1].dep_country]
            : 'Europe'
      }

      inboundAirlineCodes =
        bookingInfo.hasOwnProperty('bound') && bookingInfo.bound[1].airlines_code != undefined
          ? bookingInfo.bound[1].airlines_code
          : 'not-available'

      if (bookingInfo.hasOwnProperty('bound') && bookingInfo.bound[1].other_fare_families != undefined) {
        jQuery.each(bookingInfo.bound[1].other_fare_families, function(index, value) {
          if (value.fare_family_name === 'Saga Class') {
            inboundAvailableFareFamilies.push('Saga Premium')
          } else {
            inboundAvailableFareFamilies.push(value.fare_family_name)
          }
          inboundHighestPriceDayOfFlight =
            inboundHighestPriceDayOfFlight < value.price ? value.price : inboundHighestPriceDayOfFlight
          if (value.price != null) {
            inboundLowestPriceDayOfFlight =
              inboundLowestPriceDayOfFlight === 0 || inboundLowestPriceDayOfFlight > value.price
                ? value.price
                : inboundLowestPriceDayOfFlight
          }
        })
      }
    }

    /*populate pax*/
    jQuery.each(bookingInfo.passengers, function(index, value) {
      if (value.pax_type === 'B15') {
        paxList['YTH'] = value.nb_pax_type
      } else {
        paxList[value.pax_type] = value.nb_pax_type
      }
    })

    //populate ancills data
    var boundIdsWithExtrabag = []
    var boundIdsWithMeals = []
    var boundIdsWithSportEquiptment = []
    var boundIdsWithSeat = []
    var numberOfExtraBags = 0
    var numberOfMeals = 0
    var numberOfSportEquiptment = 0
    var amountExtraBags = 0
    var amountMeals = 0
    var amountSeats = 0
    var amountSportEquiptment = 0
    var numberOfSeats = 0
    var numberOfWheelchairRequests = 0
    var arrayMoreLegroomSeatPrices = []
    var arrayLegroomSeat = []
    var numberLegsMoreLegroomSeatRequests = []
    if (bookingInfo.ancillary_services !== undefined) {
      jQuery.each(bookingInfo.ancillary_services, function(index, value) {
        if (value.category_code === 'BAG') {
          amountExtraBags += value.total_price
          numberOfExtraBags += value.quantity
          if (boundIdsWithExtrabag[value.bound_id] === undefined) {
            boundIdsWithExtrabag.push(value.bound_id)
          }
        } else if (value.category_code === 'MEA') {
          amountMeals += value.total_price
          numberOfMeals += value.quantity
          if (boundIdsWithMeals[value.segment_id] === undefined) {
            boundIdsWithMeals.push(value.segment_id)
          }
        } else if (value.category_code === 'SPO') {
          amountSportEquiptment += value.total_price
          numberOfSportEquiptment += value.quantity
          if (boundIdsWithSportEquiptment[value.bound_id] === undefined) {
            boundIdsWithSportEquiptment.push(value.bound_id)
          }
        } else if (value.category_code === 'SEA') {
          numberOfSeats += value.quantity
          amountSeats += value.total_price
          arrayMoreLegroomSeatPrices.push(value.total_price.toString())
          if(value.total_price > 0) {
              arrayLegroomSeat.push(value.total_price)
            if(numberLegsMoreLegroomSeatRequests[value.segment_id] === undefined) {
              numberLegsMoreLegroomSeatRequests.push(value.segment_id)
            }
          }
          if (boundIdsWithSeat[value.segment_id] === undefined) {
            boundIdsWithSeat.push(value.segment_id)
          }
        }

        if (value.code === 'SPE') {
          numberOfWheelchairRequests++
        }
      })
    }

    var Stopover = 'None'
    var interline = 'None'
    var inboundStopoverDays = 0
    var outboundStopoverDays = 0
    if (bookingInfo.hasOwnProperty('bound') && bookingInfo.bound.length >= 3) {
      var data = findStopOverInfo(bookingInfo.bound)
      if (data.outbound && data.inbound) {
        Stopover = 'Outbound and Inbound'
        outboundStopoverDays = data.outboundDays
        inboundStopoverDays = data.inboundDays
      } else if (data.outbound) {
        Stopover = 'Outbound'
        outboundStopoverDays = data.outboundDays
      } else if (data.inbound) {
        Stopover = 'Inbound'
        inboundStopoverDays = data.inboundDays
      }
      outboundCityPair = data.outboundCityPair
      inboundCityPair = data.inboundCityPair
      inboundNumberOfLegs = data.inboundNumberOfLegs
      outboundNumberOfLegs = data.outboundNumberOfLegs
      inboundDep = data.inboundDepartureAirport
      inboundArr = data.inboundArrivalAirport
      outboundDep = data.outboundDepartureAirport
      outboundArr = data.outboundArrivalAirport

      //Check if is interline on stopover
      if (data.outboundInterLine && data.inboundInterLine) {
        interline = 'Outbound and Inbound'
      } else if (data.outboundInterLine) {
        interline = 'Outbound'
      } else if (data.inboundInterLine) {
        interline = 'Inbound'
      }
    } else if (bookingInfo.hasOwnProperty('bound')) {
      //check if is interline on oneway or return
      var outboundInt = isInterline(bookingInfo.bound[0]) 
      var inboundInt = false
      if (
        bookingInfo.trip_type == 'RT' ||
        (bookingInfo.office_id.indexOf('FI08FX') != -1 && (bookingInfo.hasOwnProperty('bound') && bookingInfo.bound.length > 1 || bookingInfo.search && bookingInfo.search.flights.length > 1)) ||
        (bookingInfo.office_id.indexOf('FI08AA') != -1 && (bookingInfo.hasOwnProperty('bound') && bookingInfo.bound.length > 1 || bookingInfo.search && bookingInfo.search.flights.length > 1))
      ) {
        inboundInt = isInterline(bookingInfo.bound[1])
      }
      if (outboundInt && inboundInt) {
        interline = 'Outbound and Inbound'
      } else if (outboundInt) {
        interline = 'Outbound'
      } else if (inboundInt) {
        interline = 'Inbound'
      }
    }

    //Check if is open-jaw
    var outBoundSet = false

    var openJaw = 'None'
    //outbound
    if (bookingInfo.search &&
      bookingInfo.search.flights.length > 1 &&
      flightType != 'One Way' &&
      Stopover === 'None' &&
      bookingInfo.search.flights[0].arrival.location_code !== bookingInfo.search.flights[1].departure.location_code
    ) {
      outBoundSet = true
      openJaw = 'Outbound'
    }
    //inbound
    //[1] inbound
    if (bookingInfo.search &&
      bookingInfo.search.flights.length > 1 &&
      flightType != 'One Way' &&
      Stopover === 'None' &&
      bookingInfo.search.flights[1].arrival.location_code !== bookingInfo.search.flights[0].departure.location_code
    ) {
      if (outBoundSet) {
        openJaw = 'Outbound and Inbound'
      } else {
        openJaw = 'Inbound'
      }
    }
    
    if (event === 'successful_flight_search_made') {
      outboundArrivalContinent = ''
      outboundDepartureContinent = ''
      inboundArrivalContinent = ''
      inboundDepartureContinent = ''
    }

    //number of Loyalty Ids Provided
    var numberOfLoyaltyIdsProvided = 0
    if (bookingInfo.hasOwnProperty('passengerList')) {
      jQuery.each(bookingInfo.passengerList, function(index, value) {
        if (value.hasOwnProperty('frequent_flyer')) {
          numberOfLoyaltyIdsProvided++
        }
      })
    }

    var params = getQueryParams()
    var utmSource = params.utm_source != undefined ? params.utm_source : 'not-applicable'
    var utmMedium = params.utm_medium != undefined ? params.utm_medium : 'not-applicable'
    var utmName = params.utm_campaign != undefined ? params.utm_campaign : 'not-applicable'
    var utmTerm = params.utm_term != undefined ? params.utm_term : 'not-applicable'
    var utmContent = params.utm_content != undefined ? params.utm_content : 'not-applicable'
    var instantPrice = params.instantPrice !== undefined ? params.instantPrice.split('#')[0] : 'not-available'
    var lowestPriceAvailable = getLowestAvailablePrice();
    var priceDifference = instantPrice && $.isNumeric(instantPrice) && lowestPriceAvailable ? (lowestPriceAvailable/parseInt(instantPrice)).toFixed(2) : null;
    var priceMatch = getPriceMatch(instantPrice, lowestPriceAvailable);
    var source_web = GetCookie('source_web')
    var source_origin = source_web != null ? source_web : 'unknown'
    var milliseconds = new Date().getTime()
    var totalPrice = bookingInfo.hasOwnProperty('total_price') ? bookingInfo.total_price.toFixed(2) : 0
    SetCookie('ice_lastEventSent', milliseconds)
    var leadTimeProp = getLeadTime(outboundDepartureDate);
    var id = getUserID()
    var totalAmountFlight = totalPrice !== 0 ? totalPrice - AAASPrice: 0
    // For update tracking /api/eventlogging/v1/log needs to be added to the url
    var apiUrl = 'https://api.icelandair.com/api/eventlogging/v1/log/' + event
    if (window.location.href.indexOf('https://wav.eu1.amadeus.com/plnext/icelandairNew/') !== -1 || 
    window.location.href.indexOf('https://wav.eu1.amadeus.com/plnext/icelandairNewB/') !== -1) {
      apiUrl = 'https://dev-api.icelandairlabs.com/api/eventlogging/v1/log/' + event
    }
    try {
      var experimentGroup = event === 'successful_flight_search_made' ? GetCookie('ice_experiment_group') : undefined
      // Looks like first search is spliting parameters by ? other pages split by ;
      var split = event === 'successful_flight_search_made' ? "?" : ';';
      var data = {
          eventVersion: version,
          native: {
            time: milliseconds,
            userId: id,
            deviceManufacturer: device_manufacturer,
            osName: os_name,
            ip: ip,
            sessionId: GetCookie('ice_sessionId'),
            platform: 'Web',
            deviceType: device_type,
            cid: getCid() || 'unknown'
          },
          system: {
            origin: source_origin,
            browserVersion: browser_version,
            utmSource: utmSource,
            utmMedium: utmMedium,
            utmName: utmName,
            utmTerm: utmTerm,
            utmContent: utmContent,
            currentUrl: window.location.href,
            currentDomain: window.location.host,
            currentLanguageParameter: getLang(bookingInfo.language, bookingInfo.external_id).langIdentifiers,
            currentUrlPath: window.location.href.split(split)[0].replace(window.location.origin, ''),
            CurrentUrlParameters:
            window.location.href.split(split)[1] != undefined ? window.location.href.split(split)[1] : '/',
            source: 'Amadeus'
          },
          user: {
            experimentGroups: experimentGroup ? [experimentGroup] : undefined,
            gender: first_passanger_gender,
            userCampaignSource: utmSource  != 'not-applicable' ? utmSource : undefined,
            userCampaignMedium: utmMedium != 'not-applicable' ? utmMedium : undefined,
            userCampaignName: utmName != 'not-applicable' ? utmName : undefined,
            userCampaignTerm: utmTerm != 'not-applicable' ? utmTerm : undefined,
            userCampaignContent: utmContent != 'not-applicable' ? utmContent : undefined
          },   
          event: {
            lastJsessionid: bookingInfo.hasOwnProperty('session_id') ? bookingInfo.session_id : '',
            lastPnr: bookingInfo.hasOwnProperty('pnr_number') ? bookingInfo.pnr_number : '',
            age: first_passanger_age,
            bookingEngine: 'Amadeus',
            inboundArrivalAirport: inboundArr,
            inboundDepartureAirport: inboundDep,
            outboundArrivalAirport: outboundArr,
            outboundDepartureAirport: outboundDep,
            inboundDepartureDate: inboundDepartureDate,
            outboundDepartureDate: outboundDepartureDate,
            currency: bookingInfo.currency !== undefined ? bookingInfo.currency : 'not-available',
            flightType: flightType,
            lowestPriceAvailable: lowestPriceAvailable,
            instantsearch_price: instantPrice,
            priceMatch: priceMatch === null || priceMatch === undefined ? null :  priceMatch <= 5,
            priceDifferencePercentage: priceMatch,
            priceDifference: priceDifference,
            inboundCabin: inboundCabin,
            outboundCabin: outboundCabin,
            totalAmountBooking: totalPrice,
            totalAmountFlight: totalAmountFlight.toFixed(2),
            totalAmountAncillaries: AAASPrice,
            numberOfPassengers: bookingInfo.nb_trav !== undefined ? bookingInfo.nb_trav: bookingInfo.passengerList.length,
            inboundFareFamily: inboundFareFamily != undefined ? inboundFareFamily : 'not-applicable',
            outboundFareFamily: outboundFareFamily != undefined ? outboundFareFamily : 'not-available',
            inboundCityPair: inboundCityPair,
            outboundCityPair: outboundCityPair,
            inboundNumberOfLegs: inboundNumberOfLegs,
            outboundNumberOfLegs: outboundNumberOfLegs,
            pnr: bookingInfo.hasOwnProperty('pnr_number') ? bookingInfo.pnr_number : 'not-applicable',
            amountExtraBags: amountExtraBags,
            numberOfBoundsWithExtraBags: boundIdsWithExtrabag.length,
            numberOfExtraBags: numberOfExtraBags,
            inboundAvailableFareFamilies: inboundAvailableFareFamilies,
            outboundAvailableFareFamilies: outboundAvailableFareFamilies,
            inboundHighestPriceDayOfFlight: inboundHighestPriceDayOfFlight,
            inboundLowestPriceDayOfFlight: inboundLowestPriceDayOfFlight,
            outboundLowestPriceDayOfFlight: outboundLowestPriceDayOfFlight,
            outboundHighestPriceDayOfFlight: outboundHighestPriceDayOfFlight,
            numberOfLegsWithMeals: boundIdsWithMeals.length,
            amountMeals: amountMeals,
            numberOfMeals: numberOfMeals,
            amountSportEquipment: amountSportEquiptment,
            numberOfSportEquipments: numberOfSportEquiptment,
            numberOfBoundsWithSportEquipment: boundIdsWithSportEquiptment.length,
            numberOfLegsWithSeatRequests: boundIdsWithSeat.length,
            numberOfSeatsRequested: numberOfSeats,
            outboundCabinIndicator: outboundCabinIndicator != undefined ? outboundCabinIndicator : 'not-applicable',
            inboundCabinIndicator: inboundCabinIndicator != undefined ? inboundCabinIndicator : 'not-applicable',
            openJaw: openJaw,
            numberOfWheelchairRequests: numberOfWheelchairRequests,
            numberOfLoyaltyIdsProvided: numberOfLoyaltyIdsProvided,
            outboundPrice: outboundPrice,
            inboundPrice: inboundPrice,
            stopover: Stopover,
            inboundStopoverDays: inboundStopoverDays,
            outboundStopoverDays: outboundStopoverDays,
            inboundDepartureContinent: inboundDepartureContinent,
            inboundArrivalContinent: inboundArrivalContinent,
            outboundDepartureContinent: outboundDepartureContinent,
            outboundArrivalContinent: outboundArrivalContinent,
            usePointsChecked: false,
            interline: interline,
            inboundAirlineCodes: inboundAirlineCodes,
            outboundAirlineCodes: outboundAirlineCodes,
            amountSeats: amountSeats,
            moreLegroomSeatPrices: arrayMoreLegroomSeatPrices,
            numberLegsMoreLegroomSeatRequests: numberLegsMoreLegroomSeatRequests.length,
            numberMoreLegroomSeatsRequested: arrayLegroomSeat.length,
            sectionType: sectionType,
            portal: portalData,
            fareFamilyUpgrade: upsellToClass,
            fareFamilySelected: upsellFromClass,
            promoCode: promoC,
            validPromoCode: undefined,
            leadTime: leadTimeProp,
            numberOfAdults: paxList['ADT'],
            numberOfChildren: paxList['CHD'],
            numberOfInfants: paxList['INF'],
            numberOfYouths: paxList['YTH'],
            numberOfPassengers: bookingInfo.nb_trav !== undefined ? bookingInfo.nb_trav: bookingInfo.passengerList.length
          },
          systemPropertiesVersion: eventVersionMap['systemPropertiesVersion'],
          userPropertiesVersion: eventVersionMap['userPropertiesVersion'],
          nativePropertiesVersion: eventVersionMap['nativePropertiesVersion'],
          transformEventProperties: true,
          transformCommonProperties: true,
          s3SchemaValidation: true
      }
      $.ajax({
        type: "POST",
        url: apiUrl,
        data: data,
        headers: {
          "Authorization": "Basic " + btoa('amadeus:HaCEx9PoPqgbozUyHaEiiTHA')
      },
        dataType: 'json'
      });
      
      if (event === 'successful_flight_search_made') {
        try {
          window['optimizely'] = window['optimizely'] || [];
          window["optimizely"].push({
              type: "user",
              attributes: {
                  "booking_engine": "Amadeus"
            }
});
        } catch (e) {
          console.log(e)
        }
      }
      if (event === 'booking_step_3_completed_ancillaries') {
        // sendOptimizelyEvent('add_bag_to_cart', amountExtraBags);
      } else if (event === 'booking_step_6_completed_booking_confirmed') {
        // sendOptimizelyEvent('purchase_bag', amountExtraBags);
        sendOptimizelyEvent('booking_step_6_completed_booking_confirmed', calculate(totalPrice));
        var cookie = GetCookie('bookingParams');
        if (cookie !== null) {
          setTimeout(function() {
            document.cookie = "bookingParams=; path=/; domain=.icelandair.com";
          }, 2000)
        }
      }
    } catch (e) {
      console.log(e)
    }
  } catch (e) {
    console.log('error', e)
  }
}

function callOptimizely(inbound, outbound, lang, curr) {
  try {
    window["optimizely"].push({
      "type": "user",
      "attributes": {
        "inbound_fare_family": inbound,
        "outbound_fare_family": outbound,
        "language": lang,
        "currency" : curr
      }
    });
  } catch (e) {
    console.log(e)
  }
}

function sendOptimizelyEvent (event, amount) {
  try {
    window['optimizely'] = window['optimizely'] || [];
    window['optimizely'].push({
      type: "event",
      eventName: event,
      tags: {
        revenue: amount * 100,
      }
    });
  } catch (e) {
    console.log(e)
  }
}

function getQueryParams() {
  try {
    url = window.location.href
    query_str = url.substr(url.indexOf('?') + 1, url.length - 1)
    r_params = query_str.split('&')
    params = {}
    for (i in r_params) {
      param = r_params[i].split('=')
      params[param[0]] = param[1]
    }
    return params
  } catch (e) {
    return {}
  }
}

function isInterline(bound) {
  var data = {}
  if (bound.airlines_code != undefined) {
    if (bound.airlines_code.includes('-')) {
      var splits = bound.airlines_code.split('-')
      for (n in splits) {
        if (!splits[n].includes('FI')) {
          return true
        }
      }
    } else if (!bound.airlines_code.includes('FI')) {
      return true
    }
  }
  return false
}

// function created for stopover buddy
function isGoingToIceland(bounds) {
  var goingToIceland = false;
  if (bounds[0].arr_airport === 'REK' || bounds[0].arr_airport === 'KEF') {
    goingToIceland = true;
  }
  return goingToIceland;
}

function findStopOverInfo(bounds) {
  var data = {}
  if (bounds.length === 3) {
    if (
      bounds[0].arr_airport === bounds[1].dep_airport &&
      (bounds[1].dep_airport === 'REK' || bounds[1].dep_airport === 'KEF')
    ) {
      data.outboundInterLine = isInterline(bounds[0])
      data.outboundInterLine = !data.outboundInterLine ? isInterline(bounds[1]) : data.outboundInterLine
      data.outboundNumberOfLegs = bounds[0].hasOwnProperty('flights') ? bounds[0].flights.length : 1
      data.outboundNumberOfLegs += bounds[1].hasOwnProperty('flights') ? bounds[1].flights.length : 1
      data.inboundNumberOfLegs = bounds[2].hasOwnProperty('flights') ? bounds[2].flights.length : 1
      data.outbound = true
      data.outboundDepartureAirport = bounds[0].dep_airport
      data.outboundArrivalAirport = bounds[1].arr_airport
      data.outboundDays = daydiff(formatDepartureDate(bounds[0].dep_date), formatDepartureDate(bounds[1].dep_date))
      data.outboundCityPair = bounds[0].dep_airport + '-' + bounds[1].arr_airport
      data.inboundCityPair = bounds[2].dep_airport + '-' + bounds[2].arr_airport
      data.inboundDepartureAirport = bounds[2].dep_airport
      data.inboundArrivalAirport = bounds[2].arr_airport
      data.outboundArrivalContinent =
        continent[bounds[1].arr_country] != undefined ? continent[bounds[1].arr_country] : 'Europe'
    } else {
      data.inboundInterLine = isInterline(bounds[1])
      data.inboundInterLine = !data.inboundInterLine ? isInterline(bounds[2]) : data.inboundInterLine
      data.outboundNumberOfLegs = bounds[0].hasOwnProperty('flights') ? bounds[0].flights.length : 1
      data.inboundNumberOfLegs = bounds[1].hasOwnProperty('flights') ? bounds[1].flights.length : 1
      data.inboundNumberOfLegs += bounds[2].hasOwnProperty('flights') ? bounds[2].flights.length : 1
      data.inbound = true
      data.inboundDays = daydiff(formatDepartureDate(bounds[1].dep_date), formatDepartureDate(bounds[2].dep_date))
      data.outboundCityPair = bounds[0].dep_airport + '-' + bounds[0].arr_airport
      data.outboundDepartureAirport = bounds[0].dep_airport
      data.outboundArrivalAirport = bounds[0].arr_airport
      data.inboundCityPair = bounds[1].dep_airport + '-' + bounds[2].arr_airport
      data.inboundDepartureAirport = bounds[1].dep_airport
      data.inboundArrivalAirport = bounds[2].arr_airport
      data.inboundArrivalContinent =
        continent[bounds[2].arr_country] != undefined ? continent[bounds[2].arr_country] : 'Europe'
    }
  } else {
    //now we have stopover on both bounds
    if (bounds[2].arr_airport === bounds[3].dep_airport && bounds[2].dep_airport !== bounds[3].arr_airport) {
      //outbound
      data.outboundInterLine = isInterline(bounds[0])
      data.outboundInterLine = !data.outboundInterLine ? isInterline(bounds[1]) : data.outboundInterLine
      data.outboundNumberOfLegs = bounds[0].hasOwnProperty('flights') ? bounds[0].flights.length : 1
      data.outboundNumberOfLegs += bounds[1].hasOwnProperty('flights') ? bounds[1].flights.length : 1
      data.outbound = true
      data.outboundDays = daydiff(formatDepartureDate(bounds[0].dep_date), formatDepartureDate(bounds[1].dep_date))
      data.outboundCityPair = bounds[0].dep_airport + '-' + bounds[1].arr_airport
      data.outboundDepartureAirport = bounds[0].dep_airport
      data.outboundArrivalAirport = bounds[1].arr_airport
      data.outboundArrivalContinent =
        continent[bounds[1].arr_country] != undefined ? continent[bounds[1].arr_country] : 'Europe'
      //inbound
      data.inboundInterLine = isInterline(bounds[1])
      data.inboundInterLine = !data.inboundInterLine ? isInterline(bounds[2]) : data.inboundInterLine
      data.inboundNumberOfLegs = bounds[2].hasOwnProperty('flights') ? bounds[2].flights.length : 1
      data.inboundNumberOfLegs += bounds[3].hasOwnProperty('flights') ? bounds[3].flights.length : 1
      data.inbound = true
      data.inboundDays = daydiff(formatDepartureDate(bounds[2].dep_date), formatDepartureDate(bounds[3].dep_date))
      data.inboundCityPair = bounds[2].dep_airport + '-' + bounds[3].arr_airport
      data.inboundDepartureAirport = bounds[2].dep_airport
      data.inboundArrivalAirport = bounds[3].arr_airport
      data.inboundArrivalContinent =
        continent[bounds[3].arr_country] != undefined ? continent[bounds[3].arr_country] : 'Europe'
    }
  }
  return data
}

function daydiff(dt1, dt2) {
  var date1 = new Date(dt1)
  var date2 = new Date(dt2)
  var timeDiff = Math.abs(date2.getTime() - date1.getTime())
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return diffDays
}

function getParamValue(value) {
  if (value != null) {
    return value
  } else {
    return 'not-applicable'
  }
}

checkLoad()
function checkLoad() {
  if (document.readyState == 'complete' || typeof document.getElementsByName('TRIP_TYPE')[0] != 'undefined') {
    if (
      document.getElementsByName('TRIP_TYPE').length > 0 &&
      (document.getElementsByName('TRIP_TYPE')[0].value == 'R' ||
        document.getElementsByName('TRIP_TYPE')[0].value == 'O')
    ) {
      document.getElementById('booking-banner').style.display = ''
    }
    if (document.getElementById('btnSelect') != null) {
      if (document.getElementById('btnSelect').addEventListener) {
        document.getElementById('btnSelect').addEventListener(
          'click',
          function() {
            document.getElementById('booking-banner').style.display = 'none'
          },
          false
        )
      } else if (document.getElementById('btnSelect').attachEvent) {
        document.getElementById('btnSelect').attachEvent(
          'onclick',
          function() {
            document.getElementById('booking-banner').style.display = 'none'
          },
          false
        )
      }
    }
    if (document.getElementById('btnTravellerDetailsFare') != null) {
      if (document.getElementById('btnTravellerDetailsFare').addEventListener) {
        document.getElementById('btnTravellerDetailsFare').addEventListener(
          'click',
          function() {
            document.getElementById('booking-banner').style.display = 'none'
          },
          false
        )
      } else if (document.getElementById('btnTravellerDetailsFare').attachEvent) {
        document.getElementById('btnTravellerDetailsFare').attachEvent(
          'onclick',
          function() {
            document.getElementById('booking-banner').style.display = 'none'
          },
          false
        )
      }
    }
  } else {
    setTimeout('checkLoad()', 500)
  }
}

//jQuery('.icon-chevron-down').click(function() {
jQuery('.item.more').keypress(function(event) {
  if (event.which == 13 || event.which == 32) {
    jQuery('.item.more').click()
  }
})
jQuery('.item.more').click(function() {
  if ($('.modify-search-iframe').is(':visible')) {
    $('header#main-layout-header').animate({ height: 85 }, 1000)
  } else {
    $('header#main-layout-header').animate({ height: 340 }, 1000)
  }
  jQuery('.modify-search-iframe').toggle()
})

// sub function used in "sendCustomDHTML()"
function getURLparameters(params) {
  var params
  if (getURLparameters.arguments[0]) {
    params = getURLparameters.arguments[0]
    params = params.split(',')
  } else params = 'all'

  var URLparameters = ''
  var i = 0
  var j = 0
  while (i < document.custom.length) {
    j = 0
    if (params == 'all') {
      URLparameters += document.custom.elements[i].name + '=' + document.custom.elements[i].value + '&amp;'
      i++
    } else {
      while (j < params.length) {
        if (document.custom.elements[i].name == params[j]) {
          URLparameters += document.custom.elements[i].name + '=' + document.custom.elements[i].value + '&amp;'
          j = params.length
        }
        j++
      }
      i++
    }
  }
  return URLparameters
}

// Builds an iframe and send the entire custom form to a url you have to specify
// parameter 1: url to which parameters should be sent.
// parameter 2: DOM name of the iframe.
// parameter 3: width of the iframe.
// parameter 4: height of the iframe.
//parameter 5: (OPTIONAL) customdhtml form parameters to send to the iframe. If not specify, the entire customdhtml form is sent to the iframe
function sendCustomDHTML(url, name, width, height, params) {
  var url = sendCustomDHTML.arguments[0]
  var name = sendCustomDHTML.arguments[1]
  var width = sendCustomDHTML.arguments[2]
  var height = sendCustomDHTML.arguments[3]
  var params
  var parameters
  if (sendCustomDHTML.arguments[4]) {
    params = sendCustomDHTML.arguments[4]
    parameters = getURLparameters(params)
  } else {
    parameters = getURLparameters()
  }
  var completeURL = url + '?' + parameters
  document.write(
    '<iframe src="' +
      completeURL +
      '" name="' +
      name +
      '" width="' +
      width +
      '" height="' +
      height +
      '" scrolling="no" frameborder="no"></iframe>'
  )
}

// Returns the outbound departure airport code
function getOutboundDepartureCity() {
  return document.getElementById('departureCode_0_0').value
}

// Returns the outbound departure country
function getOutboundDepartureCountry() {
  return document.getElementById('departureCountryCode_0_0').value
}

// Returns the number of segments of the outbound flight
function getOutboundFlightNumber() {
  var index = 0
  var i = 0
  var arrivalTempVariable = 'arrivalCode_0_'
  var arrivalVariable = ''
  while (i != -1) {
    arrivalVariable = arrivalTempVariable + i
    if (document.getElementById(arrivalVariable) == null) {
      index = i - 1
      i = -2
    }
    i++
  }
  return index
}

// Returns the outbound arrival airport code
// parameter 1 (optionnal): number of segments of the outbound. If empty, this parameter is automatically computed.
function getOutboundArrivalCity(index) {
  var index
  var arrivalVariable = ''

  if (getOutboundArrivalCity.arguments[0]) index = getOutboundArrivalCity.arguments[0]
  else index = getOutboundFlightNumber()

  arrivalVariable = 'arrivalCode_0_' + index
  return document.getElementById(arrivalVariable).value
}

// Returns the outbound arrival country code
// parameter 1 (optionnal): number of segments of the outbound. If empty, this parameter is automatically computed.
function getOutboundArrivalCountry(index) {
  var index
  var arrivalVariable = ''

  if (getOutboundArrivalCountry.arguments[0]) index = getOutboundArrivalCountry.arguments[0]
  else index = getOutboundFlightNumber()

  arrivalVariable = 'arrivalCountryCode_0_' + index
  return document.getElementById(arrivalVariable).value
}

// Returns the inbound departure airport code
function getInboundDepartureCity() {
  if (document.getElementById('departureCode_1_0')) return document.getElementById('departureCode_1_0').value
}

// Returns the inbound departure country code
function getInboundDepartureCountry() {
  if (document.getElementById('arrivalCountryCode_1_0')) return document.getElementById('arrivalCountryCode_1_0').value
}

// Returns the number of segments of the inbound flight
function getInboundFlightNumber() {
  var index = 0
  var i = 0
  var arrivalTempVariable = 'arrivalCode_1_'
  var arrivalVariable = ''
  while (i != -1) {
    arrivalVariable = arrivalTempVariable + i
    if (document.getElementById(arrivalVariable) == null) {
      index = i - 1
      i = -2
    }
    i++
  }
  return index
}

// Returns the inbound arrival airport code
// parameter 1 (optionnal): number of segments of the inbound. If empty, this parameter is automatically computed.
function getInboundArrivalCity(index) {
  var index
  var arrivalVariable = ''

  if (getInboundArrivalCity.arguments[0]) index = getInboundArrivalCity.arguments[0]
  else index = getInboundFlightNumber()

  arrivalVariable = 'arrivalCode_1_' + index
  return document.getElementById(arrivalVariable).value
}

// Returns the inbound arrival country code
// parameter 1 (optionnal): number of segments of the inbound. If empty, this parameter is automatically computed.
function getInboundArrivalCountry(index) {
  var index
  var arrivalVariable = ''

  if (getInboundArrivalCountry.arguments[0]) index = getInboundArrivalCountry.arguments[0]
  else index = getInboundFlightNumber()

  arrivalVariable = 'arrivalCountryCode_1_' + index
  return document.getElementById(arrivalVariable).value
}

//Returns  the outbound arrival date
// parameter 1 (optionnal): number of segments of the outbound. If empty, this parameter is automatically computed.
function getOutboundArrivalDate(index) {
  var index
  var arrivalVariable = ''

  if (getOutboundArrivalDate.arguments[0]) index = getOutboundArrivalDate.arguments[0]
  else index = getOutboundFlightNumber()

  arrivalVariable = 'arrivalDate_0_' + index
  return document.getElementById(arrivalVariable).value
}

//Returns  the inbound arrival date
// parameter 1 (optionnal): number of segments of the inbound. If empty, this parameter is automatically computed.
function getInboundArrivalDate(index) {
  var index
  var arrivalVariable = ''

  if (getInboundArrivalDate.arguments[0]) index = getInboundArrivalDate.arguments[0]
  else index = getInboundFlightNumber()

  arrivalVariable = 'arrivalDate_1_' + index
  return document.getElementById(arrivalVariable).value
}

//Returns  the inbound departure date
function getInboundDepartureDate() {
  if (document.getElementById('departureDate_1_0')) return document.getElementById('departureDate_1_0').value
}

//Returns  the outbound departure date
function getOutboundDepartureDate() {
  return document.getElementById('departureDate_0_0').value
}

//Converts date format to YYYYMMDDHHMM
function convertDateFormat(date) {
  var i = 0
  var monthIndex = 0
  var monthArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
  var date = convertDateFormat.arguments[0]

  var decomposedDate = date.split(' ')
  var decomposedHourMin = decomposedDate[3].split(':')
  while (i < monthArray.length) {
    if (decomposedDate[1] == monthArray[i]) monthIndex = i + 1

    i++
  }
  if (monthIndex < 10) monthIndex = '0' + monthIndex
  var convertedDate = decomposedDate[5] + monthIndex + decomposedDate[2] + decomposedHourMin[0] + decomposedHourMin[1]
  return convertedDate
}

// Converts all dates to YYYYMMDDHHMM for OW or RT flights
function convertAllDates() {
  var numberOfOutboundFlights = getOutboundFlightNumber()
  var numberOfInboundFlights = getInboundFlightNumber()
  var i = 0
  while (i <= numberOfOutboundFlights) {
    document.getElementById('departureDate_0_' + i).value = convertDateFormat(
      document.getElementById('departureDate_0_' + i).value
    )
    document.getElementById('arrivalDate_0_' + i).value = convertDateFormat(
      document.getElementById('arrivalDate_0_' + i).value
    )
    i++
  }
  if (document.getElementById('departureDate_1_0') && document.getElementById('arrivalDate_1_0')) {
    i = 0
    while (i <= numberOfInboundFlights) {
      document.getElementById('departureDate_1_' + i).value = convertDateFormat(
        document.getElementById('departureDate_1_' + i).value
      )
      document.getElementById('arrivalDate_1_' + i).value = convertDateFormat(
        document.getElementById('arrivalDate_1_' + i).value
      )
      i++
    }
  }
}

function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2]
  } else {
    return null
  }
}

function getDomain(url) {
  var hostName = getHostName(url)
  var domain = hostName

  if (hostName != null) {
    var parts = hostName.split('.').reverse()

    if (parts != null && parts.length > 1) {
      domain = parts[1] + '.' + parts[0]

      if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
        domain = parts[2] + '.' + domain
      }
    }
  }

  return domain
}

function getErrorData() {
  var dataToUse = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts;
  return {
    tripType: dataToUse["request.TRIP_TYPE"],
    cityPair1: dataToUse["request.B_LOCATION_1"] + '-' + dataToUse["request.E_LOCATION_1"],
    departureDate1: dataToUse["request.B_DATE_1"] !== undefined ? formatErrorDate(dataToUse["request.B_DATE_1"]) : null,
    cityPair2: dataToUse["request.B_LOCATION_2"] !== undefined ? dataToUse["request.B_LOCATION_2"] + '-' + dataToUse["request.E_LOCATION_2"] : null,
    departureDate2: dataToUse["request.B_DATE_2"] != undefined ? formatErrorDate(dataToUse["request.B_DATE_2"]): null,
    cityPair3: dataToUse["request.B_LOCATION_3"] !== undefined ? dataToUse["request.B_LOCATION_3"] + '-' + dataToUse["request.E_LOCATION_3"] : null,
    departureDate3: dataToUse["request.B_DATE_3"] != undefined ? formatErrorDate(dataToUse["request.B_DATE_3"]): null,
    cityPair4: dataToUse["request.B_LOCATION_4"] !== undefined ? dataToUse["request.B_LOCATION_4"] + '-' + dataToUse["request.E_LOCATION_4"] : null,
    departureDate4: dataToUse["request.B_DATE_4"] != undefined ? formatErrorDate(dataToUse["request.B_DATE_4"]): null,
    numberOfPassengers: parseInt(dataToUse["request.ADT"]) + parseInt(dataToUse["request.B15"]) + parseInt(dataToUse["request.CHD"]) + parseInt(dataToUse["request.INF"]),
    officeID: dataToUse["request.OFFICE_ID"] != undefined ? dataToUse["request.OFFICE_ID"] : null
  }
}

function sendErrorEvent(jsonData, code, message, event) {
  try {
    checkIfCookieHasExpired();
    var milliseconds = new Date().getTime()

    var apiUrl = 'https://api.icelandair.com/api/eventlogging/v1/log/' + event 
    if (window.location.href.indexOf('https://wav.eu1.amadeus.com/plnext/icelandairNew/') !== -1 || 
    window.location.href.indexOf('https://wav.eu1.amadeus.com/plnext/icelandairNewB/') !== -1) {
      apiUrl = 'https://dev-api.icelandairlabs.com/api/eventlogging/v1/log/' + event
    }
    var language = getLang(jsonData.language, jsonData.external_id).langIdentifiers
    var params = getQueryParams()
    var utmSource = params.utm_source != undefined ? params.utm_source : 'not-applicable'
    var utmMedium = params.utm_medium != undefined ? params.utm_medium : 'not-applicable'
    var utmName = params.utm_campaign != undefined ? params.utm_campaign : 'not-applicable'
    var utmTerm = params.utm_term != undefined ? params.utm_term : 'not-applicable'
    var utmContent = params.utm_content != undefined ? params.utm_content : 'not-applicable'
    var source_web = GetCookie('source_web')
    var source_origin = source_web != null ? source_web : 'unknown'
    var errorData = getErrorData();
    // setCookie for ice_lastEventSent
    var currentTime = new Date().getTime();
    SetCookie('ice_lastEventSent', currentTime);

  
    var data = {
      eventVersion: eventVersionMap[event] || 3,
        native: {
          time: milliseconds,
          userId: getUserID(),
          sessionId: GetCookie('ice_sessionId')
        },
        system: {
          origin: source_origin,
          browserVersion: '',
          utmSource: utmSource,
          utmMedium: utmMedium,
          utmName: utmName,
          utmTerm: utmTerm,
          utmContent: utmContent,
          currentUrl: window.location.href,
          currentDomain: window.location.host,
          currentLanguageParameter: language != undefined ? language : 'en-us',
          currentUrlPath: window.location.href.split(';')[0].replace(window.location.origin, ''),
          currentUrlParameters:
            window.location.href.split(';')[1] != undefined ? window.location.href.split(';')[1] : '/',
          source: 'Amadeus'
        },
        user: {
          userCampaignSource: utmSource  != 'not-applicable' ? utmSource : undefined,
          userCampaignMedium: utmMedium != 'not-applicable' ? utmMedium : undefined,
          userCampaignName: utmName != 'not-applicable' ? utmName : undefined,
          userCampaignTerm: utmTerm != 'not-applicable' ? utmTerm : undefined,
          userCampaignContent: utmContent != 'not-applicable' ? utmContent : undefined
        },
        event: {
          lastJsessionid: jsonData.hasOwnProperty('session_id') ? jsonData.session_id : '',
          lastPnr: jsonData.hasOwnProperty('pnr_number') ? jsonData.pnr_number : '',
          bookingEngine: 'Amadeus',
          method: 'Message',
          code,
          warningCode: code,
          errorMessage: message,
          warningMessage: message,
          errorType: 'amadeus booking',
          warningType: 'amadeus booking',
          errorMessageTranslationId: 'not-applicable',
          warningMessageTranslationId: 'not-applicable',
          cityPair1: errorData.cityPair1,
          cityPair2: errorData.cityPair2,
          cityPair3: errorData.cityPair3,
          cityPair4: errorData.cityPair4,
          departureDate1: errorData.departureDate1,
          departureDate2: errorData.departureDate2,
          departureDate3: errorData.departureDate3,
          departureDate4: errorData.departureDate4,
          numberOfPassengers: errorData.numberOfPassengers,
          officeId: errorData.officeID,
          tripType: errorData.tripType
        },
        systemPropertiesVersion: eventVersionMap['systemPropertiesVersion'],
        userPropertiesVersion: eventVersionMap['userPropertiesVersion'],
        nativePropertiesVersion: eventVersionMap['nativePropertiesVersion'],
        transformEventProperties: true,
        transformCommonProperties: true,
        s3SchemaValidation: true,
    }
    $.ajax({
      type: "POST",
      url: apiUrl,
      data: data,
      headers: {
        "Authorization": "Basic " + btoa('amadeus:HaCEx9PoPqgbozUyHaEiiTHA')
    },
      dataType: 'json'
    });

  } catch (e) {
    console.log(e)
  }
}

function checkErrorsAndWarnings(errorCodes, jsonData) {
  if (plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E) {
    for (var error in plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList
      .globalErrors.E) {
      if (
        !errorCodes.includes(
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E[error]
            .code
        ) &&
        !$(this).data(
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E[error]
            .code
        )
      ) {
        $(this).data(
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E[error]
            .code,
          'true'
        )
        errorCodes.push(
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E[error]
            .code
        )
        sendErrorEvent(
          jsonData,
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E[error]
            .code,
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E[
            error
          ].message.replace(/<(?:.|\n)*?>/gm, ''),
          'error'
        )
      }
    }
  } else {
    for (var warning in plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList
      .globalErrors.W) {
      if (
        !errorCodes.includes(
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W[
            warning
          ].code
        ) &&
        !$(this).data(
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W[
            warning
          ].code
        )
      ) {
        $(this).data(
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W[
            warning
          ].code,
          'true'
        )
        errorCodes.push(
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W[
            warning
          ].code
        )
        sendErrorEvent(
          jsonData,
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W[
            warning
          ].code,
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W[
            warning
          ].message.replace(/<(?:.|\n)*?>/gm, ''),
          'warning'
        )
      }
    }
  }
}

function sendManageBookingEvent(){
  try {
    checkIfCookieHasExpired();
    var ServiceSelectionBreakdown = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.ServiceSelectionBreakdown
    var seaPrice = []
    var sportAmount = 0
    var seatAmount = 0
    var mealAmount = 0
    var specialAmount = 0
    var bagAmount = 0
    var arrayLegroomSeat = []
    var numberExtraBag = 0
    var numberExtraMeal = 0
    var numberExtraSport = 0
    var numberExtraWeal = 0
    var numberExtraSeat = 0
    var numberLegsMoreLegroomSeatRequests = []
  
    //Bag and sport
    jQuery.each(ServiceSelectionBreakdown.servicesByBound, function(index, value) {
      if(value[0].code === "SPO"){
        jQuery.each(value[0].listServices, function(ind, val) {
          sportAmount += val.price.cash.totalAmount
          numberExtraSport += val.number
        })
      }
      if(value[0].code === "BAG"){
        jQuery.each(value[0].listServices, function(ind, val) {
          bagAmount += val.price.cash.totalAmount
          numberExtraBag += val.number
        })
      }
    })
  
    //Special Wheelchair 
    jQuery.each(ServiceSelectionBreakdown.servicesByItinerary, function(index, value) {
      if(value !== undefined){
        if(value.code === "SPE"){
          jQuery.each(value.listServices, function(ind, val) {
            specialAmount += val.price.cash.totalAmount
            numberExtraWeal += val.number
          })
        }
      }
    })
  
    //Meals and seats
    jQuery.each(ServiceSelectionBreakdown.servicesBySegment, function(index, value) {
      if(value[0] !== undefined){
        if(value[0].code === "MEA"){
          jQuery.each(value[0].listServices, function(ind, val) {
            mealAmount += val.price.cash.totalAmount
            numberExtraMeal += val.number
          })
        }
  
        if(value[0].code === "SEA"){
          jQuery.each(value[0].listServices, function(ind, val) {
            numberExtraSeat++;
            seaPrice.push(val.price.cash.totalAmount.toString())
            seatAmount += val.price.cash.totalAmount
            if(val.price.cash.totalAmount > 0) {
              arrayLegroomSeat.push(val.price.cash.totalAmount)
              if(numberLegsMoreLegroomSeatRequests[val.elementId] === undefined) {
                numberLegsMoreLegroomSeatRequests.push(val.elementId)
              }
            }
          })
        }
      }
    })
  
    var ip = 'not-available'
    var device_manufacturer = ''
    var os_name = ''
    var browser_version = ''
    var travelers = 0
    if (
      plnextv2 != undefined &&
      plnextv2.utils != undefined &&
      plnextv2.utils.pageProvider != undefined &&
      plnextv2.utils.pageProvider.PlnextPageProvider != undefined &&
      plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig != undefined &&
      plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData != undefined &&
      plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts != undefined
    ) {
      ip = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts.ipAddress
      device_manufacturer =
        plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts.deviceManufacturer
      os_name = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts.operatingSystem
      browser_version =
        plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts.browserVersion
      travelers = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.FareReview.tripSummary.numberOfTravellers
    }
  
    var dataToUse = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts;
    var params = getQueryParams()
    var utmSource = params.utm_source != undefined ? params.utm_source : 'not-applicable'
    var utmMedium = params.utm_medium != undefined ? params.utm_medium : 'not-applicable'
    var utmName = params.utm_campaign != undefined ? params.utm_campaign : 'not-applicable'
    var utmTerm = params.utm_term != undefined ? params.utm_term : 'not-applicable'
    var utmContent = params.utm_content != undefined ? params.utm_content : 'not-applicable'
    var source_web = GetCookie('source_web')
    var source_origin = source_web != null ? source_web : 'unknown'
    var milliseconds = new Date().getTime()
  
    // setCookie for ice_lastEventSent
    var currentTime = new Date().getTime();
    SetCookie('ice_lastEventSent', currentTime);

    var apiUrl = 'https://api.icelandair.com/api/eventlogging/v1/log/ancillary_product_selection_confirmed'
    if (window.location.href.indexOf('https://wav.eu1.amadeus.com/plnext/icelandairNew/') !== -1 || 
    window.location.href.indexOf('https://wav.eu1.amadeus.com/plnext/icelandairNewB/') !== -1) {
      apiUrl = 'https://dev-api.icelandairlabs.com/api/eventlogging/v1/log/ancillary_product_selection_confirmed'
    }
    try {
      var data = {
        eventVersion: eventVersionMap['ancillary_product_selection_confirmed'] || 3,
          native: {
            time: milliseconds,
            userId: getUserID(),
            deviceManufacturer: device_manufacturer,
            osName: os_name,
            ip: ip,
            sessionId: GetCookie('ice_sessionId'),
            platform: 'Web'
          },
          system: {
            origin: source_origin,
            browserVersion: browser_version,
            utmSource: utmSource,
            utmMedium: utmMedium,
            utmName: utmName,
            utmTerm: utmTerm,
            utmContent: utmContent,
            currentUrl: window.location.href,
            currentDomain: window.location.host,
            currentLanguageParameter: getLang(dataToUse["request.LANGUAGE"], dataToUse["request.EXTERNAL_ID"]).langIdentifiers,
            currentUrlPath: window.location.href.split(';')[0].replace(window.location.origin, ''),
            currentUrlParameters:
            window.location.href.split(';')[1] != undefined ? window.location.href.split(';')[1] : '/',
            source: 'Amadeus'
          },
          user: {
            userCampaignSource: utmSource  != 'not-applicable' ? utmSource : undefined,
            userCampaignMedium: utmMedium != 'not-applicable' ? utmMedium : undefined,
            userCampaignName: utmName != 'not-applicable' ? utmName : undefined,
            userCampaignTerm: utmTerm != 'not-applicable' ? utmTerm : undefined,
            userCampaignContent: utmContent != 'not-applicable' ? utmContent : undefined
          },
          event: {
          amountExtraBags: bagAmount,
          amountMeals: mealAmount,
          amountSeats: seatAmount,
          amountSportEquipment: sportAmount,
          bookingEngine: 'Amadeus',
          currency: ServiceSelectionBreakdown.totalPrice.cash.currency.code !== undefined ? ServiceSelectionBreakdown.totalPrice.cash.currency.code : 'not-available',
          moreLegroomSeatPrices: seaPrice,
          numberOfExtraBags: numberExtraBag,
          numberOfMeals: numberExtraMeal,
          numberMoreLegroomSeatsRequested: arrayLegroomSeat.length,
          numberLegsMoreLegroomSeatRequests: numberLegsMoreLegroomSeatRequests.length,
          numberOfPassengers: travelers,
          numberOfSeatsRequested: numberExtraSeat,
          numberOfSportEquipments: numberExtraSport,
          numberOfWheelchairRequests: numberExtraWeal,
          portal: 'Manage Booking',
          lastPnr: dataToUse["request.REC_LOC"],
          pnr: dataToUse["request.REC_LOC"],
          lastJsessionid: dataToUse["request.SESSION_ID"],
          totalAmountAncillaries: ServiceSelectionBreakdown.totalPrice.cash.totalAmount.toFixed(2)
        },
          systemPropertiesVersion: eventVersionMap['systemPropertiesVersion'],
          userPropertiesVersion: eventVersionMap['userPropertiesVersion'],
          nativePropertiesVersion: eventVersionMap['nativePropertiesVersion'],
          transformEventProperties: true,
          transformCommonProperties: true,
          s3SchemaValidation: true,
      }
      $.ajax({
        type: "POST",
        url: apiUrl,
        data: data,
        headers: {
          "Authorization": "Basic " + btoa('amadeus:HaCEx9PoPqgbozUyHaEiiTHA')
      },
        dataType: 'json'
      });
    } catch (e) {
      console.log(e)
    }
  } 
  catch (error) 
  {
    console.log(error)
  }
}

function sendManageBookingOverviewOpened (jsonData) {
  try {
  checkIfCookieHasExpired();
  var params = getQueryParams()
  var utmSource = params.utm_source != undefined ? params.utm_source : 'not-applicable'
  var utmMedium = params.utm_medium != undefined ? params.utm_medium : 'not-applicable'
  var utmName = params.utm_campaign != undefined ? params.utm_campaign : 'not-applicable'
  var utmTerm = params.utm_term != undefined ? params.utm_term : 'not-applicable'
  var utmContent = params.utm_content != undefined ? params.utm_content : 'not-applicable'
  var source_web = GetCookie('source_web')
  var source_origin = source_web != null ? source_web : 'unknown'
  var milliseconds = new Date().getTime()

  var ip = 'not-available'
  var device_manufacturer = ''
  var os_name = ''
  var browser_version = ''
  if (
    plnextv2 != undefined &&
    plnextv2.utils != undefined &&
    plnextv2.utils.pageProvider != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData != undefined &&
    plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts != undefined)
    {
    ip = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts.ipAddress
    device_manufacturer =
      plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts.deviceManufacturer
    os_name = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts.operatingSystem
    browser_version =
      plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts.browserVersion
    }
    // setCookie for ice_lastEventSent
    var currentTime = new Date().getTime();
    SetCookie('ice_lastEventSent', currentTime);

    var apiUrl = 'https://api.icelandair.com/api/eventlogging/v1/log/manage_booking_overview_opened'
    if (window.location.href.indexOf('https://wav.eu1.amadeus.com/plnext/icelandairNew/') !== -1 || 
    window.location.href.indexOf('https://wav.eu1.amadeus.com/plnext/icelandairNewB/') !== -1) {
      apiUrl = 'https://dev-api.icelandairlabs.com/api/eventlogging/v1/log/manage_booking_overview_opened'
    }
    try {
      var data = {
        eventVersion: eventVersionMap['manage_booking_overview_opened'] || 3,
        native: {
          time: milliseconds,
          userId: getUserID(),
          deviceManufacturer: device_manufacturer,
          osName: os_name,
          ip: ip,
          sessionId: GetCookie('ice_sessionId'),
          platform: 'Web'
        },
        system: {
          origin: source_origin,
          browserVersion: browser_version,
          utmSource: utmSource,
          utmMedium: utmMedium,
          utmName: utmName,
          utmTerm: utmTerm,
          utmContent: utmContent,
          currentUrl: window.location.href,
          currentDomain: window.location.host,
          currentLanguageParameter: getLang(jsonData.language, jsonData.external_id).langIdentifiers,
          currentUrlPath: window.location.href.split(';')[0].replace(window.location.origin, ''),
          currentUrlParameters:
          window.location.href.split(';')[1] != undefined ? window.location.href.split(';')[1] : '/',
          source: 'Amadeus'
        },
        user: {
          userCampaignSource: utmSource  != 'not-applicable' ? utmSource : undefined,
          userCampaignMedium: utmMedium != 'not-applicable' ? utmMedium : undefined,
          userCampaignName: utmName != 'not-applicable' ? utmName : undefined,
          userCampaignTerm: utmTerm != 'not-applicable' ? utmTerm : undefined,
          userCampaignContent: utmContent != 'not-applicable' ? utmContent : undefined
        },
        event: {
          bookingType: getBookingProvider(jsonData.initial_office_id),
          dateOfSale: jsonData.date_of_sale !== undefined ? jsonData.date_of_sale: jsonData.pnr_creation_date,
          initialOfficeId: jsonData.initial_office_id,
          currentOfficeId: jsonData.office_id,
          lastPnr: jsonData.pnr_nbr,
          pnr: jsonData.pnr_nbr,
          lastJsessionid: jsonData.session_id
        },
        systemPropertiesVersion: eventVersionMap['systemPropertiesVersion'],
        userPropertiesVersion: eventVersionMap['userPropertiesVersion'],
        nativePropertiesVersion: eventVersionMap['nativePropertiesVersion'],
        transformEventProperties: true,
        transformCommonProperties: true,
        s3SchemaValidation: true,
      }
      $.ajax({
        type: "POST",
        url: apiUrl,
        data: data,
        headers: {
          "Authorization": "Basic " + btoa('amadeus:HaCEx9PoPqgbozUyHaEiiTHA')
      },
        dataType: 'json'
      });
    } catch (e) {
      console.log(e);
    }
  } catch(error) {
    console.log(error);
  }
}

function getBookingProvider (office_id) {
  if(office_id.length === 5){
    return '3party booking'
  } else if (office_id.charAt(3) === 'F' && office_id.charAt(4) === 'I' && office_id.charAt(7) === 'A' && office_id.charAt(8) === 'A') {
    return 'Icelandair amadeus'
  } else if (office_id.charAt(3) === 'F' && office_id.charAt(4) === 'I' && office_id.charAt(7) === 'T' && office_id.charAt(8) === 'A') {
    return 'Icelandair travelaer'
  } else if (office_id.charAt(7) === 'A' && office_id.charAt(8) === 'A') {
    return 'Other amadeus agents'
  }
  return 'Other booking engine'
}

function additionalBagLink(jsonData){
  var link = checkBoxTerms[getLang(jsonData.language, jsonData.external_id).langIdentifiers].baggageFees
  if($("section #availability-bound-1").length !== 0) {
    $(link).insertAfter('section#availability-bound-1')
  } else {
    $(link).insertAfter('section#availability-bound-0')
  }
}



function insertCarbonFootprint() {
  try {
    if(typeof eBaDataLayer !== 'undefined'){
      var jsonData = eBaDataLayer
      if(jsonData.page_code === 'CONF' ||jsonData.page_code ===  'RTPL' ) {
      var carbonInterval = setInterval(function () {
          var baggageDetails = document.getElementById('baggages-details');
          if(!baggageDetails) {
            return null;
          }
          var isIcelandic = jsonData.language === 'IS';
          var carbonLink = isIcelandic ? 'https://www.icelandair.com/is/um-okkur/kolefnisjafna/' : 'https://www.icelandair.com/about/carbon-calculator/';
          var carbonLinkTitle = isIcelandic ? 'Hefjast handa' : 'Get started'; 
          var carbonTitle = isIcelandic ? 'Kolefnisjafna&eth;u flugi&eth; &thorn;itt' : 'Offset your carbon footprint';
          jQuery(baggageDetails).before('<div style="min-height: 150px; padding: 60px; background: url(https://pixels-cache.icelandair.com/upload/icelandair/blt05e4c5e1c977e50f.png) no-repeat center center / cover"><h3 style="font-size: 32px; font-weight: 500; line-height: 1.6em; position: relative; left: 15px; display: inline-block; margin: 0; margin-right: 15px; padding: 9px 0; color: #fff; background: rgba(0, 58, 125, 0.9); box-decoration-break: clone; box-shadow: 15px 0 0 rgba(0, 58, 125, 0.9), -15px 0 0 rgba(0, 58, 125, 0.9);">'+ carbonTitle +'</h3><div style="width: 100%;"><a style="font-size: 18px; font-weight: 500; line-height: 50px; display: inline-block; height: 50px; margin-top: 20px; padding: 0 30px; text-align: center; text-decoration: none; color: #fff; border: 1px solid #003a7d; border-radius: 40px; background: #003a7d;" href="'+ carbonLink +'">'+ carbonLinkTitle +'</a></div></div>')
          clearInterval(carbonInterval);
        },300) // set the interval for 100ms
      }
    } 
  }
  catch (e) {
    console.log('failed to add carbon footprint', e)
  }
}


// function hideSteakSandwichUSMarket() {
//   if (typeof eBaDataLayer !== 'undefined') {
//     var jsonData = eBaDataLayer
//     if ((jsonData.page_code === 'DFSR' || jsonData.page_code == 'AAS') && jsonData.market === 'US') {
//       var steakSandwichInterval = setInterval(function () {
//         var steakSandwichContainer = document.getElementsByClassName('service-FKML');
//         if (!steakSandwichContainer || steakSandwichContainer.length === 0) {
//           return null;
//         }
//         $('.service-FKML').css("display", "none");
//         clearInterval(steakSandwichInterval);
//       }, 100) // set the interval for 100ms
//     }
//   }
// }

// function hideChangeFlightButtons () {
//     if (typeof eBaDataLayer !== 'undefined') {
//     var jsonData = eBaDataLayer
//       if (jsonData.page_code === 'RTPL') {
//         // This is button in itenerrary
//         var changeFlightButtonOne = setInterval(function () {
//         var changeFlightButtonOneContainer = document.getElementsByClassName('bounddetails bounds-panel panel');
//         if (!changeFlightButtonOneContainer || changeFlightButtonOneContainer.length === 0) {
//           return null;
//         }
//         $('.bounddetails.bounds-panel.panel').find('.bounds.bounds-panel-footer.panel-footer').css("display", "none");
//         clearInterval(changeFlightButtonOne);
//       }, 100) // set the interval for 100ms

//       var changeFlightButtonTwo = setInterval(function () {
//         var changeFlightButtonOneContainer = document.getElementsByClassName('plnext-dropdown dropdown-container reservation-dropdown reservation-menu-responsive');
//         if (!changeFlightButtonOneContainer || changeFlightButtonOneContainer.length === 0) {
//           return null;
//         }
//         $('.plnext-dropdown.dropdown-container.reservation-dropdown.reservation-menu-responsive').find('.modify-boundsATC-button').css("display", "none");
//         clearInterval(changeFlightButtonTwo);
//       }, 100) // set the interval for 100ms
//     }
//   }
// }

/*New header booking engine*/
function getModifySearchIframe() {
  if(typeof eBaDataLayer !== 'undefined'){
    //retrieve Json data
    var jsonData = eBaDataLayer
    var errorCodes = []

    /*Event Track error in search*/
    if (
      jQuery('body').attr('data-template-name') == 'GERR' ||
      jsonData.page_code == 'GERR' ||
      jQuery('body').attr('data-template-name') == 'FDCT' ||
      jsonData.page_code == 'FDCT' ||
      jQuery('body').attr('data-template-name') == 'TLIST' ||
      jsonData.page_code == 'TLIST'
    ) {
      if (
        plnextv2 &&
        plnextv2.utils &&
        plnextv2.utils.pageProvider &&
        plnextv2.utils.pageProvider.PlnextPageProvider &&
        plnextv2.utils.pageProvider.PlnextPageProvider &&
        plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig &&
        plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData &&
        plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList &&
        plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors
      ) {
        checkErrorsAndWarnings(errorCodes, jsonData)
        setTimeout(function() {
          $('.global-warning-message').bind('DOMSubtreeModified', function() {
            checkErrorsAndWarnings(errorCodes, jsonData)
          })
        }, 3000)
      }
    }

    if (
      jQuery('body').attr('data-template-name') == 'FPOW' ||
      jQuery('body').attr('data-template-name') == 'SDAI' ||
      jQuery('body').attr('data-template-name') == 'FDFFCPX' ||
      jQuery('body').attr('data-template-name') == 'FDCT' ||
      jQuery('body').attr('data-template-name') == 'FDCS' ||
      jsonData.page_code == 'FPOW' ||
      jsonData.page_code == 'SDAI' ||
      jsonData.page_code == 'FDFFCPX' ||
      jsonData.page_code == 'FDCT' ||
      jsonData.page_code == 'FDCS'
    ) {
      var nrOfTries = 0
      try {
        /*probably need to call eventtracking ( 'successful_flight_search_made',jsonData );	after this if this is from deep link engines*/
        var checkExtRmcode = setInterval(function() {
          try {
            if (
              nrOfTries < 10 &&
              typeof plnextv2 != 'undefined' &&
              typeof plnextv2.utils.pageProvider.PlnextPageProvider._config.siteConfiguration.appData.config.links
                .restartFlow.dmIn.external_remark_code != 'undefined' &&
              plnextv2.utils.pageProvider.PlnextPageProvider._config.siteConfiguration.appData.config.links.restartFlow
                .dmIn.external_remark_code.length
            ) {
              clearInterval(checkExtRmcode)
              SetCookie(
                'ice_uuid',
                plnextv2.utils.pageProvider.PlnextPageProvider._config.siteConfiguration.appData.config.links.restartFlow
                  .dmIn.external_remark_code,
                exp,
                '/',
                getDomain(window.location.href)
              )
              if (
                jQuery('body').attr('data-template-name') == 'FPOW' ||
                jsonData.page_code == 'FPOW' ||
                jQuery('body').attr('data-template-name') == 'FDFFCPX' ||
                jsonData.page_code == 'FDFFCPX'
              ) {
                
                additionalBagLink(jsonData)
                eventtracking('successful_flight_search_made', jsonData, null, null, null, null);
                // Upsell teaser markup changes 
                var upgradeClass = null;
                $(document).on('click','.bound-table-cell-reco.bound-table-cell-reco-available',function () {
                  setTimeout(function(){ 
                    $(".upsellteaser-fixed-placeholder-button").prependTo(".upsellteaser-inner-container .section2");
                    $(".close.icon-remove.action-close").prependTo(".upsellteaser-inner-container");
                    upgradeClass = document.getElementsByClassName('upsellteaser-farefamily')[0] ? document.getElementsByClassName('upsellteaser-farefamily')[0].innerText: null;
                  }, 200);
                });
                // Send upsell teaser event. 
                $(document).on('click', '.tripsummary-btn-tertiary.upsellteaser-upgradebtn', function () {
                  trackUpsellTeaser('upsell_teaser_clicked',jsonData, upgradeClass)
                })
                // Mobile  upsell
                $('.bound-table-flightline-details').on('click', function(){ 
                  setTimeout(function(){ 
                    $(".upsellteaser-fixed-placeholder-button").prependTo(".upsellteaser-inner-container .section2");
                    $(".close.icon-remove.action-close").prependTo(".upsellteaser-inner-container");
                  }, 200);
                });
                $('.availability-list-fares-reco').on('click', function(){ 
                  setTimeout(function(){ 
                    $(".upsellteaser-fixed-placeholder-button").prependTo(".upsellteaser-inner-container .section2");
                    $(".close.icon-remove.action-close").prependTo(".upsellteaser-inner-container");
                  }, 200);
                });
                var bagpopup = 'bagpopup'
                $('body').bind('DOMSubtreeModified', function(e) {
                  if ($('body').hasClass('bagPopupActive')) {
                    if (!$(this).data(bagpopup)) {
                      $(this).data(bagpopup, 'true')
                      sendErrorEvent(
                        jsonData,
                        'No Bags To Check?',
                        "You have selected our Economy Light fare, which doesn't include checked baggage – but it does include carry-on baggage.",
                        'warning'
                      )
                    }
                  }
                })
              }
            } else if (nrOfTries > 9) {
              clearInterval(checkExtRmcode)
              /*We call event tracking here as this could be deeplink engine calling and no external_remark_code available*/
              additionalBagLink(jsonData)
              eventtracking('successful_flight_search_made', jsonData, null, null, null, null);
              var upgradeClass = null;
              $(document).on('click','.bound-table-cell-reco.bound-table-cell-reco-available',function () {
                setTimeout(function(){ 
                  $(".upsellteaser-fixed-placeholder-button").prependTo(".upsellteaser-inner-container .section2");
                  $(".close.icon-remove.action-close").prependTo(".upsellteaser-inner-container");
                  upgradeClass = document.getElementsByClassName('upsellteaser-farefamily')[0] ? document.getElementsByClassName('upsellteaser-farefamily')[0].innerText: null;
                }, 200);
              })
              // Send upsell teaser event. 
              $(document).on('click', '.tripsummary-btn-tertiary.upsellteaser-upgradebtn', function () {
                trackUpsellTeaser('upsell_teaser_clicked',jsonData, upgradeClass)
              })
               // Mobile  upsell
               $('.bound-table-flightline-details').on('click', function(){ 
                setTimeout(function(){ 
                  $(".upsellteaser-fixed-placeholder-button").prependTo(".upsellteaser-inner-container .section2");
                  $(".close.icon-remove.action-close").prependTo(".upsellteaser-inner-container");
                }, 200);
              });
              $('.availability-list-fares-reco').on('click', function(){ 
                setTimeout(function(){ 
                  $(".upsellteaser-fixed-placeholder-button").prependTo(".upsellteaser-inner-container .section2");
                  $(".close.icon-remove.action-close").prependTo(".upsellteaser-inner-container");
                }, 200);
              });
              var bagpopup = 'bagpopup'
              $('body').bind('DOMSubtreeModified', function(e) {
                if ($('body').hasClass('bagPopupActive')) {
                  if (!$(this).data(bagpopup)) {
                    $(this).data(bagpopup, 'true')
                    sendErrorEvent(
                      jsonData,
                      'No Bags To Check?',
                      "You have selected our Economy Light fare, which doesn't include checked baggage – but it does include carry-on baggage.",
                      'warning'
                    )
                  }
                }
              })
            }
            nrOfTries++
          } catch (err) {
            console.debug('error ' + err)
            nrOfTries++
          }
        }, 200) // check every 200ms
      } catch (err) {
        console.debug('error 2 ' + err)
        nrOfTries++
      }
    }

    if (jQuery('body').attr('data-template-name') == 'CONF' || jsonData.page_code == 'CONF') {
      if (sessionStorage) {
        if (
          !sessionStorage.getItem('tracking.bookingStep6EventSent') ||
          sessionStorage.getItem('tracking.bookingStep6EventSent') !== jsonData.pnr_number 
        ) {
          eventtracking('booking_step_6_completed_booking_confirmed', jsonData, null, null, null, null)
          sessionStorage.setItem('tracking.bookingStep6EventSent', jsonData.pnr_number) ;
          /*populate pax*/
          jQuery.each(jsonData.passengers, function(index, value) {
            if (value.pax_type === 'B15') {
              paxList['YTH'] = value.nb_pax_type
            } else {
              paxList[value.pax_type] = value.nb_pax_type
            }
            })
          var bounds = {};
          jQuery.each(jsonData.bound, function(index, value) {
            bounds['bound_' + index] = {
              date_departure: value.dep_date,
              "date_arrival": value.arr_date,
              "destination_city": value.dep_city || value.dep_airport,
              "departure_city": value.arr_city || value.arr_airport
            }
          })
          var json = {
            adt: paxList['ADT'],
            yth: paxList['YTH'],
            chd: paxList['CHD'],
            inf: paxList['INF'],
            bounds
          };
          SetCookie('ice_booking_completed', JSON.stringify(json))
        }
      } else {
        eventtracking('booking_step_6_completed_booking_confirmed', jsonData, null, null, null, null)
      }

      eventtracking('ancillary_product_selection_confirmed', jsonData, null, 'Booking Flow', null, null)
      //eventtracking('booking_step_7_completed_booking_confirmed', jsonData, null, null)
    } else if (jQuery('body').attr('data-template-name') == 'PURC' || jsonData.page_code == 'PURC' 
    || jQuery('body').attr('data-template-name') == 'MPURC' || jsonData.page_code == 'MPURC') {
      var checkTrackingFunc = setInterval(function() {
        if(jQuery('body').attr('data-template-name') == 'PURC' || jsonData.page_code == 'PURC') {
          if (typeof eventtracking == 'function' && !$(this).data('alreadysentevent')) {
            $(this).data('alreadysentevent', 'true')
            eventtracking('booking_step_3_completed_ancillaries', jsonData, null, null, null, null)
            eventtracking('ancillary_product_selected', jsonData, null, 'Booking Flow', null, null)
            clearInterval(checkTrackingFunc)
          }
        }
       if(jQuery('body').attr('data-template-name') == 'MPURC' || jsonData.page_code == 'MPURC'){
        if (!$(this).data('alreadysentevent')) {
          $(this).data('alreadysentevent', 'true')
          if( plnextv2 &&
            plnextv2.utils &&
            plnextv2.utils.pageProvider &&
            plnextv2.utils.pageProvider.PlnextPageProvider &&
            plnextv2.utils.pageProvider.PlnextPageProvider &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.ServiceSelectionBreakdown &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.ServiceSelectionBreakdown.totalPrice){
              jsonData.currency = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.ServiceSelectionBreakdown.totalPrice.cash.currency.code
            }
          eventtracking('ancillary_product_selected', jsonData, null, 'Manage Booking', null, null)
          clearInterval(checkTrackingFunc)
        }
        //Shitmix for payment.
        $(document).ready(function() {
          $('.fop-option-list #tpl4_li_EXT #tpl4_radio_EXT').prop("checked", true).trigger('click');
        })
       }
      }, 100) // check every 100ms
    }
    /*Digital labs event tracking*/
    //let jsonData = window.eBaDataLayer
    var count = 1
    var errorCodes = []
    if (
      jQuery('body').attr('data-template-name') == 'APIS' ||
      jsonData.page_code == 'APIS' ||
      jQuery('body').attr('data-template-name') == 'ALPI' ||
      jsonData.page_code == 'ALPI' ||
      jQuery('body').attr('data-template-name') == 'APIM' ||
      jsonData.page_code == 'APIM' ||
      jQuery('body').attr('data-template-name') == 'DFSR' ||
      jsonData.page_code == 'DFSR' ||
      jsonData.page_code == 'AAS' ||
      jQuery('body').attr('data-template-name') == 'FPOW' ||
      jsonData.page_code == 'FPOW' ||
      jQuery('body').attr('data-template-name') == 'PURC' ||
      jsonData.page_code == 'PURC' ||
      jQuery('body').attr('data-template-name') == 'GERR' ||
      jQuery('body').attr('data-template-name') == 'MDFSR' ||
      jsonData.page_code == 'MDFSR' ||
      jQuery('body').attr('data-template-name') == 'APIM' ||
      jsonData.page_code == 'APIM'
    ) {
      function shouldTrackIt(key) {
        return jQuery('body').attr('data-template-name') == key || jsonData.page_code == key
      }

      var bookingStepTwoAndFour = setInterval(function() {
        if ($('.tripsummary-section-btn .tripsummary-btn-primary').length || $('.pricesummarybottom-tablet-row .pricesummarybottom-btn-continue').length) {
          if (shouldTrackIt('DFSR')){
            var hidePRO = ['IS']
            if (hidePRO.includes(jsonData.market)) {
              $('.catalogServices-teaser-column.catalogServices-teaser-column-PRO').css( "display", "none" );
            }
          }

          if (shouldTrackIt('PURC')){
            $('*[data-placeholder-path="PURC/pageContent/specialRequests"]').css( "display", "none" );
          }

          if (shouldTrackIt('DFSR') && !$(this).data('alreadysenteventTwo')) {
            $(this).data('alreadysenteventTwo', 'true')
            eventtracking('booking_step_2_completed_passenger_info', jsonData, null, null, null, null)
          }

          clearInterval(bookingStepTwoAndFour)
          $('body .tripsummary-section-btn .tripsummary-btn-primary').on('click', function() {
            if ($('.tripsummary-section-btn .tripsummary-btn-primary').attr('id') !== 'button-tripsummary-hide-dialog') {
              if (shouldTrackIt('APIS') && count === 1) {
                eventtracking('booking_step_2b_completed_apis', jsonData, null, null, null, null)
                count++
              }
              if (shouldTrackIt('PURC') && count === 1 && !$(this).data('alreadysentevent')) {
                $(this).data('alreadysentevent', 'true')
                eventtracking('booking_step_3b_completed_overview', jsonData, null, null, null, null)
                count++
              }
            }
          })
          if (
            plnextv2 &&
            plnextv2.utils &&
            plnextv2.utils.pageProvider &&
            plnextv2.utils.pageProvider.PlnextPageProvider &&
            plnextv2.utils.pageProvider.PlnextPageProvider &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList &&
            plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors &&
            (plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E ||
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W)
          ) {
            checkErrorsAndWarnings(errorCodes, jsonData)
          }

          $('.global-error-container').bind('DOMSubtreeModified', function() {
            checkErrorsAndWarnings(errorCodes, jsonData)
          })

          $('.component-container').bind('DOMSubtreeModified', function() {
            $('body .tripsummary-section-btn .tripsummary-btn-primary').on('click', function() {
              if (
                $('.tripsummary-section-btn .tripsummary-btn-primary').attr('id') !== 'button-tripsummary-hide-dialog'
              ) {
                // if (shouldTrackIt('ALPI') && count === 1) {
                //   eventtracking('booking_step_2_completed_passenger_info', jsonData, null, null)
                //   count++
                // }
                if (shouldTrackIt('APIS') && count === 1) {
                  eventtracking('booking_step_2b_completed_apis', jsonData, null, null, null, null)
                  count++
                }
                if (shouldTrackIt('PURC') && !$(this).data('alreadysentevent')) {
                  $(this).data('alreadysentevent', 'true')
                  eventtracking('booking_step_3b_completed_overview', jsonData, null, null, null, null)
                  //eventtracking('booking_step_4_completed_overview', jsonData)
                  count++
                }
              }
            })
          })
          //tracking ancillaries clicks
          if((shouldTrackIt('DFSR') || shouldTrackIt('MDFSR')) && count === 1){
            var flow = '';
            if (shouldTrackIt('MDFSR')) {
              flow = 'Manage Booking'
            } else {
              flow = 'Booking Flow'
            }

            $(".catalogServices-teaser-column-BAG").click(function(){
              eventtracking('ancillary_section_opened', jsonData, 'Bags', flow, null, null)
            });
            $(".catalogServices-teaser-column-SEA").click(function(){
              eventtracking('ancillary_section_opened', jsonData, 'Seats', flow, null, null)
            });
            $(".catalogServices-teaser-column-SPO").click(function(){
              eventtracking('ancillary_section_opened', jsonData, 'Sports Equipment', flow, null, null)
            });
            $(".catalogServices-teaser-column-MEA").click(function(){
              eventtracking('ancillary_section_opened', jsonData, 'Meals', flow, null, null)
            });
            $(".catalogServices-teaser-column-SPE").click(function(){
              eventtracking('ancillary_section_opened', jsonData, 'Wheelchairs', flow, null, null)
            });
            count++;
          }
        }
      }, 100) // check every 100ms


      //this is a fix for staff offer
      setTimeout(function() {
        var staffOffer = setInterval(function() {
          if ($('.availability-bound .bound-table-flightline-details').length) {
            if ($('li[data-ffcode=AJOLEUCOPP]').length > 0 || $('li[data-ffcode=AJOLUSCOPP]').length > 0) {
              clearInterval(staffOffer)
              $('.cell-reco.secondary').show()
            }
          }
        }, 100) // check every 100ms
      }, 3000)

      var staffOfferSelected = setInterval(function() {
        if ($('.availability-bound .bound-table-flightline-details').length) {
          if ($('li[data-ffcode=AJOLEUCOPP]').length > 0 || $('li[data-ffcode=AJOLUSCOPP]').length > 0) {
            if (
              jsonData.hasOwnProperty('FPOWTemp') &&
              jsonData.FPOWTemp.hasOwnProperty('bounds') &&
              jsonData.FPOWTemp.bounds.length >= 2
            ) {
              clearInterval(staffOfferSelected)
              toggleTripSummary();
              $('#FPOW-page aside.component-container').show()
            }
          }
        }
      }, 1000) // check every 100ms

      var isBookingSetTwoLoaded = setInterval(function() {
        if ($('.tripsummary-section-btn .tripsummary-btn-primary').length || $('.pricesummarybottom-tablet-row .pricesummarybottom-btn-continue').length) {
          clearInterval(isBookingSetTwoLoaded)
          if (jQuery('body').attr('data-template-name') == 'ALPI' || jsonData.page_code == 'ALPI' || jQuery('body').attr('data-template-name') == 'APIM' || jsonData.page_code == 'APIM') {
            /*The selected flight needs to be called on ALPI page as event on continue button on FPOW doesnt seem to work */
            if($('.container-frequent-flyer').length) { 
              $('.container-frequent-flyer button:nth-child(2)').click();
              $('.container-frequent-flyer .teaser-switch').hide();
          }
            eventtracking('booking_step_1_completed_select_flight', jsonData, null, null, null, null)
            var outboundFareFamily = jsonData.hasOwnProperty('bound') ? jsonData.bound[0].selected_ff_name : 'not-available';
            var inboundFareFamily = jsonData.hasOwnProperty('bound') && jsonData.bound[1] !== undefined ? jsonData.bound[1].selected_ff_name : 'not-available';
            callOptimizely(inboundFareFamily, outboundFareFamily, getLang(jsonData.language, jsonData.external_id).langIdentifiers, jsonData.currency);
          }
        }
      }, 100) // check every 100ms}
    }

    if (
      jQuery('body').attr('data-template-name') == 'RTPL' ||
      jQuery('body').attr('data-template-name') == 'CONF' ||
      eBaDataLayer.page_code == 'RTPL' || eBaDataLayer.page_code == 'CONF'
    ) {
      if (jQuery('body').attr('data-template-name') == 'RTPL' || eBaDataLayer.page_code == 'RTPL') {
          var rtplPage = setInterval(function() {
            if ($('.reservation-info .reservation-actions .action-links-container').length && eBaDataLayer.date_of_sale !== undefined) {
              clearInterval(rtplPage)
              var currentDate = new Date(formatDateOfSale(eBaDataLayer.date_of_sale));
              var targetDate = new Date('2018/04/07');
              if(currentDate < targetDate) {
                $('.reservation-info .reservation-actions .action-links-container').html('<span>You can review the </span><a href="//icelandair.com' + getLang(eBaDataLayer.language, eBaDataLayer.external_id).conditionUrl + '" target="blank">purchase conditions</a>')
              }
            }
          }, 500)
          sendManageBookingOverviewOpened(eBaDataLayer);
       
      }
      var newCarSearch = 'https://widget.rentalcars.com/WidgetSearch.do?affiliateCode=icelandair';
      var newHotelSearch = 'https://aff.bstatic.com/static/affiliate_base/js/booking_sp_widget.js';
      var dateIn = new Date();
      var dateOut = new Date();
      var confUrl2 =
        '//www.' + getLang(eBaDataLayer.language, eBaDataLayer.external_id).url + '/specials/amadeus/confirmation-banners-saga/'
      if (jQuery('body').attr('data-template-name') == 'CONF' || eBaDataLayer.page_code == 'CONF') {
        if (eBaDataLayer.bound.length > 1) {
          dateIn = formatAmadeusDate(eBaDataLayer.bound[0].arr_date);
          dateOut = formatAmadeusDate(eBaDataLayer.bound[1].dep_date);
          var currentDate = new Date();
          if (dateIn < currentDate) {
            dateIn = currentDate;
            if (dateOut < currentDate) {
              dateOut.setDate(currentDate.getDate() + 1);
            }
          }
          newCarSearch += formatNewCarSerach(dateIn, dateOut, eBaDataLayer.bound[0].arr_airport, eBaDataLayer, eBaDataLayer.page_code, eBaDataLayer.currency);
          newHotelSearch += formatNewHotelSearch(dateIn, dateOut, eBaDataLayer.bound[0].arr_airport, eBaDataLayer); 
        } else {
          dateIn = formatAmadeusDate(eBaDataLayer.bound[0].arr_date);
          dateOut = new Date(dateIn);
          dateOut.setDate(dateOut.getDate() + 1);
          var currentDate = new Date();
          if (dateIn < currentDate) {
            dateIn = currentDate;
            if (dateOut < currentDate) {
              dateOut.setDate(currentDate.getDate() + 1);
            }
          }
          newCarSearch += formatNewCarSerach(dateIn, dateOut, eBaDataLayer.city_search_out, eBaDataLayer, eBaDataLayer.page_code, eBaDataLayer.currency);
          newHotelSearch += formatNewHotelSearch(dateIn, dateOut, eBaDataLayer.date_search_in, eBaDataLayer); 
        }
      } else {
        /*use arrival date on first flight leg as some flights land after midnight */
        /*get arrivaldate for round trips*/
        if (eBaDataLayer.bound.length > 1) {
          dateIn = formatAmadeusDate(eBaDataLayer.bound[0].arr_date);
          dateOut = formatAmadeusDate(eBaDataLayer.bound[1].dep_date);
          var currentDate = new Date();
          if (dateIn < currentDate) {
            dateIn = currentDate;
            if (dateOut < currentDate) {
              dateOut.setDate(currentDate.getDate() + 1);
            }
          }
          newCarSearch += formatNewCarSerach(dateIn, dateOut, eBaDataLayer.bound[0].arr_airport, eBaDataLayer, eBaDataLayer.page_code, eBaDataLayer.currency);
          newHotelSearch += formatNewHotelSearch(dateIn, dateOut, eBaDataLayer.bound[0].arr_airport, eBaDataLayer); 
        } else {
          dateIn = formatAmadeusDate(eBaDataLayer.bound[0].arr_date);
          dateOut = new Date(dateIn);
          dateOut.setDate(dateOut.getDate() + 1);
          var currentDate = new Date();
          if (dateIn < currentDate) {
            dateIn = currentDate;
            if (dateOut < currentDate) {
              dateOut.setDate(currentDate.getDate() + 1);
            }
          }
          newHotelSearch += formatNewHotelSearch(dateIn, dateOut, eBaDataLayer.bound[0].arr_airport, eBaDataLayer); 
          newCarSearch += formatNewCarSerach(dateIn, dateOut, eBaDataLayer.bound[0].arr_airport, eBaDataLayer, eBaDataLayer.page_code, eBaDataLayer.currency);
        }
      }
      try {
        var ft_ph =
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.contents.placeholderContents
            .booking_summary_placeholder
        var ft_ph_2 =
          plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.contents.placeholderContents
            .services_policy_placeholder

             // Stopover buddy message, going to iceland og is stopover
            //  var stopoverBuddy = setInterval(function() {
            //   if ($('#baggages-details').length) {
            //     clearInterval(stopoverBuddy);
            //     var data = eBaDataLayer.bound.length >= 3 ? findStopOverInfo(eBaDataLayer.bound): null;
            //     if ((data && data.outbound) || (data && data.inbound) || isGoingToIceland(eBaDataLayer.bound)) {
            //       $('<style scoped>@media (max-width: 768px) { .stopover-buddy-container { flex-direction: column;}} </style><div class="hidden-print stopover-buddy-container" style="display: flex; background: #fff; min-height: 240px;"><div style="background: url(./img/client/buddy.jpg) no-repeat center / cover; min-height: 240px; display: block; width: 100%;"></div><div style="padding: 20px; width: 100%; overflow: hidden; word-break: break-word; font-family: arial;"><span style="color: #004084;  font-size: 18px; font-weight: bold; margin-bottom: 10px; display: block;">Buddy Hotline</span>Plan your perfect stay in Iceland with the help of our Icelandair Buddies. Simply call our Buddy Hotline on <a href="tel:+354-5050-820">+354 5050 820</a> (in Iceland and Europe) or <a href="tel:+1-857-403-1793">+1 857 403 1793</a> (in North America) for trusty travel recommendations given by locals in the know.</br></br>Open 1pm - 7pm weekdays and 4pm - 7pm weekends and bank holidays (Iceland time). This service is available until 8th of July 2019. The Buddy Hotline service is provided in English.</br></br>For more information, visit  <a href="https://icelandair.com/flights/stopover/buddyhotline" target="_blank">https://icelandair.com/flights/stopover/buddyhotline</a></div></div>').insertBefore('#baggages-details');
            //     }
            //   }
            // }, 500);

            // Notice message if something is down
            // var noticeMessage = setInterval(function() {
             // if ($('.reservation-menu').length) {
               // clearInterval(noticeMessage)
                // $('<div style="color: #856404;background-color: #fff3cd;border-color: #ffeeba;"><div style="font-family: arial; font-weight: bold; margin-left: 15px; margin-bottom: 10px; margin-top: 15px;padding: 20px;">Due to scheduled system maintenance, we recommend you hold off making changes to your itinerary until our systems have been fully restored. We expect it up and running again at 05:30 GMT (27 March). Please note that you can still add services like seats and bags to your flight.</div></div>').insertBefore('.reservation-menu');
             // }
           // }, 500);

        if (ft_ph && typeof ft_ph != 'undefined') {
          ft_ph.value += '<iframe title="Book car" class="carrental-banner oneline" src="'+ newCarSearch +'" allowtransparency="true" frameborder="0"></iframe><div id="b_container"></div> ';
          $("<script type = 'text/javascript' id='sp_widget' data-hash='_bf4e29cea52658' data-container='b_container' data-size='590x254' data-tpncy='false' src='" + newHotelSearch + "'></script>").appendTo(document.body);
          
       
          setTimeout(function() {
            if( plnextv2 &&
              plnextv2.utils &&
              plnextv2.utils.pageProvider &&
              plnextv2.utils.pageProvider.PlnextPageProvider &&
              plnextv2.utils.pageProvider.PlnextPageProvider &&
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig &&
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData &&
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business &&
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.TravellerList &&
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.TravellerList.Travellers[0] && 
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.TravellerList.Travellers[0].IdentityInformation && 
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.TravellerList.Travellers[0].IdentityInformation.DocumentsPSPT[0] &&
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.TravellerList.Travellers[0].IdentityInformation.DocumentsPSPT[0].IDEN_Nationality
              ){
                // var languageToUse = ['DK', 'SE', 'NO', 'IS'];
                // if (languageToUse.includes(eBaDataLayer.language)) {
                  $(' <div id="sherpa-widget" style="margin-top:15px;"><div id="sherpa-widget-wrap"><div id="sherpa-root"></div></div></div>').insertAfter('.button-container')+
                  $("<script src='https://icelandair-sdk.joinsherpa.io/v1/integration-script.js'></script>").appendTo(document.body);   
                  var itinerary = [];
                  //https://sdk-sandbox.joinsherpa.io/v1/iceland-air.js
                  jQuery.each(eBaDataLayer.bound, function(index, value) {
                      itinerary.push({
                          destinationCountry: value.arr_country,
                          finalAirportName: value.arr_airport,
                          arrivalDate: new Date(formatDate(value.arr_date))
                      });
                    })
                    setTimeout(function() {
                      var lang = eBaDataLayer.language.toLowerCase() === 'us' || eBaDataLayer.language.toLowerCase() === 'gb' ? 'en': eBaDataLayer.language.toLowerCase();
                      var widgetOptions = {
                        defaultNationalityCountry: plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.business.TravellerList.Travellers[0].IdentityInformation.DocumentsPSPT[0].IDEN_Nationality,
                        finalAirportName: eBaDataLayer.bound[0].arr_airport,
                        language: lang,
                        itinerary
                    }
                      $sherpa.IcelandAirV1.createWidget(widgetOptions);
                      }, 1000);
                // }
              }
          }, 2000);

          setTimeout(function() {
            $('*[data-placeholder-path="RTPL/pageContent/booking_summary_placeholder"],*[data-placeholder-path="CONF/pageContent/booking_summary_placeholder"]').addClass('hidden-print');
          }, 2000);

          if(eBaDataLayer.language === 'FI' && $('body').data('page-device-type') !== 'MOBILE') {
            setTimeout(function() {
            $('iframe.carrental-banner').css( "height", "310px" );
            $('#b_container').css( "height", "310px" );
            }, 500);
          }
        }
        if (jQuery('body').attr('data-template-name') == 'CONF' || eBaDataLayer.page_code == 'CONF') {
            $('<iframe title="Saga Club - Saga Shop" class="confirmation-banner oneline" src="' +
            confUrl2 +
            '" allowtransparency="true" frameborder="0"></iframe>').insertBefore('#baggages-details');
        } else if (jQuery('body').attr('data-template-name') == 'RTPL' || eBaDataLayer.page_code == 'RTPL') {
            if(ft_ph_2 && typeof ft_ph_2 != 'undefined') {
              ft_ph_2.value +=
              '<iframe title="Saga Club - Saga Shop" class="confirmation-banner oneline" src="' +
              confUrl2 +
              '" allowtransparency="true" frameborder="0"></iframe>'
            }
        } 
      } catch (err) {
        /* do nothing, probably error on accessing json object */
      }
    }

    var headerDomain = jsonData.external_id
    var langcode = jsonData.language
    var callbackUrl = '//iframe.icelandair.is/' + headerDomain + '/?'
    //for live
    var url = '//www.icelandair.' + headerDomain
    if (headerDomain == 'CA' && langcode == 'FR') {
      url = '//fr.icelandair.' + headerDomain
      callbackUrl = '//iframe.icelandair.is/fr-ca/?'
    } else if (headerDomain == 'GB' && langcode == 'GB') {
      url = '//www.icelandair.co.uk'
      callbackUrl = '//iframe.icelandair.is/co-uk/?'
    } else if (jsonData.market == 'RU' && langcode == 'RU') {
      url = '//ru.icelandair.net'
      callbackUrl = '//iframe.icelandair.is/ru/?'
    }
    callbackUrl = callbackUrl.toLowerCase()

    //set icelandair href for top logo
    $('#iceLogo').attr('href', url)

    if (jQuery('body').attr('data-template-name') == 'FPOW' || jsonData.page_code == 'FPOW') {
      var flightSearchPage = setInterval(function() {
        if ($('.component.bread-crumb-component.header-component').length && eBaDataLayer) {
          clearInterval(flightSearchPage)
          var editUrl = createEditSearchUrl(jsonData);
          var langData = getLang(jsonData.language, jsonData.external_id);
          var basefacts = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts;
          device_type = basefacts.deviceType != undefined ? capitalizeFirstLetter(basefacts.deviceType): 'Desktop'
          if (device_type === 'Mobile') {
            $('<div class="edit-search-button" style="position: relative;float: right;top: -22px;right: 17px; height: 1px;"><a href="' + editUrl +'" style="text-decoration: none;"><div class="icon-edit" style="font-size: 20px;"></div></a></div>')
            .insertAfter('.component.bread-crumb-component.header-component .pull-left');
          } else if(device_type === 'Tablet') {
            $('<div class="pull-right edit-search-button" style="text-align: center; padding-top: 12px; padding-right: 10px; font-weight: bold; margin-left: 30px; font-size: 14px !important;"><a style="text-decoration: none;" href="' + editUrl +'"><span class="icon-edit" style="text-decoration: none;"></span> ' + langData.edit + '</a></div>')
            .insertAfter('.component.bread-crumb-component.header-component .pull-left');
          } else {
            $('<div class="pull-right edit-search-button" style="text-align: center; padding-top: 12px; font-weight: bold; margin-left: 46px; font-size: 14px !important;"><a style="text-decoration: none;" href="' + editUrl +'"><span class="icon-edit" style="text-decoration: none;"></span> ' + langData.edit + '</a></div>')
            .insertAfter('.component.bread-crumb-component.header-component .pull-left');
          }
          $('.edit-search-button').click(function() {
            eventtracking('edit_search_clicked', jsonData, null, null, null, null);
          })
        }   
      }, 500);
    }

    var addLinkToIcon = setInterval(function() {
      if ($('.component.bread-crumb-component.header-component').length && eBaDataLayer) {
        clearInterval(addLinkToIcon)
        var langData = getLang(jsonData.language, jsonData.external_id);
        var lang = '';
        if (langData.langIdentifiers === 'en-us'){
          lang = '';
        } else if (langData.langIdentifiers === 'is-is') {
          lang = 'is/'
        } else {
          lang = langData.langIdentifiers + '/';
        }
        var logoURL = 'https://www.icelandair.com/' + lang;
        $('.title-container.has-steps').wrap('<a href="' + logoURL + '"></a>');
      }
    }, 500);
   
    /*Fix for opening fare panel for stopover*/
    // if (
    //   (jQuery('body').attr('data-template-name') == 'FDFFCPX' || jsonData.page_code == 'FDFFCPX') &&
    //   jsonData.office_id.indexOf('FI08FX') != -1
    // ) {
    //   var checkFareTable = setInterval(function() {
    //     if ($('#complexItinerary-ff-header').length) {
    //       clearInterval(checkFareTable)
    //       $('.ff-comp-link.ff-row-header')
    //         .find('a:first')[0]
    //         .click()
    //       var totalFlights = $('.tripsummary-section-itinerary > div').length
    //       $('#tripsummary').addClass('count-' + totalFlights)
    //     }
    //   }, 100) // check every 100ms
    // }

    /*check if iframe does not exist before creation*/
    if (
      jQuery('.modify-search-iframe').length == 0 &&
      (jQuery('body').attr('data-template-name') == 'FPOW' ||
        jQuery('body').attr('data-template-name') == 'FARE' ||
        jQuery('body').attr('data-template-name') == 'GERR' ||
        jQuery('body').attr('data-template-name') == 'FDCT' ||
        jQuery('body').attr('data-template-name') == 'FDCS' ||
        jsonData.page_code == 'FPOW' ||
        jsonData.page_code == 'FARE' ||
        jsonData.page_code == 'GERR' ||
        jsonData.page_code == 'FDCT' ||
        jsonData.page_code == 'FDCS') &&
      jsonData.office_id.indexOf('FI08FX') == -1 &&
      jsonData.office_id.indexOf('FI08ZZ') == -1
    ) {
      jQuery('#main-layout-header').removeClass('main-headerengineoff')
      jQuery('#main-layout-header').addClass('main-headerengineon')
      jQuery('.tilesCustomHeader').removeClass('headerengineoff')
      jQuery('.tilesCustomHeader').addClass('headerengineon')

      /*use arrival date on first flight leg as some flights land after midnight */
      callbackUrl += 'departDate-1=' + eBaDataLayer.date_search_out
      callbackUrl += '&arrivalDate-1=' + eBaDataLayer.date_search_in

      /*GERR doesnt expose the search in eBaDataLayer anymore*/
      try {
        callbackUrl +=
          '&dep_1=' + eBaDataLayer.search.flights[0].departure.location_code /*vantar airport name h&eacute;rna*/
        callbackUrl += '&B_LOCATION_1=' + eBaDataLayer.search.flights[0].departure.location_code
        callbackUrl += '&arr_1=' + eBaDataLayer.search.flights[0].arrival.location_code
        callbackUrl += '&E_LOCATION_1=' + eBaDataLayer.search.flights[0].arrival.location_code

        jQuery.each(eBaDataLayer.passengers, function(index, value) {
          callbackUrl += '&' + value.pax_type + '=' + value.nb_pax_type
        })

        if (eBaDataLayer.trip_type == 'RT') {
          callbackUrl += '&return=return'
          jQuery('.item.dates').html(eBaDataLayer.date_search_out + ' - ' + eBaDataLayer.date_search_in)
        } else if (eBaDataLayer.trip_type == 'OW') {
          callbackUrl += '&oneway=oneway'
          jQuery('.item.dates').html(eBaDataLayer.date_search_out)
        }
        /*Add info for flight in top bar*/
        jQuery('.item.location span.dep').html(eBaDataLayer.search.flights[0].departure.location_code)
        jQuery('.item.location span.arr').html(eBaDataLayer.search.flights[0].arrival.location_code)
        jQuery('.item.passengers span').html(eBaDataLayer.nb_trav)
        if (
          typeof plnextv2 != 'undefined' &&
          plnextv2.utils.pageProvider.PlnextPageProvider._config.siteConfiguration.appData.config.search
            .commercialFareFamilies.length
        ) {
          jQuery('.item.class').html(
            plnextv2.utils.pageProvider.PlnextPageProvider._config.siteConfiguration.appData.config.search
              .commercialFareFamilies[0].name
          )
        }
      } catch (e) {}

      jQuery('.flinfo').show()
      
      var checkExist = setInterval(function() {
        if (document.readyState == 'complete' && $('.availability-list-fares').length && $('.farefamily-header-container').length) {
          clearInterval(checkExist)
          if(window.location.href.indexOf('/icelandairNewB/') === -1) {
            structureFareList()
           }
        }
      }, 100) // check every 100ms
      //build the iframe
      var modSearchIframe = jQuery('<iframe />', {
        name: 'modify-search-iframe',
        class: 'modify-search-iframe',
        title: 'Search flights',
        id: 'modify-search-iframe',
        frameborder: '0',
        allowtransparency: 'true',
        style: 'display:block',
        scrolling: 'no'
      })
        .insertAfter('.tilesCustomHeader')
        .hide()
      //}).prependTo('#main-layout-header');

      //add the returned HTML content to the iframe
      modSearchIframe.attr('src', callbackUrl)

      /*if( jQuery('#modify-search-iframe').length )   
        console.log("modify-search-iframe loaded");*/
    } else if (
      (jsonData.page_code != 'FPOW' &&
        jsonData.page_code != 'FARE' &&
        jsonData.page_code != 'FDCT' &&
        jsonData.page_code != 'FDCS') ||
      jsonData.office_id.indexOf('FI08ZZ') > -1
    ) {
      jQuery('.modify-search-iframe').remove()
      jQuery('#main-layout-header').removeClass('main-headerengineon')
      jQuery('#main-layout-header').addClass('main-headerengineoff')
      jQuery('.tilesCustomHeader').removeClass('headerengineon')
      jQuery('.tilesCustomHeader').addClass('headerengineoff')
    }

    if (jQuery('body').attr('data-template-name') == 'ALPI' || jsonData.page_code == 'ALPI' || jQuery('body').attr('data-template-name') == 'APIM' || jsonData.page_code == 'APIM') {
      var checkSectionTraveller = setInterval(function() {
        if ($('section#traveller').length || $('section.traveller-contact-information-panel-body').length) {
          clearInterval(checkSectionTraveller)
          var termsAlpi = terms[getLang(jsonData.language, jsonData.external_id).langIdentifiers]
          var newTerms = checkBoxTerms[getLang(jsonData.language, jsonData.external_id).langIdentifiers]
          termsAlpi = $('<div />')
            .html(termsAlpi)
            .text()
          $('.globalError').bind('DOMSubtreeModified', function() {
            var messages = $('#form-global-errors-travellerList')
              [0].innerHTML.replace(/<(?:.|\n)*?>/gm, '')
              .replace(/(\r\n|\n|\r)/gm, '')
            listenToGlobalErrors(
              jsonData,
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.forms.travellerForm
                .globalErrorCount,
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.forms.travellerForm
                .globalErrorTitle,
              'form',
              messages
            )
          })
          //$(termsAlpi).insertAfter('section#traveller')
          if($('section#traveller').length) {
            $(newTerms.terms).insertAfter('section#traveller')
          } else {
            $(newTerms.terms).insertAfter('section.traveller-contact-information-panel-body')
          }
          $('#purchaseConditionLink').click(function() {
            $('#button-tripsummary-purchase-conditions ').trigger('click')
          })
          $('#travellerFormError ul.error li').click(function() {
            var current = $(this).attr('id')
            var newPos = current.match(/tpl4_global-error-message--travellerList-traveller_(.*)/)[1]
            $('html, body').animate(
              {
                scrollTop: $('#widget-group-travellerList-traveller_' + newPos).offset().top
              },
              'fast'
            )
          })
        }
        $('.tripsummary-btn-primary.tripSummary-btn-continue.tripsummary-btn-validate').click(function( event ) {
          $('#component-term-conditions .error').remove();
        if(!document.getElementById('privacy_policy').checked){
          $(window).scrollTop($('#component-term-conditions').offset().top);
          $('#component-term-conditions').css({'border': '1px solid #ce0058'});
          $(newTerms.errorMessage).insertBefore('#component-term-conditions .bold');
          return false;
        }
        $('#component-term-conditions').css({'border': '1px solid #eaeaea'});
        return true;
        });

        $('.button-container .btn-primary').click(function(event) {
          $('#component-term-conditions .error').remove();
          if(!document.getElementById('privacy_policy').checked){
            $(window).scrollTop($('#component-term-conditions').offset().top);
            $('#component-term-conditions').css({'border': '1px solid #ce0058'});
            $(newTerms.errorMessage).insertBefore('#component-term-conditions .bold');
            return false;
          }
          $('#component-term-conditions').css({'border': '1px solid #eaeaea'});
          return true;
        });

        $('.pricesummarybottom-tablet-row .pricesummarybottom-cell-continue').click(function(event) {
          $('#component-term-conditions .error').remove();
          if(!document.getElementById('privacy_policy').checked){
            $(window).scrollTop($('#component-term-conditions').offset().top);
            $('#component-term-conditions').css({'border': '1px solid #ce0058'});
            $(newTerms.errorMessage).insertBefore('#component-term-conditions .bold');
            return false;
          }
          $('#component-term-conditions').css({'border': '1px solid #eaeaea'});
          return true;
        });

        var deferTimer = null;
        $('.component-container').bind('DOMSubtreeModified', function() {
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            $('.tripsummary-btn-primary.tripSummary-btn-continue.tripsummary-btn-validate').click(function( event ) {
              $('#component-term-conditions .error').remove();
              if(!document.getElementById('privacy_policy').checked){
                $(window).scrollTop($('#component-term-conditions').offset().top);
                $('#component-term-conditions').css({'border': '1px solid #ce0058'});
                $(newTerms.errorMessage).insertBefore('#component-term-conditions .bold');
                return false;
              }
              $('#component-term-conditions').css({'border': '1px solid #eaeaea'});
              return true;
            });
            $('.button-container .btn-primary').click(function(event) {
              $('#component-term-conditions .error').remove();
              if(!document.getElementById('privacy_policy').checked){
                $(window).scrollTop($('#component-term-conditions').offset().top);
                $('#component-term-conditions').css({'border': '1px solid #ce0058'});
                $(newTerms.errorMessage).insertBefore('#component-term-conditions .bold');
                return false;
              }
              $('#component-term-conditions').css({'border': '1px solid #eaeaea'});
              return true;
            });
          }, 150);
        });
        
      }, 1000)
    }
    if (jQuery('body').attr('data-template-name') == 'PURC' || jsonData.page_code == 'PURC') {
      var checkSectionTerms = setInterval(function() {
        if ($('section.terms-and-conditions').length) {
          clearInterval(checkSectionTerms)
          $('#form-global-errors-purchaseForm').bind('DOMSubtreeModified', function() {
            var messages = $('#form-global-errors-purchaseForm')
              [0].innerHTML.replace(/<(?:.|\n)*?>/gm, '')
              .replace(/(\r\n|\n|\r)/gm, '')
            listenToGlobalErrors(
              jsonData,
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.forms.purchaseForm
                .globalErrorCount,
              plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.forms.purchaseForm
                .globalErrorTitle,
              'terms',
              messages
            )
          })
        }
      }, 1000)
    }

    function listenToGlobalErrors(jsonData, count, errorCode, source, errorMessage) {
      if (count > 0) {
        setTimeout(function() {
          if (!$(this).data(errorCode + '-' + source)) {
            $(this).data(errorCode + '-' + source, 'true')
            sendErrorEvent(jsonData, errorCode + '-' + source, errorMessage, 'error')
          }
        }, 1000)
      }
    }
  }
  var managebooking = setInterval(function() {
    if(jQuery('body').attr('data-template-name') == 'MCONF') {
      if($('.button-manage-booking-container').length){
        clearInterval(managebooking)
        setTimeout(function(){
          sendManageBookingEvent();
        }, 1000);
      }
    }
  }, 1000)
}


jQuery(document).on('plnext:view:ready', insertCarbonFootprint);
// jQuery(document).on('plnext:customData:ready', hideChangeFlightButtons);
// jQuery(document).on('plnext:customData:ready', hideSteakSandwichUSMarket);
//trigger the iframe creation, when data is ready
jQuery(document).on('plnext:view:ready', getModifySearchIframe)

// Support Manage Booking deep linking - used by the mobile app
jQuery(document).on('plnext:view:ready', function() {
  try {
    // Note that jQuery('body').attr('data-template-name') === 'MDFSR' isn't available until later, after the body becomes visible => can't check for that
    if (plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts['request.SO_ICELANDAIR_CUSTOM_PROPERTY_DEEP_LINK_SERVICE']) {
      var deepLinkService = plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.basefacts['request.SO_ICELANDAIR_CUSTOM_PROPERTY_DEEP_LINK_SERVICE'];
      var supportedDeepLinks = {
        'bags': 'BAG',
        'seats': 'SEA',
        'meals': 'MEA',
        'service': 'SPE',
        'sport': 'SPO'
      };
      var deepLink = supportedDeepLinks[deepLinkService];
      if (deepLink) { // only continue if the deep link is actually supported
        jQuery('body').append('<style id="styleTempoaryHideBody" type="text/css">#main-container {display: none;}</style>'); // hide the body temporary to void extra flicker
        var btnCheckInterval = setInterval(
          function() {
            if (jQuery('#tpl4_button-' + deepLink).length > 0) {
              jQuery('#tpl4_button-' + deepLink).click(); // show the requested dialog
              setTimeout(function() {jQuery('#styleTempoaryHideBody').remove();}, 300); // unhide the body so that it's ready when the user is finished with the dialog
              clearInterval(btnCheckInterval);
            } else if (jQuery('.catalogServices-teaser-title-button').length > 0) {
              jQuery('.catalogServices-teaser-title-button').filter(function(index, elm){ return jQuery(elm).attr('aria-describedby') === ('service-desc-' + deepLink); }).click(); // show the requested dialog
              setTimeout(function() {jQuery('#styleTempoaryHideBody').remove();}, 300); // unhide the body so that it's ready when the user is finished with the dialog
              clearInterval(btnCheckInterval);
            }
          },
          100
        );
        /*
         fallback
          - in some cases extra services aren't available
          - so there won't ever by any tpl4_buttons to click
         so ensure that the page is displayed remove the temporary body hide
        */
        setTimeout(function() {jQuery('#styleTempoaryHideBody').remove();}, 2500);
      }
    }
  } catch (e) {
    console.error(e);
  }
});