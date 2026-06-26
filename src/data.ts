// Nav type
export type navLinkType = {
  label: string;
  url: string;
};

// Nav
const navLinks = [
  {
    label: 'Services',
    url: '#services',
  },
  {
    label: 'Projects',
    url: '#works',
  },
  {
    label: 'About',
    url: '#about-me-section',
  },
  {
    label: 'Testimonials',
    url: '#testimonials-section',
  },
  {
    label: 'Contact',
    url: '#contact-section',
  },
];
const navbarLinks = [
  {
    label: 'Home',
    url: '#app',
  },
  ...navLinks,
];

const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/DavidAkerele',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/david-akerele-38837623a/',
  },
  {
    label: 'X',
    url: 'https://x.com/DdAkelz',
  },
];

const resourceLinks = [
  {
    label: 'Portfolio',
    url: 'https://akereledavid.vercel.app',
  },
];

const heroText =
  'A software engineer & frontend architect, building high-performance digital experiences and AI-powered solutions.';

const locationPlace = `53°28'54.5"N 2°14'22.2"W`;
const locationCountry = 'UK, Manchester';

// cal.com
const dataCalNamespace = '30min';
const dataCalLink = 'davidakerele/30min';
const dataCalConfig =
  '{"layout":"month_view", "theme": "dark", "brand": "#8C8C73"}';

export {
  socialLinks,
  resourceLinks,
  heroText,
  locationPlace,
  locationCountry,
  navLinks,
  navbarLinks,
  dataCalNamespace,
  dataCalLink,
  dataCalConfig,
};
