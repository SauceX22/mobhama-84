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
  FaHome as Home,
  FaTasks as Tasks,
  FaUsers as Users,
} from "react-icons/fa";
import { IoSunnyOutline as Sun } from "react-icons/io5";

type IconProps = React.HTMLAttributes<SVGElement>;

export type Icon = React.ElementType<IconProps>;

export const Icons = {
  home: Home as Icon,
  logo: Egg as Icon,
  close: X as Icon,
  spinner2: Loader2 as Icon,
  chevronLeft: ChevronLeft as Icon,
  chevronRight: ChevronRight as Icon,
  chevronDown: ChevronDown as Icon,
  chevronUp: ChevronUp as Icon,
  search: Search as Icon,
  circle: Circle as Icon,
  trash: Trash as Icon,
  post: FileText as Icon,
  page: File as Icon,
  media: Image as Icon,
  settings: Settings as Icon,
  billing: CreditCard as Icon,
  ellipsis: MoreVertical as Icon,
  add: Plus as Icon,
  warning: AlertTriangle as Icon,
  user: User as Icon,
  arrowRight: ArrowRight as Icon,
  help: HelpCircle as Icon,
  pizza: Pizza as Icon,
  sun: Sun as Icon,
  moon: Moon as Icon,
  laptop: Laptop as Icon,
  microsoft: MicrosoftIcon as Icon,
  gitHub: GitHubIcon as Icon,
  twitter: TwitterIcon as Icon,
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
  x: X as Icon,
  linkedin: LinkedinIcon as Icon,
  email: AtSign as Icon,
  check: Check as Icon,
  youtube: Youtube as Icon,
  whatsapp: WhatsappIcon as Icon,
  logOut: LogOut as Icon,
  tasks: Tasks as Icon,
  users: Users as Icon,
};
