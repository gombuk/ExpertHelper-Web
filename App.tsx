
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Statistics from './components/Statistics';
import RecordsTable from './components/RecordsTable';
import Settings from './components/Settings';
import Firms from './components/Firms';
import PlanSettings from './components/PlanSettings';
import Toast from './components/Toast';
import { Record as AppRecord, CostModelRow, GeneralSettings, Firm, MonthlyPlan } from './types';

export type View = 'dashboard' | 'settings' | 'firms' | 'plan';
export type AppMode = 'conclusions' | 'certificates';

const initialConclusionRecords: AppRecord[] = [
  { id: 864, registrationNumber: 'Д-864', expert: 'Гомба Ю.В.', status: 'Виконано', startDate: '2025-11-03', endDate: '2025-11-03', companyName: 'ТОВ "Сандерс-Виноградів"', comment: '-', units: 2568, models: 3, positions: 10, codes: 3, complexity: true, urgency: true, discount: 'Зі знижкою', actNumber: 'А-864', conclusionType: 'standard' },
  { id: 863, registrationNumber: 'Д-863', expert: 'Гомба Ю.В.', status: 'Виконано', startDate: '2025-11-02', endDate: '2025-11-02', companyName: 'ТОВ "Сандерс-Виноградів"', comment: 'додаток 140', units: 3837, models: 6, positions: 15, codes: 6, complexity: true, urgency: true, discount: 'Зі знижкою', conclusionType: 'standard' },
  { id: 862, registrationNumber: 'Д-862', expert: 'Гомба Ю.В.', status: 'Виконано', startDate: '2025-10-31', endDate: '2025-11-03', companyName: 'ТОВ "ТРІО"', comment: '-', units: 20211, models: 10, positions: 11, codes: 5, complexity: true, urgency: false, discount: 'Зі знижкою', conclusionType: 'standard' },
  { id: 859, registrationNumber: 'Д-859', expert: 'Палчей Я.В.', status: 'Не виконано', startDate: '2025-10-31', endDate: '2025-10-31', companyName: 'ТОВ "Новітекс"', comment: '-', units: 582, models: 14, positions: 81, codes: 1, complexity: true, urgency: true, discount: 'Зі знижкою', conclusionType: 'standard' },
  { id: 858, registrationNumber: 'Д-858', expert: 'Палчей Я.В.', status: 'Не виконано', startDate: '2025-10-30', endDate: '2025-10-31', companyName: 'ТОВ "Флоріан Шуз"', comment: '-', units: 12478, models: 6, positions: 26, codes: 1, complexity: true, urgency: false, discount: 'Повна', conclusionType: 'standard' },
  { id: 857, registrationNumber: 'Д-857', expert: 'Гомба Ю.В.', status: 'Не виконано', startDate: '2025-11-01', endDate: '2025-11-02', companyName: 'ТОВ "ТРІО"', comment: 'додаток 338', units: 1031, models: 3, positions: 10, codes: 3, complexity: true, urgency: true, discount: 'Зі знижкою', conclusionType: 'standard' },
  { id: 865, registrationNumber: 'Д-865', expert: 'Дан Т.О.', status: 'Виконано', startDate: '2025-11-04', endDate: '2025-11-04', companyName: 'ТОВ "Новітекс"', comment: 'договірний', units: 1, models: 0, positions: 0, codes: 2, complexity: false, urgency: false, discount: 'Зі знижкою', actNumber: 'А-865', conclusionType: 'contractual', pages: 5 },
];

const initialConclusionCostModel: CostModelRow[] = [
  { id: 1, models: 1, upTo10: '1200', upTo20: '1260', upTo50: '1320', plus51: '1350' },
  { id: 2, models: 2, upTo10: '1270', upTo20: '1330', upTo50: '1390', plus51: '1420' },
  { id: 3, models: 3, upTo10: '1340', upTo20: '1400', upTo50: '1460', plus51: '1490' },
  { id: 4, models: 4, upTo10: '1410', upTo20: '1470', upTo50: '1530', plus51: '1560' },
  { id: 5, models: 5, upTo10: '1480', upTo20: '1540', upTo50: '1600', plus51: '1630' },
  { id: 6, models: 6, upTo10: '1550', upTo20: '1610', upTo50: '1670', plus51: '1700' },
  { id: 7, models: 10, upTo10: '1800', upTo20: '1900', upTo50: '2000', plus51: '2100' },
  { id: 8, models: 14, upTo10: '2200', upTo20: '2300', upTo50: '2400', plus51: '2500' },
];

