const empty = (data) => {
  if (!data) return true;
  switch (typeof data) {
    default:
      return false;
    case 'string':
      return data.length < 1;
    case 'object':
      if (Array.isArray(data)) {
        return data.length < 1;
      }
      return Object.keys(data).length < 1;
  }
};

const isUrl = (url, withProtocol = false, strict = false) => {
  if (!url || typeof url !== 'string') return false;
  const protocol = (withProtocol && url.indexOf('://') === -1) ? 'https://' : '';
  const temp = () => null;
  if (strict && url.indexOf('.') === -1) return false;
  try {
    temp(new URL(`${protocol}${url}`));
  } catch (e) {
    return false;
  }
  return true;
};

const contains = (str, search) => {
  if (!str || !search || (typeof str !== 'string' && typeof str !== 'object')
      || (typeof str === 'object' && !Array.isArray(str))) return false;
  if (typeof search === 'string') return str.indexOf(search) !== -1;
  const searchLength = search.length;
  for (let i = 0; i < searchLength; i += 1) {
    if (str.indexOf(search[i]) !== -1) return true;
  }
  return false;
};

const is2dArray = (arr) => {
  if (!arr || typeof arr !== 'object' || !Array.isArray(arr)) return false;
  return arr.filter(Array.isArray).length > 0;
};

const between = (number, range, inclusive = false) => {
  if (!number) throw new Error('Need a value to compare with range');
  if (!range || typeof range !== 'object' || range.length !== 2) throw new Error('You should use range like this: [min, max]');
  const minM = Math.min.apply(Math, [range[0], range[1]]);
  const maxM = Math.max.apply(Math, [range[0], range[1]]);
  return inclusive ? number >= minM && number <= maxM : number > minM && number < maxM;
};

const length = (data) => {
  if (!data || typeof data === 'undefined') return 0;
  switch (typeof data) {
    default:
    case 'string':
      return data.length;
    case 'object':
      return Array.isArray(data) ? data.length : Object.keys(data).length;
    case 'number':
    case 'bigint':
      return data.toString().length;
    case 'boolean':
      return data ? 4 : 5;
    case 'function':
      return length(data());
  }
};

const isBotAgent = (userAgent) => {
  if (!userAgent || typeof userAgent !== 'string' || userAgent.length < 1) return false;
  const botPattern = '(bot|naverbot|google|Googlebot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)';
  return new RegExp(botPattern, 'i').test(userAgent);
};

module.exports = {
  empty,
  isUrl,
  contains,
  is2dArray,
  between,
  length,
  isBotAgent,
};
