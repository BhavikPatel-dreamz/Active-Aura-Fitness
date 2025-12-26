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
    <section className="bg-[#DB3706] text-white py-20">
      <h2 className="text-center font-semibold text-[22px] sm:text-[26px] md:text-[35px] mb-12 px-4">
        Final Step : Where Should We Send <br />
        Your Personalized Results?
      </h2>

      <div className="max-w-xl mx-auto px-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg mb-2 font-semibold">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="w-full px-5 py-4 rounded-[10px] text-black bg-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg mb-2 font-semibold">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            className="w-full px-5 py-4 rounded-[10px] text-black bg-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-lg mb-2 font-semibold">
            Phone Number
          </label>

          <div className="flex bg-white rounded-lg overflow-hidden">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="px-4 text-black font-medium outline-none"
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
              className="flex-1 px-4 py-4 text-black outline-none"
            />
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-center gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>I accept the Terms & Conditions</span>
        </label>
      </div>

      {/* Actions */}
      <div className="mt-12 flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-white rounded-lg"
        >
          Back
        </button>

        <button
          disabled={!accepted || submitting}
          onClick={handleSubmit}
          className="px-6 py-3 bg-black rounded-lg disabled:opacity-50"
        >
          Get My Results
        </button>
      </div>
    </section>
  );
}
