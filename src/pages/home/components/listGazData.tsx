import {useQuery} from "react-query";
import {getMetersData} from "../../../api/api";
import {groupBy} from "../../../utils/group-by";
import LoadingState from "./loading.state";
import {TrendingDownIcon, TrendingUpIcon} from "@heroicons/react/outline";

export default function ListGazData({id = '', year=''}) {
    const {isLoading, data} = useQuery(['gas'], () => getMetersData(id));

    const list = groupBy((data?.data ?? []), 'date');

    const getPerformance = (index: number, attribute: string) => {
        const keys = Object.keys(list);
        const currentMonth = keys[index].split('/');

        if (currentMonth[0] === '1') {
            const currentMonth = keys[index].split('/')[0];
            const currentYear = keys[index].split('/')[1];

            const previousMonth = keys.find((key) => {
                const previousMonth = key.split('/')[0];
                const previousYear = key.split('/')[1];
                return previousMonth === '12' && previousYear === (parseInt(currentYear) - 1).toString();
            });

            const previousMonthValue = list[previousMonth || '']?.reduce((total: any, current: any) => total + current[attribute], 0);
            const currentMonthValue = list[keys[index]]?.reduce((total: any, current: any) => total + current[attribute], 0);
            const result = (currentMonthValue * 100) / previousMonthValue;
            if(currentMonthValue < previousMonthValue){
                return -result;
            }
            return result;

        } else {

            const currentMonth = keys[index].split('/')[0];
            const previousMonth = keys.find((key) => {
                const previousMonth = key.split('/')[0];
                return previousMonth === (parseInt(currentMonth) - 1).toString();
            });

            const previousMonthValue = list[previousMonth || '']?.reduce((total: any, current: any) => total + current[attribute], 0);
            const currentMonthValue = list[keys[index]]?.reduce((total: any, current: any) => total + current[attribute], 0);
            const result = (currentMonthValue * 100) / previousMonthValue;
            if(currentMonthValue < previousMonthValue){
                return -result;
            }
            return result;
        }
    }

    if (isLoading) return <div className='flex m-10 justify-center items-center'>
        <LoadingState/>
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
                                    Value
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Performance
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {Object.keys(list).filter(key => (key.split('/')[1] === year) || year === '' || year === 'Toutes les années')?.map((key: any, index) => {
                                const value = getPerformance(index, 'value');
                                return (
                                    <tr key={key}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{list[key][0]?.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {list[key].reduce((total: any, current: any) => total + current?.value, 0)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                                            {
                                                value > 0 ? <TrendingUpIcon
                                                        className='h-5 w-5 text-green-400'/>
                                                    : <TrendingDownIcon
                                                        className='h-5 w-5 text-red-400'/>
                                            }
                                            {value.toFixed(.2)} %
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
