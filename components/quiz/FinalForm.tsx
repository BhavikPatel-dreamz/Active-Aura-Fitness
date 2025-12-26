'use client';

import { useEffect, useState } from 'react';

type Props = {
  onBack: () => void;
  onSubmit: (fullPhone: string) => void; // ✅ FIXED
  submitting: boolean;
  name: string;
  email: string;
  phone: string;
  accepted: boolean;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setPhone: (v: string) => void;
  setAccepted: (v: boolean) => void;
};

type CountryCode = {
  name: string;
  code: string;
  flag: string;
};

export function FinalForm({
  onBack,
  onSubmit,
  submitting,
  name,
  email,
  phone,
  accepted,
  setName,
  setEmail,
  setPhone,
  setAccepted,
}: Props) {
  const [countries, setCountries] = useState<CountryCode[]>([]);
  const [countryCode, setCountryCode] = useState('+1');

  // 🔹 Fetch country calling codes
  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,idd,flags'
      );
      const data = await res.json();

      const formatted: CountryCode[] = data
        .filter((c: any) => c.idd?.root)
        .map((c: any) => ({
          name: c.name.common,
          code: `${c.idd.root}${c.idd.suffixes?.[0] || ''}`,
          flag: c.flags.png,
        }))
        .sort((a: CountryCode, b: CountryCode) =>
          a.name.localeCompare(b.name)
        );

      setCountries(formatted);
    }

    fetchCountries();
  }, []);

  // 🔹 Submit handler
  function handleSubmit() {
    const fullPhone = `${countryCode}${phone}`; // ✅ combine here
    onSubmit(fullPhone);
  }

  return (
    <section className="bg-[#DB3706] text-white py-20 relative">
      {/* HEADING */}
      <h2
        className="
          text-center
          font-semibold
          text-white
          text-[22px] sm:text-[26px] md:text-[35px]
          leading-[30px] sm:leading-[38px] md:leading-[48px]
          mb-12
          px-4
        "
      >
        Final Step : Where Should We Send <br />
        Your Personalized Results?
      </h2>

      {/* FORM */}
      <div className="max-w-xl mx-auto px-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg mb-2 font-semibold">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="w-full px-[20px] py-4.5 rounded-[10px] text-black bg-white placeholder:text-[#9E9E9E] text-[16px] font-weight-medium"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg mb-2 font-semibold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            className="w-full px-4 py-4.5 rounded-[10px] text-black bg-white"
          />
        </div>

        {/* Phone */}
          <div>
            <label className="block text-lg mb-2 font-semibold capitalize">
               Phone Number (for sending your plan instantly)
            </label>

            <div className="flex items-center bg-white rounded-lg overflow-hidden relative">
              {/* Country Code Select */}
              <div className="relative flex items-center">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="
                    appearance-none
                    bg-transparent
                    text-black
                    font-medium
                    px-4
                    pr-8
                    h-[56px]
                    outline-none
                    cursor-pointer
                    w-auto
                  "
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>

                {/* Custom Arrow (Exact SVG) */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 18 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5562 2.79412L10.0501 10.3002C9.94555 10.4051 9.82126 10.4884 9.6844 10.5452C9.54754 10.6021 9.40082 10.6313 9.25263 10.6313C9.10444 10.6313 8.95772 10.6021 8.82086 10.5452C8.684 10.4884 8.55971 10.4051 8.45511 10.3002L0.949056 2.79412C0.737541 2.5826 0.618713 2.29572 0.618713 1.9966C0.618713 1.69747 0.737541 1.41059 0.949056 1.19908C1.16057 0.987564 1.44745 0.868736 1.74657 0.868736C2.0457 0.868736 2.33258 0.987564 2.54409 1.19908L9.25357 7.90855L15.963 1.19814C16.1746 0.986626 16.4614 0.867798 16.7606 0.867798C17.0597 0.867798 17.3466 0.986626 17.5581 1.19814C17.7696 1.40966 17.8884 1.69653 17.8884 1.99566C17.8884 2.29479 17.7696 2.58166 17.5581 2.79318L17.5562 2.79412Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </div>

              {/* Divider */}
              <div className="h-[56px] w-px bg-black/20" />

              {/* Phone Input */}
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-123-4567"
                className="
                  flex-1
                  px-4
                  h-[56px]
                  text-black
                  outline-none
                  bg-white
                "
              />
            </div>
          </div>


        {/* Terms */}
        <label className="flex items-center gap-3 text-xs mt-4 cursor-pointer select-none">
          {/* Hidden native checkbox */}
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="hidden"
          />

          {/* Custom checkbox */}
          <span
            className={`
              w-[18px] h-[18px]
              rounded-[5px]
              border 
              flex items-center justify-center
              transition-all
              ${accepted ? 'bg-black border-black' : 'bg-transparent'}
            `}
          >
            {/* Tick icon */}
            {accepted && (
              <svg
                width="8"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4L4 7L9 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>

          {/* Label text */}
          <span className="text-white text-sm font-regular">
            I Accept The Terms & Conditions
          </span>
        </label>


      </div>

      {/* ACTION BAR */}
        <div className="mt-16 border-y border-[#282828] py-[20px] px-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-[720px] mx-auto">
            
            {/* BACK BUTTON */}
            <button
              onClick={onBack}
              className="
                group
                w-full sm:w-[180px]
                px-6 py-3
                border border-white
                text-base sm:text-lg
                font-semibold
                rounded-[10px]
                bg-[#FFFFFF33]
                hover:bg-white
                text-white
                hover:text-black
                transition-colors duration-200
                flex items-center gap-2
                justify-center
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              {/* Arrow SVG */}
              <span className="flex items-center transition-transform duration-200 group-hover:-translate-x-1 mr-3">
                <svg
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white group-hover:fill-black transition-colors duration-200"
                >
                  <path d="M0.731379 7.01275L3.95638 10.2711C4.03385 10.3492 4.12602 10.4112 4.22757 10.4535C4.32912 10.4958 4.43804 10.5176 4.54805 10.5176C4.65806 10.5176 4.76698 10.4958 4.86853 10.4535C4.97008 10.4112 5.06224 10.3492 5.13971 10.2711C5.29492 10.1149 5.38204 9.90373 5.38204 9.68358C5.38204 9.46342 5.29492 9.25222 5.13971 9.09608L2.17305 6.10441L19.1647 6.10441C19.3857 6.10441 19.5977 6.01661 19.754 5.86033C19.9102 5.70405 19.998 5.49209 19.998 5.27108C19.998 5.05007 19.9102 4.8381 19.754 4.68182C19.5977 4.52554 19.3857 4.43775 19.1647 4.43775L2.12304 4.43775L5.13971 1.42941C5.21782 1.35194 5.27981 1.25978 5.32212 1.15823C5.36443 1.05668 5.38621 0.947756 5.38621 0.837746C5.38621 0.727736 5.36443 0.618814 5.32212 0.517265C5.27981 0.415716 5.21782 0.323547 5.13971 0.246078C5.06224 0.167972 4.97008 0.105976 4.86853 0.0636692C4.76698 0.0213623 4.65806 -0.000419617 4.54805 -0.000419617C4.43804 -0.000419617 4.32912 0.0213623 4.22757 0.0636692C4.12602 0.105976 4.03385 0.167972 3.95638 0.246078L0.731379 3.47941C0.26321 3.94816 0.000246048 4.58358 0.000246048 5.24608C0.000246048 5.90858 0.26321 6.54399 0.731379 7.01275Z" />
                </svg>
              </span>
              <span>Back</span>
            </button>

            {/* SUBMIT BUTTON */}
            <button
              disabled={!accepted || submitting}
              onClick={handleSubmit}
              className="
                group
                w-full sm:w-auto
                px-6 py-3
                border border-[#282828] hover:border-white
                text-base sm:text-lg
                font-semibold
                rounded-[10px]
                bg-[#282828]
                hover:bg-transparent
                text-white
                transition-colors duration-200
                flex items-center gap-2
                justify-center
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              <span>Get My Personalized Results</span>

              {/* Right Arrow SVG */}
              <span className="flex items-center transition-transform duration-200 group-hover:translate-x-1 ml-3">
                <svg
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                >
                  <path d="M19.2686 3.98725L16.0436 0.728907C15.9662 0.650801 15.874 0.588805 15.7724 0.546498C15.6709 0.504191 15.562 0.482409 15.452 0.482409C15.342 0.482409 15.233 0.504191 15.1315 0.546498C15.0299 0.588805 14.9378 0.650801 14.8603 0.728907C14.7051 0.885047 14.618 1.09625 14.618 1.3164C14.618 1.53656 14.7051 1.74775 14.8603 1.9039L17.827 4.89557H0.835329C0.614318 4.89557 0.402362 4.98337 0.246081 5.13965C0.0897995 5.29593 0.002 5.50789 0.002 5.7289C0.002 5.94991 0.0897995 6.16187 0.246081 6.31815C0.402362 6.47443 0.614318 6.56223 0.835329 6.56223H17.877L14.8603 9.57057C14.7822 9.64804 14.7202 9.74021 14.6779 9.84176C14.6356 9.94331 14.6138 10.0522 14.6138 10.1623C14.6138 10.2723 14.6356 10.3812 14.6779 10.4827C14.7202 10.5843 14.7822 10.6764 14.8603 10.7539C14.9378 10.832 15.0299 10.894 15.1315 10.9363C15.233 10.9786 15.342 11.0004 15.452 11.0004C15.562 11.0004 15.6709 10.9786 15.7724 10.9363C15.874 10.894 15.9662 10.832 16.0436 10.7539L19.2686 7.52057C19.7368 7.05182 19.9998 6.4164 19.9998 5.7539C19.9998 5.0914 19.7368 4.45599 19.2686 3.98725Z" />
                </svg>
              </span>
            </button>

          </div>
        </div>

    </section>
  );
}
