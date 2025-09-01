import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  src: string;
  title: string;
  members: number;
  description: string;
}

const CommunityCard = ({id, src, title, members, description}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/${id}`);
  };

  return (
    <div className="relative w-[216px] h-[180px] bg-post rounded-lg shadow-sm flex flex-col p-4 text-left cursor-pointer" onClick={handleClick}>
      <img className="w-12 h-12 mb-4" src={src} alt="communityLogo" />
      <button className="absolute top-4 right-4 cursor-pointer text-lightText">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_93_18434)">
        <path d="M14.25 8.99999C14.25 10.0355 15.0895 10.875 16.125 10.875C17.1605 10.875 18 10.0355 18 8.99999C18 7.96446 17.1605 7.125 16.125 7.125C15.0895 7.125 14.25 7.96446 14.25 8.99999Z" fill="currentColor"/>
        <path d="M7.12502 8.99999C7.12502 10.0355 7.96448 10.875 9.00001 10.875C10.0355 10.875 10.875 10.0355 10.875 8.99999C10.875 7.96446 10.0355 7.125 9.00001 7.125C7.96448 7.125 7.12502 7.96446 7.12502 8.99999Z" fill="currentColor"/>
        <path d="M2.37599e-05 8.99999C2.37146e-05 10.0355 0.839485 10.875 1.87501 10.875C2.91054 10.875 3.75 10.0355 3.75 8.99999C3.75 7.96446 2.91054 7.125 1.87501 7.125C0.839485 7.125 2.38052e-05 7.96446 2.37599e-05 8.99999Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_93_18434">
        <rect width="18" height="18" fill="white" transform="translate(18) rotate(90)"/>
        </clipPath>
        </defs>
        </svg>
      </button>
      <div className="text-[14px] font-medium text-text">{title}</div>
      <div className="text-[10px] text-text mb-2">{members} members</div>
      <div className="text-[14px] text-text max-h-12 w-full overflow-hidden text-ellipsis">{description}</div>

    </div>
  )
}

export default CommunityCard