const initialConclusionGeneralSettings: GeneralSettings = {
  codeCost: 180, discount: 10, complexity: 30, urgency: 100, contractualPageCost: 1560,
};

const initialConclusionMonthlyPlans: Record<string, MonthlyPlan> = {
  '2025-10': { totalPlan: 300000, expertPlans: [ { id: 1, name: 'Гомба Ю.В.', planAmount: '100000' }, { id: 2, name: 'Дан Т.О.', planAmount: '100000' }, { id: 3, name: 'Палчей Я.В.', planAmount: '100000' }, ], },
  '2025-11': { totalPlan: 350000, expertPlans: [ { id: 1, name: 'Гомба Ю.В.', planAmount: '150000' }, { id: 3, name: 'Палчей Я.В.', planAmount: '120000' }, ], },
};


// Sample data for Certificates
const initialCertificateRecords: AppRecord[] = [
    { id: 101, registrationNumber: 'C-101', expert: 'Дан Т.О.', status: 'Виконано', startDate: '2025-11-05', endDate: '2025-11-06', companyName: 'ТОВ "СЛІП АЙДІ УКРАЇНА"', comment: 'сертифікат походження', units: 2, positions: 5, urgency: false, certificateForm: 'СТ-1', pages: 18, additionalPages: 2, productionType: 'fully_produced', certificateServiceType: 'standard', actNumber: 'АКТ-C-101' },
    { id: 102, registrationNumber: 'C-102', expert: 'Гомба Ю.В.', status: 'Не виконано', startDate: '2025-11-07', endDate: '2025-11-08', companyName: 'ТОВ "Новітекс"', comment: '', units: 1, positions: 12, urgency: true, certificateForm: 'А', pages: 25, additionalPages: 0, productionType: 'sufficient_processing', certificateServiceType: 'standard' },
];

const initialCertificateCostModel: CostModelRow[] = [];

const initialCertificateGeneralSettings: GeneralSettings = {
    urgency: 150,
    replacementCost: 981,
    reissuanceCost: 409,
    duplicateCost: 490,
    additionalPageCost: 245,
    fullyProduced_upTo20PagesCost: 600,
    fullyProduced_from21To200PagesCost: 950,
    fullyProduced_plus201PagesCost: 1400,
    fullyProduced_additionalPositionCost: 75,
    sufficientProcessing_upTo20PagesCost: 700,
    sufficientProcessing_from21To200PagesCost: 1050,
    sufficientProcessing_plus201PagesCost: 1500,
    sufficientProcessing_additionalPositionCost: 85,
};

const initialCertificateMonthlyPlans: Record<string, MonthlyPlan> = {
    '2025-11': { totalPlan: 50000, expertPlans: [ { id: 1, name: 'Дан Т.О.', planAmount: '25000' }, { id: 2, name: 'Гомба Ю.В.', planAmount: '25000' } ] }
};

const initialConclusionFirms: Firm[] = [
    { id: 1, name: 'ТОВ "Сандерс-Виноградів"', address: 'М.ВИНОГРАДІВ, ВУЛ. КОМУНАЛЬНА , 10', directorName: 'Розентал Є.Г.', edrpou: '12345678', taxNumber: '123456789012', productName: 'Взуття' },
    { id: 3, name: 'ТОВ "ТРІО"', address: 'М.КИЇВ, ВУЛ. ХРЕЩАТИК, 1', directorName: 'Іванов І.І.', edrpou: '34567890', taxNumber: '345678901234', productName: 'Аксесуари'},
    { id: 4, name: 'ТОВ "Новітекс"', address: 'м. Виноградів', directorName: 'Палчей Я.В.', edrpou: '34514696', taxNumber: '345146907052', productName: 'Шкіряні вироби'},
    { id: 5, name: 'ТОВ "Флоріан Шуз"', address: 'М.ОДЕСА, ВУЛ. ДЕРИБАСІВСЬКА, 5', directorName: 'Сидоренко С.С.', edrpou: '56789012', taxNumber: '567890123456', productName: 'Взуття'},
];

