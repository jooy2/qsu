import type { DetectedLanguage } from '../_types/global.js';

// A language as [code, words, letters, shapes]: its ISO 639-1 code, its most common words, the
// letters it writes that only some of the languages of its script do, and the shapes its words
// take. A shape written `-x` is an ending, `x-` a beginning and `x` a sequence anywhere in the
// word. Words and shapes are separated by spaces.
type LanguageData = readonly [string, string, string, string];

// The languages of a shared script, read into lookups.
type LanguageTable = {
	codes: string[];
	words: ReadonlySet<string>[];
	letters: ReadonlySet<string>[];
	// Every letter any language of the script marks.
	marked: ReadonlySet<string>;
	// Each shape, without its `-`, and the indexes of the languages it belongs to.
	endings: ReadonlyMap<string, number[]>;
	beginnings: ReadonlyMap<string, number[]>;
	sequences: ReadonlyMap<string, number[]>;
	longest: number;
};

// A script several languages share is named by its group, and the language is decided from
// the words written in it. Han is shared by Chinese, Japanese and Korean, and kana is Japanese.
const LATIN = 'latin';
const CYRILLIC = 'cyrillic';
const ARABIC = 'arabic';
const HAN = 'han';
const KANA = 'kana';

// Code point ranges of the scripts the function knows, as [first, last, script], sorted by
// the first code point. A script only one language writes names that language. Characters in
// a range that are not letters, such as digits and punctuation, are skipped by the caller.
// The order of a list of languages is the order a tie is settled in.
const RANGES: ReadonlyArray<readonly [number, number, string]> = [
	[0x0041, 0x005a, LATIN],
	[0x0061, 0x007a, LATIN],
	[0x00c0, 0x02af, LATIN],
	[0x0370, 0x03ff, 'el'],
	[0x0400, 0x052f, CYRILLIC],
	[0x0530, 0x058f, 'hy'],
	[0x0590, 0x05ff, 'he'],
	[0x0600, 0x06ff, ARABIC],
	[0x0750, 0x077f, ARABIC],
	[0x0870, 0x08ff, ARABIC],
	[0x0900, 0x097f, 'hi'],
	[0x0980, 0x09ff, 'bn'],
	[0x0a00, 0x0a7f, 'pa'],
	[0x0a80, 0x0aff, 'gu'],
	[0x0b00, 0x0b7f, 'or'],
	[0x0b80, 0x0bff, 'ta'],
	[0x0c00, 0x0c7f, 'te'],
	[0x0c80, 0x0cff, 'kn'],
	[0x0d00, 0x0d7f, 'ml'],
	[0x0d80, 0x0dff, 'si'],
	[0x0e00, 0x0e7f, 'th'],
	[0x0e80, 0x0eff, 'lo'],
	[0x0f00, 0x0fff, 'bo'],
	[0x1000, 0x109f, 'my'],
	[0x10a0, 0x10ff, 'ka'],
	[0x1100, 0x11ff, 'ko'],
	[0x1200, 0x139f, 'am'],
	[0x1780, 0x17ff, 'km'],
	[0x1800, 0x18af, 'mn'],
	[0x1c80, 0x1c8f, CYRILLIC],
	[0x1c90, 0x1cbf, 'ka'],
	[0x1e00, 0x1eff, LATIN],
	[0x1f00, 0x1fff, 'el'],
	[0x2c60, 0x2c7f, LATIN],
	[0x2d00, 0x2d2f, 'ka'],
	[0x2d80, 0x2ddf, 'am'],
	[0x3005, 0x3005, HAN],
	[0x3040, 0x30ff, KANA],
	[0x3100, 0x312f, 'zh'],
	[0x3130, 0x318f, 'ko'],
	[0x31a0, 0x31bf, 'zh'],
	[0x31f0, 0x31ff, KANA],
	[0x3400, 0x4dbf, HAN],
	[0x4e00, 0x9fff, HAN],
	[0xa640, 0xa69f, CYRILLIC],
	[0xa720, 0xa7ff, LATIN],
	[0xa8e0, 0xa8ff, 'hi'],
	[0xa960, 0xa97f, 'ko'],
	[0xa9e0, 0xa9ff, 'my'],
	[0xaa60, 0xaa7f, 'my'],
	[0xac00, 0xd7ff, 'ko'],
	[0xf900, 0xfaff, HAN],
	[0xfb00, 0xfb06, LATIN],
	[0xfb13, 0xfb17, 'hy'],
	[0xfb1d, 0xfb4f, 'he'],
	[0xfb50, 0xfdff, ARABIC],
	[0xfe70, 0xfeff, ARABIC],
	[0xff21, 0xff3a, LATIN],
	[0xff41, 0xff5a, LATIN],
	[0xff66, 0xff9f, KANA],
	[0xffa0, 0xffdc, 'ko'],
	[0x1b000, 0x1b16f, KANA],
	[0x20000, 0x323af, HAN]
];

