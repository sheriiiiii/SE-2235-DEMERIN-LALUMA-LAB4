interface Data {
id: number;
text: string;
}

interface SalaryProps {
data: Data;
}

const SalaryList: React.FC<SalaryProps> = ({ data }) => {
return (
    <li className="list flex items-center justify-between">
        <span className="text-lg font-medium text-gray-900">
            {data.text}
        </span>
    </li>
);
};

export default SalaryList;