import Pagination from "src/components/Pagination";

type Props = {
    search: string;
    setSearch: (_: string) => void;
};

const TableFooter = (props: Props) => {
    return (
        <div className="mt-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
            <div className="flex justify-center items-center gap-2 w-full">
                <Pagination />
            </div>
        </div>
    );
};

export default TableFooter;