const LATIN_LANGUAGES: ReadonlyArray<LanguageData> = [
	[
		'en',
		'a about after again all also always an and any are aren as at be because been but by ' +
			'can come could couldn did didn do does doesn don for from get go going good got had has ' +
			'have he hello her here him his how i if in into is isn it its just know like ll make me ' +
			'more my never no not nothing now of on only or other our out over people please really ' +
			'see she so some something sorry still take than thank thanks that the their them then ' +
			'there these they think this time to today tomorrow up very want was wasn we well were ' +
			'what when which who will with would wouldn yes yesterday you your',
		'',
		'th wh sh ght ough tch -ing -ed -ly -ness -ful -ious -ity -tion -ment'
	],
	[
		'es',
		'a ahora al algo aquí ayer bien buena buenas bueno buenos como con cosa cuando de del ' +
			'donde día días el ella ellos en entre era es esa ese eso esta estaba este esto está ' +
			'favor fue gracias había hace hay hola hoy la las le les lo los mañana me mi mucha ' +
			'muchas mucho muy más nada no nos nunca o para pero por porque puede puedo que quiero ' +
			'qué se ser si siempre sin sobre son su sus sé sí también te tengo tiene todo tu un una ' +
			'uno vamos voy y ya yo',
		'áéíñóúü',
		'll- -ción -ciones -idad -iendo -aban -ado -ada -ados -adas -mente'
	],
	[
		'fr',
		'a ai allons alors au aujourd aussi aux avec avez avons beaucoup bien bon bonjour bonne ' +
			'bonsoir c ce cela ces cette chose comme d dans de demain des donc du elle elles en ' +
			'encore est et fais fait ici il ils j jamais je l la le les leur lui maintenant mais me ' +
			'merci moi même n ne non nous on ont ou oui où par parce pas peux plus pour pourquoi qu ' +
			'quand que qui quoi rien sa sais salut sans se ses sommes son sont suis sur toujours ' +
			'trop très tu un une vais veux vous y à était été êtes être',
		'àâæçèéêëîïôùûüÿœ',
		'eau -eux -euse -aient -ait -oir -eur -ment -tion -ique -aux'
	],
	[
		'de',
		'alles als am an auch auf aus bei bin bis bist bitte da danke dann das dass dem den denn ' +
			'der des die dir doch du ein eine einem einen einer er es etwas für geht gerne gestern ' +
			'gibt gut guten habe hallo hast hat heute hier ich ihr im immer in ist ja jetzt kann ' +
			'kein keine macht mal man mein meine mich mir mit morgen möchte nach nein nicht nichts ' +
			'nie noch nur oder sehr sich sie sind so um und uns viel viele von wann war warum was ' +
			'weil weiß werden wie wieder will wir wird wurde zu zum zur über',
		'ßäöü',
		'sch tz pf cht -ung -ungen -lich -keit -heit -chen -isch -ieren -tion'
	],
	[
		'pt',
		'a agora ainda amanhã antes ao aos aqui as até bem bom coisa com como da das de depois ' +
			'dia do dos e ela ele em então essa esse está eu favor faz foi hoje isso já mais mas me ' +
			'muita muito muitos na nada nas no nos nunca não o obrigada obrigado oi olá ontem os ou ' +
			'para pela pelo pode por porque posso quando que quero se sei sem sempre ser seu sim sua ' +
			'são também tchau tem tenho tudo um uma vamos você vou é',
		'àáâãçéêíóôõú',
		'lh nh -dade -dades -inho -inha -agem -ado -ada -ados -adas -mente'
	],
	[
		'it',
		'a abbiamo adesso ai al alla allora anche ancora andiamo bene buona buongiorno buono c ' +
			'che ci ciao come con cosa da dal dei del della delle di domani dopo dove e faccio fare ' +
			'gli grazie ha hai ho i ieri il in io l la le lei lo loro lui ma mai mi molto ne nel ' +
			'nella niente non oggi ora per perché più posso prego prima può qualcosa quando quella ' +
			'quello questa questo qui sai scusa se sempre si siamo siete so sono stata stato su sua ' +
			'suo sì tanto troppo tutti tutto un una uno va vado voglio è',
		'àèéìíîòóùú',
		'gli zz cch -zione -zioni -ità -etto -etta -iamo -ggio -mente'
	],
	[
		'ca',
		'a abans adéu ahir així al alguna als amb anar anem aquest aquesta aquí ara avui bon ' +
			'bona bé com cosa d de del dels demà després dia doncs el ella ells els en encara era ' +
			'estic està ets fa fem fer fins gràcies ha han he hem hi ho hola i ja jo l la les li mai ' +
			'me meu meva molt nit no nosaltres o on per perquè però plau pot puc quan que què res ' +
			'saps sempre seu seva si som sou sé sí sóc són també teu teva tinc tot tothom tots tu un ' +
			'una va vaig vull és',
		'àçèéíïòóúü',
		'tx aix eix ll- -ció -cions -tat -tats -ment'
	],
	[
		'nl',
		'aan al alles als alstublieft altijd ben bent bij dan dank dat de die dit door een eens ' +
			'en er ga gaan gaat geen gisteren goed graag had hallo heb hebben heeft heel hem het ' +
			'hier hij hoe iets ik in is ja je jullie kan komt maar met mij mijn moet mooi naar nee ' +
			'niet niets nog nooit nu of om ons onze ook op over straks te toch tot uit van vandaag ' +
			'veel voor waarom wanneer was wat we weet wel werd wie wij wil worden wordt zal ze zich ' +
			'zijn zou',
		'éëï',
		'ij oe aa uu sch cht -heid -lijk -lijke -tje -tjes -ing -isch'
	],
	[
		'sv',
		'aldrig alla allt alltid att av bara blir bra de den det din ditt du där efter eller en ' +
			'ett finns från för gärna går gör har hej hon hur här i idag igen igår imorgon ingenting ' +
			'inget inte jag kan kanske kommer man med men mig min mina mitt morgon mycket måste nej ' +
			'nu när något och också okej om oss på redan sa ses sig ska skulle som säger så tack ' +
			'till under upp ut vad var vara varför vem vet vi vid vill vår är',
		'äåéö',
		'sj -ning -ningen -het -lig -liga -ligt -tion -arna -orna -erna'
	],
	[
		'da',
		'af aldrig alle allerede alt altid at bare blev bliver da de dem den der det dig din dit ' +
			'du efter eller en er et for fra gerne god godt går gør gøre har havde hej hendes hun ' +
			'hvad hvem hvor hvorfor i igen ikke ingenting jeg kan kommer lidt man med meget men mig ' +
			'min mine mit morgen måske nej nogen noget nogle nu når næste og også om op os på sagde ' +
			'senere ses sig siger skal som så sådan tak til ud under var ved vi vil vores være',
		'åæéø',
		'øj -hed -else -ede -lig -lige -ligt -tion -ning -ningen'
	],
	[
		'no',
		'aldri alle allerede alltid alt at av bare ble blir da de deg dem den der det din ditt ' +
			'du eller en er et etter for fra gjerne gjør gjøre god godt greit går hadde har hei ' +
			'hennes hun hva hvem hvor hvorfor i igjen ikke ingenting jeg kan kanskje kommer litt man ' +
			'med meg men min mine mitt morgen mye nei neste noe noen nå når og også om opp oss på sa ' +
			'seg senere ses sier skal som så sånn takk til under ut var veldig vet vi vil vår vårt ' +
			'være å',
		'åæéø',
		'sj kj gj øy -sjon -sjonen -het -else -lig -lige -ligt -ning -ningen'
	],
	[
		'fi',
		'aina ehkä ei eilen en ennen et että haluan hei heidän huomenna hyvin hyvä hyvää hän ' +
			'hänen ja jo joka joo jos jotain jotka kaikki kanssa kiitos koska koskaan kuin kuinka ' +
			'kuka kun kyllä meidän menen miksi mikä minun minä missä mitä mitään moi mutta myös ne ' +
			'niin nyt olemme olen olet olette oli olla on onko ovat paljon paljonko se sen siitä ' +
			'sinä sitten tai teidän tiedä tiedän tulee tuo tämä tänään vain vielä voi voin voit ' +
			'vähän',
		'äåö',
		'aa ää ii uu yy öö -aa -uu -yy -inen -ssä -stä -llä -ksi -kin'
	],
	[
		'pl',
		'a ale bardzo bez być był była było chcę coś cześć czy dla dlaczego do dobra dobry ' +
			'dobrze dzisiaj dziękuję dziś gdy gdzie go i ich idziemy idę ile ja jak jego jej jest ' +
			'jestem jesteś jesteśmy jeszcze jutro już kiedy kto która które który ma mam mamy masz ' +
			'mi mnie mogę moja moje może mój na nasz nic nie nigdy o od oraz po potem proszę przed ' +
			'przez się są ta tak te ten teraz też to tu twój tylko w wczoraj we wiem wszystko z za ' +
			'zawsze że',
		'óąćęłńśźż',
		'sz cz rz dz naj- -ych -ego -ami -ów -ość -ać -ić'
	],
	[
		'cs',
		'a ahoj ale ani ano asi bez by byl byla bylo být chci co dnes do dobrý dobře děkuji ' +
			'dělám i jak jako jde jdeme jdu je jeho jen již jsem jsi jsme jsou jste já k kde kdo kdy ' +
			'když kolik která které který mezi mi moje má mám máme máš mě můj může můžu na naše ne ' +
			'nebo není nevím nic nikdy náš něco o od pak po potom pro prosím protože proč před při s ' +
			'se si tady tak taky také tato ten teď to toto u už v ve vím včera všechno vždy z za ' +
			'zítra že',
		'áéíóúýčďěňřšťůž',
		'nej- -ení -ovat -ost -uji -ého -ých'
	],
	[
		'sk',
		'a ahoj aj ako ale alebo ani bez bol bola bolo by byť chcem dnes do dobre dobrý ešte ho ' +
			'i ich ide idem ideme ja je jeho jej k kde kedy keď koľko kto ktorá ktoré ktorý lebo len ' +
			'medzi mi moja moje má mám máme máš môj môže môžem na naša neviem nie niečo nikdy nič ' +
			'náš o od po potom pre pred prečo pri prosím robím sa si sme som ste sú tak tam ten ' +
			'tento teraz tiež to toto tu táto už v veľmi viem vo včera všetko vždy z za zajtra áno ' +
			'čo ďakujem že',
		'áäéíóôúýčďĺľňŕšťž',
		'dz naj- -enie -ovať -osť -ť -ujem -ov -ého -ých'
	],
	[
		'hr',
		'a ako ali bez bi bila bilo bio biti bok da danas do dobar dobro gde gdje hoću hvala i ' +
			'idem idemo ili ima imam imaš iz ja je jer jesam jesi još jutro jučer kad kada kako kao ' +
			'koja koje koji koliko mogu moj moja moje molim može na naš naša ne nema nešto nije ' +
			'nikad nikada ništa o od ona oni ova ovde ovdje ovo pa posle poslije pre pred prije ' +
			'radim sa sad sada sam samo se si smo ste su sutra sve svi ta taj također tko to treba ' +
			'tvoj u uvek uvijek već za zašto zbog zdravo znam šta što želim',
		'ćčđšž',
		'lj nj ije dž naj- -nje -ija -ost -ujem'
	],
	[
		'ro',
		'a aceasta această acest acesta acum ai aici al ale am are astăzi au avem azi bine bun ' +
			'bună ca care ce cea cel ceva cine cu când că da dacă dar de din după e ea ei el este eu ' +
			'eşti ești fac fi foarte fost fără ieri la le lui mai mea mereu merg mergem meu ' +
			'mulţumesc mulțumesc mâine ne niciodată nimic noastră nostru nu o pe pentru poate pot ' +
			'prin salut sau se spune sunt suntem să tot totul tău un una unde unei unui va vreau în ' +
			'înainte încă şi ştiu și știu',
		'âîăşţșț',
		'-ul -ului -ilor -ii'
	],
	[
		'hu',
		'a ahol akarok aki akkor ami amit az be csak de egy el előtt este ez ezen ezt fel ha ' +
			'hogy hol holnap igen is itt jó jól kell ki köszi köszönöm lehet lesz ma majd meg megyek ' +
			'megyünk mert mi mikor minden mindig mint mit miért mondja most már még nagyon nekem ' +
			'neki nem nincs nélkül ott pedig reggel sem semmi soha szeretnék szia tegnap tudok tudom ' +
			'után vagy vagyok vagyunk valami van vannak volt voltak én ő ők',
		'áéíóöúüőű',
		'sz zs gy cs -ság -ség -ban -nak -nek -unk -ünk'
	],
	[
		'tr',
		'ama ben benim bir biz bizim bu bugün bunu burada da daha de değil diye dün en evet gibi ' +
			'güzel hayır her hiç ile ise iyi için kadar ki kim lütfen merhaba mi mu mü mı nasıl ne ' +
			'nerede o olan olarak olduğu onu sağol sen senin siz sonra tamam teşekkür teşekkürler ' +
			'var ve veya ya yarın yok zaman çok çünkü önce şey şimdi şu',
		'âçîöûüğış',
		'iyor ıyor uyor üyor -mak -mek -lik'
	],
	[
		'vi',
		'anh biết bạn cho chào chúng các cái còn có cũng cảm của dạ em gì hay hôm hơn khi không ' +
			'là làm lại lắm muốn mình một nay ngày người nhé nhưng những nào này nó nói nữa quá ra ' +
			'rất rồi sao sẽ ta thì thích trong tôi tốt từ và vâng về với xin đi đâu đây đã đó được ' +
			'để ơn ạ ở',
		'àáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ',
		'ngh -nh'
	],
	[
		'id',
		'ada adalah akan aku apa atau bagaimana bagus bahwa baik banyak baru belum besok bilang ' +
			'bisa dalam dan dapat dari dengan di dia dimana dulu halo hanya hari harus ingin ini itu ' +
			'jadi jika juga kalau kami kamu kapan karena kasih ke kemarin kenapa kita lagi lebih ' +
			'maaf makan malam mana masih mau mengapa mereka nanti nggak oleh pada pagi pergi punya ' +
			'saja sama sana sangat saya sebagai sebelum sedang sejak sekali sekarang selalu selamat ' +
			'semua seperti sesuatu setelah siapa sini sudah tak tapi telah terima tersebut tidak ' +
			'tolong untuk ya yang',
		'',
		'meng- meny- peng- pem- -kan -nya'
	]
];

