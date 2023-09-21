import React from 'react'
import { Spacer} from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer bg-gray-900 relative pt-1 border-b-2 border-gray-700">
      <div className="container mx-auto px-6">
        <div className="sm:flex sm:mt-8">
          <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-white uppercase mb-2">{t('footer.title')}</span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-red-300">{t('footer.link1')}</a></span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link2')}</a></span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link3')}</a></span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link4')}</a></span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link5')}</a></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">{t('footer.title2')}</span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link6')}</a></span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link7')}</a></span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link8')}</a></span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">{t('footer.title3')}</span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="#" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link9')}</a></span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="https://www.facebook.com/MakeDigitAll" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link10')}</a></span>
              <Spacer y={0.5} />
              <span className="my-2"><a href="https://www.instagram.com/makedigitall/" className="text-orange-400  text-md hover:text-orange-500">{t('footer.link11')}</a></span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-orange-300 font-bold mb-2">
              © 2023 by MakeDigitAll
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
