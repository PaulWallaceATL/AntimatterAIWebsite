// Note: These image assets will need to be downloaded from Figma to /public/assets/
// For now using placeholder paths that match the expected local structure
const imgLowes = "/assets/lowes-logo.svg";
const imgCognizants1Logo = "/assets/cognizant-logo.svg";
const imgTrimbleLogoLogo = "/assets/trimble-logo.svg";
const imgE2Open = "/assets/e2open-logo.svg";
const imgToyotaLogoLogo = "/assets/toyota-logo.svg";
const imgFrame2087327283 = "/assets/company-logo-1.svg";
const imgKeyspace = "/assets/keyspace-logo.svg";
const imgInjazat = "/assets/injazat-logo.svg";

export function TrustedLeaders() {
  return (
    <div
      className="bg-[#000000] relative size-full"
      data-name="Trusted"
      id="trusted-leaders"
    >
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-16 items-start justify-center p-[80px] relative size-full">
          <div
            className="box-border content-stretch flex flex-col gap-6 items-center justify-center leading-[0] p-0 relative shrink-0 text-center w-full"
            data-name="H1"
          >
            <div className="font-['Manrope',sans-serif] font-semibold relative shrink-0 text-[#ffffff] text-[48px] tracking-[-0.48px] w-full">
              <p className="block leading-[48px]">
                Trusted by Industry Leaders
              </p>
            </div>
            <div className="font-['Manrope',sans-serif] font-normal relative shrink-0 text-[#d7d7d7] text-[18px] tracking-[-0.36px] w-full">
              <p className="block leading-[24px]">
                Powering Innovation for Companies Worldwide
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="hidden md:block">
              {/* 3D carousel */}
              <div className="w-full h-[180px]">
                {require('react').createElement(require('../ui/LogoCarousel3D').LogoCarousel3D, {
                  logos: [
                    { src: imgLowes, alt: "Lowe's" },
                    { src: imgCognizants1Logo, alt: 'Cognizant' },
                    { src: imgTrimbleLogoLogo, alt: 'Trimble' },
                    { src: imgE2Open, alt: 'e2open' },
                    { src: imgToyotaLogoLogo, alt: 'Toyota' },
                    { src: imgFrame2087327283, alt: 'Company' },
                    { src: imgKeyspace, alt: 'Keyspace' },
                    { src: imgInjazat, alt: 'Injazat' },
                  ],
                  className: 'w-full h-[180px]'
                })}
              </div>
            </div>
            <div className="md:hidden grid grid-cols-3 gap-6 items-center opacity-80">
              <img alt="Lowe's" src={imgLowes} className="h-8 w-auto mx-auto" />
              <img alt="Cognizant" src={imgCognizants1Logo} className="h-8 w-auto mx-auto" />
              <img alt="Trimble" src={imgTrimbleLogoLogo} className="h-10 w-auto mx-auto" />
              <img alt="e2open" src={imgE2Open} className="h-10 w-auto mx-auto" />
              <img alt="Toyota" src={imgToyotaLogoLogo} className="h-12 w-auto mx-auto" />
              <img alt="Keyspace" src={imgKeyspace} className="h-12 w-auto mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 