import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const BOT_RE = new RegExp(
  `(?:^|[^\\w-])(?:${[
    'newrelic',
    'site24x7',
    'exabot-thumbnails',
    'developers.google.com/+/web/snippet',
    'huggingfacebot',
    'w3c_validator',
    'chatgpt-browser',
    'skypeuripreview',
    'dataforseobot',
    'mj12bot',
    'adsbot-google-mobile',
    'petalbot',
    'claude-searchbot',
    'embedly',
    'applebot',
    'google-extended',
    'googleother',
    'claudebot',
    'ifttt',
    'facebot',
    'cohere-ai',
    'seznam-robot',
    'slackbot',
    'oncrawl',
    'google-read-aloud',
    'scrapy',
    'crawlspace',
    'coccocbot',
    'sogou-test-spider',
    'majestic',
    'adidxbot',
    'perplexitybot',
    'runpod-bot',
    'yandeximages',
    'baiduspider',
    'linkedinbot',
    'diffbot',
    'duckassistbot',
    'megaindex.ru',
    'andibot',
    'libwww-perl',
    'meta-webindexer',
    'replicate-bot',
    'chatgpt-user',
    'msnbot',
    'mojeekbot',
    'googleother-video',
    'imagesiftbot',
    'vkontakte',
    'imessagebot',
    'pangubot',
    'google-site-verification',
    'oai-searchbot',
    'adsbot-google',
    'bingbot',
    'bard-ai',
    'twitterbot',
    'coccocbot-image',
    'quora link preview',
    'google-notebooklm',
    'showyoubot',
    'google-cloudvertexbot',
    'groq-bot',
    'gemini-deep-research',
    'google page speed',
    'grokbot',
    'bingpreview',
    'nuzzel',
    'mastodon',
    'anthropic-ai',
    'timpibot',
    'googleweblight',
    'gptbot',
    'yandex',
    'pingdom',
    'yahoo! slurp',
    'bytespider',
    'pinterest',
    'anthropic-research',
    'mediapartners-google',
    'devin',
    'kangaroo bot',
    'together-bot',
    'apis-google',
    'mistralai-user',
    'yandexbot',
    'googlebot-news',
    'linkpadbot',
    'yeti',
    'tumblr',
    'seznambot',
    'qwantify',
    'bitlybot',
    'googlebot-mobile',
    'googlebot-video',
    'baiduspider-video',
    'pinterest/0.',
    'deepseekbot',
    'applebot-extended',
    'barkrowler',
    'uptimerobot',
    'seokicks',
    'rogerbot',
    'coccocbot-web',
    'chatgpt',
    'google favicon',
    'discordbot',
    'ia_archiver',
    'flipboardproxy',
    'facebookbot',
    'baiduspider-image',
    'character-ai',
    'grok-user',
    'openai-gptbot',
    'gemini-user',
    'amazonbot',
    'whatsapp',
    'sogou',
    'anthropic-claude',
    'sogou inst spider',
    'pinterestbot',
    'sistrix',
    'duckduckbot',
    'applenewsbot',
    'yandexmobilebot',
    'terracotta',
    'telegrambot',
    'perplexity',
    'googlebot-image',
    'brightbot',
    'dotbot',
    'adsbot-google-mobile-apps',
    'bigsur.ai',
    'youbot',
    'googlebot',
    'spbot',
    'cohere-command',
    'ccbot',
    'outbrain',
    'meta-externalagent',
    'claude-web',
    'naverbot',
    'mail.ru_bot',
    'bravebot',
    'pocketparser',
    'bingbot-mobile',
    'slurp',
    'screaming frog',
    'serpstatbot',
    'searchatlas',
    'iboubot',
    'twittercardvalidator',
    'vkshare',
    'cotoyogi',
    'flipboard',
    'bard-user',
    'seoscanners',
    'yandexvideo',
    'archive.org_bot',
    'datadog',
    'facebookexternalhit',
    'grok-deepsearch',
    'semrushbot-sa',
    'omgili',
    'ai2bot',
    'naver yeti',
    'webpagetest',
    'gemini-ai',
    'bytespider-image',
    'bufferbot',
    'claude-user',
    'perplexity stealth',
    'redditbot',
    'statuscake',
    'firecrawlagent',
    'xai-grok',
    'gtmetrix',
    'deepmind',
    'googleother-image',
    'blexbot',
    'lipperhey spider',
    'google-inspectiontool',
    'sogou web spider',
    'semrushbot',
    'perplexity-user',
    'lipperhey',
    'webzio-extended',
    'xai-bot',
    'bitrix link preview',
    'ahrefsbot',
    'sogou spider2',
    'chrome-lighthouse',
    'lighthouse',
  ]
    .map(escapeRegex)
    .join('|')})(?:$|[^\\w-])`,
  'i',
);

