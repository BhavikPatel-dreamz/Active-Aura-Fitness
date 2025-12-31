'use client';

import { useEffect, useState } from 'react';

type Props = {
  onBack: () => void;
  onSubmit: (fullPhone: string) => void;
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

type CallingCode = {
  code: string; // +91, +1, +61
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
  const [codes, setCodes] = useState<CallingCode[]>([]);
  const [countryCode, setCountryCode] = useState('+1');

 
useEffect(() => {
  async function fetchCallingCodes() {
    const res = await fetch(
      'https://restcountries.com/v3.1/all?fields=idd'
    );
    const data: any[] = await res.json();

    // ✅ explicitly tell TS these are strings
    const codes: string[] = Array.from(
      new Set<string>(
        data
          .filter((c) => c.idd?.root)
          .map(
            (c) =>
              `${c.idd.root}${c.idd.suffixes?.[0] || ''}`
          )
      )
    ).sort((a, b) => a.localeCompare(b));

    const formatted: CallingCode[] = codes.map(
      (code) => ({ code })
    );

    setCodes(formatted);
  }

  fetchCallingCodes();
}, []);


  function handleSubmit() {
    const fullPhone = `${countryCode}${phone}`;
    onSubmit(fullPhone);
  }

  return (
    <section className="bg-[#DB3706] text-white pb-8">
      <h2 className="text-center font-semibold text-[22px] sm:text-[26px] md:text-[35px] sm:mb-12 mb-5 px-4">
        Final Step : Where Should We Send <br />
        Your Personalized Results?
      </h2>

      <div className="max-w-xl mx-auto px-6 sm:mb-20 mb-10">
        {/* Name */}
        <div className="mb-6">
          <label className="block text-sm sm:text-lg sm:mb-2 mb-1 font-semibold">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            name="name"
            className="w-full sm:px-5 px-3 sm:py-4 py-3 sm:rounded-[10px] rounded-[5px] text-black bg-white sm:text-base text-sm"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm sm:text-lg sm:mb-2 mb-1 font-semibold">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            name="email"
            className="w-full sm:px-5 px-3 sm:py-4 py-3 sm:rounded-[10px] rounded-[5px] text-black bg-white sm:text-base text-sm"
          />
        </div>

        {/* Phone */}
        <div className="mb-2">
          <label className="block text-sm sm:text-lg sm:mb-2 mb-1 font-semibold">
            Phone Number
          </label>

          <div className="flex bg-white sm:rounded-[10px] rounded-[5px] overflow-hidden">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              name="countryCode"
              className="text-center text-black font-medium outline-none sm:w-[67px] w-auto max-w-[96px] text-sm sm:text-base"
            >
              {codes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="5551234567"
              name="phone"
              className="flex-1 sm:px-5 px-3 sm:py-4 py-3 text-black outline-none border-l border-[#9E9E9E] sm:ml-[10px] ml-1 sm:text-base text-sm"
            />
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-center gap-3 text-sm cursor-pointer">
          <input  className="
                appearance-none
                w-[18px] h-[18px]
                rounded-[5px]
                border border-white
                bg-transparent
                cursor-pointer
                relative

                checked:bg-black
                checked:border-black
                outline-none

                after:content-['']
                after:absolute
                after:hidden
                checked:after:block
                after:left-[5px]
                after:top-[1px]
                after:w-[5px]
                after:h-[10px]
                after:border-r-2
                after:border-b-2
                after:border-white
                after:rotate-45
              "
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            name="accepted"
          />
          <span className='capitalize sm:text-[14px] text-xs font-normal'>I accept the Terms & Conditions</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 py-10 px-4 border-t border-b border-[#282828]">
        <button
          onClick={onBack}
          className="group
                w-full sm:w-45
                px-6 py-3
                border border-white
                text-base sm:text-lg
                font-semibold
                rounded-[10px]
                bg-[#FFFFFF33]
                hover:bg-white
                text-white
                hover:text-black
                transition-colors duration-300
                flex items-center gap-2
                justify-center
                cursor-pointer"
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

        <button
          disabled={!accepted || submitting}
          onClick={handleSubmit}
          className="
                group
                px-6 py-3
                border border-black hover:border-white
                text-base sm:text-lg
                font-semibold
                rounded-[10px]
                bg-black hover:bg-white
                hover:[#FFFFFF33]
                text-white
                hover:text-black
                transition-colors duration-300
                flex items-center gap-2
                justify-center
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer"
        >
          <span> Get My Personalized Results</span>
          {/* Right Arrow SVG */}
              <span className="flex items-center transition-transform duration-200 ml-3">
                <svg
                  width="20"
                  height="11"
                  viewBox="0 0 20 11"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white group-hover:fill-black transition-colors duration-200"
                >
                  <path d="M19.2686 3.98725L16.0436 0.728907C15.9662 0.650801 15.874 0.588805 15.7724 0.546498C15.6709 0.504191 15.562 0.482409 15.452 0.482409C15.342 0.482409 15.233 0.504191 15.1315 0.546498C15.0299 0.588805 14.9378 0.650801 14.8603 0.728907C14.7051 0.885047 14.618 1.09625 14.618 1.3164C14.618 1.53656 14.7051 1.74775 14.8603 1.9039L17.827 4.89557H0.835329C0.614318 4.89557 0.402362 4.98337 0.246081 5.13965C0.0897995 5.29593 0.002 5.50789 0.002 5.7289C0.002 5.94991 0.0897995 6.16187 0.246081 6.31815C0.402362 6.47443 0.614318 6.56223 0.835329 6.56223H17.877L14.8603 9.57057C14.7822 9.64804 14.7202 9.74021 14.6779 9.84176C14.6356 9.94331 14.6138 10.0522 14.6138 10.1623C14.6138 10.2723 14.6356 10.3812 14.6779 10.4827C14.7202 10.5843 14.7822 10.6764 14.8603 10.7539C14.9378 10.832 15.0299 10.894 15.1315 10.9363C15.233 10.9786 15.342 11.0004 15.452 11.0004C15.562 11.0004 15.6709 10.9786 15.7724 10.9363C15.874 10.894 15.9662 10.832 16.0436 10.7539L19.2686 7.52057C19.7368 7.05182 19.9998 6.4164 19.9998 5.7539C19.9998 5.0914 19.7368 4.45599 19.2686 3.98725Z" />
                </svg>
              </span>
        </button>
      </div>
    </section>
  );
}
