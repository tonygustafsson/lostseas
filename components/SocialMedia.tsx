import { BsFacebook, BsGithub } from "react-icons/bs"

const SocialMedia = () => (
  <div className="flex justify-center gap-4 mt-8 mb-4 md:mb-0">
    <a
      href="https://github.com/tonygustafsson/lostseas"
      title="Look us up on Github"
    >
      <BsGithub className="w-8 h-8" />
    </a>
    <a href="https://www.facebook.com/lostseas" title="Look us up on Facebook">
      <BsFacebook className="w-8 h-8" />
    </a>
  </div>
)

export default SocialMedia
