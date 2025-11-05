import { buildMetadata } from '../seo/metadata-factory';

export async function generateMetadata() {
  return buildMetadata({ pathname: '/about' });
}

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>Learn more about us on this page.</p>
    </main>
  );
}
