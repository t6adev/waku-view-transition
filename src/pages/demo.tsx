import { Link } from '../components/viewTransition/Link.js';

export default function Page() {
  return (
    <div className="demo-box">
      <h2>
        This is the <span className="demo">Demo 1</span>
      </h2>
      <p>OK you just saw the demo :)</p>
      <Link to="/" className="block">
        Open homepage →
      </Link>
      <Link to="/demo2" className="block">
        Open Demo 2 →
      </Link>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  };
};
