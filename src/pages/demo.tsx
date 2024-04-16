import { Link } from '../components/viewTransition/Link.js';

export default function Page() {
  return (
    <div className="demo-box">
      <h2>
        This is the <span className="demo">Demo</span>
      </h2>
      <p>OK you just saw the demo :)</p>
      <Link to="/">Open homepage →</Link>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static', // View Transition does not work on dynamic routes currently, waku@0.20.0
  };
};
