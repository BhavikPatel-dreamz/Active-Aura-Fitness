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
    <section className="bg-[#E5391C] text-white py-20 relative">
      {/* HEADING */}
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 px-4">
        Final Step : Where Should We Send <br />
        Your Personalized Results?
      </h2>

      {/* FORM */}
      <div className="max-w-xl mx-auto px-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm mb-2">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="w-full p-4 rounded-lg text-black bg-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-2">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            className="w-full p-4 rounded-lg text-black bg-white"
          />
        </div>

        {/* Phone */}
        <div className="flex">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="bg-white text-black px-3 py-4 rounded-l-lg border-r outline-none max-w-35"
          >
            {countries.map((c) => (
             <option key={`${c.name}-${c.code}`} value={c.code}>
  {c.name} ({c.code})
</option>

            ))}
          </select>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full p-4 rounded-r-lg text-black bg-white outline-none"
          />
        </div>

        {/* Terms */}
        <label className="flex items-center gap-2 text-xs mt-4">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          I Accept The Terms & Conditions
        </label>
      </div>

      {/* ACTION BAR */}
      <div className="mt-16 border-t border-black/20 pt-8">
        <div className="flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-lg border border-white text-white"
          >
            ← Back
          </button>

          <button
            disabled={!accepted || submitting}
            onClick={handleSubmit} // ✅ FIXED
            className="px-8 py-3 rounded-lg bg-black text-white disabled:opacity-40"
          >
            Get My Personalized Results →
          </button>
        </div>
      </div>
    </section>
  );
}
