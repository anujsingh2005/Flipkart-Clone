const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const createSvgDataUrl = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const getPalette = (label) => {
  const value = label.toLowerCase();

  if (/(book|monk|library|educated|rich dad|sapiens|dune|atomic)/.test(value)) {
    return { bg: '#f8f1ff', primary: '#7c3aed', secondary: '#c4b5fd', accent: '#ede9fe' };
  }

  if (/(shoe|running|gym|dumbbell|football|badminton|cricket|yoga)/.test(value)) {
    return { bg: '#eefbf3', primary: '#15803d', secondary: '#86efac', accent: '#dcfce7' };
  }

  if (/(jacket|blazer|polo|trouser|belt|jeans|shirt|fashion)/.test(value)) {
    return { bg: '#fff4eb', primary: '#c2410c', secondary: '#fdba74', accent: '#ffedd5' };
  }

  if (/(microwave|mixer|bedsheet|dining|knife|cookware|coffee|kitchen|home)/.test(value)) {
    return { bg: '#fff7ed', primary: '#9a3412', secondary: '#fdba74', accent: '#ffedd5' };
  }

  if (/(lego|drone|action|board|puzzle|toy|chess)/.test(value)) {
    return { bg: '#fefce8', primary: '#a16207', secondary: '#fde047', accent: '#fef3c7' };
  }

  return { bg: '#eff6ff', primary: '#1d4ed8', secondary: '#93c5fd', accent: '#dbeafe' };
};

const getIconType = (label) => {
  const value = label.toLowerCase();

  if (/(macbook|laptop)/.test(value)) return 'laptop';
  if (/(airpod|headphone|earbud)/.test(value)) return 'earbuds';
  if (/(gopro|camera)/.test(value)) return 'camera';
  if (/(tv)/.test(value)) return 'tv';
  if (/(cable)/.test(value)) return 'cable';
  if (/(blazer|jacket|polo|shirt)/.test(value)) return 'topwear';
  if (/(trouser|jeans)/.test(value)) return 'pants';
  if (/(belt)/.test(value)) return 'belt';
  if (/(shoe|running)/.test(value)) return 'shoe';
  if (/(microwave)/.test(value)) return 'microwave';
  if (/(mixer)/.test(value)) return 'mixer';
  if (/(bedsheet)/.test(value)) return 'bedsheet';
  if (/(dining)/.test(value)) return 'table';
  if (/(knife)/.test(value)) return 'knife';
  if (/(dumbbell)/.test(value)) return 'dumbbell';
  if (/(badminton)/.test(value)) return 'racket';
  if (/(cricket)/.test(value)) return 'bat';
  if (/(gym bag)/.test(value)) return 'bag';
  if (/(football)/.test(value)) return 'ball';
  if (/(book|monk|library|educated|rich dad|sapiens|dune|atomic)/.test(value)) return 'book';
  if (/(lego)/.test(value)) return 'blocks';
  if (/(drone)/.test(value)) return 'drone';
  if (/(action)/.test(value)) return 'figure';
  if (/(board)/.test(value)) return 'board';
  if (/(puzzle)/.test(value)) return 'puzzle';
  return 'box';
};

