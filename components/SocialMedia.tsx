import { BsFacebook, BsGithub } from "react-icons/bs"

const SocialMedia = () => (
  <div className="mb-4 mt-8 flex justify-center gap-4 md:mb-0">
    <a
      href="https://github.com/tonygustafsson/lostseas"
      title="Look us up on Github"
    >
      <BsGithub className="h-8 w-8" />
    </a>
    <a href="https://www.facebook.com/lostseas" title="Look us up on Facebook">
      <BsFacebook className="h-8 w-8" />
    </a>
  </div>
)

export default SocialMedia
