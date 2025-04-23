import Layout from '../../components/Layout';
import Link from 'next/link';
import styles from '../../styles/Help.module.css';

const helpSections = {
  main: {
    title: 'Help Center',
    content: `
      Welcome to Movie House Help Center. Here you can find answers to common questions and issues.
      Please select a section from the links below.
    `,
  },
  faqs: {
    title: 'Frequently Asked Questions',
    content: `
      # How can I search for movies?
      Use the search bar in the header to search for movies by title or director.

      # How can I filter movies by genre?
      Go to the Movies page and use the filter dropdown to select a genre.

      # Are the movie ratings official?
      Yes, all movie ratings are pulled from official sources.

      # How often is the database updated?
      Our movie database is updated weekly with new releases and information.
    `,
  },
  contact: {
    title: 'Contact Us',
    content: `
      Have questions or feedback? Reach out to us:

      Email: support@moviehouse.com
      Phone: (555) 123-4567
      Hours: Monday-Friday, 9am-5pm EST
    `,
  },
  privacy: {
    title: 'Privacy Policy',
    content: `
      # Privacy Policy

      Last updated: April 2025

      This privacy policy outlines how Movie House collects, uses, and protects your personal information.

      ## Information We Collect
      - Basic account information
      - Viewing history
      - User preferences

      ## How We Use Your Information
      - To personalize your experience
      - To improve our website
      - To send periodic emails

      ## Data Security
      We implement a variety of security measures to maintain the safety of your personal information.
    `,
  },
};

export default function HelpPage({ section, slug }) {
  return (
    <Layout title={`Movie House - ${section.title}`}>
      <div className={styles.helpContainer}>
        <aside className={styles.sidebar}>
          <h3>Help Sections</h3>
          <ul>
            <li>
              <Link href="/help">
                <p className={!slug ? styles.active : ''}>Help Home</p>
              </Link>
            </li>
            <li>
              <Link href="/help/faqs">
                <p className={slug?.[0] === 'faqs' ? styles.active : ''}>FAQs</p>
              </Link>
            </li>
            <li>
              <Link href="/help/contact">
                <p className={slug?.[0] === 'contact' ? styles.active : ''}>Contact Us</p>
              </Link>
            </li>
            <li>
              <Link href="/help/privacy">
                <p className={slug?.[0] === 'privacy' ? styles.active : ''}>Privacy Policy</p>
              </Link>
              
            </li>
          </ul>
        </aside>
        
        <main className={styles.content}>
          <h1>{section.title}</h1>
          <div className={styles.sectionContent}>
            {section.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const slug = params?.slug || [];
  const sectionKey = slug[0] || 'main';
  
  // If the requested section doesn't exist, show the main help page
  const section = helpSections[sectionKey] || helpSections.main;
  
  return {
    props: {
      section,
      slug: params?.slug || null,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: [] } },
      { params: { slug: ['faqs'] } },
      { params: { slug: ['contact'] } },
      { params: { slug: ['privacy'] } },
    ],
    fallback: false,
  };
}