const renderIcon = (iconType, palette) => {
  const { primary, secondary, accent } = palette;

  switch (iconType) {
    case 'laptop':
      return `<rect x="70" y="64" width="180" height="110" rx="10" fill="${primary}"/><rect x="82" y="76" width="156" height="86" rx="6" fill="${accent}"/><rect x="48" y="182" width="224" height="16" rx="8" fill="${secondary}"/>`;
    case 'earbuds':
      return `<circle cx="115" cy="102" r="34" fill="${secondary}"/><circle cx="205" cy="102" r="34" fill="${secondary}"/><rect x="104" y="133" width="22" height="62" rx="11" fill="${primary}"/><rect x="194" y="133" width="22" height="62" rx="11" fill="${primary}"/>`;
    case 'camera':
      return `<rect x="78" y="88" width="164" height="96" rx="18" fill="${primary}"/><circle cx="160" cy="136" r="34" fill="${accent}"/><circle cx="160" cy="136" r="18" fill="${secondary}"/><rect x="102" y="70" width="48" height="22" rx="8" fill="${secondary}"/>`;
    case 'tv':
      return `<rect x="60" y="62" width="200" height="120" rx="12" fill="${primary}"/><rect x="74" y="76" width="172" height="92" rx="8" fill="${accent}"/><rect x="146" y="182" width="28" height="20" rx="6" fill="${secondary}"/><rect x="118" y="202" width="84" height="10" rx="5" fill="${secondary}"/>`;
    case 'cable':
      return `<path d="M92 104c0-20 18-36 40-36h28c22 0 40 16 40 36v40c0 20-18 36-40 36h-8" fill="none" stroke="${primary}" stroke-width="20" stroke-linecap="round"/><rect x="180" y="158" width="36" height="24" rx="8" fill="${secondary}"/><rect x="92" y="86" width="20" height="30" rx="8" fill="${secondary}"/>`;
    case 'topwear':
      return `<path d="M112 68l48 20 48-20 36 42-24 26-24-16v92H124v-92l-24 16-24-26z" fill="${primary}"/><path d="M136 88h48v30h-48z" fill="${accent}"/>`;
    case 'pants':
      return `<path d="M112 64h96l-12 152h-32l-14-66-14 66h-32z" fill="${primary}"/><path d="M144 64h32v52h-32z" fill="${accent}" opacity="0.65"/>`;
    case 'belt':
      return `<rect x="62" y="116" width="196" height="28" rx="14" fill="${primary}"/><rect x="82" y="104" width="44" height="52" rx="10" fill="${secondary}"/><rect x="92" y="114" width="24" height="32" rx="6" fill="${accent}"/>`;
    case 'shoe':
      return `<path d="M82 152c18 0 30-22 48-22 18 0 34 34 58 34h44v26H76c-8 0-14-6-14-14v-10c0-8 6-14 14-14z" fill="${primary}"/><path d="M178 164h54" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`;
    case 'microwave':
      return `<rect x="66" y="76" width="188" height="116" rx="16" fill="${primary}"/><rect x="84" y="94" width="108" height="80" rx="10" fill="${accent}"/><circle cx="218" cy="108" r="10" fill="${secondary}"/><circle cx="218" cy="136" r="10" fill="${secondary}"/><circle cx="218" cy="164" r="10" fill="${secondary}"/>`;
    case 'mixer':
      return `<path d="M118 80h84l-10 44h-64z" fill="${secondary}"/><rect x="132" y="124" width="56" height="58" rx="14" fill="${primary}"/><rect x="122" y="182" width="76" height="26" rx="10" fill="${accent}"/>`;
    case 'bedsheet':
      return `<rect x="70" y="98" width="180" height="86" rx="20" fill="${primary}"/><rect x="86" y="112" width="72" height="34" rx="12" fill="${accent}"/><path d="M70 148c22-12 42-12 62 0s40 12 60 0 38-12 58 0v36H70z" fill="${secondary}"/>`;
    case 'table':
      return `<rect x="86" y="90" width="148" height="26" rx="13" fill="${primary}"/><rect x="98" y="116" width="16" height="84" rx="8" fill="${secondary}"/><rect x="206" y="116" width="16" height="84" rx="8" fill="${secondary}"/><rect x="60" y="132" width="28" height="58" rx="10" fill="${accent}"/><rect x="232" y="132" width="28" height="58" rx="10" fill="${accent}"/>`;
    case 'knife':
      return `<path d="M86 162l58-58 36 36-58 58c-10 10-26 10-36 0s-10-26 0-36z" fill="${primary}"/><path d="M180 96l54 54-24 24-54-54z" fill="${secondary}"/>`;
    case 'dumbbell':
      return `<rect x="116" y="126" width="88" height="20" rx="10" fill="${primary}"/><rect x="84" y="102" width="18" height="68" rx="8" fill="${secondary}"/><rect x="102" y="114" width="12" height="44" rx="6" fill="${secondary}"/><rect x="206" y="102" width="18" height="68" rx="8" fill="${secondary}"/><rect x="194" y="114" width="12" height="44" rx="6" fill="${secondary}"/>`;
    case 'racket':
      return `<ellipse cx="142" cy="104" rx="40" ry="50" fill="none" stroke="${primary}" stroke-width="12"/><path d="M170 140l42 42" stroke="${secondary}" stroke-width="12" stroke-linecap="round"/><path d="M118 86h48M118 104h48M118 122h48M132 66v76M152 66v76" stroke="${accent}" stroke-width="4"/>`;
    case 'bat':
      return `<path d="M118 70c28 8 64 40 84 74l-42 18c-10-30-32-60-56-74z" fill="${primary}"/><rect x="102" y="152" width="20" height="58" rx="10" fill="${secondary}"/>`;
    case 'bag':
      return `<rect x="92" y="92" width="136" height="108" rx="20" fill="${primary}"/><path d="M122 92c0-24 16-40 38-40s38 16 38 40" fill="none" stroke="${secondary}" stroke-width="12" stroke-linecap="round"/><rect x="118" y="122" width="84" height="14" rx="7" fill="${accent}"/>`;
    case 'ball':
      return `<circle cx="160" cy="132" r="58" fill="${primary}"/><path d="M160 86l18 12-6 20h-24l-6-20zM124 112l18 12-6 20h-24l-6-20zM196 112l18 12-6 20h-24l-6-20z" fill="${accent}"/>`;
    case 'book':
      return `<rect x="88" y="58" width="144" height="154" rx="16" fill="${primary}"/><rect x="106" y="76" width="108" height="22" rx="8" fill="${secondary}"/><rect x="106" y="112" width="88" height="12" rx="6" fill="${accent}"/><rect x="106" y="134" width="92" height="12" rx="6" fill="${accent}"/><rect x="106" y="156" width="64" height="12" rx="6" fill="${accent}"/>`;
    case 'blocks':
      return `<rect x="92" y="120" width="54" height="54" rx="10" fill="${primary}"/><rect x="150" y="92" width="78" height="82" rx="12" fill="${secondary}"/><circle cx="112" cy="114" r="8" fill="${accent}"/><circle cx="132" cy="114" r="8" fill="${accent}"/><circle cx="172" cy="84" r="8" fill="${accent}"/><circle cx="196" cy="84" r="8" fill="${accent}"/>`;
    case 'drone':
      return `<rect x="128" y="116" width="64" height="32" rx="12" fill="${primary}"/><circle cx="104" cy="100" r="20" fill="${secondary}"/><circle cx="216" cy="100" r="20" fill="${secondary}"/><circle cx="104" cy="164" r="20" fill="${secondary}"/><circle cx="216" cy="164" r="20" fill="${secondary}"/><path d="M128 122l-18-18M192 122l18-18M128 142l-18 18M192 142l18 18" stroke="${primary}" stroke-width="10" stroke-linecap="round"/>`;
    case 'figure':
      return `<circle cx="160" cy="88" r="24" fill="${secondary}"/><rect x="132" y="116" width="56" height="70" rx="18" fill="${primary}"/><rect x="112" y="124" width="18" height="50" rx="9" fill="${accent}"/><rect x="190" y="124" width="18" height="50" rx="9" fill="${accent}"/><rect x="140" y="184" width="16" height="34" rx="8" fill="${accent}"/><rect x="164" y="184" width="16" height="34" rx="8" fill="${accent}"/>`;
    case 'board':
      return `<rect x="86" y="78" width="148" height="148" rx="14" fill="${primary}"/><g stroke="${accent}" stroke-width="4"><path d="M118 92v120"/><path d="M136 92v120"/><path d="M154 92v120"/><path d="M172 92v120"/><path d="M190 92v120"/><path d="M208 92v120"/><path d="M100 110h120"/><path d="M100 128h120"/><path d="M100 146h120"/><path d="M100 164h120"/><path d="M100 182h120"/><path d="M100 200h120"/></g>`;
    case 'puzzle':
      return `<path d="M104 86h48c0 12 8 22 20 22s20-10 20-22h24v48c-12 0-22 8-22 20s10 20 22 20v38H104v-38c12 0 22-8 22-20s-10-20-22-20z" fill="${primary}"/><path d="M160 86v126" stroke="${accent}" stroke-width="8"/><path d="M104 148h112" stroke="${accent}" stroke-width="8"/>`;
    default:
      return `<rect x="86" y="78" width="148" height="124" rx="20" fill="${primary}"/><rect x="110" y="102" width="100" height="18" rx="9" fill="${accent}"/><rect x="110" y="132" width="84" height="18" rx="9" fill="${secondary}"/>`;
  }
};

