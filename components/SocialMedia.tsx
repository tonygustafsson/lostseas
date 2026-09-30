import { BsFacebook, BsGithub } from "react-icons/bs"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

const SocialMedia = ({ className }: Props) => (
  <div className={cn("mt-8 mb-4 flex justify-center gap-4 md:mb-0", className)}>
    <a
      href="https://github.com/tonygustafsson/lostseas"
      title="Look us up on Github"
      aria-label="Lost Seas on GitHub"
      className="transition-colors hover:text-amber-200"
    >
      <BsGithub className="h-8 w-8" />
    </a>

    <a
      href="https://www.facebook.com/lostseas"
      title="Look us up on Facebook"
      aria-label="Lost Seas on Facebook"
      className="transition-colors hover:text-amber-200"
    >
      <BsFacebook className="h-8 w-8" />
    </a>
  </div>
)

export default SocialMedia
