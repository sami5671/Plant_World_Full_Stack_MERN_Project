import { FaGithub } from "react-icons/fa6";

const GitHubLogin = () => {
  return (
    <div>
      <button
        // onClick={handleGitHubLogin}
        className="border-2 text-4xl bg-slate-200 shadow-xl p-1"
      >
        <FaGithub />
      </button>
    </div>
  );
};

export default GitHubLogin;