const CYRILLIC_LANGUAGES: ReadonlyArray<LanguageData> = [
	[
		'ru',
		'а без будет бы был была были было в вам вас все всегда всё вчера вы где да для до его ' +
			'если есть ещё её же за завтра здесь знаю и иду из или им их к как когда кто ли мне могу ' +
			'может мой моя мы на надо наш не нет никогда ничего но нужно о он она они от очень перед ' +
			'по пожалуйста после потом потому почему при привет с сегодня сейчас сколько спасибо так ' +
			'также твой то тоже только ты у уже хорошо хочу что чтобы это я',
		'ъыэё',
		''
	],
	[
		'uk',
		'або але без був будь була були було бути в вже ви вона вони все вчора від він де для до ' +
			'добре дуже дякую же з за завжди завтра зараз знаю й йду йому коли ласка ми може можу ' +
			'моя мій на наш не ну ні ніколи нічого перед по потрібно потім привіт про після скільки ' +
			'сьогодні та так також твій те теж ти то тому треба тут у хочу хто це цей чому ще що щоб ' +
			'щось я як які є і із їх її',
		'єіїґ',
		'-ння'
	],
	[
		'bg',
		'аз ако бе без беше бил била било благодаря в вече винаги все всички всичко вчера да ' +
			'днес до добре е за защо защото здравей знам и или им има искам казва как като кога ' +
			'когато което които кой който колко която къде ли ме ми много мога може мой моля моя на ' +
			'наш нашия не нещо никога нищо но няма от отивам още по после правя преди при с са се ' +
			'сега си след сме със също та така твой те ти то това този той трябва тук тя утре че ще',
		'ъ',
		'-ът -ата -ото -ята'
	],
	[
		'sr',
		'а ако без била било био важи већ ви га где да данас до добро желим за зато зашто здраво ' +
			'знам и идем из или им има ка кад када каже као ко колико ли ми могу може молим мој моја ' +
			'на наш не него нема нешто никад ништа овде од он она они по после пре радим са сада све ' +
			'сви се си смо су сутра та тако такође твој ти то треба у увек хвала хоћу што ја је још ' +
			'јуче ће',
		'ђјљњћџ',
		''
	]
];

