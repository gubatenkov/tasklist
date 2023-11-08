import image from '@/assets/bg.jpg'

export default function BannerImage() {
  return (
    <div className="border-b border-zinc-100">
      <div className="h-[20vh] w-full sm:h-[25vh]">
        <img
          className="block h-[20vh] w-full object-cover object-[center_39.18%]
          sm:h-[25vh]"
          loading="lazy"
          src={image}
          alt=""
        />
      </div>
    </div>
  )
}
