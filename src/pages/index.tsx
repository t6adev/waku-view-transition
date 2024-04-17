import { Link } from 'waku';
import { Link as ViewTransitionLink } from '../components/viewTransition/Link.js';

import { Counter } from '../components/counter.js';

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      <p>{data.body}</p>
      <h2>
        <span className="demo">Demo</span>
      </h2>
      <p>
        <ViewTransitionLink to="/demo">Go to /demo →</ViewTransitionLink>
      </p>
      <Counter />
      <Link to="/about" className="mt-4 inline-block underline">
        About page
      </Link>
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'Waku',
    headline: 'Waku',
    body: 'Hello world!',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'dynamic',
  };
};