const ARABIC_LANGUAGES: ReadonlyArray<LanguageData> = [
	[
		'ar',
		'أريد أعرف أمس أن أنا أنت أو أين إلى إن الآن التي الذي الذين اليوم بعد بين ثم جدا جيد ' +
			'حتى دائما ذلك شكرا على عن عند غدا غير فضلك في قبل قد كان كانت كل كيف لا لم لماذا لن ما ' +
			'ماذا متى مرحبا مع من نحن نعم هذا هذه هل هم هنا هو هي و يمكن',
		'أإةكىي',
		'ال-'
	],
	[
		'fa',
		'آن آنها است الان اما امروز او اگر این اینجا با باید بر برای بله به بود تا تو خوب خود ' +
			'خیلی دارم در دیروز را سلام شد شده شما فردا لطفا ما ممنون من می نه نیست ها هر هست هم همه ' +
			'همیشه هیچ و چرا چطور چه چیزی کجا کرد کند که یا یعنی یک',
		'پچژکگی',
		''
	],
	[
		'ur',
		'آج آپ اب ابھی اس ان اور اپنے اچھا ایک بعد بھی بہت تو تھا تھی تھے جب جو جی سب سلام سے ' +
			'شکریہ لیے میرا میری میں نہیں نے وہ پر پہلے کا کب کبھی کر کو کون کچھ کہ کہاں کی کیا کیوں ' +
			'کے گیا ہاں ہم ہمارا ہمیشہ ہو ہیں ہے یہ یہاں',
		'ٹپچڈڑژکگںھہیے',
		''
	]
];

