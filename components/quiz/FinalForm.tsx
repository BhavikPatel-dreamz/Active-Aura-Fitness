type Props = {
  onBack: () => void;
  onSubmit: () => void;
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
  return (
    <section className="bg-[#E5391C] text-white py-20 relative">
      
      {/* PROGRESS DOTS */}
      <div className="flex justify-center gap-4 mb-12">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-[#1f1f1f]"
          />
        ))}
      </div>

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
        <div>
          <label className="block text-sm mb-2">
            Phone Number (For Sending Your Plan Instantly)
          </label>

          <div className="flex">
            <div className="bg-white text-black px-4 py-4 rounded-l-lg border-r">
              +1
            </div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="555-123-4567"
              className="w-full p-4 rounded-r-lg text-black bg-white"
            />
          </div>
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

      {/* BOTTOM ACTION BAR */}
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
            onClick={onSubmit}
            className="px-8 py-3 rounded-lg bg-black text-white disabled:opacity-40"
          >
            Get My Personalized Results →
          </button>
        </div>
      </div>
    </section>
  );
}