const initialCertificateFirms: Firm[] = [
    { id: 2, name: 'ТОВ "СЛІП АЙДІ УКРАЇНА"', address: 'М.ІРШАВА, ВУЛ. ГАГАРІНА , 49', directorName: 'Розентал Є.Г.', edrpou: '23456789', taxNumber: '234567890123', productName: 'Одяг' },
    { id: 4, name: 'ТОВ "Новітекс"', address: 'м. Виноградів', directorName: 'Палчей Я.В.', edrpou: '34514696', taxNumber: '345146907052', productName: 'Шкіряні вироби'},
];

const initialAppState = {
  conclusions: {
    records: initialConclusionRecords,
    costModelTable: initialConclusionCostModel,
    generalSettings: initialConclusionGeneralSettings,
    monthlyPlans: initialConclusionMonthlyPlans,
    firms: initialConclusionFirms,
  },
  certificates: {
    records: initialCertificateRecords,
    costModelTable: initialCertificateCostModel,
    generalSettings: initialCertificateGeneralSettings,
    monthlyPlans: initialCertificateMonthlyPlans,
    firms: initialCertificateFirms,
  }
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeMode, setActiveMode] = useState<AppMode>('conclusions');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [data, setData] = useState(initialAppState);
  
  const currentModeData = data[activeMode];

  const [selectedExpert, setSelectedExpert] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('2025-11');
  
  const allExpertsForMode = Array.from(new Set([
    ...currentModeData.records.map(r => r.expert),
    ...Object.values(currentModeData.monthlyPlans).flatMap((p: MonthlyPlan) => p.expertPlans.map(e => e.name))
  ]));

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ message, type });
      setTimeout(() => {
          setToast(null);
      }, 3000);
  };

  const addRecord = (newRecord: Omit<AppRecord, 'id'>) => {
    const recordWithId: AppRecord = { ...newRecord, id: Date.now() };
    setData(prevData => ({
        ...prevData,
        [activeMode]: {
            ...prevData[activeMode],
            records: [recordWithId, ...prevData[activeMode].records]
        }
    }));
  };
  
  const updateRecord = (updatedRecord: AppRecord) => {
    setData(prevData => ({
        ...prevData,
        [activeMode]: {
            ...prevData[activeMode],
            records: prevData[activeMode].records.map(r => r.id === updatedRecord.id ? updatedRecord : r)
        }
    }));
  };
  
  const deleteRecord = (id: number) => {
    setData(prevData => ({
        ...prevData,
        [activeMode]: {
            ...prevData[activeMode],
            records: prevData[activeMode].records.filter(r => r.id !== id)
        }
    }));
  };

  const setCostModelTable = (newTable: CostModelRow[]) => {
      setData(prevData => ({ ...prevData, [activeMode]: { ...prevData[activeMode], costModelTable: newTable } }));
  };

  const setGeneralSettings = (newSettings: GeneralSettings) => {
      setData(prevData => ({ ...prevData, [activeMode]: { ...prevData[activeMode], generalSettings: newSettings } }));
  };
  
  const setMonthlyPlans = (newPlans: Record<string, MonthlyPlan>) => {
      setData(prevData => ({ ...prevData, [activeMode]: { ...prevData[activeMode], monthlyPlans: newPlans } }));
  };

  const addFirm = (newFirm: Omit<Firm, 'id'>) => {
    const firmWithId: Firm = { ...newFirm, id: Date.now() };
    setData(prevData => ({
        ...prevData,
        [activeMode]: {
            ...prevData[activeMode],
            firms: [firmWithId, ...prevData[activeMode].firms]
        }
    }));
  };
  
  const updateFirm = (updatedFirm: Firm) => {
    setData(prevData => ({
        ...prevData,
        [activeMode]: {
            ...prevData[activeMode],
            firms: prevData[activeMode].firms.map(f => f.id === updatedFirm.id ? updatedFirm : f)
        }
    }));
  };

  const deleteFirm = (id: number) => {
    setData(prevData => ({
        ...prevData,
        [activeMode]: {
            ...prevData[activeMode],
            firms: prevData[activeMode].firms.filter(firm => firm.id !== id)
        }
    }));
  };

  const copyFirmToOtherMode = (firmToCopy: Firm) => {
    const sourceMode = activeMode;
    const targetMode = sourceMode === 'conclusions' ? 'certificates' : 'conclusions';
    const targetModeName = targetMode === 'conclusions' ? 'Висновки' : 'Сертифікати';

    const targetFirms = data[targetMode].firms;
    const firmExists = targetFirms.some(f => f.name.toLowerCase() === firmToCopy.name.toLowerCase());

    if (firmExists) {
        showToast(`Фірма "${firmToCopy.name}" вже існує у списку "${targetModeName}".`, 'error');
        return;
    }

    const newFirm: Firm = {
        ...firmToCopy,
        id: Date.now() // new unique ID
    };

    setData(prevData => ({
        ...prevData,
        [targetMode]: {
            ...prevData[targetMode],
            firms: [newFirm, ...prevData[targetMode].firms]
        }
    }));

    showToast(`Фірму "${firmToCopy.name}" скопійовано до списку "${targetModeName}".`);
};
  
  const filteredRecords = useMemo(() => {
    return currentModeData.records.filter(record => {
      const expertMatch = selectedExpert === 'all' || record.expert === selectedExpert;
      const recordMonth = record.endDate.substring(0, 7);
      const dateMatch = recordMonth === selectedMonth;
      
      return expertMatch && dateMatch;
    });
  }, [currentModeData.records, selectedExpert, selectedMonth]);

  const lastRegistrationNumber = useMemo(() => {
    if (currentModeData.records.length === 0) {
        return 'N/A';
    }

    // Function to extract numeric part for comparison, ignoring prefixes like 'Д-' or 'C-'
    const getNumericPart = (regNum: string) => {
        const match = regNum.match(/(\d+)/); // Extracts one or more digits
        return match ? parseInt(match[1], 10) : 0;
    };

    let latestRecord = currentModeData.records[0];
    let maxNumericPart = getNumericPart(latestRecord.registrationNumber);

    for (let i = 1; i < currentModeData.records.length; i++) {
        const currentRecord = currentModeData.records[i];
        const currentNumericPart = getNumericPart(currentRecord.registrationNumber);
        if (currentNumericPart > maxNumericPart) {
            maxNumericPart = currentNumericPart;
            latestRecord = currentRecord;
        }
    }
    return latestRecord.registrationNumber;
}, [currentModeData.records]);
  
  const currentMonthlyPlan = currentModeData.monthlyPlans[selectedMonth] || { totalPlan: 0, expertPlans: [] };

  const renderContent = () => {
    switch(currentView) {
      case 'settings':
        return <Settings 
          setCurrentView={setCurrentView} 
          generalSettings={currentModeData.generalSettings}
          setGeneralSettings={setGeneralSettings}
          costModelTable={currentModeData.costModelTable}
          setCostModelTable={setCostModelTable}
          showToast={showToast}
          activeMode={activeMode}
        />;
      case 'firms':
        return <Firms 
          setCurrentView={setCurrentView}
          firms={currentModeData.firms}
          onAddFirm={addFirm}
          onUpdateFirm={updateFirm}
          onDeleteFirm={deleteFirm}
          onCopyFirm={copyFirmToOtherMode}
          activeMode={activeMode}
          showToast={showToast}
        />;
      case 'plan':
        return <PlanSettings
          setCurrentView={setCurrentView}
          monthlyPlans={currentModeData.monthlyPlans}
          setMonthlyPlans={setMonthlyPlans}
          showToast={showToast}
        />;
      case 'dashboard':
      default:
        return (
          <>
            <Statistics 
              records={filteredRecords}
              costModelTable={currentModeData.costModelTable}
              generalSettings={currentModeData.generalSettings}
              experts={allExpertsForMode}
              selectedExpert={selectedExpert}
              setSelectedExpert={setSelectedExpert}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              monthlyPlan={currentMonthlyPlan}
              activeMode={activeMode}
              lastRegistrationNumber={lastRegistrationNumber} // Pass last registration number
            />
            <div className="mt-8">
              <RecordsTable 
                records={filteredRecords}
                onAddRecord={addRecord}
                onUpdateRecord={updateRecord}
                onDeleteRecord={deleteRecord}
                firms={currentModeData.firms}
                experts={allExpertsForMode}
                costModelTable={currentModeData.costModelTable}
                generalSettings={currentModeData.generalSettings}
                showToast={showToast}
                activeMode={activeMode}
                selectedMonth={selectedMonth} // Pass selectedMonth here
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="max-w-7xl mx-auto">
            <Header 
              setCurrentView={setCurrentView}
              activeMode={activeMode}
              setActiveMode={setActiveMode}
            />
            <main className="mt-8">
                {renderContent()}
            </main>
        </div>
    </div>
  );
};

export default App;