// Where a sentence ends. Each sentence is judged on its own, so one text can hold several
// languages of the same script.
const TERMINATORS: ReadonlySet<string> = new Set(Array.from('.!?\n\r…。！．？｡؟۔'));

// The score a sentence needs before its own words decide its language. One word shared by
// several languages, such as `a` or `die`, is not enough to move a sentence out of the language
// the rest of the text is in.
const MIN_SCORE = 2;

const GROUPS: ReadonlyArray<readonly [string, ReadonlyArray<LanguageData>]> = [
	[LATIN, LATIN_LANGUAGES],
	[CYRILLIC, CYRILLIC_LANGUAGES],
	[ARABIC, ARABIC_LANGUAGES]
];

// Compiled once. Building a `RegExp` inside a function recompiles the pattern on every call.
const LETTER = /\p{L}/u;
const MARK = /\p{M}/u;

let tables: Map<string, LanguageTable> | undefined;

const readTable = (languages: ReadonlyArray<LanguageData>): LanguageTable => {
	const endings = new Map<string, number[]>();
	const beginnings = new Map<string, number[]>();
	const sequences = new Map<string, number[]>();
	let longest = 0;

	for (let index = 0, languagesLength = languages.length; index < languagesLength; index += 1) {
		for (const shape of languages[index][3].split(' ')) {
			if (shape === '') {
				continue;
			}

			let target = sequences;
			let text = shape;

			if (shape.startsWith('-')) {
				target = endings;
				text = shape.slice(1);
			} else if (shape.endsWith('-')) {
				target = beginnings;
				text = shape.slice(0, -1);
			}

			const owners = target.get(text);

			if (owners === undefined) {
				target.set(text, [index]);
			} else {
				owners.push(index);
			}

			longest = Math.max(longest, text.length);
		}
	}

	return {
		codes: languages.map(([code]) => code),
		words: languages.map(([, words]) => new Set(words.split(' '))),
		letters: languages.map(([, , letters]) => new Set(Array.from(letters))),
		marked: new Set(languages.flatMap(([, , letters]) => Array.from(letters))),
		endings,
		beginnings,
		sequences,
		longest
	};
};

