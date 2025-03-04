interface Data {
id: number;
text: string;
}

interface EmployeeProps {
data: Data;
}

const EmployeeList: React.FC<EmployeeProps> = ({ data }) => {
return (
    <li className="list flex items-center justify-between">
        <span className="text-lg font-medium text-gray-900">
            {data.text}
        </span>
    </li>
);
};

export default EmployeeList;