
import Image from 'next/image';
import { getLogos } from '@/lib/api';

export default async function TopHeader() {
  const logo = await getLogos();

  return (
    <header className="w-full py-6 flex justify-center bg-[#2f2f2f]">
     <div className='site-logo'>
      <a href="/">
        {logo?.url && (
          <Image
            src={logo.url}
            alt={logo.alt || 'Active Aura'}
            width={logo.width || 160}
            height={logo.height || 40}
            priority
            className="object-contain"
          />
        )}
        </a>
      </div>
    </header>
  );
}
