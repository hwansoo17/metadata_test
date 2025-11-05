import { buildMetadata } from '../seo/metadata-factory';

export async function generateMetadata() {
  return buildMetadata({ pathname: '/' });
}

export default function HomePage() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </main>
  );
}
