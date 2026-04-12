'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DashboardExpenseChartProps = {
  expenseCategoryList: [string, number][];
};

export default function DashboardExpenseChart({
  expenseCategoryList,
}: DashboardExpenseChartProps) {
  const totalExpenses = expenseCategoryList.reduce(
    (sum, [, amount]) => sum + amount,
    0,
  );
  const topCategory = expenseCategoryList[0];
  const currencyFormatter = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  });

  const data = {
    labels: expenseCategoryList.map(([category]) => category),
    datasets: [
      {
        data: expenseCategoryList.map(([, amount]) => amount),
        backgroundColor: [
          "#fb7185",
          "#f97316",
          "#fbbf24",
          "#2dd4bf",
          "#60a5fa",
          "#c084fc",
        ],
        borderColor: "#121a2b",
        borderWidth: 3,
        hoverOffset: 6,
        spacing: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    cutout: "72%",
    maintainAspectRatio: true,
    layout: {
      padding: 6,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        borderColor: "#243247",
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
     

      <div className="relative mx-auto mt-4 aspect-square max-w-[250px]">
        <Doughnut data={data} options={options} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/95 px-6 py-4 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Dépenses
            </p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-rose-300">
              -{currencyFormatter.format(totalExpenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
