'use client';

type Props = {
  score: number;
  total: number;
  percentage: number;
  pdfUrl: string;
  onClose: () => void;
};

export default function QuizResultDialog({
  score,
  total,
  percentage,
  pdfUrl,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white text-black rounded-xl max-w-md w-full p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">
          🎉 Your Results Are Ready!
        </h3>

        <p className="mb-4">
          You scored <strong>{score}</strong> out of{' '}
          <strong>{total}</strong> ({percentage}%)
        </p>

        <p className="text-sm text-gray-600 mb-6">
          Your personalized fitness plan has been sent to your email.
          You can also download it using the button below.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href={pdfUrl}
            target="_blank"
            className="px-6 py-3 rounded-lg bg-black text-white"
          >
            Download PDF
          </a>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg border border-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
