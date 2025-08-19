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
          <div className="box-border content-stretch flex flex-row gap-14 items-center justify-center p-0 relative shrink-0 w-full">
            <div
              className="h-8 relative shrink-0 w-[118.065px] opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-name="Lowe's"
            >
              <img alt="Lowe's" className="block max-w-none size-full" src={imgLowes} />
            </div>
            <div
              className="h-8 relative shrink-0 w-[138.408px] opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-name="cognizants-1 logo"
            >
              <img
                alt="Cognizant"
                className="block max-w-none size-full"
                src={imgCognizants1Logo}
              />
            </div>
            <div
              className="h-10 overflow-clip relative shrink-0 w-[170.6px] opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-name="Trimble_Logo logo"
            >
              <img
                alt="Trimble"
                className="block max-w-none size-full"
                src={imgTrimbleLogoLogo}
              />
            </div>
            <div
              className="h-10 relative shrink-0 w-[156.293px] opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-name="e2open"
            >
              <img alt="e2open" className="block max-w-none size-full" src={imgE2Open} />
            </div>
            <div
              className="h-12 relative shrink-0 w-[66.442px] opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-name="Toyota_Logo logo"
            >
              <img
                alt="Toyota"
                className="block max-w-none size-full"
                src={imgToyotaLogoLogo}
              />
            </div>
            <div
              className="h-12 relative shrink-0 w-[49.151px] opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                alt="Company Logo"
                className="block max-w-none size-full"
                src={imgFrame2087327283}
              />
            </div>
            <div
              className="h-12 relative shrink-0 w-[47.987px] opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-name="keyspace"
            >
              <img
                alt="Keyspace"
                className="block max-w-none size-full"
                src={imgKeyspace}
              />
            </div>
            <div
              className="h-12 relative shrink-0 w-[125.633px] opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-name="injazat"
            >
              <img
                alt="Injazat"
                className="block max-w-none size-full"
                src={imgInjazat}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 