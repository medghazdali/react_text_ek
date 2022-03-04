import { useQuery } from "react-query";
import { getMetersData } from "../../../api/api";
import { groupBy } from "../../../utils/group-by";
import LoadingState from "./loading.state";
import { TrendingDownIcon, TrendingUpIcon } from "@heroicons/react/outline";

export default function ListElectricityData({ id = '', year = '' }) {
  const { isLoading, data } = useQuery(['electricity'], () => getMetersData(id));
  const list = groupBy((data?.data ?? []), 'date');

  const getPerformance = (index: number, attribute: string) => {
    let keys = Object.keys(list);
    let currentMonths = keys[index].split('/');
    let previousMonth: any;
    let currentYear: any;
    let currentMonth: any;
    let previousYear: any;
    let currentMonthValue: any
    let result: any
    let previousMonthValue: any

    if (currentMonths[0] === '1') {
      currentMonth = keys[index].split('/')[0];
      currentYear = keys[index].split('/')[1];

      previousMonth = keys.find((key) => {
        previousMonth = key.split('/')[0];
        previousYear = key.split('/')[1];
        return previousMonth === '12' && previousYear === (parseInt(currentYear) - 1).toString();
      });

    } else {

      currentMonth = keys[index].split('/')[0];
      previousMonth = keys.find((key) => {
        previousMonth = key.split('/')[0];
        return previousMonth === (parseInt(currentMonth) - 1).toString();
      });
    }
    currentMonthValue = list[keys[index]]?.reduce((total: any, current: any) => total + current[attribute], 0);
    previousMonthValue = list[previousMonth || '']?.reduce((total: any, current: any) => total + current[attribute], 0);

    result = (currentMonthValue * 100) / previousMonthValue;
    console.log(result - 10,'attribute : ' + attribute + ' ' + keys[index] + '  ' + previousMonth + '  previousMonthValue => ' + previousMonthValue + ' currentMonthValue =>' + currentMonthValue)
    return result - 100;

    // return result;

  }


  if (isLoading) return <div className='flex m-10 justify-center items-center'>
    <LoadingState />
  </div>

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                     HP
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pourcentage HP
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                     HC
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pourcentage HC
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.keys(list).filter(key => (key.split('/')[1] === year) || year === '' || year === 'Toutes les années').map((key, index) => {
                  const perValueHP = getPerformance(index, 'valueHP');
                  const perValueHC = getPerformance(index, 'valueHC');

                  return (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {list[key].reduce((total: any, current: any) => total + current?.valueHP, 0)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                        {
                          perValueHP > 0 ? <TrendingUpIcon
                            className='h-5 w-5 text-green-400' />
                            : <TrendingDownIcon
                              className='h-5 w-5 text-red-400' />
                        }
                        {perValueHP.toFixed(.2)} %
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {list[key].reduce((total: any, current: any) => total + current?.valueHC, 0)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                        {
                          perValueHC > 0 ? <TrendingUpIcon
                            className='h-5 w-5 text-green-400' />
                            : <TrendingDownIcon
                              className='h-5 w-5 text-red-400' />
                        }

                        {perValueHC.toFixed(.2)} %
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
