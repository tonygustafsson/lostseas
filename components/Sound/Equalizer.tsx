const BAR_DELAYS = ["0s", "0.3s", "0.15s", "0.45s"]

const Equalizer = () => (
  <span aria-hidden className="flex h-4 items-end gap-1">
    {BAR_DELAYS.map((delay) => (
      <span
        key={delay}
        className="bg-gold animate-equalizer h-full w-1 origin-bottom rounded-full motion-reduce:animate-none"
        style={{ animationDelay: delay }}
      />
    ))}
  </span>
)

export default Equalizer