// Reading the lists into lookups is only worth doing once, and only for callers that actually
// reach `detectLanguages`, so it is done on first use and reused.
const getTables = (): Map<string, LanguageTable> => {
	if (tables === undefined) {
		tables = new Map(GROUPS.map(([group, languages]) => [group, readTable(languages)]));
	}

	return tables;
};

// The script a code point belongs to, or `undefined` when no range holds it.
const scriptOf = (code: number): string | undefined => {
	let low = 0;
	let high = RANGES.length - 1;

	while (low <= high) {
		const middle = (low + high) >> 1;
		const [first, last, script] = RANGES[middle];

		if (code < first) {
			high = middle - 1;
		} else if (code > last) {
			low = middle + 1;
		} else {
			return script;
		}
	}

	return undefined;
};

const isLetter = (char: string): boolean => {
	const code = char.codePointAt(0) as number;

	if (code < 0x80) {
		return (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a);
	}

	return LETTER.test(char);
};

const isMark = (char: string): boolean => MARK.test(char);

// `İ` is the one letter whose lowercase is two characters, an `i` and a combining dot, and the
// packages do not all produce it, so it is mapped here.
const toLower = (char: string): string => (char === 'İ' ? 'i' : char.toLowerCase());

const addOwners = (found: Set<number>, owners: number[] | undefined): void => {
	if (owners !== undefined) {
		for (const owner of owners) {
			found.add(owner);
		}
	}
};

