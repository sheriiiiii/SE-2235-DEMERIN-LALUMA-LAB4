interface Data {
id: number;
text: string;
}

interface LabelProps {
data: Data;
}

const LabelList: React.FC<LabelProps> = ({ data }) => {
return (
    <li className="list flex items-center justify-between">
        <span className="text-lg font-medium text-gray-900">
            {data.text}
        </span>
    </li>
);
};

export default LabelList;