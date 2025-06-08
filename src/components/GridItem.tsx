interface GridItemProps {
  label: string;
  value: string;
}

export const GridItem = ({ label, value }: GridItemProps) => (
  <div>
    <p className="text-sm font-semibold leading-6">{label}</p>
    <p className="text-sm text-gray-500">{value}</p>
  </div>
);
