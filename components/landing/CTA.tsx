type Props = {
  text: string;
};

export default function CTA({ text }: Props) {
  return (
    <div className="text-center my-12">
      <button className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:opacity-90">
        {text}
      </button>
    </div>
  );
}