const extractLabelFromPlaceholderUrl = (url = '') => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get('text')?.replace(/\+/g, ' ') || '';
  } catch (error) {
    return '';
  }
};

const generateProductIllustration = (label = 'Product') => {
  const safeLabel = label.trim() || 'Product';
  const palette = getPalette(safeLabel);
  const iconType = getIconType(safeLabel);
  const iconMarkup = renderIcon(iconType, palette);
  const title = escapeXml(safeLabel);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-label="${title}">
      <rect width="320" height="320" rx="36" fill="${palette.bg}"/>
      <rect x="26" y="26" width="268" height="268" rx="28" fill="${palette.accent}"/>
      ${iconMarkup}
      <rect x="44" y="236" width="232" height="46" rx="18" fill="rgba(255,255,255,0.78)"/>
      <text x="160" y="264" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="${palette.primary}">
        ${title}
      </text>
    </svg>
  `;

  return createSvgDataUrl(svg);
};

export const normalizeProductImages = (images, productName = '') => {
  const parsedImages = Array.isArray(images)
    ? images.filter(Boolean)
    : typeof images === 'string' && images.trim()
      ? (() => {
          try {
            const parsed = JSON.parse(images);
            return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
          } catch (error) {
            console.error('Failed to parse product images:', error);
            return [];
          }
        })()
      : [];

  if (parsedImages.length === 0) {
    return [generateProductIllustration(productName)];
  }

  return parsedImages.map((image) => {
    if (typeof image === 'string' && image.includes('via.placeholder.com')) {
      const placeholderLabel = extractLabelFromPlaceholderUrl(image);
      return generateProductIllustration(productName || placeholderLabel);
    }

    return image;
  });
};

export const getPrimaryProductImage = (images, productName = '') => {
  const normalizedImages = normalizeProductImages(images, productName);
  return normalizedImages[0] || generateProductIllustration(productName);
};