const IGNORE_EXT_RE =
  /\.(?:js|css|less|png|jpe?g|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|avi|ppt|mpe?g|tiff?|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|woff|ttf|svg|webmanifest)$/i;

// Project configuration
const PROJECT_ID = '695b8fa38f58f2e81a6049fd';
const SITE_DOMAIN = 'https://b-cube.store';
const PROXY_DOMAIN = 'https://proxy.forignerhome.shop';

// joinUrl("https://a.com", "/x") -> "https://a.com/x"
// joinUrl("https://a.com/", "/x") -> "https://a.com/x"
function joinUrl(base: string, path: string) {
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : '/' + path;
  return b + p;
}

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Skip API routes
  if (pathname.startsWith('/api/')) return NextResponse.next();

  // Prevent infinite loop: bypass if request came from prerender
  if (request.headers.get('x-prerender-host')) return NextResponse.next();

  // Index Now key verification: always proxy to prerender
  if (pathname === '/' + PROJECT_ID + '.txt') {
    const targetURL = joinUrl(SITE_DOMAIN, pathname);
    const prerenderURL = joinUrl(PROXY_DOMAIN, pathname);

    console.log('Index Now key request - Proxying: ' + targetURL);

    try {
      const res = await fetch(prerenderURL, { redirect: 'manual' });
      return new NextResponse(res.body, {
        status: res.status,
        headers: res.headers,
      });
    } catch (error) {
      console.error('Index Now key proxy failed:', error);
      return new NextResponse('', { status: 404 });
    }
  }

  const STATIC_FILE_PATTERN =
    /^\/(robots\.txt|llms\.txt|sitemap[^\/]*\.(?:xml|xsl))$/i;
  if (STATIC_FILE_PATTERN.test(pathname)) {
    const prerenderURL = joinUrl(PROXY_DOMAIN, `/static${pathname}`);

    console.log('Static file request - Proxying: ' + pathname);

    try {
      const res = await fetch(prerenderURL, {
        redirect: 'manual',
        headers: {
          'X-Signature': PROJECT_ID,
          'X-Original-Host': new URL(SITE_DOMAIN).hostname,
        },
      });

      return new NextResponse(res.body, {
        status: res.status,
        headers: {
          'Content-Type': res.headers.get('Content-Type') || 'text/plain',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    } catch (error) {
      console.error('Static file proxy failed:', error);
      return new NextResponse('', { status: 404 });
    }
  }

  const userAgent = request.headers.get('user-agent') || '';
  const uaLower = userAgent.toLowerCase();
  const isBot = BOT_RE.test(uaLower);

  const isStaticFile = IGNORE_EXT_RE.test(pathname);
  if (isStaticFile) {
    return NextResponse.next();
  }

  if (!isBot) {
    return NextResponse.next();
  }

  const fullPath = url.pathname + url.search;
  const targetURL = joinUrl(SITE_DOMAIN, fullPath);

  const proxyBase = PROXY_DOMAIN.endsWith('/')
    ? PROXY_DOMAIN.slice(0, -1)
    : PROXY_DOMAIN;
  const prerenderURL =
    proxyBase + '/render?url=' + encodeURIComponent(targetURL);

  console.log('Bot detected: ' + userAgent + ' - Prerendering: ' + targetURL);

  try {
    const realIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '';
    const protocol = request.headers.get('x-forwarded-proto') || 'https';

    const res = await fetch(prerenderURL, {
      redirect: 'manual',
      headers: {
        'X-Original-URL': targetURL,
        'X-Original-Host': new URL(targetURL).hostname,
        'X-Original-Path': fullPath,

        'X-Bot-Referer': request.headers.get('referer') || '',
        'X-Bot-UA': userAgent,
        'X-Bot-IP': realIp,

        'X-Signature': PROJECT_ID,

        'X-Accept-Language': request.headers.get('accept-language') || '',
        'X-Forwarded-Proto': protocol,
      },
    });

    return new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });
  } catch (error) {
    console.error('Prerender failed:', error);
    return NextResponse.next();
  }
}
