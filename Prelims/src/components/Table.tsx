import { useState } from "react";
import EmployeeList from "./Employee";
import LabelList from "./Label";
import SalaryList from "./Salary";

interface Data {
id: number;
text: string;
}

const TableList: React.FC = () => {
    const [allData] = useState<Data[]>([]);

    // useEffect(() => {
    //     fetchAllData();
    // }, []);

    // const fetchAllData = async () => {
    //     try {
    //         const response = await axios.get(API_URL);
    //         setAllData(response.data);
    //     } catch (error) {
    //         console.error("Error fetching todos:", error);
    //     }
    // };

    // const addTodo = async (text: string) => {
    //     try {
    //         const response = await axios.post(API_URL, { text });
    //         setTodos((prevTodos) => [...prevTodos, response.data]);
    //     } catch (error) {
    //         console.error("Error adding todo:", error);
    //     }
    // };

    // const completeTodo = async (id: number) => {
    //     try {
    //         await axios.delete(`${API_URL}/${id}`);
    //         setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    //     } catch (error) {
    //         console.error("Error completing todo:", error);
    //     }
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Table of Employees
                </h1>

                <ul className="space-y-4">
                    {allData.map((data) => (
                        <EmployeeList key={data.id} data={data}/>
                    ))}
                    {allData.map((data) => (
                        <SalaryList key={data.id} data={data}/>
                    ))}
                    {allData.map((data) => (
                        <LabelList key={data.id} data={data}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TableList;