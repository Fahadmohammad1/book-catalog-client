import image from '../assets/library.jpg'

export default function Banner() {
  return (
    <section id="up" className=" bg-fixed bg-no-repeat bg-center bg-cover h-screen relative" style={{ backgroundImage: `url(${image})` }}>
		<div className="h-screen bg-opacity-50 bg-black flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
			<div className="mx-2 text-center">
				<h1 className="text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl">
					<span className="text-white">Right</span> Place To
           </h1>
           <h2 className="text-gray-200 font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight">
            Get Update <span className="text-white">About</span> Books <span className="text-white">And Keep</span> Track of Reading
           </h2>
        </div>
    </div>
</section>
  )
}