// The languages whose word shapes `word` has. An ending or a beginning has to be shorter than
// the word, so a word is never only its own ending. Every letter of a shared script is in the
// Basic Multilingual Plane, so slicing by UTF-16 unit here slices by character, as Python does.
const shapesOf = (table: LanguageTable, word: string): Set<number> => {
	const found = new Set<number>();
	const length = word.length;

	for (let size = 1, last = Math.min(table.longest, length - 1); size <= last; size += 1) {
		addOwners(found, table.endings.get(word.slice(length - size)));
		addOwners(found, table.beginnings.get(word.slice(0, size)));
	}

	for (let start = 0; start < length; start += 1) {
		for (let size = 1, last = Math.min(table.longest, length - start); size <= last; size += 1) {
			addOwners(found, table.sequences.get(word.slice(start, start + size)));
		}
	}

	return found;
};

// Adds what `word` says about each language of its script to `scores`.
const scoreWord = (table: LanguageTable, word: string, scores: number[]): void => {
	const letters: string[] = [];
	const shapes = shapesOf(table, word);

	for (const char of word) {
		if (table.marked.has(char) && !letters.includes(char)) {
			letters.push(char);
		}
	}

	for (let i = 0, codesLength = table.codes.length; i < codesLength; i += 1) {
		const own = table.letters[i];

		if (table.words[i].has(word)) {
			scores[i] += 1;
		}

		// A word written with letters only some of the languages use counts for each of them
		// that has every one of those letters.
		if (letters.length > 0 && letters.every((letter) => own.has(letter))) {
			scores[i] += 1;
		}

		if (shapes.has(i)) {
			scores[i] += 1;
		}
	}
};

// The language of a sentence its own words could not decide. A sentence that ties at the
// minimum score or above stays with the languages it tied between. A weaker one takes the
// language the rest of the text was decided to be in, unless nothing was, in which case its own
// best score is all there is to go by. Among the candidates, the one with the most letters
// decided elsewhere wins, and then the one listed first.
const settle = (
	table: LanguageTable,
	scores: number[],
	decided: ReadonlyMap<string, number>
): string => {
	const top = Math.max(...scores);
	const anyDecided = table.codes.some((code) => (decided.get(code) ?? 0) > 0);
	const narrow = top >= MIN_SCORE || !anyDecided;
	let best = '';
	let bestCount = -1;

	for (let i = 0, codesLength = table.codes.length; i < codesLength; i += 1) {
		if (narrow && scores[i] !== top) {
			continue;
		}

		const code = table.codes[i];
		const count = decided.get(code) ?? 0;

		if (count > bestCount) {
			best = code;
			bestCount = count;
		}
	}

	return best;
};

