export const Git = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
    >
      <defs>
        <clipPath id="clip-git">
          <rect width="100" height="100" />
        </clipPath>
      </defs>
      <g id="git" clipPath="url(#clip-git)">
        <path
          id="git-icon"
          d="M98.114,45.545,54.453,1.886a6.44,6.44,0,0,0-9.107,0L36.28,10.953l11.5,11.5a7.648,7.648,0,0,1,9.685,9.75L68.55,43.288a7.654,7.654,0,1,1-4.59,4.321L53.624,37.272v27.2a7.742,7.742,0,0,1,2.027,1.449,7.656,7.656,0,1,1-8.328-1.672V36.8a7.57,7.57,0,0,1-2.508-1.672,7.661,7.661,0,0,1-1.651-8.377L31.824,15.407,1.887,45.343a6.442,6.442,0,0,0,0,9.11L45.549,98.112a6.441,6.441,0,0,0,9.108,0L98.114,54.656a6.444,6.444,0,0,0,0-9.111"
          transform="translate(-0.163 -0.166)"
        />
      </g>
    </svg>
  );
};
