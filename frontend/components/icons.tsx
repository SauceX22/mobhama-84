import {
  FaExclamationTriangle as AlertTriangle,
  FaArrowRight as ArrowRight,
  FaAt as AtSign,
  FaCheck as Check,
  FaChevronDown as ChevronDown,
  FaChevronLeft as ChevronLeft,
  FaChevronRight as ChevronRight,
  FaChevronUp as ChevronUp,
  FaCircle as Circle,
  FaCreditCard as CreditCard,
  FaFile as File,
  FaFileAlt as FileText,
  FaGithub as GitHubIcon,
  FaQuestionCircle as HelpCircle,
  FaImage as Image,
  FaLaptop as Laptop,
  FaLinkedin as LinkedinIcon,
  FaSpinner as Loader2,
  FaSignOutAlt as LogOut,
  FaMicrosoft as MicrosoftIcon,
  FaMoon as Moon,
  FaEllipsisV as MoreVertical,
  FaPizzaSlice as Pizza,
  FaPlus as Plus,
  FaSearch as Search,
  FaCog as Settings,
  FaTrash as Trash,
  FaTwitter as TwitterIcon,
  FaUser as User,
  FaWhatsapp as WhatsappIcon,
  FaTimes as X,
  FaYoutube as Youtube,
} from "react-icons/fa"
import { IoSunnyOutline as Sun } from "react-icons/io5"

import { cn } from "@/lib/utils"

type IconProps = React.HTMLAttributes<SVGElement>

export type Icon = React.ElementType<IconProps>

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      {...props}
      className={cn(props.className)}
      viewBox="0 0 311 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.3251 12.2109L2.19632 79.2583C0.897678 81.4835 1.23934 84.3133 3.0634 86.1329C15.7808 98.8192 26.3867 106.403 37.3672 108.972C66.7472 115.846 91.1711 87.3871 112.545 66.0889L133.835 44.8731C143.377 35.365 155.469 22.8162 150.25 10.3985C148.567 6.39611 144.768 3.64091 138.354 1.43948C135.18 0.349876 131.808 -0.00025177 128.452 -0.00025177H59.2826C50.157 0.508827 46.2599 3.24763 41.3251 12.2109Z"
        fill="url(#paint0_linear_317_40)"
      />
      <path
        d="M62.1653 42.243L58.1917 46.4505L96.0222 82.7072L100.465 78.2951L62.1653 42.243Z"
        fill="white"
      />
      <path
        d="M64.7894 40.9433C64.7894 45.3071 61.2519 48.8446 56.8881 48.8446C52.5243 48.8446 48.9868 45.3071 48.9868 40.9433C48.9868 36.5795 52.5243 33.042 56.8881 33.042C61.2519 33.042 64.7894 36.5795 64.7894 40.9433Z"
        fill="white"
      />
      <path
        d="M41.3251 153.187L2.17983 85.0903C0.902748 82.8687 1.25099 80.0577 3.06718 78.25C15.8141 65.5623 26.4347 58.1951 37.4357 55.8711C66.9576 49.6344 91.1711 78.0108 112.545 99.3091L133.835 120.525C143.377 130.033 155.469 142.582 150.25 154.999C148.567 159.002 144.768 161.757 138.354 163.958C135.18 165.048 131.808 165.398 128.452 165.398H59.2826C50.157 164.889 46.26 162.15 41.3251 153.187Z"
        fill="url(#paint1_linear_317_40)"
      />
      <path
        d="M269.675 153.185L308.804 86.1372C310.102 83.912 309.761 81.0822 307.937 79.2626C295.219 66.5763 284.613 58.9922 273.633 56.4231C244.253 49.5491 219.829 78.0084 198.455 99.3066L177.165 120.522C167.623 130.03 155.531 142.579 160.75 154.997C162.433 158.999 166.232 161.755 172.646 163.956C175.82 165.046 179.192 165.396 182.548 165.396H251.717C260.843 164.887 264.74 162.148 269.675 153.185Z"
        fill="url(#paint2_linear_317_40)"
      />
      <path
        d="M248.835 123.154L252.808 118.946L214.978 82.6893L210.535 87.1014L248.835 123.154Z"
        fill="white"
      />
      <path
        d="M246.211 124.453C246.211 120.089 249.748 116.551 254.112 116.551C258.476 116.551 262.013 120.089 262.013 124.453C262.013 128.816 258.476 132.354 254.112 132.354C249.748 132.354 246.211 128.816 246.211 124.453Z"
        fill="white"
      />
      <path
        d="M269.675 12.2104L308.82 80.3071C310.097 82.5287 309.749 85.3398 307.933 87.1475C295.186 99.8352 284.565 107.202 273.564 109.526C244.042 115.763 219.829 87.3867 198.455 66.0884L177.165 44.8726C167.623 35.3645 155.531 22.8157 160.75 10.398C162.433 6.39561 166.232 3.64042 172.646 1.43899C175.82 0.349388 179.192 -0.000740051 182.548 -0.000740051H251.717C260.843 0.508339 264.74 3.24714 269.675 12.2104Z"
        fill="url(#paint3_linear_317_40)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_317_40"
          x1="75.7145"
          y1="110.327"
          x2="75.7145"
          y2="-0.000266926"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33B1FF" />
          <stop offset="1" stopColor="#3369FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_317_40"
          x1="75.7145"
          y1="55.0713"
          x2="75.7145"
          y2="165.398"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#273039" />
          <stop offset="1" stopColor="#181C20" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_317_40"
          x1="235.285"
          y1="55.0689"
          x2="235.285"
          y2="165.396"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#33B1FF" />
          <stop offset="1" stopColor="#3369FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_317_40"
          x1="235.285"
          y1="110.326"
          x2="235.285"
          y2="-0.000727518"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#273039" />
          <stop offset="1" stopColor="#181C20" />
        </linearGradient>
      </defs>
    </svg>
  ),
  close: X,
  spinner2: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  search: Search,
  circle: Circle,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: Sun,
  moon: Moon,
  laptop: Laptop,
  microsoft: MicrosoftIcon,
  gitHub: GitHubIcon,
  twitter: TwitterIcon,
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  x: X,
  linkedin: LinkedinIcon,
  email: AtSign,
  check: Check,
  youtube: Youtube,
  whatsapp: WhatsappIcon,
  logOut: LogOut,
}
