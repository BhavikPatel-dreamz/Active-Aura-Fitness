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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 sm:px-0 px-3">
      <div className="bg-white text-black rounded-xl sm:max-w-md max-w-sm w-full sm:p-8 p-4 text-center">
        <h3 className="sm:text-2xl text-lg font-semibold leading-tight mb-4">
          🎉 Your Results Are Ready!
        </h3>

        <p className="mb-4 sm:text-lg text-sm">
          You scored <strong>{score}</strong> out of{' '}
          <strong>{total}</strong> ({percentage}%)
        </p>

        <p className="sm:text-sm text-xs text-gray-600 mb-6">
          Your personalized fitness plan has been sent to your email.
          You can also download it using the button below.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href={pdfUrl}
            target="_blank"
            className="sm:px-6 px-4 sm:py-3 py-2 rounded-lg bg-black text-white text-sm sm:text-lg font-semibold"
          >
            Download PDF
          </a>

          <button
            onClick={onClose}
            className="sm:px-6 px-4 sm:py-3 py-2 rounded-lg border border-black text-sm sm:text-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
