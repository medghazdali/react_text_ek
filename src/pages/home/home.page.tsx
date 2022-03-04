import ListGazData from "./components/listGazData";
import ListElectricityData from "./components/listElectriciteData";
import MetersDropdown, { Meter } from "./components/meters.dropdown";
import { useState } from "react";
import YearDropDown from "./components/year.dropdown";

export default function HomePage() {
  const [selected, setSelected] = useState<Meter | undefined>(undefined);
  const [selectedYear, setYear] = useState<string | undefined>(undefined);
  return (
    <main className="flex-1 relative pb-8 z-0 ">
      <div className="mt-8">
        <div className="text-center">
          <p className="mt-2  leading-8 font-extrabold tracking-tight text-gray-900  lg:text-4xl  sm:text-2xl " style={styles.title}>L'évolution en pourcentage</p>
          <p className="mt-4 mb-4 max-w-2xl text-base text-gray-500 lg:mx-auto">L'évolution en pourcentage de la consommation mensuelle par rapport au mois précédent.</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 mt-4">
          <div className='flex items-center gap-4  mt-4'>
            <div className='my-4  items-center grid grid-cols-1 gap-y-2 sm:grid-cols-2 gap-x-6 lg:grid-cols-1 xl:grid-cols-1 xl:gap-x-1'>
              <MetersDropdown onMeterSelected={setSelected} />
            </div>

            <div className='my-4  items-center grid grid-cols-1 gap-y-2 sm:grid-cols-2 gap-x-6 lg:grid-cols-1 xl:grid-cols-1 xl:gap-x-1'>
              <YearDropDown onYearSelected={setYear} />
            </div>
          </div>

          {
            selected?.energy === 'gas' &&
            <ListGazData id={selected?.pointOfDelivery} year={selectedYear} />
          }

          {
            selected?.energy === 'electricity' &&
            <ListElectricityData id={selected?.pointOfDelivery} year={selectedYear} />
          }

          {
            !selected &&
            <div className="p-4 mb-4 mt-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
              <span className="font-medium">Info alert!</span> afficher les données de consommation par index et par année
            </div>
          }
          <br />
        </div>
      </div>
    </main >
  )
}


const styles = {
  title: {
    color: "#00a997",
    // fontSize: 90
  },
} as const;


