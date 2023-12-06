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
  FaEgg as Egg,
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
  logo: Egg,
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
