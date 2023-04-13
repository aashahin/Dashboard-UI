import { Text } from "@nextui-org/react";
import { Bar, Pie } from "react-chartjs-2";
import { dataBar, dataPie, options } from "@/components/dashboard/utils/chart";

export default () => {
  return (
    <>
      <div className="mb-4 px-2 my-8">
        <Text h2 size="$2xl">
          Visitors
        </Text>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex shadow w-full h-fit py-8 px-4 items-center justify-center rounded bg-gray-100 h-28 dark:bg-zinc-900">
          <div className="flex flex-col md:flex-row justify-start  md:h-52">
            <div className="flex justify-start">
              <Bar data={dataBar} options={options} />
            </div>
          </div>
        </div>
        <div className="flex shadow w-full h-fit py-8 px-4 items-center justify-center rounded bg-gray-100 h-28 dark:bg-zinc-900">
          <div className="flex flex-col md:flex-row justify-start  md:h-52">
            <div className="flex justify-start">
              <Pie data={dataPie} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
