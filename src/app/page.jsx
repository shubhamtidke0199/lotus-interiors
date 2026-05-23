import Navbar from "@/components/layouts/Navbar";

const stats = [
  { number: "200+", label: "Interior Projects Completed" },
  { number: "50+", label: "Design Concepts Delivered" },
  { number: "100+", label: "Custom Furniture Designs" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="px-[20px] pb-[20px]">
        <div className="relative rounded-[40px] sm:rounded-[60px] overflow-hidden min-h-[600px] lg:min-h-[832px] flex flex-col">
          {/* Background image */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/9db2f0bdeef072f72492c5d97fefbb591ddfbfab?width=2800"
            alt="Interior design showcase"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Content positioned at bottom */}
          <div className="relative z-10 flex flex-col justify-end flex-1 p-6 sm:p-8 lg:p-10 gap-3 lg:gap-4">
            {/* Main content card */}
            <div
              className="rounded-[28px] sm:rounded-[42px] p-6 sm:p-8 lg:p-10 w-full lg:max-w-[710px]"
              style={{
                background:
                  "linear-gradient(84deg, rgba(0, 0, 0, 0.40) 5.21%, rgba(83, 70, 108, 0.64) 100%)",
                backdropFilter: "blur(27px)",
              }}
            >
              <h1 className="font-helvetica text-white text-[24px] sm:text-[28px] lg:text-[32px] font-normal leading-[1.25] mb-4 lg:mb-6">
                Crafting Beautiful Interiors with Expertise
              </h1>
              <p className="font-helvetica text-white text-[15px] sm:text-[16px] lg:text-[18px] font-normal leading-[1.45] mb-6 lg:mb-8 lg:max-w-[569px]">
                Antares Interior Design Studio specializes in creating elegant,
                functional, and modern spaces. We work on residential,
                commercial, and hospitality projects with complete design and
                execution services.
              </p>
              <button
                className="flex items-center gap-4 px-8 sm:px-10 lg:px-12 py-4 lg:py-5 border border-white/50 bg-primary shadow-md hover:bg-[#5e4f7a] transition-colors"
              >
                <span className="font-helvetica text-white text-[13px] sm:text-[14px] lg:text-[16px] font-medium leading-[24px] tracking-[1.6px] uppercase">
                  BOOK A FREE CONSULTATION
                </span>
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                  <path
                    d="M9.34611 11.3076L8.29228 10.2231L12.1115 6.4038H0V4.90384H12.1115L8.29228 1.08459L9.34611 0L14.9999 5.65382L9.34611 11.3076Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>

            {/* Stats bar */}
            <div
              className="rounded-[16px] sm:rounded-[20px] px-6 sm:px-8 lg:px-10 py-5 lg:py-6 w-full lg:max-w-[710px]"
              style={{
                background:
                  "linear-gradient(84deg, rgba(0, 0, 0, 0.40) 5.21%, rgba(83, 70, 108, 0.64) 100%)",
                backdropFilter: "blur(27px)",
              }}
            >
              <div className="flex items-center">
                {stats.map((stat, i) => (
                  <div key={stat.number} className="flex items-center flex-1 min-w-0">
                    {i > 0 && (
                      <div className="w-px self-stretch bg-white/30 mx-4 sm:mx-6 flex-shrink-0" />
                    )}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-[38px] h-[38px] sm:w-[46px] sm:h-[46px] bg-white flex-shrink-0" />
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-fraunces text-white text-[16px] sm:text-[18px] font-normal leading-[18px]">
                          {stat.number}
                        </span>
                        <span className="font-fraunces text-white text-[9px] sm:text-[10px] font-normal leading-[14px] break-words">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
