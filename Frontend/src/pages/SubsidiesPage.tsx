import React, { useState } from 'react';
import { subsidiesData, type SubsidyScheme } from '../data/subsidiesData';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import {
  FileText,
  Building,
  CheckCircle2,
  ExternalLink,
  Search
} from 'lucide-react';

export const SubsidiesPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedScheme, setSelectedScheme] = useState<SubsidyScheme | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubsidies = subsidiesData.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.title.mr.toLowerCase().includes(q) ||
      item.title.en.toLowerCase().includes(q) ||
      item.department.mr.toLowerCase().includes(q) ||
      item.department.en.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'शासकीय कृषी योजना' : 'Government Agricultural Subsidies'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'कृषी योजना व सबसिडी माहिती केंद्र' : 'Agri Subsidy & Schemes Portal'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'महाडीबीटी (MahaDBT) शेतकरी योजना; ठिबक सिंचन, ट्रॅक्टर व अवजारे, कांदा चाळ आणि सौर पंप सबसिडीचे नियम, पात्रता व आवश्यक कागदपत्रे.'
                : 'Eligibility requirements, required documents, and official application portals for Maharashtra state and central farm schemes.'}
            </p>
          </div>

          <a
            href="https://mahadbt.maharashtra.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-fresh hover:bg-fresh-light text-forest-950 font-black rounded-xl text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <span>MahaDBT अधिकृत पोर्टल</span>
            <ExternalLink className="w-4 h-4 text-forest-950" />
          </a>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? 'योजनेचे नाव किंवा विभाग शोधा...' : 'Search scheme or department...'}
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden shadow-xs"
            />
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredSubsidies.map((scheme) => (
            <div
              key={scheme.id}
              className="agri-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="amber" size="sm">
                    {scheme.badge[language]}
                  </Badge>
                  <span className="text-lg font-black text-forest-800">
                    {scheme.subsidyPercent} {language === 'mr' ? 'अनुदान' : 'Subsidy'}
                  </span>
                </div>

                <h3 className="text-xl font-black text-forest-950 mb-2 leading-snug">
                  {scheme.title[language]}
                </h3>

                <p className="text-xs text-charcoal-muted mb-4 font-semibold">
                  🏛️ {scheme.department[language]}
                </p>

                <div className="p-3.5 bg-forest-50/70 rounded-xl border border-forest-100 text-xs mb-4">
                  <span className="font-bold text-forest-900 block mb-0.5">
                    {language === 'mr' ? 'अनुदान रक्कम:' : 'Subsidy Quantum:'}
                  </span>
                  <p className="font-semibold text-forest-950">{scheme.subsidyAmount[language]}</p>
                </div>

                <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                  <span className="text-charcoal-muted font-bold block">
                    {language === 'mr' ? 'महत्त्वाची उद्दिष्टे:' : 'Key Objective:'}
                  </span>
                  <p className="text-charcoal leading-relaxed">{scheme.keyObjective[language]}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => setSelectedScheme(scheme)}
                  className="flex-1 py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-xs sm:text-sm text-center transition-all shadow-xs"
                >
                  {language === 'mr' ? 'पात्रता व कागदपत्रे पहा' : 'View Eligibility & Documents'}
                </button>

                <a
                  href={scheme.portalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-xl transition-colors"
                  title="MahaDBT Portal"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={selectedScheme !== null}
        onClose={() => setSelectedScheme(null)}
        maxWidth="2xl"
        title={selectedScheme?.title[language]}
      >
        {selectedScheme && (
          <div className="space-y-5 text-xs sm:text-sm text-charcoal">
            <div className="p-4 bg-forest-50 rounded-xl border border-forest-200">
              <span className="font-bold text-forest-900 block mb-1">
                {language === 'mr' ? 'अनुदान स्वरूप:' : 'Grant Details:'}
              </span>
              <p className="font-semibold text-forest-950">{selectedScheme.subsidyAmount[language]}</p>
            </div>

            <div>
              <h4 className="font-bold text-forest-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-fresh-dark" />
                {language === 'mr' ? 'पात्रतेचे निकष (Eligibility):' : 'Eligibility Requirements:'}
              </h4>
              <ul className="space-y-1.5 pl-2">
                {selectedScheme.eligibility[language].map((item, i) => (
                  <li key={i} className="list-disc list-inside text-charcoal-light leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-forest-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-xs">
                <FileText className="w-4 h-4 text-forest-700" />
                {language === 'mr' ? 'आवश्यक कागदपत्रे (Required Documents):' : 'Required Documents Checklist:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedScheme.requiredDocuments[language].map((doc, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#F8FAF7] border border-gray-100 font-medium">
                    ✓ {doc}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <a
                href={selectedScheme.portalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-fresh text-forest-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
              >
                <span>{language === 'mr' ? 'महाडीबीटी अर्ज पोर्टल उघडा' : 'Apply on MahaDBT'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold rounded-lg text-xs"
              >
                {language === 'mr' ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