export function detectLanguages(str: string): DetectedLanguage[] {
	if (!str) {
		return [];
	}

	// Compose accents first, so that a decomposed `é` (`e` plus U+0301) matches the words.
	const text = str.normalize('NFC');
	const groups = getTables();
	const counts = new Map<string, number>();
	const firsts = new Map<string, number>();
	// [group, letters, first index, scores] of the sentences their own words did not decide.
	const pending: [string, number, number, number[]][] = [];
	const sentenceCounts = new Map<string, number>();
	const sentenceFirsts = new Map<string, number>();
	const sentenceScores = new Map<string, number[]>();
	const word: string[] = [];
	let wordGroup = '';
	let index = 0;

	const add = (language: string, count: number, first: number): void => {
		counts.set(language, (counts.get(language) ?? 0) + count);
		firsts.set(language, Math.min(firsts.get(language) ?? first, first));
	};

	const endWord = (): void => {
		if (word.length === 0) {
			return;
		}

		const table = groups.get(wordGroup) as LanguageTable;
		let scores = sentenceScores.get(wordGroup);

		if (scores === undefined) {
			scores = new Array<number>(table.codes.length).fill(0);
			sentenceScores.set(wordGroup, scores);
		}

		scoreWord(table, word.join(''), scores);
		word.length = 0;
	};

	const closeSentence = (): void => {
		endWord();

		for (const [key, count] of sentenceCounts) {
			const first = sentenceFirsts.get(key) as number;
			const table = groups.get(key);

			if (key === HAN) {
				// Han characters are kanji in a sentence with kana and hanja in a sentence with
				// Hangul. Anywhere else they are read as Chinese.
				if (sentenceCounts.has('ja')) {
					add('ja', count, first);
				} else if (sentenceCounts.has('ko')) {
					add('ko', count, first);
				} else {
					add('zh', count, first);
				}
			} else if (table !== undefined) {
				const scores = sentenceScores.get(key) ?? new Array<number>(table.codes.length).fill(0);
				const top = Math.max(...scores);
				const winners = scores.filter((score) => score === top).length;

				if (top >= MIN_SCORE && winners === 1) {
					add(table.codes[scores.indexOf(top)], count, first);
				} else {
					pending.push([key, count, first, scores]);
				}
			} else {
				add(key, count, first);
			}
		}

		sentenceCounts.clear();
		sentenceFirsts.clear();
		sentenceScores.clear();
	};

	// Walk code points. Indexing a JavaScript string walks UTF-16 units, which would cut a
	// surrogate pair in half and count positions differently from the Dart and Python packages.
	for (const char of text) {
		const at = index;

		index += 1;

		if (TERMINATORS.has(char)) {
			closeSentence();
			continue;
		}

		if (!isLetter(char)) {
			// A combining mark belongs to the letter in front of it and does not end a word.
			if (!isMark(char)) {
				endWord();
			}

			continue;
		}

		let script = scriptOf(char.codePointAt(0) as number);

		if (script === undefined) {
			endWord();
			continue;
		}

		if (script === KANA) {
			script = 'ja';
		}

		sentenceCounts.set(script, (sentenceCounts.get(script) ?? 0) + 1);

		if (!sentenceFirsts.has(script)) {
			sentenceFirsts.set(script, at);
		}

		if (groups.has(script)) {
			if (script !== wordGroup) {
				endWord();
				wordGroup = script;
			}

			word.push(toLower(char));
		} else {
			endWord();
		}
	}

	closeSentence();

	// Every undecided sentence is settled against the same counts, the ones the decided
	// sentences produced, so the order they are settled in changes nothing.
	const decided = new Map(counts);

	for (const [group, count, first, scores] of pending) {
		add(settle(groups.get(group) as LanguageTable, scores, decided), count, first);
	}

	let total = 0;

	for (const count of counts.values()) {
		total += count;
	}

	if (total === 0) {
		return [];
	}

	return [...counts.keys()]
		.sort(
			(a, b) =>
				(counts.get(b) as number) - (counts.get(a) as number) ||
				(firsts.get(a) as number) - (firsts.get(b) as number)
		)
		.map((language) => ({ language, ratio: (counts.get(language) as number) / total }));
}
